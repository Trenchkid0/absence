export default function RevisionForm() {
  return (
    <div className="p-4 bg-yellow-50 border rounded">
      <h3 className="font-semibold text-yellow-800 mb-2">Form Revisi</h3>
      <textarea
        placeholder="Tuliskan revisi..."
        className="w-full border p-2 rounded mb-3"
      />
      <button className="bg-yellow-600 text-white px-4 py-2 rounded">
        Kirim Revisi
      </button>
    </div>
  );
}
