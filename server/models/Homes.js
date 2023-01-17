import mongoose from "mongoose";

const HomesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    address: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    mqttPath: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    picturePath: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    relay: {
      type: Object,
      default: null,
    },
    state: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true }
);

const Homes = mongoose.model("Homes", HomesSchema);
export default Homes;
