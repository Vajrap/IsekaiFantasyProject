import { Party } from "../Party/Party";

export class RandomEventCard {
  id: string;
  name: string;
  description: string;
  effect: (party: Party) => void;
  constructor(
    id: string,
    name: string,
    description: string,
    effect: (party: Party) => void,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.effect = effect;
  }
}
