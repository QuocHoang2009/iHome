import Channels from "../models/Channels.js";
import Devices from "../models/Devices.js";
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

export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Devices.findById({ _id: id });

    await Channels.findOneAndUpdate(
      { address: device?.relay.address, channel: device?.relay.channel },
      { linkWithDevice: "" },
      { new: true }
    );

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
      channel: relay.channel,
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
