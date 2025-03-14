import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { AttributeEnum } from "../../../Entities/Character/Subclasses/CharacterDataEnum";
import { checkPersonalRelations } from "../../../Entities/Party/checkPersonalRelationship";
import { Party } from "../../../Entities/Party/Party";
import { getPartiesRelation, PartyRelation } from "../../../Entities/Party/PartyType";
import { Dice } from "../../../Utility/Dice";
import { StatMod } from "../../../Utility/StatMod";

export function checkIfCombatInitiated(party: Party, enemyParty: Party, enemyCombatPolicy?: string): boolean {
    if (enemyCombatPolicy === undefined) { enemyCombatPolicy = enemyParty.behavior.combatPolicy }

    const personalRelationScore = checkPersonalRelations(party, enemyParty);
    const partyRelation = getPartiesRelation(party.behavior.partyType, enemyParty.behavior.partyType);

    const partyWeight = 0.6;
    const personalWeight = 0.4;

    let partyScore = (partyRelation === PartyRelation.hostile) ? -40 :
                    (partyRelation === PartyRelation.friendly) ? 80 : 0;   

    const finalRelationScore = (partyScore * partyWeight) + (personalRelationScore * personalWeight);

    // Case Friendly
    if (finalRelationScore >= 30) return false;
    if (finalRelationScore > -30 && (partyRelation === PartyRelation.neutral || partyRelation === PartyRelation.friendly)) return false;

    let policy_A = party.behavior.combatPolicy
    let policy_B = enemyCombatPolicy

    if (policy_A === "strategic") {
        policy_A = evaluateAndDecide(party, enemyParty);
    }
    if (policy_B === "strategic") {
        policy_B = evaluateAndDecide(enemyParty, party);
    }

    if (policy_A === "evasive" && policy_B === "evasive") {
        return false;
    }

    if (policy_A === "engage" && policy_B === "engage") {
        return true;
    }

    if (policy_A === "engage" && policy_B === "evasive") {
        return resolveChase(party, enemyParty)
    }

    if (policy_A === "evasive" && policy_B === "engage") {
        return resolveChase(enemyParty, party)
    }

    return false;
}

function resolveChase(chasingParty: Party, fleeingParty: Party): boolean {
    let chaseInitiative = Dice.roll(DiceEnum.OneD6).sum;
    let fleeInitiative = Dice.roll(DiceEnum.OneD6).sum;

    for (const character of chasingParty.characters) {
        if (character !== "none") {
            chaseInitiative += StatMod.value(character.status.agility());
        }
    }
    for (const character of fleeingParty.characters) {
        if (character !== "none") {
            fleeInitiative += StatMod.value(character.status.agility());
        }
    }

    return chaseInitiative > fleeInitiative;
}

function evaluateAndDecide(party: Party, enemyParty: Party): "engage" | "evasive" {
    let leader = party.getPartyMemberWithHighestAttr(AttributeEnum.INTELLIGENCE);
    const intModifier = StatMod.value(leader.status.intelligence());
    const intelligenceDeviation = 5 - Math.min(intModifier, 5);
    let operation = Dice.rollTwenty() >= 10 ? "plus" : "minus";

    let PS = assetPartyStrength(party);
    let EPS = assetPartyStrength(enemyParty) + (operation === "plus" ? intelligenceDeviation : -intelligenceDeviation);

    return EPS > PS ? "evasive" : "engage";
}

function assetPartyStrength(party: Party): number {
    let totalLevel = 0;
    let totalMember = 0;
    for (const character of party.characters) {
        if (character !== "none") {
            totalLevel += character.level;
            totalMember++;
        }
    }
    return totalMember > 0 ? totalLevel / totalMember : 1;
}