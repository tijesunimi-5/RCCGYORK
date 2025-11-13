import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  text: { type: String, required: true },
});

export default mongoose.models.Text || mongoose.model("Text", TextSchema);
