import mqttSendMess from "../components/mqtt.js";
import { permitJoin } from "../const/index.js";
import Nodes from "../models/Nodes.js";

export const addNodes = async (req, res) => {
  try {
    const { topic } = req.body;
    mqttSendMess(topic, permitJoin);
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
