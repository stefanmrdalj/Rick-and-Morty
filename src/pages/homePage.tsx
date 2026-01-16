import Header from "../components/header";
import Content from "../components/contentComponent";
import ".././styles/pageWrapper.scss";
import Footer from "../components/footer";

const HomePage = () => {
  return (
    <div className="pageWrapper">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default HomePage;
