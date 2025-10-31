import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { config } from "../config";

export default function RequestDetail({ id }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    leave_type: "",
    reason: "",
    attachment: null,
  });

  const token = localStorage.getItem("token");

  const fetchDetail = async () => {
    try {
      const res = await axios.get(`${config.api_host_dev}/cuti/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetail(res?.data?.data);
      setFormData({
        start_date: res?.data?.data?.start_date,
        end_date: res?.data?.data?.end_date,
        leave_type: res?.data?.data?.leave_type,
        reason: res?.data?.data?.reason,
        attachment: null,
      });
    } catch (err) {
      console.error("Error fetching detail:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log(detail);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData((prev) => ({ ...prev, attachment: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("start_date", formData.start_date);
    data.append("end_date", formData.end_date);
    data.append("leave_type", formData.leave_type);
    data.append("reason", formData.reason);
    if (formData.attachment) data.append("attachment", formData.attachment);

    try {
      await axios.put(`${config.api_host_dev}/cuti/revision/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast("Berhasil memperbarui data cuti");
      setIsEditing(false);
      fetchDetail();
    } catch (err) {
      console.error("Error updating cuti:", err);
      alert("Gagal memperbarui data cuti");
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 text-xs font-semibold rounded-full";
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

  if (loading)
    return (
      <div className="flex items-center justify-center py-10 text-gray-600">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
        Loading detail...
      </div>
    );

  if (!detail)
    return (
      <div className="text-center py-10 text-gray-500">
        Data tidak ditemukan.
      </div>
    );

  return (
    <div className="space-y-4">
      {isEditing ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-sm">Tanggal Mulai</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Tanggal Selesai</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Tipe Cuti</label>
              <select
                name="leave_type"
                value={formData.leave_type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="">Pilih tipe cuti</option>
                <option value="cuti_tahunan">Cuti Tahunan</option>
                <option value="sakit">Sakit</option>
                <option value="izin">Izin</option>
              </select>
            </div>
            <div>
              <label className="text-gray-500 text-sm">
                Lampiran (opsional)
              </label>
              <input
                type="file"
                name="attachment"
                accept="image/*,application/pdf"
                onChange={handleChange}
                className="w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm">Alasan</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Tanggal Mulai</p>
              <p className="font-medium text-gray-800">{detail.start_date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tanggal Selesai</p>
              <p className="font-medium text-gray-800">{detail.end_date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tipe Cuti</p>
              <p className="font-medium text-gray-800 capitalize">
                {detail.leave_type}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Status</p>
              {getStatusBadge(detail.status)}
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Alasan</p>
            <p className="font-medium text-gray-800">{detail.reason}</p>
          </div>

          {detail.attachment && (
            <div>
              <p className="text-gray-500 text-sm">Lampiran</p>
              <a
                href={`${config.api_image}/uploads/${detail.attachment}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Lihat File Lampiran
              </a>
            </div>
          )}

          <div className="pt-6 border-t mt-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">
                Dibuat: {new Date(detail.createdAt).toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-gray-400">
                Diperbarui: {new Date(detail.updatedAt).toLocaleString("id-ID")}
              </p>
            </div>
            {detail?.status === "revision" && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit Data
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
