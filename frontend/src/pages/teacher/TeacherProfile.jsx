import { useAuth } from "../../context/useAuth";
import { Mail, BookOpen, Star, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dashboardBanner from "../../assets/dashboard-banner.jpg";

const TeacherProfile = () => {
  const { user } = useAuth();
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(
          `https://learnsphere-production-14f7.up.railway.app/api/courses/instructor/${user._id}`
        );
        setCourseCount(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCount();
  }, [user._id]);

  return (
    <div>
      <div className="relative h-44 rounded-2xl overflow-hidden mb-8 group">
        <img
          src={dashboardBanner}
          alt="Welcome"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary-dark/40 flex items-center px-8">
          <div className="animate-[fadeIn_0.5s_ease-in-out]">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Welcome, {user?.name}!
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Manage your courses and grow your teaching impact.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border rounded-2xl p-6 text-center shadow-sm transition duration-300 hover:shadow-lg">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-md transition duration-300 hover:scale-105">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <h2 className="font-semibold text-lg text-primary-dark">{user?.name}</h2>
          <span className="inline-block bg-primary/10 text-primary-dark text-xs font-medium px-3 py-1 rounded-full mt-2">
            Instructor
          </span>
          <Link
            to="/teacher-dashboard/settings"
            className="flex items-center justify-center gap-2 mt-5 border border-primary text-primary py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition"
          >
            <Edit3 size={14} />
            Edit Profile
          </Link>
        </div>

        <div className="bg-white border rounded-2xl p-6 flex flex-col justify-center items-center shadow-sm transition duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark mb-3">
            <BookOpen size={22} />
          </div>
          <p className="text-3xl font-bold text-primary-dark">{courseCount}</p>
          <p className="text-gray-500 text-sm">Courses Published</p>
        </div>

        <div className="bg-white border rounded-2xl p-6 flex flex-col justify-center items-center shadow-sm transition duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark mb-3">
            <Star size={22} />
          </div>
          <p className="text-3xl font-bold text-primary-dark">--</p>
          <p className="text-gray-500 text-sm">Average Rating</p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 shadow-sm transition duration-300 hover:shadow-md">
        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
          <Mail size={20} />
        </div>
        <div>
          <p className="text-gray-400 text-xs">Email Address</p>
          <p className="font-medium text-gray-800">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;