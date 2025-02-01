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
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
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

export const skill_auto_physical = createAutoAttackSkill(
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

export const skill_auto_magical = createAutoAttackSkill(
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
