import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  const roleID = parseInt(localStorage.getItem("role_id"));

  const homePath = roleID === 1 ? "/dashboard" : "/head";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notification");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `${config.api_host_dev}/historyCuti/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotifications(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat notifikasi:", err);
      }
    };

    fetchNotifications();
  }, [token, userId]);

  const unreadCount = notifications.length;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to={homePath} className="font-bold text-xl hover:underline">
        CutiApp
      </Link>
      <div className="flex items-center space-x-4 relative">
        <span className="hidden md:inline">Welcome, {username} 👋</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded-md text-white font-medium"
        >
          Logout
        </button>

        <div className="relative">
          {userId === "1" ? (
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-full hover:bg-blue-500 transition-colors"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              See All Transaction
            </button>
          )}

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 z-50">
              <h2 className="font-semibold p-3 border-b">Notifikasi</h2>
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-sm p-3">
                  Tidak ada notifikasi
                </p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <p className="text-sm">
                      <span className="font-semibold capitalize">
                        {notif.role}
                      </span>{" "}
                      melakukan{" "}
                      <span
                        className={`font-semibold ${
                          notif.action === "approved"
                            ? "text-green-600"
                            : notif.action === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {notif.action}
                      </span>{" "}
                      pada cuti #{notif.req_cuti_id}
                    </p>
                    {notif.comment && (
                      <p className="text-xs text-gray-500 italic mt-1">
                        “{notif.comment}”
                      </p>
                    )}
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date(notif.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
              <Link
                to={`/notification/${userId}`}
                className="block text-center text-blue-600 font-medium border-t hover:bg-gray-50 p-2"
                onClick={() => setShowNotif(false)}
              >
                Lihat Semua
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
