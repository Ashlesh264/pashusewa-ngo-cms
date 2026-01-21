import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/dashboard.css";

function DashboardLayout(props) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  

  if (!user) {return <Loader />};
  return (
    <div className="dashboard-container">
      <Sidebar user={user} isOpen={isOpen} />
      <div className="dashboard-main-wrapper">
        <Header variant="dashboard" user={user} isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="dashboard-content-area">{props.children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
