import { ActiveSkill, SkillEnum } from "../../Skill";
import { SkillConsume, SkillProduce, ElementConsume, ElementProduce } from "../../SubClasses/SkillConsume";
import { SkillLearningRequirement } from "../../SubClasses/SkillLearningRequirement";
import { Tier } from "../../../../../Common/DTOsEnumsInterfaces/Tier";
import { WeaponSpecificType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { TurnReport, ActorSkillEffect, TargetSkillEffect } from "../../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Character } from "../../../Character/Character";
import { Party } from "../../../Party/Party";
import { GameTime } from "../../../../Game/TimeAndDate/GameTime";
import { LocationName } from "../../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { FundamentalElementTypes } from "../../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { turnCharacterIntoInterface } from "../../../Character/Utils/turnCharacterIntoInterface";

// Snake skills
const snakeSkillRequirement = new SkillLearningRequirement({
    preRequireCharacterLevel: 1,
    preRequireAttributes: [],
    preRequireSkillID: []
});

// No equipment needed for snake skills
const noEquipmentNeeded: WeaponSpecificType[] = [];

// Venom Bite skill executor function
const skill_venom_bite_exec = (
    character: Character,
    allies: Party,
    enemies: Party,
    skillLevel: number,
    context: { time: GameTime; location: LocationName }
): TurnReport => {
    // Implementation of the skill execution
    // Get first enemy as target
    const target = enemies.characters.find(char => char !== "none") as Character;
    if (!target) {
        return {
            character: turnCharacterIntoInterface(character),
            skill: SkillEnum.VENOM_BITE,
            actorSkillEffect: ActorSkillEffect.Poison_Physical,
            targets: [],
            castString: `${character.name} lunges forward but finds no target.`
        };
    }
    
    const baseDamage = Math.floor(Math.random() * 4) + 1 + 
        Math.floor(character.status.attributes.strength.base / 2) + skillLevel;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.VENOM_BITE,
        actorSkillEffect: ActorSkillEffect.Poison_Physical,
        targets: [{
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: skillLevel >= 2 ? TargetSkillEffect.poison : TargetSkillEffect.NoElement_Pierce_1
        }],
        castString: `${character.name} lunges forward with fangs bared.`
    };
};

// Constrictive Coil skill executor function
const skill_constrictive_coil_exec = (
    character: Character,
    allies: Party,
    enemies: Party,
    skillLevel: number,
    context: { time: GameTime; location: LocationName }
): TurnReport => {
    // Implementation of the skill execution
    // Get first enemy as target
    const target = enemies.characters.find(char => char !== "none") as Character;
    if (!target) {
        return {
            character: turnCharacterIntoInterface(character),
            skill: SkillEnum.CONSTRICTIVE_COIL,
            actorSkillEffect: ActorSkillEffect.None,
            targets: [],
            castString: `${character.name} coils but finds no target.`
        };
    }
    
    const baseDamage = Math.floor(Math.random() * 6) + 1 + 
        Math.floor(character.status.attributes.strength.base / 2) + skillLevel;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.CONSTRICTIVE_COIL,
        actorSkillEffect: ActorSkillEffect.Blunt,
        targets: [{
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: TargetSkillEffect.bound
        }],
        castString: `${character.name} slithers rapidly to coil around ${target.name}.`
    };
};

// Venom Bite - Basic snake attack
export const skill_venom_bite = new ActiveSkill(
    {
        id: SkillEnum.VENOM_BITE,
        name: "Venom Bite",
        tier: Tier.common,
        description: "A venomous bite that can inflict poisoning on the target",
        requirement: snakeSkillRequirement,
    },
    {
        equipmentNeeded: noEquipmentNeeded,
        consume: new SkillConsume({
            sp: [2, 2, 2, 2, 2],
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
        executor: skill_venom_bite_exec,
    }
);

// Constrictive Coil - Giant snake special attack
export const skill_constrictive_coil = new ActiveSkill(
    {
        id: SkillEnum.CONSTRICTIVE_COIL,
        name: "Constrictive Coil",
        tier: Tier.common,
        description: "Wraps around the target, crushing them and restricting movement",
        requirement: snakeSkillRequirement,
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
        executor: skill_constrictive_coil_exec,
    }
);

// Export all snake skills
export const snakeSkills = [
    skill_venom_bite,
    skill_constrictive_coil
]; 