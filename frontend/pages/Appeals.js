
import { useEffect, useState } from "react";
import { Search, RefreshCw, Scale } from "lucide-react";
import api from "../services/api";

function Appeals() {
  const [appeals, setAppeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppeals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/appeals");
      setAppeals(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Failed to load appeals:", err);
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
    loadAppeals();
  }, []);

  const filteredAppeals = appeals.filter((appeal) =>
    [
      appeal.appealNumber,
      appeal.appealType,
      appeal.status,
      appeal.authority
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
          <h1>Appeals Management</h1>
          <p>Track appeals, authorities, and appeal status.</p>
        </div>

        <button className="primary-button" onClick={loadAppeals}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p>Total Appeals</p>
            <h2>{appeals.length}</h2>
          </div>
          <Scale size={25} />
        </div>

        <div className="stat-card">
          <div>
            <p>Pending Appeals</p>
            <h2>
              {
                appeals.filter(
                  (a) =>
                    String(a.status ?? "").toUpperCase() === "PENDING"
                ).length
              }
            </h2>
          </div>
          <Scale size={25} />
        </div>
      </div>

      <div className="panel">
        <div className="client-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search appeals..."
          />
        </div>

        {loading && <p>Loading appeals...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Appeal ID</th>
                  <th>Appeal Number</th>
                  <th>Appeal Type</th>
                  <th>Authority</th>
                  <th>Filing Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppeals.map((appeal) => (
                  <tr key={appeal.appealId}>
                    <td>{appeal.appealId ?? "—"}</td>
                    <td>{appeal.appealNumber ?? "—"}</td>
                    <td>{appeal.appealType ?? "—"}</td>
                    <td>{appeal.authority ?? "—"}</td>
                    <td>
                      {appeal.filingDate
                        ? String(appeal.filingDate).slice(0, 10)
                        : "—"}
                    </td>
                    <td>{appeal.status ?? "—"}</td>
                  </tr>
                ))}

                {filteredAppeals.length === 0 && (
                  <tr>
                    <td colSpan="6">No appeals found.</td>
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

export default Appeals;
