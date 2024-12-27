import { ElementConsume, ElementProduce, SkillConsume, SkillProduce } from "../../Entities/Skills/SubClasses/SkillConsume";
import { SkillEquipmentRequirement } from "../../Entities/Skills/SubClasses/SkillEquipmentRequirement";
import { SkillLearningRequirement } from "../../Entities/Skills/SubClasses/SkillLearningRequirement";
import { Tier } from "../../Utility/Tier";
import { PreferredPositionEnum, SkillActionObject, SkillActionSubType, SkillActionType, SkillActiveEffect, SkillApplyEffect } from "../../Entities/Skills/SubClasses/SkillActiveEffect";
import { FundamentalElementTypes } from "../../../Common/Enums/ElementTypes";
import { BuffsAndDebuffsEnum, TargetConditionFilters, TargetPartyType, TargetSelectionScope, TargetSortingOptions, TargetTauntConsideration, TargetType } from "../../../Common/Enums/TargetTypes";
import { DamageTypes } from "../../../Common/Enums/DamageTypes";
import { CharacterStatusEnum } from "../../../Common/Enums/Character/CharacterStatusTypes";
import { createTableIfNotExists } from "../Seeding";
import { DiceEnum } from "../../../Common/DamageDIce";
import { WeaponType } from "../../../Common/Enums/Item/EquipmentTypes";
import { TraitEnum } from "../../Entities/Traits/TraitEnums";
import { SkillInternalType } from "../../Entities/Skills/SubClasses/SkillInternalType";

export class SkillArchetype {
    id: string;
    name: string;
    baseDescription: string;
    requirement: SkillLearningRequirement;
    equipmentNeeded: SkillEquipmentRequirement;
    activeEffect: SkillActiveEffect[];
    consume: SkillConsume;
    produce: SkillProduce;
    tier: Tier;
    isSpell: boolean = false;
    internalType: SkillInternalType = SkillInternalType.None;
    isWeaponAttack: boolean = false;

    constructor(dto: {
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
        isSpell?: boolean
        internalType?: SkillInternalType
        isWeaponAttack?: boolean
    }) 
    {
        this.id = dto.id;
        this.name = dto.name;
        this.baseDescription = dto.baseDescription;
        this.requirement = dto.requirement;
        this.equipmentNeeded = dto.equipmentNeeded,
        this.activeEffect = dto.activeEffect;
        this.consume = dto.consume;
        this.produce = dto.produce;
        this.tier = dto.tier;
        this.isSpell = dto.isSpell || false;
        this.internalType = dto.internalType || SkillInternalType.None;
        this.isWeaponAttack = dto.isWeaponAttack || false;
    }
}

export enum SkillEnum {
    // MARK: Wellknown Skills, no sect, school owner, or class specific
    // common
    // Physical Skills
    skill_shield_bash = 'skill_shield_bash',
    skill_power_strike = 'skill_power_strike',
    skill_throw_knife = 'skill_throw_knife',
    skill_poison_coating = 'skill_poison_coating',
    skill_first_aid = 'skill_first_aid',
    skill_double_strike = 'skill_double_strike',
    skill_leap_attack = 'skill_leap_attack',
    skill_spear_thrust = 'skill_spear_thrust',
    skill_cleave = 'skill_cleave',
    skill_berserker_rage = 'skill_berserker_rage',
    skill_power_shot = 'skill_power_shot',
    skill_double_strafe = 'skill_double_strafe',
    skill_aimed_attack = 'skill_aimed_attack',
    skill_taunt = 'skill_taunt',
    skill_defensive_stance = 'skill_defensive_stance',
    skill_stealth = 'skill_stealth',
    skill_backstab = 'skill_backstab',

    // Magic/Planar
    // arcane
    skill_arcane_sword = 'skill_arcane_sword',
    skill_mage_reflex = 'skill_mage_reflex',
    skill_arcane_bolt = 'skill_arcane_bolt',
    skill_magic_missile = 'skill_magic_missile',
    skill_mana_shield = 'skill_mana_shield',
    // order
    skill_heal = 'skill_heal',
    skill_bless = 'skill_bless',
    skill_divine_flame = 'skill_divine_flame',
    // chaos
    skill_eldritch_blast = 'skill_eldritch_blast',
    skill_curse = 'skill_curse',
    skill_chill_touch = 'skill_chill_touch',
    // geo
    skill_rock_throw = 'skill_rock_throw',
    // water
    skill_water_beam = 'skill_water_beam',
    // air
    skill_air_blade = 'skill_air_blade',
    // fire
    skill_burning_hand = 'skill_burning_hand',
    // nature
    skill_starry_wisp = 'skill_starry_wisp',
    skill_entangle = 'skill_entangle',
    skill_rejuvenate = 'skill_rejuvenate',
    // lightning
    skill_shocking_grasp = 'skill_shocking_grasp',
    // demonic
    skill_demonic_empowerment = 'skill_demonic_empowerment',
    // holy = "holy",
    skill_smite = 'skill_smite',


    // Internal Energy Skills
    skill_inner_focus = 'skill_inner_focus',
    skill_chi_blast = 'skill_chi_blast',
    skill_chi_infused_strike = 'skill_chi_infused_strike',
    skill_chi_circulation = 'skill_chi_circulation', //used for healing, slow healing over time

    // uncommon
    // physical skills
    skill_counter_attack = 'skill_counter_attack',
    skill_battlecry = 'skill_battlecry',
    skill_charge = 'skill_charge',
    skill_roar = 'skill_roar',
    
    skill_triple_slash = 'skill_triple_slash',
    skill_caution = 'skill_caution',

    // magical skills
    // order
    skill_orderic_blast = `skill_orderic_blast`,
    // chaos
    skill_banish = `skill_banish`,
    // geo
    skill_stone_skin = `skill_stone_skin`,
    skill_earth_spike = `skill_earth_spike`,
    // water
    skill_drown = `skill_drown`,
    // air
    skill_storm_blast = `skill_storm_blast`,
    // fire
    skill_fire_ball = `skill_fire_ball`,
    // ice = "ice",
    skill_ice_nova = `skill_ice_nova`,
    // spirit = "spirit",
    skill_spirit_sword = `skill_spirit_sword`,
    // lightning = "lightning",
    skill_lightning_bolt = 'skill_lightning_bolt',
    // demonic = "demonic",
    skill_demonic_fire = 'skill_demonic_fire',
    // metal = "metal",
    skill_steel_spear = 'skill_steel_spear',
    // angelic = "angelic",
    skill_divine_light = 'skill_divine_light',
    // life = "life",
    skill_cleanse = 'skill_cleanse',
    // dark = "dark",
    skill_dark = 'skill_dark',
    // ghost = "ghost",
    skill_ghastly_touch = 'skill_ghastly_touch',
    // poison = "poison",
    skill_miasma = 'skill_miasma',
    // arcane = "arcane",
    skill_arcane_explosion = `skill_arcane_explosion`,

    //rare
    skill_iai_slash = 'skill_iai_slash',

    //epic

    //legendary
    
    //unique

    //divine


    // Skill Tier Common-Uncommon; max level = 5
    // Skill Tier Rare-Epic; max level = 7
    // Skill Tier Legendary-Unique; max level = 10
    // Skill Tier Divine; max level = 15

    // MARK: Sect Skills: Skill that can be learned by joining specific sects

    // 10 greate sects
    /*
        Explanation on Magic and Internal Energy
        In this world's setting, there are a particle, magical energy called 'Planar' which is like the source of all things
        Planar came in 6 types, Fire, Water, Air, Earth, Order, and Chaos and can be combine into different elements
        Magic is actually the manipulation of 'External Planar' which is the manipulation of the Planar outside of the body
        Internal Energy is the manipulation of 'Internal Planar' which is the manipulation of the Planar inside of the body
        The difference between Magic and Internal Energy is that Magic is more versatile and can be used for many things, 
        while Internal Energy is more focused and can be used mostly for physical enhancement, healing and some might be able to cast the internal planar out, like a magic but this is a very hard thing to do, might produce a very powerful attack almost like magic.
        
        The more one profound in controlling external planar, the less they can control internal planar and vice versa,
    */

    // Below are the Great Sects, these are big and powerful sects that have a strong presence in the continent.

    // MARK: Laoh Temple
    // Worship the god of Order, Laoh. Have 2 branches, Internal Energy and Order Magic, but wellknown for their Internal Energy skills
    // Resemble Shaolin Temple, in Chinese Wuxia setting, wellknown for their martial arts and healing skills
    // has strong presence in the continent, and also is a main religion in the continent.
    // Laoh's martial arts
    // uncommon
    // skill_laoh_serene_hand_form = 'skill_laoh_serene_hand_form',
    // // epic
    // skill_laoh_sacred_dragon_palm = 'skill_laoh_sacred_dragon_palm',
    // skill_laoh_heaven_touch = 'skill_laoh_heaven_touch',
    // // legendary
    // skill_laoh_laoh_eradicate_mountains = 'skill_laoh_eradicate_mountains',
    // // unique
    // skill_laoh_enlighten_palm = 'skill_laoh_enlighten_palm',

    // // Laoh's Magic
    // // uncommon
    // skill_laoh_soothing_light = 'skill_laoh_soothing_light',
    // // rare
    // skill_laoh_laoh_blessing = 'skill_laoh_laoh_blessing',
    // skill_laoh_spear_of_light = 'skill_laoh_spear_of_light',
    // skill_laoh_radiant_shield = 'skill_laoh_radiant_shield',
    // // legendary
    // skill_laoh_divine_punishment = 'skill_laoh_divine_punishment',


    // MARK: Arcanis Academy
    // An Arcane school located in Oceantide, seen as the most prestigious school, wellknown for their specialty in Arcane Magic(Using all elements)
    // While magic is something mundane (people outsi of the academy are able to use magic at ease, the reason that Magical Schools stand out is their research and creation of some special spells)
    // There are lots of Magic Schools in the continent, but Arcanis Academy is the most wellknown and prestigious one, only accepting the talented and the rich as their students.

    // 1. Vortex Blast: combine the air and water planar, creating powerful torrent of water that deal group water damage and has a chance to stun enemies
    // 2. Combustion: a special technique that is hard to acheive which is controlling opposite planar at the same time, (i.e. fire and water) dealing both type of damage to all enemies and has a chance to add drown and burn to enemies.
    // 3. Arcane Shield: very powerful technique, made Arcanis Academia wellknown around the continent, creating mana shield, absorbing some damage
    // 4. Arcane Volley: A common yet unique spells used by Academy's mages, showing their prowess in all planar's elements control, normal arcane missile would only deal one type of damage, but Academy's volley deal all kind of damages one by one, this spell, though seems normal, but can became one of the most powerful attack spell when the caster getting better.
    // rare
    // skill_arcanist_arcane_missiles = 'skill_arcanist_arcane_missiles',

    

    // MARK: Order of Silver Fist
    // Should be a military sect, doesn't really use fist but military tactics,
    // A main powerhouse in the continent, serving under the Kingdom Cloud Shade, wellknown for their heavy armor and shield, 
    // most of their skilled individual became the knight leaders in Cloud Shade army.
    // Physical
    // uncommon
    // skill_silverFist_formative_charge = 'skill_silverFist_formative_charge', //Upgrade version of Charge
    // // rare
    // skill_silverFist_shield_wall = 'skill_silverFist_shield_wall',
    // skill_silverFist_battle_roar = 'skill_silverFist_battle_roar',
    // skill_silverFist_battle_stance = 'skill_silverFist_battle_stance',
    // skill_silverFist_javelin_throw = 'skill_silverFist_javelin_throw',
    // // epic
    // skill_silverFist_phalanx_barrage = 'skill_silverFist_phalanx_barrage', //raise one's own shield and attack with spear from defense line, deal huge damage to one enemy


    // MARK: Celestial Swords
    // A sect devoted to swordmanship, wellknown for their sword skills, use some internal energy to enhance their body and magic to enhance their sword.
    // Since they used both Internal Energy and Magic, both are not as powerful as other sects, but their sword skills are the best in the continent, with the amplification of internal energy and magic, their sword skills are powerful and versatile.
    // Also welknown for their forging techniques, and facilitate the best forge in the continent.
    // uncommon
    // skill_celestialSword_sword_dance = 'skill_celestialSword_sword_dance', // common Celestial Sword skill, a dance of sword, dealing multiple hits to one enemy
    // // rare
    // skill_celestialSword_sword_aura = 'skill_celestialSword_sword_aura', // Enhance one's sword with small external planar, deling extra 'air' damage
    // skill_celestialSword_swift_killing = 'skill_celestialSword_swift_killing', // a powerful sword skill, move fast and deal a critical hit to one enemy nut low accuracy
    // skill_celestialSword_sword_barrage = 'skill_celestialSword_sword_barrage', // a powerful sword skill, dealing multiple hits to one enemy
    // // legendary
    // skill_celestialSword_thousand_sword = 'skill_celestialSword_thousand_sword', // a powerful sword skill, dealing multiple hits to all enemies

    
    // MARK: Ironclad Bastion
    // A Kinght society, sellsword, and mercenary group, wellknown for their service in the battlefield, use heavy armor and shield, and their skills are mostly physical
    // uncommon
    // skill_ironclad_shield_bash = 'skill_ironclad_shield_bash',
    // skill_ironclad_power_strike = 'skill_ironclad_power_strike',
    // skill_ironclad_taunt = 'skill_ironclad_taunt',
    // skill_ironclad_defensive_stance = 'skill_ironclad_defensive_stance',
    // skill_ironclad_charge = 'skill_ironclad_charge',
    // // rare
    // skill_ironclad_shield_wall = 'skill_ironclad_shield_wall',
    // skill_ironclad_battle_roar = 'skill_ironclad_battle_roar',
    // skill_ironclad_battle_stance = 'skill_ironclad_battle_stance',
    // skill_ironclad_tomahwak = 'skill_ironclad_tomahwak', // Throw an axe, dealing physical damage to one enemy

    // MARK: Shakir's Veil
    // A group well known for their ranged weapon and stealth, Known as one of the great sect means that their skills are wellrounded and powerful, eventhough they use stealth skill, they are chivalrous and honorable just like other great sects 
    // uncommon
    // skill_shakir_stealth = 'skill_shakir_stealth',
    // skill_shakir_backstab = 'skill_shakir_backstab',
    // skill_shakir_triple_shot = 'skill_shakir_triple_shot',
    // skill_shakir_caution = 'skill_shakir_caution',
    // // rare
    // skill_shakir_dark_arrow = 'skill_shakir_dark_arrow',
    // skill_shakir_shadow_walk = 'skill_shakir_shadow_walk',
    // skill_shakir_chaos_slash = 'skill_shakir_chaos_slash',
    // skill_shakir_silence = 'skill_shakir_silence',
    // // epic
    // skill_shakir_dark_veil = 'skill_shakir_dark_veil', // blind all enemies


    // MARK: Embers of Pjhorn
    // A sect worshippin Pjhorn, the god of fire, learning arts of Warlock, wearing armor while casting magic, (So, this sect have bonus that can help ease the casting penalty while wearing armor)
    // uncommon
    // skill_pjhorn_fireball = 'skill_pjhorn_fireball', // common Pjhorn skill, a fireball that deal fire damage to one enemy
    // skill_pjhorn_burning_hand = 'skill_pjhorn_burning_hand', // Shorter fire skill, deal fire damage to frontline enemies
    // // rare
    // skill_pjhorn_combustion = 'skill_pjhorn_combustion', //make enemy that was in 'burn' status explode, deal massive damage to the enemy and adjacent enemies
    // skill_pjhorn_fire_shield = 'skill_pjhorn_fire_shield', // create a shield that absorb many type of damage and has chance to burn enemies that attack the shield
    // // epic
    // skill_pjhorn_flame_blade = 'skill_pjhorn_flame_blade', // enhance one's weapon with fire, dealing extra fire damage
    // // legendary
    // skill_pjhorn_inferno = 'skill_pjhorn_inferno', // deal massive fire damage to all enemies

    // MARK: Blue Sky mountain sect
    // A sect that focus on cultivating internal energy and study many kinds of internal energy skills, wellknown for their wellrounded internal enregy control and how they could improvise their internal energy to use in different ways
    // anyway, this part is mainly about skill, not internal, internal would be defined in another part    
    // uncommon
    // skill_blueSky_healing_hand = 'skill_blueSky_healing_hand',
    // skill_blueSky_inner_focus = 'skill_blueSky_inner_focus',
    // skill_blueSky_chi_blast = 'skill_blueSky_chi_blast',
    // // rare
    // skill_blueSky_chi_circulation = 'skill_blueSky_chi_circulation',
    // skill_blueSky_chi_infused_strike = 'skill_blueSky_chi_infused_strike',
    // // epic
    // skill_blueSky_hazy_cloud_purple_night = 'skill_blueSky_hazy_cloud_purple_night', // a powerful strike that deal cold internal energy damage to one enemy along with chaos damage
    // skill_blueSky_green_mountains_blue_skies = 'skill_blueSky_green_mountains_blue_skies', // a powerful strike that deal earth internal energy damage to one enemy along with order damage
    

