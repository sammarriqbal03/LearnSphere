import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logo.jpeg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-primary flex-col items-center justify-center p-10">
        <img src={logo} alt="LearnSphere" className="w-40 mb-6 bg-white rounded-xl p-4" />
        <h1 className="text-white text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-white/90 text-center max-w-sm">
          Login to continue your learning journey with LearnSphere.
        </p>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-1 text-primary-dark">Login</h2>
          <p className="text-gray-500 mb-6 text-sm">Enter your credentials to continue</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <label className="text-sm text-gray-600">Password</label>
          <div className="relative mt-1 mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;