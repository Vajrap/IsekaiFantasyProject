export class Information {
  id: string;
  title: string;
  type:
    | "scholarly"
    | "military"
    | "noble"
    | "underworld"
    | "religious"
    | "folk"
    | "mythic";
  sequence: {
    text: string;
    date: string;
  }[];
  constructor(
    id: string,
    title: string,
    type:
      | "scholarly"
      | "military"
      | "noble"
      | "underworld"
      | "religious"
      | "folk"
      | "mythic",
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.sequence = [];
  }

  addSequence(text: string, date: string) {
    this.sequence.push({ text, date });
  }
}
