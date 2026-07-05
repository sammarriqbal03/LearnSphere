const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const exists = await Wishlist.findOne({ student: studentId, course: courseId });
    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }
    const item = await Wishlist.create({ student: studentId, course: courseId });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ student: req.params.studentId }).populate("course");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };