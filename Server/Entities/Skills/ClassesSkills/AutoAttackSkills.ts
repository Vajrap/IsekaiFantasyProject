import { Skill } from "../Skill";
import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement";
import { SkillEquipmentRequirement } from "../SubClasses/SkillEquipmentRequirement";
import { ElementConsume, SkillConsume, SkillProduce } from "../SubClasses/SkillConsume";
import { ElementProduce } from "../SubClasses/SkillConsume";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { TargetConditionFilters, TargetPartyType, TargetSelectionScope, TargetSortingOptions, TargetTauntConsideration, TargetType } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { SkillActiveEffect, SkillActionObject, SkillActionSubType, SkillActionType } from "../SubClasses/SkillActiveEffect";
import { DiceEnum } from "../../../../Common/DIceEnum";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { SkillInternalType } from "../SubClasses/SkillInternalType";

export function createAutoAttackSkill(
    skillID: string,
    name: string,
    description: string,
    damageDice: DiceEnum,
    damageType: DamageTypes,
    statBonusForDamage: CharacterStatusEnum[],
    statBonusForHit: CharacterStatusEnum[],
    statBonusForCrit: CharacterStatusEnum[],
    element: FundamentalElementTypes,
    mpCost: number[],
    spCost: number[],
    isSpell?: boolean,
    secondElement?: FundamentalElementTypes,
) {
    // Produce element setup
    let elementProduce: SkillProduce;

    if (!secondElement) {
        elementProduce = new SkillProduce({
            elements: [new ElementProduce({
                element,
                amountRange: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]
            })]
        });
    } else {
        elementProduce = new SkillProduce({
            elements: [
                new ElementProduce({
                    element: element,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                }),
                new ElementProduce({
                    element: secondElement,
                    amountRange: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
                })
            ]
        });
    }

    const skill = new Skill(
        skillID,
        name,
        description,
        new SkillLearningRequirement({}),
        new SkillEquipmentRequirement({ weapon: [] }),
        [
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
                        damageDiceBase: [damageDice],
                        damageType: [damageType],
                        damageModifierStat: statBonusForDamage,
                        damageModifierBonus: [0],
                        hitBase: [0],
                        hitStat: [statBonusForHit],
                        critBase: [0],
                        critStat: [statBonusForCrit],
                        applyEffect: [],
                        traitBasedModifier: [{ trait: TraitEnum.None, modifier: 1 }],
                    })
                ]
            )
        ],
        new SkillConsume({
            hp: [0,0,0,0,0],
            mp: mpCost,
            sp: spCost,
            elements: [
                new ElementConsume({element: FundamentalElementTypes.none, amount: [0,0,0,0,0]})
            ]
        }),
        elementProduce,
        Tier.common,
        isSpell ? isSpell : false,
        SkillInternalType.None,
        true,
        true
    );

    return skill;
}

