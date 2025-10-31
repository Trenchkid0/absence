import { useState } from "react";
import axios from "axios";
import { config } from "../config";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${config.api_host_dev}/signin`, {
        username: form.username,
        password: form.password,
      });

      console.log("Login response:", response);

      if (response.status === 201 && response.data.data.token) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role_id", response.data.data.role_id);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("user_id", response.data.data.userID);

        if (response.data.data.role_id === 1) {
          window.location.href = "/";
        } else {
          window.location.href = "/head";
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="border w-full p-2 rounded mt-1 focus:outline-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="border w-full p-2 rounded mt-1 focus:outline-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
