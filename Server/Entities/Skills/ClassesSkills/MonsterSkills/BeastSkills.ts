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

// Basic requirement for beast skills
const beastSkillRequirement = new SkillLearningRequirement({
    preRequireCharacterLevel: 1,
    preRequireAttributes: [],
    preRequireSkillID: []
});

// No equipment needed for beast skills
const noEquipmentNeeded: WeaponSpecificType[] = [];

// Bite skill executor function
const skill_bite_exec = (
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
            skill: SkillEnum.BITE,
            actorSkillEffect: ActorSkillEffect.Pierce,
            targets: [],
            castString: `${character.name} snaps but finds no target.`
        };
    }
    
    const baseDamage = Math.floor(Math.random() * 4) + 1 + 
        Math.floor(character.status.attributes.strength.base / 2) + skillLevel;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.BITE,
        actorSkillEffect: ActorSkillEffect.Pierce,
        targets: [{
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: TargetSkillEffect.NoElement_Pierce_1
        }],
        castString: `${character.name} bites ${target.name}.`
    };
};

// Claw Swipe skill executor function
const skill_claw_swipe_exec = (
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
            skill: SkillEnum.CLAW_SWIPE,
            actorSkillEffect: ActorSkillEffect.Slash,
            targets: [],
            castString: `${character.name} swipes but finds no target.`
        };
    }
    
    const baseDamage = Math.floor(Math.random() * 6) + 1 + 
        Math.floor(character.status.attributes.strength.base / 2) + skillLevel;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.CLAW_SWIPE,
        actorSkillEffect: ActorSkillEffect.Slash,
        targets: [{
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: skillLevel >= 2 ? TargetSkillEffect.bleed : TargetSkillEffect.NoElement_Slash_1
        }],
        castString: `${character.name} slashes at ${target.name} with its claws.`
    };
};

// Howl skill executor function
const skill_howl_exec = (
    character: Character,
    allies: Party,
    enemies: Party,
    skillLevel: number,
    context: { time: GameTime; location: LocationName }
): TurnReport => {
    // This is an AoE effect that can impact multiple enemies
    const targets = enemies.characters
        .filter(char => char !== "none")
        .map(enemy => enemy as Character);

    if (targets.length === 0) {
        return {
            character: turnCharacterIntoInterface(character),
            skill: SkillEnum.HOWL,
            actorSkillEffect: ActorSkillEffect.None,
            targets: [],
            castString: `${character.name} howls, but there are no enemies to intimidate.`
        };
    }
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.HOWL,
        actorSkillEffect: ActorSkillEffect.None,
        targets: targets.map(target => ({
            character: turnCharacterIntoInterface(target),
            damageTaken: 0,
            effect: skillLevel >= 2 ? TargetSkillEffect.fear : TargetSkillEffect.slow
        })),
        castString: `${character.name} lets out a terrifying howl.`
    };
};

// Maul skill executor function
const skill_maul_exec = (
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
            skill: SkillEnum.MAUL,
            actorSkillEffect: ActorSkillEffect.Blunt,
            targets: [],
            castString: `${character.name} charges but finds no target.`
        };
    }
    
    const baseDamage = Math.floor(Math.random() * 8) + 2 + 
        Math.floor(character.status.attributes.strength.base / 2) + skillLevel * 2;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.MAUL,
        actorSkillEffect: ActorSkillEffect.Blunt,
        targets: [{
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: skillLevel >= 2 ? TargetSkillEffect.stun : TargetSkillEffect.NoElement_Blunt_2
        }],
        castString: `${character.name} mauls ${target.name} with tremendous force.`
    };
};

// Bite skill definition
export const skill_bite = new ActiveSkill(
    {
        id: SkillEnum.BITE,
        name: "Bite",
        tier: Tier.common,
        description: "A basic bite attack",
        requirement: beastSkillRequirement,
    },
    {
        equipmentNeeded: noEquipmentNeeded,
        consume: new SkillConsume({
            sp: [1, 1, 1, 1, 1],
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
        executor: skill_bite_exec,
    }
);

// Claw Swipe skill definition
export const skill_claw_swipe = new ActiveSkill(
    {
        id: SkillEnum.CLAW_SWIPE,
        name: "Claw Swipe",
        tier: Tier.common,
        description: "A slashing attack with claws that may cause bleeding",
        requirement: beastSkillRequirement,
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
        executor: skill_claw_swipe_exec,
    }
);

// Howl skill definition
export const skill_howl = new ActiveSkill(
    {
        id: SkillEnum.HOWL,
        name: "Howl",
        tier: Tier.common,
        description: "A frightening howl that intimidates enemies, potentially causing fear",
        requirement: beastSkillRequirement,
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
        executor: skill_howl_exec,
    }
);

// Maul skill definition
export const skill_maul = new ActiveSkill(
    {
        id: SkillEnum.MAUL,
        name: "Maul",
        tier: Tier.uncommon,
        description: "A powerful attack that deals heavy damage and may stun the target",
        requirement: beastSkillRequirement,
    },
    {
        equipmentNeeded: noEquipmentNeeded,
        consume: new SkillConsume({
            sp: [4, 4, 4, 4, 4],
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
        executor: skill_maul_exec,
    }
);

// Export all beast skills
export const beastSkills = [
    skill_bite,
    skill_claw_swipe,
    skill_howl,
    skill_maul
]; 