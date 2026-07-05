import { useAuth } from "../../context/useAuth";
import { Mail, Shield, Calendar, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import dashboardBanner from "../../assets/dashboard-banner.jpg";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Banner */}
      <div className="relative h-44 rounded-2xl overflow-hidden mb-8 group">
        <img
          src={dashboardBanner}
          alt="Welcome"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary-dark/40 flex items-center px-8">
          <div className="animate-[fadeIn_0.5s_ease-in-out]">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Here's a quick look at your learning profile.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Avatar Card */}
        <div className="bg-white border rounded-2xl p-6 text-center shadow-sm transition duration-300 hover:shadow-lg">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-md transition duration-300 hover:scale-105">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <h2 className="font-semibold text-lg text-primary-dark">{user?.name}</h2>
          <span className="inline-block bg-primary/10 text-primary-dark text-xs font-medium px-3 py-1 rounded-full mt-2 capitalize">
            {user?.role}
          </span>

          <Link
            to="/dashboard/settings"
            className="flex items-center justify-center gap-2 mt-5 border border-primary text-primary py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition"
          >
            <Edit3 size={14} />
            Edit Profile
          </Link>
        </div>

        {/* Right - Info Cards */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 shadow-sm transition duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Email Address</p>
              <p className="font-medium text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 shadow-sm transition duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Account Type</p>
              <p className="font-medium text-gray-800 capitalize">{user?.role}</p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 shadow-sm transition duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Member Since</p>
              <p className="font-medium text-gray-800">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "Recently joined"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;