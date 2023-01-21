import { permitJoin } from "../const/index.js";

import dotenv from "dotenv";
import mqtt from "mqtt";
import Channels from "../models/Channels.js";
import Nodes from "../models/Nodes.js";
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

const mqttSendMess = (topic, data) => {
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
    const { topic } = req.body;
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
        const channels = [];

        for (let i = 0; i < node?.numChannel; i++) {
          const newChannel = new Channels({
            address: node?.dev_addr,
            channel: i + 1,
            isActive: true,
          });
          channels[i] = await newChannel.save();
        }

        const newNode = new Nodes({
          name: "newNode",
          home: id,
          room: "",
          address: node?.dev_addr,
          type: node?.dev_type,
          numChannel: node?.numChannel,
          channels: channels,
          isActive: true,
          isLink: false,
        });

        node = await newNode.save();
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
    const allNodes = await Nodes.find();
    res.status(200).json(allNodes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
