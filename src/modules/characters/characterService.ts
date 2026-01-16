import to from "await-to-js";
import { characterRepository } from "./characterRepo";
import type { CharactersResponse } from "./characterType";

class CharacterService {
  async getCharacters(page = 1): Promise<CharactersResponse> {
    const [err, res] = await to(characterRepository.getCharacters(page));
    if (err) {
      throw new Error("Error fetching characters");
    }
    return res.data;
  }
}

export const characterService = new CharacterService();
