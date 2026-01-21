import { Input, Pagination, Spin, Result } from "antd";
import "../styles/contentComponent.scss";
import { characterStore } from "../modules/characters/characterStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Lottie from "lottie-react";
import mortyCry from "../assets/animations/morty-cry.json";
import CharacterModal from "./characterModal";

const Content = observer(() => {
  useEffect(() => {
    characterStore.getCharacters(1);
  }, []);
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <h1>Character explorer</h1>
        <div className="content-search">
          <Input
            placeholder="Search characters..."
            value={characterStore.searchText}
            onChange={(e) => characterStore.searchCharacters(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="content-body">
        <div className="content">
          <div>
            <h2>All characters</h2>
          </div>

          <div className="characters">
            {characterStore.isLoadingCharacters && (
              <div className="loading-characters">
                <div className="loading-spin">
                  <Spin size="large" />
                </div>
                <div>
                  <p>Loading characters...</p>
                </div>
              </div>
            )}

            {!characterStore.isLoadingCharacters &&
              characterStore.loadingCharactersErrorMessage && (
                <Result
                  status="error"
                  title="Unable to load characters"
                  subTitle="Please try again later."
                />
              )}

            {!characterStore.isLoadingCharacters &&
              !characterStore.loadingCharactersErrorMessage &&
              characterStore.allCharacters.length === 0 && (
                <div className="no-characters-found">
                  <div className="no-characters-found-animation">
                    <Lottie
                      animationData={mortyCry}
                      style={{ width: 90, height: 90 }}
                      loop={false}
                    />
                  </div>
                  <div>
                    <p>No characters found</p>
                  </div>
                </div>
              )}

            {!characterStore.isLoadingCharacters &&
              !characterStore.loadingCharactersErrorMessage &&
              characterStore.allCharacters.map((character) => (
                <div
                  className="character-card"
                  key={character.id}
                  onClick={() => characterStore.openCharacterModal(character)}
                >
                  <img src={character.image} alt={character.name} />
                  <div className="character-name">
                    <p>{character.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {characterStore.totalCharacters > 0 && (
          <div className="pagination">
            <Pagination
              current={characterStore.currentPage}
              total={characterStore.totalCharacters}
              pageSize={characterStore.pageSize}
              onChange={(page) => characterStore.getCharacters(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      <CharacterModal mode="home" />
    </div>
  );
});

export default Content;
