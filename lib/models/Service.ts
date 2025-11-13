
import mongoose, { Schema, models } from "mongoose";

const ServiceSchema = new Schema({
  title: String,
  day: String,
  time: String,
  location: String,
  description: String,
  live: Boolean,
  featured: Boolean,
});

export default models.Service || mongoose.model("Service", ServiceSchema);


