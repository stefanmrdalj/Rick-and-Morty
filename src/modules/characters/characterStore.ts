import { makeAutoObservable } from "mobx";
import { characterService } from "./characterService";
import type { Character } from "./characterType";

const CHARACTERS_PER_PAGE = 20;

class CharacterStore {
  allCharacters: Character[] = [];
  isLoadingCharacters = false;
  loadingCharactersErrorMessage: string | null = null;

  currentPage = 1;
  totalCharacters = 0;
  totalPages = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async getCharacters(page = this.currentPage) {
    this.isLoadingCharacters = true;
    this.loadingCharactersErrorMessage = null;

    try {
      const data = await characterService.getCharacters(page);
      this.allCharacters = data.results;
      this.currentPage = page;
      this.totalCharacters = data.info.count;
      this.totalPages = data.info.pages;
    } catch (error) {
      this.loadingCharactersErrorMessage = "Failed to load characters";
    } finally {
      this.isLoadingCharacters = false;
    }
  }
  get pageSize() {
    return CHARACTERS_PER_PAGE;
  }
}

export const characterStore = new CharacterStore();
