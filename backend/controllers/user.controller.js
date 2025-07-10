import User from "../models/User.model.js";
import Item from "../models/Item.model.js";

// @desc Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update contact info preferences
export const updateProfile = async (req, res) => {
  try {
    const { phone, showPhone, showEmail } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          "contactInfo.phone": phone,
          "contactInfo.showPhone": showPhone,
          "contactInfo.showEmail": showEmail,
        },
      },
      { new: true }
    ).select("-__v");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};


// @desc Complete user profile (called after Google OAuth)
export const completeProfile = async (req, res) => {
  try {
    const user = req.user; // From passport session or JWT middleware

    const { contactInfo } = req.body;

    if (!contactInfo || !contactInfo.phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    user.contactInfo = {
      phone: contactInfo.phone,
      showPhone: contactInfo.showPhone || false,
      showEmail: contactInfo.showEmail !== undefined ? contactInfo.showEmail : true,
    };

    await user.save();

    res.status(200).json({ message: "Profile completed" });
  } catch (err) {
    console.error("Error in completeProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete account + their items
export const deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all items created by the user
    await Item.deleteMany({ user: userId });

    // Delete user account
    await User.findByIdAndDelete(userId);

    // Log out the session if using Passport
    req.logout((err) => {
      if (err) console.error("Logout error:", err);
    });

    res
      .status(200)
      .json({ message: "User account and items deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete account", error: err.message });
  }
};
