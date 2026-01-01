import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {return <Loader />;};
  return (
    <div className="dashboard-card">
      <div className="profile-header">
        <h2 className="dashboard-title">My Profile</h2>
        <button className="reset-password-btn" onClick={() => navigate("/reset-password", { state: { email: user.email } })}>Reset Password</button>
      </div>
      <hr />
      <div className="profile-details">
        <div className="profile-avatar-large">
          {user.full_name.charAt(0)}
        </div>
        <div className="profile-info-grid">
          <p><strong>Full Name:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Role:</strong> <span className={`role-badge ${user.role}`}>{user.role}</span></p>
          <p><strong>Status:</strong> Active</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
