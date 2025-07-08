import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String, // profile picture URL from Google
    },
    contactInfo: {
      phone: { type: String },
      showPhone: { type: Boolean, default: false },
      showEmail: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
