import to from "await-to-js";
import { characterRepository } from "./characterRepo";
import type { CharactersResponse, CharacterParameters } from "./characterType";

class CharacterService {
  async getCharacters(
    params: CharacterParameters
  ): Promise<CharactersResponse> {
    const [err, res] = await to(characterRepository.getCharacters(params));
    if (err) {
      throw err;
    }
    return res.data;
  }
}

export const characterService = new CharacterService();
