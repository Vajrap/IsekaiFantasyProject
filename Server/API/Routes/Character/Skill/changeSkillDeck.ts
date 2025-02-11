import { Skill } from "../../../../Entities/Skills/Skill";
import { game } from "../../../../Game/Game";
import { ChangeSkillDeckRequest, ChangeSkillDeckResponse } from "../../../../../Common/DTOsEnumsInterfaces/Character/ChangeSkillREQRES";
import { Tier } from "../../../../../Common/DTOsEnumsInterfaces/Tier";
import { SkillConsume, SkillProduce } from "../../../../Entities/Skills/SubClasses/SkillConsume";

export async function changeSkillDeck(payload: ChangeSkillDeckRequest): Promise<ChangeSkillDeckResponse> {
    let character = game.characterManager.getCharacterByID(payload.characterID);
    // Reset character skill deck before modifying it
    for (const skill of character.activeSkills) {
        await character.moveCardToSkills(skill.skill.id);
    }

    console.log(`moving skill into deck`);
    console.log(character.skills);
    // Move selected skills to battle deck
    console.log(`slot 1:`);
    if (payload.battleCards.slot1 !== undefined) { character.moveCardToBattle(payload.battleCards.slot1.id) }
    console.log(`slot 2:`);
    if (payload.battleCards.slot2 !== undefined) { character.moveCardToBattle(payload.battleCards.slot2.id) }
    console.log(`slot 3:`);
    if (payload.battleCards.slot3 !== undefined) { character.moveCardToBattle(payload.battleCards.slot3.id) }
    console.log(`slot 4:`);
    if (payload.battleCards.slot4 !== undefined) { character.moveCardToBattle(payload.battleCards.slot4.id) }
    console.log(`slot 5:`);
    if (payload.battleCards.slot5 !== undefined) { character.moveCardToBattle(payload.battleCards.slot5.id) }
    console.log(`slot 6:`);
    if (payload.battleCards.slot6 !== undefined) { character.moveCardToBattle(payload.battleCards.slot6.id) }
    console.log(`slot 7:`);
    if (payload.battleCards.slot7 !== undefined) { character.moveCardToBattle(payload.battleCards.slot7.id) }
    

    return {
        type: 'CHANGE_SKILL_DECK_RESPONSE',
        characterID: character.id,
        skills: payload.skills,
        battleCards: payload.battleCards
    };
}

 // Map skill data for response
 function mapSkillToInterface(skill: { skill: Skill; level: number; exp: number }) {
    if (!skill.skill) {
        console.error("Invalid skill data:", skill);
        throw new Error("Skill object is missing");
    }

    const id = skill.skill.id;
    const name = skill.skill.name;

    return {
        id: skill.skill.id,
        name: skill.skill.name,
        level: skill.level,
        description: skill.skill.baseDescription ?? "No description available",
        tier: skill.skill.tier ?? "common", // Ensure 'common' is a valid fallback
        consume: skill.skill.consume ?? { hp: [], mp: [], sp: [], elements: [] }, // Default empty structure
        produce: skill.skill.produce
            ? {
                  elements: Array.isArray(skill.skill.produce.elements) ? skill.skill.produce.elements : [],
              }
            : { elements: [] }, // Ensure 'elements' is always an array
        isSpell: skill.skill.isSpell ?? false,
        equipmentRequirements: skill.skill.equipmentNeeded?.weapon ?? [],
    };
}