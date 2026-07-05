const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createCourse,
  getCourses,
  getCourseById,
  getCoursesByInstructor,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
} = require("../controllers/courseController");

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/instructor/:instructorId", getCoursesByInstructor);
router.post("/upload-image", upload.single("image"), uploadCourseImage);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;