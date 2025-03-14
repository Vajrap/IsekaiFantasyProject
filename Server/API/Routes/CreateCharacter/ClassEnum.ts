// import { GearSeedArmorEnum } from "../../../Database/Item/Gear/Seeds/Armor";
// import { ClothSeedEnum } from "../../../Database/Item/Gear/Seeds/Cloth";
// import { GearSeedWeaponEnum } from "../../../Database/Item/Gear/Seeds/Weapon";
import { SkillEnum } from "../../../Database/Skill/skill";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ClassEnum } from '../../../../Common/RequestResponse/characterCreation';
import { WeaponEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ArmorEnum, BootsEnum, GlovesEnum, HeadwearEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { NecklaceEnum, RingEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";

/*
Cleric:
- Divine Flame (1d6 holy damage (+Planar Modifier) if hit, target must roll 5DC wisdom save or get awed) (cantrip, only consume MP; produce: Order)
- Bless + 2 save throw for teammates random front row (consume: MP, Order; produce: Air)
- Heal heal 1d8 (+ Vitality Modifier) to ally with lowest health percentage (consume: MP, Air, Order; produce: Water)
Now water is the production which never been used, Player might came up with new combo later.
Gear: armor_light_leather, quarterStaff

Mage:
- Arcane Bolt (1d8 arcane damage + Planar Mod) (cantrip, only consume MP; produce: None *None is also a resource type)
- Fire Ball (1d6 fire damage (+ Planar Mod) to all enemies in a row) (consume: MP, None; produce: Fire)
Mage only get 2 spells, focusing on damage and AoE damage.
Gear: cloth_silk, magicWand,

Scout:
- Aiming shot (deal weapon damage needed bow, get additional crit chance + 2) (consume SP, none, produce: air)
Don't need much skill, shoot bow, hit hard.
Gear: armor_light_leather, shortBow

Hexbinder:
- Eldritch Blast (1d8 chaos damage (+Planar Mod)) (cantrip, only consume MP; produce: Chaos)
- Curse (Cursed target for 3 turns get -2 on saves roll) (consume: MP, Chaos; produce: None)
- Chill Touch (1d6 cold damage (+Planar Mod)), target must roll 5DC constitution save or get slowed) (consume: MP, None; produce: Water)
Hexbinder is a debuff class, focus on debuffing enemies.
Gear: cloth_silk, Orb

Fighter:
- Power Strike (1.3 weapon damage (+Str mod)) (consume SP, None; Produce: Fire)
Don't need much skill, just hit hard.
Gear: armor_light_leather, BronzeLongSword

DRUID:
- Starry Wisp (1d6 damage to all enemies, if stealthed dispel stealth) (consume: MP, None; produce: Geo)
- Entangle (1d8 damage to one enemy Root target for 2 turns) (consume: MP, Geo; produce: Air)
- Rejuvenate Earth (Heal 1d6 to all allied) (consume: MP, Air, Geo; produce: Order)
Druid did't gain any Modifiers, so skill won't be so powerful, but is a versatile class.
Gear: cloth_silk, BronzeDory

GUARDIAN:
- Taunt (Taunt all enemies) (consume: SP, None; produce: Geo)
- Counter Attack (Culminative Damage when hit) (consume: SP, Geo, None; produce: -)
Tank class, accumulate damage and protect teammates, the counter attack damage is not low, quite a powerful class.
Gear: armor_light_leather, BronzeShortSword, WoodenRoundShield

SPELLBLADE:
- Arcane Sword (1.0 weapon damage as Arcane Damage, change Modifier to Planar) (Need Sword) (consume: SP; produce: None) (cantrip, replace normal attack)
- Mage Reflex (add +2 dodge for 2 turns) (consume: Mp, None, produce: Air)
- Shocking gasp (1d8 lightning damage to an enemy, target must roll 8DC constitution save or get paralyzed for 2 turns) (consume: MP, air; produce: chaos)
Focus on dealing damage on melee range, and have some utility skill.
Gear: armor_light_leather, BronzeShortSword, 

SKIRMISHER:
- Stealth (Gain stealth, won't be easily targeted) (consume: SP, None; produce: Air)
- Backstab (Deal 1.2 Weapon damage (+Dex Mod) as Pierce Damage (need Dagger) If self is in Stealth, deal 2.5 damage) (consume: SP, Air, None; produce: None)
Melee DPS, Physical class will be lack of cantrip because it relied on auto attack to produce 'None'.
Gear: armor_light_leather, BronzeDirk

Occultist:
- Get to select one lesser demon familiar
- Demonic Bolt (1d6 demonic damage (+Planar Mod)) (cantrip, only consume MP; produce: Chaos)
- Demonic Empowerment (give +2 to pATK and pDEF to a lesser demon familiar for 2 turns also heal for 1d4) (consume: MP, Chaos; produce: Fire)
Gear: cloth_silk, Grimoire

Soldier:
- shield bash (1.0 weapon damage, (shield) target must roll 8DC endurance save or get stunned for 2 turn) (consume: SP, None; produce: Geo)
- Defensive Stance (add +2 pDEF for 2 turns) (consume: SP, Geo; produce: Fire)
Gear: armor_light_leather, WoodenBuckler, BronzeShortSword

TEMPLAR:
- smite (1.0 weapon damage as angelic damage, target must roll 8DC charisma save or get awed, if target is Devil, Demon, Ghost, Evil, Undeae, deal 2 times damage) (consume: SP, None; produce: Order)
- Bless + 2 save throw for teammates random front row (consume: MP, Order; produce: Air)
- Heal heal 1d8 (+ Vitality Modifier) to ally with lowest health percentage (consume: MP, Air, Order; produce: Water)
almost like cleric, but more offensive, and have a skill that deal more damage to certain type of enemy.
Gear: armor_light_leather, BronzeClub, WoodenBuckler

*/

//TODO: starting gears is not yet deal with, need to create weapon instances
export class CharacterClass {
    name: ClassEnum;
    description: string;
    skills: SkillEnum[];
    gears: {
        mainHand: any | null;
        offHand: any | null;
        armor: any | null;
        Headwear: any | null;
        necklace: any | null;
        gloves: any | null;
        boots: any | null;
        ring_R: any | null;
        ring_L: any | null;
    };
    traits: TraitEnum[];
    bonusStats: {
        attribute: {
            charisma: number;
            luck: number;
            intelligence: number;
            leadership: number;
            vitality: number;
            willpower: number;
            breath: number;
            planar: number;
            dexterity: number;
            agility: number;
            strength: number;
            endurance: number;
        },
        proficiency: {
            bareHand: number;
            sword: number;
            blade: number;
            dagger: number;
            spear: number;
            axe: number;
            mace: number;
            shield: number;
            bow: number;
            magicWand: number;
            staff: number;
            tome: number;
            orb: number;
        },
        artisan: {
            mining: number;
            smithing: number;
            woodcutting: number;
            carpentry: number;
            foraging: number;
            weaving: number;
            skinning: number;
            tanning: number;
            jewelry: number;
            cooking: number;
            alchemy: number;
            enchanting: number;
        },
    }
    constructor(
        name: ClassEnum, 
        description: string, 
        skills: SkillEnum[], 
        gear: {
            mainHand: WeaponEnum | null;
            offHand: WeaponEnum | null;
            armor: ArmorEnum | null;
            Headwear: HeadwearEnum | null;
            boots: BootsEnum | null;
            gloves: GlovesEnum | null;
            necklace: NecklaceEnum | null;
            ring_R: RingEnum | null;
            ring_L: RingEnum | null;
        },
        traits: TraitEnum[],
        bonusStats: {
            attribute?: {
                charisma?: number;
                luck?: number;
                intelligence?: number;
                leadership?: number;
                vitality?: number;
                willpower?: number;
                breath?: number;
                planar?: number;
                dexterity?: number;
                agility?: number;
                strength?: number;
                endurance?: number;
            },
            proficiency?: {
                bareHand?: number;
                sword?: number;
                blade?: number;
                dagger?: number;
                spear?: number;
                axe?: number;
                mace?: number;
                shield?: number;
                bow?: number;
                magicWand?: number;
                staff?: number;
                tome?: number;
                orb?: number;
            },
            artisan?: {
                mining?: number;
                smithing?: number;
                woodcutting?: number;
                carpentry?: number;
                foraging?: number;
                weaving?: number;
                skinning?: number;
                tanning?: number;
                jewelry?: number;
                cooking?: number;
                alchemy?: number;
                enchanting?: number;
            },
            gears?: {
                mainHand?: WeaponEnum | null;
                offHand?: WeaponEnum | null;
                armor?: ArmorEnum | null;
                Headwear?: HeadwearEnum | null;
                boots?: BootsEnum | null;
                gloves?: GlovesEnum | null;
                necklace?: NecklaceEnum | null;
                ring_R?: RingEnum | null;
                ring_L?: RingEnum | null;
            },
        }
    )
    {
        this.name = name;
        this.description = description;
        this.skills = skills;
        this.gears = {
            mainHand: gear.mainHand,
            offHand: gear.offHand,
            armor: gear.armor,
            Headwear: gear.Headwear,
            boots: gear.boots,
            gloves: gear.gloves,
            necklace: gear.necklace,
            ring_R: gear.ring_R,
            ring_L: gear.ring_L,
        };
        this.traits = traits;
        this.bonusStats = {
            attribute: {
                charisma: bonusStats.attribute?.charisma ?? 0,
                luck: bonusStats.attribute?.luck ?? 0,
                intelligence: bonusStats.attribute?.intelligence ?? 0,
                leadership: bonusStats.attribute?.leadership ?? 0,
                vitality: bonusStats.attribute?.vitality ?? 0,
                willpower: bonusStats.attribute?.willpower ?? 0,
                breath: bonusStats.attribute?.breath ?? 0,
                planar: bonusStats.attribute?.planar ?? 0,
                dexterity: bonusStats.attribute?.dexterity ?? 0,
                agility: bonusStats.attribute?.agility ?? 0,
                strength: bonusStats.attribute?.strength ?? 0,
                endurance: bonusStats.attribute?.endurance ?? 0,
            },
            proficiency: {
                bareHand: bonusStats.proficiency?.bareHand ?? 0,
                sword: bonusStats.proficiency?.sword ?? 0,
                blade: bonusStats.proficiency?.blade ?? 0,
                dagger: bonusStats.proficiency?.dagger ?? 0,
                spear: bonusStats.proficiency?.spear ?? 0,
                axe: bonusStats.proficiency?.axe ?? 0,
                mace: bonusStats.proficiency?.mace ?? 0,
                shield: bonusStats.proficiency?.shield ?? 0,
                bow: bonusStats.proficiency?.bow ?? 0,
                magicWand: bonusStats.proficiency?.magicWand ?? 0,
                staff: bonusStats.proficiency?.staff ?? 0,
                tome: bonusStats.proficiency?.tome ?? 0,
                orb: bonusStats.proficiency?.orb ?? 0,
            },
            artisan: {
                mining: bonusStats.artisan?.mining ?? 0,
                smithing: bonusStats.artisan?.smithing ?? 0,
                woodcutting: bonusStats.artisan?.woodcutting ?? 0,
                carpentry: bonusStats.artisan?.carpentry ?? 0,
                foraging: bonusStats.artisan?.foraging ?? 0,
                weaving: bonusStats.artisan?.weaving ?? 0,
                skinning: bonusStats.artisan?.skinning ?? 0,
                tanning: bonusStats.artisan?.tanning ?? 0,
                jewelry: bonusStats.artisan?.jewelry ?? 0,
                cooking: bonusStats.artisan?.cooking ?? 0,
                alchemy: bonusStats.artisan?.alchemy ?? 0,
                enchanting: bonusStats.artisan?.enchanting ?? 0,
            }
        }    
    }
}

export const class_cleric = new CharacterClass(
    ClassEnum.CLERIC,
    'นักบวชผู้เชี่ยวชาญในการรักษาและสนับสนุนเพื่อนร่วมทีมในยามสงคราม พวกเขาเป็นแสงสว่างในความมืดที่ปกป้องและชุบชีวิต',
    [SkillEnum.skill_divine_flame, SkillEnum.skill_bless, SkillEnum.skill_heal],
    {
        mainHand: WeaponEnum.staff_quarter,
        offHand: null,
        armor: ArmorEnum.light_leather,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_cleric_01],
    {
        attribute: { charisma: 2, leadership: 2, luck: 2 },
        proficiency: { mace: 2, shield: 2, tome: 2 },    
        artisan: {}
    }
);

export const class_mage = new CharacterClass(
    ClassEnum.MAGE,
    'จอมเวทที่ควบคุมพลังแห่งธาตุเพื่อโจมตีและควบคุมศัตรูในสนามรบ พวกเขาเป็นตัวแทนของความรู้และพลังอันไร้ขีดจำกัด',
    [SkillEnum.skill_arcane_bolt, SkillEnum.skill_fire_ball],
    {
        mainHand: WeaponEnum.wand_magic,
        offHand: null,
        armor: null,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_mage_01],
    {
        attribute: { intelligence: 2, willpower: 2, planar: 2 },
        proficiency: { magicWand: 2, staff: 2, orb: 2 },
        artisan: {}
    }
);

export const class_scout = new CharacterClass(
    ClassEnum.SCOUT,
    'นักสอดแนมผู้คล่องตัวและมีไหวพริบสูง เชี่ยวชาญการต่อสู้จากระยะไกลและการสำรวจพื้นที่',
    [SkillEnum.skill_aimed_attack],
    {
        mainHand: WeaponEnum.bow_short,
        offHand: null,
        armor: ArmorEnum.light_leather,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_scout_01],
    {
        attribute:{ agility: 2, dexterity: 2, luck: 2 },
        proficiency:{ dagger: 2, spear: 2, bow: 2 },
        artisan: {}
    }
);

export const class_hexbinder = new CharacterClass(
    ClassEnum.HEXBINDER,
    'นักผูกคำสาปที่ใช้พลังมืดเพื่อควบคุมศัตรูและเสริมสร้างพลังของตัวเอง',
    [SkillEnum.skill_eldritch_blast, SkillEnum.skill_curse, SkillEnum.skill_chill_touch],
    {
        mainHand: WeaponEnum.orb_crystal,
        offHand: null,
        armor: ArmorEnum.light_leather,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_hexbinder_01],
    {
        attribute:{ intelligence: 2, charisma: 2, planar: 2 },
        proficiency:{ magicWand: 2, axe: 2, tome: 2 },
        artisan: {}
    }
);

export const class_fighter = new CharacterClass(
    ClassEnum.FIGHTER,
    'นักสู้ที่มีความสมดุลในพลังและการป้องกัน เหมาะสำหรับการต่อสู้ระยะประชิด',
    [SkillEnum.skill_power_strike],
    {
        mainHand: WeaponEnum.sword_long,
        offHand: null,
        armor: ArmorEnum.medium_studded,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_fighter_01],
    {
        attribute:{ strength: 2, endurance: 2, dexterity: 2 },
        proficiency:{ sword: 2, shield: 2, blade: 2 },    
        artisan: {}
    }
);

export const class_warden = new CharacterClass(
    ClassEnum.WARDEN,
    'ผู้พิทักษ์ธรรมชาติที่สามารถควบคุมพลังของโลกและสัตว์ป่าเพื่อปกป้องตนเองและผู้อื่น',
    [SkillEnum.skill_starry_wisp, SkillEnum.skill_entangle, SkillEnum.skill_rejuvenate],
    {
        mainHand: WeaponEnum.spear_dory,
        offHand: null,
        armor: null,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_warden_01],
    {
        attribute: { breath: 2, vitality: 2, planar: 2 },
        proficiency: { axe: 2, spear: 2, shield: 2 },    
        artisan: {}
    }
);

export const class_guardian = new CharacterClass(
    ClassEnum.GUARDIAN,
    'ผู้พิทักษ์ผู้ยืนหยัดปกป้องทีมและทนต่อการโจมตีอย่างหนัก',
    [SkillEnum.skill_taunt, SkillEnum.skill_counter_attack],
    {
        mainHand: WeaponEnum.sword_short,
        offHand: WeaponEnum.shield_buckler,
        armor: ArmorEnum.medium_studded,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_guardian_01],
    {
        attribute: { endurance: 2, vitality: 2, strength: 2 },
        proficiency: { mace: 2, shield: 2, sword: 2 },            
        artisan: {}
    }
);

export const class_spellblade = new CharacterClass(
    ClassEnum.SPELLBLADE,
    'นักดาบเวทที่รวมพลังของเวทมนตร์และดาบเพื่อสร้างการโจมตีที่ทรงพลังและหลากหลาย',
    [SkillEnum.skill_arcane_sword, SkillEnum.skill_mage_reflex, SkillEnum.skill_shocking_grasp],
    {
        mainHand: WeaponEnum.sword_short,
        offHand: null,
        armor: ArmorEnum.light_leather,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_spellblade_01],
    {
        attribute: { planar: 2, agility: 2, dexterity: 2 },
        proficiency: { blade: 2,magicWand: 2, sword: 2},
        artisan: {}
    }
);

export const class_skirmisher = new CharacterClass(
    ClassEnum.SKIRMISHER,
    'นักลอบโจมตีที่คล่องแคล่วและร้ายกาจ เหมาะสำหรับการโจมตีศัตรูในจุดที่ไม่ทันตั้งตัว',
    [SkillEnum.skill_stealth, SkillEnum.skill_backstab],
    {
        mainHand: WeaponEnum.dagger_stiletto,
        offHand: null,
        armor: ArmorEnum.light_padded,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_skirmisher_01],
    {
        attribute: { agility: 2, dexterity: 2, luck: 2 },
        proficiency: { dagger: 2, bareHand: 2, bow: 2 },
        artisan: {}
    }
);

export const class_occultist = new CharacterClass(
    ClassEnum.OCCULTIST,
    'นักอาคมผู้ศึกษาพลังลึกลับเพื่อควบคุมและเสริมสร้างพลังของตัวเอง',
    [SkillEnum.skill_demonic_fire, SkillEnum.skill_demonic_empowerment],
    {
        mainHand: WeaponEnum.tome_grimoire,
        offHand: null,
        armor: null,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_occultist_01],
    {
        attribute: { planar: 2, intelligence: 2, charisma: 2 },
        proficiency: { tome: 2, orb: 2, staff: 2 },
        artisan: {}
    }
);

export const class_soldier = new CharacterClass(
    ClassEnum.SOLDIER,
    'นักรบผู้มีความแข็งแกร่งและวินัยในสนามรบ เชี่ยวชาญการใช้อาวุธหลากหลายประเภท',
    [SkillEnum.skill_shield_bash, SkillEnum.skill_defensive_stance],
    {
        mainHand: WeaponEnum.sword_short,
        offHand: WeaponEnum.shield_buckler,
        armor: ArmorEnum.medium_studded,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_soldier_01],
    {
        attribute: { vitality: 2, endurance: 2, strength: 2 },
        proficiency: { spear: 2, axe: 2, shield: 2},
        artisan: {}
    }
);

export const class_templar = new CharacterClass(
    ClassEnum.TEMPLAR,
    'นักรบศักดิ์สิทธิ์ผู้ใช้พลังแห่งแสงเพื่อปกป้องและเสริมสร้างพลังของทีม',
    [SkillEnum.skill_smite, SkillEnum.skill_bless, SkillEnum.skill_heal],
    {
        mainHand: WeaponEnum.mace_hammer,
        offHand: WeaponEnum.shield_buckler,
        armor: ArmorEnum.medium_studded,
        Headwear: null,
        boots: null,
        gloves: null,
        necklace: null,
        ring_R: null,
        ring_L: null,
    },
    [TraitEnum.trait_templar_01],
    {
        attribute: { charisma: 2, endurance: 2, vitality: 2 },
        proficiency: { sword: 2, shield: 2, mace: 2 },
        artisan: {}
    }
);