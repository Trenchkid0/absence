import { useEffect, useState } from "react";
import axios from "axios";
import RequestList from "../components/RequestList";
import Pagination from "../components/Pagination";
import { config } from "../config";

export default function HeadDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const roleID = localStorage.getItem("role_id");

  const role = roleID === "2" ? "head" : roleID === "3" && "gm";

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const fetchRequests = async (pageNum = 1) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.api_host_dev}/cuti/?page=${pageNum}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { page, totalItems } = response.data;

      setRequests(response.data || []);
      setTotal(totalItems || 0);
      setPage(page || 1);

      console.log(requests);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(page);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Daftar Pengajuan Cuti</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RequestList data={requests} role={role} />
      )}

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
