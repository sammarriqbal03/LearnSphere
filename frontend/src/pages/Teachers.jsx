import { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Star, BookOpen } from "lucide-react";
import teachersBanner from "../assets/teacher-banner2.jpg";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("https://learnsphere-production-14f7.up.railway.app/api/auth/teachers");
        setTeachers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const getInitials = (name) => {
    if (!name) return "T";
    return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img
          src={teachersBanner}
          alt="Our Teachers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/85 to-primary-dark/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">Meet Our Teachers</h1>
            <p className="text-white/80">Learn from experienced and qualified instructors</p>
          </div>
        </div>
      </div>

      <div className="px-10 py-16">
        {loading && <p className="text-center text-gray-500">Loading teachers...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && teachers.length === 0 && (
          <p className="text-center text-gray-500">No teachers registered yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teachers.map((teacher) => (
            <div key={teacher._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-20 bg-gradient-to-r from-primary to-primary-light relative">
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
                    <div className="w-full h-full rounded-full bg-primary/10 text-primary-dark flex items-center justify-center text-xl font-bold">
                      {getInitials(teacher.name)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 pb-6 px-5 text-center">
                <h3 className="font-semibold text-lg text-primary-dark mb-1">{teacher.name}</h3>
                <p className="text-gray-400 text-xs mb-3 truncate">{teacher.email}</p>

                <div className="flex items-center justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-gray-400 text-xs ml-1">(New)</span>
                </div>

                <div className="flex items-center justify-center gap-4 text-gray-500 text-xs mb-4 pb-4 border-b">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    Instructor
                  </span>
                </div>

                <a href={`mailto:${teacher.email}`} className="flex items-center justify-center gap-2 text-primary text-sm font-medium hover:text-primary-dark transition">
                  <Mail size={14} />
                  Contact
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;