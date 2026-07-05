import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import coursePlaceholder from "../assets/course-placeholder.jpg";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://learnsphere-production-14f7.up.railway.app/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-10 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Explore Our Courses</h1>
        <p className="text-gray-500">Find the right course to start your learning journey</p>
      </div>

      <div className="max-w-3xl mx-auto mb-10 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">Loading courses...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && filteredCourses.length === 0 && (
        <p className="text-center text-gray-500">No courses match your search.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-36 overflow-hidden">
              <img
                src={course.thumbnail ? course.thumbnail : coursePlaceholder}
                alt={course.title}
                className="w-full h-full object-cover transition duration-500 hover:scale-110"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-lg text-primary-dark mb-2">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-2">{course.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">{course.instructor?.name || "N/A"}</span>
                <span className="text-primary-dark font-bold">Rs. {course.price}</span>
              </div>

              <Link
                to={`/courses/${course._id}`}
                className="bg-primary text-white text-center py-2 rounded-lg hover:bg-primary-dark transition"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;