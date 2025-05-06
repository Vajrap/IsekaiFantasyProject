import { CharacterType } from "../Enums/CharacterType";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { EnemyArchetype, Enemy } from "./Enemy";
import { WeaponEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ArmorEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ResourceNameEnum } from "../../Items/Resource/ResourceNameEnum";

// Base human archetype with common traits and stats
const baseHumanArchetype = {
    type: CharacterType.humanoid,
    gender: "MALE" as const, // Can be overridden for specific characters
    race: RaceEnum.HUMAN,
    level: 1,
    alignment: { good: 0, evil: 0, law: 0, chaos: 0 }, // Neutral by default
    HPrange: { min: 15, max: 20 },
    MPrange: { min: 8, max: 12 },
    SPrange: { min: 10, max: 15 },
    attributeRange: {
        strength: { min: 8, max: 10 },
        dexterity: { min: 8, max: 10 },
        agility: { min: 8, max: 10 },
        vitality: { min: 8, max: 10 },
        endurance: { min: 8, max: 10 },
        intelligence: { min: 8, max: 10 },
        willpower: { min: 8, max: 10 },
        charisma: { min: 8, max: 10 },
        luck: { min: 8, max: 10 },
        leadership: { min: 8, max: 10 },
        breath: { min: 8, max: 10 },
        planar: { min: 8, max: 10 }
    },
    baseACRange: { min: 8, max: 10 },
    arcaneAptitudeRange: { min: 2, max: 4 },
    traits: [TraitEnum.trait_bodySize_medium, TraitEnum.trait_human_adaptable],
    dropList: [
        { itemID: ResourceNameEnum.resource_human_blood, chance: 0.8 }
    ]
};

// Bandit - melee fighter with light armor
export class BanditArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.human_bandit,
            type: baseHumanArchetype.type,
            gender: baseHumanArchetype.gender,
            level: baseHumanArchetype.level + 1,
            race: baseHumanArchetype.race,
            alignment: { good: -20, evil: 20, law: -10, chaos: 10 },
            HPrange: { min: 18, max: 25 },
            MPrange: baseHumanArchetype.MPrange,
            SPrange: { min: 12, max: 18 },
            attributeRange: {
                ...baseHumanArchetype.attributeRange,
                strength: { min: 10, max: 12 },
                dexterity: { min: 10, max: 12 }
            },
            proficiencyRange: {
                sword: { min: 2, max: 4 },
                dagger: { min: 2, max: 4 }
            },
            equipments: {
                mainHand: WeaponEnum.sword_short,
                offHand: WeaponEnum.dagger_knife,
                armor: ArmorEnum.light_leather,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: { min: 9, max: 11 },
            traits: [
                ...baseHumanArchetype.traits,
                TraitEnum.trait_weapon_quickDraw
            ],
            dropList: [
                ...baseHumanArchetype.dropList,
                { itemID: WeaponEnum.sword_short, chance: 0.3 },
                { itemID: WeaponEnum.dagger_knife, chance: 0.3 },
                { itemID: ResourceNameEnum.resource_gold_coins, chance: 1.0 }
            ],
            preferredPosition: 'front'
        });
    }
}

// Mercenary - well-equipped fighter with medium armor
export class MercenaryArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.human_mercenary,
            type: baseHumanArchetype.type,
            gender: baseHumanArchetype.gender,
            level: baseHumanArchetype.level + 2,
            race: baseHumanArchetype.race,
            alignment: { good: 0, evil: 0, law: 10, chaos: -10 },
            HPrange: { min: 22, max: 28 },
            MPrange: baseHumanArchetype.MPrange,
            SPrange: { min: 15, max: 20 },
            attributeRange: {
                ...baseHumanArchetype.attributeRange,
                strength: { min: 12, max: 14 },
                endurance: { min: 12, max: 14 }
            },
            proficiencyRange: {
                sword: { min: 3, max: 5 },
                shield: { min: 3, max: 5 }
            },
            equipments: {
                mainHand: WeaponEnum.sword_long,
                offHand: WeaponEnum.shield_kite,
                armor: ArmorEnum.medium_chain,
                headWear: ArmorEnum.medium_chain,
                necklace: null,
                ring: null
            },
            baseACRange: { min: 11, max: 13 },
            traits: [
                ...baseHumanArchetype.traits,
                TraitEnum.trait_soldier_01
            ],
            dropList: [
                ...baseHumanArchetype.dropList,
                { itemID: WeaponEnum.sword_long, chance: 0.2 },
                { itemID: WeaponEnum.shield_kite, chance: 0.2 },
                { itemID: ResourceNameEnum.resource_gold_coins, chance: 1.0 }
            ],
            preferredPosition: 'front'
        });
    }
}

// Battle Mage - spellcaster with combat training
export class BattleMageArchetype extends EnemyArchetype {
    constructor() {
        super({
            name: MobCharacterEnum.human_battlemage,
            type: baseHumanArchetype.type,
            gender: baseHumanArchetype.gender,
            level: baseHumanArchetype.level + 3,
            race: baseHumanArchetype.race,
            alignment: { good: 0, evil: 0, law: 20, chaos: -20 },
            HPrange: { min: 18, max: 24 },
            MPrange: { min: 15, max: 20 },
            SPrange: { min: 12, max: 16 },
            attributeRange: {
                ...baseHumanArchetype.attributeRange,
                intelligence: { min: 12, max: 14 },
                willpower: { min: 12, max: 14 },
                planar: { min: 10, max: 12 }
            },
            proficiencyRange: {
                staff: { min: 3, max: 5 },
                magicWand: { min: 3, max: 5 }
            },
            elementRange: {
                fire: { min: 3, max: 5 },
                air: { min: 3, max: 5 }
            },
            equipments: {
                mainHand: WeaponEnum.staff_magic,
                offHand: null,
                armor: ArmorEnum.cloth_fine,
                headWear: null,
                necklace: null,
                ring: null
            },
            baseACRange: { min: 8, max: 10 },
            arcaneAptitudeRange: { min: 4, max: 6 },
            traits: [
                ...baseHumanArchetype.traits,
                TraitEnum.trait_mage_01,
                TraitEnum.trait_spellblade_01
            ],
            dropList: [
                ...baseHumanArchetype.dropList,
                { itemID: WeaponEnum.staff_magic, chance: 0.2 },
                { itemID: ResourceNameEnum.resource_mana_crystal, chance: 0.4 },
                { itemID: ResourceNameEnum.resource_gold_coins, chance: 1.0 }
            ],
            preferredPosition: 'back'
        });
    }
}

const bandit = new BanditArchetype();
const mercenary = new MercenaryArchetype();
const battleMage = new BattleMageArchetype();

export const humanEnemyRepository = [
    bandit,
    mercenary,
    battleMage
]; 