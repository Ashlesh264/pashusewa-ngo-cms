import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import authService from "../services/authService"
import "../styles/dashboard.css";
import Loader from "../components/Loader";
function AddUser() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleAdminAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await authService.adminAddedUser(form);
      setSuccess("User added and notification email sent!");
      setForm({ full_name: "", email: "", role: "" });
      setTimeout(() => {
        setShowForm(false);
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.error ||"Failed to add user");
    } finally {setLoading(false)}
  };

  const handleOnOff = () => {
    setShowForm(!showForm);
    setError("");
    setSuccess("");
  }

  return (
    <div className="dashboard-card">
      {loading && <Loader />}
      <div className="profile-header">
        <button className="reset-password-btn" onClick={handleOnOff}>
          {showForm ? "✖ Close" : "➕ Add New User"}
        </button>
      </div>
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
      {showForm && (
        <form className="admin-add-user-form" onSubmit={handleAdminAddUser}>
          <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <select name="role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="volunteer">Volunteer</option>
            <option value="donor">Donor</option>
            <option value="staff">Staff</option>
          </select>
          <button type="submit" className="auth-button">Create Account</button>
        </form>
      )}
    </div>
  );
}

export default AddUser;
