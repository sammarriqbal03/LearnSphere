import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const Progress = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(
          `https://learnsphere-production-14f7.up.railway.app/api/enrollments/${user._id}`
        );
        setEnrollments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [user._id]);

  const overallProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
        )
      : 0;

  const completedCount = enrollments.filter((e) => e.progress >= 100).length;

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">My Progress</h1>

      {enrollments.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <TrendingUp size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-3">
            Enroll in a course to start tracking your progress.
          </p>
          <Link to="/courses" className="text-primary font-medium hover:underline">
            Browse Courses
          </Link>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white border rounded-2xl p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <p className="text-3xl font-bold text-primary-dark mb-1">
                {enrollments.length}
              </p>
              <p className="text-gray-500 text-sm">Courses Enrolled</p>
            </div>
            <div className="bg-white border rounded-2xl p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <p className="text-3xl font-bold text-primary-dark mb-1">
                {completedCount}
              </p>
              <p className="text-gray-500 text-sm">Courses Completed</p>
            </div>
            <div className="bg-white border rounded-2xl p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <p className="text-3xl font-bold text-primary-dark mb-1">
                {overallProgress}%
              </p>
              <p className="text-gray-500 text-sm">Overall Progress</p>
            </div>
          </div>

          {/* Per Course Progress */}
          <h2 className="text-lg font-semibold text-primary-dark mb-4">
            Course-wise Progress
          </h2>
          <div className="space-y-4">
            {enrollments.map((en, index) => (
              <div
                key={en._id}
                style={{ animationDelay: `${index * 80}ms` }}
                className="bg-white border rounded-xl p-5 transition-all duration-300 hover:shadow-md animate-[fadeIn_0.4s_ease-in-out]"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-primary-dark">
                    {en.course?.title}
                  </h3>
                  <span className="text-sm font-medium text-primary-dark">
                    {en.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-primary to-primary-light h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${en.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Progress;