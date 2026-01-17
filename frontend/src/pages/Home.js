import HomeLayout from "../layouts/HomeLayout";
import HeroBanner from "../components/HeroBanner";
import VisionMission from "../components/VisionMission";
import Statistics from "../components/Statistics";
import Initiatives from "../components/Initiatives";

function Home() {
  return (
    <HomeLayout>
      <HeroBanner />
      <VisionMission />
      <Statistics />
      <Initiatives />
      <section className="home-cta">
        <h2>Be a Part of the Change</h2>
        <button className="primary-btn">Support Our Cause</button>
      </section>
    </HomeLayout>
  );
}

export default Home;
