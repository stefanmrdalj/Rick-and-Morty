import { Modal, Button } from "antd";
import { characterStore } from "../modules/characters/characterStore";
import type { Character } from "../modules/characters/characterType";
import "../styles/modal.scss";
import { observer } from "mobx-react-lite";

type CharacterModalProps = {
  mode: "home" | "favorites";
  onRemove?: (id: number) => void;
};

const CharacterModal = observer(({ mode, onRemove }: CharacterModalProps) => {
  const handleAddToFavorites = () => {
    if (!characterStore.selectedCharacter) return;
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    const isAlreadyFavorite = favorites.some(
      (char: Character) => char.id === characterStore.selectedCharacter!.id,
    );
    if (isAlreadyFavorite) return;
    favorites.push(characterStore.selectedCharacter);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    characterStore.closeCharacterModal();
  };

  const handleRemoveFromFavorites = () => {
    if (!characterStore.selectedCharacter) return;
    const storeFavorites = localStorage.getItem("favorites");
    const favorites = storeFavorites ? JSON.parse(storeFavorites) : [];
    // const selectedCharacterId = characterStore.selectedCharacter.id;
    const updatedFavorites = favorites.filter(
      (char: Character) => char.id !== characterStore.selectedCharacter!.id,
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    onRemove?.(characterStore.selectedCharacter.id);
    characterStore.closeCharacterModal();
  };
  return (
    <>
      <Modal
        open={characterStore.isCharacterModalOpen}
        onCancel={() => characterStore.closeCharacterModal()}
        footer={null}
        centered
        width={320}
        style={{ maxWidth: "90vw" }}
        className="character-modal"
        // title="Character info"
      >
        {characterStore.selectedCharacter && (
          <div className="character-modal-content">
            <div className="character-modal-info">
              <div className="character-photo">
                <img
                  src={characterStore.selectedCharacter.image}
                  alt={characterStore.selectedCharacter.name}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 12,
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="character-information">
                <div className="character-name">
                  <h2>{characterStore.selectedCharacter.name}</h2>
                </div>
                <div>
                  <p>
                    Status:{" "}
                    <span
                      className={`character-status-${characterStore.selectedCharacter.status.toLowerCase()}`}
                    >
                      {characterStore.selectedCharacter.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p>Species: {characterStore.selectedCharacter.species}</p>
                </div>
                <div>
                  <p>Gender: {characterStore.selectedCharacter.gender}</p>
                </div>
                <div>
                  <p>
                    Location: {characterStore.selectedCharacter.location.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="add-to-favorites">
              {mode === "home" ? (
                <Button onClick={handleAddToFavorites}>Add to favorites</Button>
              ) : (
                <Button onClick={handleRemoveFromFavorites}>
                  Remove from favorites
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
});

export default CharacterModal;
