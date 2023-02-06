import { permitJoin } from "../const/index.js";

import dotenv from "dotenv";
import mqtt from "mqtt";
import Channels from "../models/Channels.js";
import Devices from "../models/Devices.js";
import Homes from "../models/Homes.js";
import Nodes from "../models/Nodes.js";
import Rooms from "../models/Rooms.js";
dotenv.config();

let node;

const client = mqtt.connect(process.env.BROKER_URL);

client.on("error", (error) => console.log("error", error.message));

client.on("connect", () => {
  client.subscribe(process.env.MQTT_SUBCRIBERS, function (err) {
    if (!err) {
      console.log("Client has subcribed successfully!");
    } else {
      console.log(err);
    }
  });
});

const mqttHandle = async (topic, payload) => {
  try {
    const message = JSON.parse(payload.toString());

    if (message?.action === "provision") {
      node = message;
    }
  } catch (err) {
    console.log(err);
  }
};

client.on("message", mqttHandle);

export const mqttSendMess = (topic, data) => {
  try {
    const dataConvert = JSON.stringify(data);
    client.publish(topic, dataConvert);
  } catch (err) {
    console.log(err);
  }
};

export const addNodes = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, room } = req.body;
    mqttSendMess(topic, permitJoin);

    const timer = setTimeout(() => {
      clearInterval(timeInterval);
      res.status(200).json(undefined);
    }, 20000);

    const timeInterval = setInterval(async () => {
      if (node) {
        clearTimeout(timer);
        await Nodes.deleteMany({ address: node?.dev_addr });
        await Channels.deleteMany({ address: node?.dev_addr });

        if (node.type === "Relay") {
          const channels = [];

          for (let i = 0; i < node?.numChannel; i++) {
            const newChannel = new Channels({
              address: node?.dev_addr,
              channel: i + 1,
              isActive: true,
              link: "",
              typeLink: "",
              linkWithNode: [],
              state: false,
            });
            const channel = await newChannel.save();
            channels[i] = channel._id;
          }

          const newNode = new Nodes({
            name: "New Relay",
            home: id,
            room: room ? room : "",
            address: node?.dev_addr,
            type: node?.type,
            numChannel: node?.numChannel,
            channels: channels,
            isActive: true,
          });

          node = await newNode.save();
        } else if (node.type === "Button") {
          const newNode = new Nodes({
            name: "New Button",
            home: id,
            room: room ? room : "",
            address: node?.dev_addr,
            type: node?.type,
            numChannel: node?.numChannel,
            channels: [[], [], []],
            isActive: true,
          });
          node = await newNode.save();
        } else if (node.type === "Sensor") {
          const newNode = new Nodes({
            name: "New Sensor",
            home: id,
            room: room ? room : "",
            address: node?.dev_addr,
            type: node?.type,
            isActive: true,
          });
          node = await newNode.save();
        }

        res.status(200).json(node);
        node = undefined;
      }
    }, 1010);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllNodes = async (req, res) => {
  try {
    const { id } = req.params;
    let allNodes = await Nodes.find({ home: id });

    const promises = await allNodes.map(async (node) => {
      if (node?.channels) {
        const promises2 = await node.channels.map(async (channelId) => {
          const channel = new Promise((resolve, reject) => {
            resolve(Channels.findById(channelId));
          });
          return channel;
        });

        const channels = await Promise.all(promises2);
        node.channels = channels;
        return node;
      }

      return node;
    });

    allNodes = await Promise.all(promises);
    res.status(200).json(allNodes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getNode = async (req, res) => {
  try {
    const { id } = req.params;

    let dataRes = {};

    const node = await Nodes.findById(id);
    if (node?.room) {
      const room = await Rooms.findById(node?.room);
      node.room = room;
    }

    dataRes.node = node;

    if (node?.type === "Relay") {
      const promises = await node.channels.map(async (channelId) => {
        const channel = new Promise((resolve, reject) => {
          resolve(Channels.findById(channelId));
        });
        return channel;
      });

      dataRes.channels = await Promise.all(promises);
    }

    if (dataRes?.channel) {
      const promises = await dataRes?.channel.map(async (channel) => {
        if (channel.type === "Device") {
          const device = new Promise((resolve, reject) => {
            resolve(Devices.findById(channel.link));
          });
          return device;
        } else if (channel.type === "Room") {
          const room = new Promise((resolve, reject) => {
            resolve(Rooms.findById(channel.link));
          });
          return room;
        } else if (channel.type === "Home") {
          const home = new Promise((resolve, reject) => {
            resolve(Homes.findById(channel.link));
          });
          return home;
        }
      });

      dataRes.devices = await Promise.all(promises);
    }

    res.status(200).json(dataRes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteNode = async (req, res) => {
  try {
    const { id, homeId } = req.params;
    const home = await Homes.findById(homeId);
    const node = await Nodes.findById({ _id: id });

    const leaveRequest = {
      action: "command",
      command: "leave_req",
      dev_addr: node.address,
    };

    mqttSendMess(home.mqttPath, leaveRequest);

    const promises = await node?.channels.map(async (channel) => {
      const channelFind = new Promise((resolve, reject) => {
        resolve(Channels.findById(channel));
      });

      return channelFind;
    });

    const channels = await Promise.all(promises);

    const promisesChannel = channels.map((channel) => {
      if (channel?.typeLink === "Devices") {
        new Promise((resolve, reject) => {
          resolve(
            Devices.findOneAndUpdate(
              { _id: channel?.link },
              { relay: null },
              { new: true }
            )
          );
        });
      } else if (channel?.typeLink === "Rooms") {
        new Promise((resolve, reject) => {
          resolve(
            Rooms.findOneAndUpdate(
              { _id: channel?.link },
              { relay: null },
              { new: true }
            )
          );
        });
      } else if (channel?.typeLink === "Homes") {
        new Promise((resolve, reject) => {
          resolve(
            Homes.findOneAndUpdate(
              { _id: channel?.link },
              { relay: null },
              { new: true }
            )
          );
        });
      }

      new Promise((resolve, reject) => {
        resolve(Channels.findByIdAndDelete(channel?._id));
      });

      return;
    });

    await Promise.all(promisesChannel);
    await Nodes.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "Delete Success!" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editNode = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, room } = req.body.body;

    await Nodes.findOneAndUpdate(
      { _id: id },
      { name: name, room: room },
      { new: true }
    );

    res.status(201).json("Change status success!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
