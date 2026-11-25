
import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  X
} from "lucide-react";
import api from "../services/api";

const emptyForm = {
  caseNumber: "",
  caseTitle: "",
  caseType: "",
  status: "OPEN",
  clientId: ""
};

function Cases() {
  const [cases, setCases] = useState([]);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadCases = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/cases");
      setCases(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load cases:", err);
      setError(
        err.response
          ? `API error: ${err.response.status}`
          : `Connection error: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const loadClients = async () => {
    try {
      const response = await api.get("/clients");
      setClients(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load clients:", err);
    }
  };

  useEffect(() => {
    loadCases();
    loadClients();
  }, []);

  const openAddModal = () => {
    setEditingCase(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingCase(item);
    setForm({
      caseNumber: item.caseNumber ?? "",
      caseTitle: item.caseTitle ?? "",
      caseType: item.caseType ?? "",
      status: item.status ?? "OPEN",
      clientId: item.clientId ?? item.client?.clientId ?? ""
    });
    setError("");
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      // Convert clientId to a number when supplied.
      const payload = {
        caseNumber: form.caseNumber.trim(),
        caseTitle: form.caseTitle.trim(),
        caseType: form.caseType,
        status: form.status,
        clientId: form.clientId ? Number(form.clientId) : null
      };

      if (editingCase) {
        await api.put(`/cases/${editingCase.caseId}`, payload);
      } else {
        await api.post("/cases", payload);
      }

      setShowModal(false);
      setEditingCase(null);
      setForm(emptyForm);
      await loadCases();
    } catch (err) {
      console.error("Failed to save case:", err);
      setError(
        err.response
          ? `Save failed (${err.response.status}): ${
              typeof err.response.data === "string"
                ? err.response.data
                : JSON.stringify(err.response.data)
            }`
          : `Connection error: ${err.message}`
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Delete case "${item.caseNumber}"? This action may not be reversible.`
    );

    if (!confirmed) return;

    try {
      setError("");
      await api.delete(`/cases/${item.caseId}`);
      await loadCases();
    } catch (err) {
      console.error("Failed to delete case:", err);
      setError(
        err.response
          ? `Delete failed (${err.response.status}). Check whether this case has linked records.`
          : `Connection error: ${err.message}`
      );
    }
  };

  const filteredCases = cases.filter((item) =>
    [
      item.caseNumber,
      item.caseTitle,
      item.caseType,
      item.status
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
          <h1>Litigation Cases</h1>
          <p>Manage and track tax litigation cases.</p>
        </div>

        <div className="action-buttons">
          <button className="primary-button" onClick={openAddModal}>
            <Plus size={16} /> Add Case
          </button>

          <button className="primary-button" onClick={loadCases}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {error && !showModal && (
        <p className="error-message">{error}</p>
      )}

      <div className="panel">
        <div className="client-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case number, title, type, or status..."
          />
        </div>

        {loading && <p>Loading cases...</p>}

        {!loading && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Case Number</th>
                  <th>Case Title</th>
                  <th>Case Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCases.map((item) => (
                  <tr key={item.caseId}>
                    <td>{item.caseNumber ?? "—"}</td>
                    <td>{item.caseTitle ?? "—"}</td>
                    <td>{item.caseType ?? "—"}</td>
                    <td>
                      <span className="badge">
                        {item.status ?? "—"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="icon-button"
                          title="Edit case"
                          onClick={() => openEditModal(item)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="icon-button"
                          title="Delete case"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && filteredCases.length === 0 && (
                  <tr>
                    <td colSpan="5">No cases found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="client-modal">
            <div className="page-heading">
              <div>
                <h2>{editingCase ? "Edit Case" : "Add Case"}</h2>
                <p>Enter the case details below.</p>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
              >
                <X size={20} />
              </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Case Number *
                  <input
                    name="caseNumber"
                    value={form.caseNumber}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Case Title *
                  <input
                    name="caseTitle"
                    value={form.caseTitle}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Case Type *
                  <select
                    name="caseType"
                    value={form.caseType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select case type</option>
                    <option value="GST">GST</option>
                    <option value="INCOME_TAX">Income Tax</option>
                    <option value="CUSTOMS">Customs</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>

                <label>
                  Status *
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="OPEN">Open</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </label>

                <label>
                  Client
                  <select
                    name="clientId"
                    value={form.clientId}
                    onChange={handleChange}
                  >
                    <option value="">Select client (if optional)</option>
                    {clients.map((client) => (
                      <option
                        key={client.clientId}
                        value={client.clientId}
                      >
                        {client.clientName} ({client.clientCode})
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingCase
                      ? "Update Case"
                      : "Save Case"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cases;
