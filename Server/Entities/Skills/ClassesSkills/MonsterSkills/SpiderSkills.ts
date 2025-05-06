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

// Spider skills requirement
const spiderSkillRequirement = new SkillLearningRequirement({
    preRequireCharacterLevel: 1,
    preRequireAttributes: [],
    preRequireSkillID: []
});

// No equipment needed for spider skills
const noEquipmentNeeded: WeaponSpecificType[] = [];

// Venom Spray skill executor function
const skill_venom_spray_exec = (
    character: Character,
    allies: Party,
    enemies: Party,
    skillLevel: number,
    context: { time: GameTime; location: LocationName }
): TurnReport => {
    // This is a ranged poison attack that can hit multiple enemies
    const targets = enemies.characters
        .filter(char => char !== "none")
        .map(enemy => enemy as Character)
        .slice(0, skillLevel + 1); // Can hit more targets at higher levels
    
    if (targets.length === 0) {
        return {
            character: turnCharacterIntoInterface(character),
            skill: SkillEnum.VENOM_SPRAY,
            actorSkillEffect: ActorSkillEffect.Poison_Magical,
            targets: [],
            castString: `${character.name} sprays venom but finds no targets.`
        };
    }
    
    const baseDamage = Math.floor(Math.random() * 3) + 1 + skillLevel;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.VENOM_SPRAY,
        actorSkillEffect: ActorSkillEffect.Poison_Magical,
        targets: targets.map(target => ({
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: TargetSkillEffect.poison
        })),
        castString: `${character.name} sprays venom at ${targets.length === 1 ? targets[0].name : 'multiple enemies'}.`
    };
};

// Web Shot skill executor function
const skill_web_shot_exec = (
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
            skill: SkillEnum.WEB_SHOT,
            actorSkillEffect: ActorSkillEffect.None,
            targets: [],
            castString: `${character.name} shoots a web but finds no target.`
        };
    }
    
    // Web shot does minimal damage but immobilizes targets
    const baseDamage = Math.floor(Math.random() * 2) + skillLevel;
    
    return {
        character: turnCharacterIntoInterface(character),
        skill: SkillEnum.WEB_SHOT,
        actorSkillEffect: ActorSkillEffect.None,
        targets: [{
            character: turnCharacterIntoInterface(target),
            damageTaken: baseDamage,
            effect: TargetSkillEffect.entangled
        }],
        castString: `${character.name} shoots a sticky web at ${target.name}, entangling them.`
    };
};

// Venom Spray skill definition
export const skill_venom_spray = new ActiveSkill(
    {
        id: SkillEnum.VENOM_SPRAY,
        name: "Venom Spray",
        tier: Tier.uncommon,
        description: "Spray venom at enemies, poisoning them",
        requirement: spiderSkillRequirement,
    },
    {
        equipmentNeeded: noEquipmentNeeded,
        consume: new SkillConsume({
            mp: [3, 3, 3, 3, 3],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1],
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
        isSpell: true,
        isWeaponAttack: false,
        executor: skill_venom_spray_exec,
    }
);

// Web Shot skill definition
export const skill_web_shot = new ActiveSkill(
    {
        id: SkillEnum.WEB_SHOT,
        name: "Web Shot",
        tier: Tier.common,
        description: "Fire a sticky web that entangles the target, restricting movement",
        requirement: spiderSkillRequirement,
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
        executor: skill_web_shot_exec,
    }
);

// Export all spider skills
export const spiderSkills = [
    skill_venom_spray,
    skill_web_shot
]; 