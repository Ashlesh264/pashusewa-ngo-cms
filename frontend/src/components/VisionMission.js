import React, { useEffect, useState } from "react";
import homepageService from "../services/homepageService";

function VisionMission() {
  const [visionMission, setVisionMission] = useState({ vision: "", mission: "" });

  useEffect(() => {
    homepageService
      .getVisionMission()
      .then((res) => setVisionMission(res.data))
      .catch((err) => console.error("Error fetching vision and mission:", err));
  }, []);

  return (
    <section className="home-vision">
        <h2>Our Vision</h2>
        <p>{visionMission.vision || "Vision content will be updated soon"}</p>
        <h2 style={{ marginTop: "30px" }}>Our Mission</h2>
        <p>{visionMission.mission || "Mission content will be updated soon"}</p>
      </section>
  );
}

export default VisionMission;
