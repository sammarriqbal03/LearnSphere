import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { User, Lock } from "lucide-react";

const TeacherSettings = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://learnsphere-production-14f7.up.railway.app/api/auth/update-profile/${user._id}`,
        { name }
      );
      login({ ...user, name: res.data.name });
      setProfileMsg("Profile updated successfully!");
    } catch (err) {
      setProfileMsg(err.response?.data?.message || "Update failed");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    try {
      await axios.put(
        `https://learnsphere-production-14f7.up.railway.app/api/auth/change-password/${user._id}`,
        passwords
      );
      setPasswordMsg("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPasswordMsg(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Settings</h1>

      <form
        onSubmit={handleProfileUpdate}
        className="bg-white border rounded-2xl p-6 mb-6 shadow-sm transition duration-300 hover:shadow-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-primary" />
          <h2 className="font-semibold text-primary-dark">Update Profile</h2>
        </div>

        {profileMsg && (
          <p className="text-sm text-primary-dark bg-primary/10 px-3 py-2 rounded-lg mb-4">
            {profileMsg}
          </p>
        )}

        <label className="text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
        >
          Save Changes
        </button>
      </form>

      <form
        onSubmit={handlePasswordChange}
        className="bg-white border rounded-2xl p-6 shadow-sm transition duration-300 hover:shadow-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} className="text-primary" />
          <h2 className="font-semibold text-primary-dark">Change Password</h2>
        </div>

        {passwordMsg && (
          <p className="text-sm text-primary-dark bg-primary/10 px-3 py-2 rounded-lg mb-4">
            {passwordMsg}
          </p>
        )}

        <label className="text-sm text-gray-600">Current Password</label>
        <input
          type="password"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, currentPassword: e.target.value })
          }
          className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        />

        <label className="text-sm text-gray-600">New Password</label>
        <input
          type="password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
          className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 mb-6 focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        />

        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default TeacherSettings;