import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Scale,
  CalendarDays,
  FileText,
  FolderOpen,
  Landmark,
  IndianRupee,
  Bell,
  BarChart3,
  Building
} from "lucide-react";

function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Users", path: "/users", icon: Users },
    { name: "Departments", path: "/departments", icon: Building },
    { name: "Clients", path: "/clients", icon: Building2 },
    { name: "Cases", path: "/cases", icon: Scale },
    { name: "Hearings", path: "/hearings", icon: CalendarDays },
    { name: "Notices", path: "/notices", icon: FileText },
    { name: "Documents", path: "/documents", icon: FolderOpen },
    { name: "Appeals", path: "/appeals", icon: Landmark },
    { name: "Payments", path: "/payments", icon: IndianRupee },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Reports", path: "/reports", icon: BarChart3 }
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <Scale size={30} />
        <div>
          <h2>TLMS</h2>
          <span>Tax Litigation System</span>
        </div>
      </div>

      <nav>
        {menu.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Icon size={19} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;