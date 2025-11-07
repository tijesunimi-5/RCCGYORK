import mongoose from "mongoose";

const WriteupSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

export default mongoose.models.Writeup ||
  mongoose.model("Writeup", WriteupSchema);
