import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useAutoLogout } from "../hooks/useAutoLogout";

function Header(props) {
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await authService.logout(props.user.email);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  useAutoLogout({
    enabled: props.variant === "dashboard",
    onLogout: handleLogout
  });

  if (props.variant === "home") {
    return (
      <header className="header">
        <h2>PashuSewa Sanstha</h2>
        <nav>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </nav>
      </header>
    );
  }

  return (
    <header className="header">
      <button onClick={props.toggleSidebar} className="menu-btn">{props.isOpen ? "✖" : "☰"}</button>
      <span>Welcome, <strong>{props.user.full_name}</strong></span>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </header>
  );
}

export default Header;
