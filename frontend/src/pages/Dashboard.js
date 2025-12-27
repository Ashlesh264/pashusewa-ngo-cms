import { Outlet, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useAutoLogout } from "../hooks/useAutoLogout";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import "../styles/dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout(user.email);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  // Auto logout on inactivity
  useAutoLogout(handleLogout);

  if (!user) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }
  return (
    <div className="dashboard-container">
      <Sidebar user={user} />
      <div className="dashboard-main-wrapper">
        <Header user={user} onLogout={handleLogout} />
        <main className="dashboard-content-area">
          {/* Internal routes (Profile, Users, Home) will render here */}
          <Outlet context={{ user }} /> 
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
