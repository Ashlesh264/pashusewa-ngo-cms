import { useEffect, useState } from "react";
import homepageService from "../services/homepageService";

function Initiatives() {
  const [initiatives, setInitiatives] = useState([]);

  useEffect(() => {
    homepageService
      .getInitiatives()
      .then((res) => setInitiatives(res.data))
      .catch((err) => console.error("Error fetching initiatives:", err));
  }, [])

  return (
    <section className="home-initiatives">
      <h2>Our Initiatives</h2>
      <div className="initiative-grid">
        {initiatives.map((item) => (
          <div className="initiative-card" key={item.title}>
            <img src={item.image} alt={item.title} style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}/>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Initiatives;
