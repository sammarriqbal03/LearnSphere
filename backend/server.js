const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const ratingRoutes = require("./routes/ratingRoutes"); // ✅ ADDED

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("LearnSphere API is running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ratings", ratingRoutes); // ✅ ADDED

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});