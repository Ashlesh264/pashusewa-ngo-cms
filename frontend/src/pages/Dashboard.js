import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Loader from "../components/common/Loader";
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
