import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpeg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Teachers", path: "/teachers" },
  { name: "Pricing", path: "/pricing" },
  { name: "Events", path: "/events" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="relative shadow-md bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="LearnSphere" className="h-12 md:h-14" />
        </Link>

        <ul className="hidden lg:flex gap-5 list-none text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="hover:text-primary transition">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-3 items-center">
          {user ? (
            <>
              <Link
                to={user.role === "teacher" ? "/teacher-dashboard" : "/dashboard"}
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{ backgroundColor: "#145c3d", color: "#ffffff" }}
                className="px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{ backgroundColor: "#145c3d", color: "#ffffff" }}
                className="px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-primary-dark"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-4 animate-[fadeIn_0.3s_ease-in-out]">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium mb-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1 hover:text-primary transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={user.role === "teacher" ? "/teacher-dashboard" : "/dashboard"}
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  style={{ backgroundColor: "#145c3d", color: "#ffffff" }}
                  className="px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  style={{ backgroundColor: "#145c3d", color: "#ffffff" }}
                  className="px-4 py-2 rounded-lg hover:opacity-90 transition text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;