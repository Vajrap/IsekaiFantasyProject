import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { Dice } from "../../Utility/Dice";
import { StatMod } from "../../Utility/StatMod";
import { Party } from "../Party/Party";
import { Information } from "./information";
import { informationRepository } from "./repository";

/**
 * Handles knowledge exchange between two parties, typically triggered when
 * scholar-type parties encounter each other. This models social interactions where
 * lore, secrets, or learned content are partially transferred based on contextual intelligence.
 *
 * --- FUNCTIONAL OVERVIEW ---
 * 1. Gathers all unique information IDs known to either party.
 * 2. Splits them into "preferred" (matching the given `typeHint`) and "other".
 * 3. Randomly selects a topic:
 *    - 80% chance to prioritize preferred topics.
 *    - 20% chance to explore other types of information (social noise, off-topic insights).
 * 4. Chooses the party with more progress in that topic as the "teller", and the one with less as "listener".
 *    - If both parties are at the same sequence index, no transfer occurs.
 * 5. Performs a difficulty check (DC):
 *    - DC = 10 + half the difference in knowledge depth (rounded down).
 *    - Listener rolls 1d20 + average intelligence modifier.
 *    - If successful, the listener gains 1 step in that topic (if any remains).
 * 6. Bonus mechanic:
 *    - If the roll also exceeds 10, both parties’ members have a chance to receive a slight
 *      intelligence training tick, symbolizing mental stimulation from discussion.
 *
 * --- PARAMETERS ---
 * @param partyA First party involved in the exchange.
 * @param partyB Second party involved in the exchange.
 * @param typeHint Optional. A suggested category of information to prioritize in the conversation.
 *
 * --- SIDE EFFECTS ---
 * - May update the `informations` object of the receiving party.
 * - May trigger stat training events (INT) for both parties.
 *
 * --- NOTES ---
 * - This system allows lore to propagate dynamically through non-player encounters,
 *   preserving realism while building an emergent narrative.
 * - The knowledge type system enables modular topic-based control (e.g., military, divine, arcane).
 */

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
    return;
  }

  const dc = 10 + Math.floor(Math.abs(aSeq - bSeq) / 2);
  const roll =
    Dice.rollTwenty() + StatMod.value(listener.getPartyAverageIntelligence());

  if (roll < dc) return;

  listener.informations[infoID] = Math.max(
    listener.informations[infoID] ?? -1,
    Math.min(teller.informations[infoID] ?? 0, info.sequence.length - 1),
  );

  if (Dice.rollTwenty() > 10) {
    for (const char of listener.getAvailableCharacters()) {
      char.train(CharacterStatusEnum.intelligence);
    }
    for (const char of teller.getAvailableCharacters()) {
      char.train(CharacterStatusEnum.intelligence);
    }
  }
}
