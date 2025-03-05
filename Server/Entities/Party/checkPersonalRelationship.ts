import { RelationShipStatusEnum } from "../Character/RelationshipStatusEnum";
import { Party } from "./Party";
const statusModifier: { [key in RelationShipStatusEnum]: number } = {
    // Core Relations
    LOVER: 3,
    FRIEND: 1.5,
    FAMILY: 2,
    ACQUAINTANCE: 1.2,
    STRANGER: 1,
    UNKNOWN: 1,
    ENEMY: 3,

    // Stronger Positive Bonds
    BEST_FRIEND: 2,
    ALLY: 1.8,
    SWORN_BROTHER: 2.5, // Close to family, often bonded by deep loyalty
    MENTOR: 1.7,
    APPRENTICE: 1.5,
    PROTECTOR: 2,
    VASSAL: 2.2,
    LOYALIST: 2.5,

    // Competitive / Conflicted Relationships
    RIVAL: 1.2, // Can be both positive or negative depending on context
    TEMPORARY_ALLY: 1.3, // Less stable than a true ally
    BUSINESS_PARTNER: 1.4,

    // Negative Relations
    BETRAYER: 3.5,
    TRAITOR: 4, // More severe than betrayer
    NEMESIS: 4.5, // A deeply personal enemy
    OPPRESSOR: 3,
    SERVANT: 1, // Might be neutral but with potential power imbalance
    SLAVE: 0.5, // Forced servitude, might have suppressed feelings


    // Situational Relations
    COMPETITOR: 1.3,
    MASTER: 1.6, // Depends on the nature of control
    UNDERLING: 1.3,
    PATRON: 1.7,
    DEBTOR: 1.1,
    CREDITOR: 1.2,
    CONSPIRATOR: 1.8, // Stronger than temporary allies due to secrecy
    INFORMANT: 1.3,
    NEUTRAL: 0
};

const isStatusPositiveOrNeutral = (status: RelationShipStatusEnum): boolean => {
    return status === RelationShipStatusEnum.LOVER ||
        status === RelationShipStatusEnum.FRIEND ||
        status === RelationShipStatusEnum.FAMILY ||
        status === RelationShipStatusEnum.ACQUAINTANCE ||
        status === RelationShipStatusEnum.STRANGER ||
        status === RelationShipStatusEnum.UNKNOWN ||
        status === RelationShipStatusEnum.BEST_FRIEND ||
        status === RelationShipStatusEnum.ALLY ||
        status === RelationShipStatusEnum.SWORN_BROTHER ||
        status === RelationShipStatusEnum.MENTOR ||
        status === RelationShipStatusEnum.APPRENTICE ||
        status === RelationShipStatusEnum.PROTECTOR ||
        status === RelationShipStatusEnum.VASSAL ||
        status === RelationShipStatusEnum.LOYALIST ||
        status === RelationShipStatusEnum.TEMPORARY_ALLY ||
        status === RelationShipStatusEnum.BUSINESS_PARTNER ||
        status === RelationShipStatusEnum.MASTER ||
        status === RelationShipStatusEnum.UNDERLING ||
        status === RelationShipStatusEnum.PATRON ||
        status === RelationShipStatusEnum.DEBTOR ||
        status === RelationShipStatusEnum.CREDITOR ||
        status === RelationShipStatusEnum.CONSPIRATOR ||
        status === RelationShipStatusEnum.INFORMANT ||
        status === RelationShipStatusEnum.NEUTRAL;
};

export function checkPersonalRelations(partyA: Party, partyB: Party): number {    
    let totalRelation = 0;
    let relationPair = 0;
    for (const baseCharacter of partyA.characters) {
        if (baseCharacter !== 'none') {
            for (const targetCharacter of partyB.characters) {
                if (targetCharacter !== 'none') {
                    if (!baseCharacter.relation[targetCharacter.id]) {
                        baseCharacter.relation[targetCharacter.id] = {
                            value: 0,
                            status: RelationShipStatusEnum.STRANGER,
                        };
                    }

                    let relation = baseCharacter.relation[targetCharacter.id];

                    let isPositive = isStatusPositiveOrNeutral(relation.status);
                    let value = relation.value;

                    let usageValue = isPositive 
                        ? Math.max(value, 1)
                        : Math.min(value, -1);

                    totalRelation += usageValue * statusModifier[baseCharacter.relation[targetCharacter.id].status];
                    relationPair++;
                }
            }
        }
    }

    return relationPair > 0 ? totalRelation / relationPair : 0;
}
