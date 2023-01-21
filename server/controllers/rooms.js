import Rooms from "../models/Rooms.js";

export const addRooms = async (req, res) => {
  try {
    const { name, home } = req.body.body;

    const newRoom = new Rooms({
      name: name,
      home: home,
      sensor: null,
      relay: null,
      state: false,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const { id } = req.params;
    const rooms = await Rooms.find({ home: id });
    res.status(200).json(rooms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await Rooms.findOneAndDelete(id);
    res.status(200).json({ message: "Delete Success!" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
