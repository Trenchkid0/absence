export default function NotificationList({ notifications, loading }) {
  if (loading) {
    return <p className="text-center text-gray-500">Memuat notifikasi...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-5 overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Actor</th>
            <th className="border p-2 text-left">Comment</th>
            <th className="border p-2 text-left">Cuti ID</th>
            <th className="border p-2 text-left">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-3 text-gray-500">
                Tidak ada notifikasi
              </td>
            </tr>
          ) : (
            notifications.map((notif) => (
              <tr key={notif.id} className="hover:bg-gray-50">
                <td className="border p-2">{notif.id}</td>
                <td className="border p-2 capitalize">{notif.role}</td>
                <td className={`border p-2 font-semibold capitalize`}>
                  {notif.actor}
                </td>
                <td className="border p-2 italic">{notif.comment || "-"}</td>
                <td className="border p-2">{notif.req_cuti_id}</td>
                <td className="border p-2">
                  {new Date(notif.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
