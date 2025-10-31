import { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "../components/NotificationList";
import Pagination from "../components/Pagination.jsx";
import { config } from "../config/index.js";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const roleId = localStorage.getItem("role)id");
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const role = roleId === 1 ? "employee" : "head";

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const url =
        role === "employee"
          ? `${config.api_host_dev}/historyCuti/user/${userId}?page=${page}&limit=${limit}`
          : `${config.api_host_dev}/historyCuti?page=${page}&limit=${limit}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(res?.data?.data || []);
      setTotalPages(res?.data?.totalPages || 1);
    } catch (err) {
      console.error("❌ Gagal memuat notifikasi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, limit]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notifikasi</h1>

      {/* Limit Selector */}
      <div className="flex justify-end mb-4 space-x-2">
        <label className="text-gray-600 text-sm">Tampilkan per halaman:</label>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border rounded-md p-1 text-sm"
        >
          {[5, 10, 25, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <NotificationList notifications={notifications} loading={loading} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        onSelectPage={(p) => setPage(p)}
      />
    </div>
  );
}
