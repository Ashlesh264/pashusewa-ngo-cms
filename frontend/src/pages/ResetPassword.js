import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

function ResetPassword() {
    const navigate = useNavigate();
    const get = useLocation();
    const [email, setEmail] = useState(get.state?.email || "");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [passwords, setPasswords] = useState({ new: "", confirm: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(step===1){
            try {
                await authService.resendOtp(email, "reset");
                setSuccess("OTP send successfully.");
                setStep(2);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to OTP Send");
            }
            return;
        } 
        if(step===2){
            try {
                await authService.verifyEmail(email, otp);
                setSuccess("Email verified successfully.");
                setStep(3);
            } catch (err) {
                setError(err.response?.data?.error || "OTP verification failed. Please try again.");
            }
            return;
        }
        if(step===3){
            try {
                if(passwords.new===passwords.confirm) {
                    await authService.resetPassword(email, passwords.new);
                    setSuccess("Password reset successfully! Redirecting to login...");
                    setTimeout(() => navigate("/login"), 3000);
                } else {setError("Passwords do not match. Please check again.");}
            } catch (err) {
                setError(err.response?.data?.error || "Reset password failed.");
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleReset}>
                <h2 className="auth-title">PashuSewa</h2>
                <p className="auth-subtitle">Set New Password</p>
                {error && <p className="auth-error">{error}</p>}
                {success && <p className="auth-success">{success}</p>}
                {get.state?.email ? (
                    <input className="auth-input" type="email" placeholder="Email-ID" value={email} disabled />
                ):(
                    <input className="auth-input" type="email" placeholder="Email-ID" onChange={(e) => setEmail(e.target.value)} required />
                )}
                {step===2 && <input className="auth-input" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required />}
                {step===3 && (<>
                    <input className="auth-input" name="new" type="password" placeholder="New Password" onChange={handleChange} required />
                    <input className="auth-input" name="confirm" type="password" placeholder="Confirm New Password" onChange={handleChange} required /></>
                )}
                <button className="auth-button" type="submit">{step===1 ? ("Send OTP"):(step===2 ? ("Verify Email"):("Change Password"))}</button><br/><br/>
                <button className="auth-button" type="button"  onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>{step > 1 ? "Back" : "Cancel"}</button>
            </form>
        </div>
    );
}

export default ResetPassword;
