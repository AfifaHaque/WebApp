import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div>
        <h2>Student Study Planner</h2>
        <p>Manage your academic tasks, deadlines, and study progress.</p>
      </div>

      <div className="navbar-user">
        <span>{user?.name || "Student"}</span>

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;