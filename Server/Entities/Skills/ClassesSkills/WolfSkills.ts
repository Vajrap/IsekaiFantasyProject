import { ActiveSkill, SkillEnum } from "../Skill";
import { SkillConsume, SkillProduce, ElementConsume, ElementProduce } from "../SubClasses/SkillConsume";
import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { WeaponSpecificType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { TurnReport, ActorSkillEffect, TargetSkillEffect } from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Character } from "../../Character/Character";
import { Party } from "../../Party/Party";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { skill_bite } from "./MonsterSkills/BeastSkills";

// Re-export bite skill from BeastSkills
export { skill_bite };

// Basic requirement for wolf skills
const wolfSkillRequirement = new SkillLearningRequirement({
    preRequireCharacterLevel: 1,
    preRequireAttributes: [],
    preRequireSkillID: []
});

// No equipment needed for wolf skills
const noEquipmentNeeded: WeaponSpecificType[] = [];

// Pack Hunt skill executor function
const skill_pack_hunt_exec = (
    character: Character,
    allies: Party,
    enemies: Party,
    skillLevel: number,
    context: { time: GameTime; location: LocationName }
): TurnReport => {
    // Get first enemy as target
    const target = enemies.characters.find(char => char !== "none") as Character;
    if (!target) {
        return {
            character: turnCharacterIntoInterface(character),
            skill: SkillEnum.PACK_HUNT,
            actorSkillEffect: ActorSkillEffect.None,
            targets: [],
            castString: `${character.name} tries to coordinate a pack hunt but finds no target.`
        };
    }
    
    // Count wolf allies to determine damage bonus
    const wolfAllies = allies.characters
        .filter(char => char !== "none" && char !== character)
        .filter(ally => {
            const allyChar = ally as Character;
            return allyChar.race === "Beast" && 
                  (allyChar.name.includes("wolf") || allyChar.name.includes("Wolf"));
        });
    
    const packBonus = wolfAllies.length;
    const baseDamage = Math.floor(Math.random() * 6) + 2 + 
        Math.floor(character.status.attributes.strength.base / 2) + 
        skillLevel + packBonus;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.PACK_HUNT,
        actorSkillEffect: ActorSkillEffect.Pierce,
        targets: [{
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: packBonus >= 2 ? TargetSkillEffect.bleed : TargetSkillEffect.NoElement_Pierce_1
        }],
        castString: `${character.name} coordinates with ${packBonus} wolf allies to attack ${target.name}.`
    };
};

// Pack Hunt skill definition
export const skill_pack_hunt = new ActiveSkill(
    {
        id: SkillEnum.PACK_HUNT,
        name: "Pack Hunt",
        tier: Tier.uncommon,
        description: "A coordinated attack that becomes stronger with more wolf allies present",
        requirement: wolfSkillRequirement,
    },
    {
        equipmentNeeded: noEquipmentNeeded,
        consume: new SkillConsume({
            sp: [3, 3, 3, 3, 3],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [0, 0, 0, 0, 0],
                }),
            ],
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0],
                    ],
                }),
            ],
        }),
        isSpell: false,
        isWeaponAttack: false,
        executor: skill_pack_hunt_exec,
    }
);

// Export all wolf skills
export const wolfSkills = [
    skill_bite,
    skill_pack_hunt
]; 