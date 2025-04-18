import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { Dice } from "../../Utility/Dice";
import { StatMod } from "../../Utility/StatMod";
import { Party } from "../Party/Party";
import { Information } from "./information";
import { informationRepository } from "./repository";

export function exchangeKnowledge(
  partyA: Party,
  partyB: Party,
  typeHint?: Information["type"],
) {
  const allInfoIDs = new Set([
    ...Object.keys(partyA.informations),
    ...Object.keys(partyB.informations),
  ]);

  if (allInfoIDs.size === 0) return;

  const preferred: string[] = [];
  const other: string[] = [];

  if (allInfoIDs.size === 0) return;

  for (const id of allInfoIDs) {
    const info = informationRepository.getInformation(id);
    if (!info) continue;

    if (typeHint && info.type === typeHint) {
      preferred.push(id);
    } else {
      other.push(id);
    }
  }

  const preferredRoll = Dice.rollTwenty();
  const fromOther = preferredRoll % 5 === 0;
  const sourcePool = fromOther && other.length > 0 ? other : preferred;

  if (sourcePool.length === 0) return;

  const infoID =
    Array.from(sourcePool)[Math.floor(Math.random() * allInfoIDs.size)];
  const info = informationRepository.getInformation(infoID);
  const aSeq = partyA.informations[infoID] ?? -1;
  const bSeq = partyB.informations[infoID] ?? -1;

  let teller: Party | null = null;
  let listener: Party | null = null;

  if (aSeq > bSeq) {
    teller = partyA;
    listener = partyB;
  } else if (bSeq > aSeq) {
    teller = partyB;
    listener = partyA;
  } else {
    return; // Same level of knowledge, no exchange
  }

  // 4. Knowledge DC roll (simulate charisma-based storytelling check)
  const dc = 10 + Math.floor(Math.abs(aSeq - bSeq) / 2); // harder if knowledge gap is big
  const roll =
    Dice.rollTwenty() + StatMod.value(listener.getPartyAverageIntelligence());

  if (roll < dc) return; // Failed to convey

  // 5. Listener learns next part of the sequence
  listener.informations[infoID] = Math.max(
    listener.informations[infoID] ?? -1,
    Math.min(teller.informations[infoID] ?? 0, info.sequence.length - 1),
  );

  // 6. Optional: Reward small int boost or lore progress
  if (Dice.rollTwenty() > 10) {
    for (const char of listener.getAvailableCharacters()) {
      char.train(CharacterStatusEnum.intelligence);
    }
    for (const char of teller.getAvailableCharacters()) {
      char.train(CharacterStatusEnum.intelligence);
    }
  }
}
