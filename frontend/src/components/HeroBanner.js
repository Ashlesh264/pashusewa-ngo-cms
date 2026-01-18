import { useEffect, useState } from "react";
import homepageService from "../services/homepageService";

const BASE_URL = process.env.REACT_APP_API_URL;
function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    homepageService.getBanners()
    .then(res => setBanners(res.data))
    .catch(err => console.error("Error fetching banners", err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    console.log("BANNERS:", banners);
    return () => clearInterval(interval);
  } , [banners]);
  
  const banner = banners[current];

  return (
    <section className="home-hero"
    style={{
        background: `linear-gradient(
          rgba(0,0,0,0.55),
          rgba(0,0,0,0.55)
        ), url(${BASE_URL}${banner?.image}) center/cover no-repeat`
      }}>
      <div className="hero-content">
        <h1>{banner?.title}</h1>
        <p>{banner?.description}</p>
        <div className="hero-actions">
          <button className="primary-btn">Donate Now</button>
          <button className="secondary-btn">Join as Volunteer</button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
