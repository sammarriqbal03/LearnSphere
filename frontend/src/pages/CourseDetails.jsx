import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { Heart } from "lucide-react"; // ✅ NEW
import courseBanner from "../assets/course-banner.jpg";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollMsg, setEnrollMsg] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        setError("Course not found");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/enrollments", {
        studentId: user._id,
        courseId: course._id,
      });
      setEnrollMsg("Successfully enrolled!");
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || "Enrollment failed");
    }
  };

  // ✅ NEW FUNCTION (Wishlist)
  const handleWishlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/wishlist", {
        studentId: user._id,
        courseId: course._id,
      });
      setEnrollMsg("Added to wishlist!");
    } catch (err) {
      setEnrollMsg(
        err.response?.data?.message || "Failed to add to wishlist"
      );
    }
  };

  if (loading)
    return (
      <p className="text-center py-12 text-gray-500">Loading course...</p>
    );
  if (error)
    return (
      <p className="text-center py-12 text-red-500">{error}</p>
    );
  if (!course) return null;

  return (
    <div className="px-10 py-12 max-w-5xl mx-auto">
      <div className="h-64 rounded-xl overflow-hidden mb-8">
        <img
          src={courseBanner}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <span className="text-primary font-semibold text-sm">
            {course.category || "Course"}
          </span>

          <h1 className="text-3xl font-bold text-primary-dark mt-2 mb-4">
            {course.title}
          </h1>

          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary-dark mb-3">
              Curriculum
            </h2>

            {course.curriculum && course.curriculum.length > 0 ? (
              <ul className="space-y-2">
                {course.curriculum.map((item, index) => (
                  <li
                    key={index}
                    className="bg-white border rounded-lg px-4 py-3 text-gray-700 flex items-center gap-3"
                  >
                    <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary-dark rounded-full text-sm font-semibold">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Curriculum not added yet.
              </p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary-dark mb-3">
              Instructor
            </h2>

            <div className="bg-white border rounded-lg p-4">
              <p className="font-medium text-gray-800">
                {course.instructor?.name || "N/A"}
              </p>
              <p className="text-gray-500 text-sm">
                {course.instructor?.email}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border rounded-xl shadow-sm p-6 sticky top-6">
            <p className="text-2xl font-bold text-primary-dark mb-1">
              Rs. {course.price}
            </p>

            <p className="text-gray-500 text-sm mb-4">
              Duration: {course.duration || "N/A"}
            </p>

            {enrollMsg && (
              <p className="text-sm text-primary-dark mb-3">
                {enrollMsg}
              </p>
            )}

            {/* ✅ Enroll Button */}
            <button
              onClick={handleEnroll}
              className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition mb-3"
            >
              Enroll Now
            </button>

            {/* ✅ Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="w-full border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary/10 transition flex items-center justify-center gap-2 mb-3"
            >
              <Heart size={16} />
              Add to Wishlist
            </button>

            <Link
              to="/courses"
              className="block text-center text-primary text-sm hover:underline"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;