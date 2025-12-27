import { useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getDashboard()
    .then((res) => {
      setUser(res.data);
      document.title = `${res.data.full_name} (${res.data.role}) | PashuSewa Sanstha 🐾`;  
    })
    .catch(err => {
      console.error("Error fetching users", err);
      navigate("/login");
    });
  }, [navigate]);

  return { user };
};
