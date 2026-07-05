import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";
import { Award, CheckCircle, Star } from "lucide-react";

const MyCourses = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [ratingFor, setRatingFor] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/enrollments/${user._id}`);
      setEnrollments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleComplete = async (courseId) => {
    try {
      await axios.post("http://localhost:5000/api/certificates", {
        studentId: user._id,
        courseId,
      });
      setMsg("Course marked complete! Certificate issued.");
      fetchEnrollments();
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to complete course");
    }
  };

  const submitRating = async (courseId) => {
    if (stars === 0) return;
    try {
      await axios.post("http://localhost:5000/api/ratings", {
        courseId,
        studentId: user._id,
        stars,
        comment,
      });
      setMsg("Thanks for your rating!");
      setRatingFor(null);
      setStars(0);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">My Courses</h1>

      {msg && (
        <div className="bg-primary/10 text-primary-dark text-sm px-4 py-3 rounded-lg mb-5 animate-[fadeIn_0.3s_ease-in-out]">
          {msg}
        </div>
      )}

      {enrollments.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="text-primary font-medium hover:underline">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrollments.map((en, index) => (
            <div
              key={en._id}
              style={{ animationDelay: `${index * 80}ms` }}
              className="bg-white border rounded-xl p-5 transition-all duration-300 hover:shadow-md animate-[fadeIn_0.4s_ease-in-out]"
            >
              <h3 className="font-semibold text-primary-dark mb-1">{en.course?.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{en.course?.description}</p>

              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-700"
                  style={{ width: `${en.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mb-4">{en.progress}% completed</p>

              {en.progress >= 100 ? (
                <div>
                  <span className="flex items-center gap-2 text-primary-dark text-sm font-medium mb-2">
                    <CheckCircle size={16} />
                    Completed
                  </span>

                  {ratingFor === en.course._id ? (
                    <div className="mt-2 animate-[fadeIn_0.3s_ease-in-out]">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            size={22}
                            onClick={() => setStars(n)}
                            className={`cursor-pointer transition ${
                              n <= stars ? "text-amber-400 fill-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <textarea
                        rows="2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a review (optional)"
                        className="w-full border border-gray-300 p-2 rounded-lg text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                      ></textarea>
                      <div className="flex gap-2">
                        <button
                          onClick={() => submitRating(en.course._id)}
                          className="bg-primary text-white text-sm px-4 py-1.5 rounded-lg hover:bg-primary-dark transition"
                        >
                          Submit Rating
                        </button>
                        <button
                          onClick={() => setRatingFor(null)}
                          className="text-gray-500 text-sm px-4 py-1.5 rounded-lg hover:bg-gray-100 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRatingFor(en.course._id)}
                      className="flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                    >
                      <Star size={14} />
                      Rate this course
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleComplete(en.course._id)}
                  className="flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                >
                  <Award size={16} />
                  Mark as Complete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;