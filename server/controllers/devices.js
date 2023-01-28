import Devices from "../models/Devices.js";

export const addDevices = async (req, res) => {
  try {
    const { name, home, room } = req.body.body;

    const newDevice = new Devices({
      name: name,
      home: home,
      room: room,
      relay: null,
      state: false,
    });

    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
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
    await Devices.findOneAndDelete(id);
    res.status(200).json({ message: "Delete Success!" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
