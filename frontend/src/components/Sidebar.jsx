import { NavLink } from "react-router-dom";

function Sidebar() {
  const getLinkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <aside className="sidebar">
      <h2>Study Planner</h2>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={getLinkClass}>
          Home
        </NavLink>

        <NavLink to="/tasks" className={getLinkClass}>
          Tasks
        </NavLink>

        <NavLink to="/study-schedule" className={getLinkClass}>
          Study Schedule
        </NavLink>

        <NavLink to="/calendar" className={getLinkClass}>
          Calendar
        </NavLink>

        <NavLink to="/deadlines" className={getLinkClass}>
          Deadlines
        </NavLink>

        <NavLink to="/progress" className={getLinkClass}>
          Progress
        </NavLink>

        <NavLink to="/files" className={getLinkClass}>
          Files
        </NavLink>

        <NavLink to="/profile" className={getLinkClass}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;