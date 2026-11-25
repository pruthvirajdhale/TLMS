
import { useEffect, useState } from "react";
import { Search, RefreshCw, IndianRupee } from "lucide-react";
import api from "../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/payments");
      setPayments(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Failed to load payments:", err);
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
    loadPayments();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    [
      payment.paymentId,
      payment.paymentType,
      payment.status,
      payment.transactionId
    ].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const totalPaid = payments
    .filter(
      (p) => String(p.status ?? "").toUpperCase() === "PAID"
    )
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(amount);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Payments Management</h1>
          <p>Track client payments and transaction records.</p>
        </div>

        <button className="primary-button" onClick={loadPayments}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p>Total Transactions</p>
            <h2>{payments.length}</h2>
          </div>
          <IndianRupee size={25} />
        </div>

        <div className="stat-card">
          <div>
            <p>Total Paid</p>
            <h2>{formatCurrency(totalPaid)}</h2>
          </div>
          <IndianRupee size={25} />
        </div>
      </div>

      <div className="panel">
        <div className="client-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payments..."
          />
        </div>

        {loading && <p>Loading payments...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Payment Type</th>
                  <th>Transaction ID</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.paymentId}>
                    <td>{payment.paymentId ?? "—"}</td>
                    <td>
                      {formatCurrency(Number(payment.amount ?? 0))}
                    </td>
                    <td>{payment.paymentType ?? "—"}</td>
                    <td>{payment.transactionId ?? "—"}</td>
                    <td>
                      {payment.paymentDate
                        ? String(payment.paymentDate).slice(0, 10)
                        : "—"}
                    </td>
                    <td>{payment.status ?? "—"}</td>
                  </tr>
                ))}

                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="6">No payments found.</td>
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

export default Payments;
