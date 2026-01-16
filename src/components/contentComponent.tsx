import { Input, Pagination } from "antd";
import "../styles/contentComponent.scss";
import { characterStore } from "../modules/characters/characterStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

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
              <div>Loading characters...</div>
            )}

            {!characterStore.isLoadingCharacters &&
              characterStore.loadingCharactersErrorMessage && (
                <div>{characterStore.loadingCharactersErrorMessage}</div>
              )}

            {!characterStore.isLoadingCharacters &&
              !characterStore.loadingCharactersErrorMessage &&
              characterStore.allCharacters.length === 0 && (
                <div>No characters found</div>
              )}

            {!characterStore.isLoadingCharacters &&
              !characterStore.loadingCharactersErrorMessage &&
              characterStore.allCharacters.map((character) => (
                <div className="character-card" key={character.id}>
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
    </div>
  );
});

export default Content;
