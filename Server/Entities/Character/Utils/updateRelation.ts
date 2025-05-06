import { Party } from "../../Party/Party";
import { Character } from "../Character";
import { RelationShipStatusEnum } from "../RelationshipStatusEnum";

export function updateRelation(partyA: Party, partyB: Party, amount: number) {
  for (const baseCharacter of partyA.characters) {
    if (baseCharacter != "none") {
      for (const targetCharacter of partyB.characters) {
        if (targetCharacter != "none") {
          baseCharacter.relation[targetCharacter.id].value = Math.max(
            -100,
            Math.min(
              100,
              baseCharacter.relation[targetCharacter.id].value + amount,
            ),
          );
          targetCharacter.relation[baseCharacter.id].value = Math.max(
            -100,
            Math.min(
              100,
              targetCharacter.relation[baseCharacter.id].value - amount,
            ),
          );
          updateStatus(baseCharacter, targetCharacter);
        }
      }
    }
  }
}

function updateStatus(characterA: Character, characterB: Character) {
  const value =
    (characterA.relation[characterB.id].value +
      characterB.relation[characterA.id].value) /
    2;

  const specialRelation = [
    RelationShipStatusEnum.Lover,
    RelationShipStatusEnum.Spouse,
    RelationShipStatusEnum.SwornSibling,
    RelationShipStatusEnum.Mentor,
    RelationShipStatusEnum.Apprentice,
    RelationShipStatusEnum.Patron,
    RelationShipStatusEnum.Vassal,
  ];

  let a_to_b = characterA.relation[characterB.id].status;
  let b_to_a = characterB.relation[characterA.id].status;
  if (specialRelation.includes(a_to_b) || specialRelation.includes(b_to_a))
    return;

  const relationRange = [
    { min: -100, max: -81, status: RelationShipStatusEnum.Nemesis },
    { min: -80, max: -61, status: RelationShipStatusEnum.BitterRival },
    { min: -60, max: -41, status: RelationShipStatusEnum.Hostile },
    { min: -40, max: -21, status: RelationShipStatusEnum.Disliked },
    { min: -20, max: 19, status: RelationShipStatusEnum.Neutral },
    { min: 20, max: 39, status: RelationShipStatusEnum.Acquaintance },
    { min: 40, max: 59, status: RelationShipStatusEnum.Familiar },
    { min: 60, max: 79, status: RelationShipStatusEnum.CloseFriend },
    { min: 80, max: 95, status: RelationShipStatusEnum.TrustedCompanion },
    { min: 96, max: 100, status: RelationShipStatusEnum.BestFriend },
  ];

  for (const { min, max, status } of relationRange) {
    if (value >= min && value <= max) {
      characterA.relation[characterB.id].status = status;
      characterB.relation[characterA.id].status = status;
      break;
    }
  }
}
