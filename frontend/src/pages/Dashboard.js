import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  

  if (!user) {return <Loader />};
  return (
    <div className="dashboard-container">
      <Sidebar user={user} isOpen={isOpen} />
      <div className="dashboard-main-wrapper">
        <Header user={user} isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="dashboard-content-area">
          <Outlet context={{ user }} /> 
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
