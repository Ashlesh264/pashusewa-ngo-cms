import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>Welcome to PashuSewa</h1>
      <div className="auth-card">
        <button className="auth-button" onClick={() => navigate("/login")}>Login</button><br/><br/>
        <button className="auth-button" onClick={() => navigate("/signup")}>SignUp</button>
      </div>
    </div>
  );
}

export default Home;
