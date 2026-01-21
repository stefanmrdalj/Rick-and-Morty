import { useState, useEffect } from "react";
import type { Character } from "../modules/characters/characterType";
import CharacterModal from "./characterModal";
import { characterStore } from "../modules/characters/characterStore";
import Lottie from "lottie-react";
import rick from "../assets/animations/rick.json";

const FavoritesContent = () => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);
  return (
    <div className="favoritesContent">
      <div className="favorites-title">
        <h1>Favorites</h1>
      </div>
      <div className="favorite-characters">
        {favorites.length === 0 ? (
          <div className="no-favorites">
            <Lottie
              animationData={rick}
              style={{ width: 160, height: 160 }}
              // loop={false}
            />
            <p>Add your favorite characters!</p>
          </div>
        ) : (
          favorites.map((character) => (
            <div
              key={character.id}
              className="character-card"
              onClick={() => characterStore.openCharacterModal(character)}
            >
              <img src={character.image} alt={character.name} />
              <div className="character-name">
                <p>{character.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <CharacterModal
        mode="favorites"
        onRemove={(id) => {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((character) => character.id !== id),
          );
        }}
      />
    </div>
  );
};

export default FavoritesContent;
