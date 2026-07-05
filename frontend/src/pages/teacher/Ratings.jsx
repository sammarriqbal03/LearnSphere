import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { Star } from "lucide-react";

const Ratings = () => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/ratings/instructor/${user._id}`
        );
        setRatings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [user._id]);

  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
      : 0;

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Ratings & Reviews</h1>
          <p className="text-gray-500 text-sm">{ratings.length} total reviews</p>
        </div>
        <div className="bg-white border rounded-xl px-6 py-4 text-center shadow-sm transition duration-300 hover:shadow-md">
          <p className="text-3xl font-bold text-primary-dark">{avgRating}</p>
          <div className="flex gap-0.5 justify-center mt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={14}
                className={
                  n <= Math.round(avgRating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
      </div>

      {ratings.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <Star size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No ratings received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ratings.map((r, index) => (
            <div
              key={r._id}
              style={{ animationDelay: `${index * 70}ms` }}
              className="bg-white border rounded-xl p-5 transition-all duration-300 hover:shadow-md animate-[fadeIn_0.4s_ease-in-out]"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-primary-dark">{r.student?.name}</h3>
                  <p className="text-gray-400 text-xs">{r.course?.title}</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={14}
                      className={n <= r.stars ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              {r.comment && <p className="text-gray-600 text-sm">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ratings;