const skill_auto_physical = createAutoAttackSkill(
    'skill_auto_physical',
    'Normal Physical Attack',
    `Attack with weapon's physical damage.`,
    DiceEnum.Weapon_Physical,
    DamageTypes.physical,
    [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
    [CharacterStatusEnum.dexterity],
    [CharacterStatusEnum.pCRT],
    FundamentalElementTypes.none,
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
);

const skill_auto_magical = createAutoAttackSkill(
    'skill_auto_magical',
    'Normal Magical Attack',
    `Attack with weapon's magical damage.`,
    DiceEnum.Weapon_Magical,
    DamageTypes.arcane,
    [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
    [CharacterStatusEnum.intelligence],
    [CharacterStatusEnum.mCRT],
    FundamentalElementTypes.none,
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    true
);

// // MARK: Single Element Auto Attack Skills
// const skill_auto_order_physical = createAutoAttackSkill(
//     'skill_auto_order_physical',
//     'Order Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.order,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_order_magical = createAutoAttackSkill(
//     'skill_auto_order_magical',
//     'Order Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.order,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.order,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_chaos_physical = createAutoAttackSkill(
//     'skill_auto_chaos_physical',
//     'Chaos Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.chaos,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_chaos_magical = createAutoAttackSkill(
//     'skill_auto_chaos_magical',
//     'Chaos Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.chaos,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.chaos,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_air_physical = createAutoAttackSkill(
//     'skill_auto_air_physical',
//     'Air Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.air,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_air_magical = createAutoAttackSkill(
//     'skill_auto_air_magical',
//     'Air Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.air,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.air,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_water_physical = createAutoAttackSkill(
//     'skill_auto_water_physical',
//     'Water Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.water,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_water_magical = createAutoAttackSkill(
//     'skill_auto_water_magical',
//     'Water Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.water,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.water,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_fire_physical = createAutoAttackSkill(
//     'skill_auto_fire_physical',
//     'Fire Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.fire,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_fire_magical = createAutoAttackSkill(
//     'skill_auto_fire_magical',
//     'Fire Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.fire,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.fire,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_geo_physical = createAutoAttackSkill(
//     'skill_auto_geo_physical',
//     'Earth Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );

// const skill_auto_geo_magical = createAutoAttackSkill(
//     'skill_auto_geo_magical',
//     'Earth Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.geo,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// );



// // MARK: Compound Element Auto Attack Skills
// const skill_auto_ice_physical = createAutoAttackSkill(
//     'skill_auto_ice_physical',
//     'Ice Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.water,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.order
// );

// const skill_auto_ice_magical = createAutoAttackSkill(
//     'skill_auto_ice_magical',
//     'Ice Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.ice,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.water,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.order
// );

// const skill_auto_spirit_physical = createAutoAttackSkill(
//     'skill_auto_spirit_physical',
//     'Spirit Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.water,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.air
// );

// const skill_auto_spirit_magical = createAutoAttackSkill(
//     'skill_auto_spirit_magical',
//     'Spirit Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.spirit,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.water,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.air
// );

// const skill_auto_lightning_physical = createAutoAttackSkill(
//     'skill_auto_lightning_physical',
//     'Lightning Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.air,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.chaos
// );

// const skill_auto_lightning_magical = createAutoAttackSkill(
//     'skill_auto_lightning_magical',
//     'Lightning Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.lightning,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.air,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.chaos
// );

// const skill_auto_demonic_physical = createAutoAttackSkill(
//     'skill_auto_demonic_physical',
//     'Demonic Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.chaos,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.fire
// );

// const skill_auto_demonic_magical = createAutoAttackSkill(
//     'skill_auto_demonic_magical',
//     'Demonic Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.demonic,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.chaos,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.fire
// );

// const skill_auto_nature_physical = createAutoAttackSkill(
//     'skill_auto_nature_physical',
//     'Nature Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.water
// );

// const skill_auto_nature_magical = createAutoAttackSkill(
//     'skill_auto_nature_magical',
//     'Nature Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.nature,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.water
// );

// const skill_auto_dark_physical = createAutoAttackSkill(
//     'skill_auto_dark_physical',
//     'Dark Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.chaos
// );

// const skill_auto_dark_magical = createAutoAttackSkill(
//     'skill_auto_dark_magical',
//     'Dark Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.dark,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.chaos
// );

// const skill_auto_poison_physical = createAutoAttackSkill(
//     'skill_auto_poison_physical',
//     'Poison Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.chaos,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.geo
// );

// const skill_auto_poison_magical = createAutoAttackSkill(
//     'skill_auto_poison_magical',
//     'Poison Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.poison,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.chaos,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.geo
// );

// const skill_auto_metal_physical = createAutoAttackSkill(
//     'skill_auto_metal_physical',
//     'Metal Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.fire,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.geo
// );

// const skill_auto_metal_magical = createAutoAttackSkill(
//     'skill_auto_metal_magical',
//     'Metal Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.metal,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.fire,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.geo
// );

// const skill_auto_angelic_physical = createAutoAttackSkill(
//     'skill_auto_angelic_physical',
//     'Angelic Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.order
// );

// const skill_auto_angelic_magical = createAutoAttackSkill(
//     'skill_auto_angelic_magical',
//     'Angelic Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.angelic,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.geo,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.order
// );

// const skill_auto_necrotic_physical = createAutoAttackSkill(
//     'skill_auto_necrotic_physical',
//     'Ghost Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.fire,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.air
// );

// const skill_auto_necrotic_magical = createAutoAttackSkill(
//     'skill_auto_necrotic_magical',
//     'Ghost Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.necrotic,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.fire,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.air
// );

// const skill_auto_life_physical = createAutoAttackSkill(
//     'skill_auto_life_physical',
//     'Life Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.order,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.air
// );

// const skill_auto_life_magical = createAutoAttackSkill(
//     'skill_auto_life_magical',
//     'Life Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.life,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.order,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.air
// );

// const skill_auto_holy_physical = createAutoAttackSkill(
//     'skill_auto_holy_physical',
//     'Holy Physical Attack',
//     `Attack with weapon's physical damage.`,
//     DiceEnum.Weapon_Physical,
//     DamageTypes.physical,
//     [CharacterStatusEnum.dexterity, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.dexterity],
//     [CharacterStatusEnum.pCRT],
//     FundamentalElementTypes.order,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.fire
// );

// const skill_auto_holy_magical = createAutoAttackSkill(
//     'skill_auto_holy_magical',
//     'Holy Magical Attack',
//     `Attack with weapon's magical damage.`,
//     DiceEnum.Weapon_Magical,
//     DamageTypes.holy,
//     [CharacterStatusEnum.intelligence, CharacterStatusEnum.strength],
//     [CharacterStatusEnum.intelligence],
//     [CharacterStatusEnum.mCRT],
//     FundamentalElementTypes.order,
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     FundamentalElementTypes.fire
// );

export {
    skill_auto_physical,
    skill_auto_magical,
    // skill_auto_air_magical,
    // skill_auto_air_physical,
    // skill_auto_angelic_magical,
    // skill_auto_angelic_physical,
    // skill_auto_chaos_magical,
    // skill_auto_chaos_physical,
    // skill_auto_dark_magical,
    // skill_auto_dark_physical,
    // skill_auto_demonic_magical,
    // skill_auto_demonic_physical,
    // skill_auto_fire_magical,
    // skill_auto_fire_physical,
    // skill_auto_geo_magical,
    // skill_auto_geo_physical,
    // skill_auto_necrotic_magical,
    // skill_auto_necrotic_physical,
    // skill_auto_holy_magical,
    // skill_auto_holy_physical,
    // skill_auto_nature_magical,
    // skill_auto_nature_physical,
    // skill_auto_ice_magical,
    // skill_auto_ice_physical,
    // skill_auto_life_magical,
    // skill_auto_life_physical,
    // skill_auto_lightning_magical,
    // skill_auto_lightning_physical,
    // skill_auto_metal_magical,
    // skill_auto_metal_physical,
    // skill_auto_order_magical,
    // skill_auto_order_physical,
    // skill_auto_poison_magical,
    // skill_auto_poison_physical,
    // skill_auto_spirit_magical,
    // skill_auto_spirit_physical,
    // skill_auto_water_magical,
    // skill_auto_water_physical
}
