const Enrollment = require("../models/Enrollment");

// @desc   Enroll student into a course
const enrollCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const alreadyEnrolled = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all courses a student is enrolled in
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.params.studentId,
    }).populate("course");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollCourse, getMyEnrollments };