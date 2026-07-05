import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  User,
  BookOpen,
  PlusCircle,
  Star,
  ClipboardList,
  Settings,
  Menu,
  X,
  Heart, // ✅ ADDED
} from "lucide-react";

const menuItems = [
  { name: "Profile", path: "/teacher-dashboard/profile", icon: User },
  { name: "My Courses", path: "/teacher-dashboard/my-courses", icon: BookOpen },
  { name: "Add Course", path: "/teacher-dashboard/add-course", icon: PlusCircle },
  { name: "Add Assignment", path: "/teacher-dashboard/add-assignment", icon: ClipboardList },
  { name: "Wishlist", path: "/teacher-dashboard/wishlist", icon: Heart }, // ✅ ADDED
  { name: "Ratings", path: "/teacher-dashboard/ratings", icon: Star },
  { name: "Settings", path: "/teacher-dashboard/settings", icon: Settings },
];

const TeacherDashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div
        style={{ color: "#ffffff", backgroundColor: "rgba(255,255,255,0.2)" }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-3"
      >
        {user?.name?.[0]?.toUpperCase()}
      </div>

      <p style={{ color: "#ffffff" }} className="font-semibold text-base">
        {user?.name}
      </p>

      <p
        style={{ color: "rgba(255,255,255,0.7)" }}
        className="text-xs mb-4"
      >
        Teacher Account
      </p>

      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            style={{ color: "#ffffff" }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
                : "hover:bg-white/10 hover:translate-x-1"
            }`}
          >
            <Icon size={18} style={{ color: "#ffffff" }} />
            <span>{item.name}</span>
          </Link>
        );
      })}

      <p
        style={{ color: "rgba(255,255,255,0.6)" }}
        className="text-xs text-center mt-6"
      >
        LearnSphere Teacher Panel
      </p>
    </>
  );

  return (
    <div className="flex min-h-screen">

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-primary-dark hidden md:flex flex-col p-4">
        <SidebarContent />
      </aside>

      {/* Floating Button */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{ backgroundColor: "#145c3d" }}
        className="md:hidden fixed bottom-5 right-5 z-40 text-white p-3 rounded-full shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          ></div>

          <aside className="absolute left-0 top-0 h-full w-64 bg-primary-dark flex flex-col animate-[fadeIn_0.3s_ease-in-out] p-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X size={22} />
            </button>

            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 animate-[fadeIn_0.4s_ease-in-out]">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;