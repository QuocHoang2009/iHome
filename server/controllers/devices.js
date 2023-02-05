import Channels from "../models/Channels.js";
import Devices from "../models/Devices.js";
import Nodes from "../models/Nodes.js";
import Rooms from "../models/Rooms.js";
import { mqttSendMess } from "./nodes.js";

export const addDevices = async (req, res) => {
  try {
    const { name, home, room } = req.body.body;

    const newDevice = new Devices({
      name: name,
      home: home,
      room: room,
      relay: {},
      state: false,
    });

    await newDevice.save();
    res.status(201).json("Links successfull!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const { id } = req.params;
    const devices = await Devices.find({ home: id });
    res.status(200).json(devices);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Devices.findById(id);
    const room = await Rooms.findById(device?.room);
    device.room = room;

    if (device.relay) {
      let relay = await Nodes.findOne({ address: device?.relay.address });
      const channel = await Channels.findById(
        relay?.channels[device?.relay.channel - 1]
      );

      const promises = await channel.linkWithNode.map(async (node) => {
        const button = new Promise(async (resolve, reject) => {
          resolve(await Nodes.findById(node._id));
        });
        return button;
      });

      const buttons = await Promise.all(promises);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].numChannel = channel.linkWithNode[i].channel;
      }

      device.relay = {
        _id: channel._id,
        channel: channel.channel,
        buttons: buttons,
        isActive: channel.isActive,
        name: relay.name,
        address: relay.address,
      };
    }

    res.status(200).json(device);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Devices.findById({ _id: id });

    if (device?.relay) {
      await Channels.findOneAndUpdate(
        { address: device?.relay?.address, channel: device?.relay?.channel },
        { linkWithDevice: "" },
        { new: true }
      );
    }

    await Devices.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "Delete Success!" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const linkDevices = async (req, res) => {
  try {
    const { device, relay } = req.body.body;

    await Devices.findOneAndUpdate(
      { _id: device },
      { relay: relay },
      { new: true }
    );

    await Channels.findOneAndUpdate(
      { address: relay.address, channel: relay.channel },
      { link: device, typeLink: "Devices" },
      { new: true }
    );

    res.status(201).json("Link success!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const { id, state, mqttPath, relay } = req.body.body;

    const controlRelay = {
      action: "control",
      dev_addr: relay.address,
      status1: relay.channel === 1 ? (state ? "ON" : "OFF") : "NONE",
      status2: relay.channel === 2 ? (state ? "ON" : "OFF") : "NONE",
      status3: relay.channel === 3 ? (state ? "ON" : "OFF") : "NONE",
    };

    mqttSendMess(mqttPath, controlRelay);

    await Devices.findOneAndUpdate(
      { _id: id },
      { state: state },
      { new: true }
    );

    res.status(201).json("Change status success!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const disconnectRelay = async (req, res) => {
  try {
    const { relayChannel, device } = req.body.body;

    await Devices.findOneAndUpdate(
      { _id: device },
      { relay: null },
      { new: true }
    );

    await Channels.findOneAndUpdate(
      { _id: relayChannel },
      { typeLink: "", link: "" },
      { new: true }
    );

    res.status(201).json("Change status success!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const linkButton = async (req, res) => {
  try {
    //{_id, channel}
    const { relay, button } = req.body.body;

    const channel = await Channels.findById(relay._id);

    let linkWithNode = [];
    if (channel?.linkWithNode) {
      linkWithNode = channel?.linkWithNode;
    }

    linkWithNode.push(button);
    await Channels.findOneAndUpdate(
      { _id: relay._id },
      { linkWithNode: linkWithNode },
      { new: true }
    );

    const node = await Nodes.findById(button._id);
    const channels = node?.channels;
    channels[button.channel - 1].push(relay);
    await Nodes.findOneAndUpdate(
      { _id: button._id },
      { channels: channels },
      { new: true }
    );

    res.status(201).json("connect success!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const disconnectButton = async (req, res) => {
  try {
    const { relay, button } = req.body.body;
    console.log(relay);

    const channel = await Channels.findById(relay._id);

    const buttonFilter = (buttonNode) => {
      return (
        buttonNode._id !== button._id || buttonNode.channel !== button.channel
      );
    };

    const linkWithNode = channel?.linkWithNode.filter(buttonFilter);

    await Channels.findOneAndUpdate(
      { _id: relay._id },
      { linkWithNode: linkWithNode },
      { new: true }
    );

    const relayFilter = (relayNode) => {
      return relayNode._id !== relay._id || relayNode.channel !== relay.channel;
    };

    const node = await Nodes.findById(button._id);
    const channels = node?.channels;

    channels[button.channel - 1] =
      channels[button.channel - 1].filter(relayFilter);

    await Nodes.findOneAndUpdate(
      { _id: button._id },
      { channels: channels },
      { new: true }
    );

    res.status(201).json("connect success!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
