import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import authService from "../services/authService";
import VerifyEmail from "../components/common/VerifyEmail";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailVerified, setEmailVerified] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => { document.title = `Login | PashuSewa Sanstha 🐾`;}, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await authService.login(email, password)
            // successful login → go to dashboard
            setSuccess("Login successful. Redirecting to dashboard... ");
            setTimeout(() => navigate("/dashboard"), 3000)
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setEmailVerified(false);
                return;
            }
            setError(err.response?.data?.error || "Something went wrong. Try again.");
        }
    };

    return (
        <div className="auth-container">
            {emailVerified && (
            <form className="auth-card" onSubmit={handleLogin}>
                <h2 className="auth-title">PashuSewa</h2>
                <p className="auth-subtitle">Animal Welfare NGO</p>

                {error && <p className="auth-error">{error}</p>}
                {success && <p className="auth-success">{success}</p>}

                <input className="auth-input" type="email" placeholder="Email-ID" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="auth-button" type="submit">Login</button>
                <p className="auth-link">Forgot your Password? <span onClick={() => navigate("/reset-password", { state: { email: email } })}>Reset Password</span></p>
                <p className="auth-link">Don’t have an account? <span onClick={() => navigate("/signup")}>SignUp</span></p>
            </form>)}
            {!emailVerified && <VerifyEmail email={email} purpose="login" />}
        </div>
    );
}

export default Login;
