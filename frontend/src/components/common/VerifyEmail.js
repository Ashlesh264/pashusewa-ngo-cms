import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import Loader from "./Loader";
import "../../styles/auth.css";

function VerifyEmail(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev -1)
    }, 1000);
    return () => clearInterval(interval);
  }, [timer])

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await authService.verifyEmail(props.email,otp);
      setSuccess("Email verified successfully. Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed. Please try again.");
    } finally {setLoading(false)}
  }

  const handleResend = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await authService.resendOtp(props.email,props.purpose)
      setSuccess("OTP resend successfully.");
      setTimer(60);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP.");
    } finally {setLoading(false)}
  }
  return (
    <form className="auth-card" onSubmit={handleVerify}>
      {loading && <Loader />}
      <h2 className="auth-title">PashuSewa</h2>
      <p className="auth-subtitle">Verify your Email</p>

      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
      <input className="auth-input" type="email" placeholder="Email-ID" value={props.email} disabled />
      <input className="auth-input" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required />
      <button className="auth-button" type="submit">Verify Email</button><br/><br/>
      {timer<=0 ? (
        <button className="auth-button auth-button-secondary" type="button" onClick={handleResend}>Resend OTP</button>
      ):(
        <p className="auth-info">Resend OTP available in <strong>{timer}s</strong></p>
      )}
    </form>
  );
}

export default VerifyEmail;
