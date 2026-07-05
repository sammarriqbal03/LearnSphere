import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { Bell, Award, BookOpen, Circle } from "lucide-react";

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState(() => {
    const stored = localStorage.getItem(`readNotifs_${user._id}`);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [enrollRes, certRes] = await Promise.all([
          axios.get(`https://learnsphere-production-14f7.up.railway.app/api/enrollments/${user._id}`),
          axios.get(`https://learnsphere-production-14f7.up.railway.app/api/certificates/${user._id}`),
        ]);

        const notifs = [
          ...enrollRes.data.map((e) => ({
            id: `enroll-${e._id}`,
            type: "enroll",
            message: `You enrolled in "${e.course?.title}"`,
            date: e.createdAt,
          })),
          ...certRes.data.map((c) => ({
            id: `cert-${c._id}`,
            type: "certificate",
            message: `You earned a certificate for "${c.course?.title}"`,
            date: c.issueDate,
          })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotifications(notifs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user._id]);

  const markAsRead = (id) => {
    const updated = [...readIds, id];
    setReadIds(updated);
    localStorage.setItem(`readNotifs_${user._id}`, JSON.stringify(updated));
  };

  const markAllRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
    localStorage.setItem(`readNotifs_${user._id}`, JSON.stringify(allIds));
  };

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-gray-500 text-sm">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-primary text-sm font-medium hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <Bell size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">You have no new notifications.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, index) => {
            const isRead = readIds.includes(n.id);
            return (
              <div
                key={n.id}
                onClick={() => !isRead && markAsRead(n.id)}
                style={{ animationDelay: `${index * 70}ms` }}
                className={`border rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-x-1 animate-[fadeIn_0.4s_ease-in-out] cursor-pointer ${
                  isRead ? "bg-white" : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
                  {n.type === "certificate" ? (
                    <Award size={18} />
                  ) : (
                    <BookOpen size={18} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">{n.message}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(n.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {!isRead && (
                  <Circle size={8} className="text-primary fill-primary shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;