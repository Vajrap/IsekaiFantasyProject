import { RaceEnum } from "../../API/Routes/CreateCharacter/RaceEnum";
import { CharacterArchetype } from "../../Entities/Character/Subclasses/CharacterArchetype";
import { CharacterType } from "../../Entities/Character/Subclasses/CharacterType";
import { GearSeedArmorEnum } from "../Item/Gear/Seeds/Armor";
import { ClothSeedEnum } from "../Item/Gear/Seeds/Cloth";
import { GearSeedHeadwearEnum } from "../Item/Gear/Seeds/HeadWear";
import { NecklaceSeedEnum } from "../Item/Gear/Seeds/Necklace";
import { RingSeedEnum } from "../Item/Gear/Seeds/Ring";
import { GearSeedWeaponEnum } from "../Item/Gear/Seeds/Weapon";

export const NPCID = {
    npc_king_edmund_azure: "npc_king_edmund_azure",
    npc_queen_elara_azure: "npc_queen_elara_azure",
    npc_princess_lysandra_azure: "npc_princess_lysandra_azure",
    npc_archmagus_vaelin: "npc_archmagus_vaelin",
    npc_grand_abbot_zhenwu: "npc_grand_abbot_zhenwu",
    npc_li_tianming: "npc_li_tianming",
    npc_li_xueyue: "npc_li_xueyue",
    npc_karin_farsee: "npc_karin_farsee",
}

