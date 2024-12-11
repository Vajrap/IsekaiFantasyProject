import { RaceEnum } from "../../../Common/RequestResponse/characterCreation"
import { CharacterArchetype } from "../../Entities/Character/Subclasses/CharacterArchetype"
import { CharacterType } from "../../Entities/Character/Subclasses/CharacterType"
import { GearSeedArmorEnum } from "../Item/Gear/Seeds/Armor"
import { GearSeedWeaponEnum } from "../Item/Gear/Seeds/Weapon"
import { SkillEnum } from "../Skill/skill"
import { classModifierBarbarian, classModifierFighter, classModifierKnight, classModifierRogue, classModifierSorcerer, classModifierWarden } from "./ClassModifier"

export const GoblinID = {
    goblin_sword_m: "goblin_sword_m",
    goblin_sword_f: "goblin_sword_f",
    goblin_bow_m: "goblin_bow_m",
    goblin_bow_f: "goblin_bow_f",
    goblin_pike_m: "goblin_pike_m",
    goblin_pike_f: "goblin_pike_f",
    hobgoblin_sword_m: "hobgoblin_sword_m",
    hobgoblin_sword_f: "hobgoblin_sword_f",
    hobgoblin_greatAxe_m: "hobgoblin_greatAxe_m",
    hobgoblin_greatAxe_f: "hobgoblin_greatAxe_f",
    goblin_leader_m: "goblin_leader_m",
    goblin_leader_f: "goblin_leader_f",
}

