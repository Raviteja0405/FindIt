import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Books",
        "Clothing",
        "Bags & Containers",
        "Documents & Papers",
        "Other",
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
