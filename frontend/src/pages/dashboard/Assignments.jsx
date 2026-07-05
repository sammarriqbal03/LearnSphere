import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";

const Assignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");

  const fetchData = async () => {
    try {
      const [aRes, sRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/assignments/student/${user._id}`),
        axios.get(`http://localhost:5000/api/assignments/submissions/${user._id}`),
      ]);
      setAssignments(aRes.data);
      setSubmissions(sRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isSubmitted = (assignmentId) =>
    submissions.some((s) => s.assignment === assignmentId);

  const handleSubmit = async (assignmentId) => {
    if (!answer.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/assignments/submit", {
        assignmentId,
        studentId: user._id,
        answerText: answer,
      });
      setMsg("Assignment submitted successfully!");
      setAnswer("");
      setActiveId(null);
      fetchData();
    } catch (err) {
      setMsg(err.response?.data?.message || "Submission failed");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Assignments</h1>

      {msg && (
        <div className="bg-primary/10 text-primary-dark text-sm px-4 py-3 rounded-lg mb-5 animate-[fadeIn_0.3s_ease-in-out]">
          {msg}
        </div>
      )}

      {assignments.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <ClipboardList size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No assignments available right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((a, index) => {
            const submitted = isSubmitted(a._id);
            return (
              <div
                key={a._id}
                style={{ animationDelay: `${index * 80}ms` }}
                className="bg-white border rounded-xl p-5 transition-all duration-300 hover:shadow-md animate-[fadeIn_0.4s_ease-in-out]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-primary-dark">{a.title}</h3>
                    <p className="text-gray-400 text-xs">{a.course?.title}</p>
                  </div>
                  {submitted ? (
                    <span className="flex items-center gap-1 text-primary-dark text-xs font-medium bg-primary/10 px-3 py-1 rounded-full">
                      <CheckCircle size={14} />
                      Submitted
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600 text-xs font-medium bg-amber-50 px-3 py-1 rounded-full">
                      <Clock size={14} />
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-4">{a.description}</p>

                {!submitted && (
                  <>
                    {activeId === a._id ? (
                      <div className="animate-[fadeIn_0.3s_ease-in-out]">
                        <textarea
                          rows="3"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Write your answer here..."
                          className="w-full border border-gray-300 p-2.5 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        ></textarea>
                        <button
                          onClick={() => handleSubmit(a._id)}
                          className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                        >
                          Submit Answer
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveId(a._id)}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Attempt Assignment
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Assignments;