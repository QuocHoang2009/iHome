import dotenv from "dotenv";
import mqtt from "mqtt";
import SensorNodes from "../models/Nodes.js";
dotenv.config();

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
      const newNode = new SensorNodes({
        name: "newNode",
        home: "homeObject",
        room: "",
        address: message?.dev_addr,
        type: message?.dev_type,
        numChannel: message?.numChannel,
        isActive: true,
        isLink: false,
      });

      await newNode.save();
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

export default mqttSendMess;
