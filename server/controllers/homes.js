import Channels from "../models/Channels.js";
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

export const getHome = async (req, res) => {
  try {
    const { id } = req.params;

    const home = await Homes.findById(id);
    res.status(200).json(home);
  } catch (err) {
    res.status(404).json({ message: err.message });
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

export const linkHomes = async (req, res) => {
  try {
    const { home, relay } = req.body.body;

    const homeReturn = await Homes.findByIdAndUpdate(home, { relay: relay });
    await Channels.findByIdAndUpdate(relay, { link: home, typeLink: "Home" });
    console.log(homeReturn);
    res.status(201).json(homeReturn);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const unLinkHome = async (req, res) => {
  try {
    const { relayChannel, home } = req.body.body;

    const homeReturn = await Homes.findOneAndUpdate(
      { _id: home },
      { relay: null },
      { new: true }
    );

    await Channels.findOneAndUpdate(
      { _id: relayChannel },
      { typeLink: "", link: "" },
      { new: true }
    );

    console.log(homeReturn);

    res.status(201).json(homeReturn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
