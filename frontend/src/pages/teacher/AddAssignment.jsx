import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { ClipboardList } from "lucide-react";

const AddAssignment = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ course: "", title: "", description: "", dueDate: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/courses/instructor/${user._id}`
        );
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [user._id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/assignments", formData);
      setMsg("Assignment created successfully!");
      setFormData({ course: "", title: "", description: "", dueDate: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create assignment");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Add Assignment</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm transition duration-300 hover:shadow-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={18} className="text-primary" />
          <h2 className="font-semibold text-primary-dark">New Assignment</h2>
        </div>

        {msg && (
          <p className="text-sm text-primary-dark bg-primary/10 px-3 py-2 rounded-lg mb-4">
            {msg}
          </p>
        )}

        <label className="text-sm text-gray-600">Select Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        >
          <option value="">-- Select --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <label className="text-sm text-gray-600">Assignment Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        />

        <label className="text-sm text-gray-600">Description</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
        ></textarea>

        <label className="text-sm text-gray-600">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition"
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default AddAssignment;