export const NPCCharacterSeed: CharacterArchetype[] = [
    //MARK::NPC
    //MARK: EDMUND AZURE
    new CharacterArchetype({
        name: "King Edmund Azure",
        gender: "male",
        id: NPCID.npc_king_edmund_azure,
        type: CharacterType.humanoid,
        level: 20,
        portrait: "king_edmund.png",
        race: RaceEnum.HUMAN,
        background: "King of Ocean Tide, a great warrior and leader",
        alignment: { good: 60, evil: 10, law: 100, chaos: 20 },
        mood: 100,
        energy: 100,
        fame: 10000,
        gold: 0,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 18, exp: 0 },
            luck: { base: 12, exp: 0 },
            intelligence: { base: 14, exp: 0 },
            leadership: { base: 20, exp: 0 },
            vitality: { base: 22, exp: 0 },
            willpower: { base: 16, exp: 0 },
            breath: { base: 15, exp: 0 },
            planar: { base: 10, exp: 0 },
            dexterity: { base: 14, exp: 0 },
            agility: { base: 16, exp: 0 },
            strength: { base: 25, exp: 0 },
            endurance: { base: 20, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 5, exp: 0 },
            sword: { base: 18, exp: 0 },
            blade: { base: 15, exp: 0 },
            dagger: { base: 10, exp: 0 },
            spear: { base: 12, exp: 0 },
            axe: { base: 16, exp: 0 },
            mace: { base: 14, exp: 0 },
            shield: { base: 20, exp: 0 },
            bow: { base: 8, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 20, exp: 0 },
            pHIT: { base: 18, exp: 0 },
            pCRT: { base: 15, exp: 0 },
            pDEF: { base: 22, exp: 0 },
            mATK: { base: 10, exp: 0 },
            mHIT: { base: 9, exp: 0 },
            mCRT: { base: 8, exp: 0 },
            mDEF: { base: 14, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 18, exp: 0 },
            pierce: { base: 15, exp: 0 },
            blunt: { base: 17, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
            dodge: { base: 12, exp: 0 },
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
            order: { base: 10, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 8, exp: 0 },
            water: { base: 12, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 15, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 10, exp: 0 },
            woodcutting: { base: 7, exp: 0 },
            carpentry: { base: 5, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 3, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.AzureScepter,
            offHand: GearSeedWeaponEnum.SteelTowerShield,
            armor: GearSeedArmorEnum.armor_medium_mithril,
            necklace: NecklaceSeedEnum.necklace_amulet_gold_perfect_diamond,
            ring: RingSeedEnum.ring_signet_gold_aquamarine,
            cloth: ClothSeedEnum.cloth_eldritch_mammoth_wool,
            headWear: GearSeedHeadwearEnum.headwear_circlet_mithril,
        },
        internals: [],
        activeInternal: null,
        traits: ["Leader", "Strategist", "Commander"],
        skills: [
            // { skillID: "slash_attack", level: 5, exp: 0 },
            // { skillID: "shield_bash", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "shield_bash", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 18,
        location: "Ocean Tide Castle",
        isSummoned: false,
        arcaneAptitude: 70,
    }),

    //MARK: ELARA AZURE
    new CharacterArchetype({
        name: "Queen Elara Azure",
        gender: 'female',
        id: NPCID.npc_queen_elara_azure,
        type: CharacterType.humanoid,
        level: 18,
        portrait: "queen_elara.png",
        race: RaceEnum.HUMAN,
        background: "Queen of Ocean Tide, a great mage and leader",
        alignment: { good: 80, evil: 0, law: 50, chaos: 30 },
        mood: 100,
        energy: 100,
        fame: 10000,
        gold: 100000,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 20, exp: 0 },
            luck: { base: 14, exp: 0 },
            intelligence: { base: 22, exp: 0 },
            leadership: { base: 18, exp: 0 },
            vitality: { base: 16, exp: 0 },
            willpower: { base: 20, exp: 0 },
            breath: { base: 18, exp: 0 },
            planar: { base: 15, exp: 0 },
            dexterity: { base: 16, exp: 0 },
            agility: { base: 14, exp: 0 },
            strength: { base: 10, exp: 0 },
            endurance: { base: 12, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 5, exp: 0 },
            sword: { base: 0, exp: 0 },
            blade: { base: 0, exp: 0 },
            dagger: { base: 0, exp: 0 },
            spear: { base: 0, exp: 0 },
            axe: { base: 0, exp: 0 },
            mace: { base: 0, exp: 0 },
            shield: { base: 0, exp: 0 },
            bow: { base: 0, exp: 0 },
            magicWand: { base: 18, exp: 0 },
            staff: { base: 15, exp: 0 },
            tome: { base: 20, exp: 0 },
            orb: { base: 16, exp: 0 },
        },
        battlers: {
            pATK: { base: 10, exp: 0 },
            pHIT: { base: 9, exp: 0 },
            pCRT: { base: 8, exp: 0 },
            pDEF: { base: 14, exp: 0 },
            mATK: { base: 20, exp: 0 },
            mHIT: { base: 18, exp: 0 },
            mCRT: { base: 15, exp: 0 },
            mDEF: { base: 22, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
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
            order: { base: 10, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 8, exp: 0 },
            water: { base: 12, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 15, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 7, exp: 0 },
            carpentry: { base: 5, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 3, exp: 0 },
            cooking: { base: 6, exp: 0 },
            enchanting: { base: 10, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.AzureJewel,
            offHand: null,
            armor: GearSeedArmorEnum.armor_light_silver,
            necklace: NecklaceSeedEnum.necklace_amulet_gold_perfect_aquamarine,
            ring: RingSeedEnum.ring_signet_gold_sapphire,
            cloth: ClothSeedEnum.cloth_arcane_silk,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: ["Leader", "Mage", "Queen"],
        skills: [
            // { skillID: "fireball", level: 5, exp: 0 },
            // { skillID: "heal", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "heal", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 14,
        location: "Ocean Tide Castle",
        isSummoned: false,
        arcaneAptitude: 70,
    }),

    //MARK: LYSANDRA AZURE
    new CharacterArchetype({
        name: "Princess Lysandra Azure",
        gender: "female",
        id: NPCID.npc_princess_lysandra_azure,
        type: CharacterType.humanoid,
        level: 20,
        portrait: "princess_lysandra.png",
        race: RaceEnum.HUMAN,
        background: "Princess of Ocean Tide, mage and warrior",
        alignment: { good: 80, evil: 10, law: 80, chaos: 40 },
        mood: 100,
        energy: 100,
        fame: 10000,
        gold: 100000,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 18, exp: 0 },
            luck: { base: 12, exp: 0 },
            intelligence: { base: 14, exp: 0 },
            leadership: { base: 20, exp: 0 },
            vitality: { base: 22, exp: 0 },
            willpower: { base: 16, exp: 0 },
            breath: { base: 15, exp: 0 },
            planar: { base: 10, exp: 0 },
            dexterity: { base: 14, exp: 0 },
            agility: { base: 16, exp: 0 },
            strength: { base: 25, exp: 0 },
            endurance: { base: 20, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 5, exp: 0 },
            sword: { base: 18, exp: 0 },
            blade: { base: 15, exp: 0 },
            dagger: { base: 10, exp: 0 },
            spear: { base: 12, exp: 0 },
            axe: { base: 16, exp: 0 },
            mace: { base: 14, exp: 0 },
            shield: { base: 20, exp: 0 },
            bow: { base: 8, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 20, exp: 0 },
            pHIT: { base: 18, exp: 0 },
            pCRT: { base: 15, exp: 0 },
            pDEF: { base: 22, exp: 0 },
            mATK: { base: 10, exp: 0 },
            mHIT: { base: 9, exp: 0 },
            mCRT: { base: 8, exp: 0 },
            mDEF: { base: 14, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 18, exp: 0 },
            pierce: { base: 15, exp: 0 },
            blunt: { base: 17, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
            dodge: { base: 12, exp: 0 },
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
            order: { base: 10, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 8, exp: 0 },
            water: { base: 12, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 15, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 5, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 5, exp: 0 },
            cooking: { base: 3, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.SpineOfAges,
            offHand: null,
            armor: null,
            necklace: NecklaceSeedEnum.necklace_amulet_gold_perfect_aquamarine,
            ring: null,
            cloth: ClothSeedEnum.cloth_arcane_silk,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: ["Princess", "Mage", "Warrior"],
        skills: [
            // { skillID: "fireball", level: 5, exp: 0 },
            // { skillID: "slash_attack", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "slash_attack", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 14,
        location: "Ocean Tide Castle",
        isSummoned: false,
        arcaneAptitude: 70,
    }),

    //MARK: VAELIN
    new CharacterArchetype({
        //Supreme Mage, mage class level 70
        name: "Archmagus Vaelin",
        gender: "male",
        id: NPCID.npc_archmagus_vaelin,
        type: CharacterType.humanoid,
        level: 70,
        portrait: "archmagus_vaelin.png",
        race: RaceEnum.HUMAN,
        background: "Supreme Mage of Ocean Tide, a great mage and leader",
        alignment: { good: 50, evil: 10, law: 70, chaos: 40 },
        mood: 100,
        energy: 100,
        fame: 8000,
        gold: 50000,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 20, exp: 0 },
            luck: { base: 14, exp: 0 },
            intelligence: { base: 22, exp: 0 },
            leadership: { base: 18, exp: 0 },
            vitality: { base: 16, exp: 0 },
            willpower: { base: 20, exp: 0 },
            breath: { base: 18, exp: 0 },
            planar: { base: 15, exp: 0 },
            dexterity: { base: 16, exp: 0 },
            agility: { base: 14, exp: 0 },
            strength: { base: 10, exp: 0 },
            endurance: { base: 12, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 5, exp: 0 },
            sword: { base: 0, exp: 0 },
            blade: { base: 0, exp: 0 },
            dagger: { base: 0, exp: 0 },
            spear: { base: 0, exp: 0 },
            axe: { base: 0, exp: 0 },
            mace: { base: 0, exp: 0 },
            shield: { base: 0, exp: 0 },
            bow: { base: 0, exp: 0 },
            magicWand: { base: 18, exp: 0 },
            staff: { base: 15, exp: 0 },
            tome: { base: 20, exp: 0 },
            orb: { base: 16, exp: 0 },
        },
        battlers: {
            pATK: { base: 10, exp: 0 },
            pHIT: { base: 9, exp: 0 },
            pCRT: { base: 8, exp: 0 },
            pDEF: { base: 14, exp: 0 },
            mATK: { base: 20, exp: 0 },
            mHIT: { base: 18, exp: 0 },
            mCRT: { base: 15, exp: 0 },
            mDEF: { base: 22, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
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
            order: { base: 10, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 8, exp: 0 },
            water: { base: 12, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 15, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 5, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 5, exp: 0 },
            cooking: { base: 3, exp: 0 },
            enchanting: { base: 10, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.WanderingStar,
            offHand: null,
            armor: null,
            necklace: null,
            ring: null,
            cloth: ClothSeedEnum.cloth_arcane_silk,
            headWear: GearSeedHeadwearEnum.headwear_hood_spider_silk,
        },
        internals: [],
        activeInternal: null,
        traits: ["Leader", "Mage", "Archmagus"],
        skills: [
            // { skillID: "fireball", level: 5, exp: 0 },
            // { skillID: "heal", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "heal", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 14,
        location: "Ocean Tide Castle",
        isSummoned: false,
        arcaneAptitude: 100,
    }),

    //MARK: GRAND ABBOT ZHENWU
    new CharacterArchetype({
        //Grandmaster of Laoh's temple, super powerful monk, level 85
        name: "Grand Abbot Zhenwu",
        gender: "male",
        id: NPCID.npc_grand_abbot_zhenwu,
        type: CharacterType.humanoid,
        level: 85,
        portrait: "grand_abbot_zhenwu.png",
        race: RaceEnum.HUMAN,
        background: "Grandmaster of Laoh's temple, a great monk and leader",
        alignment: { good: 100, evil: 0, law: 90, chaos: 0 },
        mood: 100,
        energy: 100,
        fame: 12000,
        gold: 80000,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 20, exp: 0 },
            luck: { base: 14, exp: 0 },
            intelligence: { base: 22, exp: 0 },
            leadership: { base: 18, exp: 0 },
            vitality: { base: 16, exp: 0 },
            willpower: { base: 20, exp: 0 },
            breath: { base: 18, exp: 0 },
            planar: { base: 15, exp: 0 },
            dexterity: { base: 16, exp: 0 },
            agility: { base: 14, exp: 0 },
            strength: { base: 25, exp: 0 },
            endurance: { base: 20, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 20, exp: 0 },
            sword: { base: 0, exp: 0 },
            blade: { base: 0, exp: 0 },
            dagger: { base: 0, exp: 0 },
            spear: { base: 0, exp: 0 },
            axe: { base: 0, exp: 0 },
            mace: { base: 0, exp: 0 },
            shield: { base: 0, exp: 0 },
            bow: { base: 0, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 20, exp: 0 },
            pHIT: { base: 18, exp: 0 },
            pCRT: { base: 15, exp: 0 },
            pDEF: { base: 22, exp: 0 },
            mATK: { base: 10, exp: 0 },
            mHIT: { base: 9, exp: 0 },
            mCRT: { base: 8, exp: 0 },
            mDEF: { base: 14, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
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
            order: { base: 10, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 8, exp: 0 },
            water: { base: 12, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 15, exp: 0 },
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
            cooking: { base: 10, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: null,
            offHand: null,
            armor: null,
            necklace: null,
            ring: null,
            cloth: ClothSeedEnum.cloth_jute,
            headWear: null,      
        },
        internals: [],
        activeInternal: null,
        traits: ["Leader", "Monk", "Grandmaster"],
        skills: [
            // { skillID: "chi_palm", level: 5, exp: 0 },
            // { skillID: "chi_punch", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "chi_punch", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 14,
        location: "Laoh's Temple",
        isSummoned: false,
        arcaneAptitude: 50
    }),

    //MARK: LI TIANMING
    new CharacterArchetype({
        //Master of Heaven's decree, super powerful martial artist, level 95
        name: "Li Tianming",
        gender: "male",
        id: NPCID.npc_li_tianming,
        type: CharacterType.humanoid,
        level: 95,
        portrait: "li_tianming.png",
        race: RaceEnum.HUMAN,
        background: "Master of Heaven's decree, a great martial artist and leader",
        alignment: { good: 50, evil: 70, law: 50, chaos: 50 },
        mood: 100,
        energy: 100,
        fame: 15000,
        gold: 100000,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 20, exp: 0 },
            luck: { base: 14, exp: 0 },
            intelligence: { base: 22, exp: 0 },
            leadership: { base: 18, exp: 0 },
            vitality: { base: 16, exp: 0 },
            willpower: { base: 20, exp: 0 },
            breath: { base: 30, exp: 0 },
            planar: { base: 15, exp: 0 },
            dexterity: { base: 16, exp: 0 },
            agility: { base: 14, exp: 0 },
            strength: { base: 25, exp: 0 },
            endurance: { base: 20, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 20, exp: 0 },
            sword: { base: 0, exp: 0 },
            blade: { base: 0, exp: 0 },
            dagger: { base: 0, exp: 0 },
            spear: { base: 0, exp: 0 },
            axe: { base: 0, exp: 0 },
            mace: { base: 0, exp: 0 },
            shield: { base: 0, exp: 0 },
            bow: { base: 0, exp: 0 },
            magicWand: { base: 0, exp: 0 },
            staff: { base: 0, exp: 0 },
            tome: { base: 0, exp: 0 },
            orb: { base: 0, exp: 0 },
        },
        battlers: {
            pATK: { base: 20, exp: 0 },
            pHIT: { base: 18, exp: 0 },
            pCRT: { base: 15, exp: 0 },
            pDEF: { base: 22, exp: 0 },
            mATK: { base: 10, exp: 0 },
            mHIT: { base: 9, exp: 0 },
            mCRT: { base: 8, exp: 0 },
            mDEF: { base: 14, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
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
            order: { base: 10, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 8, exp: 0 },
            water: { base: 12, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 15, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 6, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 8, exp: 0 },
            weaving: { base: 0, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 0, exp: 0 },
            cooking: { base: 0, exp: 0 },
            enchanting: { base: 0, exp: 0 },
        },
        equipments: {
            mainHand: null,
            offHand: null,
            armor: null,
            necklace: null,
            ring: null,
            cloth: ClothSeedEnum.cloth_linen,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: ["Leader", "Monk", "Master"],
        skills: [
            // { skillID: "chi_palm", level: 5, exp: 0 },
            // { skillID: "chi_punch", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "chi_punch", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 14,
        location: "Heaven's Decree Temple",
        isSummoned: false,
        arcaneAptitude: 50
    }),

    //MARK: LI XUEYUE
    new CharacterArchetype({
        //Heven's decree, daughter of Li Tianming, martial artist, level 60
        name: "Li Xueyue",
        gender: "female",
        id: NPCID.npc_li_xueyue,
        type: CharacterType.humanoid,
        level: 60,
        portrait: "li_xueyue.png",
        race: RaceEnum.HUMAN,
        background: "Daughter of Li Tianming, a great martial artist and leader",
        alignment: { good: 70, evil: 20, law: 50, chaos: 50 },
        mood: 100,
        energy: 100,
        fame: 2000,
        gold: 2000,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 20, exp: 0 },
            luck: { base: 15, exp: 0 },
            intelligence: { base: 18, exp: 0 },
            leadership: { base: 10, exp: 0 },
            vitality: { base: 16, exp: 0 },
            willpower: { base: 20, exp: 0 },
            breath: { base: 30, exp: 0 },
            planar: { base: 15, exp: 0 },
            dexterity: { base: 26, exp: 0 },
            agility: { base: 20, exp: 0 },
            strength: { base: 17, exp: 0 },
            endurance: { base: 18, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 20, exp: 0 },
            sword: { base: 25, exp: 0 },
            blade: { base: 0, exp: 0 },
            dagger: { base: 0, exp: 0 },
            spear: { base: 0, exp: 0 },
            axe: { base: 0, exp: 0 },
            mace: { base: 0, exp: 0 },
            shield: { base: 0, exp: 0 },
            bow: { base: 0, exp: 0 },
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
            chiColdATK: { base: 5, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
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
            jewelry: { base: 3, exp: 0 },
            alchemy: { base: 10, exp: 0 },
            cooking: { base: 2, exp: 0 },
            enchanting: { base: 3, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.WhitePlum,
            offHand: null,
            armor: null,
            necklace: null,
            ring: null,
            cloth: ClothSeedEnum.cloth_linen,
            headWear: null,
        },
        internals: [],
        activeInternal: null,
        traits: ["Leader", "Monk", "Master"],
        skills: [
            // { skillID: "chi_palm", level: 5, exp: 0 },
            // { skillID: "chi_punch", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "chi_punch", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 14,
        location: "Heaven's Decree Temple",
        isSummoned: false,
        arcaneAptitude: 50
    }),

    //MARK: KARIN FARSEE
    new CharacterArchetype({
        //Fire mage, powerful mage, level 40
        name: "Karin Farsee",
        gender: "female",
        id: NPCID.npc_karin_farsee,
        type: CharacterType.humanoid,
        level: 40,
        portrait: "karin_farsee.png",
        race: RaceEnum.HUMAN,
        background: "Fire mage, a great mage and leader",
        alignment: { good: 70, evil: 10, law: 50, chaos: 30 },
        mood: 100,
        energy: 100,
        fame: 5000,
        gold: 30000,
        exp: 0,
        isDead: false,
        lastTarget: "",
        attributes: {
            charisma: { base: 20, exp: 0 },
            luck: { base: 14, exp: 0 },
            intelligence: { base: 22, exp: 0 },
            leadership: { base: 18, exp: 0 },
            vitality: { base: 16, exp: 0 },
            willpower: { base: 20, exp: 0 },
            breath: { base: 18, exp: 0 },
            planar: { base: 15, exp: 0 },
            dexterity: { base: 16, exp: 0 },
            agility: { base: 14, exp: 0 },
            strength: { base: 10, exp: 0 },
            endurance: { base: 12, exp: 0 },
        },
        proficiencies: {
            bareHand: { base: 5, exp: 0 },
            sword: { base: 0, exp: 0 },
            blade: { base: 0, exp: 0 },
            dagger: { base: 0, exp: 0 },
            spear: { base: 0, exp: 0 },
            axe: { base: 0, exp: 0 },
            mace: { base: 0, exp: 0 },
            shield: { base: 0, exp: 0 },
            bow: { base: 0, exp: 0 },
            magicWand: { base: 18, exp: 0 },
            staff: { base: 15, exp: 0 },
            tome: { base: 20, exp: 0 },
            orb: { base: 16, exp: 0 },
        },
        battlers: {
            pATK: { base: 10, exp: 0 },
            pHIT: { base: 9, exp: 0 },
            pCRT: { base: 8, exp: 0 },
            pDEF: { base: 14, exp: 0 },
            mATK: { base: 20, exp: 0 },
            mHIT: { base: 18, exp: 0 },
            mCRT: { base: 15, exp: 0 },
            mDEF: { base: 22, exp: 0 },
            chiWarmATK: { base: 0, exp: 0 },
            chiColdATK: { base: 0, exp: 0 },
            chiWarmDEF: { base: 0, exp: 0 },
            chiColdDEF: { base: 0, exp: 0 },
            slash: { base: 0, exp: 0 },
            pierce: { base: 0, exp: 0 },
            blunt: { base: 0, exp: 0 },
            slashDEF: { base: 18, exp: 0 },
            pierceDEF: { base: 15, exp: 0 },
            bluntDEF: { base: 17, exp: 0 },
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
            order: { base: 10, exp: 0 },
            chaos: { base: 0, exp: 0 },
            geo: { base: 8, exp: 0 },
            water: { base: 12, exp: 0 },
            air: { base: 0, exp: 0 },
            fire: { base: 15, exp: 0 },
        },
        artisans: {
            mining: { base: 0, exp: 0 },
            smithing: { base: 0, exp: 0 },
            woodcutting: { base: 0, exp: 0 },
            carpentry: { base: 0, exp: 0 },
            foraging: { base: 0, exp: 0 },
            weaving: { base: 5, exp: 0 },
            skinning: { base: 0, exp: 0 },
            tanning: { base: 0, exp: 0 },
            jewelry: { base: 0, exp: 0 },
            alchemy: { base: 5, exp: 0 },
            cooking: { base: 3, exp: 0 },
            enchanting: { base: 10, exp: 0 },
        },
        equipments: {
            mainHand: GearSeedWeaponEnum.EnchantedMagicStaff,
            offHand: null,
            armor: null,
            necklace: null,
            ring: null,
            cloth: ClothSeedEnum.cloth_moonlit_cotton,
            headWear: GearSeedHeadwearEnum.headwear_hood_cloth,
        },
        internals: [],
        activeInternal: null,
        traits: ["Leader", "Mage", "Fire"],
        skills: [
            // { skillID: "fireball", level: 5, exp: 0 },
            // { skillID: "heal", level: 3, exp: 0 }
        ],
        activeSkills: [
            // { skillID: "heal", level: 3, exp: 0 }
        ],
        itemsBag: ["Health Potion", "Mana Potion"],
        baseAC: 14,
        location: "Fire Temple",
        isSummoned: false,
        arcaneAptitude: 70
    }),
]