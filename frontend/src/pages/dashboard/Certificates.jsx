import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { Award } from "lucide-react";
import certificateBadge from "../../assets/certificate-badge.jpg";

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(
          `https://learnsphere-production-14f7.up.railway.app/api/certificates/${user._id}`
        );
        setCertificates(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [user._id]);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <Award size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            Complete a course to earn your first certificate.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert._id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-[fadeIn_0.4s_ease-in-out]"
            >
              <div className="h-32 overflow-hidden relative">
                <img
                  src={certificateBadge}
                  alt="Certificate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-dark/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award size={40} className="text-white" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-primary-dark mb-1">
                  {cert.course?.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  Issued on{" "}
                  {new Date(cert.issueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <span className="inline-block bg-primary/10 text-primary-dark text-xs font-mono px-3 py-1 rounded-full">
                  ID: {cert.certificateId}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;