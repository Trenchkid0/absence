import { useState, useEffect } from "react";
import RequestForm from "../components/RequestForm";
import RequestList from "../components/RequestList";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { config } from "../config";

export default function EmployeeDashboard() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("request");

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.api_host_dev}/cuti/user/1?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const res = response.data;
        setRequests(res.data || []);
        setPage(res.page || 1);
        setLimit(res.limit || 5);
        setTotalPages(res.totalPages || 1);
        setTotalItems(res.totalItems || res.data.length || 0);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000", {
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      const userId = parseInt(localStorage.getItem("user_id"));
      if (userId) {
        socket.emit("register", userId);
        console.log("📡 Registered user:", userId);
      }
    });

    socket.on("cuti_revised", (data) => {
      console.log("🔔 Notifikasi diterima:", data);
      toast(`🔔 ${data.message}`);
    });

    socket.on("disconnect", () => console.log("❌ Socket disconnected"));

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [page, limit]);

  const handleNewRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleUpdateRequest = (updatedRequest) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
    );
  };

  const getStatusCounts = () => {
    const counts = { pending: 0, approved: 0, revision: 0, rejected: 0 };

    requests?.forEach((r) => {
      if (r.status === "pending_head" || r.status === "pending_gm")
        counts.pending++;
      else if (r.status === "approved") counts.approved++;
      else if (r.status === "revision") counts.revision++;
      else if (r.status === "rejected") counts.rejected++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">🏢</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Leave Management Dashboard
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="flex border-b">
            {[
              ["request", "📝 Request Leave"],
              ["summary", "📋 My Requests"],
              ["stats", "📊 Statistics"],
            ].map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === tab
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "request" && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Submit New Leave Request
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Fill out the form below to request time off
                  </p>
                </div>
                <RequestForm onSubmit={handleNewRequest} />
              </div>
            )}

            {activeTab === "summary" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      My Leave Requests
                    </h2>
                    <p className="text-gray-600 mt-1">
                      View and manage your submitted leave requests
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-gray-600 text-sm">
                      Show per page:
                    </label>
                    <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="border rounded-md p-1 text-sm"
                    >
                      {[5, 10, 25, 50, 100].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <RequestList
                  data={{ data: requests }}
                  role="employee"
                  onUpdate={handleUpdateRequest}
                />

                <div className="flex justify-center items-center space-x-2 mt-6">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className={`px-3 py-1 border rounded-md ${
                      page <= 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white hover:bg-blue-50 text-blue-600"
                    }`}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1 border rounded-md ${
                        page === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white hover:bg-blue-50 text-blue-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className={`px-3 py-1 border rounded-md ${
                      page >= totalPages
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white hover:bg-blue-50 text-blue-600"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-2">
                  Showing page {page} of {totalPages} — Total {totalItems} data
                </p>
              </div>
            )}

            {/* Tab 3 - Stats */}
            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Leave Statistics
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Overview of your leave request status
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      label: "Pending",
                      count: statusCounts.pending,
                      color: "blue",
                      icon: "⏳",
                    },
                    {
                      label: "Approved",
                      count: statusCounts.approved,
                      color: "green",
                      icon: "✅",
                    },
                    {
                      label: "Need Revision",
                      count: statusCounts.revision,
                      color: "yellow",
                      icon: "📝",
                    },
                    {
                      label: "Rejected",
                      count: statusCounts.rejected,
                      color: "red",
                      icon: "❌",
                    },
                  ].map(({ label, count, color, icon }) => (
                    <div
                      key={label}
                      className={`bg-${color}-50 rounded-xl p-6 border border-${color}-200 shadow-sm hover:shadow-md transition`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-12 w-12 bg-${color}-100 rounded-full flex items-center justify-center`}
                        >
                          <span className={`text-${color}-600 text-xl`}>
                            {icon}
                          </span>
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium text-${color}-600`}
                          >
                            {label}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {count}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
