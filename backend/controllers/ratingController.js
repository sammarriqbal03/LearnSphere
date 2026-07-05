const Rating = require("../models/Rating");
const Course = require("../models/Course");

const addRating = async (req, res) => {
  try {
    const { courseId, studentId, stars, comment } = req.body;

    const existing = await Rating.findOne({ course: courseId, student: studentId });
    if (existing) {
      existing.stars = stars;
      existing.comment = comment;
      await existing.save();
      return res.status(200).json(existing);
    }

    const rating = await Rating.create({ course: courseId, student: studentId, stars, comment });
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRatingsForInstructor = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.instructorId });
    const courseIds = courses.map((c) => c._id);

    const ratings = await Rating.find({ course: { $in: courseIds } })
      .populate("course", "title")
      .populate("student", "name");

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ course: req.params.courseId });
    const avg =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
        : 0;
    res.status(200).json({ average: avg.toFixed(1), count: ratings.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRating, getRatingsForInstructor, getCourseRatings };