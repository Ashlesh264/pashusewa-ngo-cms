import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import ResetPassword from "./pages/ResetPassword";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardLayout />} >
        <Route index element={<Dashboard/>} /> 
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes> 
  );
}

export default App;
