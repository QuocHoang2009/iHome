import mongoose from "mongoose";

const NodesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    home: {
      type: Object,
      required: true,
    },
    room: {
      type: Object,
    },
    type: {
      type: String,
      min: 2,
      max: 50,
    },
    address: {
      type: String,
      min: 2,
      max: 50,
    },
    numChannel: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isLink: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Nodes = mongoose.model("Nodes", NodesSchema);
export default Nodes;
