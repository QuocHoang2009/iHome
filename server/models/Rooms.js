import mongoose from "mongoose";

const RoomsSchema = new mongoose.Schema(
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
    sensor: {
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

const Rooms = mongoose.model("Rooms", RoomsSchema);
export default Rooms;
