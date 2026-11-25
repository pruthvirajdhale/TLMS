
import React from "react";
import {
  BriefcaseBusiness,
  Clock3,
  CircleCheckBig,
  CalendarDays,
  Plus
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Cases",
      count: "24",
      icon: BriefcaseBusiness,
      color: "blue"
    },
    {
      title: "Active Cases",
      count: "18",
      icon: Clock3,
      color: "orange"
    },
    {
      title: "Closed Cases",
      count: "06",
      icon: CircleCheckBig,
      color: "green"
    },
    {
      title: "Upcoming Hearings",
      count: "05",
      icon: CalendarDays,
      color: "purple"
    }
  ];

  const cases = [
    {
      number: "GST-2026-001",
      client: "ABC Industries",
      tax: "GST",
      status: "Pending",
      priority: "High"
    },
    {
      number: "IT-2026-002",
      client: "XYZ Enterprises",
      tax: "Income Tax",
      status: "Open",
      priority: "Medium"
    },
    {
      number: "GST-2026-003",
      client: "Sunrise Traders",
      tax: "GST",
      status: "Closed",
      priority: "Low"
    }
  ];

  return (
    <div className="dashboard">
      <div className="page-title">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your litigation overview.</p>
        </div>

        <button className="primary-button">
          <Plus size={15} style={{ verticalAlign: "middle" }} />{" "}
          New Case
        </button>
      </div>

      <div className="stats-grid">
        {stats.map(({ title, count, icon: Icon, color }) => (
          <div className="stat-card" key={title}>
            <div className={`stat-icon ${color}`}>
              <Icon size={23} />
            </div>
            <div>
              <p>{title}</p>
              <h2>{count}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>Case Status Overview</h3>
            <button>All cases ↗</button>
          </div>

          <div className="case-status">
            <div>
              <span className="status-dot open" />
              Open Cases <strong>10</strong>
            </div>
            <div>
              <span className="status-dot pending" />
              Pending Cases <strong>8</strong>
            </div>
            <div>
              <span className="status-dot closed" />
              Closed Cases <strong>6</strong>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Upcoming Hearings</h3>
            <button>View calendar ↗</button>
          </div>

          <div className="hearing-card">
            <div className="hearing-date">
              <strong>20</strong>
              <span>OCT</span>
            </div>
            <div className="hearing-details">
              <strong>GST Appeal Hearing</strong>
              <p>GST Tribunal · 10:30 AM</p>
              <span>GST-2026-001</span>
            </div>
          </div>

          <div className="hearing-card">
            <div className="hearing-date">
              <strong>22</strong>
              <span>OCT</span>
            </div>
            <div className="hearing-details">
              <strong>Income Tax Assessment</strong>
              <p>Income Tax Tribunal · 2:00 PM</p>
              <span>IT-2026-002</span>
            </div>
          </div>
        </section>
      </div>

      <section className="panel recent-panel">
        <div className="panel-header">
          <h3>Recent Cases</h3>
          <button>View all cases ↗</button>
        </div>

        <div className="table-toolbar">
          <input
            className="search-box"
            type="search"
            placeholder="Search cases..."
            aria-label="Search cases"
          />
          <span style={{ color: "#8490a5", fontSize: 12 }}>
            Latest records
          </span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>CASE NUMBER</th>
                <th>CLIENT</th>
                <th>TAX TYPE</th>
                <th>STATUS</th>
                <th>PRIORITY</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item) => (
                <tr key={item.number}>
                  <td><strong>{item.number}</strong></td>
                  <td>{item.client}</td>
                  <td>{item.tax}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Open"
                          ? "open-badge"
                          : item.status === "Pending"
                          ? "pending-badge"
                          : "closed-badge"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className={`priority-${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
