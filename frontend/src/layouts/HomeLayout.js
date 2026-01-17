import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/home.css";

function HomeLayout(props) {
  return (
    <div className="home-container">
      <Header variant="home" />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
