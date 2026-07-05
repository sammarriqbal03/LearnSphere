const express = require("express");
const router = express.Router();
const { enrollCourse, getMyEnrollments } = require("../controllers/enrollmentController");

router.post("/", enrollCourse);
router.get("/:studentId", getMyEnrollments);

module.exports = router;