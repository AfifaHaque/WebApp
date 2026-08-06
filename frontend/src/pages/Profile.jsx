import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>My Profile</h2>
          <p>View your account information.</p>
        </div>
      </div>

      <section className="content-card profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || "S"}
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <span>Name</span>
            <strong>{user?.name || "Student"}</strong>
          </div>

          <div className="profile-field">
            <span>Email</span>
            <strong>{user?.email || "No email available"}</strong>
          </div>

          <div className="profile-field">
            <span>Role</span>
            <strong>{user?.role || "student"}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;