import { NavLink } from "react-router-dom";

function Sidebar(props) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">PashuSewa</h2><hr/>
      <nav className="sidebar-menu">
        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active-link" : ""}>🏠 Dashboard</NavLink>
        <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "active-link" : ""}>👤 Profile</NavLink>
        {props.user.role === "admin" && (<NavLink to="/dashboard/users" className={({ isActive }) => isActive ? "active-link" : ""}>👥 Users</NavLink>)}
      </nav>
    </aside>
  );
}

export default Sidebar;
