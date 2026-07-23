import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Study Planner</h2>

      <nav className="sidebar-menu">
        <Link to="/">Home</Link>        
        <Link to="/tasks">Tasks</Link>
        <Link to="/study-schedule">Study Schedule</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/deadlines">Deadlines</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/files">Files</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;