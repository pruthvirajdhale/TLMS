
import React, { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, X, RefreshCw } from "lucide-react";
import api from "../services/api";

const emptyClient = {
  clientCode: "",
  clientName: "",
  companyName: "",
  panNumber: "",
  gstin: "",
  email: "",
  mobile: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  status: "ACTIVE"
};

function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyClient);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadClients() {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/clients");
      setClients(response.data);
    } catch (err) {
      setError("Unable to load clients. Check that Spring Boot is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  function openAddForm() {
    setForm(emptyClient);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function openEditForm(client) {
    setForm({ ...emptyClient, ...client });
    setEditingId(client.clientId);
    setShowForm(true);
    setError("");
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (editingId !== null) {
        await api.put(`/clients/${editingId}`, form);
      } else {
        await api.post("/clients", form);
      }

      setShowForm(false);
      setForm(emptyClient);
      setEditingId(null);
      await loadClients();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not save client. Check required fields and unique PAN/GSTIN."
      );
    }
  }

  async function deleteClient(client) {
    const confirmed = window.confirm(
      `Delete client ${client.clientName}?`
    );

    if (!confirmed) return;

    setError("");

    try {
      await api.delete(`/clients/${client.clientId}`);
      await loadClients();
    } catch (err) {
      setError(
        "Could not delete client. The client may have associated cases."
      );
    }
  }

  const filteredClients = clients.filter((client) =>
    [
      client.clientCode,
      client.clientName,
      client.companyName,
      client.panNumber,
      client.email
    ]
      .filter(Boolean)
      .some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div>
      <div className="page-title">
        <div>
          <h1>Client Management</h1>
          <p>Manage taxpayer and company information.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={16} style={{ verticalAlign: "middle" }} /> Add Client
        </button>
      </div>

      <section className="panel">
        <div className="panel-header">
          <h3>All Clients ({clients.length})</h3>

          <button className="text-button" onClick={loadClients}>
            <RefreshCw size={14} style={{ verticalAlign: "middle" }} /> Refresh
          </button>
        </div>

        <div className="table-toolbar">
          <div className="client-search">
            <Search size={17} />
            <input
              className="search-box"
              type="search"
              placeholder="Search name, code, PAN or email..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p className="empty-state">Loading clients...</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>CLIENT</th>
                  <th>CLIENT CODE</th>
                  <th>PAN NUMBER</th>
                  <th>CONTACT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.clientId}>
                    <td>
                      <strong>{client.clientName}</strong>
                      <div className="secondary-text">
                        {client.companyName || "Individual taxpayer"}
                      </div>
                    </td>
                    <td>{client.clientCode}</td>
                    <td>{client.panNumber}</td>
                    <td>
                      <div>{client.email || "—"}</div>
                      <div className="secondary-text">
                        {client.mobile || ""}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          client.status === "ACTIVE"
                            ? "closed-badge"
                            : "pending-badge"
                        }`}
                      >
                        {client.status || "ACTIVE"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-button edit"
                          title="Edit client"
                          onClick={() => openEditForm(client)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className="action-button delete"
                          title="Delete client"
                          onClick={() => deleteClient(client)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      {search
                        ? "No clients match your search."
                        : "No clients found. Click Add Client to create one."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showForm && (
        <div className="modal-backdrop">
          <div className="client-modal">
            <div className="modal-header">
              <div>
                <h2>{editingId ? "Edit Client" : "Add New Client"}</h2>
                <p>Enter the taxpayer's information below.</p>
              </div>
              <button
                className="action-button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Client Code *
                  <input
                    name="clientCode"
                    value={form.clientCode}
                    onChange={handleChange}
                    required
                    maxLength={20}
                  />
                </label>

                <label>
                  Client Name *
                  <input
                    name="clientName"
                    value={form.clientName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </label>

                <label>
                  Company Name
                  <input
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  PAN Number *
                  <input
                    name="panNumber"
                    value={form.panNumber}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]"
                    title="Enter a valid 10-character PAN."
                  />
                </label>

                <label>
                  GSTIN
                  <input
                    name="gstin"
                    value={form.gstin}
                    onChange={handleChange}
                    maxLength={15}
                  />
                </label>

                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Mobile
                  <input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    maxLength={15}
                  />
                </label>

                <label>
                  City
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  State
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Pincode
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </label>

                <label>
                  Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </label>

                <label className="full-width">
                  Address
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="2"
                  />
                </label>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  {editingId ? "Save Changes" : "Create Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;
