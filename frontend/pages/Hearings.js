
import { useEffect, useState } from "react";
import { Search, RefreshCw, CalendarDays } from "lucide-react";
import api from "../services/api";

function Hearings() {
  const [hearings, setHearings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHearings = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/hearings");
      setHearings(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load hearings:", err);
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
    loadHearings();
  }, []);

  const filteredHearings = hearings.filter((hearing) =>
    [
      hearing.hearingType,
      hearing.location,
      hearing.status,
      hearing.caseNumber
    ].some((value) =>
      String(value ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Hearings Management</h1>
          <p>Track court hearings and upcoming dates.</p>
        </div>
        <button className="primary-button" onClick={loadHearings}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="panel">
        <div className="client-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hearings..."
          />
        </div>

        {loading && <p>Loading hearings...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hearing ID</th>
                  <th>Case</th>
                  <th>Hearing Date</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHearings.map((hearing) => (
                  <tr key={hearing.hearingId}>
                    <td>{hearing.hearingId ?? "—"}</td>
                    <td>
                      {hearing.caseNumber ??
                        hearing.caseId ??
                        "—"}
                    </td>
                    <td>
                      {hearing.hearingDate
                        ? String(hearing.hearingDate).slice(0, 10)
                        : "—"}
                    </td>
                    <td>{hearing.hearingType ?? "—"}</td>
                    <td>{hearing.location ?? "—"}</td>
                    <td>{hearing.status ?? "—"}</td>
                  </tr>
                ))}
                {filteredHearings.length === 0 && (
                  <tr>
                    <td colSpan="6">No hearings found.</td>
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

export default Hearings;
