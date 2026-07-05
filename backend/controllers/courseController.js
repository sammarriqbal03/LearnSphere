const Course = require("../models/Course");
const cloudinary = require("../config/cloudinary");

// @desc   Create a new course
// @route  POST /api/courses
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      price,
      duration,
      thumbnail,
      category,
      curriculum,
    } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor,
      price,
      duration,
      thumbnail,
      category,
      curriculum,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all courses
// @route  GET /api/courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single course by ID
// @route  GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get courses by instructor
// @route  GET /api/courses/instructor/:instructorId
const getCoursesByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.params.instructorId,
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update a course
// @route  PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a course
// @route  DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Upload course thumbnail image to Cloudinary
// @route  POST /api/courses/upload-image
const uploadCourseImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "learnsphere_courses",
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  getCoursesByInstructor,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
};