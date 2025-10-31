import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";

export default function RequestList({ data, role }) {
  const roleID = parseInt(localStorage.getItem("role_id"));
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  console.log(role);

  const openDetailModal = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${config.api_host_dev}/cuti/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedRequest(res.data.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching detail:", err);
    }
  };

  const handleAction = async (action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${config.api_host_dev}/cuti/${selectedRequest.id}`,
        { status: action, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowModal(false);
      setComment("");
      location.reload();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded text-xs font-semibold capitalize";
    switch (status) {
      case "approved":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>Approved</span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>
        );
      case "revision":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            Revision
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>
        );
    }
  };

  return (
    <>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Tanggal Mulai</th>
            <th className="border p-2">Tanggal Selesai</th>
            <th className="border p-2">Tipe</th>
            <th className="border p-2">Alasan</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.length > 0 ? (
            data.data.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{req.id}</td>
                <td className="border p-2 text-center">{req.start_date}</td>
                <td className="border p-2 text-center">{req.end_date}</td>
                <td className="border p-2 text-center">{req.leave_type}</td>
                <td className="border p-2">{req.reason}</td>
                <td className="border p-2 text-center">
                  {getStatusBadge(req.status)}
                </td>
                <td className="border p-2 text-center">
                  {roleID === 1 ? (
                    <Link
                      to={`/request/?id=${req.id}`}
                      className="text-blue-600 underline"
                    >
                      Lihat
                    </Link>
                  ) : roleID === 2 || roleID === 3 ? (
                    <button
                      onClick={() => openDetailModal(req.id)}
                      className="text-blue-600 underline"
                    >
                      Detail
                    </button>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border p-3 text-center text-gray-500">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Detail Cuti
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Jenis Cuti:</span>{" "}
                {selectedRequest.leave_type}
              </p>
              <p>
                <span className="font-medium">Alasan:</span>{" "}
                {selectedRequest.reason}
              </p>
              <p>
                <span className="font-medium">Tanggal Mulai:</span>{" "}
                {selectedRequest.start_date}
              </p>
              <p>
                <span className="font-medium">Tanggal Selesai:</span>{" "}
                {selectedRequest.end_date}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedRequest.status}
              </p>

              {selectedRequest.attachment && (
                <div>
                  <span className="font-medium">Lampiran:</span>{" "}
                  <a
                    href={`${config.api_image}/uploads/${selectedRequest.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Lihat File
                  </a>
                </div>
              )}
            </div>

            {(roleID === 2 || roleID === 3) && (
              <div className="mt-6 border-t pt-4 space-y-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tulis komentar..."
                  className="w-full border rounded-md p-2 text-sm"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleAction("approved")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction("revision")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Revision
                  </button>
                  {role == "head" && (
                    <button
                      onClick={() => handleAction("rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
