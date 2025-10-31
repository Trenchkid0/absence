export default function HistoryList({ history }) {
  return (
    <div className="mt-4 p-3 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Riwayat Perubahan</h3>
      <ul className="list-disc pl-5 text-sm">
        {history.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
}
