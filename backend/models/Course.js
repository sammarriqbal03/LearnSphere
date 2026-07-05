const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    price: { type: Number, required: true },
    duration: { type: String },
    thumbnail: { type: String },
    curriculum: [{ type: String }],
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);