    // MARK: Vorkai Stormcallers
    // Powerful mages circle, practices air and lightning magic, wellknown because their magical skills are powerful and destructive, even powerful than Arcanis Academy
    // uncommon
    // skill_vorkai_air_blade = 'skill_vorkai_air_blade',
    // skill_vorkai_lightning_bolt = 'skill_vorkai_lightning_bolt',
    // // rare
    // skill_vorkai_storm_blast = 'skill_vorkai_storm_blast',
    // skill_vorkai_lightning_strike = 'skill_vorkai_lightning_strike',
    // // epic
    // skill_vorkai_thunderstorm = 'skill_vorkai_thunderstorm',
    

    // MARK: Naor's Embrace
    // Known for their healing and support magic
    // uncommon
    // skill_naor_heal = 'skill_naor_heal',
    // skill_naor_earth_spike = 'skill_naor_earth_spike',
    // // rare
    // skill_naor_bless = 'skill_naor_bless',
    // skill_naor_stone_skin = 'skill_naor_stone_skin',
    // // epic
    // skill_naor_earthquake = 'skill_naor_earthquake',
    // skill_naor_earth_guardian = 'skill_naor_earth_guardian', // summon a golem companion
}

/*
Cleric:
- Divine Flame (1d6 holy damage (+Planar Modifier) if hit, target must roll 5DC wisdom save or get awed) (cantrip, only consume MP; produce: Order)
- Bless + 2 save throw for teammates random front row (consume: MP, Order; produce: Air)
- Heal heal 1d8 (+ Vitality Modifier) to ally with lowest health percentage (consume: MP, Air, Order; produce: Water)
Now water is the production which never been used, Player might came up with new combo later.

Mage:
- Arcane Bolt (1d8 arcane damage + Planar Mod) (cantrip, only consume MP; produce: None *None is also a resource type)
- Fire Ball (1d6 fire damage (+ Planar Mod) to all enemies in a row) (consume: MP, None; produce: Fire)
Mage only get 2 spells, focusing on damage and AoE damage.

Scout:
- Aiming shot (deal weapon damage needed bow, get additional crit chance + 2) (consume SP, none, produce: air)
Don't need much skill, shoot bow, hit hard.

Hexbinder:
- Eldritch Blast (2d4 chaos damage (+Planar Mod)) (cantrip, only consume MP; produce: none)
- Curse (Cursed target for 3 turns get -2 on saves roll) (consume: MP, none; produce: Chaos)
- Chill Touch (1d6 cold damage (+Planar Mod)), target must roll 5DC constitution save or get slowed) (consume: MP, Chaos; produce: Water)
Hexbinder is a debuff class, focus on debuffing enemies.

Fighter:
- Power Strike (1.3 weapon damage (+Str mod)) (consume SP, None; Produce: Fire)
Don't need much skill, just hit hard.

DRUID:
- Starry Wisp (1d6 nature damage to all enemies in a row, if stealthed dispel stealth) (consume: MP, None; produce: Geo)
- Entangle (1d8 damage to one enemy Root target for 2 turns) (consume: MP, Geo; produce: Air)
- Rejuvenate (Heal 1d6 to all allied) (consume: MP, Air, Geo; produce: Order)
Druid did't gain any Modifiers, so skill won't be so powerful, but is a versatile class.

GUARDIAN:
- Taunt (Taunt all enemies) (consume: SP, None; produce: Geo)
- Counter Attack (Culminative Damage when hit) (consume: SP, Geo, None; produce: -)
Tank class, accumulate damage and protect teammates, the counter attack damage is not low, quite a powerful class.

SPELLBLADE:
- Arcane Sword (1.0 weapon damage as Arcane Damage, change Modifier to Planar) (Need Sword) (consume: SP; produce: None) (cantrip, replace normal attack)
- Mage Reflex (add +2 dodge for 2 turns) (consume: Mp, None, produce: Air)
- Shocking gasp (1d8 lightning damage to an enemy, target must roll 8DC constitution save or get paralyzed for 2 turns) (consume: MP, air; produce: chaos)
Focus on dealing damage on melee range, and have some utility skill.

SKIRMISHER:
- Stealth (Gain stealth, won't be easily targeted) (consume: SP, None; produce: Air)
- Backstab (Deal 1.2 Weapon damage (+Dex Mod) as Pierce Damage (need Dagger) If self is in Stealth, deal 2.5 damage) (consume: SP, Air, None; produce: None)
Melee DPS, Physical class will be lack of cantrip because it relied on auto attack to produce 'None'.

Occultist:
- Get to select one lesser demon familiar
- Demonic Fire (1d6 demonic damage (+Planar Mod)) (cantrip, only consume MP; produce: Chaos)
- Demonic Empowerment (give +2 to pATK and pDEF to a lesser demon familiar for 2 turns also heal for 1d4) (consume: MP, Chaos; produce: Fire)

Soldier:
- shield bash (1.0 weapon damage, (shield) target must roll 8DC endurance save or get stunned for 2 turn) (consume: SP, None; produce: Geo)
- Defensive Stance (add +2 pDEF for 2 turns) (consume: SP, Geo; produce: Fire)

TEMPLAR:
- smite (1.0 weapon damage as angelic damage, target must roll 8DC charisma save or get awed, if target is Devil, Demon, Ghost, Evil, Undeae, deal 2 times damage) (consume: SP, None; produce: Order)
- Bless + 2 save throw for teammates random front row (consume: MP, Order; produce: Air)
- Heal heal 1d8 (+ Vitality Modifier) to ally with lowest health percentage (consume: MP, Air, Order; produce: Water)
almost like cleric, but more offensive, and have a skill that deal more damage to certain type of enemy.
*/

