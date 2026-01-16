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

  searchText = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchText(value: string) {
    this.searchText = value;
  }

  async getCharacters(page = this.currentPage) {
    this.isLoadingCharacters = true;
    this.loadingCharactersErrorMessage = null;

    try {
      const data = await characterService.getCharacters({
        page,
        name: this.searchText.trim() || undefined,
      });
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

  async searchCharacters(value: string) {
    this.setSearchText(value);
    await this.getCharacters(1);
  }

  get shouldShowPagination() {
    return this.totalCharacters > 0;
  }

  get pageSize() {
    return CHARACTERS_PER_PAGE;
  }
}

export const characterStore = new CharacterStore();
