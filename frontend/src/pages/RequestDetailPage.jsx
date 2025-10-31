import { useSearchParams } from "react-router-dom";
import RequestDetail from "../components/RequestDetail";

export default function RequestDetailPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log(id);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Detail Pengajuan Cuti
        </h1>
        <RequestDetail id={id} />
      </div>
    </div>
  );
}
