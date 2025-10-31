import { useState } from "react";
import axios from "axios";
import { config } from "../config";
import toast from "react-hot-toast";

export default function RequestForm() {
  const [form, setForm] = useState({
    employee_id: localStorage.getItem("user_id") || "",
    start_date: "",
    end_date: "",
    leave_type: "",
    reason: "",
    attachment: null,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setForm({ ...form, attachment: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("employee_id", form.employee_id);
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);
      formData.append("leave_type", form.leave_type);
      formData.append("reason", form.reason);
      if (form.attachment) {
        formData.append("attachment", form.attachment);
      }

      const response = await axios.post(
        `${config.api_host_dev}/cuti`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast("Data Berhasil dikirim");

      setForm({
        ...form,
        start_date: "",
        end_date: "",
        leave_type: "",
        reason: "",
        attachment: null,
      });
    } catch (error) {
      console.error("❌ Gagal mengirim pengajuan:", error);
      alert("Gagal mengirim pengajuan, silakan coba lagi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded space-y-3"
    >
      <h2 className="font-semibold text-lg">Form Pengajuan Cuti</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tanggal Mulai
        </label>
        <input
          name="start_date"
          type="date"
          className="block w-full border rounded p-2"
          value={form.start_date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tanggal Selesai
        </label>
        <input
          name="end_date"
          type="date"
          className="block w-full border rounded p-2"
          value={form.end_date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipe Cuti
        </label>
        <select
          name="leave_type"
          className="block w-full border rounded p-2"
          value={form.leave_type}
          onChange={handleChange}
          required
        >
          <option value="">-- Pilih Jenis Cuti --</option>
          <option value="cuti_tahunan">Cuti Tahunan</option>
          <option value="sakit">Cuti Sakit</option>
          <option value="izin">Cuti Izin</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alasan
        </label>
        <textarea
          name="reason"
          className="block w-full border rounded p-2"
          value={form.reason}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bukti Pendukung (opsional)
        </label>
        <input
          name="attachment"
          type="file"
          accept=".jpg,.png,.pdf"
          className="block w-full border rounded p-2"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
