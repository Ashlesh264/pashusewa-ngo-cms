import { useEffect, useState } from "react";
import homepageService from "../services/homepageService";

function Statistics() {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    homepageService
      .getStatistics()
      .then((res) => setStatistics(res.data))
      .catch((err) => console.error("Error fetching statistics:", err));
  }, []);

  return (
    <section className="home-stats">
      {statistics.map((stat) => (
        <div className="stat-box" key={stat.label}>
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

export default Statistics;
