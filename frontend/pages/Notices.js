
import { useEffect, useState } from "react";
import { Search, RefreshCw, FileText } from "lucide-react";
import api from "../services/api";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotices = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/notices");
      setNotices(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Failed to load notices:", err);
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
    loadNotices();
  }, []);

  const filteredNotices = notices.filter((notice) =>
    [
      notice.noticeNumber,
      notice.noticeType,
      notice.status,
      notice.description
    ].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Notices Management</h1>
          <p>Track tax notices, deadlines, and responses.</p>
        </div>

        <button className="primary-button" onClick={loadNotices}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p>Total Notices</p>
            <h2>{notices.length}</h2>
          </div>
          <FileText size={25} />
        </div>

        <div className="stat-card">
          <div>
            <p>Pending Notices</p>
            <h2>
              {notices.filter(
                (n) =>
                  String(n.status ?? "").toUpperCase() === "PENDING"
              ).length}
            </h2>
          </div>
          <FileText size={25} />
        </div>
      </div>

      <div className="panel">
        <div className="client-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices..."
          />
        </div>

        {loading && <p>Loading notices...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Notice ID</th>
                  <th>Notice Number</th>
                  <th>Notice Type</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredNotices.map((notice) => (
                  <tr key={notice.noticeId}>
                    <td>{notice.noticeId ?? "—"}</td>
                    <td>{notice.noticeNumber ?? "—"}</td>
                    <td>{notice.noticeType ?? "—"}</td>
                    <td>
                      {notice.issueDate
                        ? String(notice.issueDate).slice(0, 10)
                        : "—"}
                    </td>
                    <td>
                      {notice.dueDate
                        ? String(notice.dueDate).slice(0, 10)
                        : "—"}
                    </td>
                    <td>{notice.status ?? "—"}</td>
                  </tr>
                ))}

                {filteredNotices.length === 0 && (
                  <tr>
                    <td colSpan="6">No notices found.</td>
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

export default Notices;
