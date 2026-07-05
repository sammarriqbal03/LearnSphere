import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";
import { Trash2, Users, Clock, Plus } from "lucide-react";
import coursePlaceholder from "../../assets/teacher-course-thumb.jpg";

const TeacherMyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `https://learnsphere-production-14f7.up.railway.app/api/courses/instructor/${user._id}`
      );
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`https://learnsphere-production-14f7.up.railway.app/api/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">My Courses</h1>
          <p className="text-gray-500 text-sm">
            {courses.length} course{courses.length !== 1 && "s"} published
          </p>
        </div>
        <Link
          to="/teacher-dashboard/add-course"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
        >
          <Plus size={16} />
          Add Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <p className="text-gray-500 mb-4">You haven't created any courses yet.</p>
          <Link
            to="/teacher-dashboard/add-course"
            className="text-primary font-medium hover:underline"
          >
            Create your first course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course._id}
              style={{ animationDelay: `${index * 80}ms` }}
              className="bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-[fadeIn_0.4s_ease-in-out]"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={coursePlaceholder}
                  alt={course.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
                  {course.category || "Course"}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-primary-dark mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    0 students
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-primary-dark font-bold text-lg">
                    Rs. {course.price}
                  </span>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex items-center gap-1 text-red-500 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-50 transition"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherMyCourses;