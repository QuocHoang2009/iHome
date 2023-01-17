import mongoose from "mongoose";

const HomesMemberSchema = new mongoose.Schema(
  {
    home: {
      type: Object,
      require: true,
    },
    user: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);

const HomesMember = mongoose.model("HomesMember", HomesMemberSchema);
export default HomesMember;
