import { Character } from "../../../Entities/Character/Character";
import { CharacterArchetype } from "../../../Entities/Character/Subclasses/CharacterArchetype";

export class Summon extends Character {
  constructor(
    id: string,
    name: string,
    archeType: CharacterArchetype,
    portrait: string,
    meta?: Partial<Character>,
  ) {
    super({ id: id, name: name, gender: "NONE", portrait: portrait }, meta);
    this.isSummoned = true;
  }
}
