import { CharacterType } from "../Enums/CharacterType";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { EnemyArchetype, Enemy } from "./Enemy";
import { WeaponEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ArmorEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ResourceNameEnum } from "../../Items/Resource/ResourceNameEnum";

// Base goblin archetype with common traits and stats
const baseGoblinArchetype = {
    type: CharacterType.humanoid,
    gender: "NONE" as const,
    race: RaceEnum.GOBLIN,
    level: 1,
    alignment: { good: -20, evil: 20, law: -10, chaos: 10 },
    HPrange: { min: 8, max: 12 },
    MPrange: { min: 4, max: 8 },
    SPrange: { min: 6, max: 10 },
    attributeRange: {
        strength: { min: 6, max: 8 },
        dexterity: { min: 8, max: 10 },
        agility: { min: 8, max: 10 },
        vitality: { min: 6, max: 8 },
        endurance: { min: 6, max: 8 },
        intelligence: { min: 4, max: 6 },
        willpower: { min: 4, max: 6 },
        charisma: { min: 2, max: 4 },
        luck: { min: 6, max: 8 },
        leadership: { min: 2, max: 4 },
        breath: { min: 4, max: 6 },
        planar: { min: 2, max: 4 }
    },
    baseACRange: { min: 8, max: 10 },
    arcaneAptitudeRange: { min: 0, max: 2 },
    traits: [TraitEnum.trait_bodySize_small],
    dropList: [
        { itemID: ResourceNameEnum.resource_goblin_ear, chance: 0.8 },
    ]
};

// Goblin Scout - fast, sneaky, uses daggers or short bows
export class GoblinScoutArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.goblin_scout,
            type: baseGoblinArchetype.type,
            gender: baseGoblinArchetype.gender,
            level: baseGoblinArchetype.level,
            race: baseGoblinArchetype.race,
            alignment: baseGoblinArchetype.alignment,
            HPrange: baseGoblinArchetype.HPrange,
            MPrange: baseGoblinArchetype.MPrange,
            SPrange: baseGoblinArchetype.SPrange,
            attributeRange: {
                ...baseGoblinArchetype.attributeRange,
                dexterity: { min: 10, max: 12 },
                agility: { min: 10, max: 12 }
            },
            proficiencyRange: {
                dagger: { min: 2, max: 4 },
                bow: { min: 2, max: 4 }
            },
            equipments: {
                mainHand: WeaponEnum.dagger_knife,
                offHand: null,
                armor: ArmorEnum.light_leather,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: { min: 9, max: 11 },
            traits: [...baseGoblinArchetype.traits, TraitEnum.trait_weapon_quickDraw],
            dropList: [
                ...baseGoblinArchetype.dropList,
                { itemID: WeaponEnum.dagger_knife, chance: 0.2 }
            ],
            preferredPosition: 'back'
        });
    }
}

// Goblin Warrior - stronger, uses crude weapons and light armor
export class GoblinWarriorArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.goblin_warrior,
            type: baseGoblinArchetype.type,
            gender: baseGoblinArchetype.gender,
            level: baseGoblinArchetype.level + 1,
            race: baseGoblinArchetype.race,
            alignment: baseGoblinArchetype.alignment,
            HPrange: { min: 12, max: 16 },
            MPrange: baseGoblinArchetype.MPrange,
            SPrange: { min: 8, max: 12 },
            attributeRange: {
                ...baseGoblinArchetype.attributeRange,
                strength: { min: 8, max: 10 },
                endurance: { min: 8, max: 10 }
            },
            proficiencyRange: {
                sword: { min: 2, max: 4 },
                axe: { min: 2, max: 4 },
                shield: { min: 1, max: 3 }
            },
            equipments: {
                mainHand: WeaponEnum.sword_short,
                offHand: WeaponEnum.shield_buckler,
                armor: ArmorEnum.light_leather,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: { min: 10, max: 12 },
            traits: [...baseGoblinArchetype.traits, TraitEnum.trait_weapon_recklessSwing],
            dropList: [
                ...baseGoblinArchetype.dropList,
                { itemID: WeaponEnum.sword_short, chance: 0.2 },
                { itemID: WeaponEnum.shield_buckler, chance: 0.2 }
            ],
            preferredPosition: 'front'
        });
    }
}

// Goblin Shaman - spellcaster, uses magic and curses
export class GoblinShamanArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.goblin_shaman,
            type: baseGoblinArchetype.type,
            gender: baseGoblinArchetype.gender,
            level: baseGoblinArchetype.level + 2,
            race: baseGoblinArchetype.race,
            alignment: { good: -30, evil: 30, law: -20, chaos: 20 },
            HPrange: { min: 10, max: 14 },
            MPrange: { min: 12, max: 16 },
            SPrange: baseGoblinArchetype.SPrange,
            attributeRange: {
                ...baseGoblinArchetype.attributeRange,
                intelligence: { min: 8, max: 10 },
                willpower: { min: 8, max: 10 },
                planar: { min: 6, max: 8 }
            },
            proficiencyRange: {
                staff: { min: 2, max: 4 },
                orb: { min: 2, max: 4 }
            },
            equipments: {
                mainHand: WeaponEnum.staff_magic,
                offHand: null,
                armor: ArmorEnum.cloth_tattered,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: baseGoblinArchetype.baseACRange,
            arcaneAptitudeRange: { min: 4, max: 6 },
            traits: [
                ...baseGoblinArchetype.traits,
                TraitEnum.trait_weapon_cursed,
                TraitEnum.trait_mage_01
            ],
            dropList: [
                ...baseGoblinArchetype.dropList,
                { itemID: WeaponEnum.staff_magic, chance: 0.2 },
                { itemID: ResourceNameEnum.resource_mana_crystal, chance: 0.4 }
            ],
            preferredPosition: 'back'
        });
    }
}

const goblinScout = new GoblinScoutArchetype();
const goblinWarrior = new GoblinWarriorArchetype();
const goblinShaman = new GoblinShamanArchetype();

export const goblinEnemyRepository = [
    goblinScout,
    goblinWarrior,
    goblinShaman
]; 