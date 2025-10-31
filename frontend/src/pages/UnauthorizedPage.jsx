export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <h1 className="text-3xl font-bold mb-2">🚫 Akses Ditolak</h1>
      <p className="text-gray-600">
        Anda tidak memiliki izin untuk membuka halaman ini.
      </p>
    </div>
  );
}
