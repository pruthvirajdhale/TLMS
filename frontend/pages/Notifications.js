
import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Bell,
  CheckCircle
} from "lucide-react";
import api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/notifications");
      setNotifications(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setError(
        err.response
          ? `API error: ${err.response.status}`
          : `Connection error: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const filteredNotifications = notifications.filter((item) =>
    [
      item.title,
      item.message,
      item.type,
      item.status
    ].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const unreadCount = notifications.filter(
    (item) =>
      String(item.status ?? "").toUpperCase() === "UNREAD"
  ).length;

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated on case activity and important deadlines.</p>
        </div>

        <button className="primary-button" onClick={loadNotifications}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p>Total Notifications</p>
            <h2>{notifications.length}</h2>
          </div>
          <Bell size={25} />
        </div>

        <div className="stat-card">
          <div>
            <p>Unread Notifications</p>
            <h2>{unreadCount}</h2>
          </div>
          <CheckCircle size={25} />
        </div>
      </div>

      <div className="panel">
        <div className="client-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notifications..."
          />
        </div>

        {loading && <p>Loading notifications...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredNotifications.map((item) => (
                  <tr key={item.notificationId}>
                    <td>{item.notificationId ?? "—"}</td>
                    <td>{item.title ?? "—"}</td>
                    <td>{item.message ?? "—"}</td>
                    <td>{item.type ?? "—"}</td>
                    <td>
                      {item.createdAt
                        ? String(item.createdAt).slice(0, 10)
                        : "—"}
                    </td>
                    <td>{item.status ?? "—"}</td>
                  </tr>
                ))}

                {filteredNotifications.length === 0 && (
                  <tr>
                    <td colSpan="6">No notifications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
