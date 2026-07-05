import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";
import coursePlaceholder from "../../assets/course-placeholder.jpg";

const Wishlist = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`https://learnsphere-production-14f7.up.railway.app/api/wishlist/${user._id}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://learnsphere-production-14f7.up.railway.app/api/wishlist/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Wishlist</h1>
          <p className="text-gray-500 text-sm">
            {items.length} course{items.length !== 1 && "s"} saved
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <Heart size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-3">No courses saved yet.</p>
          <Link to="/courses" className="text-primary font-medium hover:underline">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={item._id}
              style={{ animationDelay: `${index * 80}ms` }}
              className="bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-[fadeIn_0.4s_ease-in-out]"
            >
              <div className="h-32 overflow-hidden relative">
                <img
                  src={item.course?.thumbnail || coursePlaceholder}
                  alt={item.course?.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
                <button
                  onClick={() => handleRemove(item._id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-primary-dark mb-1 line-clamp-1">
                  {item.course?.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {item.course?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-dark font-bold">
                    Rs. {item.course?.price}
                  </span>
                  <Link
                    to={`/courses/${item.course?._id}`}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;