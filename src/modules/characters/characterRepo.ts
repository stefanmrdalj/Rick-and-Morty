import charactersAxiosInstance from "../../api/charactersAxiosInstance";
import type { AxiosResponse } from "axios";
import type { CharactersResponse, CharacterParameters } from "./characterType";

class CharacterRepo {
  getCharacters(
    params: CharacterParameters
  ): Promise<AxiosResponse<CharactersResponse>> {
    return charactersAxiosInstance.get("/character", {
      params: { page: params.page, name: params.name || undefined },
    });
  }
}

export const characterRepository = new CharacterRepo();
