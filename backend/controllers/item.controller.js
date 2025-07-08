import Item from "../models/Item.model.js";
import cloudinary from "../utils/cloudinary.util.js";
import fs from "fs";

// @desc Create new Lost or Found item
export const reportItem = async (req, res) => {
  try {
    const { title, description, location, date, type } = req.body;

    if (!title || !location || !date || !type) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "findit_items",
        transformation: [{ width: 800, height: 600, crop: "limit" }],
      });

      imageUrl = result.secure_url;

      // Clean up local file
      fs.unlinkSync(req.file.path);
    }

    const item = new Item({
      type,
      title,
      description,
      location,
      date,
      imageUrl,
      user: req.user._id,
    });

    await item.save();

    res.status(201).json({ message: "Item reported successfully", item });
  } catch (err) {
    console.error("Error uploading or saving item:", err);
    res.status(500).json({ message: "Error reporting item" });
  }
};

// @desc Get all Lost or Found items
export const getItems = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = {};
    if (type === "lost" || type === "found") {
      filter.type = type;
    }

    const items = await Item.find(filter)
      .sort({ createdAt: -1 })
      .populate("user", "name email photo");

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching items" });
  }
};

// @desc Get items reported by current user
export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching your posts" });
  }
};

// @desc Delete item by ID
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();

    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting item" });
  }
};
