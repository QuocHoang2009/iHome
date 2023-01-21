import mongoose from "mongoose";

const ChannelsSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    channel: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    linkWithDevice: {
      type: String,
    },
    linkWithNode: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Channels = mongoose.model("Channels", ChannelsSchema);
export default Channels;
