import Header from "../components/header";
import Footer from "../components/footer";
import FavoritesContent from "../components/favoritesContent";
import "../styles/favorites.scss";

const Favorites = () => {
  return (
    <div className="pageWrapper">
      <Header />
      <FavoritesContent />
      <Footer />
    </div>
  );
};

export default Favorites;
