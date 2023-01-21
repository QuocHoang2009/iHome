import Homes from "../models/Homes.js";
import HomesMember from "../models/HomesMember.js";

export const addHomes = async (req, res) => {
  try {
    const { name, address, mqttPath } = req.body.body;
    const picturePath = req.body.body.picturePath.path;

    const newHome = new Homes({
      name,
      address,
      mqttPath,
      picturePath,
    });

    const savedHome = await newHome.save();

    const newHomesMember = new HomesMember({
      home: savedHome._id,
      user: req.params.id,
    });

    await newHomesMember.save();

    res.status(201).json(savedHome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllHomes = async (req, res) => {
  try {
    const { id } = req.params;
    const membersHomes = await HomesMember.find({ user: id });

    const promises = await membersHomes.map(async (membersHome) => {
      const home = new Promise((resolve, reject) => {
        resolve(Homes.findById(membersHome.home));
      });
      return home;
    });

    const homes = await Promise.all(promises);
    res.status(200).json(homes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
