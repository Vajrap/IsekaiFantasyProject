import { RelationShipStatusEnum } from "../Character/RelationshipStatusEnum";
import { Party } from "./Party";

const statusModifier: { [key in RelationShipStatusEnum]: number } = {
  Nemesis: 3,
  BitterRival: 2.5,
  Hostile: 2,
  Disliked: 1.5,
  Neutral: 1,
  Acquaintance: 1,
  Familiar: 1.5,
  CloseFriend: 2,
  TrustedCompanion: 2.5,
  BestFriend: 3,
  Lover: 4,
  Spouse: 4,
  SwornSibling: 3.5,
  Mentor: 2.5,
  Apprentice: 2.5,
  Patron: 2.5,
  Vassal: 2.5,
};

const isStatusPositiveOrNeutral = (status: RelationShipStatusEnum): boolean => {
  return (
    status === RelationShipStatusEnum.Acquaintance ||
    status === RelationShipStatusEnum.Apprentice ||
    status === RelationShipStatusEnum.BestFriend ||
    status === RelationShipStatusEnum.CloseFriend ||
    status === RelationShipStatusEnum.Familiar ||
    status === RelationShipStatusEnum.Lover ||
    status === RelationShipStatusEnum.Mentor ||
    status === RelationShipStatusEnum.Neutral ||
    status === RelationShipStatusEnum.Patron ||
    status === RelationShipStatusEnum.Spouse ||
    status === RelationShipStatusEnum.SwornSibling ||
    status === RelationShipStatusEnum.TrustedCompanion ||
    status === RelationShipStatusEnum.Vassal
  );
};

export function checkPersonalRelations(partyA: Party, partyB: Party): number {
  let totalRelation = 0;
  let relationPair = 0;
  for (const baseCharacter of partyA.characters) {
    if (baseCharacter !== "none") {
      for (const targetCharacter of partyB.characters) {
        if (targetCharacter !== "none") {
          if (!baseCharacter.relation[targetCharacter.id]) {
            baseCharacter.relation[targetCharacter.id] = {
              value: 0,
              status: RelationShipStatusEnum.Neutral,
            };
          }

          let relation = baseCharacter.relation[targetCharacter.id];

          let isPositive = isStatusPositiveOrNeutral(relation.status);
          let value = relation.value;

          let usageValue = isPositive
            ? Math.max(value, 1)
            : Math.min(value, -1);

          totalRelation +=
            usageValue *
            statusModifier[baseCharacter.relation[targetCharacter.id].status];
          relationPair++;
        }
      }
    }
  }

  return relationPair > 0 ? totalRelation / relationPair : 0;
}