const skillSeed: SkillArchetype[] = [
    // - Demonic Empowerment (give +2 to pATK and pDEF to a lesser demon familiar for 2 turns also heal for 1d4) (consume: MP, Chaos; produce: Fire)
    new SkillArchetype({
        id: SkillEnum.skill_demonic_empowerment,
        name: 'เพาะพลังปีศาจ',
        baseDescription: 'เพิ่มค่าพลังโจมตีและค่าป้องกันให้กับปีศาจที่อัญเชิญมาเป็นเวลา 2 เทิร์น และรักษาความเสียหาย 1d4',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({}),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Ally,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.IsSummoned,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.HealAndBuff,
                        damageDiceBase: [DiceEnum.OneD4],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0,0,0,0,0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.none]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.none]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.demonic_empowerment],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2,2,2,2,2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [1,1,1,0,0],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [1,1,1,0,0]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0,1], [0,1], [0,1], [0,1], [1,1]]
                })
            ]
        }),
        tier: Tier.common,
        isSpell: true
    }),

    // - Arcane Sword (1.0 weapon damage as Arcane Damage, change Modifier to Planar) (Need Sword) (consume: SP; produce: None) (cantrip, replace normal attack)
    new SkillArchetype({
        id: SkillEnum.skill_arcane_sword,
        name: 'ดาบเวทย์มนต์',
        baseDescription: 'ห่อหุ้มดาบในมือด้วยพลังเวทย์เพื่อโจมตีเป้าหมาย สร้างความเสียหายเท่ากับ 1.0 ความเสียหายของดาบ และเปลี่ยนแปลงค่าความเสียหายจากค่าความเสียหายของดาบเป็นค่าความเสียหายจากพลังเวทย์ ความเสียหายพิเศษได้รับจากค่า (เวทย์มนต์)',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.sword_bastard,
                WeaponType.sword_broad,
                WeaponType.sword_claymore,
                WeaponType.sword_flamberge,
                WeaponType.sword_great,
                WeaponType.sword_jian,
                WeaponType.sword_long,
                WeaponType.sword_rapier,
                WeaponType.sword_short,
                WeaponType.sword_zweihander,
                WeaponType.blade_broadblade,
                WeaponType.blade_cutlass,
                WeaponType.blade_dao,
                WeaponType.blade_falchion,
                WeaponType.blade_katana,
                WeaponType.blade_khopesh,
                WeaponType.blade_machete,
                WeaponType.blade_randao,
                WeaponType.blade_saber,
                WeaponType.blade_scimitar,
                WeaponType.blade_zhanmadao,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.arcane],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,0,0,0,0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [1,1,1,0,0],
            elements: []
        }),
        produce: new SkillProduce({
            elements: []
        }),
        tier: Tier.common,
        isWeaponAttack: true,
        isSpell: true
    }),

    //- Mage Reflex (add +2 dodge for 2 turns) (consume: Mp, None, produce: Air)
    new SkillArchetype({
        id: SkillEnum.skill_mage_reflex,
        name: 'เวทย์ตอบสนอง',
        baseDescription: 'เพิ่มสถานะ "เวทย์ตอบสนอง" ให้กับตนเป็นเวลา 2 เทิร์น เพิ่มค่าหลบหลีก 2 หน่วย',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({}),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0,0,0,0,0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.none]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.none]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.mage_reflex],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2,2,2,2,2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [3,3,3,3,3],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [3]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[1 ,1], [1 ,1], [1 ,1], [1 ,1], [1 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: false,
        isSpell: true
    }),

    //- Shocking gasp (1d8 lightning damage to an enemy, target must roll 8DC constitution save or get paralyzed for 2 turns) (consume: MP, air; produce: chaos)
    new SkillArchetype({
        id: SkillEnum.skill_shocking_grasp,
        name: 'ฝ่ามือช๊อต',
        baseDescription: 'สร้างความเสียหายสายฟ้า 1d8 แก่เป้าหมาย และมีโอกาสทำให้เป้าหมายถูกทำให้เป็นอัมพาต 2 เทิร์น',
        requirement: new SkillLearningRequirement({}),  
        equipmentNeeded: new SkillEquipmentRequirement({}),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.OneD10],
                        damageType: [DamageTypes.lightning],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,0,0,0,0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.paralyse],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2,2,2,2,2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance,
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: {
                            position: PreferredPositionEnum.FrontToAny,
                            penaltyModifier: 0.7
                        }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [4,4,4,4,4],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[1 ,1], [1 ,1], [1 ,1], [1 ,1], [1 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: false,
        isSpell: true
    }),
    
    // Starry Wisp (1d6 nature damage to all enemies in a row, if stealthed dispel stealth) (consume: MP, None; produce: Geo)
    new SkillArchetype({
        id: SkillEnum.skill_starry_wisp,
        name: 'แส้แสงดาว',
        baseDescription: 'ฟาดแส้แห่งแสงออกไป ซึ่งจะระเบิดออกเมื่อกระทบกับเป้าหมาย สร้างความเสียหายธรรมชาติ 1d6 แก่เป้าหมายทั้งแถวและคลายสถานะล่องหน',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({}),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.AllFrontRowShiftable,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD10],
                        damageType: [DamageTypes.nature],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,0,0,0,0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            // TODO: Add effect to dispel stealth. Idea is that, when appended, remove all stealth stack, then the append stack also not get increase
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [2,2,1,1,0],
            sp: [0],
            elements: []
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.geo,
                    amountRange: [[1 ,1], [1 ,1], [1 ,1], [1 ,1], [1 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: false,
        isSpell: true
    }),

    //- Entangle (1d8 damage to one enemy Root target for 2 turns) (consume: MP, Geo; produce: Air)
    new SkillArchetype({
        id: SkillEnum.skill_entangle,
        name: 'เถาวัลย์',
        baseDescription: 'สร้างเถาวัลย์เข้ารัดตัวเป้าหมาย ทำความเสียหายธรรมชาติ 1d8 และมีโอกาสทำให้เป้าหมายติดสถานะ"ถูกยึด" 2 เทิร์น',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({}),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.TwoD4],
                        damageType: [DamageTypes.nature],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,0,0,0,0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.entangled],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2,2,3,3,4],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.strength
                                })       
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [2,2,1,1,0],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[1 ,1], [1 ,1], [1 ,1], [1 ,1], [1 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: false,
        isSpell: true
    }),

    new SkillArchetype({
        id: SkillEnum.skill_arcane_bolt,
        name: 'กระสุนเวทย์มนต์',
        baseDescription: 'ยิงกระสุนสร้างจากพลังเวทย์เข้าใส่เป้าหมาย',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({}),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.OneD8, DiceEnum.TwoD6],
                        damageType: [DamageTypes.arcane],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,0,1,1,2],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [2,2,1,1,0],
            sp: [0],
            elements: []
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[1 ,1], [1 ,1], [1 ,1], [1 ,1], [1 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: false,
        isSpell: true
    }),

    new SkillArchetype({
        id: SkillEnum.skill_divine_flame,
        name: 'ไฟศักดิ์สิทธิ์',
        baseDescription: 'สร้างลูกไฟจากพลังงานศักดิ์สิทธิ์และขว้างเข้าใส่เป้าหมายมีโอกาสทำให้ติดสถานะตะลึง',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({}),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.TwoD4],
                        damageType: [DamageTypes.holy],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,0,0,0,2],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.awed],
                                    effectHitBase: [5,5,5,5,7,7,7,7,7,7],
                                    effectHitBonus: [[]],
                                    effectDuration: [2,2,2,2,3,3,3,3,3,3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.willpower
                                })       
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [2,2,1,1,0],
            sp: [0],
            elements: []
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: false,
        isSpell: true
    }),

    new SkillArchetype({
        id: SkillEnum.skill_shield_bash,
        name: 'ฟาดด้วยโล่ห์',
        baseDescription: 'ฟาดเป้าหมายด้วยโล่ห์ สร้างความเสียหายจากตัวโล่ห์และมีโอกาสทำให้เป้าหมายมึนงง',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.shield_buckler, 
                WeaponType.shield_kite, 
                WeaponType.shield_round,
                WeaponType.shield_tower
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.strength, CharacterStatusEnum.shield],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.stun],
                                    effectHitBase: [6,6,6,6,8],
                                    effectHitBonus: [[CharacterStatusEnum.strength]],
                                    effectDuration: [2,2,2,2,3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })       
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [3],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.geo,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    new SkillArchetype({
        id: SkillEnum.skill_power_strike,
        name: 'โจมตีสุดแรง',
        baseDescription: 'โจมตีเป้าหมายสุดแรงสร้างความเสียหาย 1.3 เท่าของอาวุธ (+กล้ามเนื้อ);ที่ขั้น 5 จะสร้างความเสียหาย 1.5 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.sword_bastard,
                WeaponType.sword_broad,
                WeaponType.sword_claymore,
                WeaponType.sword_flamberge,
                WeaponType.sword_great,
                WeaponType.sword_long,
                WeaponType.sword_zweihander,
                WeaponType.axe_broad,
                WeaponType.axe_great,
                WeaponType.axe_shepherd,
                WeaponType.axe_spliitingMaul,
                WeaponType.axe_war,
                WeaponType.mace_club,
                WeaponType.mace_warHammer,
                WeaponType.blade_broadblade,
                WeaponType.blade_cutlass,
                WeaponType.blade_dao,
                WeaponType.blade_khopesh,
                WeaponType.blade_khopesh,
                WeaponType.blade_randao,
                WeaponType.blade_zhanmadao,
                WeaponType.spear_Brandistock,
                WeaponType.spear_dory,
                WeaponType.spear_glaive,
                WeaponType.spear_guisarme,
                WeaponType.spear_halberd,
                WeaponType.spear_partisan,
                WeaponType.spear_trident,
                WeaponType.staff_long,
                WeaponType.staff_quarter
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.strength],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [1.3, 1.3, 1.3, 1.3, 1.5],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_throw_knife = 'skill_throw_knife',
    new SkillArchetype({
        id: SkillEnum.skill_throw_knife,
        name: 'ปามีด',
        baseDescription: 'ปามีดใส่เป้าหมาย สร้างความเสียหายแบบแทงเท่ากับความเสียหาย 1.2 เท่าของอาวุธ (+สมดุลย์) หากปาจาก "ระยะกลาง" จะสร้างความเสียหายมากขึ้น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.dagger_dirk,
                WeaponType.dagger_knife,
                WeaponType.dagger_khukuri,
                WeaponType.dagger_kris,
                WeaponType.dagger_stiletto,
                WeaponType.dagger_rondel,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [1.4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.MiddleRange, penaltyModifier: 0.8}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_poison_coating = 'skill_poison_coating',
    new SkillArchetype({
        id: SkillEnum.skill_poison_coating,
        name: 'เคลือบพิษ',
        baseDescription: 'เคลือบพิษไว้บนอาวุธเป็นเวลา 2 เทิร์น การโจมตีในช่วงเวลานี้จะสร้างความเสียหายพิเศษเพิ่มเติมและสามารถทำให้เป้าหมายติดพิษได้;เมื่อพัฒนาถึงขั้นที่ 5 จะเพิ่มระยะเวลาเป็น 3 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.dagger_dirk,
                WeaponType.dagger_knife,
                WeaponType.dagger_khukuri,
                WeaponType.dagger_kris,
                WeaponType.dagger_stiletto,
                WeaponType.dagger_rondel,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.poisonCoating_1,
                                        BuffsAndDebuffsEnum.poisonCoating_1,
                                        BuffsAndDebuffsEnum.poisonCoating_1,
                                        BuffsAndDebuffsEnum.poisonCoating_1,
                                        BuffsAndDebuffsEnum.poisonCoating_1,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2,2,2,2,3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1,1,1,1,1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common
    }),

    // skill_first_aid = 'skill_first_aid',
    new SkillArchetype({
        id: SkillEnum.skill_first_aid,
        name: 'ปฐมพยาบาล',
        baseDescription: 'ฟื้นฟูพลังชีวิตของตนเล็กน้อย (+ปัญญา)',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Heal,
                        damageDiceBase: [DiceEnum.TwoD4],
                        damageType: [DamageTypes.order],
                        damageModifierStat: [CharacterStatusEnum.intelligence],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [1,1,1,1,1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.geo,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common
    }),
    // skill_double_strike = 'skill_double_strike',
    new SkillArchetype({
        id: SkillEnum.skill_double_strike,
        name: 'โจมตีสองครั้ง',
        baseDescription: 'โจมตีเป้าหมายด้วยอาวุธในมือสองครั้ง;เมื่อพัฒนาถึงขั้นที่ 5 การโจมตีครั้งที่ 2 จะมีโอกาสทำให้เป้าหมายเลือดไหล',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.sword_broad,
                WeaponType.sword_long,
                WeaponType.axe_shepherd,
                WeaponType.mace_club,
                WeaponType.blade_broadblade,
                WeaponType.blade_cutlass,
                WeaponType.blade_dao,
                WeaponType.blade_khopesh,
                WeaponType.dagger_dirk,
                WeaponType.dagger_knife,
                WeaponType.dagger_khukuri,
                WeaponType.dagger_kris,
                WeaponType.dagger_stiletto,
                WeaponType.dagger_rondel,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0,0,1,1,2],
                        damageMultiplier: [0.7, 0.7, 0.7, 0.7, 0.7],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToFront, penaltyModifier: 0.7}
                    }),
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0,1,1,2,2],
                        damageMultiplier: [0.7, 0.7, 0.7, 0.7, 0.7],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [],[],[],[],[
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.bleed],
                                    effectHitBase: [6],
                                    effectHitBonus: [[CharacterStatusEnum.dexterity]],
                                    effectDuration: [2,2,2,2,2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToFront, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1,1,1,1,1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_leap_attack = 'skill_leap_attack',
    new SkillArchetype({
        id: SkillEnum.skill_leap_attack,
        name: 'กระโดดโจมตี',
        baseDescription: 'กระโดดเข้าหาเป้าหมายและโจมตี สร้างความเสียหาย 1.4 เท่าของอาวุธ เมื่อพัฒนาถึงขั้นที่ 5 จะสร้างความเสียหาย 1.8 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.strength],
                        damageModifierBonus: [0,0,1,1,2],
                        damageMultiplier: [1.4, 1.4, 1.4, 1.4, 1.8],
                        hitBase: [-5, -4, -3, -2, -1],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1,1,1,1,1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_spear_thrust = 'skill_spear_thrust',
    new SkillArchetype({
        id: SkillEnum.skill_spear_thrust,
        name: 'แทง',
        baseDescription: 'แทงเป้าหมายด้วยหอกอย่างแม่นยำ สร้างความเสียหายและมีโอกาสทำให้เป้าหมายเลือดไหล',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.spear_Brandistock,
                WeaponType.spear_dory,
                WeaponType.spear_partisan,
                WeaponType.spear_trident,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.strength],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [1.3, 1.3, 1.3, 1.3, 1.3],
                        hitBase: [1,2,3,4,5],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [],[],[],[],[
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.bleed],
                                    effectHitBase: [6],
                                    effectHitBonus: [[CharacterStatusEnum.dexterity]],
                                    effectDuration: [3,3,3,3,3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_cleave = 'skill_cleave',
    new SkillArchetype({
        id: SkillEnum.skill_cleave,
        name: 'ฟันกวาด',
        baseDescription: 'ฟันกวาดอาวุธในมือโจมตีหลายเป้าหมายในแถวหน้า สร้างความเสียหาย 0.8 เท่าของอาวุธ (+กล้ามเนื้อ);เมื่อพัฒนาถึงขั้น 5 จะสร้างความเสียหาย 1 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.sword_claymore,
                WeaponType.sword_great,
                WeaponType.sword_zweihander,
                WeaponType.axe_great,
                WeaponType.axe_spliitingMaul,
                WeaponType.axe_war,
                WeaponType.blade_randao,
                WeaponType.blade_zhanmadao,
                WeaponType.spear_glaive,
                WeaponType.spear_halberd
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.AllFrontRowShiftable,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.strength],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [0.8, 0.8, 0.8, 0.8, 1],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_berserker_rage = 'skill_berserker_rage',
    new SkillArchetype({
        id: SkillEnum.skill_berserker_rage,
        name: 'คลั่ง',
        baseDescription: 'เข้าสู่สถานะบ้าคลั่งเป็นเวลา 3 เทิร์น เพ่ิมพลังโจมตีกายภาพ ลดพลังป้องกันกายภาพและเวทย์มนต์ของตนลง;เมื่อพัฒนาถึงขั้น 5 ทั้งผลแง่บวกและลบจะรุนแรงขึ้น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.berserkerRage_1,
                                        BuffsAndDebuffsEnum.berserkerRage_1,
                                        BuffsAndDebuffsEnum.berserkerRage_1,
                                        BuffsAndDebuffsEnum.berserkerRage_1,
                                        BuffsAndDebuffsEnum.berserkerRage_2,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [3, 3, 3, 3, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),

    // skill_power_shot = 'skill_power_shot',
    new SkillArchetype({
        id: SkillEnum.skill_power_shot,
        name: 'ยิงแรง',
        baseDescription: 'ยิงเป้าหมายด้วยความรุนแรง สร้างความเสียหายจากอาวุธ 1.2 เท่า',        
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.bow_long,
                WeaponType.bow_short,
                WeaponType.bow_compound,
                WeaponType.bow_recurve,
                WeaponType.bow_cross
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [1.2, 1.2, 1.2, 1.2, 1.2],
                        hitBase: [2],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_double_strafe = 'skill_double_strafe',
    new SkillArchetype({
        id: SkillEnum.skill_double_strafe,
        name: 'ยิงสองครั้ง',
        baseDescription: 'ยองเป้าหมายสองครั้ง แต่ละครั้งสร้างความเสียหาย 0.4 เท่าของอาวุธ การโจมตีครั้งที่ 1 ได้รับโอกาสคริติคอล +1 การ โจมตีครั้งที่สอง +2;เมื่อพัฒนาถึงขั้น 5 ความเสียหายเพิ่มขึ้นเป็นนัดละ 0.5 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.bow_long,
                WeaponType.bow_short,
                WeaponType.bow_compound,
                WeaponType.bow_recurve,
                WeaponType.bow_cross
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.5],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [1],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7}
                    }),
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.5],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [2],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // skill_aimed_attack = 'skill_aimed_attack',
    new SkillArchetype({
        id: SkillEnum.skill_aimed_attack,
        name: 'เล็งยิง',
        baseDescription: 'เล็งโจมตีเป้าหมายที่เหลือพลังชีวิตต่ำที่สุด สร้างความเสียหาย 0.8 เท่าของอาวุธ;เมื่อพัฒนาถึงขั้นที่ 5 จะสร้างความเสียหาย 1 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.bow_long,
                WeaponType.bow_short,
                WeaponType.bow_compound,
                WeaponType.bow_recurve,
                WeaponType.bow_cross
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.LowestHP,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0],
                        damageMultiplier: [0.8, 0.8, 0.8, 0.8, 1],
                        hitBase: [4, 4, 5, 5, 6],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [2],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7}
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0 ,1], [0 ,1], [0 ,1], [0 ,1], [0 ,1]]
                })
            ]
        }),
        tier: Tier.common,
        isWeaponAttack: true
    }),

    // MARK: Magic/Planar
    // arcane
    // skill_magic_missile = 'skill_magic_missile',
    new SkillArchetype({
        id: SkillEnum.skill_magic_missile,
        name: 'กระสุนเวทย์มนต์',
        baseDescription: 'ยิงกระสุนเวทย์มนต์ 3 ลูก ไปยังหลายเป้าหมายแบบสุ่ม แต่ละลูกสร้างความเสียหาย 0.4 เท่าของความเสียหายเวทย์มนต์ในอาวุธ;เมื่อพัฒนาถึงขั้นที่ 5 ความเสียหายจะเพิ่มขึ้นเป็น 0.6 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                // 1st missile
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Magical],
                        damageType: [DamageTypes.magical],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.6],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7}
                    }),
                ]
            ),
            // 2nd missile
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Magical],
                        damageType: [DamageTypes.magical],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.6],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7}
                    }),
                ]
            ),
            // 3rd missile
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Magical],
                        damageType: [DamageTypes.magical],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.6],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7}
                    }),
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [5],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                }),
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // skill_mana_shield = 'skill_mana_shield',
    new SkillArchetype({
        id: SkillEnum.skill_mana_shield,
        name: 'โล่ห์เวทย์มนต์',
        baseDescription: 'สร้างโล่ห์เวทย์มนต์ขึ้นรอบตัว สามารถดูดซับความเสียหายที่ได้รับได้ ความเสียหายที่โล่ห์สามารถดูดซับได้ขึ้นอยู่กับจำนวนชั้นของวิชาและค่า(เวทย์มนต์)',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.manaShield,
                                        BuffsAndDebuffsEnum.manaShield,
                                        BuffsAndDebuffsEnum.manaShield,
                                        BuffsAndDebuffsEnum.manaShield,
                                        BuffsAndDebuffsEnum.manaShield,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [12, 16, 20, 26, 36],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                    effectDurationBonus: [CharacterStatusEnum.planar],
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // order
    // skill_heal = 'skill_heal',
    new SkillArchetype({
        id: SkillEnum.skill_heal,
        name: 'เวทย์รักษา',
        baseDescription: 'ร่ายเวทย์มนต์สำหรับรักษา ฟื้นฟูพลังชีวิตให้เพื่อนร่วมทีมที่มีพลังชีวิตต่ำที่สุด 2d6 (+สเน่ห์)',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Ally,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.LowestHP,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Heal,
                        damageDiceBase: [DiceEnum.OneD8],
                        damageType: [DamageTypes.order],
                        damageModifierStat: [CharacterStatusEnum.planar, CharacterStatusEnum.willpower],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [3],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.water,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // skill_bless = 'skill_bless',
    new SkillArchetype({
        id: SkillEnum.skill_bless,
        name: 'อวยพร',
        baseDescription: 'อวยพรเพื่อนร่วมทีม 1 คนเป็นเวลา 3  เทิร์น;เมื่อพัฒนาถึงขั้น 5 จะเพิ่มระยะเวลาเป็น 4 เทิร์น;ตัวละครที่ได้รับการอวยพรจะได้รับ 1d4 ทุกครั้งที่มีการทอย Save Roll',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Ally,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.bless],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [3, 3, 3, 3, 4],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [5],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // chaos
    // skill_eldritch_blast = 'skill_eldritch_blast',
    new SkillArchetype({
        id: SkillEnum.skill_eldritch_blast,
        name: 'ลำแสงเอลดริช',
        baseDescription: 'ยิงลำแสงโกลาหลจากต่างมิติสร้างความเสียหายโกลาหล 2d4 ใส่เป้าหมาย (+เวทย์มนต์)',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.TwoD4, DiceEnum.TwoD4, DiceEnum.TwoD4, DiceEnum.TwoD4, DiceEnum.ThreeD4],
                        damageType: [DamageTypes.chaos],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [1,2,3,4,5],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [3,3,2,2,1],
            sp: [0],
            elements: [ ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // skill_curse = 'skill_curse',
    new SkillArchetype({
        id: SkillEnum.skill_curse,
        name: 'สาป',
        baseDescription: 'ใช้คำสาปใส่เป้าหมาย ทำให้ติดสถานะ "ถูกสาป" เป็นเวลา 2 เทิร์น;สถานะถูกสาปจะทำให้ Save Roll ทุกครั้งของเป้าหมาย ผลลัพทธ์ -2;เมื่อพัฒนาถึงระดับ 5 ระยะเวลาจะเพิ่มขึ้นเป็น 3 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Debuff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.cursed],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [0, 0, 0, 0, 0]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // skill_chill_touch = 'skill_chill_touch',
    new SkillArchetype({
        id: SkillEnum.skill_chill_touch,
        name: 'สัมผัสเยือก',
        baseDescription: 'เรียกพลังจากโลกแห่งความตายมาสัมผัสเป้าหมายทำให้เย็กยะเยือกสร้างความเสียหาย 1d6 ใส่เป้าหมาย (+เวทย์มนต์) เป้าหมายมีโอกาสเล็กน้อยจะถูกทำให้ช้าลง',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.OneD6,DiceEnum.OneD6,DiceEnum.OneD6,DiceEnum.OneD6,DiceEnum.OneD10],
                        damageType: [DamageTypes.chaos],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [1,2,3,4,5],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [3,3,3,3,3],
            sp: [0],
            elements: [ 
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.water,
                    amountRange: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),


    // geo
    // skill_rock_throw = 'skill_rock_throw',
    new SkillArchetype({
        id: SkillEnum.skill_rock_throw,
        name: 'ปาหิน',
        baseDescription: 'ใช้เวทย์มนตร์สร้างก้อนหินขึ้นและขว้างเข้าใส่เป้าหมาย สร้างความเสียหายทุบ 1d8 (+กล้ามเนื้อ, +เวทย์มนต์)',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.OneD8],
                        damageType: [DamageTypes.blunt],
                        damageModifierStat: [CharacterStatusEnum.strength, CharacterStatusEnum.planar],
                        damageModifierBonus: [1, 2, 3, 4, 5],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [0, 0, 0, 0, 0]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.geo,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),

    // water
    // skill_water_beam = 'skill_water_beam',
    new SkillArchetype({
        id: SkillEnum.skill_water_beam,
        name: 'กระสุนวารี',
        baseDescription: 'ยิงกระสุนน้ำเข้าใส่เป้าหมาย สร้างความเสียหายธาตุน้ำ 2d3 และเพิ่ม "เปียกโชก" เป็นเวลา 2 เทิร์น;เมื่อพัฒนาถึงขั้น 5 "เปียกโชก" จะเพิ่มเป็น 3 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD3],
                        damageType: [DamageTypes.water],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.soaked],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [5],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.water,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // air
    // skill_air_blade = 'skill_air_blade',
    new SkillArchetype({
        id: SkillEnum.skill_air_blade,
        name: 'คลื่นลมบาด',
        baseDescription: 'ยิงใบมีดสายลมใส่เป้าหมาย สร้างความเสียหายลม 2d4 และมีโอกาสทำให้เกิดสถานะ"เลือดไหล"',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD4],
                        damageType: [DamageTypes.air],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,1,2,3,4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.bleed],
                                    effectHitBase: [0,0,1,2,3],
                                    effectHitBonus: [[CharacterStatusEnum.dexterity]],
                                    effectDuration: [2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [5],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // fire
    // skill_burning_hand = 'skill_burning_hand',
    new SkillArchetype({
        id: SkillEnum.skill_burning_hand,
        name: 'หัตถ์อัคคี',
        baseDescription: 'สาดเปลวเพลิงเวทย์มนต์ออกจากมือ สร้างความเสียหายธาตุไฟ 2d3 ต่อศัตรูแถวหน้า มีโอกาสทำให้ติดสถานะ "เผาไหม้"',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.AllFrontRowShiftable,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD3],
                        damageType: [DamageTypes.fire],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.burn],
                                    effectHitBase: [1, 1, 1, 1, 2],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [5],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.fire,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // MARK: Internal Energy Skills
    // Internal Energy Skills
    // skill_inner_focus = 'skill_inner_focus',
    new SkillArchetype({
        id: SkillEnum.skill_inner_focus,
        name: 'รวมปราณ',
        baseDescription: 'วิชาพื้นฐานในการรวบรวมลมปราณภายในร่างกาย เข้าสู่สถานะ "รวมปราณ" เพิ่มความแม่นยำ เพิ่มพลังทำลายกายภาพ เพิ่มพลังป้องกันเวทย์มนต์ ลดพลังทำลายเวทย์มนต์เป็นเวลา 3 เทิร์น;เมื่อพัฒนาถึงขั้น 5 จะเพิ่มเป็น 4 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.innerFocus_1,
                                        BuffsAndDebuffsEnum.innerFocus_1,
                                        BuffsAndDebuffsEnum.innerFocus_1,
                                        BuffsAndDebuffsEnum.innerFocus_1,
                                        BuffsAndDebuffsEnum.innerFocus_1,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [3, 3, 3, 3, 4],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                    effectDurationBonus: [CharacterStatusEnum.breath],
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                }),
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ],
            
        }),
        tier: Tier.common
    }),
    // skill_chi_blast = 'skill_chi_blast',
    new SkillArchetype({
        id: SkillEnum.skill_chi_blast,
        name: 'คลื่นปราณ',
        baseDescription: 'โจมตีด้วยคลื่นลมปราณ สร้างความเสียหายกลมกลืน 1d6 (+ลมหายใจ)',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.OneD6],
                        damageType: [DamageTypes.chiHarmony],
                        damageModifierStat: [CharacterStatusEnum.breath],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                }),
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),
    // skill_chi_infused_strike = 'skill_chi_infused_strike',
    new SkillArchetype({
        id: SkillEnum.skill_chi_infused_strike,
        name: 'โจมตีผสานปราณ',
        baseDescription: 'ใช้ลมปราณห่อหุ้มอาวุธและโจมตี สร้างความเสียหายกลมกลืนเท่ากับ 1.2 เท่าความเสียหายของอาวุธ; เมื่อพัฒนาถึงขั้น 5 ความเสียหายเพิ่มเป็น 1.5 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.sword_broad,
                WeaponType.sword_long,
                WeaponType.axe_shepherd,
                WeaponType.mace_club,
                WeaponType.blade_broadblade,
                WeaponType.blade_cutlass,
                WeaponType.blade_dao,
                WeaponType.blade_khopesh,
                WeaponType.dagger_dirk,
                WeaponType.dagger_knife,
                WeaponType.dagger_khukuri,
                WeaponType.dagger_kris,
                WeaponType.dagger_stiletto,
                WeaponType.dagger_rondel,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.chiHarmony],
                        damageModifierStat: [CharacterStatusEnum.breath],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        damageMultiplier: [1.2, 1.2, 1.2, 1.2, 1.5],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                }),
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),
    // skill_chi_circulation = 'skill_chi_circulation', //used for healing, slow healing over time
    // skill_chi_circulation = 'skill_chi_circulation', //used for healing, slow healing over time
    new SkillArchetype({
        id: SkillEnum.skill_chi_circulation,
        name: 'เดินปราณรักษา',
        baseDescription: 'เดินปราณรักษาตนเอง เข้าสู่สถานะ "เดินปราณ" เป็นเวลา 3 เทิร์น ฟื้นฟูพลังชีวิตของตนเล็กน้อยทุก ๆ เทิร์น; เมื่อพัฒนาถึงขั้น 5 จะเป็น 4 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.chiHarmony],
                        damageModifierStat: [CharacterStatusEnum.breath],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.chiCirculation],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [3, 3, 3, 3, 4],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                }),
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),
    // uncommon (max level = 5)
    // physical skills
    // skill_counter_attack = 'skill_counter_attack',
    new SkillArchetype({
        id: SkillEnum.skill_counter_attack,
        name: 'สวนกลับ',
        baseDescription: 'เข้าสู่สถานะ "สวนกลับ" เป็นเวลา 2 เทิร์น ทุกครั้งที่ถูกโจมตีในสถานะนี้จะได้รับสถานะ "สวนกลับ-ทำลาย" 1 ชั้น การโจมตีครั้งต่อไปจะได้รับโบนัสความเสียหาย 0.3 เท่าต่อสถานะ "สวนกลับ-ทำลาย" 1 ชั้น;เมื่อพัฒนาถึงขั้น 5 จะได้รับ สถานะ "สวนกลับ" เพิ่มขึ้นเป็น 3 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.counterAttack_1,
                                        BuffsAndDebuffsEnum.counterAttack_1,
                                        BuffsAndDebuffsEnum.counterAttack_1,
                                        BuffsAndDebuffsEnum.counterAttack_1,
                                        BuffsAndDebuffsEnum.counterAttack_1,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                    effectDurationBonus: [],
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: []
        }),
        tier: Tier.common
    }),

    // skill_taunt = 'skill_taunt',
    new SkillArchetype({
        id: SkillEnum.skill_taunt,
        name: 'ยั่วยุ',
        baseDescription: 'ยั่วยุศัตรู ทำให้ศัตรูหันมาโจมตีตรเองเป็นเป้่าหมายเป็นเวลา 3 เทิร์น',
        requirement: new SkillLearningRequirement({ }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.taunt],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [3, 3, 3, 3, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [2],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.geo,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [1, 2]]
                })
            ]
        }),
        tier: Tier.common
    }),
    // skill_defensive_stance = 'skill_defensive_stance',
    new SkillArchetype({
        id: SkillEnum.skill_defensive_stance,
        name: 'ตั้งรับ',
        baseDescription: 'เข้าสู่สถานะ "ตั้งรับ" เป็นเวลา 3 เทิร์น เพิ่มพลังป้องกันกายภาพและเวทย์มนต์; เมื่อพัฒนาถึงขั้น 5 พลังป้องกันจะเพิ่มขึ้น',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.defensiveStance_1,
                                        BuffsAndDebuffsEnum.defensiveStance_1,
                                        BuffsAndDebuffsEnum.defensiveStance_1,
                                        BuffsAndDebuffsEnum.defensiveStance_1,
                                        BuffsAndDebuffsEnum.defensiveStance_2,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [3, 3, 3, 3, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [3],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),
    // skill_battlecry = 'skill_battlecry',
    new SkillArchetype({
        id: SkillEnum.skill_battlecry,
        name: 'คำรามศึก',
        baseDescription: 'คำรามดังก้อง นำเพื่อนร่วมทีมทั้งหมดเข้าสู่สถานะ "คำรามศึก" เป็นเวลา 2 เทิร์น (+สเน่ห์); เมื่อพัฒนาถึงขั้น 5 ระยะเวลาจะเพิ่มเป็น 3 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Ally,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.battleCry_1,
                                        BuffsAndDebuffsEnum.battleCry_1,
                                        BuffsAndDebuffsEnum.battleCry_1,
                                        BuffsAndDebuffsEnum.battleCry_1,
                                        BuffsAndDebuffsEnum.battleCry_1,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[CharacterStatusEnum.charisma]],
                                    effectDuration: [1, 1, 1, 1, 2],
                                    effectDurationBonus: [CharacterStatusEnum.charisma],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.uncommon
    }),
    // skill_charge = 'skill_charge',
    new SkillArchetype({
        id: SkillEnum.skill_charge,
        name: 'พุ่งปะทะ',
        baseDescription: 'พุ่งเข้าชนเป้าหมาย สร้างความเสียหายแบบทุบ 1d6 (+กล้ามเนื้อ) และมีโอกาสทำให้เป้าหมายมึนงง',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.OneD6],
                        damageType: [DamageTypes.blunt],
                        damageModifierStat: [CharacterStatusEnum.strength],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.stun],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.strength]],
                                    effectDuration: [1, 1, 1, 1, 2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.geo,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.uncommon
    }),
    // skill_roar = 'skill_roar',
    new SkillArchetype({
        id: SkillEnum.skill_roar,
        name: 'คำรามก้อง',
        baseDescription: 'คำรามเสียงก้อง ทำให้ศัตรูทั้งหมดมีโอกาสได้รับสถานะ "หวาดกลัว" โอกาสติดเพิ่มขึ้นตามสเน่ห์และระดับของวิชา',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Debuff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [-4, -3, -2, -1, 0],
                        hitStat: [[CharacterStatusEnum.charisma]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.fear],
                                    effectHitBase: [0],
                                    effectHitBonus: [[CharacterStatusEnum.charisma]],
                                    effectDuration: [2, 2, 2, 2, 2],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                    effectDurationBonus: [CharacterStatusEnum.charisma],
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.uncommon
    }),
    // skill_stealth = 'skill_stealth',
    new SkillArchetype({
        id: SkillEnum.skill_stealth,
        name: 'ซ่อนตัว',
        baseDescription: 'ซ่อนตัวเป็นเวลา 2 เทิร์น ในขณะที่ซ่อนตัวโอกาสตกเป็นเป้าของการโจมตีจะลดลงอย่างมาก;เมื่อพัฒนาถึงระดับ 5 ระยะเวลาซ่อนตัวจะเพิ่มขึ้นเป็น 3 เทิร์น',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.stealth],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [4],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [4, 4, 4, 4, 4]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),
    // skill_backstab = 'skill_backstab',
    new SkillArchetype({
        id: SkillEnum.skill_backstab,
        name: 'แทงข้างหลัง',
        baseDescription: 'แทงโจมตีเป้าหมายจากข้างหลัง สร้างความเสียหาย 1 เท่าของอาวุธใส่ศัตรูที่มีพลังชีวิตต่ำที่สุด หากอยู่ในสถานะ "ซ่อนตัว" จะสร้างความเสียหาย 1.7 เท่าแทน;โอกาสคริติคอลสูงขึ้นตามจำนวนขั้น',
        requirement: new SkillLearningRequirement({ }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.dagger_dirk,
                WeaponType.dagger_knife,
                WeaponType.dagger_khukuri,
                WeaponType.dagger_kris,
                WeaponType.dagger_stiletto,
                WeaponType.dagger_rondel,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.LowestHP,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0,1,2,3,4],
                        damageMultiplier: [1.2, 1.2, 1.2, 1.2, 1.2],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0, 0, 1, 1, 2],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        buffBasedModifier: [
                            {
                                buff: BuffsAndDebuffsEnum.stealth,
                                stackNeeded: 1,
                                value: 1.3
                            }
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [7],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.common
    }),

    // skill_triple_slash = 'skill_triple_slash',
    new SkillArchetype({
        id: SkillEnum.skill_triple_slash,
        name: 'ฟันต่อเนื่อง',
        baseDescription: 'ฟันโจมตีต่อเนื่องสามคร้ังใส่เป้าหมาย แต่ละครั้งสร้างความเสียหาย 0.4 เท่าของอาวุธ;ที่ขั้น 5 การโจมตีแต่ละครั้งจะได้รับโอกาสคริติคอล +1',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.sword_broad,
                WeaponType.sword_long,
                WeaponType.axe_shepherd,
                WeaponType.mace_club,
                WeaponType.blade_broadblade,
                WeaponType.blade_cutlass,
                WeaponType.blade_dao,
                WeaponType.blade_khopesh,
                WeaponType.dagger_dirk,
                WeaponType.dagger_knife,
                WeaponType.dagger_khukuri,
                WeaponType.dagger_kris,
                WeaponType.dagger_stiletto,
                WeaponType.dagger_rondel,
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0, 0, 0, 0, 1],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    }),
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0, 0, 0, 0, 2],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    }),
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.physical],
                        damageModifierStat: [CharacterStatusEnum.dexterity],
                        damageModifierBonus: [0],
                        damageMultiplier: [0.4, 0.4, 0.4, 0.4, 0.4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0, 0, 0, 0, 3],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [10],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.uncommon
    }),
    // skill_caution = 'skill_caution',
    new SkillArchetype({
        id: SkillEnum.skill_caution,
        name: 'ระมัดระวัง',
        baseDescription: 'เข้าสู่สถานะ "ระมัดระวัง" เพิ่มการหลบหลีกเป็นเวลา 2 เทิร์น;เมื่อพัฒนาถึงระดับ 5 ระยะเวลาจะเพิ่มเป็น 3 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [
                                        BuffsAndDebuffsEnum.cautious,
                                        BuffsAndDebuffsEnum.cautious,
                                        BuffsAndDebuffsEnum.cautious,
                                        BuffsAndDebuffsEnum.cautious,
                                        BuffsAndDebuffsEnum.cautious,
                                    ],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.uncommon
    }),
    // magical skills
    // order
    // skill_orderic_blast = `skill_orderic_blast`,
    new SkillArchetype({
        id: SkillEnum.skill_orderic_blast,
        name: 'ระเบิดแสง',
        baseDescription: 'สร้างระเบิดแสง ทำความเสียหายธาตุระเบียบ 2d4 ต่อเป้าหมาย มีโอกาสทำให้ติดสถานะ "ตะลึง"',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD8],
                        damageType: [DamageTypes.order],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,1,2,3,4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.awed],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.willpower
                                })
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // chaos
    // skill_banish = `skill_banish`,
    new SkillArchetype({
        id: SkillEnum.skill_banish,
        name: 'ขับไล่',
        baseDescription: 'สร้างเวทย์มนต์ขับไล่ ความเสียหายโกหาลบ 1d8 ใส่เป้าหมาย หากเป้าหมาย "ถูกอัญเชิญมา" ความเสียหายจะเพิ่มเป็น 2 เท่า',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.TwoD8],
                        damageType: [DamageTypes.chaos],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,1,2,3,4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        buffBasedModifier: [
                            {
                                buff: BuffsAndDebuffsEnum.isSummoned,
                                stackNeeded: 1,
                                value: 2
                            }
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // geo
    // skill_stone_skin = `skill_stone_skin`,
    new SkillArchetype({
        id: SkillEnum.skill_stone_skin,
        name: 'กายศิลา',
        baseDescription: 'สร้างเกราะหินห่อหุ้มร่างกายเป็นเวลา 2 เทิร์น (+เวทย์มนต์)',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.stoneSkin],
                                    effectHitBase: [0],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [2, 2, 2, 2, 2],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                    effectDurationBonus: [CharacterStatusEnum.planar],
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [10, 10, 10, 10, 5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [2, 2, 2, 2, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // skill_earth_spike = `skill_earth_spike`,
    new SkillArchetype({
        id: SkillEnum.skill_earth_spike,
        name: 'หนามแผ่นดิน',
        baseDescription: 'สร้างความเสียหายแทง 2d4 ใส่่เป้าหมายและมีโอกาสทำให้ติดสถานะ "เลือดไหล";เมื่อพัฒนาถึงขั้น 5 ความเสียหายเพิ่มเป็น 3d3 แทน',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [
                            DiceEnum.TwoD4,
                            DiceEnum.TwoD4,
                            DiceEnum.TwoD4,
                            DiceEnum.TwoD4,  
                            DiceEnum.ThreeD3
                        ],
                        damageType: [DamageTypes.pierce],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,1,2,3,4],
                        hitBase: [2],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.bleed],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.dexterity]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance,
                                    
                                })
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [10],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // water
    // skill_drown = `skill_drown`,
    new SkillArchetype({
        id: SkillEnum.skill_drown,
        name: 'น้ำหลาก',
        baseDescription: 'สร้างคลื่นน้ำท่วมใส่ศัตรูทั้งหมดก่อความเสียหายน้ำ 2d3 และมีโอกาสทำให้ติด "เปียกโชก";เมื่อพัฒนาถึงขั้น 5 ศัตรูจะได้รับสถานะ "เปียกโชก" อย่างแน่นอน',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD3],
                        damageType: [DamageTypes.water],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false, false, false, false, true],
                                    effectName: [BuffsAndDebuffsEnum.soaked],
                                    effectHitBase: [0, 0, 0, 0, 0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.water,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // air
    // skill_storm_blast = `skill_storm_blast`,
    new SkillArchetype({
        id: SkillEnum.skill_storm_blast,
        name: 'ลมคลั่ง',
        baseDescription: 'โจมตีศัตรูทั้งหมดด้วยสายลมคลุ่มคลั่งสร้างความเสียหายลม 2d4 และมีโอกาสทำให้ติดสถานะ "เลือดไหล";เมืิ่อพัฒนาถึงขั้น 5 ความเสียหายจะเปลี่ยนเป็น 2d5 แทน',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [
                            DiceEnum.TwoD4,
                            DiceEnum.TwoD4,
                            DiceEnum.TwoD4,
                            DiceEnum.TwoD4,
                            DiceEnum.TwoD5
                        ],
                        damageType: [DamageTypes.air],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.bleed],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.dexterity]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // fire
    // skill_fire_ball = `skill_fire_ball`,
    new SkillArchetype({
        id: SkillEnum.skill_fire_ball,
        name: 'ลูกไฟยักษ์',
        baseDescription: 'โจมตีด้วยลูกบอลไฟขนาดใหญ่สร้างความเสียหายไฟ 1d6 ต่อเป้าหมายทั้งแถว มีโอกาสทำให้ติดสถานะ "เผาไหม้"',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.AllFrontRowShiftable,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.OneD6],
                        damageType: [DamageTypes.fire],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [-3, -3, -2, -1, 0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.burn],
                                    effectHitBase: [-2, -2, -2, -2, -2],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [2, 2, 2, 2, 2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [5,5,5,5,3],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.fire,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // ice = "ice",
    // skill_ice_nova = `skill_ice_nova`,
    new SkillArchetype({
        id: SkillEnum.skill_ice_nova,
        name: 'คลื่นเยือก',
        baseDescription: 'ปล่อยคลื่นความเย็นออกมารอบตัวสร้างความเสียหายน้ำแข็ง 2d3 ใส่ศัตรูรอบ ๆ และมีโอกาสมากที่จะทำให้ติดสถานะ "เยือกแข็ง"',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD3],
                        damageType: [DamageTypes.ice],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.freeze],
                                    effectHitBase: [6, 6, 6, 6, 8],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.water,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // spirit = "spirit",
    // skill_spirit_sword = `skill_spirit_sword`,
    new SkillArchetype({
        id: SkillEnum.skill_spirit_sword,
        name: 'กระบี่วิญญาณ',
        baseDescription: `คลุมกระบี่ในมือด้วยเวทย์วิญญาณ สร้างความเสียหายวิญญาณเท่ากับพลังโจมตีของกระบี่ (+เวทย์มนต์)`,
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.sword_bastard,
                WeaponType.sword_broad,
                WeaponType.sword_claymore,
                WeaponType.sword_flamberge,
                WeaponType.sword_great,
                WeaponType.sword_long,
                WeaponType.sword_zweihander,
                WeaponType.sword_jian,
                WeaponType.sword_rapier,
                WeaponType.sword_short
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.spirit],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [1, 1, 2, 2, 3],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [4],
            sp: [4],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [0, 0, 0, 0, 0]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.air,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                }),
                new ElementProduce({
                    element: FundamentalElementTypes.water,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // lightning = "lightning",
    // skill_lightning_bolt = 'skill_lightning_bolt',
    new SkillArchetype({
        id: SkillEnum.skill_lightning_bolt,
        name: 'สายฟ้าฟาด',
        baseDescription: 'เรียกสายฟ้าฟาด สร้างความเสียหายสายฟ้า 2d5 กับเป้าหมาย หากเป้าหมายอยู่ในสถานะ "เปียกโชก" ความเสียหายจะเพิ่มขึ้นเป็น 2 เท่า;เมื่อพัฒนาถึงขั้นที่ 5 จะมีโอกาสทำให้เป้าหมาย "มึนงง" เป็นเวลา 2 วินาที',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD5],
                        damageType: [DamageTypes.lightning],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [], [], [], [], [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.stun],
                                    effectHitBase: [2],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        buffBasedModifier: [
                            {
                                buff: BuffsAndDebuffsEnum.soaked,
                                stackNeeded: 1,
                                value: 2
                            }
                        ]
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // demonic = "demonic",
    // skill_demonic_fire = 'skill_demonic_fire',
    new SkillArchetype({
        id: SkillEnum.skill_demonic_fire,
        name: 'เพลิงปีศาจ',
        baseDescription: 'สร้างความเสียหายปีศาจ 1d6 ต่อเป้าหมาย',
        requirement: new SkillLearningRequirement({ }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD6, DiceEnum.OneD10],
                        damageType: [DamageTypes.demonic],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1 ,2, 3, 4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: []
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [2,2,2,2,1],
            sp: [0],
            elements: []
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.chaos,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),
    // metal = "metal",
    // skill_steel_spear = 'skill_steel_spear',
    new SkillArchetype({
        id: SkillEnum.skill_steel_spear,
        name: 'เวทย์มนต์หอกเหล็ก',
        baseDescription: 'สร้างหอกโลหะด้วยเวทย์มนต์และส่งพุ่งไปแทงเป้าหมาย สร้างความเสียหายแทง 2d4 และมีโอกาสทำให้เลือดไหล',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.TwoD4],
                        damageType: [DamageTypes.pierce],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.bleed],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.dexterity]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.fire,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // angelic = "angelic",
    // skill_divine_light = 'skill_divine_light',
    new SkillArchetype({
        id: SkillEnum.skill_divine_light,
        name: 'แสงเทวะ',
        baseDescription: 'ฟื้นฟูพลังชีวิตของเพื่อนร่วมทีมทั้งหมด 1d6 และให้สถานะ "อวยพร"',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Ally,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.HealAndBuff,
                        damageDiceBase: [DiceEnum.OneD6],
                        damageType: [DamageTypes.order],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.bless],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // human = "nature",
    // skill_rejuvenate = 'skill_rejuvenate',
    new SkillArchetype({
        id: SkillEnum.skill_rejuvenate,
        name: 'เจริญงอกงาม',
        baseDescription: 'เพิ่มสถานะ "เจริญงอกงาม" ให้กับเพื่อนร่วมทีมทั้งหมด 1 เทิร์น หากมีสถานะ"เจริญงอกงาม" เมื่อเข้าสู่เทิร์นจะฟื้นฟูพลังชีวิต 1d6 (+สุขภาพ)',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Ally,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.LowestHP,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.order],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.rejuvenate],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [1, 1, 1, 1, 2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [5],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.common
    }),

    // life = "life",
    // skill_cleanse = 'skill_cleanse',
    new SkillArchetype({
        id: SkillEnum.skill_cleanse,
        name: 'ชำระ',
        baseDescription: 'เพิ่มสถานะ "ชำระ" ให้เพื่อนร่วมทีมทั้งหมด ตัวละครที่มีสถานะ "ชำระ" เมื่อเข้าสู่เทิร์นจะขจัดสถานะที่ไม่เป็นประโยชน์จำนวนมากออก',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Ally,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.cleanse],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [1, 1, 1, 1, 1],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.water,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // dark = "dark",
    // skill_dark = 'skill_dark',
    new SkillArchetype({
        id: SkillEnum.skill_dark,
        name: 'ความมืด',
        baseDescription: 'ทำให้ศัตรูทั้งหมดถูกสถานะ "ตาบอด"',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Debuff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.blind],
                                    effectHitBase: [0, 0, 0, 0, 4],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 2],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.water,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // ghost = "ghost",
    // skill_ghastly_touch = 'skill_ghastly_touch',
    new SkillArchetype({
        id: SkillEnum.skill_ghastly_touch,
        name: 'สัมผัสวิญญาณ',
        baseDescription: 'สร้างความเสียหายภูติผี 3d2 ใส่หนึ่งเป้าหมาย;มีโอกาสทำให้เกิด"เผาไหม้"และมีโอกาสทำให้เกิด"เยือกแข็ง"อย่างละ 3 เทิร์น;เมื่อพัฒนาถึงระดับ 5 เอฟเฟคทั้งสองจะเพิ่มระยะเวลาเป็น 4 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.ThreeD2],
                        damageType: [DamageTypes.necrotic],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,1,2,3,4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.burn],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [3, 3, 3, 3, 4],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                }),
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.freeze],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [3, 3, 3, 3, 4],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.fire,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // poison = "poison",
    // skill_miasma = 'skill_miasma',
    new SkillArchetype({
        id: SkillEnum.skill_miasma,
        name: 'หมอกพิษ',
        baseDescription: 'สร้างความเสียหายพิษ 1d4 ต่อศัตรูทั้งหมด มีโอกาสทำให้ถูก "ติดพิษ" เป็นเวลา 4 เทิร์น;เมื่อพัฒนาถึงขั้นที่ 5 ระยะเวลาของพิษจะเพิ่มขึ้นเป็น 5 เทิร์น',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.OneD4],
                        damageType: [DamageTypes.poison],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0,1,2,3,4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.intelligence]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.poison],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.planar]],
                                    effectDuration: [4, 4, 4, 4, 5],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.endurance
                                })
                            ]
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.Range, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [5],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.geo,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // holy = "holy",
    // skill_smite = 'skill_smite',
    new SkillArchetype({
        id: SkillEnum.skill_smite,
        name: 'อาญาสิทธิ์',
        baseDescription: 'โจมตีเป้าหมายด้วยอาวุธ สร้างความเสียหายเทวทูต; หากเป้าหมายเป็นโครงกระดูก, ปีศาจ, มาร หรือ ผีดิบ ความเสียหายจะเพิ่มเป็น 2 เท่า และมีโอกาสเล็กน้อยทำให้อยู่ในสถานะ "ตะลึง";เป้าหมายที่มีสถานะ "ตะลึง" พลังโจมตีจะลดลง',
        requirement: new SkillLearningRequirement({}),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.TauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.DamageAndDebuff,
                        damageDiceBase: [DiceEnum.Weapon_Physical],
                        damageType: [DamageTypes.angelic],
                        damageModifierStat: [CharacterStatusEnum.willpower],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [0],
                        hitStat: [[CharacterStatusEnum.dexterity]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [false],
                                    effectName: [BuffsAndDebuffsEnum.awed],
                                    effectHitBase: [2, 2, 2, 2, 3],
                                    effectHitBonus: [[CharacterStatusEnum.willpower]],
                                    effectDuration: [2, 2, 2, 2, 3],
                                    effectDurationBonus: [],
                                    effectStatForResistance: CharacterStatusEnum.willpower
                                }),
                            ]
                        ],
                        traitBasedModifier: [
                            { trait: TraitEnum.trait_skeleton, modifier: 2 },
                            { trait: TraitEnum.trait_undead, modifier: 2 },
                            { trait: TraitEnum.trait_evil, modifier: 2 },
                            { trait: TraitEnum.trait_demon, modifier: 2 }
                        ],
                        preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [2],
            sp: [2],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.none,
                    amount: [2, 2, 2, 2, 2]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.order,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    // arcane = "arcane",
    // skill_arcane_explosion = `skill_arcane_explosion`,
    new SkillArchetype({
        id: SkillEnum.skill_arcane_explosion,
        name: 'ระเบิดเวทย์มนต์',
        baseDescription: 'สร้างความเสียหายเวทย์มนต์ 1d10 แก่ศัตรูทั้งหมด ความแม่นยำค่อนข้างต่ำ',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 3
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: []
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Enemy,
                    TargetSelectionScope.All,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Negative,
                        subType: SkillActionSubType.Damage,
                        damageDiceBase: [DiceEnum.OneD10],
                        damageType: [DamageTypes.arcane],
                        damageModifierStat: [CharacterStatusEnum.planar],
                        damageModifierBonus: [0, 1, 2, 3, 4],
                        hitBase: [-7, -6, -5, -5, -4],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[CharacterStatusEnum.luck]],
                        applyEffect: [],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [10],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.order,
                    amount: [1, 1, 1, 1, 1]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.chaos,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        isSpell: true,
        tier: Tier.uncommon
    }),
    //rare (max level = 7)
    // skill_iai_slash = 'skill_iai_slash',
    new SkillArchetype({
        id: SkillEnum.skill_iai_slash,
        name: 'อิไอ',
        baseDescription: 'เข้าสู่สถานะ "อิไอ" เป็นเวลา 2 เทิร์น ในสถานะนี้เมื่อถูกโจมตีจะได้รับ "อิไอ-ฟาดฟัน" การโจมตีครั้งต่อไป จะสร้างความเสียหายเพิ่มเติม 0.3 เท่าตามจำนวนของ "อิไอ-ฟาดฟัน" ที่ตนมี และเมื่ออยู่ในสถานะ "อิไอ" จะได้รับพลังป้องกันกายภาพและเวทย์มนต์เพิ่มเติมเป็นพิเศษ',
        requirement: new SkillLearningRequirement({
            preRequireCharacterLevel: 1
        }),
        equipmentNeeded: new SkillEquipmentRequirement({
            weapon: [
                WeaponType.blade_katana
            ]
        }),
        activeEffect: [
            new SkillActiveEffect(
                new TargetType(
                    TargetPartyType.Self,
                    TargetSelectionScope.Single,
                    TargetConditionFilters.None,
                    TargetSortingOptions.None,
                    TargetTauntConsideration.NoTauntCount
                ),
                [
                    new SkillActionObject({
                        type: SkillActionType.Positive,
                        subType: SkillActionSubType.Buff,
                        damageDiceBase: [DiceEnum.None],
                        damageType: [DamageTypes.None],
                        damageModifierStat: [CharacterStatusEnum.none],
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [[]],
                        critBase: [0],
                        critStat: [[]],
                        applyEffect: [
                            [
                                new SkillApplyEffect({
                                    applyWithoutHit: [true],
                                    effectName: [BuffsAndDebuffsEnum.counterAttack_2,],
                                    effectHitBase: [0],
                                    effectHitBonus: [[]],
                                    effectDuration: [2, 2, 2, 2, 3, 3, 4],
                                    effectStatForResistance: CharacterStatusEnum.none,
                                    effectDurationBonus: [CharacterStatusEnum.none],
                                })
                            ]
                        ],
                    })
                ]
            )
        ],
        consume: new SkillConsume({
            hp: [0],
            mp: [0],
            sp: [0],
            elements: [
                new ElementConsume({
                    element: FundamentalElementTypes.water,
                    amount: [2, 2, 2, 2, 2]
                }),
                new ElementConsume({
                    element: FundamentalElementTypes.air,
                    amount: [1, 1, 1, 1, 1]
                })
            ]
        }),
        produce: new SkillProduce({
            elements: [
                new ElementProduce({
                    element: FundamentalElementTypes.none,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        }),
        tier: Tier.rare
    }),

    // Skill Tier Common-Uncommon; max level = 5
    // Skill Tier Rare-Epic; max level = 7
    // Skill Tier Legendary-Unique; max level = 10
    // Skill Tier Divine; max level = 15

    // new SkillArchetype({
    //     id: SkillEnum.skill_laoh_serene_hand_form,
    //     name: 'วิชาฝ่ามือสงบ',
    //     baseDescription: 'วิชาฝ่ามือพื้นฐานของวิหารลาโอห์ จู่โจมนิ่งสงบทว่าแข็งแกร่ง สร้างความเสียหายปราณอุ่น 2d4 (+ลมหายใจ, +กล้ามเนื้อ)',
    //     requirement: new SkillLearningRequirement({
    //         preRequireCharacterLevel: 3
    //     }),
    //     equipmentNeeded: new SkillEquipmentRequirement({
    //         weapon: [WeaponType.bare_hand]
    //     }),
    //     activeEffect: [
    //         new SkillActiveEffect(
    //             new TargetType(
    //                 TargetPartyType.Enemy,
    //                 TargetSelectionScope.Single,
    //                 TargetConditionFilters.None,
    //                 TargetSortingOptions.None,
    //                 TargetTauntConsideration.TauntCount
    //             ),
    //             [
    //                 new SkillActionObject({
    //                     type: SkillActionType.Negative,
    //                     subType: SkillActionSubType.Damage,
    //                     damageDiceBase: [DiceEnum.TwoD4],
    //                     damageType: [DamageTypes.chiWarm],
    //                     damageModifierStat: [CharacterStatusEnum.breath, CharacterStatusEnum.strength],
    //                     damageModifierBonus: [0, 1, 2, 3, 4],
    //                     hitBase: [0],
    //                     hitStat: [[CharacterStatusEnum.dexterity]],
    //                     critBase: [0],
    //                     critStat: [[CharacterStatusEnum.luck]],
    //                     applyEffect: [],
    //                     preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
    //                 })
    //             ]
    //         )
    //     ],
    //     consume: new SkillConsume({
    //         hp: [0],
    //         mp: [0],
    //         sp: [5],
    //         elements: [
    //             new ElementConsume({
    //                 element: FundamentalElementTypes.none,
    //                 amount: [0, 0, 0, 0, 0]
    //             })
    //         ]
    //     }),
    //     produce: new SkillProduce({
    //         elements: [
    //             new ElementProduce({
    //                 element: FundamentalElementTypes.order,
    //                 amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
    //             })
    //         ]
    //     }),
    //     tier: Tier.uncommon
    // }),

    // new SkillArchetype({
    //     id: SkillEnum.skill_laoh_soothing_light,
    //     name: 'แสงสงบ',
    //     baseDescription: 'สร้างแสงสงบที่สามารถรักษาความเสียหาย และมีโอกาสเพิ่มสถานะ "ชำระล้าง" ให้กับเพื่อนร่วมทีม',
    //     requirement: new SkillLearningRequirement({
    //         preRequireCharacterLevel: 3
    //     }),
    //     equipmentNeeded: new SkillEquipmentRequirement({
    //         weapon: []
    //     }),
    //     activeEffect: [
    //         new SkillActiveEffect(
    //             new TargetType(
    //                 TargetPartyType.Ally,
    //                 TargetSelectionScope.All,
    //                 TargetConditionFilters.None,
    //                 TargetSortingOptions.None,
    //                 TargetTauntConsideration.NoTauntCount
    //             ),
    //             [
    //                 new SkillActionObject({
    //                     type: SkillActionType.Positive,
    //                     subType: SkillActionSubType.HealAndBuff,
    //                     damageDiceBase: [DiceEnum.OneD4],
    //                     damageType: [DamageTypes.order],
    //                     damageModifierStat: [CharacterStatusEnum.none],
    //                     damageModifierBonus: [0],
    //                     hitBase: [0],
    //                     hitStat: [[]],
    //                     critBase: [0],
    //                     critStat: [[]],
    //                     applyEffect: [
    //                         [
    //                             new SkillApplyEffect({
    //                                 applyWithoutHit: [true],
    //                                 effectName: [BuffsAndDebuffsEnum.cleanse],
    //                                 effectHitBase: [-4],
    //                                 effectHitBonus: [[]],
    //                                 effectDuration: [2, 2, 2, 2, 3],
    //                                 effectDurationBonus: [],
    //                                 effectStatForResistance: CharacterStatusEnum.none
    //                             }),
    //                         ]
    //                     ],
    //                 })
    //             ]
    //         )
    //     ],
    //     consume: new SkillConsume({
    //         hp: [0],
    //         mp: [5],
    //         sp: [5],
    //         elements: [
    //             new ElementConsume({
    //                 element: FundamentalElementTypes.none,
    //                 amount: [2, 2, 2, 2, 2]
    //             })
    //         ]
    //     }),
    //     produce: new SkillProduce({
    //         elements: [
    //             new ElementProduce({
    //                 element: FundamentalElementTypes.order,
    //                 amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
    //             })
    //         ]
    //     }),
    //     tier: Tier.uncommon,
    //     isSpell: true,
    // }),

    // new SkillArchetype({
    //     id: SkillEnum.skill_arcanist_arcane_missiles,
    //     name: 'กระสุนอาร์เคน',
    //     baseDescription: 'เป็นเวทย์มนต์พื้นฐานของนักเวทย์ในวิทยาลัยมนตรา ยิงกระสุนเวทมนต์ 3 ลูก ใส่เป้าหมายแบบสุ่ม แต่ละลูกสร้างความเสียหายอาร์เคน 2d4',
    //     requirement: new SkillLearningRequirement({
    //         preRequireCharacterLevel: 3
    //     }),
    //     equipmentNeeded: new SkillEquipmentRequirement({
    //         weapon: [WeaponType.staff_magic, WeaponType.wand_magic, WeaponType.orb, WeaponType.tome_codex, WeaponType.tome_bible, WeaponType.tome_grimoire]
    //     }),
    //     activeEffect: [
    //         new SkillActiveEffect(
    //             new TargetType(
    //                 TargetPartyType.Enemy,
    //                 TargetSelectionScope.Single,
    //                 TargetConditionFilters.None,
    //                 TargetSortingOptions.None,
    //                 TargetTauntConsideration.TauntCount
    //             ),
    //             [
    //                 new SkillActionObject({
    //                     type: SkillActionType.Negative,
    //                     subType: SkillActionSubType.Damage,
    //                     damageDiceBase: [DiceEnum.TwoD4],
    //                     damageType: [DamageTypes.arcane],
    //                     damageModifierStat: [],
    //                     damageModifierBonus: [],
    //                     hitBase: [0],
    //                     hitStat: [[]],
    //                     critBase: [0],
    //                     critStat: [[]],
    //                     applyEffect: [],
    //                 }),
    //                 new SkillActionObject({
    //                     type: SkillActionType.Negative,
    //                     subType: SkillActionSubType.Damage,
    //                     damageDiceBase: [DiceEnum.TwoD4],
    //                     damageType: [DamageTypes.arcane],
    //                     damageModifierStat: [],
    //                     damageModifierBonus: [],
    //                     hitBase: [0],
    //                     hitStat: [[]],
    //                     critBase: [0],
    //                     critStat: [[]],
    //                     applyEffect: [],
    //                     preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
    //                 }),
    //                 new SkillActionObject({
    //                     type: SkillActionType.Negative,
    //                     subType: SkillActionSubType.Damage,
    //                     damageDiceBase: [DiceEnum.TwoD4],
    //                     damageType: [DamageTypes.arcane],
    //                     damageModifierStat: [],
    //                     damageModifierBonus: [],
    //                     hitBase: [0],
    //                     hitStat: [[]],
    //                     critBase: [0],
    //                     critStat: [[]],
    //                     applyEffect: [],
    //                     preferredPositionDamageModifier: { position: PreferredPositionEnum.FrontToAny, penaltyModifier: 0.7 }
    //                 })
    //             ]
    //         )
    //     ],
    //     consume: new SkillConsume({
    //         hp: [0],
    //         mp: [5],
    //         sp: [0],
    //         elements: [
    //             new ElementConsume({
    //                 element: FundamentalElementTypes.none,
    //                 amount: [0, 0, 0, 0, 0]
    //             })
    //         ]
    //     }),
    //     produce: new SkillProduce({
    //         elements: [
    //             new ElementProduce({
    //                 element: FundamentalElementTypes.order,
    //                 amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
    //             })
    //         ]
    //     }),
    //     tier: Tier.rare,
    //     isSpell: true,
    // })
    
    // MARK: Sect Skills: Skill that can be learned by joining specific sects

    // 10 greate sects
    /*
        Explanation on Magic and Internal Energy
        In this world's setting, there are a particle, magical energy called 'Planar' which is like the source of all things
        Planar came in 6 types, Fire, Water, Air, Earth, Order, and Chaos and can be combine into different elements
        Magic is actually the manipulation of 'External Planar' which is the manipulation of the Planar outside of the body
        Internal Energy is the manipulation of 'Internal Planar' which is the manipulation of the Planar inside of the body
        The difference between Magic and Internal Energy is that Magic is more versatile and can be used for many things, 
        while Internal Energy is more focused and can be used mostly for physical enhancement, healing and some might be able to cast the internal planar out, like a magic but this is a very hard thing to do, might produce a very powerful attack almost like magic.
        
        The more one profound in controlling external planar, the less they can control internal planar and vice versa,
    */

    // Below are the Great Sects, these are big and powerful sects that have a strong presence in the continent.

    // MARK: Laoh Temple
    // Worship the god of Order, Laoh. Have 2 branches, Internal Energy and Order Magic, but wellknown for their Internal Energy skills
    // Resemble Shaolin Temple, in Chinese Wuxia setting, wellknown for their martial arts and healing skills
    // has strong presence in the continent, and also is a main religion in the continent.
    // Laoh's martial arts
     // Laoh's Magic
    // uncommon
    // skill_laoh_soothing_light = 'skill_laoh_soothing_light',
    // rare
    // skill_laoh_laoh_blessing = 'skill_laoh_laoh_blessing',
    // skill_laoh_spear_of_light = 'skill_laoh_spear_of_light',
    // skill_laoh_radiant_shield = 'skill_laoh_radiant_shield',
    // legendary
    // skill_laoh_divine_punishment = 'skill_laoh_divine_punishment',
    /*
        วิหารลาโอห์ แบ่งเป็น 2 สาขาหลัก คือ วิชาพลังภายในและเวทย์ระเบียบ แต่เป็นที่รู้จักมากที่สุดด้วยวิชาพลังภายใน
        สายวิชาพลังภายในแบ่งย่อยเป็นอีก 2 สาย คือสายวิชามังกรเทพและสายวิชาสัพพัญญู

        Uncommon Level:
        วิชาพื้นฐานสายกำลังภายใน:
            - ฝ่ามือสงบ วิชาฝ่ามือพื้นฐานของวิหารลาโอห์ จู่โจมนิ่งสงบทว่าแข็งแกร่ง สร้างความเสียหายปราณอุ่น 2d4 (+ลมหายใจ, +กล้ามเนื้อ)
        วิชาพื้นฐานสายเวทย์ระเบียบ: 
            - แสงสงบ สร้างแสงสงบที่สามารถรักษาความเสียหายและเอฟเฟคต่างๆ ให้กับเพื่อนร่วมทีม

        วิชาสายมังกรเทพ: เน้นเพิ่มพลังทำลาย โจมตีความเสียหายกายภาพผสมกับกำลังภายใน
            - มังกรผลาญธรณี (Rare) โจมตีเป้าหมายความเสียหายกายภาพ 2d4 (+ลมหายใจ, +กล้ามเนื้อ) ทำให้เป้าหมายถูกสถานะ "เผาไหม้" 3 เทิร์น
            - มังกรคำรามเก้าฟ้า (epic) เพิ่มสถานะ "คำรามเก้าฟ้า" ให้ตนเอง 3 เทิร์น เมื่อถูกโจมตี มีโอกาสทำให้เป้าหมายถูกสถานะ "เผาไหม้" 3 เทิร์น
            - ทัณฑ์เทพมังกร (epic) โจมตีเป้าหมายสร้างความเสียหายการภาพ 3d3 (+ลมหายใจ +กล้ามเนื้อ) ทำให้เป้าหมายถูกสถานะ "ทัณฑ์ลาโอห์" 3 เทิร์น
                - ทัณฑ์ลาโอห์: พลังป้องกันทั้งหมด -2; 
            - เทพมังกรผลาญสมุทรเคลื่อนปฐพี (legendary) โจมตีศัตรูแถวหน้าด้วยความเสียหายปราณอุ่น 2d5 (+ลมหายใจ, +กล้ามเนื้อ) เพิ่มสถานะผลาญสมุทรให้ตนเอง 2 เทิร์น เพิ่มสถานะเคลื่อนปฐพีให้ศัตรู 2 เทิร์น
                - ผลาญสมุทร: พลังโจมตีกายภาพ + 2; หากโจมตีใส่เป้าหมายที่มี "เคลื่อนปฐพี" ความเสียหายเพิ่มขึ้น 0.3 เท่า
                - เคลื่อนปฐพี: พลังป้องกันกายภาพ - 2; หากโจมตีเป้าหมายที่มี "ผลาญสมุทร" ความเสียหายลดลง 0.3 เท่า
        วิชาสายสัพพัญญู: เน้นการเสริมพลัง ฟื้นฟู + บัพค่าสถานะ โจมตีความเสียหายกำลังภายใน
            - ปณิธานมหาปราชญ์ (Rare) เพิ่มสถานะ ปณิธานมหานปราชญ์ 3 เทิร์น ได้รับพลังป้องกันภายใน และเวทย์มนต์ เพิ่มขึ้น 2 หน่วย 
            - ทำลายสัจจะพจน์ (Rare) โจมตีเป้าหมายความเสียหายกำลังภายใน 2d4 (+ลมหายใจ) ทำให้เป้าหมายถูกสถานะ "ตะลึง" 3 เทิร์น
            - สัพพัญญูญาณ (epic) ได้รับ จิตสัพพัญญู 3 เทิร์น ฟื้นฟูพลังชีวิต พลังกายและพลังเวทย์มนต์ทุกเทิร์น เพิ่มค่าหลบหลีก 2 หน่วย
            - ฝ่ามือตรัสรู้ (legendary) โจมตีเป้าหมายความเสียหายกำลังภายใน 3d3 (+ลมหายใจ) หากเป้าหมายมีสถานะ "ตะลึง" ความเสียหายเพิ่มขึ้น 0.3 เท่า และหากเป้าหมายมีสถานะ "ตะลึง" ตนจะได้รับ "สัพพัญญู" 1 ชั้น
                - สัพพัญญู: เมื่อเกิดการ Roll Saves และล้มเหลว จะสามารถ Roll ได้ใหม่อีกครั้งโดยใช้ "สัพพัญญู" 1 ชั้น

        วิชาเวทย์ระเบียบ:
            - ระเบิดแสง (uncommon) สร้างความเสียหายเวทย์มนต์ระเบียบ 1d6 แก่ศัตรูหนึ่งเป้าหมาย มีโอกาสทำให้เป้าหมายถูก "ตะลึง" 2 ชั้น
            - แสงสงบ (uncommon) รักษาเพื่อนร่วมทีมทั้งหมด 1d4 และเพิีม "แสงสงบ" ให้กับเพื่อนร่วมทีม 2 เทิร์น
                - แสงสงบ: เมื่อเข้าเทิร์น ตัวละครที่มีแสงสงบมีโอกาสจะขจัดสภาพด้านลบจำนวนมากได้ 1 ครั้ง
            - คำพิพากษา (rare) โจมตีเป้าหมายความเสียหายเวทย์มนต์ระเบียบ 3d2 ทำให้เป้าหมายถูกสถานะ "พิพากษา" 2 เทิร์น
                - พิพากษา: ลดพลังป้องกันเวทย์มนต์ของเป้าหมายลง 2 หน่วย
            - หอกแห่งลาโอห์ (rare) โจมตีเป้าหมายความเสียหายเวทย์มนต์ระเบียบ 3d3 หากเป้าหมายอยู่ในสถานะ "พิพากษา" ความเสียหายเพิ่มขึ้น 0.5 เท่า
            - พรลาโอห์ (epic) เพิ่มสถานะ "พรแห่งลาโอห์" ให้เพื่อนร่วมทีม พลังป้องกันทั้งหมด +2 และฟื้นฟูพลังชีวิตทุกเทิร์น 2d6 หน่วย เป็นเวลา 3 เทิร์น
            - ทัณฑ์สวรรค์ (legendary) สร้างความเสียหาย 3d3 ให้กับศัตรูทั้งหมด พร้อมทำให้ติดสถานะ "ทัณฑ์ลาโอห์" 3 เทิร์น  


Trait Name: Disciplined Breath Control
Description: Years of rigorous training in meditation and internal energy techniques allow practitioners to control their breathing with precision. While defending or performing internal energy techniques, stamina consumption is reduced, and recovery rates are improved.

Trait Name: Focused Restoration
Description: Training in Laoh’s martial and healing arts grants the ability to focus energy on stabilizing oneself. When performing healing actions, gain a minor boost to effectiveness based on internal energy mastery.
    */
    // uncommon
    // skill_laoh_serene_hand_form = 'skill_laoh_serene_hand_form',
    
    // epic
    // skill_laoh_sacred_dragon_palm = 'skill_laoh_sacred_dragon_palm',

    // skill_laoh_heaven_touch = 'skill_laoh_heaven_touch',
    // legendary
    // skill_laoh_laoh_eradicate_mountains = 'skill_laoh_eradicate_mountains',
    // unique
    // skill_laoh_enlighten_palm = 'skill_laoh_enlighten_palm',

    // Laoh's Magic
    // uncommon
    // skill_laoh_soothing_light = 'skill_laoh_soothing_light',
    // rare
    // skill_laoh_laoh_blessing = 'skill_laoh_laoh_blessing',
    // skill_laoh_spear_of_light = 'skill_laoh_spear_of_light',
    // skill_laoh_radiant_shield = 'skill_laoh_radiant_shield',
    // legendary
    // skill_laoh_divine_punishment = 'skill_laoh_divine_punishment',

    // MARK: Arcanis Academia
    // An Arcane school located in Oceantide, seen as the most prestigious school, wellknown for their specialty in Arcane Magic(Using all elements)
    // While magic is something mundane (people outsi of the academy are able to use magic at ease, the reason that Magical Schools stand out is their research and creation of some special spells)
    // There are lots of Magic Schools in the continent, but Arcanis Academy is the most wellknown and prestigious one, only accepting the talented and the rich as their students.

    // unique
    // skill_arcanis_supreme_arcane_torrent = 'skill_arcanis_supreme_arcane_torrent',

    /* 

    Arcanis Academia

Trait Name: Arcane Scholar’s Focus
Description: Intensive study of arcane principles sharpens the mind. While channeling magic, reduce the chance of being interrupted by minor distractions or damage.

Trait Name: Mana Efficiency Protocol
Description: Advanced training in elemental balance improves efficiency in casting. Reduce the mana cost of elemental spells slightly after mastering basic academic rituals.

    Before getting into Arcademia's skills (spells) first let's dive into categories of magic in the realm of GrinnerHumm
    Magic, is how people manipulate planar elements (order, chaos, geo, water, air, and fire) and used them in multiple ways
    Grinner Humm categorized planar manipulation into 6 kinds
    1st. Elemental Magic: using planar in its purest form, mostly usable in terms of offensive magic like fireball etc.
    2nd. Alteration Magic: manipulating planar elements to alter the properties of objects or beings, often used for defensive or utility purposes.
    3rd. Conjuration Magic: summoning objects, creatures, or energies from other planes or creating them from planar elements.
    4th. Illusion Magic: manipulating planar elements to create illusions, deceiving the senses of others.
    5th. Necromantic Magic: This school of magic delves into the manipulation of life and death, often involving the reanimation of the dead, draining life force, and other dark arts. It is considered forbidden and taboo due to its association with death and the unnatural control over life. Practitioners of Necromantic Magic are often shunned and feared, as their powers can disrupt the natural order and bring about great suffering.
    6th. Restoration Magic: This school focuses on healing, purification, and restoration. It aims to counteract the effects of Necromantic Magic and other harmful influences. Despite its noble purpose, Restoration Magic is not widely practiced or researched. Many consider it not worth the time and effort, as its benefits are often seen as less immediate or impactful compared to other forms of magic. As a result, few choose to dedicate themselves to mastering this school.
    */

    /* 
    The Arcanis Academia is wellknown for their specialty in 4 magical schools, Elemental Magic, Alteration Magic, Conjuration Magic, and Illusion Magic; mages from Arcanis Academia are wellknown for their prowess,
    The most notably thing about Arcanis Academia is their presence in political landscape, the Academia building is in the capital city of Oceantide, and the headmaster of the Academia is also the advisor to the King of Oceantide, making the Academia one of the most powerful organization in the kindgom.
    Also, their magical prowess got them a lot of respect from other kingdoms and sects too.
    */

    /*
    Aracanist Academia spells.
    Elemental School
    rare spells
    1. Arcane Missiles: a basic spell of Arcanist Mages that shoot 3 missiles of arcane energy, dealing 2d4 arcane damage random enemies, might attack the same enemy multiple times.
    2. Combustion: a special technique that is hard to acheive which is controlling opposite planar at the same time, (i.e. fire and water) dealing both type of damage to all enemies and has a chance to add drown and burn
    3. Mana Surge: a buff spell that amplify one's own mATK
    epic spells
    1. Arcane Barrage: A common yet unique spells used by Academy's mages, showing their prowess in all planar's elements control, shooting 4 misslies of various element, dealing 3d4 damage to random enemies, each missile deal different type of damage, water, fire, air, and geo.
    2. Arcane Shield: very powerful technique, made Arcanis Academia wellknown around the continent, creating mana shield, absorbing some damage.
    3. Mana Drain: Attack with 2d4 arcane damage and drain 3d4 mana from the target, add to caster's mana.
    legendary spells
    1. Cataclysm: A powerful spell that shoot a huge arcane energy to all enemies, dealing 4d4 arcane damage and has a chance to add burn to all enemies
    2. Arcane Mastery: A buff spell that amplify one's own mATK and mDEF

    Alteration School
    rare spells
    1. Mage Armor: A buff spell that amplify one's own pDEF and mDEF, user must not wear armor to use this spell
    2. Blink: A utility spell that teleport the user to a random position, user must not wear armor to use this spell
    3. Arcane Invisibility: A buff spell that make user invisible, user must not wear armor to use this spell
    4. Stone Skin: A buff spell that amplify one's own pDEF, user must not wear armor to use this spell
    epic spells
    1. Polymorph: A powerful spell, target must roll D8 saves or be transform the target into a sheep, making them unable to attack, user must not wear armor to use this spell    
    2. Haste: A buff spell that amplify one's own speed, user must not wear armor to use this spell
    3. Slow: A debuff spell that slow down the target, user must not wear armor to use this spell
    4. Arcane Shield: very powerful technique, made Arcanis Academia wellknown around the continent, creating mana shield, absorbing some damage.

    Conjuration School
    rare spells
    1. Summon Elemental: Summon a random elemental to fight for the user (Not in battle skill, but might make player able to summon new follower, with fixed skill set)
    2. Blink: A utility spell that teleport the user to a random position, user must not wear armor to use this spell
    epic spells
    1. teleport: A utility spell that teleport the user to a specific location (Not in battle skill, but might make player able to teleport to specific location, should need lots of preparation)
    2. Weapon's Froging Enchantment: A buff spell that amplify one's own weapon's damage. (Not in battle skill, but might make player able to enchant their weapon, should need lots of preparation)
    3. Void Gate: A powerful spell that open a gate to void, dealing 2d4 chaos damage to all enemies, and has a chance to add void debuff to all enemies

    Illusion School
    rare spells
    1. Taunt Illusion: Cast a taunt on one of your ally on the front row, making them the target of the enemies.
    2. Mirror Image: Make a mirror image of one ally, give them dodge + 2 for 2 turns.
    3. Invisibility: Cast invisible on yourself, making you invisible for 2 turns.
    epic spells
    1. Phantasmal Blade: Create a phantasmal blade, dealing 3d4 damage to one enemy, and has a chance to add fear.
    2. Mass Invisibility: Cast invisible on all allies on the back row, making them invisible for 2 turns.
    3. Illusionary Army: Create an illusionary army, dealing 2d4 damage to all enemies, and has a chance to add fear.
    legendary spells
    1. Mind Control: Control one enemy, target must roll d10 saves or being control, making them attack their own allies for 3 turns.
    */


    // MARK: Order of Silver Fist
    // Should be a military sect, doesn't really use fist but military tactics,
    // A main powerhouse in the continent, serving under the Kingdom Cloud Shade, wellknown for their heavy armor and shield, 
    // most of their skilled individual became the knight leaders in Cloud Shade army.
    // Physical
    // uncommon
    // skill_silverFist_formative_charge = 'skill_silverFist_formative_charge', //Upgrade version of Charge
    // rare
    // skill_silverFist_shield_wall = 'skill_silverFist_shield_wall',
    // skill_silverFist_battle_roar = 'skill_silverFist_battle_roar',
    // skill_silverFist_battle_stance = 'skill_silverFist_battle_stance',
    // skill_silverFist_javelin_throw = 'skill_silverFist_javelin_throw',
    // epic
    // skill_silverFist_phalanx_barrage = 'skill_silverFist_phalanx_barrage', //raise one's own shield and attack with spear from defense line, deal huge damage to one enemy

    /* 

    Trait Name: Tactical Discipline
Description: Soldiers trained in the Order learn to maintain formation and composure in battle. When defending with a shield, slightly increase the effectiveness of defense and gain resistance to knockback.

Trait Name: Battle-Hardened Resolve
Description: Rigorous training and field experience under harsh conditions have forged resilience. After taking heavy damage, stamina regeneration increases for a short period.


    Here’s a more unique reimagination of the Order of Silver Fist skills, adding exclusive traits and themes that make them stand out as sect-specific techniques. Each skill blends martial prowess with a sense of military order and unique battlefield control capabilities.

        Order of Silver Fist Skills

        Uncommon Skills

        Hammer of Command
        Strike with an authoritative blow, dealing 2d4 physical damage and marking the target with “Commanded.” Targets with “Commanded” are 10% more likely to be targeted by allies’ attacks for 2 turns.
            •	Skill ID: skill_silver_hammer_of_command
            •	Focus: Tactical marking to influence ally actions.

        Aegis Formation
        Adopt a defensive stance, redirecting 20% of all incoming damage from allies in the same row to the user for 2 turns. Reduces redirected damage by 1.
            •	Skill ID: skill_silver_aegis_formation
            •	Focus: Row-based defense and redirection.

        Shatter Resolve
        A precise strike aimed at the enemy’s spirit, dealing 2d4 physical damage and reducing the target’s critical resistance by 1 for 2 turns.
            •	Skill ID: skill_silver_shatter_resolve
            •	Focus: Weakening enemy critical resistance for allied follow-ups.

        Rare Skills

        Phalanx Breaker
        Charge forward in a straight line, striking all enemies in your path for 3d4 physical damage and disrupting their formation. Pushed enemies lose their next turn if they are moved to a new row.
            •	Skill ID: skill_silver_phalanx_breaker
            •	Focus: Formation disruption and area control.

        Mantle of Discipline
        Summon an aura of unwavering discipline, granting all allies in the same row +1 mDEF and immunity to fear effects for 2 turns.
            •	Skill ID: skill_silver_mantle_of_discipline
            •	Focus: Morale-boosting and fear resistance.

        Judicial Strike
        Channel the authority of the Order into a strike, dealing 3d4 physical damage. If the target is marked with “Commanded,” the damage is doubled.
            •	Skill ID: skill_silver_judicial_strike
            •	Focus: Target synergy with sect-specific mechanics.

        Epic Skills

        Silver Vortex
        Spin in a controlled fury, dealing 4d4 physical damage to all enemies in the front row. Enemies struck lose 1 pDEF for 2 turns.
            •	Skill ID: skill_silver_vortex
            •	Focus: High-damage AoE with defensive debuffs.

        Unbreakable Will
        Become a living bulwark. For 3 turns, reduce all incoming damage by 50%, gain immunity to knockback, and cleanse 1 negative status effect at the start of each turn.
            •	Skill ID: skill_silver_unbreakable_will
            •	Focus: Damage mitigation and resilience.

        Commanding Presence
        Issue a rallying cry, granting all allies +1 movement speed and the “Inspired” buff for 2 turns. “Inspired” allies gain +1 hit chance on their next attack.
            •	Skill ID: skill_silver_commanding_presence
            •	Focus: Group buff and tactical advantages.

        Legendary Skills

        Echelon Assault
        Lead a crushing advance, dealing 5d6 physical damage to all enemies in the front row. Allies in the same row gain “Relentless Assault,” granting them +2 ATK for 2 turns.
            •	Skill ID: skill_silver_echelon_assault
            •	Focus: Devastating AoE with offensive buffs for allies.

        Silver Bastion
        Raise an unbreakable shield wall, granting all allies in the same row +3 pDEF and absorbing 50% of all damage they receive for 2 turns. The user cannot attack during this period.
            •	Skill ID: skill_silver_bastion
            •	Focus: Ultimate defensive ability with shared damage mitigation.

        Edict of Annihilation
        Deliver the Order’s ultimate judgment. Strike a single target for 6d6 physical damage, ignoring 50% of their pDEF. If the target is “Commanded,” apply “Condemned,” reducing their ATK by 3 for 3 turns.
            •	Skill ID: skill_silver_edict_of_annihilation
            •	Focus: High single-target damage with tactical debuffs.

        Unique Traits of Silver Fist Skills

            1.	“Commanded” Mechanic: Introduced as a tactical mark, influencing ally targeting and damage synergy.
            2.	Formation-Based Buffs/Debuffs: Skills that reward tactical positioning and row-based coordination.
            3.	Morale and Resilience: Emphasis on controlling the battlefield with buffs that counter fear and enhance allied resolve.
            4.	Disruption Mechanics: Skills like “Phalanx Breaker” focus on moving and destabilizing enemy formations.

        This approach integrates military discipline and the tactical superiority of the Silver Fist, ensuring their skills feel distinctive and thematic within the game’s world.
    */

    // MARK: Celestial Swords
    // A sect devoted to swordmanship, wellknown for their sword skills, use some internal energy to enhance their body and magic to enhance their sword.
    // Since they used both Internal Energy and Magic, both are not as powerful as other sects, but their sword skills are the best in the continent, with the amplification of internal energy and magic, their sword skills are powerful and versatile.
    // Also welknown for their forging techniques, and facilitate the best forge in the continent.
    // uncommon
    // skill_celestialSword_sword_dance = 'skill_celestialSword_sword_dance', // common Celestial Sword skill, a dance of sword, dealing multiple hits to one enemy
    // rare
    // skill_celestialSword_sword_aura = 'skill_celestialSword_sword_aura', // Enhance one's sword with small external planar, deling extra 'air' damage
    // skill_celestialSword_swift_killing = 'skill_celestialSword_swift_killing', // a powerful sword skill, move fast and deal a critical hit to one enemy nut low accuracy
    // skill_celestialSword_sword_barrage = 'skill_celestialSword_sword_barrage', // a powerful sword skill, dealing multiple hits to one enemy
    // legendary
    // skill_celestialSword_thousand_sword = 'skill_celestialSword_thousand_sword', // a powerful sword skill, dealing multiple hits to all enemies
    /*

    Trait Name: Swordmaster’s Flow
Description: Practitioners of the Celestial Swords develop seamless control of their weapons. After chaining multiple sword skills in a turn, gain a minor increase to attack speed for the next round.

Trait Name: Blade Infusion Expertise
Description: Training in blending internal energy and magical enhancements allows subtle improvements. Skills that augment sword attacks gain an additional minor bonus when a sword is equipped.


    Understood! To make the Celestial Swords skills feel more cohesive and interconnected while maintaining subtlety, I’ll introduce small synergies, thematic patterns, and layered effects. These connections will enhance their sense of mastery without making the design feel forced or overly blunt.
        Refined Celestial Swords Skills

        Uncommon Skills

        Flame Edge
        Imbue your sword with internal fire energy, dealing 2d4 physical damage with an additional 1d4 fire damage to a single target. The flame lingers, granting your next attack +1 fire damage.
            •	Skill ID: skill_celestial_flame_edge
            •	Synergy: Prepares for follow-up attacks, pairing well with other offensive skills.

        Lunar Step
        Perform a swift, precise strike, dealing 2d4 physical damage. After attacking, gain “Celestial Momentum” for 1 turn, increasing speed by 1.
            •	Skill ID: skill_celestial_lunar_step
            •	Synergy: Boosts agility for subsequent actions, ideal for chaining into multi-hit attacks.

        Sword Shield
        Channel your internal energy into a defensive stance, gaining +2 pDEF and +1 mDEF for 2 turns. While active, gain 1 stack of “Resolve” each time you’re attacked.
            •	Skill ID: skill_celestial_sword_shield
            •	Synergy: Sets up a defensive position, synergizing with skills that consume or enhance “Resolve.”

        Rare Skills

        Starfall Slash
        Unleash a descending strike, dealing 3d4 physical damage to a single target. If the target is afflicted by “Burn” or “Momentum,” reduce their hit chance by 1 for 2 turns.
            •	Skill ID: skill_celestial_starfall_slash
            •	Synergy: Amplifies effectiveness when used after Flame Edge or Lunar Step.

        Arcane Blade Dance
        Perform a graceful series of attacks, striking 3 random enemies for 1d6 arcane damage each. Each hit increases your “Momentum” stacks by 1.
            •	Skill ID: skill_celestial_arcane_blade_dance
            •	Synergy: Builds “Momentum” for speed-based combos or follow-up skills.

        Iron Forged Will
        Forge your resolve mid-battle, cleansing 1 negative effect and gaining +2 willpower for 3 turns. Each stack of “Resolve” increases the duration by 1 turn.
            •	Skill ID: skill_celestial_iron_forged_will
            •	Synergy: Works defensively with Sword Shield to extend buffs.

        Epic Skills

        Celestial Wind Slash
        Create a gust of wind with a sweeping strike, dealing 3d6 physical damage to all enemies in the front row. For each “Momentum” stack, reduce the cooldown by 1 turn.
            •	Skill ID: skill_celestial_wind_slash
            •	Synergy: Combines mobility-based skills for more frequent area damage.

        Heavenly Blade Ward
        Summon a magical barrier of floating swords, reducing all incoming damage by 50% and counterattacking melee attacks for 1d4 arcane damage. Counters add “Resolve” stacks.
            •	Skill ID: skill_celestial_heavenly_blade_ward
            •	Synergy: Supports defensive play and fuels “Resolve”-based abilities.

        Soul Edge Surge
        Overload your sword with internal energy, dealing 5d4 physical damage to a single target. Each “Resolve” stack increases the damage by 10%. Consumes all “Resolve.”
            •	Skill ID: skill_celestial_soul_edge_surge
            •	Synergy: Capitalizes on stacks built from defensive and offensive maneuvers.

        Legendary Skills

        Celestial Harmony
        For 3 turns, all sword skills gain +1d4 arcane damage, and every attack adds 1 “Momentum” stack. Gain immunity to stun during this effect.
            •	Skill ID: skill_celestial_celestial_harmony
            •	Synergy: Amplifies both offensive and speed-based strategies.

        Eternal Sword Arc
        Perform a wide arc slash, dealing 6d6 physical damage to all enemies in the front and middle rows. For each “Momentum” stack, gain +1 crit chance.
            •	Skill ID: skill_celestial_eternal_sword_arc
            •	Synergy: Rewards speed-based combos and setup skills.

        Celestial Nova
        Unleash the sect’s ultimate skill, infusing your sword with celestial energy and striking a single target for 8d6 arcane damage. Consumes all “Momentum” stacks, gaining +5% damage per stack consumed.
            •	Skill ID: skill_celestial_celestial_nova
            •	Synergy: Culminates speed and combo play into a devastating finisher.

        How These Skills Interconnect:

            1.	Momentum Mechanic: Skills like Lunar Step and Arcane Blade Dance build “Momentum,” which enhances epic and legendary abilities.
            2.	Resolve Mechanic: Defensive actions such as Sword Shield and Heavenly Blade Ward build “Resolve,” fueling powerful finishers like Soul Edge Surge.
            3.	Combo Play: Many skills gain bonuses when used in sequence or when specific conditions (e.g., “Burn” or “Momentum”) are met.
            4.	Versatile Options: Players can focus on pure offense, balanced defense, or a mix of both, depending on the chosen skills.

        This approach creates a seamless flow between abilities while maintaining the sect’s distinct style and strategy.
    */

    // MARK: Ironclad Bastion
    // A Kinght society, sellsword, and mercenary group, wellknown for their service in the battlefield, use heavy armor and shield, and their skills are mostly physical
    /*
    Ironclad Bastion
        The Ironclad Bastion is not just a mercenary group but an enduring institution built on the creed of unbreakable resilience and camaraderie. Established centuries ago during the wars of unification, the Bastion began as an elite cadre of knights dedicated to protecting the weak and mastering the art of heavy armor combat. Over time, they transitioned into a mercenary group, serving kingdoms and nobles alike, not for riches but for honor and the preservation of their martial legacy.

        Their philosophy is built on the “Iron Creed”: Strength in Unity, Power in Defense. They believe that a warrior’s worth is measured not by how they strike but by how they endure and protect those beside them. Their techniques are the pinnacle of heavy armor and shield combat, focusing on blending offensive strikes with defensive tactics in ways unmatched by any other sect.

        Despite being sellswords, they maintain a strict code of conduct, refusing contracts that would harm innocents or dishonor their creed. While they primarily serve as battlefield mercenaries, they also train those they deem worthy, provided they prove themselves in the Bastion’s infamous endurance trials.

        Unique Skills

        Uncommon Skills
            •	Iron Barrier Surge: Slam your shield into the ground, creating a shockwave that damages enemies in a small radius and reduces their movement for 1 turn.
            •	Reinforced Strike: Combine brute strength with precise timing to deliver a shield-enhanced strike, dealing physical damage while increasing your defense for 2 turns.
            •	Shield-Linked Riposte: A technique honed to perfection; block an enemy’s attack and immediately counter, dealing proportional damage based on the force of the blocked hit.

        Rare Skills
            •	Bulwark Advance: A specialized charge that pushes through enemy lines, dealing damage and shoving enemies aside to create space for allies.
            •	Aegis Rebound: Channel your energy into your shield, launching it like a boomerang to strike multiple enemies before returning to your hand.
            •	Immovable Bastion: Temporarily anchor yourself, becoming immune to forced movement and reducing incoming damage significantly for 3 turns.

        Epic Skills
            •	Ironclad Formation: Inspire nearby allies, granting increased defense and minor stamina regeneration for 3 turns.
            •	Shatterpoint Slam: Execute a shield slam with pinpoint precision, breaking enemy defenses and stunning them for 1 turn.
            •	Retributive Guard: While in a defensive stance, return a portion of damage received to the attacker for the duration.

        Legendary Skills
            •	Enduring Citadel: Become a living fortress, reducing damage for all nearby allies and granting them bonus stamina regeneration for 3 turns.
            •	Hammer of the Bastion: Harness immense power in a single strike, dealing devastating damage to an enemy and causing shockwaves that damage adjacent enemies.

        Traits

        Trait Name: Warden’s Fortitude
        Description: Rigorous endurance training grants an innate ability to recover stamina faster when stationary or defending.

        Trait Name: Shield-Bound Discipline
        Description: Years of honing shield techniques result in enhanced block efficiency and reduced stamina consumption for shield-related skills.

        Trait Name: Defender’s Legacy
        Description: The Bastion’s teachings emphasize protecting others. Slightly increase defense and damage resistance when fighting alongside allies.

        Trait Name: Mercenary’s Grit
        Description: Experienced fighters of the Bastion gain enhanced resistance to exhaustion and debilitating effects like stuns or slows.

        This deeper background and unique skill set emphasize the Ironclad Bastion’s philosophy and techniques, setting them apart from other knightly or military orders. Their focus on endurance, defensive prowess, and battlefield control highlights their role as the ultimate protectors and battlefield tacticians.
    */

    // MARK: Shakir's Veil
    /*
    Shakir’s Veil
        Background
        Shakir’s Veil is a shadowy yet honorable sect hailing from the desert territories of Sandhaven. They are an enigmatic group that walks the fine line between the shadows and the light. Known for their mastery of ranged weapons and stealth tactics, members of Shakir’s Veil uphold a strict code of honor, ensuring their deadly skills are used for justice and protection rather than cruelty or deceit.

        The sect traces its origins to the legendary figure Shakir, a desert warrior-priest who defended his people from invaders through cunning strategies and unmatched skill with the bow. Shakir believed in striking from the shadows not for personal gain but to protect the innocent and uphold the principles of justice. His teachings inspired the foundation of the Veil, which has since evolved into one of the great sects on the continent.

        Shakir’s Veil is highly sought after for their expertise in both reconnaissance and precision strikes, often acting as elite scouts or assassins for kings and noble houses. Despite their stealthy approach, they value loyalty, chivalry, and the pursuit of balance, setting them apart from common assassins or mercenaries.

        Unique Skills

        Uncommon Skills
            •	Silent Draw: A quick, silent shot that deals piercing damage and has a chance to reduce the target’s awareness.
            •	Veiled Steps: Temporarily cloak yourself in shadows, making you harder to detect and increasing dodge chance for 2 turns.
            •	Marked Shot: Focus your aim on a single enemy, marking them and increasing the damage dealt to them by all allies for 2 turns.

        Rare Skills
            •	Phantom Volley: Launch a barrage of arrows at multiple enemies, each arrow dealing moderate damage and having a chance to reduce their hit chance.
            •	Desert Cloak: Create a mirage around yourself, reducing the chance of being targeted by enemies while increasing movement speed.
            •	Piercing Precision: A highly focused shot that bypasses armor, dealing significant damage and ignoring the target’s physical defenses.

        Epic Skills
            •	Whispering Wind Strike: Fire an arrow that travels through multiple enemies in a line, dealing damage and applying a bleeding effect.
            •	Shadow’s Refuge: Enter a heightened state of stealth, becoming untargetable for 1 turn and recovering stamina and health.
            •	Hawk’s Vision: Temporarily enhance your perception, increasing hit chance and allowing you to reveal hidden enemies.

        Legendary Skills
            •	Rain of Shadows: Fire a volley of enchanted arrows into the air, causing them to rain down on all enemies, dealing damage and applying a slow effect.
            •	Shakir’s Resolve: Channel the essence of Shakir himself, greatly increasing damage, dodge chance, and critical hit rate for 3 turns.

        Traits

        Trait Name: Desert Endurance
        Description: Members of Shakir’s Veil are trained to survive the harsh conditions of the desert. Slightly increase stamina regeneration and resistance to fatigue.

        Trait Name: Shadow’s Discipline
        Description: Rigorous training in stealth grants enhanced detection avoidance and reduced stamina consumption for stealth-related skills.

        Trait Name: Hawk’s Focus
        Description: Mastery of ranged combat improves hit chance and increases damage dealt with bows and crossbows.

        Trait Name: Chivalrous Veil
        Description: Despite their stealthy tactics, members adhere to a strict moral code, gaining increased reputation with honorable factions and reduced hostility when engaging neutral parties.

        Shakir’s Veil stands as a testament to the idea that stealth and precision can coexist with honor and chivalry. Their skills and traits highlight their mastery of ranged combat and subtlety, ensuring that every action is deliberate and meaningful on the battlefield.
    */


    // MARK: Embers of Pjhorn
    /*
    Embers of Pjhorn

        Background
        The Embers of Pjhorn is a fiery sect rooted in the worship of Pjhorn, the god of fire, and his embodiment of relentless power and unstoppable determination. Unlike many magic-focused sects, the Embers of Pjhorn blend destructive fire magic with traditional warfare, wearing heavy armor as a mark of resilience and defiance. This unique combination of magic and martial prowess sets them apart from other sects that often prioritize agility or pure magical mastery.

        The sect’s origin is traced back to the Ashen Wars, a time when Pjhorn’s followers defended their lands against invaders by forging a new style of combat. This fusion of armored might and fire magic was born out of necessity, proving that strength and magic could complement each other. Today, the Embers of Pjhorn are known for their unmatched ability to channel devastating magic while enduring the battlefield’s chaos, unyielding like the flames they revere.

        Members of the sect undergo rigorous physical and magical training to mitigate the casting penalties of wearing heavy armor. They view themselves as the vanguard of Pjhorn’s will, embodying the god’s unrelenting spirit and power.

        Unique Skills

        Uncommon Skills
            •	Flaming Strike: Infuse your weapon with fire magic, dealing physical and fire damage to a single target.
            •	Ashen Resilience: Envelop yourself in fiery energy, reducing damage taken and granting partial immunity to burn effects for 2 turns.
            •	Smoldering Wave: Release a wave of smoldering energy, dealing minor fire damage to all nearby enemies and reducing their stamina regeneration.

        Rare Skills
            •	Armor of Embers: Create a fiery shield around yourself, reducing incoming magic damage and dealing minor fire damage to attackers.
            •	Infernal Command: Inspire allies with Pjhorn’s fiery determination, increasing their physical attack and magical power for 2 turns.
            •	Molten Burst: Detonate a surge of molten energy, dealing fire damage to all enemies in a small area and applying a burn effect.

        Epic Skills
            •	Blazing Convergence: Channel fiery energy into your armor, significantly reducing the casting penalties of heavy armor and increasing fire damage for 3 turns.
            •	Pjhorn’s Wrath: Call upon the god’s might to unleash a fiery explosion, dealing massive fire damage to all enemies within range.
            •	Scorched Earth: Cast fire magic to ignite the battlefield, dealing continuous fire damage to all enemies for 3 turns and slowing their movement.

        Legendary Skills
            •	Phoenix Rebirth: Harness the flames of renewal to fully restore health and purge all negative effects, burning all nearby enemies.
            •	Infernal Onslaught: Channel the essence of Pjhorn to unleash a barrage of fire attacks, dealing fire and physical damage to all enemies in rapid succession.

        Traits

        Trait Name: Flameforged Resilience
        Description: Years of training in heavy armor and fire magic reduce casting penalties while wearing armor and increase resistance to fire damage.

        Trait Name: Scorched Determination
        Description: Members are imbued with unyielding willpower, gaining a bonus to vitality and stamina regeneration.

        Trait Name: Pjhorn’s Legacy
        Description: Enhanced proficiency in fire magic increases fire damage output and reduces the cooldown of fire-related skills.

        Trait Name: Ashborn Resolve
        Description: Stepping into the flames of battle strengthens your focus, reducing the chance of interruption while casting spells in armor.

        The Embers of Pjhorn represent the fiery heart of magic and combat fusion, offering unparalleled synergy between fire magic and physical resilience. Their skills and traits embody the flames’ unyielding spirit, ensuring their dominance on the battlefield.
    */

    // MARK: Blue Sky mountain sect
    /*
    Blue Sky Mountain Sect

        Background
        Nestled atop the towering peaks of the Blue Sky Mountains, this sect is renowned for its unparalleled mastery of internal energy cultivation. Unlike other sects that focus on specific applications of internal energy, the Blue Sky Mountain Sect has dedicated itself to a holistic approach, mastering the art of controlling, amplifying, and improvising internal energy for a variety of purposes.

        The sect traces its origins to an ancient hermit, Master Shen Yu, who meditated for decades to understand the flow of energy in the body and the world. His teachings emphasize adaptability, encouraging disciples to mold their internal energy to suit the ever-changing demands of combat, healing, or even defense.

        This flexibility has made the Blue Sky Mountain Sect respected across the continent. Their members are sought after as advisors, healers, and warriors, as their skills can turn the tide of any situation. Training in the sect involves intense meditation, physical conditioning, and unique methods to draw energy from the surrounding environment.

        Unique Skills

        Uncommon Skills
            •	Flowing River Stance: Assume a defensive posture that redirects a portion of incoming damage back to the attacker as internal energy damage.
            •	Rising Wind Palm: Strike with a sudden burst of internal energy, dealing damage and pushing the enemy back.
            •	Energy Infusion: Transfer a portion of your internal energy to an ally, restoring their stamina or health.

        Rare Skills
            •	Cycling Energy Wave: Channel internal energy into a spinning wave, dealing damage to all nearby enemies and boosting your energy regeneration.
            •	Internal Purge: Cleanse your body of negative effects by using internal energy, reducing the duration of debuffs.
            •	Echoing Strike: Deliver a blow that leaves an internal energy resonance, dealing damage over time.

        Epic Skills
            •	Harmonic Resonance: Amplify the internal energy of all allies, increasing their attack power and regeneration for 3 turns.
            •	Shattering Flow: Release a torrent of internal energy, shattering enemy defenses and dealing significant internal energy damage.
            •	Calm Before the Storm: Enter a meditative state, becoming untargetable for 1 turn and significantly boosting your internal energy for the next attack.

        Legendary Skills
            •	Skyfall Impact: Gather internal energy and unleash it in a devastating attack, dealing massive damage to all enemies in a straight line.
            •	Infinite Flow Technique: Temporarily achieve perfect internal energy balance, drastically increasing all stats and nullifying incoming damage for 2 turns.
            •	Blue Sky Harmony: Synchronize with the environment, restoring health and stamina to all allies while amplifying their internal energy control.

        Traits

        Trait Name: Adaptive Energy Flow
        Description: Years of versatile training enhance the user’s ability to adjust internal energy on the fly, increasing its effectiveness for different applications.

        Trait Name: Resonating Aura
        Description: Cultivating internal energy grants an aura that passively boosts energy regeneration for nearby allies.

        Trait Name: Energy Weaver
        Description: Mastery of improvisation allows members to amplify their internal energy for healing, attacking, or defense based on the situation.

        Trait Name: Mountain’s Stillness
        Description: Disciples of the sect gain increased resistance to crowd control effects due to their deep meditative training.

        The Blue Sky Mountain Sect symbolizes adaptability and balance, teaching its disciples to harness internal energy in ways that surpass mere combat. Their diverse skills and traits make them invaluable in any scenario, reflecting the sect’s philosophy of flowing with the currents of life and battle.
    */    

    // MARK: Vorkai Stormcallers
    /* 
    Vorkai Stormcallers

Background
The Vorkai Stormcallers are a prestigious and fearsome circle of mages who command the skies. Perched atop the Stormspire, a jagged peak surrounded by ceaseless storms, they are infamous for their mastery of air and lightning magic. Their reputation as the most destructive mages on the continent surpasses even the scholars of Arcanis Academy, thanks to their relentless focus on harnessing the raw and chaotic forces of nature.

The origins of the Stormcallers lie in the legend of Vorkai, a wandering mage who was said to have stolen a shard of the Storm God’s wrath. From this shard, Vorkai learned to channel unparalleled elemental power, founding the Stormcallers to pass on this volatile and destructive art. The sect’s philosophy revolves around the balance between control and chaos, as their magic can devastate both allies and enemies if not carefully wielded.

Training at the Stormspire is grueling, with initiates forced to endure relentless storms and temper their bodies and minds to withstand the chaotic forces they seek to control. Those who succeed emerge as conduits of the sky’s fury, their power unrivaled on the battlefield.

Unique Skills

Uncommon Skills
	•	Static Shock: Discharge a burst of electricity, dealing damage to a single enemy and lowering their accuracy for 1 turn.
	•	Windstep: Surround yourself with air currents, boosting your speed and evasion for 2 turns.
	•	Arc Lightning: Strike an enemy with a bolt of lightning that arcs to nearby enemies, dealing diminishing damage.

Rare Skills
	•	Gale Barrier: Create a swirling wind shield that reduces incoming damage and deflects projectiles.
	•	Storm Surge: Charge yourself with static energy, boosting your magic attack for the next 3 turns.
	•	Thunderstrike: Summon a lightning bolt to strike a single enemy, dealing heavy lightning damage and stunning them for 1 turn.

Epic Skills
	•	Eye of the Storm: Create a vortex of wind and lightning around yourself, dealing continuous damage to enemies in the area for 3 turns.
	•	Chain Lightning: Unleash a powerful bolt of lightning that chains to multiple enemies, dealing significant damage to each.
	•	Tempest’s Wrath: Summon a raging storm, randomly striking enemies in the battlefield with lightning for 2 turns.

Legendary Skills
	•	Vorkai’s Fury: Summon a colossal lightning storm, dealing massive lightning damage to all enemies and paralyzing them for 1 turn.
	•	Thunderclap: Unleash a devastating wave of sound and lightning, damaging and disorienting all enemies, reducing their stats for 2 turns.
	•	Ascendant Tempest: Elevate yourself into the storm, becoming untargetable for 1 turn and amplifying the next skill’s power drastically.

Traits

Trait Name: Lightning Conduit
Description: Training in the sect enhances the user’s ability to channel electricity, increasing the damage of lightning-based skills and reducing self-damage from overcharged magic.

Trait Name: Windwalker’s Grace
Description: Disciples learn to use air currents to enhance their mobility, boosting evasion and speed during combat.

Trait Name: Tempest Caller
Description: Mastery of air and lightning magic grants increased effectiveness in dealing damage to multiple enemies.

Trait Name: Storm Hardened
Description: Years of exposure to storms increase resistance to elemental damage, particularly air and lightning.

The Vorkai Stormcallers epitomize raw elemental power. Their skills are devastating but require precision and control to avoid collateral damage. The sect’s philosophy of balancing chaos and mastery ensures that only the strongest and most disciplined emerge from their ranks, wielding the storm with terrifying efficiency.
    */

    // MARK: Naor's Embrace
   /* 
    Naor’s Embrace

Background
The Naor’s Embrace sect is revered across the continent as the epitome of healing and support magic. Rooted in the ancient teachings of Naor, the deity of life and renewal, this sect is a haven for those who wish to dedicate themselves to preserving life. Nestled within the tranquil Azure Glade, a lush forest sanctuary, the sect thrives on its philosophy of harmony and balance, teaching its disciples to mend both body and soul.

Unlike other sects, Naor’s Embrace emphasizes compassion over conflict. While its members are capable of defending themselves with their magic, their primary focus is healing wounds, purging ailments, and empowering allies. Their presence is indispensable in major battles, where they turn the tide with their restorative arts. Disciples undergo rigorous training, mastering their craft through years of meditation, study, and practice.

Though widely respected, some see Naor’s Embrace as naïve pacifists. Despite this perception, their influence and importance in warfare, diplomacy, and even everyday life cannot be overstated.

Unique Skills

Uncommon Skills
	•	Soothing Touch: Heal a single ally for a moderate amount and cleanse one negative effect.
	•	Restorative Aura: Create a zone of healing around the user, restoring health to nearby allies over 2 turns.
	•	Blessing of Vitality: Temporarily increase an ally’s maximum health and boost their regeneration.

Rare Skills
	•	Sanctuary: Erect a protective barrier around an ally, absorbing damage for 2 turns.
	•	Cleansing Light: Purge all negative effects from all allies and restore a small amount of health.
	•	Lifeweaver’s Gift: Revive a fallen ally with partial health and mana.

Epic Skills
	•	Divine Resonance: Link all allies with a divine bond, spreading incoming damage evenly while enhancing healing received.
	•	Naor’s Boon: Boost all allies’ healing regeneration and resistance to negative effects for 3 turns.
	•	Radiant Wave: Emit a wave of holy energy that heals all allies and damages undead or corrupted enemies.

Legendary Skills
	•	Wellspring of Life: Create a fountain of divine energy that continuously heals all allies and cleanses ailments for 3 turns.
	•	Naor’s Embrace: Fully heal an ally, purge all debuffs, and grant immunity to damage for 1 turn.
	•	Circle of Renewal: Envelop the battlefield in a glowing circle that heals all allies over time and resurrects fallen allies after 3 turns.

Traits

Trait Name: Empathic Bond
Description: Years of training grant the ability to sense and alleviate pain, increasing the effectiveness of healing spells on allies in critical condition.

Trait Name: Luminous Shield
Description: Channeling Naor’s energy enhances defensive magic, reducing incoming damage while casting support spells.

Trait Name: Serene Presence
Description: Allies in proximity feel at ease, increasing their resistance to fear, confusion, and panic effects.

Trait Name: Enduring Light
Description: The user’s healing spells persist longer, granting allies additional regeneration over several turns.

Naor’s Embrace stands as a beacon of hope in the chaos of Grinner Humm. Their skills, while primarily restorative, can decisively turn the tide of any battle. Their followers embody selflessness, ensuring that wherever there is conflict or despair, the light of Naor will shine through.
   */
]



export async function createSkillTableIfNotExists(){
    const tableName = 'Skills';
    const tableStructure = `
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        baseDescription TEXT,
        requirement TEXT,
        equipmentNeeded TEXT,
        activeEffect TEXT,
        consume TEXT,
        produce TEXT,
        tier TEXT,
        isSpell TEXT,
        internalType TEXT,
        isWeaponAttack TEXT
    `;

    await createTableIfNotExists(tableName, tableStructure, skillSeed, 'id')
}