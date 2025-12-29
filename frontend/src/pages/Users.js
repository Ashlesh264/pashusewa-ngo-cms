import React, { useCallback, useEffect, useState } from 'react';
// import { useOutletContext } from "react-router-dom";
import authService from '../services/authService';
import DataChart from '../components/common/DataChart';
import Register from "../components/common/AddUser";

function Users() {
  // const { admin } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false)

  const fetchUserData = useCallback(() => {
    authService.getUsers()
      .then(res => {
        setUsers(res.data);
        setError(false);
      })
      .catch(err => {
        console.error("Error fetching users", err);
        setError(true);
      });
  }, []);

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(() => {
      fetchUserData();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchUserData]);

  if (!users) {
    return <div className="loading">Loading users list...</div>;
  }
  return (
    <div className="dashboard-card">
      <DataChart users={users} />
      <h2 className="dashboard-title">User Management</h2>
        {error ? (
        <div className="error-container">
          <p className="error-message">⚠️ Data not fetch</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
        ) : (
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Email Valid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                  <td>
                    {user.is_verified ? (
                      <span className="verify-badge verified">
                        <i className="fas fa-check-circle"></i> Verified
                      </span>
                    ) : (
                      <span className="verify-badge pending">
                        <i className="fas fa-hourglass-half"></i> Pending
                      </span>
                    )}
                  </td>
                  <td><span className={`status-text ${user.status}`}>{user.status === "active" ? "Active" : "Inactive"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Register/>
        </div>
      )}
    </div>
  );
}

export default Users;
