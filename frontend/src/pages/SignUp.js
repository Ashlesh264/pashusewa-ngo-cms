import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import VerifyEmail from "../components/VerifyEmail";
import Loader from "../components/Loader";

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        role: ""
    });
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => { document.title = `SignUp | PashuSewa Sanstha 🐾`;}, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await authService.register(form);
            setRegisteredEmail(form.email);
            setSuccess("OTP sent to your Email. Please verify to continue.");
            setOtpSent(true);
            setForm({
                full_name: "",
                email: "",
                password: "",
                role: ""
            });
        } catch (err) {
            setError(err.response?.data?.error ||"Registration failed");
        } finally {setLoading(false)}
    };

    return (
        <div className="auth-container">
            {loading && <Loader />}
            {!otpSent && (
            <form className="auth-card" onSubmit={handleRegister}>
                <h2 className="auth-title">PashuSewa</h2>
                <p className="auth-subtitle">Create Account</p>

                {error && <p className="auth-error">{error}</p>}
                {success && <p className="auth-success">{success}</p>}

                <input className="auth-input" name="full_name" type="text" placeholder="Full Name" onChange={handleChange} required />
                <input className="auth-input" name="email" type="email" placeholder="Email-ID" onChange={handleChange} required />
                <input className="auth-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <select className="auth-input" name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="donor">Donor</option>
                    <option value="staff">Staff</option>
                </select>
                <button className="auth-button" type="submit">SignUp</button>
                <p className="auth-link">Already have an account? <span onClick={() => navigate("/login")}> Login</span></p>
            </form>)}
            {otpSent && <VerifyEmail email={registeredEmail} purpose="signup"/>}
        </div>
    );
}

export default SignUp;
