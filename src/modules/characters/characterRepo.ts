import charactersAxiosInstance from "../../api/charactersAxiosInstance";
import type { AxiosResponse } from "axios";
import type { CharactersResponse } from "./characterType";

class CharacterRepo {
  getCharacters(page = 1): Promise<AxiosResponse<CharactersResponse>> {
    return charactersAxiosInstance.get("/character", {
      params: { page },
    });
  }
}

export const characterRepository = new CharacterRepo();
