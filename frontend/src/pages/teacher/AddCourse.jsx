import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { BookOpen, DollarSign, Clock, Tag, ListChecks, Image as ImageIcon } from "lucide-react";

const AddCourse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    curriculum: "",
    thumbnail: "",
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const imgData = new FormData();
    imgData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/courses/upload-image",
        imgData
      );
      setFormData((prev) => ({ ...prev, thumbnail: res.data.url }));
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:5000/api/courses", {
        ...formData,
        instructor: user._id,
        price: Number(formData.price),
        curriculum: formData.curriculum.split(",").map((c) => c.trim()),
      });
      setSuccess("Course created successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        category: "",
        curriculum: "",
        thumbnail: "",
      });
      setTimeout(() => navigate("/teacher-dashboard/my-courses"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-primary-dark mb-1">Add New Course</h1>
      <p className="text-gray-500 text-sm mb-6">
        Fill in the details below to publish a new course
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-8 shadow-sm transition duration-300 hover:shadow-md"
      >
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-primary/10 text-primary-dark text-sm px-4 py-3 rounded-lg mb-5">
            {success}
          </div>
        )}

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <BookOpen size={16} className="text-primary" />
            Course Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Complete Web Development Bootcamp"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe what students will learn in this course..."
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <DollarSign size={16} className="text-primary" />
              Price (Rs.)
            </label>
            <input
              type="number"
              name="price"
              placeholder="1999"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock size={16} className="text-primary" />
              Duration
            </label>
            <input
              type="text"
              name="duration"
              placeholder="6 weeks"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Tag size={16} className="text-primary" />
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="Web Development"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <ListChecks size={16} className="text-primary" />
            Curriculum (comma separated)
          </label>
          <input
            type="text"
            name="curriculum"
            placeholder="Introduction, Basics, Advanced Topics, Final Project"
            value={formData.curriculum}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <ImageIcon size={16} className="text-primary" />
            Course Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 p-2.5 rounded-lg text-sm"
          />
          {uploading && (
            <p className="text-primary text-sm mt-2">Uploading, please wait...</p>
          )}
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="w-32 h-20 object-cover rounded-lg mt-3 border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition disabled:opacity-50"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;