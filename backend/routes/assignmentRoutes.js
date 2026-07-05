const express = require("express");
const router = express.Router();
const {
  createAssignment,
  getAssignmentsForStudent,
  submitAssignment,
  getMySubmissions,
} = require("../controllers/assignmentController");

router.post("/", createAssignment);
router.get("/student/:studentId", getAssignmentsForStudent);
router.post("/submit", submitAssignment);
router.get("/submissions/:studentId", getMySubmissions);

module.exports = router;