export const GoblinSeed: CharacterArchetype[] = [
    // MARK: GOBLIN
    // Goblin Sword Male
    new CharacterArchetype({
        name: "Goblin",
        gender: "male",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_sword_m,
        level: 1,
        portrait: "goblin_sword_m",
        race: RaceEnum.GOBLIN,
        background: "A goblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 2, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 1, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 3, exp: 0 },
            willpower: { base: 2, exp: 0 },
            breath: { base: 2, exp: 0 },
            planar: { base: 1, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 4, exp: 0 },
            strength: { base: 3, exp: 0 },
            endurance: { base: 3, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 3, exp: 0 },
            blade: { base: 3, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 3, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 3, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronShortSword,
            offHand: GearSeedWeaponEnum.WoodenRoundShield,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_power_strike, level: 1, exp: 0 },
            { skillID: SkillEnum.skill_shield_bash, level: 1, exp: 0 }        
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierFighter,
    }),

    // Goblin Sword Female
    new CharacterArchetype({
        name: "Goblin",
        gender: "female",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_sword_f,
        level: 1,
        portrait: "goblin_sword_m",
        race: RaceEnum.GOBLIN,
        background: "A goblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 3, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 2, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 2, exp: 0 },
            willpower: { base: 1, exp: 0 },
            breath: { base: 3, exp: 0 },
            planar: { base: 2, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 3, exp: 0 },
            strength: { base: 2, exp: 0 },
            endurance: { base: 3, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 3, exp: 0 },
            blade: { base: 3, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 3, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 3, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronShortSword,
            offHand: null,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_double_strafe, level: 1, exp: 0 },
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierFighter,
    }),

    // Goblin Bow Male
    new CharacterArchetype({
        name: "Goblin",
        gender: "male",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_bow_m,
        level: 1,
        portrait: "goblin_bow_m",
        race: RaceEnum.GOBLIN,
        background: "A goblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 2, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 1, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 3, exp: 0 },
            willpower: { base: 2, exp: 0 },
            breath: { base: 2, exp: 0 },
            planar: { base: 1, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 4, exp: 0 },
            strength: { base: 3, exp: 0 },
            endurance: { base: 3, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 2, exp: 0 },
            blade: { base: 2, exp: 0 },
            dagger: { base: 3, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 2, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 1, exp: 0 },
            bow: { base: 3, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.shortBow,
            offHand: null,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_power_shot, level: 1, exp: 0 },
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierRogue,
    }),

    // Goblin Bow Female
    new CharacterArchetype({
        name: "Goblin",
        gender: "female",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_bow_f,
        level: 1,
        portrait: "goblin_bow_f",
        race: RaceEnum.GOBLIN,
        background: "A goblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 3, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 2, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 2, exp: 0 },
            willpower: { base: 1, exp: 0 },
            breath: { base: 3, exp: 0 },
            planar: { base: 2, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 3, exp: 0 },
            strength: { base: 2, exp: 0 },
            endurance: { base: 3, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 2, exp: 0 },
            blade: { base: 2, exp: 0 },
            dagger: { base: 3, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 2, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 1, exp: 0 },
            bow: { base: 3, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.shortBow,
            offHand: null,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_aimed_attack, level: 1, exp: 0 },
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierRogue,
    }),

    // Goblin Pike Male
    new CharacterArchetype({
        name: "Goblin",
        gender: "male",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_pike_m,
        level: 1,
        portrait: "goblin_pike_m",
        race: RaceEnum.GOBLIN,
        background: "A goblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 2, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 1, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 3, exp: 0 },
            willpower: { base: 2, exp: 0 },
            breath: { base: 2, exp: 0 },
            planar: { base: 1, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 4, exp: 0 },
            strength: { base: 3, exp: 0 },
            endurance: { base: 3, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 2, exp: 0 },
            blade: { base: 2, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 3, exp: 0 },
            axe: { base: 2, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 1, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronJavelin,
            offHand: null,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_spear_thrust, level: 1, exp: 0 },
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierKnight,
    }),

    // Goblin Pike Female
    new CharacterArchetype({
        name: "Goblin",
        gender: "female",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_pike_f,
        level: 1,
        portrait: "goblin_pike_f",
        race: RaceEnum.GOBLIN,
        background: "A goblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 3, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 2, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 2, exp: 0 },
            willpower: { base: 1, exp: 0 },
            breath: { base: 3, exp: 0 },
            planar: { base: 2, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 3, exp: 0 },
            strength: { base: 2, exp: 0 },
            endurance: { base: 3, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 2, exp: 0 },
            blade: { base: 2, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 3, exp: 0 },
            axe: { base: 2, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 1, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronJavelin,
            offHand: null,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_spear_thrust, level: 1, exp: 0 },
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierKnight,
    }),

    // Hobgoblin Sword Male
    new CharacterArchetype({
        name: "Hobgoblin",
        gender: "male",
        type: CharacterType.humanoid,
        id: GoblinID.hobgoblin_sword_m,
        level: 5,
        portrait: "hobgoblin_sword_m",
        race: RaceEnum.GOBLIN,
        background: "A hobgoblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 2, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 1, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 5, exp: 0 },
            willpower: { base: 2, exp: 0 },
            breath: { base: 2, exp: 0 },
            planar: { base: 1, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 4, exp: 0 },
            strength: { base: 6, exp: 0 },
            endurance: { base: 5, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 5, exp: 0 },
            blade: { base: 4, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 4, exp: 0 },
            mace: { base: 3, exp: 0 },
            shield: { base: 3, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronLongSword,
            offHand: GearSeedWeaponEnum.WoodenRoundShield,
            armor: GearSeedArmorEnum.armor_medium_chainmail,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_power_strike, level: 2, exp: 0 },
            { skillID: SkillEnum.skill_shield_bash, level: 2, exp: 0 }
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierBarbarian,
    }),

    // Hobgoblin Sword Female
    new CharacterArchetype({
        name: "Hobgoblin",
        gender: "female",
        type: CharacterType.humanoid,
        id: GoblinID.hobgoblin_sword_f,
        level: 5,
        portrait: "hobgoblin_sword_f",
        race: RaceEnum.GOBLIN,
        background: "A hobgoblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 2, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 1, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 5, exp: 0 },
            willpower: { base: 2, exp: 0 },
            breath: { base: 2, exp: 0 },
            planar: { base: 1, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 4, exp: 0 },
            strength: { base: 6, exp: 0 },
            endurance: { base: 5, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 5, exp: 0 },
            blade: { base: 4, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 4, exp: 0 },
            mace: { base: 3, exp: 0 },
            shield: { base: 3, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronLongSword,
            offHand: GearSeedWeaponEnum.WoodenRoundShield,
            armor: GearSeedArmorEnum.armor_medium_chainmail,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_power_strike, level: 2, exp: 0 },
            { skillID: SkillEnum.skill_shield_bash, level: 2, exp: 0 }
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierBarbarian,
    }),

    // Hobgoblin Great Axe Male
    new CharacterArchetype({
        name: "Hobgoblin",
        gender: "male",
        type: CharacterType.humanoid,
        id: GoblinID.hobgoblin_greatAxe_m,
        level: 5,
        portrait: "hobgoblin_greatAxe_m",
        race: RaceEnum.GOBLIN,
        background: "A hobgoblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 2, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 1, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 5, exp: 0 },
            willpower: { base: 2, exp: 0 },
            breath: { base: 2, exp: 0 },
            planar: { base: 1, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 4, exp: 0 },
            strength: { base: 6, exp: 0 },
            endurance: { base: 5, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 4, exp: 0 },
            blade: { base: 3, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 5, exp: 0 },
            mace: { base: 3, exp: 0 },
            shield: { base: 2, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronGreatAxe,
            offHand: null,
            armor: GearSeedArmorEnum.armor_medium_chainmail,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_cleave, level: 2, exp: 0 },
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierBarbarian,
    }),

    // Hobgoblin Great Axe Female
    new CharacterArchetype({
        name: "Hobgoblin",
        gender: "female",
        type: CharacterType.humanoid,
        id: GoblinID.hobgoblin_greatAxe_f,
        level: 5,
        portrait: "hobgoblin_greatAxe_f",
        race: RaceEnum.GOBLIN,
        background: "A hobgoblin",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 2, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 1, exp: 0 },
            leadership: { base: 1, exp: 0 },
            vitality: { base: 5, exp: 0 },
            willpower: { base: 2, exp: 0 },
            breath: { base: 2, exp: 0 },
            planar: { base: 1, exp: 0 },
            dexterity: { base: 4, exp: 0 },
            agility: { base: 4, exp: 0 },
            strength: { base: 6, exp: 0 },
            endurance: { base: 5, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 4, exp: 0 },
            blade: { base: 3, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 5, exp: 0 },
            mace: { base: 3, exp: 0 },
            shield: { base: 2, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.IronGreatAxe,
            offHand: null,
            armor: GearSeedArmorEnum.armor_medium_chainmail,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: [],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_cleave, level: 2, exp: 0 },
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 80,
        classModifier: classModifierBarbarian,
    }),

    // Goblin Leader Male
    new CharacterArchetype({
        name: "Goblin Leader",
        gender: "male",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_leader_m,
        level: 3,
        portrait: "goblin_leader_m",
        race: RaceEnum.GOBLIN,
        background: "A goblin leader",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 3, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 6, exp: 0 },
            leadership: { base: 4, exp: 0 },
            vitality: { base: 2, exp: 0 },
            willpower: { base: 3, exp: 0 },
            breath: { base: 3, exp: 0 },
            planar: { base: 5, exp: 0 },
            dexterity: { base: 3, exp: 0 },
            agility: { base: 3, exp: 0 },
            strength: { base: 2, exp: 0 },
            endurance: { base: 2, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 2, exp: 0 },
            blade: { base: 2, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 2, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 2, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 4, exp: 0 },
            staff: { base: 3, exp: 0 },
            tome: { base: 3, exp: 0 },
            orb: { base: 3, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.quarterStaff,
            offHand: null,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: ["goblin_leader"],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_fire_ball, level: 1, exp: 0 },
            { skillID: SkillEnum.skill_mana_shield, level: 1, exp: 0 }
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 90,
        classModifier: classModifierSorcerer,
    }),

    // Goblin Leader Female
    new CharacterArchetype({
        name: "Goblin Leader",
        gender: "female",
        type: CharacterType.humanoid,
        id: GoblinID.goblin_leader_f,
        level: 3,
        portrait: "goblin_leader_f",
        race: RaceEnum.GOBLIN,
        background: "A goblin leader",
        alignment: {good: 0, evil: 10, law: 0, chaos: 10},
        mood: 70,
        energy: 100,
        fame: 0,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 3, exp: 0 },
            luck: { base: 2, exp: 0 },
            intelligence: { base: 15, exp: 0 },
            leadership: { base: 4, exp: 0 },
            vitality: { base: 2, exp: 0 },
            willpower: { base: 3, exp: 0 },
            breath: { base: 3, exp: 0 },
            planar: { base: 5, exp: 0 },
            dexterity: { base: 3, exp: 0 },
            agility: { base: 2, exp: 0 },
            strength: { base: 2, exp: 0 },
            endurance: { base: 2, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 2, exp: 0 },
            sword: { base: 2, exp: 0 },
            blade: { base: 2, exp: 0 },
            dagger: { base: 2, exp: 0 },
            spear: { base: 2, exp: 0 },
            axe: { base: 2, exp: 0 },
            mace: { base: 2, exp: 0 },
            shield: { base: 2, exp: 0 },
            bow: { base: 1, exp: 0 },
            magicWand: { base: 4, exp: 0 },
            staff: { base: 3, exp: 0 },
            tome: { base: 3, exp: 0 },
            orb: { base: 3, exp: 0 },
        },
        battlers: {
            pATK: { base: 0, exp: 0 },
            pHIT: { base: 0, exp: 0 },
            pCRT: { base: 0, exp: 0 },
            pDEF: { base: 0, exp: 0 },
            mATK: { base: 0, exp: 0 },
            mHIT: { base: 0, exp: 0 },
            mCRT: { base: 0, exp: 0 },
            mDEF: { base: 0, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 0, exp: 0 },
            pierceDEF: { base: 0, exp: 0 },
            bluntDEF: { base: 0, exp: 0 },
            dodge: { base: 0, exp: 0 },
            orderATK: {
                base: 0,
                exp: 0
            },
            chaosATK: {
                base: 0,
                exp: 0
            },
            geoATK: {
                base: 0,
                exp: 0
            },
            waterATK: {
                base: 0,
                exp: 0
            },
            airATK: {
                base: 0,
                exp: 0
            },
            fireATK: {
                base: 0,
                exp: 0
            },
            orderDEF: {
                base: 0,
                exp: 0
            },
            chaosDEF: {
                base: 0,
                exp: 0
            },
            geoDEF: {
                base: 0,
                exp: 0
            },
            waterDEF: {
                base: 0,
                exp: 0
            },
            airDEF: {
                base: 0,
                exp: 0
            },
            fireDEF: {
                base: 0,
                exp: 0
            }
        },
        elements: {
            order: { base: 0, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 0, exp: 0 },
            water: { base: 0, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 0, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.MagicWand,
            offHand: GearSeedWeaponEnum.WoodenRoundShield,
            armor: GearSeedArmorEnum.armor_light_leather,
            necklace: null,
            ring: null,
            cloth: null,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: ["goblin_leader"],
        skills: [],
        activeSkills: [
            { skillID: SkillEnum.skill_fire_ball, level: 1, exp: 0 },
            { skillID: SkillEnum.skill_mana_shield, level: 1, exp: 0 }
        ],
        itemsBag: [],
        baseAC: 5,
        location: "Goblin Camp",
        isSummoned: false,
        arcaneAptitude: 90,
        classModifier: classModifierSorcerer,
    }),
]


/* 
TODO: skill needed
    power_strike
    shield_bash
    double_strike
    quick_shot
    piercing_thrust
    cleave
    fireball
    magic_shield

TODO: trait needed
    gobin_leader
*/
