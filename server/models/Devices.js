import mongoose from "mongoose";

const DevicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    home: {
      type: Object,
      required: true,
    },
    room: {
      type: Object,
    },
    relay: {
      type: Object,
    },
    state: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Devices = mongoose.model("Devices", DevicesSchema);
export default Devices;
