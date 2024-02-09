import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  quetiontimer: { type: Date, default: Date.now },
  noOfQuetions: {type: Number, default: 1},
  subscription: {type: Number, default: 0},
});

export default mongoose.model("User", userSchema);
