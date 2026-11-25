
import { useEffect, useState } from "react";
import {
  RefreshCw,
  BriefcaseBusiness,
  CalendarDays,
  IndianRupee,
  FileText
} from "lucide-react";
import api from "../services/api";

function Reports() {
  const [cases, setCases] = useState([]);
  const [hearings, setHearings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [caseRes, hearingRes, paymentRes] = await Promise.all([
        api.get("/cases"),
        api.get("/hearings"),
        api.get("/payments")
      ]);

      setCases(Array.isArray(caseRes.data) ? caseRes.data : []);
      setHearings(
        Array.isArray(hearingRes.data) ? hearingRes.data : []
      );
      setPayments(
        Array.isArray(paymentRes.data) ? paymentRes.data : []
      );
    } catch (err) {
      console.error("Failed to load reports:", err);
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
    loadReports();
  }, []);

  const closedCases = cases.filter(
    (item) => String(item.status ?? "").toUpperCase() === "CLOSED"
  ).length;

  const pendingCases = cases.filter((item) =>
    ["PENDING", "OPEN", "ACTIVE", "IN_PROGRESS"].includes(
      String(item.status ?? "").toUpperCase()
    )
  ).length;

  const paidAmount = payments
    .filter(
      (item) => String(item.status ?? "").toUpperCase() === "PAID"
    )
    .reduce((sum, item) => sum + Number(item.amount ?? 0), 0);

  const currency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(value);

  const stats = [
    {
      title: "Total Cases",
      value: cases.length,
      icon: BriefcaseBusiness
    },
    {
      title: "Pending / Active Cases",
      value: pendingCases,
      icon: FileText
    },
    {
      title: "Closed Cases",
      value: closedCases,
      icon: BriefcaseBusiness
    },
    {
      title: "Total Hearings",
      value: hearings.length,
      icon: CalendarDays
    },
    {
      title: "Total Payments",
      value: payments.length,
      icon: IndianRupee
    },
    {
      title: "Amount Paid",
      value: currency(paidAmount),
      icon: IndianRupee
    }
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Overview of litigation, hearings, and payments.</p>
        </div>

        <button className="primary-button" onClick={loadReports}>
          <RefreshCw size={16} /> Refresh Reports
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Generating reports...</p>}

      {!loading && !error && (
        <>
          <div className="stats-grid">
            {stats.map(({ title, value, icon: Icon }) => (
              <div className="stat-card" key={title}>
                <div>
                  <p>{title}</p>
                  <h2>{value}</h2>
                </div>
                <Icon size={25} />
              </div>
            ))}
          </div>

          <div className="panel">
            <h2>Case Status Summary</h2>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Number of Cases</th>
                  </tr>
                </thead>
                <tbody>
                  {["OPEN", "PENDING", "IN_PROGRESS", "CLOSED"].map(
                    (status) => (
                      <tr key={status}>
                        <td>{status.replace("_", " ")}</td>
                        <td>
                          {
                            cases.filter(
                              (item) =>
                                String(item.status ?? "").toUpperCase() ===
                                status
                            ).length
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
