import { Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <h3>Tax Litigation Management System</h3>

      <div className="header-right">
        <button
          className="icon-button"
          aria-label="Notifications"
          onClick={() => window.location.assign("/notifications")}
        >
          <Bell size={20} />
        </button>

        <div className="admin-info">
          <UserCircle size={30} />
          <div>
            <strong>System Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;