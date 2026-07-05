const express = require("express");
const router = express.Router();
const { addRating, getRatingsForInstructor, getCourseRatings } = require("../controllers/ratingController");

router.post("/", addRating);
router.get("/instructor/:instructorId", getRatingsForInstructor);
router.get("/course/:courseId", getCourseRatings);

module.exports = router;