const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssignmentsForStudent = async (req, res) => {
  try {
    const Enrollment = require("../models/Enrollment");
    const enrollments = await Enrollment.find({ student: req.params.studentId });
    const courseIds = enrollments.map((e) => e.course);

    const assignments = await Assignment.find({ course: { $in: courseIds } }).populate(
      "course",
      "title"
    );
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId, answerText } = req.body;
    const existing = await Submission.findOne({
      assignment: assignmentId,
      student: studentId,
    });
    if (existing) {
      return res.status(400).json({ message: "Already submitted" });
    }
    const submission = await Submission.create({
      assignment: assignmentId,
      student: studentId,
      answerText,
    });
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.params.studentId });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignmentsForStudent,
  submitAssignment,
  getMySubmissions,
};