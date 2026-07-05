const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getTeachers,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/teachers", getTeachers);
router.put("/update-profile/:id", updateProfile);
router.put("/change-password/:id", changePassword);

module.exports = router;