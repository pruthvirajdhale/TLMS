
import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  FileText,
  Download
} from "lucide-react";
import api from "../services/api";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/documents");
      setDocuments(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Failed to load documents:", err);
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
    loadDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) =>
    [
      doc.documentName,
      doc.documentType,
      doc.fileName,
      doc.status
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
          <h1>Documents Management</h1>
          <p>Manage documents associated with litigation cases.</p>
        </div>

        <button className="primary-button" onClick={loadDocuments}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="panel">
        <div className="client-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
          />
        </div>

        {loading && <p>Loading documents...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Document ID</th>
                  <th>Document Name</th>
                  <th>Document Type</th>
                  <th>File Name</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.documentId}>
                    <td>{doc.documentId ?? "—"}</td>
                    <td>
                      <FileText size={16} />{" "}
                      {doc.documentName ?? "—"}
                    </td>
                    <td>{doc.documentType ?? "—"}</td>
                    <td>{doc.fileName ?? "—"}</td>
                    <td>
                      {doc.uploadDate
                        ? String(doc.uploadDate).slice(0, 10)
                        : "—"}
                    </td>
                    <td>{doc.status ?? "Available"}</td>
                  </tr>
                ))}

                {filteredDocuments.length === 0 && (
                  <tr>
                    <td colSpan="6">No documents found.</td>
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

export default Documents;
