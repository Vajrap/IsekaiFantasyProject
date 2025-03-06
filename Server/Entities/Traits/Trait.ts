import { PassiveStatusBonus } from '../BonusEffect/PassiveStatusBonus';
import { BuffsAndDebuffs } from '../../Entities/Character/Subclasses/BuffsAndDebuffs';
import { TraitEnum } from '../../../Common/DTOsEnumsInterfaces/Character/TraitEnums';

export class Trait {
    id: TraitEnum;
    name: string;
    description: string;
    passiveBonus?: PassiveStatusBonus;
    passiveBuffAndDebuff?: any;

    constructor(
        id: TraitEnum,
        name: string,
        description: string,
        passiveBonus?: PassiveStatusBonus,
        passiveBuffAndDebuff?: BuffsAndDebuffs
    ){
        this.id = id
        this.name = name
        this.description = description
        this.passiveBonus = passiveBonus
        this.passiveBuffAndDebuff = passiveBuffAndDebuff
    }
}

export const trait_darkVision = new Trait(
    TraitEnum.trait_darkVision,
    `Dark Vision`,
    `This character can see in the dark`
)

export const trait_warCaster = new Trait(
    TraitEnum.trait_warCaster,
    `War Caster`,
    `This character is well verse in casting spell during combat, easing the penalty from wearing armor`
)

export const trait_warLord = new Trait(
    TraitEnum.trait_warLord,
    `War Lord`,
    `This character is a lord of the battlefield`,
    new PassiveStatusBonus({
        leadership: 2,
        charisma: 2,
        strength: 2,
        vitality: 2,
        endurance: 2
    }),
)

export const trait_motherEarthBlessing = new Trait(
    TraitEnum.trait_motherEarthBlessing,
    `Mother Earth Blessing`,
    `This character has been blessed by Gaia, the earth herself.`,
    new PassiveStatusBonus({
        geo: 3,
        vitality: 3
    })
)

export const trait_enlightened = new Trait(
    TraitEnum.trait_enlightened,
    `Enlightened`,
    `This character is enlightened`,
    new PassiveStatusBonus({
        order: 1,
        chaos: 1,
        intelligence: 2
    }),
)

export const trait_heretic = new Trait(
    TraitEnum.trait_heretic,
    `Heretic`,
    `This character is a heretic`,
    new PassiveStatusBonus({
        order: -2,
        chaos: 2
    }),
)

export const trait_faithful = new Trait(
    TraitEnum.trait_faithful,
    `Faithful`,
    `This character is faithful`,
    new PassiveStatusBonus({
        order: 1,
    }),
)

export const trait_pactWithDevil = new Trait(
    TraitEnum.trait_pactWithDevil,
    `Pact with the Devil`,
    `This character has made a pact with the devil`,
    new PassiveStatusBonus({
        chaos: 2,
    }),
)

export const trait_skeleton = new Trait(
    TraitEnum.trait_skeleton,
    `Skeleton`,
    `A skeletal creature`,
    undefined,
)

export const trait_undead = new Trait(
    TraitEnum.trait_undead,
    `Undead`,
    `An undead creature`,
    undefined,
)

//additional attribute traits
export const trait_charisma_01 = new Trait(
    TraitEnum.trait_charisma_01,
    `+ 1 charisma`,
    `Increases your charisma by 1 point`,
    new PassiveStatusBonus({
        charisma: 1
    }),
    undefined
)
export const trait_charisma_02 = new Trait(
    TraitEnum.trait_charisma_02,
    `+ 2 charisma`,
    `Increases your charisma by 2 points`,
    new PassiveStatusBonus({
        charisma: 2
    }),
    undefined
)
export const trait_charisma_03 = new Trait(
    TraitEnum.trait_charisma_03,
    `+ 3 charisma`,
    `Increases your charisma by 3 points`,
    new PassiveStatusBonus({
        charisma: 3
    }),
    undefined
)
export const trait_charisma_04 = new Trait(
    TraitEnum.trait_charisma_04,
    `+ 4 charisma`,
    `Increases your charisma by 4 points`,
    new PassiveStatusBonus({
        charisma: 4
    }),
    undefined
)
export const trait_charisma_05 = new Trait(
    TraitEnum.trait_charisma_05,
    `+ 5 charisma`,
    `Increases your charisma by 5 points`,
    new PassiveStatusBonus({
        charisma: 5
    }),
    undefined
)
export const trait_charisma_01_neg = new Trait(
    TraitEnum.trait_charisma_01_neg,
    `- 1 charisma`,
    `Decreases your charisma by 1 point`,
    new PassiveStatusBonus({
        charisma: -1
    }),
    undefined
)
export const trait_charisma_02_neg = new Trait(
    TraitEnum.trait_charisma_02_neg,
    `- 2 charisma`,
    `Decreases your charisma by 2 points`,
    new PassiveStatusBonus({
        charisma: -2
    }),
    undefined
)
export const trait_charisma_03_neg = new Trait(
    TraitEnum.trait_charisma_03_neg,
    `- 3 charisma`,
    `Decreases your charisma by 3 points`,
    new PassiveStatusBonus({
        charisma: -3
    }),
    undefined
)
export const trait_charisma_04_neg = new Trait(
    TraitEnum.trait_charisma_04_neg,
    `- 4 charisma`,
    `Decreases your charisma by 4 points`,
    new PassiveStatusBonus({
        charisma: -4
    }),
    undefined
)
export const trait_charisma_05_neg = new Trait(
    TraitEnum.trait_charisma_05_neg,
    `- 5 charisma`,
    `Decreases your charisma by 5 points`,
    new PassiveStatusBonus({
        charisma: -5
    }),
    undefined
)
export const trait_luck_01 = new Trait(
    TraitEnum.trait_luck_01,
    `+ 1 luck`,
    `Increases your luck by 1 point`,
    new PassiveStatusBonus({
        luck: 1
    }),
    undefined
)
export const trait_luck_02 = new Trait(
    TraitEnum.trait_luck_02,
    `+ 2 luck`,
    `Increases your luck by 2 points`,
    new PassiveStatusBonus({
        luck: 2
    }),
    undefined
)
export const trait_luck_03 = new Trait(
    TraitEnum.trait_luck_03,
    `+ 3 luck`,
    `Increases your luck by 3 points`,
    new PassiveStatusBonus({
        luck: 3
    }),
    undefined
)
export const trait_luck_04 = new Trait(
    TraitEnum.trait_luck_04,
    `+ 4 luck`,
    `Increases your luck by 4 points`,
    new PassiveStatusBonus({
        luck: 4
    }),
    undefined
)
export const trait_luck_05 = new Trait(
    TraitEnum.trait_luck_05,
    `+ 5 luck`,
    `Increases your luck by 5 points`,
    new PassiveStatusBonus({
        luck: 5
    }),
    undefined
)
export const trait_luck_01_neg = new Trait(
    TraitEnum.trait_luck_01_neg,
    `- 1 luck`,
    `Decreases your luck by 1 point`,
    new PassiveStatusBonus({
        luck: -1
    }),
    undefined
)
export const trait_luck_02_neg = new Trait(
    TraitEnum.trait_luck_02_neg,
    `- 2 luck`,
    `Decreases your luck by 2 points`,
    new PassiveStatusBonus({
        luck: -2
    }),
    undefined
)
export const trait_luck_03_neg = new Trait(
    TraitEnum.trait_luck_03_neg,
    `- 3 luck`,
    `Decreases your luck by 3 points`,
    new PassiveStatusBonus({
        luck: -3
    }),
    undefined
)
export const trait_luck_04_neg = new Trait(
    TraitEnum.trait_luck_04_neg,
    `- 4 luck`,
    `Decreases your luck by 4 points`,
    new PassiveStatusBonus({
        luck: -4
    }),
    undefined
)
export const trait_luck_05_neg = new Trait(
    TraitEnum.trait_luck_05_neg,
    `- 5 luck`,
    `Decreases your luck by 5 points`,
    new PassiveStatusBonus({
        luck: -5
    }),
    undefined
)
export const trait_intelligence_01 = new Trait(
    TraitEnum.trait_intelligence_01,
    `+ 1 intelligence`,
    `Increases your intelligence by 1 point`,
    new PassiveStatusBonus({
        intelligence: 1
    }),
    undefined
)
export const trait_intelligence_02 = new Trait(
    TraitEnum.trait_intelligence_02,
    `+ 2 intelligence`,
    `Increases your intelligence by 2 points`,
    new PassiveStatusBonus({
        intelligence: 2
    }),
    undefined
)
export const trait_intelligence_03 = new Trait(
    TraitEnum.trait_intelligence_03,
    `+ 3 intelligence`,
    `Increases your intelligence by 3 points`,
    new PassiveStatusBonus({
        intelligence: 3
    }),
    undefined
)
export const trait_intelligence_04 = new Trait(
    TraitEnum.trait_intelligence_04,
    `+ 4 intelligence`,
    `Increases your intelligence by 4 points`,
    new PassiveStatusBonus({
        intelligence: 4
    }),
    undefined
)
export const trait_intelligence_05 = new Trait(
    TraitEnum.trait_intelligence_05,
    `+ 5 intelligence`,
    `Increases your intelligence by 5 points`,
    new PassiveStatusBonus({
        intelligence: 5
    }),
    undefined
)

export const trait_intelligence_01_neg = new Trait(
    TraitEnum.trait_intelligence_01_neg,
    `- 1 intelligence`,
    `Decreases your intelligence by 1 point`,
    new PassiveStatusBonus({
        intelligence: -1
    }),
    undefined
)
export const trait_intelligence_02_neg = new Trait(
    TraitEnum.trait_intelligence_02_neg,
    `- 2 intelligence`,
    `Decreases your intelligence by 2 points`,
    new PassiveStatusBonus({
        intelligence: -2
    }),
    undefined
)
export const trait_intelligence_03_neg = new Trait(
    TraitEnum.trait_intelligence_03_neg,
    `- 3 intelligence`,
    `Decreases your intelligence by 3 points`,
    new PassiveStatusBonus({
        intelligence: -3
    }),
    undefined
)
export const trait_intelligence_04_neg = new Trait(
    TraitEnum.trait_intelligence_04_neg,
    `- 4 intelligence`,
    `Decreases your intelligence by 4 points`,
    new PassiveStatusBonus({
        intelligence: -4
    }),
    undefined
)
export const trait_intelligence_05_neg = new Trait(
    TraitEnum.trait_intelligence_05_neg,
    `- 5 intelligence`,
    `Decreases your intelligence by 5 points`,
    new PassiveStatusBonus({
        intelligence: -5
    }),
    undefined
)
export const trait_strength_01 = new Trait(
    TraitEnum.trait_strength_01,
    `+ 1 strength`,
    `Increases your strength by 1 point`,
    new PassiveStatusBonus({
        strength: 1
    }),
    undefined
)
export const trait_strength_02 = new Trait(
    TraitEnum.trait_strength_02,
    `+ 2 strength`,
    `Increases your strength by 2 points`,
    new PassiveStatusBonus({
        strength: 2
    }),
    undefined
)
export const trait_strength_03 = new Trait(
    TraitEnum.trait_strength_03,
    `+ 3 strength`,
    `Increases your strength by 3 points`,
    new PassiveStatusBonus({
        strength: 3
    }),
    undefined
)
export const trait_strength_04 = new Trait(
    TraitEnum.trait_strength_04,
    `+ 4 strength`,
    `Increases your strength by 4 points`,
    new PassiveStatusBonus({
        strength: 4
    }),
    undefined
)
export const trait_strength_05 = new Trait(
    TraitEnum.trait_strength_05,
    `+ 5 strength`,
    `Increases your strength by 5 points`,
    new PassiveStatusBonus({
        strength: 5
    }),
    undefined
)
export const trait_strength_01_neg = new Trait(
    TraitEnum.trait_strength_01_neg,
    `- 1 strength`,
    `Decreases your strength by 1 point`,
    new PassiveStatusBonus({
        strength: -1
    }),
    undefined
)
export const trait_strength_02_neg = new Trait(
    TraitEnum.trait_strength_02_neg,
    `- 2 strength`,
    `Decreases your strength by 2 points`,
    new PassiveStatusBonus({
        strength: -2
    }),
    undefined
)
export const trait_strength_03_neg = new Trait(
    TraitEnum.trait_strength_03_neg,
    `- 3 strength`,
    `Decreases your strength by 3 points`,
    new PassiveStatusBonus({
        strength: -3
    }),
    undefined
)
export const trait_strength_04_neg = new Trait(
    TraitEnum.trait_strength_04_neg,
    `- 4 strength`,
    `Decreases your strength by 4 points`,
    new PassiveStatusBonus({
        strength: -4
    }),
    undefined
)
export const trait_strength_05_neg = new Trait(
    TraitEnum.trait_strength_05_neg,
    `- 5 strength`,
    `Decreases your strength by 5 points`,
    new PassiveStatusBonus({
        strength: -5
    }),
    undefined
)
export const trait_endurance_01 = new Trait(
    TraitEnum.trait_endurance_01,
    `+ 1 endurance`,
    `Increases your endurance by 1 point`,
    new PassiveStatusBonus({
        endurance: 1
    }),
    undefined
)
export const trait_endurance_02 = new Trait(
    TraitEnum.trait_endurance_02,
    `+ 2 endurance`,
    `Increases your endurance by 2 points`,
    new PassiveStatusBonus({
        endurance: 2
    }),
    undefined
)
export const trait_endurance_03 = new Trait(
    TraitEnum.trait_endurance_03,
    `+ 3 endurance`,
    `Increases your endurance by 3 points`,
    new PassiveStatusBonus({
        endurance: 3
    }),
    undefined
)
export const trait_endurance_04 = new Trait(
    TraitEnum.trait_endurance_04,
    `+ 4 endurance`,
    `Increases your endurance by 4 points`,
    new PassiveStatusBonus({
        endurance: 4
    }),
    undefined
)
export const trait_endurance_05 = new Trait(
    TraitEnum.trait_endurance_05,
    `+ 5 endurance`,
    `Increases your endurance by 5 points`,
    new PassiveStatusBonus({
        endurance: 5
    }),
    undefined
)
export const trait_endurance_01_neg = new Trait(
    TraitEnum.trait_endurance_01_neg,
    `- 1 endurance`,
    `Decreases your endurance by 1 point`,
    new PassiveStatusBonus({
        endurance: -1
    }),
    undefined
)
export const trait_endurance_02_neg = new Trait(
    TraitEnum.trait_endurance_02_neg,
    `- 2 endurance`,
    `Decreases your endurance by 2 points`,
    new PassiveStatusBonus({
        endurance: -2
    }),
    undefined
)
export const trait_endurance_03_neg = new Trait(
    TraitEnum.trait_endurance_03_neg,
    `- 3 endurance`,
    `Decreases your endurance by 3 points`,
    new PassiveStatusBonus({
        endurance: -3
    }),
    undefined
)
export const trait_endurance_04_neg = new Trait(
    TraitEnum.trait_endurance_04_neg,
    `- 4 endurance`,
    `Decreases your endurance by 4 points`,
    new PassiveStatusBonus({
        endurance: -4
    }),
    undefined
)
export const trait_endurance_05_neg = new Trait(
    TraitEnum.trait_endurance_05_neg,
    `- 5 endurance`,
    `Decreases your endurance by 5 points`,
    new PassiveStatusBonus({
        endurance: -5
    }),
    undefined
)
export const trait_dexterity_01 = new Trait(
    TraitEnum.trait_dexterity_01,
    `+ 1 dexterity`,
    `Increases your dexterity by 1 point`,
    new PassiveStatusBonus({
        dexterity: 1
    }),
    undefined
)
export const trait_dexterity_02 = new Trait(
    TraitEnum.trait_dexterity_02,
    `+ 2 dexterity`,
    `Increases your dexterity by 2 points`,
    new PassiveStatusBonus({
        dexterity: 2
    }),
    undefined
)
export const trait_dexterity_03 = new Trait(
    TraitEnum.trait_dexterity_03,
    `+ 3 dexterity`,
    `Increases your dexterity by 3 points`,
    new PassiveStatusBonus({
        dexterity: 3
    }),
    undefined
)
export const trait_dexterity_04 = new Trait(
    TraitEnum.trait_dexterity_04,
    `+ 4 dexterity`,
    `Increases your dexterity by 4 points`,
    new PassiveStatusBonus({
        dexterity: 4
    }),
    undefined
)
export const trait_dexterity_05 = new Trait(
    TraitEnum.trait_dexterity_05,
    `+ 5 dexterity`,
    `Increases your dexterity by 5 points`,
    new PassiveStatusBonus({
        dexterity: 5
    }),
    undefined
)
export const trait_dexterity_01_neg = new Trait(
    TraitEnum.trait_dexterity_01_neg,
    `- 1 dexterity`,
    `Decreases your dexterity by 1 point`,
    new PassiveStatusBonus({
        dexterity: -1
    }),
    undefined
)
export const trait_dexterity_02_neg = new Trait(
    TraitEnum.trait_dexterity_02_neg,
    `- 2 dexterity`,
    `Decreases your dexterity by 2 points`,
    new PassiveStatusBonus({
        dexterity: -2
    }),
    undefined
)
export const trait_dexterity_03_neg = new Trait(
    TraitEnum.trait_dexterity_03_neg,
    `- 3 dexterity`,
    `Decreases your dexterity by 3 points`,
    new PassiveStatusBonus({
        dexterity: -3
    }),
    undefined
)
export const trait_dexterity_04_neg = new Trait(
    TraitEnum.trait_dexterity_04_neg,
    `- 4 dexterity`,
    `Decreases your dexterity by 4 points`,
    new PassiveStatusBonus({
        dexterity: -4
    }),
    undefined
)
export const trait_dexterity_05_neg = new Trait(
    TraitEnum.trait_dexterity_05_neg,
    `- 5 dexterity`,
    `Decreases your dexterity by 5 points`,
    new PassiveStatusBonus({
        dexterity: -5
    }),
    undefined
)
export const trait_agility_01 = new Trait(
    TraitEnum.trait_agility_01,
    `+ 1 agility`,
    `Increases your agility by 1 point`,
    new PassiveStatusBonus({
        agility: 1
    }),
    undefined
)
export const trait_agility_02 = new Trait(
    TraitEnum.trait_agility_02,
    `+ 2 agility`,
    `Increases your agility by 2 points`,
    new PassiveStatusBonus({
        agility: 2
    }),
    undefined
)
export const trait_agility_03 = new Trait(
    TraitEnum.trait_agility_03,
    `+ 3 agility`,
    `Increases your agility by 3 points`,
    new PassiveStatusBonus({
        agility: 3
    }),
    undefined
)
export const trait_agility_04 = new Trait(
    TraitEnum.trait_agility_04,
    `+ 4 agility`,
    `Increases your agility by 4 points`,
    new PassiveStatusBonus({
        agility: 4
    }),
    undefined
)
export const trait_agility_05 = new Trait(
    TraitEnum.trait_agility_05,
    `+ 5 agility`,
    `Increases your agility by 5 points`,
    new PassiveStatusBonus({
        agility: 5
    }),
    undefined
)
export const trait_agility_01_neg = new Trait(
    TraitEnum.trait_agility_01_neg,
    `- 1 agility`,
    `Decreases your agility by 1 point`,
    new PassiveStatusBonus({
        agility: -1
    }),
    undefined
)
export const trait_agility_02_neg = new Trait(
    TraitEnum.trait_agility_02_neg,
    `- 2 agility`,
    `Decreases your agility by 2 points`,
    new PassiveStatusBonus({
        agility: -2
    }),
    undefined
)
export const trait_agility_03_neg = new Trait(
    TraitEnum.trait_agility_03_neg,
    `- 3 agility`,
    `Decreases your agility by 3 points`,
    new PassiveStatusBonus({
        agility: -3
    }),
    undefined
)
export const trait_agility_04_neg = new Trait(
    TraitEnum.trait_agility_04_neg,
    `- 4 agility`,
    `Decreases your agility by 4 points`,
    new PassiveStatusBonus({
        agility: -4
    }),
    undefined
)
export const trait_agility_05_neg = new Trait(
    TraitEnum.trait_agility_05_neg,
    `- 5 agility`,
    `Decreases your agility by 5 points`,
    new PassiveStatusBonus({
        agility: -5
    }),
    undefined
)
export const trait_vitality_01 = new Trait(
    TraitEnum.trait_vitality_01,
    `+ 1 vitality`,
    `Increases your vitality by 1 point`,
    new PassiveStatusBonus({
        vitality: 1
    }),
    undefined
)
export const trait_vitality_02 = new Trait(
    TraitEnum.trait_vitality_02,
    `+ 2 vitality`,
    `Increases your vitality by 2 points`,
    new PassiveStatusBonus({
        vitality: 2
    }),
    undefined
)
export const trait_vitality_03 = new Trait(
    TraitEnum.trait_vitality_03,
    `+ 3 vitality`,
    `Increases your vitality by 3 points`,
    new PassiveStatusBonus({
        vitality: 3
    }),
    undefined
)
export const trait_vitality_04 = new Trait(
    TraitEnum.trait_vitality_04,
    `+ 4 vitality`,
    `Increases your vitality by 4 points`,
    new PassiveStatusBonus({
        vitality: 4
    }),
    undefined
)
export const trait_vitality_05 = new Trait(
    TraitEnum.trait_vitality_05,
    `+ 5 vitality`,
    `Increases your vitality by 5 points`,
    new PassiveStatusBonus({
        vitality: 5
    }),
    undefined
)
export const trait_vitality_01_neg = new Trait(
    TraitEnum.trait_vitality_01_neg,
    `- 1 vitality`,
    `Decreases your vitality by 1 point`,
    new PassiveStatusBonus({
        vitality: -1
    }),
    undefined
)
export const trait_vitality_02_neg = new Trait(
    TraitEnum.trait_vitality_02_neg,
    `- 2 vitality`,
    `Decreases your vitality by 2 points`,
    new PassiveStatusBonus({
        vitality: -2
    }),
    undefined
)
export const trait_vitality_03_neg = new Trait(
    TraitEnum.trait_vitality_03_neg,
    `- 3 vitality`,
    `Decreases your vitality by 3 points`,
    new PassiveStatusBonus({
        vitality: -3
    }),
    undefined
)
export const trait_vitality_04_neg = new Trait(
    TraitEnum.trait_vitality_04_neg,
    `- 4 vitality`,
    `Decreases your vitality by 4 points`,
    new PassiveStatusBonus({
        vitality: -4
    }),
    undefined
)
export const trait_vitality_05_neg = new Trait(
    TraitEnum.trait_vitality_05_neg,
    `- 5 vitality`,
    `Decreases your vitality by 5 points`,
    new PassiveStatusBonus({
        vitality: -5
    }),
    undefined
)
export const trait_willpower_01 = new Trait(
    TraitEnum.trait_willpower_01,
    `+ 1 willpower`,
    `Increases your willpower by 1 point`,
    new PassiveStatusBonus({
        willpower: 1
    }),
    undefined
)
export const trait_willpower_02 = new Trait(
    TraitEnum.trait_willpower_02,
    `+ 2 willpower`,
    `Increases your willpower by 2 points`,
    new PassiveStatusBonus({
        willpower: 2
    }),
    undefined
)
export const trait_willpower_03 = new Trait(
    TraitEnum.trait_willpower_03,
    `+ 3 willpower`,
    `Increases your willpower by 3 points`,
    new PassiveStatusBonus({
        willpower: 3
    }),
    undefined
)
export const trait_willpower_04 = new Trait(
    TraitEnum.trait_willpower_04,
    `+ 4 willpower`,
    `Increases your willpower by 4 points`,
    new PassiveStatusBonus({
        willpower: 4
    }),
    undefined
)
export const trait_willpower_05 = new Trait(
    TraitEnum.trait_willpower_05,
    `+ 5 willpower`,
    `Increases your willpower by 5 points`,
    new PassiveStatusBonus({
        willpower: 5
    }),
    undefined
)
export const trait_willpower_01_neg = new Trait(
    TraitEnum.trait_willpower_01_neg,
    `- 1 willpower`,
    `Decreases your willpower by 1 point`,
    new PassiveStatusBonus({
        willpower: -1
    }),
    undefined
)
export const trait_willpower_02_neg = new Trait(
    TraitEnum.trait_willpower_02_neg,
    `- 2 willpower`,
    `Decreases your willpower by 2 points`,
    new PassiveStatusBonus({
        willpower: -2
    }),
    undefined
)
export const trait_willpower_03_neg = new Trait(
    TraitEnum.trait_willpower_03_neg,
    `- 3 willpower`,
    `Decreases your willpower by 3 points`,
    new PassiveStatusBonus({
        willpower: -3
    }),
    undefined
)
export const trait_willpower_04_neg = new Trait(
    TraitEnum.trait_willpower_04_neg,
    `- 4 willpower`,
    `Decreases your willpower by 4 points`,
    new PassiveStatusBonus({
        willpower: -4
    }),
    undefined
)
export const trait_willpower_05_neg = new Trait(
    TraitEnum.trait_willpower_05_neg,
    `- 5 willpower`,
    `Decreases your willpower by 5 points`,
    new PassiveStatusBonus({
        willpower: -5
    }),
    undefined
)
export const trait_leadership_01 = new Trait(
    TraitEnum.trait_leadership_01,
    `+ 1 leadership`,
    `Increases your leadership by 1 point`,
    new PassiveStatusBonus({
        leadership: 1
    }),
    undefined
)
export const trait_leadership_02 = new Trait(
    TraitEnum.trait_leadership_02,
    `+ 2 leadership`,
    `Increases your leadership by 2 points`,
    new PassiveStatusBonus({
        leadership: 2
    }),
    undefined
)
export const trait_leadership_03 = new Trait(
    TraitEnum.trait_leadership_03,
    `+ 3 leadership`,
    `Increases your leadership by 3 points`,
    new PassiveStatusBonus({
        leadership: 3
    }),
    undefined
)
export const trait_leadership_04 = new Trait(
    TraitEnum.trait_leadership_04,
    `+ 4 leadership`,
    `Increases your leadership by 4 points`,
    new PassiveStatusBonus({
        leadership: 4
    }),
    undefined
)
export const trait_leadership_05 = new Trait(
    TraitEnum.trait_leadership_05,
    `+ 5 leadership`,
    `Increases your leadership by 5 points`,
    new PassiveStatusBonus({
        leadership: 5
    }),
    undefined
)
export const trait_leadership_01_neg = new Trait(
    TraitEnum.trait_leadership_01_neg,
    `- 1 leadership`,
    `Decreases your leadership by 1 point`,
    new PassiveStatusBonus({
        leadership: -1
    }),
    undefined
)
export const trait_leadership_02_neg = new Trait(
    TraitEnum.trait_leadership_02_neg,
    `- 2 leadership`,
    `Decreases your leadership by 2 points`,
    new PassiveStatusBonus({
        leadership: -2
    }),
    undefined
)
export const trait_leadership_03_neg = new Trait(
    TraitEnum.trait_leadership_03_neg,
    `- 3 leadership`,
    `Decreases your leadership by 3 points`,
    new PassiveStatusBonus({
        leadership: -3
    }),
    undefined
)
export const trait_leadership_04_neg = new Trait(
    TraitEnum.trait_leadership_04_neg,
    `- 4 leadership`,
    `Decreases your leadership by 4 points`,
    new PassiveStatusBonus({
        leadership: -4
    }),
    undefined
)
export const trait_leadership_05_neg = new Trait(
    TraitEnum.trait_leadership_05_neg,
    `- 5 leadership`,
    `Decreases your leadership by 5 points`,
    new PassiveStatusBonus({
        leadership: -5
    }),
    undefined
)
export const trait_breath_01 = new Trait(
    TraitEnum.trait_breath_01,
    `+ 1 breath`,
    `Increases your breath by 1 point`,
    new PassiveStatusBonus({
        breath: 1
    }),
    undefined
)
export const trait_breath_02 = new Trait(
    TraitEnum.trait_breath_02,
    `+ 2 breath`,
    `Increases your breath by 2 points`,
    new PassiveStatusBonus({
        breath: 2
    }),
    undefined
)
export const trait_breath_03 = new Trait(
    TraitEnum.trait_breath_03,
    `+ 3 breath`,
    `Increases your breath by 3 points`,
    new PassiveStatusBonus({
        breath: 3
    }),
    undefined
)
export const trait_breath_04 = new Trait(
    TraitEnum.trait_breath_04,
    `+ 4 breath`,
    `Increases your breath by 4 points`,
    new PassiveStatusBonus({
        breath: 4
    }),
    undefined
)
export const trait_breath_05 = new Trait(
    TraitEnum.trait_breath_05,
    `+ 5 breath`,
    `Increases your breath by 5 points`,
    new PassiveStatusBonus({
        breath: 5
    }),
    undefined
)
export const trait_breath_01_neg = new Trait(
    TraitEnum.trait_breath_01_neg,
    `- 1 breath`,
    `Decreases your breath by 1 point`,
    new PassiveStatusBonus({
        breath: -1
    }),
    undefined
)
export const trait_breath_02_neg = new Trait(
    TraitEnum.trait_breath_02_neg,
    `- 2 breath`,
    `Decreases your breath by 2 points`,
    new PassiveStatusBonus({
        breath: -2
    }),
    undefined
)
export const trait_breath_03_neg = new Trait(
    TraitEnum.trait_breath_03_neg,
    `- 3 breath`,
    `Decreases your breath by 3 points`,
    new PassiveStatusBonus({
        breath: -3
    }),
    undefined
)
export const trait_breath_04_neg = new Trait(
    TraitEnum.trait_breath_04_neg,
    `- 4 breath`,
    `Decreases your breath by 4 points`,
    new PassiveStatusBonus({
        breath: -4
    }),
    undefined
)
export const trait_breath_05_neg = new Trait(
    TraitEnum.trait_breath_05_neg,
    `- 5 breath`,
    `Decreases your breath by 5 points`,
    new PassiveStatusBonus({
        breath: -5
    }),
    undefined
)
export const trait_planar_01 = new Trait(
    TraitEnum.trait_planar_01,
    `+ 1 planar`,
    `Increases your planar by 1 point`,
    new PassiveStatusBonus({
        planar: 1
    }),
    undefined
)
export const trait_planar_02 = new Trait(
    TraitEnum.trait_planar_02,
    `+ 2 planar`,
    `Increases your planar by 2 points`,
    new PassiveStatusBonus({
        planar: 2
    }),
    undefined
)
export const trait_planar_03 = new Trait(
    TraitEnum.trait_planar_03,
    `+ 3 planar`,
    `Increases your planar by 3 points`,
    new PassiveStatusBonus({
        planar: 3
    }),
    undefined
)
export const trait_planar_04 = new Trait(
    TraitEnum.trait_planar_04,
    `+ 4 planar`,
    `Increases your planar by 4 points`,
    new PassiveStatusBonus({
        planar: 4
    }),
    undefined
)
export const trait_planar_05 = new Trait(
    TraitEnum.trait_planar_05,
    `+ 5 planar`,
    `Increases your planar by 5 points`,
    new PassiveStatusBonus({
        planar: 5
    }),
    undefined
)
export const trait_planar_01_neg = new Trait(
    TraitEnum.trait_planar_01_neg,
    `- 1 planar`,
    `Decreases your planar by 1 point`,
    new PassiveStatusBonus({
        planar: -1
    }),
    undefined
)
export const trait_planar_02_neg = new Trait(
    TraitEnum.trait_planar_02_neg,
    `- 2 planar`,
    `Decreases your planar by 2 points`,
    new PassiveStatusBonus({
        planar: -2
    }),
    undefined
)
export const trait_planar_03_neg = new Trait(
    TraitEnum.trait_planar_03_neg,
    `- 3 planar`,
    `Decreases your planar by 3 points`,
    new PassiveStatusBonus({
        planar: -3
    }),
    undefined
)
export const trait_planar_04_neg = new Trait(
    TraitEnum.trait_planar_04_neg,
    `- 4 planar`,
    `Decreases your planar by 4 points`,
    new PassiveStatusBonus({
        planar: -4
    }),
    undefined
)
export const trait_planar_05_neg = new Trait(
    TraitEnum.trait_planar_05_neg,
    `- 5 planar`,
    `Decreases your planar by 5 points`,
    new PassiveStatusBonus({
        planar: -5
    }),
    undefined
)


//battler traits


//additional battler traits(pATK, pHIT, pCRT, pDEF, mATK, mHIT, mCRT, mDEF, dodge)
export const trait_pATK_01 = new Trait(
    TraitEnum.trait_pATK_01,
    `+ 1 pATK`,
    `Increases your physical attack by 1 point`,
    new PassiveStatusBonus({
        pATK: 1
    }),
    undefined
)

export const trait_pATK_02 = new Trait(
    TraitEnum.trait_pATK_02,
    `+ 2 pATK`,
    `Increases your physical attack by 2 points`,
    new PassiveStatusBonus({
        pATK: 2
    }),
    undefined
)

export const trait_pATK_03 = new Trait(
    TraitEnum.trait_pATK_03,
    `+ 3 pATK`,
    `Increases your physical attack by 3 points`,
    new PassiveStatusBonus({
        pATK: 3
    }),
    undefined
)

export const trait_pATK_04 = new Trait(
    TraitEnum.trait_pATK_04,
    `+ 4 pATK`,
    `Increases your physical attack by 4 points`,
    new PassiveStatusBonus({
        pATK: 4
    }),
    undefined
)

export const trait_pATK_05 = new Trait(
    TraitEnum.trait_pATK_05,
    `+ 5 pATK`,
    `Increases your physical attack by 5 points`,
    new PassiveStatusBonus({
        pATK: 5
    }),
    undefined
)

export const trait_pHIT_01 = new Trait(
    TraitEnum.trait_pHIT_01,
    `+ 1 pHIT`,
    `Increases your physical hit by 1 point`,
    new PassiveStatusBonus({
        pHIT: 1
    }),
    undefined
)

export const trait_pHIT_02 = new Trait(
    TraitEnum.trait_pHIT_02,
    `+ 2 pHIT`,
    `Increases your physical hit by 2 points`,
    new PassiveStatusBonus({
        pHIT: 2
    }),
    undefined
)

export const trait_pHIT_03 = new Trait(
    TraitEnum.trait_pHIT_03,
    `+ 3 pHIT`,
    `Increases your physical hit by 3 points`,
    new PassiveStatusBonus({
        pHIT: 3
    }),
    undefined
)

export const trait_pHIT_04 = new Trait(
    TraitEnum.trait_pHIT_04,
    `+ 4 pHIT`,
    `Increases your physical hit by 4 points`,
    new PassiveStatusBonus({
        pHIT: 4
    }),
    undefined
)

export const trait_pHIT_05 = new Trait(
    TraitEnum.trait_pHIT_05,
    `+ 5 pHIT`,
    `Increases your physical hit by 5 points`,
    new PassiveStatusBonus({
        pHIT: 5
    }),
    undefined
)

export const trait_pCRT_01 = new Trait(
    TraitEnum.trait_pCRT_01,
    `+ 1 pCRT`,
    `Increases your physical critical by 1 point`,
    new PassiveStatusBonus({
        pCRT: 1
    }),
    undefined
)

export const trait_pCRT_02 = new Trait(
    TraitEnum.trait_pCRT_02,
    `+ 2 pCRT`,
    `Increases your physical critical by 2 points`,
    new PassiveStatusBonus({
        pCRT: 2
    }),
    undefined
)

export const trait_pCRT_03 = new Trait(
    TraitEnum.trait_pCRT_03,
    `+ 3 pCRT`,
    `Increases your physical critical by 3 points`,
    new PassiveStatusBonus({
        pCRT: 3
    }),
    undefined
)

export const trait_pCRT_04 = new Trait(
    TraitEnum.trait_pCRT_04,
    `+ 4 pCRT`,
    `Increases your physical critical by 4 points`,
    new PassiveStatusBonus({
        pCRT: 4
    }),
    undefined
)

export const trait_pCRT_05 = new Trait(
    TraitEnum.trait_pCRT_05,
    `+ 5 pCRT`,
    `Increases your physical critical by 5 points`,
    new PassiveStatusBonus({
        pCRT: 5
    }),
    undefined
)

export const trait_pDEF_01 = new Trait(
    TraitEnum.trait_pDEF_01,
    `+ 1 pDEF`,
    `Increases your physical defense by 1 point`,
    new PassiveStatusBonus({
        pDEF: 1
    }),
    undefined
)

export const trait_pDEF_02 = new Trait(
    TraitEnum.trait_pDEF_02,
    `+ 2 pDEF`,
    `Increases your physical defense by 2 points`,
    new PassiveStatusBonus({
        pDEF: 2
    }),
    undefined
)

export const trait_pDEF_03 = new Trait(
    TraitEnum.trait_pDEF_03,
    `+ 3 pDEF`,
    `Increases your physical defense by 3 points`,
    new PassiveStatusBonus({
        pDEF: 3
    }),
    undefined
)

export const trait_pDEF_04 = new Trait(
    TraitEnum.trait_pDEF_04,
    `+ 4 pDEF`,
    `Increases your physical defense by 4 points`,
    new PassiveStatusBonus({
        pDEF: 4
    }),
    undefined
)

export const trait_pDEF_05 = new Trait(
    TraitEnum.trait_pDEF_05,
    `+ 5 pDEF`,
    `Increases your physical defense by 5 points`,
    new PassiveStatusBonus({
        pDEF: 5
    }),
    undefined
)

export const trait_mATK_01 = new Trait(
    TraitEnum.trait_mATK_01,
    `+ 1 mATK`,
    `Increases your magical attack by 1 point`,
    new PassiveStatusBonus({
        mATK: 1
    }),
    undefined
)

export const trait_mATK_02 = new Trait(
    TraitEnum.trait_mATK_02,
    `+ 2 mATK`,
    `Increases your magical attack by 2 points`,
    new PassiveStatusBonus({
        mATK: 2
    }),
    undefined
)

export const trait_mATK_03 = new Trait(
    TraitEnum.trait_mATK_03,
    `+ 3 mATK`,
    `Increases your magical attack by 3 points`,
    new PassiveStatusBonus({
        mATK: 3
    }),
    undefined
)

export const trait_mATK_04 = new Trait(
    TraitEnum.trait_mATK_04,
    `+ 4 mATK`,
    `Increases your magical attack by 4 points`,
    new PassiveStatusBonus({
        mATK: 4
    }),
    undefined
)

export const trait_mATK_05 = new Trait(
    TraitEnum.trait_mATK_05,
    `+ 5 mATK`,
    `Increases your magical attack by 5 points`,
    new PassiveStatusBonus({
        mATK: 5
    }),
    undefined
)

export const trait_mHIT_01 = new Trait(
    TraitEnum.trait_mHIT_01,
    `+ 1 mHIT`,
    `Increases your magical hit by 1 point`,
    new PassiveStatusBonus({
        mHIT: 1
    }),
    undefined
)

export const trait_mHIT_02 = new Trait(
    TraitEnum.trait_mHIT_02,
    `+ 2 mHIT`,
    `Increases your magical hit by 2 points`,
    new PassiveStatusBonus({
        mHIT: 2
    }),
    undefined
)

export const trait_mHIT_03 = new Trait(
    TraitEnum.trait_mHIT_03,
    `+ 3 mHIT`,
    `Increases your magical hit by 3 points`,
    new PassiveStatusBonus({
        mHIT: 3
    }),
    undefined
)

export const trait_mHIT_04 = new Trait(
    TraitEnum.trait_mHIT_04,
    `+ 4 mHIT`,
    `Increases your magical hit by 4 points`,
    new PassiveStatusBonus({
        mHIT: 4
    }),
    undefined
)

export const trait_mHIT_05 = new Trait(
    TraitEnum.trait_mHIT_05,
    `+ 5 mHIT`,
    `Increases your magical hit by 5 points`,
    new PassiveStatusBonus({
        mHIT: 5
    }),
    undefined
)

export const trait_mCRT_01 = new Trait(
    TraitEnum.trait_mCRT_01,
    `+ 1 mCRT`,
    `Increases your magical critical by 1 point`,
    new PassiveStatusBonus({
        mCRT: 1
    }),
    undefined
)

export const trait_mCRT_02 = new Trait(
    TraitEnum.trait_mCRT_02,
    `+ 2 mCRT`,
    `Increases your magical critical by 2 points`,
    new PassiveStatusBonus({
        mCRT: 2
    }),
    undefined
)

export const trait_mCRT_03 = new Trait(
    TraitEnum.trait_mCRT_03,
    `+ 3 mCRT`,
    `Increases your magical critical by 3 points`,
    new PassiveStatusBonus({
        mCRT: 3
    }),
    undefined
)

export const trait_mCRT_04 = new Trait(
    TraitEnum.trait_mCRT_04,
    `+ 4 mCRT`,
    `Increases your magical critical by 4 points`,
    new PassiveStatusBonus({
        mCRT: 4
    }),
    undefined
)

export const trait_mCRT_05 = new Trait(
    TraitEnum.trait_mCRT_05,
    `+ 5 mCRT`,
    `Increases your magical critical by 5 points`,
    new PassiveStatusBonus({
        mCRT: 5
    }),
    undefined
)

export const trait_mDEF_01 = new Trait(
    TraitEnum.trait_mDEF_01,
    `+ 1 mDEF`,
    `Increases your magical defense by 1 point`,
    new PassiveStatusBonus({
        mDEF: 1
    }),
    undefined
)

export const trait_mDEF_02 = new Trait(
    TraitEnum.trait_mDEF_02,
    `+ 2 mDEF`,
    `Increases your magical defense by 2 points`,
    new PassiveStatusBonus({
        mDEF: 2
    }),
    undefined
)

export const trait_mDEF_03 = new Trait(
    TraitEnum.trait_mDEF_03,
    `+ 3 mDEF`,
    `Increases your magical defense by 3 points`,
    new PassiveStatusBonus({
        mDEF: 3
    }),
    undefined
)

export const trait_mDEF_04 = new Trait(
    TraitEnum.trait_mDEF_04,
    `+ 4 mDEF`,
    `Increases your magical defense by 4 points`,
    new PassiveStatusBonus({
        mDEF: 4
    }),
    undefined
)

export const trait_mDEF_05 = new Trait(
    TraitEnum.trait_mDEF_05,
    `+ 5 mDEF`,
    `Increases your magical defense by 5 points`,
    new PassiveStatusBonus({
        mDEF: 5
    }),
    undefined
)

export const trait_dodge_01 = new Trait(
    TraitEnum.trait_dodge_01,
    `+ 1 dodge`,
    `Increases your dodge by 1 point`,
    new PassiveStatusBonus({
        dodge: 1
    }),
    undefined
)

export const trait_dodge_02 = new Trait(
    TraitEnum.trait_dodge_02,
    `+ 2 dodge`,
    `Increases your dodge by 2 points`,
    new PassiveStatusBonus({
        dodge: 2
    }),
    undefined
)

export const trait_dodge_03 = new Trait(
    TraitEnum.trait_dodge_03,
    `+ 3 dodge`,
    `Increases your dodge by 3 points`,
    new PassiveStatusBonus({
        dodge: 3
    }),
    undefined
)

export const trait_dodge_04 = new Trait(
    TraitEnum.trait_dodge_04,
    `+ 4 dodge`,
    `Increases your dodge by 4 points`,
    new PassiveStatusBonus({
        dodge: 4
    }),
    undefined
)

export const trait_dodge_05 = new Trait(
    TraitEnum.trait_dodge_05,
    `+ 5 dodge`,
    `Increases your dodge by 5 points`,
    new PassiveStatusBonus({
        dodge: 5
    }),
    undefined
)

//negative battler traits(pATK, pHIT, pCRT, pDEF, mATK, mHIT, mCRT, mDEF, dodge)
export const trait_pATK_01_neg = new Trait(
    TraitEnum.trait_pATK_01_neg,
    `- 1 pATK`,
    `Decreases your physical attack by 1 point`,
    new PassiveStatusBonus({
        pATK: -1
    }),
    undefined
)

export const trait_pATK_02_neg = new Trait(
    TraitEnum.trait_pATK_02_neg,
    `- 2 pATK`,
    `Decreases your physical attack by 2 points`,
    new PassiveStatusBonus({
        pATK: -2
    }),
    undefined
)

export const trait_pATK_03_neg = new Trait(
    TraitEnum.trait_pATK_03_neg,
    `- 3 pATK`,
    `Decreases your physical attack by 3 points`,
    new PassiveStatusBonus({
        pATK: -3
    }),
    undefined
)

export const trait_pATK_04_neg = new Trait(
    TraitEnum.trait_pATK_04_neg,
    `- 4 pATK`,
    `Decreases your physical attack by 4 points`,
    new PassiveStatusBonus({
        pATK: -4
    }),
    undefined
)

export const trait_pATK_05_neg = new Trait(
    TraitEnum.trait_pATK_05_neg,
    `- 5 pATK`,
    `Decreases your physical attack by 5 points`,
    new PassiveStatusBonus({
        pATK: -5
    }),
    undefined
)

export const trait_pHIT_01_neg = new Trait(
    TraitEnum.trait_pHIT_01_neg,
    `- 1 pHIT`,
    `Decreases your physical hit by 1 point`,
    new PassiveStatusBonus({
        pHIT: -1
    }),
    undefined
)

export const trait_pHIT_02_neg = new Trait(
    TraitEnum.trait_pHIT_02_neg,
    `- 2 pHIT`,
    `Decreases your physical hit by 2 points`,
    new PassiveStatusBonus({
        pHIT: -2
    }),
    undefined
)
export const trait_pHIT_03_neg = new Trait(
    TraitEnum.trait_pHIT_03_neg,
    `- 3 pHIT`,
    `Decreases your physical hit by 3 points`,
    new PassiveStatusBonus({
        pHIT: -3
    }),
    undefined
)
export const trait_pHIT_04_neg = new Trait(
    TraitEnum.trait_pHIT_04_neg,
    `- 4 pHIT`,
    `Decreases your physical hit by 4 points`,
    new PassiveStatusBonus({
        pHIT: -4
    }),
    undefined
)
export const trait_pHIT_05_neg = new Trait(
    TraitEnum.trait_pHIT_05_neg,
    `- 5 pHIT`,
    `Decreases your physical hit by 5 points`,
    new PassiveStatusBonus({
        pHIT: -5
    }),
    undefined
)

export const trait_pCRT_01_neg = new Trait(
    TraitEnum.trait_pCRT_01_neg,
    `- 1 pCRT`,
    `Decreases your physical critical by 1 point`,
    new PassiveStatusBonus({
        pCRT: -1
    }),
    undefined
)

export const trait_pCRT_02_neg = new Trait(
    TraitEnum.trait_pCRT_02_neg,
    `- 2 pCRT`,
    `Decreases your physical critical by 2 points`,
    new PassiveStatusBonus({
        pCRT: -2
    }),
    undefined
)

export const trait_pCRT_03_neg = new Trait(
    TraitEnum.trait_pCRT_03_neg,
    `- 3 pCRT`,
    `Decreases your physical critical by 3 points`,
    new PassiveStatusBonus({
        pCRT: -3
    }),
    undefined
)

export const trait_pCRT_04_neg = new Trait(
    TraitEnum.trait_pCRT_04_neg,
    `- 4 pCRT`,
    `Decreases your physical critical by 4 points`,
    new PassiveStatusBonus({
        pCRT: -4
    }),
    undefined
)

export const trait_pCRT_05_neg = new Trait(
    TraitEnum.trait_pCRT_05_neg,
    `- 5 pCRT`,
    `Decreases your physical critical by 5 points`,
    new PassiveStatusBonus({
        pCRT: -5
    }),
    undefined
)

export const trait_pDEF_01_neg = new Trait(
    TraitEnum.trait_pDEF_01_neg,
    `- 1 pDEF`,
    `Decreases your physical defense by 1 point`,
    new PassiveStatusBonus({
        pDEF: -1
    }),
    undefined
)

export const trait_pDEF_02_neg = new Trait(
    TraitEnum.trait_pDEF_02_neg,
    `- 2 pDEF`,
    `Decreases your physical defense by 2 points`,
    new PassiveStatusBonus({
        pDEF: -2
    }),
    undefined
)

export const trait_pDEF_03_neg = new Trait(
    TraitEnum.trait_pDEF_03_neg,
    `- 3 pDEF`,
    `Decreases your physical defense by 3 points`,
    new PassiveStatusBonus({
        pDEF: -3
    }),
    undefined
)

export const trait_pDEF_04_neg = new Trait(
    TraitEnum.trait_pDEF_04_neg,
    `- 4 pDEF`,
    `Decreases your physical defense by 4 points`,
    new PassiveStatusBonus({
        pDEF: -4
    }),
    undefined
)

export const trait_pDEF_05_neg = new Trait(
    TraitEnum.trait_pDEF_05_neg,
    `- 5 pDEF`,
    `Decreases your physical defense by 5 points`,
    new PassiveStatusBonus({
        pDEF: -5
    }),
    undefined
)

export const trait_mATK_01_neg = new Trait(
    TraitEnum.trait_mATK_01_neg,
    `- 1 mATK`,
    `Decreases your magical attack by 1 point`,
    new PassiveStatusBonus({
        mATK: -1
    }),
    undefined
)

export const trait_mATK_02_neg = new Trait(
    TraitEnum.trait_mATK_02_neg,
    `- 2 mATK`,
    `Decreases your magical attack by 2 points`,
    new PassiveStatusBonus({
        mATK: -2
    }),
    undefined
)

export const trait_mATK_03_neg = new Trait(
    TraitEnum.trait_mATK_03_neg,
    `- 3 mATK`,
    `Decreases your magical attack by 3 points`,
    new PassiveStatusBonus({
        mATK: -3
    }),
    undefined
)

export const trait_mATK_04_neg = new Trait(
    TraitEnum.trait_mATK_04_neg,
    `- 4 mATK`,
    `Decreases your magical attack by 4 points`,
    new PassiveStatusBonus({
        mATK: -4
    }),
    undefined
)

export const trait_mATK_05_neg = new Trait(
    TraitEnum.trait_mATK_05_neg,
    `- 5 mATK`,
    `Decreases your magical attack by 5 points`,
    new PassiveStatusBonus({
        mATK: -5
    }),
    undefined
)

export const trait_mHIT_01_neg = new Trait(
    TraitEnum.trait_mHIT_01_neg,
    `- 1 mHIT`,
    `Decreases your magical hit by 1 point`,
    new PassiveStatusBonus({
        mHIT: -1
    }),
    undefined
)

export const trait_mHIT_02_neg = new Trait(
    TraitEnum.trait_mHIT_02_neg,
    `- 2 mHIT`,
    `Decreases your magical hit by 2 points`,
    new PassiveStatusBonus({
        mHIT: -2
    }),
    undefined
)

export const trait_mHIT_03_neg = new Trait(
    TraitEnum.trait_mHIT_03_neg,
    `- 3 mHIT`,
    `Decreases your magical hit by 3 points`,
    new PassiveStatusBonus({
        mHIT: -3
    }),
    undefined
)

export const trait_mHIT_04_neg = new Trait(
    TraitEnum.trait_mHIT_04_neg,
    `- 4 mHIT`,
    `Decreases your magical hit by 4 points`,
    new PassiveStatusBonus({
        mHIT: -4
    }),
    undefined
)

export const trait_mHIT_05_neg = new Trait(
    TraitEnum.trait_mHIT_05_neg,
    `- 5 mHIT`,
    `Decreases your magical hit by 5 points`,
    new PassiveStatusBonus({
        mHIT: -5
    }),
    undefined
)

export const trait_mCRT_01_neg = new Trait(
    TraitEnum.trait_mCRT_01_neg,
    `- 1 mCRT`,
    `Decreases your magical critical by 1 point`,
    new PassiveStatusBonus({
        mCRT: -1
    }),
    undefined
)

export const trait_mCRT_02_neg = new Trait(
    TraitEnum.trait_mCRT_02_neg,
    `- 2 mCRT`,
    `Decreases your magical critical by 2 points`,
    new PassiveStatusBonus({
        mCRT: -2
    }),
    undefined
)

export const trait_mCRT_03_neg = new Trait(
    TraitEnum.trait_mCRT_03_neg,
    `- 3 mCRT`,
    `Decreases your magical critical by 3 points`,
    new PassiveStatusBonus({
        mCRT: -3
    }),
    undefined
)

export const trait_mCRT_04_neg = new Trait(
    TraitEnum.trait_mCRT_04_neg,
    `- 4 mCRT`,
    `Decreases your magical critical by 4 points`,
    new PassiveStatusBonus({
        mCRT: -4
    }),
    undefined
)

export const trait_mCRT_05_neg = new Trait(
    TraitEnum.trait_mCRT_05_neg,
    `- 5 mCRT`,
    `Decreases your magical critical by 5 points`,
    new PassiveStatusBonus({
        mCRT: -5
    }),
    undefined
)

export const trait_mDEF_01_neg = new Trait(
    TraitEnum.trait_mDEF_01_neg,
    `- 1 mDEF`,
    `Decreases your magical defense by 1 point`,
    new PassiveStatusBonus({
        mDEF: -1
    }),
    undefined
)

export const trait_mDEF_02_neg = new Trait(
    TraitEnum.trait_mDEF_02_neg,
    `- 2 mDEF`,
    `Decreases your magical defense by 2 points`,
    new PassiveStatusBonus({
        mDEF: -2
    }),
    undefined
)

export const trait_mDEF_03_neg = new Trait(
    TraitEnum.trait_mDEF_03_neg,
    `- 3 mDEF`,
    `Decreases your magical defense by 3 points`,
    new PassiveStatusBonus({
        mDEF: -3
    }),
    undefined
)

export const trait_mDEF_04_neg = new Trait(
    TraitEnum.trait_mDEF_04_neg,
    `- 4 mDEF`,
    `Decreases your magical defense by 4 points`,
    new PassiveStatusBonus({
        mDEF: -4
    }),
    undefined
)

export const trait_mDEF_05_neg = new Trait(
    TraitEnum.trait_mDEF_05_neg,
    `- 5 mDEF`,
    `Decreases your magical defense by 5 points`,
    new PassiveStatusBonus({
        mDEF: -5
    }),
    undefined
)

export const trait_dodge_01_neg = new Trait(
    TraitEnum.trait_dodge_01_neg,
    `- 1 dodge`,
    `Decreases your dodge by 1 point`,
    new PassiveStatusBonus({
        dodge: -1
    }),
    undefined
)

export const trait_dodge_02_neg = new Trait(
    TraitEnum.trait_dodge_02_neg,
    `- 2 dodge`,
    `Decreases your dodge by 2 points`,
    new PassiveStatusBonus({
        dodge: -2
    }),
    undefined
)

export const trait_dodge_03_neg = new Trait(
    TraitEnum.trait_dodge_03_neg,
    `- 3 dodge`,
    `Decreases your dodge by 3 points`,
    new PassiveStatusBonus({
        dodge: -3
    }),
    undefined
)

export const trait_dodge_04_neg = new Trait(
    TraitEnum.trait_dodge_04_neg,
    `- 4 dodge`,
    `Decreases your dodge by 4 points`,
    new PassiveStatusBonus({
        dodge: -4
    }),
    undefined
)

export const trait_dodge_05_neg = new Trait(
    TraitEnum.trait_dodge_05_neg,
    `- 5 dodge`,
    `Decreases your dodge by 5 points`,
    new PassiveStatusBonus({
        dodge: -5
    }),
    undefined
)

//elemental traits


//additional elemental traits
export const trait_fire_01 = new Trait(
    TraitEnum.trait_fire_01,
    `+ 1 fire`,
    `Increases your fire by 1 point`,
    new PassiveStatusBonus({
        fire: 1
    }),
    undefined
)
export const trait_fire_02 = new Trait(
    TraitEnum.trait_fire_02,
    `+ 2 fire`,
    `Increases your fire by 2 points`,
    new PassiveStatusBonus({
        fire: 2
    }),
    undefined
)
export const trait_fire_03 = new Trait(
    TraitEnum.trait_fire_03,
    `+ 3 fire`,
    `Increases your fire by 3 points`,
    new PassiveStatusBonus({
        fire: 3
    }),
    undefined
)
export const trait_fire_04 = new Trait(
    TraitEnum.trait_fire_04,
    `+ 4 fire`,
    `Increases your fire by 4 points`,
    new PassiveStatusBonus({
        fire: 4
    }),
    undefined
)
export const trait_fire_05 = new Trait(
    TraitEnum.trait_fire_05,
    `+ 5 fire`,
    `Increases your fire by 5 points`,
    new PassiveStatusBonus({
        fire: 5
    }),
    undefined
)
export const trait_water_01 = new Trait(
    TraitEnum.trait_water_01,
    `+ 1 water`,
    `Increases your water by 1 point`,
    new PassiveStatusBonus({
        water: 1
    }),
    undefined
)
export const trait_water_02 = new Trait(
    TraitEnum.trait_water_02,
    `+ 2 water`,
    `Increases your water by 2 points`,
    new PassiveStatusBonus({
        water: 2
    }),
    undefined
)
export const trait_water_03 = new Trait(
    TraitEnum.trait_water_03,
    `+ 3 water`,
    `Increases your water by 3 points`,
    new PassiveStatusBonus({
        water: 3
    }),
    undefined
)
export const trait_water_04 = new Trait(
    TraitEnum.trait_water_04,
    `+ 4 water`,
    `Increases your water by 4 points`,
    new PassiveStatusBonus({
        water: 4
    }),
    undefined
)
export const trait_water_05 = new Trait(
    TraitEnum.trait_water_05,
    `+ 5 water`,
    `Increases your water by 5 points`,
    new PassiveStatusBonus({
        water: 5
    }),
    undefined
)
export const trait_air_01 = new Trait(
    TraitEnum.trait_air_01,
    `+ 1 air`,
    `Increases your air by 1 point`,
    new PassiveStatusBonus({
        air: 1
    }),
    undefined
)
export const trait_air_02 = new Trait(
    TraitEnum.trait_air_02,
    `+ 2 air`,
    `Increases your air by 2 points`,
    new PassiveStatusBonus({
        air: 2
    }),
    undefined
)
export const trait_air_03 = new Trait(
    TraitEnum.trait_air_03,
    `+ 3 air`,
    `Increases your air by 3 points`,
    new PassiveStatusBonus({
        air: 3
    }),
    undefined
)
export const trait_air_04 = new Trait(
    TraitEnum.trait_air_04,
    `+ 4 air`,
    `Increases your air by 4 points`,
    new PassiveStatusBonus({
        air: 4
    }),
    undefined
)
export const trait_air_05 = new Trait(
    TraitEnum.trait_air_05,
    `+ 5 air`,
    `Increases your air by 5 points`,
    new PassiveStatusBonus({
        air: 5
    }),
    undefined
)
export const trait_geo_01 = new Trait(
    TraitEnum.trait_geo_01,
    `+ 1 geo`,
    `Increases your geo by 1 point`,
    new PassiveStatusBonus({
        geo: 1
    }),
    undefined
)
export const trait_geo_02 = new Trait(
    TraitEnum.trait_geo_02,
    `+ 2 geo`,
    `Increases your geo by 2 points`,
    new PassiveStatusBonus({
        geo: 2
    }),
    undefined
)
export const trait_geo_03 = new Trait(
    TraitEnum.trait_geo_03,
    `+ 3 geo`,
    `Increases your geo by 3 points`,
    new PassiveStatusBonus({
        geo: 3
    }),
    undefined
)
export const trait_geo_04 = new Trait(
    TraitEnum.trait_geo_04,
    `+ 4 geo`,
    `Increases your geo by 4 points`,
    new PassiveStatusBonus({
        geo: 4
    }),
    undefined
)
export const trait_geo_05 = new Trait(
    TraitEnum.trait_geo_05,
    `+ 5 geo`,
    `Increases your geo by 5 points`,
    new PassiveStatusBonus({
        geo: 5
    }),
    undefined
)
export const trait_order_01 = new Trait(
    TraitEnum.trait_order_01,
    `+ 1 order`,
    `Increases your order by 1 point`,
    new PassiveStatusBonus({
        order: 1
    }),
    undefined
)
export const trait_order_02 = new Trait(
    TraitEnum.trait_order_02,
    `+ 2 order`,
    `Increases your order by 2 points`,
    new PassiveStatusBonus({
        order: 2
    }),
    undefined
)
export const trait_order_03 = new Trait(
    TraitEnum.trait_order_03,
    `+ 3 order`,
    `Increases your order by 3 points`,
    new PassiveStatusBonus({
        order: 3
    }),
    undefined
)
export const trait_order_04 = new Trait(
    TraitEnum.trait_order_04,
    `+ 4 order`,
    `Increases your order by 4 points`,
    new PassiveStatusBonus({
        order: 4
    }),
    undefined
)
export const trait_order_05 = new Trait(
    TraitEnum.trait_order_05,
    `+ 5 order`,
    `Increases your order by 5 points`,
    new PassiveStatusBonus({
        order: 5
    }),
    undefined
)
export const trait_chaos_01 = new Trait(
    TraitEnum.trait_chaos_01,
    `+ 1 chaos`,
    `Increases your chaos by 1 point`,
    new PassiveStatusBonus({
        chaos: 1
    }),
    undefined
)
export const trait_chaos_02 = new Trait(
    TraitEnum.trait_chaos_02,
    `+ 2 chaos`,
    `Increases your chaos by 2 points`,
    new PassiveStatusBonus({
        chaos: 2
    }),
    undefined
)
export const trait_chaos_03 = new Trait(
    TraitEnum.trait_chaos_03,
    `+ 3 chaos`,
    `Increases your chaos by 3 points`,
    new PassiveStatusBonus({
        chaos: 3
    }),
    undefined
)
export const trait_chaos_04 = new Trait(
    TraitEnum.trait_chaos_04,
    `+ 4 chaos`,
    `Increases your chaos by 4 points`,
    new PassiveStatusBonus({
        chaos: 4
    }),
    undefined
)
export const trait_chaos_05 = new Trait(
    TraitEnum.trait_chaos_05,
    `+ 5 chaos`,
    `Increases your chaos by 5 points`,
    new PassiveStatusBonus({
        chaos: 5
    }),
    undefined
)
//negative elemental traits
export const trait_fire_01_neg = new Trait(
    TraitEnum.trait_fire_01_neg,
    `- 1 fire`,
    `Decreases your fire by 1 point`,
    new PassiveStatusBonus({
        fire: -1
    }),
    undefined
)
export const trait_fire_02_neg = new Trait(
    TraitEnum.trait_fire_02_neg,
    `- 2 fire`,
    `Decreases your fire by 2 points`,
    new PassiveStatusBonus({
        fire: -2
    }),
    undefined
)
export const trait_fire_03_neg = new Trait(
    TraitEnum.trait_fire_03_neg,
    `- 3 fire`,
    `Decreases your fire by 3 points`,
    new PassiveStatusBonus({
        fire: -3
    }),
    undefined
)
export const trait_fire_04_neg = new Trait(
    TraitEnum.trait_fire_04_neg,
    `- 4 fire`,
    `Decreases your fire by 4 points`,
    new PassiveStatusBonus({
        fire: -4
    }),
    undefined
)
export const trait_fire_05_neg = new Trait(
    TraitEnum.trait_fire_05_neg,
    `- 5 fire`,
    `Decreases your fire by 5 points`,
    new PassiveStatusBonus({
        fire: -5
    }),
    undefined
)
export const trait_water_01_neg = new Trait(
    TraitEnum.trait_water_01_neg,
    `- 1 water`,
    `Decreases your water by 1 point`,
    new PassiveStatusBonus({
        water: -1
    }),
    undefined
)
export const trait_water_02_neg = new Trait(
    TraitEnum.trait_water_02_neg,
    `- 2 water`,
    `Decreases your water by 2 points`,
    new PassiveStatusBonus({
        water: -2
    }),
    undefined
)
export const trait_water_03_neg = new Trait(
    TraitEnum.trait_water_03_neg,
    `- 3 water`,
    `Decreases your water by 3 points`,
    new PassiveStatusBonus({
        water: -3
    }),
    undefined
)
export const trait_water_04_neg = new Trait(
    TraitEnum.trait_water_04_neg,
    `- 4 water`,
    `Decreases your water by 4 points`,
    new PassiveStatusBonus({
        water: -4
    }),
    undefined
)
export const trait_water_05_neg = new Trait(
    TraitEnum.trait_water_05_neg,
    `- 5 water`,
    `Decreases your water by 5 points`,
    new PassiveStatusBonus({
        water: -5
    }),
    undefined
)
export const trait_air_01_neg = new Trait(
    TraitEnum.trait_air_01_neg,
    `- 1 air`,
    `Decreases your air by 1 point`,
    new PassiveStatusBonus({
        air: -1
    }),
    undefined
)
export const trait_air_02_neg = new Trait(
    TraitEnum.trait_air_02_neg,
    `- 2 air`,
    `Decreases your air by 2 points`,
    new PassiveStatusBonus({
        air: -2
    }),
    undefined
)
export const trait_air_03_neg = new Trait(
    TraitEnum.trait_air_03_neg,
    `- 3 air`,
    `Decreases your air by 3 points`,
    new PassiveStatusBonus({
        air: -3
    }),
    undefined
)
export const trait_air_04_neg = new Trait(
    TraitEnum.trait_air_04_neg,
    `- 4 air`,
    `Decreases your air by 4 points`,
    new PassiveStatusBonus({
        air: -4
    }),
    undefined
)
export const trait_air_05_neg = new Trait(
    TraitEnum.trait_air_05_neg,
    `- 5 air`,
    `Decreases your air by 5 points`,
    new PassiveStatusBonus({
        air: -5
    }),
    undefined
)
export const trait_geo_01_neg = new Trait(
    TraitEnum.trait_geo_01_neg,
    `- 1 geo`,
    `Decreases your geo by 1 point`,
    new PassiveStatusBonus({
        geo: -1
    }),
    undefined
)
export const trait_geo_02_neg = new Trait(
    TraitEnum.trait_geo_02_neg,
    `- 2 geo`,
    `Decreases your geo by 2 points`,
    new PassiveStatusBonus({
        geo: -2
    }),
    undefined
)
export const trait_geo_03_neg = new Trait(
    TraitEnum.trait_geo_03_neg,
    `- 3 geo`,
    `Decreases your geo by 3 points`,
    new PassiveStatusBonus({
        geo: -3
    }),
    undefined
)
export const trait_geo_04_neg = new Trait(
    TraitEnum.trait_geo_04_neg,
    `- 4 geo`,
    `Decreases your geo by 4 points`,
    new PassiveStatusBonus({
        geo: -4
    }),
    undefined
)
export const trait_geo_05_neg = new Trait(
    TraitEnum.trait_geo_05_neg,
    `- 5 geo`,
    `Decreases your geo by 5 points`,
    new PassiveStatusBonus({
        geo: -5
    }),
    undefined
)
export const trait_order_01_neg = new Trait(
    TraitEnum.trait_order_01_neg,
    `- 1 order`,
    `Decreases your order by 1 point`,
    new PassiveStatusBonus({
        order: -1
    }),
    undefined
)
export const trait_order_02_neg = new Trait(
    TraitEnum.trait_order_02_neg,
    `- 2 order`,
    `Decreases your order by 2 points`,
    new PassiveStatusBonus({
        order: -2
    }),
    undefined
)
export const trait_order_03_neg = new Trait(
    TraitEnum.trait_order_03_neg,
    `- 3 order`,
    `Decreases your order by 3 points`,
    new PassiveStatusBonus({
        order: -3
    }),
    undefined
)
export const trait_order_04_neg = new Trait(
    TraitEnum.trait_order_04_neg,
    `- 4 order`,
    `Decreases your order by 4 points`,
    new PassiveStatusBonus({
        order: -4
    }),
    undefined
)
export const trait_order_05_neg = new Trait(
    TraitEnum.trait_order_05_neg,
    `- 5 order`,
    `Decreases your order by 5 points`,
    new PassiveStatusBonus({
        order: -5
    }),
    undefined
)
export const trait_chaos_01_neg = new Trait(
    TraitEnum.trait_chaos_01_neg,
    `- 1 chaos`,
    `Decreases your chaos by 1 point`,
    new PassiveStatusBonus({
        chaos: -1
    }),
    undefined
)
export const trait_chaos_02_neg = new Trait(
    TraitEnum.trait_chaos_02_neg,
    `- 2 chaos`,
    `Decreases your chaos by 2 points`,
    new PassiveStatusBonus({
        chaos: -2
    }),
    undefined
)
export const trait_chaos_03_neg = new Trait(
    TraitEnum.trait_chaos_03_neg,
    `- 3 chaos`,
    `Decreases your chaos by 3 points`,
    new PassiveStatusBonus({
        chaos: -3
    }),
    undefined
)
export const trait_chaos_04_neg = new Trait(
    TraitEnum.trait_chaos_04_neg,
    `- 4 chaos`,
    `Decreases your chaos by 4 points`,
    new PassiveStatusBonus({
        chaos: -4
    }),
    undefined
)
export const trait_chaos_05_neg = new Trait(
    TraitEnum.trait_chaos_05_neg,
    `- 5 chaos`,
    `Decreases your chaos by 5 points`,
    new PassiveStatusBonus({
        chaos: -5
    }),
    undefined
)


//proficiency Traits
//additional proficiency traits
export const trait_bareHand_01 = new Trait(
    TraitEnum.trait_bareHand_01,
    `+ 1 bareHand`,
    `Increases your barehand by 1 point`,
    new PassiveStatusBonus({
        bareHand: 1
    }),
    undefined
)

export const trait_bareHand_02 = new Trait(
    TraitEnum.trait_bareHand_02,
    `+ 2 bareHand`,
    `Increases your barehand by 2 points`,
    new PassiveStatusBonus({
        bareHand: 2
    }),
    undefined
)

export const trait_bareHand_03 = new Trait(
    TraitEnum.trait_bareHand_03,
    `+ 3 bareHand`,
    `Increases your barehand by 3 points`,
    new PassiveStatusBonus({
        bareHand: 3
    }),
    undefined
)

export const trait_bareHand_04 = new Trait(
    TraitEnum.trait_bareHand_04,
    `+ 4 bareHand`,
    `Increases your barehand by 4 points`,
    new PassiveStatusBonus({
        bareHand: 4
    }),
    undefined
)

export const trait_bareHand_05 = new Trait(
    TraitEnum.trait_bareHand_05,
    `+ 5 bareHand`,
    `Increases your barehand by 5 points`,
    new PassiveStatusBonus({
        bareHand: 5
    }),
    undefined
)

export const trait_sword_01 = new Trait(
    TraitEnum.trait_sword_01,
    `+ 1 sword`,
    `Increases your sword by 1 point`,
    new PassiveStatusBonus({
        sword: 1
    }),
    undefined
)

export const trait_sword_02 = new Trait(
    TraitEnum.trait_sword_02,
    `+ 2 sword`,
    `Increases your sword by 2 points`,
    new PassiveStatusBonus({
        sword: 2
    }),
    undefined
)

export const trait_sword_03 = new Trait(
    TraitEnum.trait_sword_03,
    `+ 3 sword`,
    `Increases your sword by 3 points`,
    new PassiveStatusBonus({
        sword: 3
    }),
    undefined
)

export const trait_sword_04 = new Trait(
    TraitEnum.trait_sword_04,
    `+ 4 sword`,
    `Increases your sword by 4 points`,
    new PassiveStatusBonus({
        sword: 4
    }),
    undefined
)

export const trait_sword_05 = new Trait(
    TraitEnum.trait_sword_05,
    `+ 5 sword`,
    `Increases your sword by 5 points`,
    new PassiveStatusBonus({
        sword: 5
    }),
    undefined
)

export const trait_blade_01 = new Trait(
    TraitEnum.trait_blade_01,
    `+ 1 blade`,
    `Increases your blade by 1 point`,
    new PassiveStatusBonus({
        blade: 1
    }),
    undefined
)

export const trait_blade_02 = new Trait(
    TraitEnum.trait_blade_02,
    `+ 2 blade`,
    `Increases your blade by 2 points`,
    new PassiveStatusBonus({
        blade: 2
    }),
    undefined
)

export const trait_blade_03 = new Trait(
    TraitEnum.trait_blade_03,
    `+ 3 blade`,
    `Increases your blade by 3 points`,
    new PassiveStatusBonus({
        blade: 3
    }),
    undefined
)

export const trait_blade_04 = new Trait(
    TraitEnum.trait_blade_04,
    `+ 4 blade`,
    `Increases your blade by 4 points`,
    new PassiveStatusBonus({
        blade: 4
    }),
    undefined
)

export const trait_blade_05 = new Trait(
    TraitEnum.trait_blade_05,
    `+ 5 blade`,
    `Increases your blade by 5 points`,
    new PassiveStatusBonus({
        blade: 5
    }),
    undefined
)

export const trait_spear_01 = new Trait(
    TraitEnum.trait_spear_01,
    `+ 1 spear`,
    `Increases your spear by 1 point`,
    new PassiveStatusBonus({
        spear: 1
    }),
    undefined
)

export const trait_spear_02 = new Trait(
    TraitEnum.trait_spear_02,
    `+ 2 spear`,
    `Increases your spear by 2 points`,
    new PassiveStatusBonus({
        spear: 2
    }),
    undefined
)

export const trait_spear_03 = new Trait(
    TraitEnum.trait_spear_03,
    `+ 3 spear`,
    `Increases your spear by 3 points`,
    new PassiveStatusBonus({
        spear: 3
    }),
    undefined
)

export const trait_spear_04 = new Trait(
    TraitEnum.trait_spear_04,
    `+ 4 spear`,
    `Increases your spear by 4 points`,
    new PassiveStatusBonus({
        spear: 4
    }),
    undefined
)

export const trait_spear_05 = new Trait(
    TraitEnum.trait_spear_05,
    `+ 5 spear`,
    `Increases your spear by 5 points`,
    new PassiveStatusBonus({
        spear: 5
    }),
    undefined
)

export const trait_axe_01 = new Trait(
    TraitEnum.trait_axe_01,
    `+ 1 axe`,
    `Increases your axe by 1 point`,
    new PassiveStatusBonus({
        axe: 1
    }),
    undefined
)

export const trait_axe_02 = new Trait(
    TraitEnum.trait_axe_02,
    `+ 2 axe`,
    `Increases your axe by 2 points`,
    new PassiveStatusBonus({
        axe: 2
    }),
    undefined
)

export const trait_axe_03 = new Trait(
    TraitEnum.trait_axe_03,
    `+ 3 axe`,
    `Increases your axe by 3 points`,
    new PassiveStatusBonus({
        axe: 3
    }),
    undefined
)

export const trait_axe_04 = new Trait(
    TraitEnum.trait_axe_04,
    `+ 4 axe`,
    `Increases your axe by 4 points`,
    new PassiveStatusBonus({
        axe: 4
    }),
    undefined
)

export const trait_axe_05 = new Trait(
    TraitEnum.trait_axe_05,
    `+ 5 axe`,
    `Increases your axe by 5 points`,
    new PassiveStatusBonus({
        axe: 5
    }),
    undefined
)

export const trait_bow_01 = new Trait(
    TraitEnum.trait_bow_01,
    `+ 1 bow`,
    `Increases your bow by 1 point`,
    new PassiveStatusBonus({
        bow: 1
    }),
    undefined
)

export const trait_bow_02 = new Trait(
    TraitEnum.trait_bow_02,
    `+ 2 bow`,
    `Increases your bow by 2 points`,
    new PassiveStatusBonus({
        bow: 2
    }),
    undefined
)

export const trait_bow_03 = new Trait(
    TraitEnum.trait_bow_03,
    `+ 3 bow`,
    `Increases your bow by 3 points`,
    new PassiveStatusBonus({
        bow: 3
    }),
    undefined
)

export const trait_bow_04 = new Trait(
    TraitEnum.trait_bow_04,
    `+ 4 bow`,
    `Increases your bow by 4 points`,
    new PassiveStatusBonus({
        bow: 4
    }),
    undefined
)

export const trait_bow_05 = new Trait(
    TraitEnum.trait_bow_05,
    `+ 5 bow`,
    `Increases your bow by 5 points`,
    new PassiveStatusBonus({
        bow: 5
    }),
    undefined
)

export const trait_dagger_01 = new Trait(
    TraitEnum.trait_dagger_01,
    `+ 1 dagger`,
    `Increases your dagger by 1 point`,
    new PassiveStatusBonus({
        dagger: 1
    }),
    undefined
)

export const trait_dagger_02 = new Trait(
    TraitEnum.trait_dagger_02,
    `+ 2 dagger`,
    `Increases your dagger by 2 points`,
    new PassiveStatusBonus({
        dagger: 2
    }),
    undefined
)

export const trait_dagger_03 = new Trait(
    TraitEnum.trait_dagger_03,
    `+ 3 dagger`,
    `Increases your dagger by 3 points`,
    new PassiveStatusBonus({
        dagger: 3
    }),
    undefined
)

export const trait_dagger_04 = new Trait(
    TraitEnum.trait_dagger_04,
    `+ 4 dagger`,
    `Increases your dagger by 4 points`,
    new PassiveStatusBonus({
        dagger: 4
    }),
    undefined
)

export const trait_dagger_05 = new Trait(
    TraitEnum.trait_dagger_05,
    `+ 5 dagger`,
    `Increases your dagger by 5 points`,
    new PassiveStatusBonus({
        dagger: 5
    }),
    undefined
)

export const trait_staff_01 = new Trait(
    TraitEnum.trait_staff_01,
    `+ 1 staff`,
    `Increases your staff by 1 point`,
    new PassiveStatusBonus({
        staff: 1
    }),
    undefined
)

export const trait_staff_02 = new Trait(
    TraitEnum.trait_staff_02,
    `+ 2 staff`,
    `Increases your staff by 2 points`,
    new PassiveStatusBonus({
        staff: 2
    }),
    undefined
)

export const trait_staff_03 = new Trait(
    TraitEnum.trait_staff_03,
    `+ 3 staff`,
    `Increases your staff by 3 points`,
    new PassiveStatusBonus({
        staff: 3
    }),
    undefined
)

export const trait_staff_04 = new Trait(
    TraitEnum.trait_staff_04,
    `+ 4 staff`,
    `Increases your staff by 4 points`,
    new PassiveStatusBonus({
        staff: 4
    }),
    undefined
)

export const trait_staff_05 = new Trait(
    TraitEnum.trait_staff_05,
    `+ 5 staff`,
    `Increases your staff by 5 points`,
    new PassiveStatusBonus({
        staff: 5
    }),
    undefined
)

export const trait_magicWand_01 = new Trait(
    TraitEnum.trait_magicWand_01,
    `+ 1 magicWand`,
    `Increases your magicwand by 1 point`,
    new PassiveStatusBonus({
        magicWand: 1
    }),
    undefined
)

export const trait_magicWand_02 = new Trait(
    TraitEnum.trait_magicWand_02,
    `+ 2 magicWand`,
    `Increases your magicwand by 2 points`,
    new PassiveStatusBonus({
        magicWand: 2
    }),
    undefined
)

export const trait_magicWand_03 = new Trait(
    TraitEnum.trait_magicWand_03,
    `+ 3 magicWand`,
    `Increases your magicwand by 3 points`,
    new PassiveStatusBonus({
        magicWand: 3
    }),
    undefined
)

export const trait_magicWand_04 = new Trait(
    TraitEnum.trait_magicWand_04,
    `+ 4 magicWand`,
    `Increases your magicwand by 4 points`,
    new PassiveStatusBonus({
        magicWand: 4
    }),
    undefined
)

export const trait_magicWand_05 = new Trait(
    TraitEnum.trait_magicWand_05,
    `+ 5 magicWand`,
    `Increases your magicwand by 5 points`,
    new PassiveStatusBonus({
        magicWand: 5
    }),
    undefined
)

export const trait_tome_01 = new Trait(
    TraitEnum.trait_tome_01,
    `+ 1 tome`,
    `Increases your tome by 1 point`,
    new PassiveStatusBonus({
        tome: 1
    }),
    undefined
)

export const trait_tome_02 = new Trait(
    TraitEnum.trait_tome_02,
    `+ 2 tome`,
    `Increases your tome by 2 points`,
    new PassiveStatusBonus({
        tome: 2
    }),
    undefined
)

export const trait_tome_03 = new Trait(
    TraitEnum.trait_tome_03,
    `+ 3 tome`,
    `Increases your tome by 3 points`,
    new PassiveStatusBonus({
        tome: 3
    }),
    undefined
)

export const trait_tome_04 = new Trait(
    TraitEnum.trait_tome_04,
    `+ 4 tome`,
    `Increases your tome by 4 points`,
    new PassiveStatusBonus({
        tome: 4
    }),
    undefined
)

export const trait_tome_05 = new Trait(
    TraitEnum.trait_tome_05,
    `+ 5 tome`,
    `Increases your tome by 5 points`,
    new PassiveStatusBonus({
        tome: 5
    }),
    undefined
)

export const trait_orb_01 = new Trait(
    TraitEnum.trait_orb_01,
    `+ 1 orb`,
    `Increases your orb by 1 point`,
    new PassiveStatusBonus({
        orb: 1
    }),
    undefined
)

export const trait_orb_02 = new Trait(
    TraitEnum.trait_orb_02,
    `+ 2 orb`,
    `Increases your orb by 2 points`,
    new PassiveStatusBonus({
        orb: 2
    }),
    undefined
)

export const trait_orb_03 = new Trait(
    TraitEnum.trait_orb_03,
    `+ 3 orb`,
    `Increases your orb by 3 points`,
    new PassiveStatusBonus({
        orb: 3
    }),
    undefined
)

export const trait_orb_04 = new Trait(
    TraitEnum.trait_orb_04,
    `+ 4 orb`,
    `Increases your orb by 4 points`,
    new PassiveStatusBonus({
        orb: 4
    }),
    undefined
)

export const trait_orb_05 = new Trait(
    TraitEnum.trait_orb_05,
    `+ 5 orb`,
    `Increases your orb by 5 points`,
    new PassiveStatusBonus({
        orb: 5
    }),
    undefined
)

export const trait_mace_01 = new Trait(
    TraitEnum.trait_mace_01,
    `+ 1 mace`,
    `Increases your mace by 1 point`,
    new PassiveStatusBonus({
        mace: 1
    }),
    undefined
)

export const trait_mace_02 = new Trait(
    TraitEnum.trait_mace_02,
    `+ 2 mace`,
    `Increases your mace by 2 points`,
    new PassiveStatusBonus({
        mace: 2
    }),
    undefined
)

export const trait_mace_03 = new Trait(
    TraitEnum.trait_mace_03,
    `+ 3 mace`,
    `Increases your mace by 3 points`,
    new PassiveStatusBonus({
        mace: 3
    }),
    undefined
)

export const trait_mace_04 = new Trait(
    TraitEnum.trait_mace_04,
    `+ 4 mace`,
    `Increases your mace by 4 points`,
    new PassiveStatusBonus({
        mace: 4
    }),
    undefined
)

export const trait_mace_05 = new Trait(
    TraitEnum.trait_mace_05,
    `+ 5 mace`,
    `Increases your mace by 5 points`,
    new PassiveStatusBonus({
        mace: 5
    }),
    undefined
)

export const trait_shield_01 = new Trait(
    TraitEnum.trait_shield_01,
    `+ 1 shield`,
    `Increases your shield by 1 point`,
    new PassiveStatusBonus({
        shield: 1
    }),
    undefined
)

export const trait_shield_02 = new Trait(
    TraitEnum.trait_shield_02,
    `+ 2 shield`,
    `Increases your shield by 2 points`,
    new PassiveStatusBonus({
        shield: 2
    }),
    undefined
)

export const trait_shield_03 = new Trait(
    TraitEnum.trait_shield_03,
    `+ 3 shield`,
    `Increases your shield by 3 points`,
    new PassiveStatusBonus({
        shield: 3
    }),
    undefined
)

export const trait_shield_04 = new Trait(
    TraitEnum.trait_shield_04,
    `+ 4 shield`,
    `Increases your shield by 4 points`,
    new PassiveStatusBonus({
        shield: 4
    }),
    undefined
)

export const trait_shield_05 = new Trait(
    TraitEnum.trait_shield_05,
    `+ 5 shield`,
    `Increases your shield by 5 points`,
    new PassiveStatusBonus({
        shield: 5
    }),
    undefined
)
//negative proficiency traits
export const trait_bareHand_01_neg = new Trait(
    TraitEnum.trait_bareHand_01_neg,
    `- 1 bareHand`,
    `Decreases your barehand by 1 point`,
    new PassiveStatusBonus({
        bareHand: -1
    }),
    undefined
)

export const trait_bareHand_02_neg = new Trait(
    TraitEnum.trait_bareHand_02_neg,
    `- 2 bareHand`,
    `Decreases your barehand by 2 points`,
    new PassiveStatusBonus({
        bareHand: -2
    }),
    undefined
)

export const trait_bareHand_03_neg = new Trait(
    TraitEnum.trait_bareHand_03_neg,
    `- 3 bareHand`,
    `Decreases your barehand by 3 points`,
    new PassiveStatusBonus({
        bareHand: -3
    }),
    undefined
)

export const trait_bareHand_04_neg = new Trait(
    TraitEnum.trait_bareHand_04_neg,
    `- 4 bareHand`,
    `Decreases your barehand by 4 points`,
    new PassiveStatusBonus({
        bareHand: -4
    }),
    undefined
)

export const trait_bareHand_05_neg = new Trait(
    TraitEnum.trait_bareHand_05_neg,
    `- 5 bareHand`,
    `Decreases your barehand by 5 points`,
    new PassiveStatusBonus({
        bareHand: -5
    }),
    undefined
)

export const trait_sword_01_neg = new Trait(
    TraitEnum.trait_sword_01_neg,
    `- 1 sword`,
    `Decreases your sword by 1 point`,
    new PassiveStatusBonus({
        sword: -1
    }),
    undefined
)

export const trait_sword_02_neg = new Trait(
    TraitEnum.trait_sword_02_neg,
    `- 2 sword`,
    `Decreases your sword by 2 points`,
    new PassiveStatusBonus({
        sword: -2
    }),
    undefined
)

export const trait_sword_03_neg = new Trait(
    TraitEnum.trait_sword_03_neg,
    `- 3 sword`,
    `Decreases your sword by 3 points`,
    new PassiveStatusBonus({
        sword: -3
    }),
    undefined
)

export const trait_sword_04_neg = new Trait(
    TraitEnum.trait_sword_04_neg,
    `- 4 sword`,
    `Decreases your sword by 4 points`,
    new PassiveStatusBonus({
        sword: -4
    }),
    undefined
)

export const trait_sword_05_neg = new Trait(
    TraitEnum.trait_sword_05_neg,
    `- 5 sword`,
    `Decreases your sword by 5 points`,
    new PassiveStatusBonus({
        sword: -5
    }),
    undefined
)

export const trait_blade_01_neg = new Trait(
    TraitEnum.trait_blade_01_neg,
    `- 1 blade`,
    `Decreases your blade by 1 point`,
    new PassiveStatusBonus({
        blade: -1
    }),
    undefined
)

export const trait_blade_02_neg = new Trait(
    TraitEnum.trait_blade_02_neg,
    `- 2 blade`,
    `Decreases your blade by 2 points`,
    new PassiveStatusBonus({
        blade: -2
    }),
    undefined
)

export const trait_blade_03_neg = new Trait(
    TraitEnum.trait_blade_03_neg,
    `- 3 blade`,
    `Decreases your blade by 3 points`,
    new PassiveStatusBonus({
        blade: -3
    }),
    undefined
)

export const trait_blade_04_neg = new Trait(
    TraitEnum.trait_blade_04_neg,
    `- 4 blade`,
    `Decreases your blade by 4 points`,
    new PassiveStatusBonus({
        blade: -4
    }),
    undefined
)

export const trait_blade_05_neg = new Trait(
    TraitEnum.trait_blade_05_neg,
    `- 5 blade`,
    `Decreases your blade by 5 points`,
    new PassiveStatusBonus({
        blade: -5
    }),
    undefined
)

export const trait_spear_01_neg = new Trait(
    TraitEnum.trait_spear_01_neg,
    `- 1 spear`,
    `Decreases your spear by 1 point`,
    new PassiveStatusBonus({
        spear: -1
    }),
    undefined
)

export const trait_spear_02_neg = new Trait(
    TraitEnum.trait_spear_02_neg,
    `- 2 spear`,
    `Decreases your spear by 2 points`,
    new PassiveStatusBonus({
        spear: -2
    }),
    undefined
)

export const trait_spear_03_neg = new Trait(
    TraitEnum.trait_spear_03_neg,
    `- 3 spear`,
    `Decreases your spear by 3 points`,
    new PassiveStatusBonus({
        spear: -3
    }),
    undefined
)

export const trait_spear_04_neg = new Trait(
    TraitEnum.trait_spear_04_neg,
    `- 4 spear`,
    `Decreases your spear by 4 points`,
    new PassiveStatusBonus({
        spear: -4
    }),
    undefined
)

export const trait_spear_05_neg = new Trait(
    TraitEnum.trait_spear_05_neg,
    `- 5 spear`,
    `Decreases your spear by 5 points`,
    new PassiveStatusBonus({
        spear: -5
    }),
    undefined
)

export const trait_axe_01_neg = new Trait(
    TraitEnum.trait_axe_01_neg,
    `- 1 axe`,
    `Decreases your axe by 1 point`,
    new PassiveStatusBonus({
        axe: -1
    }),
    undefined
)

export const trait_axe_02_neg = new Trait(
    TraitEnum.trait_axe_02_neg,
    `- 2 axe`,
    `Decreases your axe by 2 points`,
    new PassiveStatusBonus({
        axe: -2
    }),
    undefined
)

export const trait_axe_03_neg = new Trait(
    TraitEnum.trait_axe_03_neg,
    `- 3 axe`,
    `Decreases your axe by 3 points`,
    new PassiveStatusBonus({
        axe: -3
    }),
    undefined
)

export const trait_axe_04_neg = new Trait(
    TraitEnum.trait_axe_04_neg,
    `- 4 axe`,
    `Decreases your axe by 4 points`,
    new PassiveStatusBonus({
        axe: -4
    }),
    undefined
)

export const trait_axe_05_neg = new Trait(
    TraitEnum.trait_axe_05_neg,
    `- 5 axe`,
    `Decreases your axe by 5 points`,
    new PassiveStatusBonus({
        axe: -5
    }),
    undefined
)

export const trait_bow_01_neg = new Trait(
    TraitEnum.trait_bow_01_neg,
    `- 1 bow`,
    `Decreases your bow by 1 point`,
    new PassiveStatusBonus({
        bow: -1
    }),
    undefined
)

export const trait_bow_02_neg = new Trait(
    TraitEnum.trait_bow_02_neg,
    `- 2 bow`,
    `Decreases your bow by 2 points`,
    new PassiveStatusBonus({
        bow: -2
    }),
    undefined
)

export const trait_bow_03_neg = new Trait(
    TraitEnum.trait_bow_03_neg,
    `- 3 bow`,
    `Decreases your bow by 3 points`,
    new PassiveStatusBonus({
        bow: -3
    }),
    undefined
)

export const trait_bow_04_neg = new Trait(
    TraitEnum.trait_bow_04_neg,
    `- 4 bow`,
    `Decreases your bow by 4 points`,
    new PassiveStatusBonus({
        bow: -4
    }),
    undefined
)

export const trait_bow_05_neg = new Trait(
    TraitEnum.trait_bow_05_neg,
    `- 5 bow`,
    `Decreases your bow by 5 points`,
    new PassiveStatusBonus({
        bow: -5
    }),
    undefined
)

export const trait_dagger_01_neg = new Trait(
    TraitEnum.trait_dagger_01_neg,
    `- 1 dagger`,
    `Decreases your dagger by 1 point`,
    new PassiveStatusBonus({
        dagger: -1
    }),
    undefined
)

export const trait_dagger_02_neg = new Trait(
    TraitEnum.trait_dagger_02_neg,
    `- 2 dagger`,
    `Decreases your dagger by 2 points`,
    new PassiveStatusBonus({
        dagger: -2
    }),
    undefined
)

export const trait_dagger_03_neg = new Trait(
    TraitEnum.trait_dagger_03_neg,
    `- 3 dagger`,
    `Decreases your dagger by 3 points`,
    new PassiveStatusBonus({
        dagger: -3
    }),
    undefined
)

export const trait_dagger_04_neg = new Trait(
    TraitEnum.trait_dagger_04_neg,
    `- 4 dagger`,
    `Decreases your dagger by 4 points`,
    new PassiveStatusBonus({
        dagger: -4
    }),
    undefined
)

export const trait_dagger_05_neg = new Trait(
    TraitEnum.trait_dagger_05_neg,
    `- 5 dagger`,
    `Decreases your dagger by 5 points`,
    new PassiveStatusBonus({
        dagger: -5
    }),
    undefined
)

export const trait_staff_01_neg = new Trait(
    TraitEnum.trait_staff_01_neg,
    `- 1 staff`,
    `Decreases your staff by 1 point`,
    new PassiveStatusBonus({
        staff: -1
    }),
    undefined
)

export const trait_staff_02_neg = new Trait(
    TraitEnum.trait_staff_02_neg,
    `- 2 staff`,
    `Decreases your staff by 2 points`,
    new PassiveStatusBonus({
        staff: -2
    }),
    undefined
)

export const trait_staff_03_neg = new Trait(
    TraitEnum.trait_staff_03_neg,
    `- 3 staff`,
    `Decreases your staff by 3 points`,
    new PassiveStatusBonus({
        staff: -3
    }),
    undefined
)

export const trait_staff_04_neg = new Trait(
    TraitEnum.trait_staff_04_neg,
    `- 4 staff`,
    `Decreases your staff by 4 points`,
    new PassiveStatusBonus({
        staff: -4
    }),
    undefined
)

export const trait_staff_05_neg = new Trait(
    TraitEnum.trait_staff_05_neg,
    `- 5 staff`,
    `Decreases your staff by 5 points`,
    new PassiveStatusBonus({
        staff: -5
    }),
    undefined
)

export const trait_magicWand_01_neg = new Trait(
    TraitEnum.trait_magicWand_01_neg,
    `- 1 magicWand`,
    `Decreases your magicwand by 1 point`,
    new PassiveStatusBonus({
        magicWand: -1
    }),
    undefined
)

export const trait_magicWand_02_neg = new Trait(
    TraitEnum.trait_magicWand_02_neg,
    `- 2 magicWand`,
    `Decreases your magicwand by 2 points`,
    new PassiveStatusBonus({
        magicWand: -2
    }),
    undefined
)

export const trait_magicWand_03_neg = new Trait(
    TraitEnum.trait_magicWand_03_neg,
    `- 3 magicWand`,
    `Decreases your magicwand by 3 points`,
    new PassiveStatusBonus({
        magicWand: -3
    }),
    undefined
)

export const trait_magicWand_04_neg = new Trait(
    TraitEnum.trait_magicWand_04_neg,
    `- 4 magicWand`,
    `Decreases your magicwand by 4 points`,
    new PassiveStatusBonus({
        magicWand: -4
    }),
    undefined
)

export const trait_magicWand_05_neg = new Trait(
    TraitEnum.trait_magicWand_05_neg,
    `- 5 magicWand`,
    `Decreases your magicwand by 5 points`,
    new PassiveStatusBonus({
        magicWand: -5
    }),
    undefined
)

export const trait_tome_01_neg = new Trait(
    TraitEnum.trait_tome_01_neg,
    `- 1 tome`,
    `Decreases your tome by 1 point`,
    new PassiveStatusBonus({
        tome: -1
    }),
    undefined
)

export const trait_tome_02_neg = new Trait(
    TraitEnum.trait_tome_02_neg,
    `- 2 tome`,
    `Decreases your tome by 2 points`,
    new PassiveStatusBonus({
        tome: -2
    }),
    undefined
)

export const trait_tome_03_neg = new Trait(
    TraitEnum.trait_tome_03_neg,
    `- 3 tome`,
    `Decreases your tome by 3 points`,
    new PassiveStatusBonus({
        tome: -3
    }),
    undefined
)

export const trait_tome_04_neg = new Trait(
    TraitEnum.trait_tome_04_neg,
    `- 4 tome`,
    `Decreases your tome by 4 points`,
    new PassiveStatusBonus({
        tome: -4
    }),
    undefined
)

export const trait_tome_05_neg = new Trait(
    TraitEnum.trait_tome_05_neg,
    `- 5 tome`,
    `Decreases your tome by 5 points`,
    new PassiveStatusBonus({
        tome: -5
    }),
    undefined
)

export const trait_orb_01_neg = new Trait(
    TraitEnum.trait_orb_01_neg,
    `- 1 orb`,
    `Decreases your orb by 1 point`,
    new PassiveStatusBonus({
        orb: -1
    }),
    undefined
)

export const trait_orb_02_neg = new Trait(
    TraitEnum.trait_orb_02_neg,
    `- 2 orb`,
    `Decreases your orb by 2 points`,
    new PassiveStatusBonus({
        orb: -2
    }),
    undefined
)

export const trait_orb_03_neg = new Trait(
    TraitEnum.trait_orb_03_neg,
    `- 3 orb`,
    `Decreases your orb by 3 points`,
    new PassiveStatusBonus({
        orb: -3
    }),
    undefined
)

export const trait_orb_04_neg = new Trait(
    TraitEnum.trait_orb_04_neg,
    `- 4 orb`,
    `Decreases your orb by 4 points`,
    new PassiveStatusBonus({
        orb: -4
    }),
    undefined
)

export const trait_orb_05_neg = new Trait(
    TraitEnum.trait_orb_05_neg,
    `- 5 orb`,
    `Decreases your orb by 5 points`,
    new PassiveStatusBonus({
        orb: -5
    }),
    undefined
)

export const trait_mace_01_neg = new Trait(
    TraitEnum.trait_mace_01_neg,
    `- 1 mace`,
    `Decreases your mace by 1 point`,
    new PassiveStatusBonus({
        mace: -1
    }),
    undefined
)

export const trait_mace_02_neg = new Trait(
    TraitEnum.trait_mace_02_neg,
    `- 2 mace`,
    `Decreases your mace by 2 points`,
    new PassiveStatusBonus({
        mace: -2
    }),
    undefined
)

export const trait_mace_03_neg = new Trait(
    TraitEnum.trait_mace_03_neg,
    `- 3 mace`,
    `Decreases your mace by 3 points`,
    new PassiveStatusBonus({
        mace: -3
    }),
    undefined
)

export const trait_mace_04_neg = new Trait(
    TraitEnum.trait_mace_04_neg,
    `- 4 mace`,
    `Decreases your mace by 4 points`,
    new PassiveStatusBonus({
        mace: -4
    }),
    undefined
)

export const trait_mace_05_neg = new Trait(
    TraitEnum.trait_mace_05_neg,
    `- 5 mace`,
    `Decreases your mace by 5 points`,
    new PassiveStatusBonus({
        mace: -5
    }),
    undefined
)

export const trait_shield_01_neg = new Trait(
    TraitEnum.trait_shield_01_neg,
    `- 1 shield`,
    `Decreases your shield by 1 point`,
    new PassiveStatusBonus({
        shield: -1
    }),
    undefined
)

export const trait_shield_02_neg = new Trait(
    TraitEnum.trait_shield_02_neg,
    `- 2 shield`,
    `Decreases your shield by 2 points`,
    new PassiveStatusBonus({
        shield: -2
    }),
    undefined
)

export const trait_shield_03_neg = new Trait(
    TraitEnum.trait_shield_03_neg,
    `- 3 shield`,
    `Decreases your shield by 3 points`,
    new PassiveStatusBonus({
        shield: -3
    }),
    undefined
)

export const trait_shield_04_neg = new Trait(
    TraitEnum.trait_shield_04_neg,
    `- 4 shield`,
    `Decreases your shield by 4 points`,
    new PassiveStatusBonus({
        shield: -4
    }),
    undefined
)

export const trait_shield_05_neg = new Trait(
    TraitEnum.trait_shield_05_neg,
    `- 5 shield`,
    `Decreases your shield by 5 points`,
    new PassiveStatusBonus({
        shield: -5
    }),
    undefined
)

export const trait_starter_01 = new Trait(
    TraitEnum.trait_starter_01,
    `Exiled Mystic's Apprentice`,
    `You were once part of a mystical order, learning the secrets of the arcane arts. But your order was destroyed, and you were forced into exile before you could complete your training. Now, you wander the world, trying to pick up the pieces of your shattered education while avoiding those who would seek to end your lineage. Your skills are powerful, but incomplete, and the burden of your past weighs heavily on your mind.`,
    new PassiveStatusBonus({
        planar: 2,
        intelligence: 1,
        vitality: -2,
        strength: -1
    }),
)

export const trait_starter_02 = new Trait(
    TraitEnum.trait_starter_02,
    `Forgotten Artisan`,
    `Trained in a craft that is slowly dying out, you have dedicated your life to perfecting your art. However, the world no longer values your skills as much, and your isolation has left you out of touch with current trends.`,
    new PassiveStatusBonus({
        smithing: 3,
        dexterity: -2,
        agility: -1
    }),
)

export const trait_starter_03 = new Trait(
    TraitEnum.trait_starter_03,
    `Wandering Sellsword`,
    `You've roamed the lands offering your sword to the highest bidder. Though skilled in combat, your life of constant battle has left you with little else. Now, you seek something more than just the next fight.`,
    new PassiveStatusBonus({
        sword: 2,
        strength: 1,
        intelligence: -2,
        charisma: -1
    }),
)

export const trait_starter_04 = new Trait(
    TraitEnum.trait_starter_04,
    `Alchemical Prodigy`,
    `Gifted in the art of alchemy from a young age, you have spent years experimenting with potions and elixirs. However, your obsession with alchemy has left you somewhat physically frail and socially awkward.`,
    new PassiveStatusBonus({
        alchemy: 2,
        intelligence: 1,
        vitality: -2,
        charisma: -1
    }),
)

export const trait_starter_05 = new Trait(
    TraitEnum.trait_starter_05,
    `Runaway Blacksmith`,
    `You fled a life of hard labor at the forge, seeking adventure and a new start. Though your skills in smithing are exceptional, you lack experience in anything else, making your journey difficult.`,
    new PassiveStatusBonus({
        strength: 2,
        smithing: 1,
        intelligence: -2,
        dexterity: -1
    }),
)

export const trait_starter_06 = new Trait(
    TraitEnum.trait_starter_06,
    `Nomadic Hunter`,
    `Raised among a tribe of nomads, you've learned to track, hunt, and survive in the wild. However, your time in the wilderness has left you somewhat detached from civilized society.`,
    new PassiveStatusBonus({
        agility: 2,
        bow: 1,
        charisma: -2,
        intelligence: -1
    }),
)

export const trait_starter_07 = new Trait(
    TraitEnum.trait_starter_07,
    `Clockwork Tinkerer`,
    `Fascinated by gears and mechanisms, you've spent your life building and repairing intricate devices. While your mechanical skills are unmatched, your focus on machines has left you with limited physical and social abilities.`,
    new PassiveStatusBonus({
        intelligence: 2,
        jewelry: 1,
        strength: -2,
        dexterity: -1
    }),
)

export const trait_starter_08 = new Trait(
    TraitEnum.trait_starter_08,
    `Street Magician`,
    `You learned the art of magic on the streets, using tricks and minor spells to entertain and survive. While your skills are impressive, they are largely self-taught and lack formal training.`,
    new PassiveStatusBonus({
        magicWand: 2,
        dexterity: 1,
        intelligence: -2,
        vitality: -1
    }),
)

export const trait_starter_09 = new Trait(
    TraitEnum.trait_starter_09,
    `Disgraced Knight`,
    `Once a proud knight, you lost your honor in a scandal that forced you to flee your homeland. Now, you wander the world, trying to regain your lost honor, though your past still haunts you.`,
    new PassiveStatusBonus({
        strength: 2,
        sword: 1,
        charisma: -2,
        agility: -1
    }),
)

export const trait_starter_10 = new Trait(
    TraitEnum.trait_starter_10,
    `Seafarer`,
    `You spent most of your life on the open sea, learning the ways of sailing and navigation. However, your seafaring lifestyle has made you less adept at land-based skills.`,
    new PassiveStatusBonus({
        agility: 2,
        spear: 1,
        intelligence: -2,
        endurance: -1
    }),
)

export const trait_starter_11 = new Trait(
    TraitEnum.trait_starter_11,
    `Haunted Seer`,
    `Gifted with the ability to glimpse the future, your visions have isolated you from others, who fear your powers. Though your insight is unparalleled, the constant visions have taken a toll on your mind.`,
    new PassiveStatusBonus({
        intelligence: 2,
        planar: 1,
        willpower: -2,
        vitality: -1
    }),
)

export const trait_starter_12 = new Trait(
    TraitEnum.trait_starter_12,
    `Village Healer`,
    `You were the healer in a small village, using your knowledge of herbs and basic spells to treat the sick and injured. While your healing skills are considerable, your physical abilities are less developed.`,
    new PassiveStatusBonus({
        alchemy: 2,
        intelligence: 1,
        strength: -2,
        agility: -1
    }),
)

export const trait_starter_13 = new Trait(
    TraitEnum.trait_starter_13,
    `Exiled Aristocrat`,
    `Banished from your homeland after a failed coup, you have little left but your noble blood and the skills you learned in court. Now, you must rebuild your life in exile, using whatever influence you have left.`,
    new PassiveStatusBonus({
        leadership: 2,
        charisma: 1,
        agility: -2,
        dexterity: -1
    }),
)

export const trait_starter_14 = new Trait(
    TraitEnum.trait_starter_14,
    `Forest Ranger`,
    `You were a ranger in the vast forests, skilled in tracking, hunting, and surviving in the wild. While your skills in the wilderness are exceptional, you struggle in more civilized settings.`,
    new PassiveStatusBonus({
        dexterity: 2,
        bow: 1,
        charisma: -2,
        intelligence: -1
    }),
)

export const trait_starter_15 = new Trait(
    TraitEnum.trait_starter_15,
    `Nomadic Herbalist`,
    `Raised among nomads, you learned the secrets of the wild, gathering herbs and crafting potions. However, your time in the wilderness has left you physically weaker.`,
    new PassiveStatusBonus({
        alchemy: 2,
        vitality: 1,
        strength: -2,
        agility: -1
    }),
)

export const trait_starter_16 = new Trait(
    TraitEnum.trait_starter_16,
    `Reluctant Priest`,
    `Trained as a priest from a young age, you have a deep knowledge of the divine and the sacred. However, your faith was not entirely your choice, and you struggle with the physical demands of your duties.`,
    new PassiveStatusBonus({
        intelligence: 2,
        willpower: 1,
        strength: -2,
        dexterity: -1
    }),
)

export const trait_starter_17 = new Trait(
    TraitEnum.trait_starter_17,
    `Exiled Alchemist`,
    `Banished from your homeland for experimenting with forbidden alchemy, you now wander, seeking to continue your research while avoiding those who would stop you.`,
    new PassiveStatusBonus({
        alchemy: 2,
        intelligence: 1,
        endurance: -2,
        agility: -1
    }),
)

export const trait_starter_18 = new Trait(
    TraitEnum.trait_starter_18,
    `Runaway Mechanic`,
    `You fled a life of repairing machines, seeking adventure and a new start. Though your skills with technology are exceptional, you lack experience in anything else, making your journey difficult.`,
    new PassiveStatusBonus({
        dexterity: 2,
        smithing: 1,
        intelligence: -2,
        endurance: -1
    }),
)

export const trait_starter_19 = new Trait(
    TraitEnum.trait_starter_19,
    `Shadowy Assassin`,
    `Trained by a secretive order, you excel in stealth and assassination. However, your isolated training has left you with limited social skills and physical endurance.`,
    new PassiveStatusBonus({
        dexterity: 2,
        dagger: 1,
        charisma: -2,
        endurance: -1
    }),
)

export const trait_starter_20 = new Trait(
    TraitEnum.trait_starter_20,
    `Desert Wanderer`,
    `Raised in the harsh deserts, you've learned to survive in one of the most unforgiving environments. However, your isolated life has left you less suited to the ways of civilization.`,
    new PassiveStatusBonus({
        endurance: 2,
        spear: 1,
        charisma: -2,
        intelligence: -1
    }),
)

export const trait_starter_21 = new Trait(
    TraitEnum.trait_starter_21,
    `Mountain Hermit's Disciple`,
    `You were trained by a reclusive hermit in the mountains, learning the secrets of internal power and meditation. Your training has granted you remarkable control over your inner energy, but you are untested in the wider world.`,
    new PassiveStatusBonus({
        breath: 2,
        vitality: 1,
        charisma: -2,
        agility: -1
    }),
)

export const trait_starter_22 = new Trait(
    TraitEnum.trait_starter_22,
    `Alchemist of the Hidden Valley`,
    `You were taught the secret arts of alchemy in a hidden valley, where you spent years perfecting your craft. While your potions and elixirs are powerful, your focus on alchemy has made you somewhat frail.`,
    new PassiveStatusBonus({
        alchemy: 3,
        endurance: -2,
        strength: -1
    }),
)

export const trait_starter_23 = new Trait(
    TraitEnum.trait_starter_23,
    `Wandering Martial Artist`,
    `You have wandered the land, learning various martial arts and honing your internal power. Your mastery of breath techniques is impressive, but your focus on the internal has left you vulnerable in other areas.`,
    new PassiveStatusBonus({
        breath: 2,
        bareHand: 1,
        vitality: -2,
        intelligence: -1
    }),
)

export const trait_starter_24 = new Trait(
    TraitEnum.trait_starter_24,
    `Wandering Herbalist`,
    `Traveling across lands, you gather herbs and plants to create powerful potions and remedies. Your knowledge of alchemy is vast, but your constant travel has left you less capable in other skills.`,
    new PassiveStatusBonus({
        alchemy: 2,
        vitality: 1,
        dexterity: -2,
        strength: -1
    }),
)

export const trait_common_01 = new Trait(
    TraitEnum.trait_common_01,
    `Commoner`,
    `A Common person, can be found everywhere.`
)
    

//MARK:: INTERNAL SKILL TRAITS
export const trait_inner_harmony_01 = new Trait(
    TraitEnum.trait_inner_harmony_01,
    `Harmony(1)`,
    `Your are on the first step of understanding the harmony of your internal energy. In battle, your hp mp and sp will slightly regenerate every turn`,
)

export const trait_inner_harmony_02 = new Trait(
    TraitEnum.trait_inner_harmony_02,
    `Harmony(2)`,
    `Your are on the second step of understanding the harmony of your internal energy. In battle, your hp mp and sp will regenerate every turn`,
)

export const trait_inner_harmony_03 = new Trait(
    TraitEnum.trait_inner_harmony_03,
    `Harmony(3)`,
    `Your are quite profound in the understanding of harmony between warm and cold energy. In battle, your hp mp and sp will moderately regenerate every turn. Boosts your breath by 2 points`,
    new PassiveStatusBonus({
        breath: 2
    }),
)

export const trait_inner_harmony_04 = new Trait(
    TraitEnum.trait_inner_harmony_04,
    `Harmony(4)`,
    `You have mastered the harmony of your internal energy. In battle, your hp mp and sp will greatly regenerate every turn. Boosts your breath by 4 points`,
    new PassiveStatusBonus({
        breath: 4
    }),
)

export const trait_inner_harmony_05 = new Trait(
    TraitEnum.trait_inner_harmony_05,
    `Harmony(5)`,
    `You have mastered the harmony of your internal energy. In battle, your hp mp and sp will greatly regenerate every turn. Boosts your breath by 6 points`,
    new PassiveStatusBonus({
        breath: 6
    }),
)

//TODO:: ADD ADDITIONAL EFFECTS
export const trait_inner_harmony_06 = new Trait(
    TraitEnum.trait_inner_harmony_06,
    `Harmony(6)`,
    `You have grasped the mysterious secret of internal energy that no one else has ever known. In battle, your hp mp and sp will greatly regenerate every turn. When dealing damage to enemies, you have a chance to deal additional damage based on your breath, also boosts your breath by 6 points`,
    new PassiveStatusBonus({
        breath: 6
    }),
)

export const trait_inner_warm_01 = new Trait(
    TraitEnum.trait_inner_warm_01,
    `Warm(1)`,
    `You have started to understand the warm energy within you. boosts your physical attack by 1 point`,
    new PassiveStatusBonus({
        pATK: 1
    }),
)

export const trait_inner_warm_02 = new Trait(
    TraitEnum.trait_inner_warm_02,
    `Warm(2)`,
    `You are somehow familiar with the warm energy within you. boosts your physical attack by 2 points`,
    new PassiveStatusBonus({
        pATK: 2
    }),
)

//TODO:: ADD ADDITIONAL EFFECTS
export const trait_inner_warm_03 = new Trait(
    TraitEnum.trait_inner_warm_03,
    `Warm(3)`,
    `You have a profound understanding the warm energy within you. boosts your physical attack by 3 points, when dealing fire, order or geo damage to enemies, you have a chance to deal additional small warm damage`,
    new PassiveStatusBonus({
        pATK: 3
    }),
)

//TODO:: ADD ADDITIONAL EFFECTS
export const trait_inner_warm_04 = new Trait(
    TraitEnum.trait_inner_warm_04,
    `Warm(4)`,
    `Your understanding of the warm energy within you now at its peak. boosts your physical attack by 4 points, when dealing fire, order or geo damage to enemies, you have a chance to deal additional moderate warm damage`,
    new PassiveStatusBonus({
        pATK: 4
    }),
)

//TODO:: ADD ADDITIONAL EFFECTS
export const trait_inner_warm_05 = new Trait(
    TraitEnum.trait_inner_warm_05,
    `Warm(5)`,
    `You have mastered the warm energy within you. boosts your physical attack by 5 points, when dealing fire, order or geo damage to enemies, you have a chance to deal huge additional large warm damage`,
    new PassiveStatusBonus({
        pATK: 5
    }),
)

//TODO:: ADD ADDITIONAL EFFECTS
export const trait_inner_warm_06 = new Trait(
    TraitEnum.trait_inner_warm_06,
    `Warm(6)`,
    `You have mastered the warm energy within you. boosts your physical attack by 6 points, when dealing fire, order or geo damage to enemies, you have a chance to deal massive additional huge warm damage`,
    new PassiveStatusBonus({
        pATK: 6
    }),
)

export const trait_inner_cold_01 = new Trait(
    TraitEnum.trait_inner_cold_01,
    `Cold(1)`,
    `You have started to understand the cold energy within you. Cultivate this makes your skin brighter, boosts your charisma by 1 point`,
    new PassiveStatusBonus({
        charisma: 1
    }),
)

export const trait_inner_cold_02 = new Trait(
    TraitEnum.trait_inner_cold_02,
    `Cold(2)`,
    `You are somehow familiar with the cold energy within you. Cultivate this makes your skin brighter, boosts your charisma by 2 points`,
    new PassiveStatusBonus({
        charisma: 2
    }),
)

export const trait_inner_cold_03 = new Trait(
    TraitEnum.trait_inner_cold_03,
    `Cold(3)`,
    `You have a profound understanding the cold energy within you. Cultivate this makes your skin brighter, boosts your charisma by 3 points and 1 chiColdATK.`,
    new PassiveStatusBonus({
        charisma: 3,
        chiColdATK: 1
    }),
)

export const trait_inner_cold_04 = new Trait(
    TraitEnum.trait_inner_cold_04,
    `Cold(4)`,
    `Your understanding of the cold energy within you now at its peak. Cultivate this makes your skin brighter, boosts your charisma by 3 points and 2 chiColdATK.`,
    new PassiveStatusBonus({
        charisma: 3,
        chiColdATK: 2
    }),
)

export const trait_inner_cold_05 = new Trait(
    TraitEnum.trait_inner_cold_05,
    `Cold(5)`,
    `You have mastered the cold energy within you. Cultivate this makes your skin brighter, boosts your charisma by 3 points and 3 chiColdATK.`,
    new PassiveStatusBonus({
        charisma: 3,
        chiColdATK: 3
    }),
)

export const trait_inner_cold_06 = new Trait(
    TraitEnum.trait_inner_cold_06,
    `Cold(6)`,
    `You have mastered the cold energy within you. Cultivate this makes your skin brighter, boosts your charisma by 4 points and 4 chiColdATK.`,
    new PassiveStatusBonus({
        charisma: 4,
        chiColdATK: 4
    }),
)

//MARK: CLASS TRAITS
export const trait_fighter_01 = new Trait(
    TraitEnum.trait_fighter_01,
    `Fighter Apprentice`,
    `You have just started your journey as a fighter.`,
    new PassiveStatusBonus({
        strength: 2,
        endurance: 2,
        sword: 1,
        blade: 1
    }),
)

export const trait_fighter_02 = new Trait(
    TraitEnum.trait_fighter_02,
    `Fighter Adept`,
    `You have become an adept fighter, mastering the art of combat.`,
    new PassiveStatusBonus({
        strength: 4,
        endurance: 4,
        sword: 2,
        blade: 2
    }),
)

export const trait_fighter_03 = new Trait(
    TraitEnum.trait_fighter_03,
    `Fighter Master`,
    `You have become a master fighter, your combat skills are unmatched.`,
    new PassiveStatusBonus({
        strength: 6,
        endurance: 6,
        sword: 3,
        blade: 3
    }),
)

export const trait_mage_01 = new Trait(
    TraitEnum.trait_mage_01,
    `Mage Apprentice`,
    `You have just started your journey as a mage.`,
    new PassiveStatusBonus({
        intelligence: 2,
        planar: 2,
        magicWand: 1,
        orb: 1
    }),
)

export const trait_mage_02 = new Trait(
    TraitEnum.trait_mage_02,
    `Mage Adept`,
    `You have become an adept mage, mastering the art of magic.`,
    new PassiveStatusBonus({
        intelligence: 4,
        planar: 4,
        magicWand: 2,
        orb: 2
    }),
)

export const trait_mage_03 = new Trait(
    TraitEnum.trait_mage_03,
    `Mage Master`,
    `You have become a master mage, your magic is unparalleled.`,
    new PassiveStatusBonus({
        intelligence: 6,
        planar: 6,
        magicWand: 3,
        orb: 3
    }),
)

export const trait_scout_01 = new Trait(
    TraitEnum.trait_scout_01,
    `Rogue Apprentice`,
    `You have just started your journey as a rogue.`,
    new PassiveStatusBonus({
        dexterity: 2,
        agility: 2,
        dagger: 1,
        bow: 1
    }),
)

export const trait_scout_02 = new Trait(
    TraitEnum.trait_scout_02,
    `Rogue Adept`,
    `You have become an adept rogue, mastering the art of stealth.`,
    new PassiveStatusBonus({
        dexterity: 4,
        agility: 4,
        dagger: 2,
        bow: 2
    }),
)

export const trait_scout_03 = new Trait(
    TraitEnum.trait_scout_03,
    `Rogue Master`,
    `You have become a master rogue, your stealth skills are unmatched.`,
    new PassiveStatusBonus({
        dexterity: 6,
        agility: 6,
        dagger: 3,
        bow: 3
    }),
)

export const trait_cleric_01 = new Trait(
    TraitEnum.trait_cleric_01,
    `Acolyte Apprentice`,
    `You have just started your journey as an acolyte.`,
    new PassiveStatusBonus({
        intelligence: 2,
        willpower: 2,
        staff: 1,
        tome: 1
    }),
)

export const trait_cleric_02 = new Trait(
    TraitEnum.trait_cleric_02,
    `Acolyte Adept`,
    `You have become an adept acolyte, mastering the art of divine magic.`,
    new PassiveStatusBonus({
        intelligence: 4,
        willpower: 4,
        staff: 2,
        tome: 2
    }),
)

export const trait_cleric_03 = new Trait(
    TraitEnum.trait_cleric_03,
    `Acolyte Master`,
    `You have become a master acolyte, your divine magic is unparalleled.`,
    new PassiveStatusBonus({
        intelligence: 6,
        willpower: 6,
        staff: 3,
        tome: 3
    }),
)

export const trait_templar_01 = new Trait(
    TraitEnum.trait_templar_01,
    `Paladin Apprentice`,
    `You have just started your journey as a paladin.`,
    new PassiveStatusBonus({
        endurance: 2,
        charisma: 2,
        mace: 1,
        shield: 1
    }),
)

export const trait_templar_02 = new Trait(
    TraitEnum.trait_templar_02,
    `Paladin Adept`,
    `You have become an adept paladin, mastering the art of divine combat.`,
    new PassiveStatusBonus({
        endurance: 4,
        charisma: 4,
        mace: 2,
        shield: 2
    }),
)

export const trait_templar_03 = new Trait(
    TraitEnum.trait_templar_03,
    `Paladin Master`,
    `You have become a master paladin, your divine combat skills are unmatched.`,
    new PassiveStatusBonus({
        endurance: 6,
        charisma: 6,
        mace: 3,
        shield: 3
    }),
)

export const trait_hexbinder_01 = new Trait(
    TraitEnum.trait_hexbinder_01,
    `Warlock Apprentice`,
    `You have just started your journey as a warlock.`,
    new PassiveStatusBonus({
        intelligence: 2,
        willpower: 2,
        magicWand: 1,
        tome: 1
    }),
)

export const trait_hexbinder_02 = new Trait(
    TraitEnum.trait_hexbinder_02,
    `Warlock Adept`,
    `You have become an adept warlock, mastering the art of dark magic.`,
    new PassiveStatusBonus({
        intelligence: 4,
        willpower: 4,
        magicWand: 2,
        tome: 2
    }),
)

export const trait_hexbinder_03 = new Trait(
    TraitEnum.trait_hexbinder_03,
    `Warlock Master`,
    `You have become a master warlock, your dark magic is unparalleled.`,
    new PassiveStatusBonus({
        intelligence: 6,
        willpower: 6,
        magicWand: 3,
        tome: 3
    }),
)

export const trait_soldier_01 = new Trait(
    TraitEnum.trait_soldier_01,
    `Royal Guard Apprentice`,
    `You have just started your journey as a royal guard.`,
    new PassiveStatusBonus({
        strength: 2,
        intelligence: 2,
        sword: 1,
        shield: 1
    }),
)

export const trait_soldier_02 = new Trait(
    TraitEnum.trait_soldier_02,
    `Royal Guard Adept`,
    `You have become an adept royal guard, mastering the art of defense.`,
    new PassiveStatusBonus({
        strength: 4,
        intelligence: 4,
        sword: 2,
        shield: 2
    }),
)

export const trait_soldier_03 = new Trait(
    TraitEnum.trait_soldier_03,
    `Royal Guard Master`,
    `You have become a master royal guard, your defensive skills are unmatched.`,
    new PassiveStatusBonus({
        strength: 6,
        intelligence: 6,
        sword: 3,
        shield: 3
    }),
)

export const trait_spellblade_01 = new Trait(
    TraitEnum.trait_spellblade_01,
    `Sword Mage Apprentice`,
    `You have just started your journey as a sword mage. You are still learning the basics of sword fighting and magic. Boosts your sword by 1 point and your magicWand by 1 point, also diminish the penalty of casting spell while wearing light armor`,
    new PassiveStatusBonus({
        dexterity: 2,
        planar: 2,
        sword: 1,
        magicWand: 1
    }),
)

export const trait_spellblade_02 = new Trait(
    TraitEnum.trait_spellblade_02,
    `Sword Mage Adept`,
    `You have become an adept sword mage, mastering the art of combining sword fighting and magic. Boosts your sword by 2 points and your magicWand by 2 points, also diminish the penalty of casting spell while wearing light armor`,
    new PassiveStatusBonus({
        dexterity: 4,
        planar: 4,
        sword: 2,
        magicWand: 2
    }),
)

export const trait_spellblade_03 = new Trait(
    TraitEnum.trait_spellblade_03,
    `Sword Mage Master`,
    `You have become a master sword mage, blending sword fighting and magic seamlessly. Boosts your sword by 3 points and your magicWand by 3 points, also diminish the penalty of casting spell while wearing light armor`,
    new PassiveStatusBonus({
        dexterity: 6,
        planar: 6,
        sword: 3,
        magicWand: 3
    }),
)

export const trait_skirmisher_01 = new Trait(
    TraitEnum.trait_skirmisher_01,
    `Assassin Apprentice`,
    `You have just started your journey as an assassin. You are still learning the basics of stealth and assassination. Boosts your dexterity by 2 points, your dagger by 1 point and your bow by 1 point`,
    new PassiveStatusBonus({
        dexterity: 2,
        agility: 2,
        dagger: 1,
        pCRT: 1
    }),
)

export const trait_skirmisher_02 = new Trait(
    TraitEnum.trait_skirmisher_02,
    `Assassin Adept`,
    `You have become an adept assassin, mastering the art of stealth and assassination. Boosts your dexterity by 4 points, your dagger by 2 points and your bow by 2 points`,
    new PassiveStatusBonus({
        dexterity: 4,
        agility: 4,
        dagger: 2,
        pCRT: 2
    }),
)

export const trait_skirmisher_03 = new Trait(
    TraitEnum.trait_skirmisher_03,
    `Assassin Master`,
    `You have become a master assassin, your stealth and assassination skills are unmatched. Boosts your dexterity by 6 points, your dagger by 3 points and your bow by 3 points`,
    new PassiveStatusBonus({
        dexterity: 6,
        agility: 6,
        dagger: 3,
        pCRT: 3
    }),
)

export const trait_occultist_01 = new Trait(
    TraitEnum.trait_occultist_01,
    `Harbinger Apprentice`,
    `You have just started your journey as a harbinger. You are still learning the basics of dark magic and combat. Boosts your intelligence by 2 points, your willpower by 2 points, your magicWand by 1 point and your tome by 1 point`,
    new PassiveStatusBonus({
        intelligence: 2,
        endurance: 2,
        magicWand: 1,
        mATK: 1
    }),
)

export const trait_occultist_02 = new Trait(
    TraitEnum.trait_occultist_02,
    `Harbinger Adept`,
    `You have become an adept harbinger, mastering the art of dark magic and combat. Boosts your intelligence by 4 points, your willpower by 4 points, your magicWand by 2 points and your tome by 2 points`,
    new PassiveStatusBonus({
        intelligence: 4,
        endurance: 4,
        magicWand: 2,
        mATK: 2
    }),
)

export const trait_occultist_03 = new Trait(
    TraitEnum.trait_occultist_03,
    `Harbinger Master`,
    `You have become a master harbinger, your dark magic and combat skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your magicWand by 3 points and your tome by 3 points`,
    new PassiveStatusBonus({
        intelligence: 6,
        endurance: 6,
        magicWand: 3,
        mATK: 3
    }),
)

export const trait_knight_01 = new Trait(
    TraitEnum.trait_knight_01,
    `Knight Apprentice`,
    `You have just started your journey as a knight. You are still learning the basics of combat and defense. Boosts your strength by 2 points, your endurance by 2 points, your sword by 1 point and your shield by 1 point`,
    new PassiveStatusBonus({
        vitality: 2,
        endurance: 2,
        sword: 1,
        shield: 1
    }),
)

export const trait_knight_02 = new Trait(
    TraitEnum.trait_knight_02,
    `Knight Adept`,
    `You have become an adept knight, mastering the art of combat and defense. Boosts your strength by 4 points, your endurance by 4 points, your sword by 2 points and your shield by 2 points`,
    new PassiveStatusBonus({
        vitality: 4,
        endurance: 4,
        sword: 2,
        shield: 2
    }),
)

export const trait_knight_03 = new Trait(
    TraitEnum.trait_knight_03,
    `Knight Master`,
    `You have become a master knight, your combat and defense skills are unmatched. Boosts your strength by 6 points, your endurance by 6 points, your sword by 3 points and your shield by 3 points`,
    new PassiveStatusBonus({
        vitality: 6,
        endurance: 6,
        sword: 3,
        shield: 3
    }),
)

export const trait_archPriest_01 = new Trait(
    TraitEnum.trait_archPriest_01,
    `Arch Priest Apprentice`,
    `You have just started your journey as an arch priest. You are still learning the basics of divine magic and healing. Boosts your intelligence by 2 points, your willpower by 2 points, your staff by 1 point and your tome by 1 point`,
    new PassiveStatusBonus({
        charisma: 2,
        willpower: 2,
        staff: 1,
        tome: 1
    }),
)

export const trait_archPriest_02 = new Trait(
    TraitEnum.trait_archPriest_02,
    `Arch Priest Adept`,
    `You have become an adept arch priest, mastering the art of divine magic and healing. Boosts your intelligence by 4 points, your willpower by 4 points, your staff by 2 points and your tome by 2 points`,
    new PassiveStatusBonus({
        charisma: 4,
        willpower: 4,
        staff: 2,
        tome: 2
    }),
)

export const trait_archPriest_03 = new Trait(
    TraitEnum.trait_archPriest_03,
    `Arch Priest Master`,
    `You have become a master arch priest, your divine magic and healing skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your staff by 3 points and your tome by 3 points`,
    new PassiveStatusBonus({
        charisma: 6,
        willpower: 6,
        staff: 3,
        tome: 3
    }),
)

// export const trait_druid_01 = new Trait(
//     TraitEnum.trait_druid_01,
//     `Druid Apprentice`,
//     `You have just started your journey as a druid. You are still learning the basics of nature magic and shapeshifting. Boosts your intelligence by 2 points, your willpower by 2 points, your staff by 1 point and your tome by 1 point`,
//     new PassiveStatusBonus({
//         vitality: 2,
//         willpower: 2,
//         staff: 1,
//         spear: 1
//     }),
// )

// export const trait_druid_02 = new Trait(
//     TraitEnum.trait_druid_02,
//     `Druid Adept`,
//     `You have become an adept druid, mastering the art of nature magic and shapeshifting. Boosts your intelligence by 4 points, your willpower by 4 points, your staff by 2 points and your tome by 2 points`,
//     new PassiveStatusBonus({
//         vitality: 4,
//         willpower: 4,
//         staff: 2,
//         spear: 2
//     }),
// )

// export const trait_druid_03 = new Trait(
//     TraitEnum.trait_druid_03,
//     `Druid Master`,
//     `You have become a master druid, your nature magic and shapeshifting skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your staff by 3 points and your tome by 3 points`,
//     new PassiveStatusBonus({
//         vitality: 6,
//         willpower: 6,
//         staff: 3,
//         spear: 3
//     }),
// )

export const trait_oracle_01 = new Trait(
    TraitEnum.trait_oracle_01,
    `Oracle Apprentice`,
    `You have just started your journey as an oracle. You are still learning the basics of divination and prophecy. Boosts your intelligence by 2 points, your willpower by 2 points, your staff by 1 point and your tome by 1 point`,
    new PassiveStatusBonus({
        charisma: 2,
        willpower: 2,
        staff: 1,
        tome: 1
    }),
)

export const trait_oracle_02 = new Trait(
    TraitEnum.trait_oracle_02,
    `Oracle Adept`,
    `You have become an adept oracle, mastering the art of divination and prophecy. Boosts your intelligence by 4 points, your willpower by 4 points, your staff by 2 points and your tome by 2 points`,
    new PassiveStatusBonus({
        charisma: 4,
        willpower: 4,
        staff: 2,
        tome: 2
    }),
)

export const trait_oracle_03 = new Trait(
    TraitEnum.trait_oracle_03,
    `Oracle Master`,
    `You have become a master oracle, your divination and prophecy skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your staff by 3 points and your tome by 3 points`,
    new PassiveStatusBonus({
        charisma: 6,
        willpower: 6,
        staff: 3,
        tome: 3
    }),
)

export const trait_inquisitor_01 = new Trait(
    TraitEnum.trait_inquisitor_01,
    `Inquisitor Apprentice`,
    `You have just started your journey as an inquisitor. You are still learning the basics of investigation and interrogation. Boosts your intelligence by 2 points, your willpower by 2 points, your staff by 1 point and your tome by 1 point`,
    new PassiveStatusBonus({
        intelligence: 2,
        planar: 2,
        sword: 1,
        magicWand: 1
    }),
)

export const trait_inquisitor_02 = new Trait(
    TraitEnum.trait_inquisitor_02,
    `Inquisitor Adept`,
    `You have become an adept inquisitor, mastering the art of investigation and interrogation. Boosts your intelligence by 4 points, your willpower by 4 points, your staff by 2 points and your tome by 2 points`,
    new PassiveStatusBonus({
        intelligence: 4,
        planar: 4,
        sword: 2,
        magicWand: 2
    }),
)

export const trait_inquisitor_03 = new Trait(
    TraitEnum.trait_inquisitor_03,
    `Inquisitor Master`,
    `You have become a master inquisitor, your investigation and interrogation skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your staff by 3 points and your tome by 3 points`,
    new PassiveStatusBonus({
        intelligence: 6,
        planar: 6,
        sword: 3,
        magicWand: 3
    }),
)

export const trait_warden_01 = new Trait(
    TraitEnum.trait_warden_01,
    `Warden Apprentice`,
    `You have just started your journey as a warden. You are still learning the basics of nature magic and shapeshifting. Boosts your intelligence by 2 points, your willpower by 2 points, your staff by 1 point and your spear by 1 point`,
    new PassiveStatusBonus({
        vitality: 2,
        willpower: 2,
        staff: 1,
        spear: 1
    }),
)

export const trait_warden_02 = new Trait(
    TraitEnum.trait_warden_02,
    `Warden Adept`,
    `You have become an adept warden, mastering the art of nature magic and shapeshifting. Boosts your intelligence by 4 points, your willpower by 4 points, your staff by 2 points and your spear by 2 points`,
    new PassiveStatusBonus({
        vitality: 4,
        willpower: 4,
        staff: 2,
        spear: 2
    }),
)

export const trait_warden_03 = new Trait(
    TraitEnum.trait_warden_03,
    `Warden Master`,
    `You have become a master warden, your nature magic and shapeshifting skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your staff by 3 points and your spear by 3 points`,
    new PassiveStatusBonus({
        vitality: 6,
        willpower: 6,
        staff: 3,
        spear: 3
    }),
)

export const trait_alchemist_01 = new Trait(
    TraitEnum.trait_alchemist_01,
    `Alchemist Apprentice`,
    `You have just started your journey as an alchemist. You are still learning the basics of potion making and elixirs. Boosts your intelligence by 2 points, your willpower by 2 points, your alchemy by 1 point and your tome by 1 point`,
    new PassiveStatusBonus({
        intelligence: 2,
        willpower: 2,
        alchemy: 1,
        tome: 1
    }),
)

export const trait_alchemist_02 = new Trait(
    TraitEnum.trait_alchemist_02,
    `Alchemist Adept`,
    `You have become an adept alchemist, mastering the art of potion making and elixirs. Boosts your intelligence by 4 points, your willpower by 4 points, your alchemy by 2 points and your tome by 2 points`,
    new PassiveStatusBonus({
        intelligence: 4,
        willpower: 4,
        alchemy: 2,
        tome: 2
    }),
)

export const trait_alchemist_03 = new Trait(
    TraitEnum.trait_alchemist_03,
    `Alchemist Master`,
    `You have become a master alchemist, your potion making and elixirs skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your alchemy by 3 points and your tome by 3 points`,
    new PassiveStatusBonus({
        intelligence: 6,
        willpower: 6,
        alchemy: 3,
        tome: 3
    }),
)

export const trait_necromancer_01 = new Trait(
    TraitEnum.trait_necromancer_01,
    `Necromancer Apprentice`,
    `You have just started your journey as a necromancer. You are still learning the basics of dark magic and necromancy. Boosts your intelligence by 2 points, your willpower by 2 points, your magicWand by 1 point and your tome by 1 point`,
    new PassiveStatusBonus({
        intelligence: 2,
        willpower: 2,
        magicWand: 1,
        tome: 1
    }),
)

export const trait_necromancer_02 = new Trait(
    TraitEnum.trait_necromancer_02,
    `Necromancer Adept`,
    `You have become an adept necromancer, mastering the art of dark magic and necromancy. Boosts your intelligence by 4 points, your willpower by 4 points, your magicWand by 2 points and your tome by 2 points`,
    new PassiveStatusBonus({
        intelligence: 4,
        willpower: 4,
        magicWand: 2,
        tome: 2
    }),
)

export const trait_necromancer_03 = new Trait(
    TraitEnum.trait_necromancer_03,
    `Necromancer Master`,
    `You have become a master necromancer, your dark magic and necromancy skills are unmatched. Boosts your intelligence by 6 points, your willpower by 6 points, your magicWand by 3 points and your tome by 3 points`,
    new PassiveStatusBonus({
        intelligence: 6,
        willpower: 6,
        magicWand: 3,
        tome: 3
    }),
)

export const trait_martialArtist_sword_01 = new Trait(
    TraitEnum.trait_martialArtist_sword_01,
    `Martial Artist Apprentice`,
    `You have just started your journey as a martial artist. You are still learning the basics of sword fighting and internal energy. Boosts your strength by 2 points, your endurance by 2 points, your sword by 1 point and your internal by 1 point`,
    new PassiveStatusBonus({
        dexterity: 2,
        sword: 2,
        agility: 1,
        strength: 1
    }),
)

export const trait_martialArtist_sword_02 = new Trait(
    TraitEnum.trait_martialArtist_sword_02,
    `Martial Artist Adept`,
    `You have become an adept martial artist, mastering the art of sword fighting and internal energy. Boosts your strength by 4 points, your endurance by 4 points, your sword by 2 points and your internal by 2 points`,
    new PassiveStatusBonus({
        dexterity: 4,
        sword: 4,
        agility: 2,
        strength: 2
    }),
)

export const trait_martialArtist_sword_03 = new Trait(
    TraitEnum.trait_martialArtist_sword_03,
    `Martial Artist Master`,
    `You have become a master martial artist, your sword fighting and internal energy skills are unmatched. Boosts your strength by 6 points, your endurance by 6 points, your sword by 3 points and your internal by 3 points`,
    new PassiveStatusBonus({
        dexterity: 6,
        sword: 6,
        agility: 3,
        strength: 3
    }),
)

export const trait_martialArtist_hand_01 = new Trait(
    TraitEnum.trait_martialArtist_hand_01,
    `Martial Artist Apprentice`,
    `You have just started your journey as a martial artist. You are still learning the basics of hand-to-hand combat and internal energy. Boosts your strength by 2 points, your endurance by 2 points, your hand by 1 point and your internal by 1 point`,
    new PassiveStatusBonus({
        dexterity: 2,
        bareHand: 2,
        breath: 1,
        vitality: 1
    }),
)

export const trait_martialArtist_hand_02 = new Trait(
    TraitEnum.trait_martialArtist_hand_02,
    `Martial Artist Adept`,
    `You have become an adept martial artist, mastering the art of hand-to-hand combat and internal energy. Boosts your strength by 4 points, your endurance by 4 points, your hand by 2 points and your internal by 2 points`,
    new PassiveStatusBonus({
        dexterity: 4,
        bareHand: 4,
        breath: 2,
        vitality: 2
    }),
)

export const trait_martialArtist_hand_03 = new Trait(
    TraitEnum.trait_martialArtist_hand_03,
    `Martial Artist Master`,
    `You have become a master martial artist, your hand-to-hand combat and internal energy skills are unmatched. Boosts your strength by 6 points, your endurance by 6 points, your hand by 3 points and your internal by 3 points`,
    new PassiveStatusBonus({
        dexterity: 6,
        bareHand: 6,
        breath: 3,
        vitality: 3
    }),
)

export const trait_martialArtist_internal_01 = new Trait(
    TraitEnum.trait_martialArtist_internal_01,
    `Martial Artist Apprentice`,
    `You have just started your journey as a martial artist. You are still learning the basics of internal energy and meditation. Boosts your strength by 2 points, your endurance by 2 points, your internal by 1 point and your meditation by 1 point`,
    new PassiveStatusBonus({
        breath: 2,
        planar: 2,
        willpower: 1,
        vitality: 1
    }),
)

export const trait_martialArtist_internal_02 = new Trait(
    TraitEnum.trait_martialArtist_internal_02,
    `Martial Artist Adept`,
    `You have become an adept martial artist, mastering the art of internal energy and meditation. Boosts your strength by 4 points, your endurance by 4 points, your internal by 2 points and your meditation by 2 points`,
    new PassiveStatusBonus({
        breath: 4,
        planar: 4,
        willpower: 2,
        vitality: 2
    }),
)

export const trait_martialArtist_internal_03 = new Trait(
    TraitEnum.trait_martialArtist_internal_03,
    `Martial Artist Master`,
    `You have become a master martial artist, your internal energy and meditation skills are unmatched. Boosts your strength by 6 points, your endurance by 6 points, your internal by 3 points and your meditation by 3 points`,
    new PassiveStatusBonus({
        breath: 6,
        planar: 6,
        willpower: 3,
        vitality: 3
    }),
)


export const trait_hardWorker = new Trait(
    TraitEnum.trait_hardWorker,
    `ขยันขันแข็ง`,
    `มุ่งมั่นและไม่ย่อท้อ ทำให้มีความอดทนต่อความเหนื่อยล้าได้ดีกว่า`,
    new PassiveStatusBonus({
        endurance: 2,
    })
);

export const trait_quickLearner = new Trait(
    TraitEnum.trait_quickLearner,
    `เรียนรู้รวดเร็ว`,
    `เรียนรู้สิ่งใหม่อย่างรวดเร็ว เพิ่มโอกาสในการพัฒนาทักษะ`,
    new PassiveStatusBonus({
        intelligence: 2,
    })
);

export const trait_luckyBreak = new Trait(
    TraitEnum.trait_luckyBreak,
    `โชคเข้าข้าง`,
    `มักจะมีโชคดีเล็กๆ น้อยๆ เข้าข้างในช่วงเวลาสำคัญ`,
    new PassiveStatusBonus({
        luck: 2,
    })
);

export const trait_nimbleFingers = new Trait(
    TraitEnum.trait_nimbleFingers,
    `นิ้วมือว่องไว`,
    `นิ้วที่รวดเร็วและแม่นยำ ทำให้งานที่ต้องใช้ความละเอียดกลายเป็นเรื่องง่ายขึ้น`,
    new PassiveStatusBonus({
        dexterity: 2,
    })
);

export const trait_toughBody = new Trait(
    TraitEnum.trait_toughBody,
    `ร่างกายแข็งแกร่ง`,
    `ทนทานต่อความเหนื่อยล้าและการบาดเจ็บได้ดีขึ้น`,
    new PassiveStatusBonus({
        vitality: 2,
    })
);

export const trait_socialCharm = new Trait(
    TraitEnum.trait_socialCharm,
    `เสน่ห์ทางสังคม`,
    `วาจาไพเราะและบุคลิกน่าดึงดูด เพิ่มโอกาสในการสร้างความประทับใจ`,
    new PassiveStatusBonus({
        charisma: 2,
    })
);

export const trait_balancedStep = new Trait(
    TraitEnum.trait_balancedStep,
    `ก้าวเดินมั่นคง`,
    `การเคลื่อนไหวที่สมดุลและมั่นคง ทำให้หลีกเลี่ยงอุปสรรคได้ง่าย`,
    new PassiveStatusBonus({
        agility: 2,
    })
);

export const trait_resilientMind = new Trait(
    TraitEnum.trait_resilientMind,
    `จิตใจแน่วแน่`,
    `จิตใจเข้มแข็ง สามารถปัดเป่าความเครียดและสิ่งรบกวนได้ง่าย`,
    new PassiveStatusBonus({
        willpower: 2,
    })
);

export const trait_attentive = new Trait(
    TraitEnum.trait_attentive,
    `สายตาเฉียบแหลม`,
    `สังเกตสิ่งเล็กน้อยที่ผู้อื่นมองข้าม เพิ่มโอกาสทั้งในด้านความเฉลียวฉลาดและโชคเล็กน้อย`,
    new PassiveStatusBonus({
        intelligence: 1,
        luck: 1,
    })
);

export const trait_focusedStrike = new Trait(
    TraitEnum.trait_focusedStrike,
    `โจมตีแม่นยำ`,
    `พุ่งเป้าอย่างมั่นใจ ทำให้การโจมตีมีความแม่นยำและคล่องตัวมากขึ้น`,
    new PassiveStatusBonus({
        dexterity: 1,
        pHIT: 1,
    })
);

export const trait_bornSurvivor = new Trait(
    TraitEnum.trait_bornSurvivor,
    `ผู้รอดชีวิตโดยกำเนิด`,
    `เอาตัวรอดจากสถานการณ์ยากลำบากได้อย่างชาญฉลาด`,
    new PassiveStatusBonus({
        vitality: 1,
        luck: 1,
    })
);

export const trait_lightWalker = new Trait(
    TraitEnum.trait_lightWalker,
    `ผู้เดินเบา`,
    `เคลื่อนไหวอย่างเบาและเงียบ ทำให้ยากต่อการถูกตรวจพบ`,
    new PassiveStatusBonus({
        agility: 2,
    })
);

export const trait_determined = new Trait(
    TraitEnum.trait_determined,
    `จิตใจมุ่งมั่น`,
    `ตั้งใจและไม่ยอมแพ้ต่ออุปสรรค เพิ่มความมุ่งมั่นอย่างต่อเนื่อง`,
    new PassiveStatusBonus({
        willpower: 2,
    })
);

export const TraitRepository = {
    // MARK: class traits
    'trait_fighter_01': trait_fighter_01,
    'trait_fighter_02': trait_fighter_02,
    'trait_fighter_03': trait_fighter_03,
    'trait_mage_01': trait_mage_01,
    'trait_mage_02': trait_mage_02,
    'trait_mage_03': trait_mage_03,
    'trait_scout_01': trait_scout_01,
    'trait_scout_02': trait_scout_02,
    'trait_scout_03': trait_scout_03,
    'trait_cleric_01': trait_cleric_01,
    'trait_cleric_02': trait_cleric_02,
    'trait_cleric_03': trait_cleric_03,
    'trait_templar_01': trait_templar_01,
    'trait_templar_02': trait_templar_02,
    'trait_templar_03': trait_templar_03,
    'trait_hexbinder_01': trait_hexbinder_01,
    'trait_hexbinder_02': trait_hexbinder_02,
    'trait_hexbinder_03': trait_hexbinder_03,
    'trait_soldier_01': trait_soldier_01,
    'trait_soldier_02': trait_soldier_02,
    'trait_soldier_03': trait_soldier_03,
    'trait_spellblade_01': trait_spellblade_01,
    'trait_spellblade_02': trait_spellblade_02,
    'trait_spellblade_03': trait_spellblade_03,
    'trait_skirmisher_01': trait_skirmisher_01,
    'trait_skirmisher_02': trait_skirmisher_02,
    'trait_skirmisher_03': trait_skirmisher_03,
    'trait_occultist_01': trait_occultist_01,
    'trait_occultist_02': trait_occultist_02,
    'trait_occultist_03': trait_occultist_03,
    'trait_knight_01': trait_knight_01,
    'trait_knight_02': trait_knight_02,
    'trait_knight_03': trait_knight_03,
    'trait_archPriest_01': trait_archPriest_01,
    'trait_archPriest_02': trait_archPriest_02,
    'trait_archPriest_03': trait_archPriest_03,
    // 'trait_druid_01': trait_druid_01,
    // 'trait_druid_02': trait_druid_02,
    // 'trait_druid_03': trait_druid_03,
    'trait_oracle_01': trait_oracle_01,
    'trait_oracle_02': trait_oracle_02,
    'trait_oracle_03': trait_oracle_03,
    'trait_inquisitor_01': trait_inquisitor_01,
    'trait_inquisitor_02': trait_inquisitor_02,
    'trait_inquisitor_03': trait_inquisitor_03,
    'trait_warden_01': trait_warden_01,
    'trait_warden_02': trait_warden_02,
    'trait_warden_03': trait_warden_03,
    'trait_alchemist_01': trait_alchemist_01,
    'trait_alchemist_02': trait_alchemist_02,
    'trait_alchemist_03': trait_alchemist_03,
    'trait_necromancer_01': trait_necromancer_01,
    'trait_necromancer_02': trait_necromancer_02,
    'trait_necromancer_03': trait_necromancer_03,
    'trait_martialArtist_sword_01': trait_martialArtist_sword_01,
    'trait_martialArtist_sword_02': trait_martialArtist_sword_02,
    'trait_martialArtist_sword_03': trait_martialArtist_sword_03,
    'trait_martialArtist_hand_01': trait_martialArtist_hand_01,
    'trait_martialArtist_hand_02': trait_martialArtist_hand_02,
    'trait_martialArtist_hand_03': trait_martialArtist_hand_03,
    'trait_martialArtist_internal_01': trait_martialArtist_internal_01,
    'trait_martialArtist_internal_02': trait_martialArtist_internal_02,
    'trait_martialArtist_internal_03': trait_martialArtist_internal_03,

    'trait_common_01': trait_common_01,

    // MARK: additional attribute traits
    'trait_charisma_01': trait_charisma_01,
    'trait_charisma_02': trait_charisma_02,
    'trait_charisma_03': trait_charisma_03,
    'trait_charisma_04': trait_charisma_04,
    'trait_charisma_05': trait_charisma_05,
    'trait_luck_01': trait_luck_01,
    'trait_luck_02': trait_luck_02,
    'trait_luck_03': trait_luck_03,
    'trait_luck_04': trait_luck_04,
    'trait_luck_05': trait_luck_05,
    'trait_intelligence_01': trait_intelligence_01,
    'trait_intelligence_02': trait_intelligence_02,
    'trait_intelligence_03': trait_intelligence_03,
    'trait_intelligence_04': trait_intelligence_04,
    'trait_intelligence_05': trait_intelligence_05,
    'trait_strength_01': trait_strength_01,
    'trait_strength_02': trait_strength_02,
    'trait_strength_03': trait_strength_03,
    'trait_strength_04': trait_strength_04,
    'trait_strength_05': trait_strength_05,
    'trait_endurance_01': trait_endurance_01,
    'trait_endurance_02': trait_endurance_02,
    'trait_endurance_03': trait_endurance_03,
    'trait_endurance_04': trait_endurance_04,
    'trait_endurance_05': trait_endurance_05,
    'trait_dexterity_01': trait_dexterity_01,
    'trait_dexterity_02': trait_dexterity_02,
    'trait_dexterity_03': trait_dexterity_03,
    'trait_dexterity_04': trait_dexterity_04,
    'trait_dexterity_05': trait_dexterity_05,
    'trait_agility_01': trait_agility_01,
    'trait_agility_02': trait_agility_02,
    'trait_agility_03': trait_agility_03,
    'trait_agility_04': trait_agility_04,
    'trait_agility_05': trait_agility_05,
    'trait_vitality_01': trait_vitality_01,
    'trait_vitality_02': trait_vitality_02,
    'trait_vitality_03': trait_vitality_03,
    'trait_vitality_04': trait_vitality_04,
    'trait_vitality_05': trait_vitality_05,
    'trait_willpower_01': trait_willpower_01,
    'trait_willpower_02': trait_willpower_02,
    'trait_willpower_03': trait_willpower_03,
    'trait_willpower_04': trait_willpower_04,
    'trait_willpower_05': trait_willpower_05,
    'trait_leadership_01': trait_leadership_01,
    'trait_leadership_02': trait_leadership_02,
    'trait_leadership_03': trait_leadership_03,
    'trait_leadership_04': trait_leadership_04,
    'trait_leadership_05': trait_leadership_05,
    'trait_breath_01': trait_breath_01,
    'trait_breath_02': trait_breath_02,
    'trait_breath_03': trait_breath_03,
    'trait_breath_04': trait_breath_04,
    'trait_breath_05': trait_breath_05,
    'trait_planar_01': trait_planar_01,
    'trait_planar_02': trait_planar_02,
    'trait_planar_03': trait_planar_03,
    'trait_planar_04': trait_planar_04,
    'trait_planar_05': trait_planar_05,

    // MARK: negative attribute traits
    'trait_charisma_01_neg': trait_charisma_01_neg,
    'trait_charisma_02_neg': trait_charisma_02_neg,
    'trait_charisma_03_neg': trait_charisma_03_neg,
    'trait_charisma_04_neg': trait_charisma_04_neg,
    'trait_charisma_05_neg': trait_charisma_05_neg,
    'trait_luck_01_neg': trait_luck_01_neg,
    'trait_luck_02_neg': trait_luck_02_neg,
    'trait_luck_03_neg': trait_luck_03_neg,
    'trait_luck_04_neg': trait_luck_04_neg,
    'trait_luck_05_neg': trait_luck_05_neg,
    'trait_intelligence_01_neg': trait_intelligence_01_neg,
    'trait_intelligence_02_neg': trait_intelligence_02_neg,
    'trait_intelligence_03_neg': trait_intelligence_03_neg,
    'trait_intelligence_04_neg': trait_intelligence_04_neg,
    'trait_intelligence_05_neg': trait_intelligence_05_neg,
    'trait_strength_01_neg': trait_strength_01_neg,
    'trait_strength_02_neg': trait_strength_02_neg,
    'trait_strength_03_neg': trait_strength_03_neg,
    'trait_strength_04_neg': trait_strength_04_neg,
    'trait_strength_05_neg': trait_strength_05_neg,
    'trait_endurance_01_neg': trait_endurance_01_neg,
    'trait_endurance_02_neg': trait_endurance_02_neg,
    'trait_endurance_03_neg': trait_endurance_03_neg,
    'trait_endurance_04_neg': trait_endurance_04_neg,
    'trait_endurance_05_neg': trait_endurance_05_neg,
    'trait_dexterity_01_neg': trait_dexterity_01_neg,
    'trait_dexterity_02_neg': trait_dexterity_02_neg,
    'trait_dexterity_03_neg': trait_dexterity_03_neg,
    'trait_dexterity_04_neg': trait_dexterity_04_neg,
    'trait_dexterity_05_neg': trait_dexterity_05_neg,
    'trait_agility_01_neg': trait_agility_01_neg,
    'trait_agility_02_neg': trait_agility_02_neg,
    'trait_agility_03_neg': trait_agility_03_neg,
    'trait_agility_04_neg': trait_agility_04_neg,
    'trait_agility_05_neg': trait_agility_05_neg,
    'trait_vitality_01_neg': trait_vitality_01_neg,
    'trait_vitality_02_neg': trait_vitality_02_neg,
    'trait_vitality_03_neg': trait_vitality_03_neg,
    'trait_vitality_04_neg': trait_vitality_04_neg,
    'trait_vitality_05_neg': trait_vitality_05_neg,
    'trait_willpower_01_neg': trait_willpower_01_neg,
    'trait_willpower_02_neg': trait_willpower_02_neg,
    'trait_willpower_03_neg': trait_willpower_03_neg,
    'trait_willpower_04_neg': trait_willpower_04_neg,
    'trait_willpower_05_neg': trait_willpower_05_neg,
    'trait_leadership_01_neg': trait_leadership_01_neg,
    'trait_leadership_02_neg': trait_leadership_02_neg,
    'trait_leadership_03_neg': trait_leadership_03_neg,
    'trait_leadership_04_neg': trait_leadership_04_neg,
    'trait_leadership_05_neg': trait_leadership_05_neg,
    'trait_breath_01_neg': trait_breath_01_neg,
    'trait_breath_02_neg': trait_breath_02_neg,
    'trait_breath_03_neg': trait_breath_03_neg,
    'trait_breath_04_neg': trait_breath_04_neg,
    'trait_breath_05_neg': trait_breath_05_neg,
    'trait_planar_01_neg': trait_planar_01_neg,
    'trait_planar_02_neg': trait_planar_02_neg,
    'trait_planar_03_neg': trait_planar_03_neg,
    'trait_planar_04_neg': trait_planar_04_neg,
    'trait_planar_05_neg': trait_planar_05_neg,

    // MARK: additional elemental traits
    'trait_order_01': trait_order_01,
    'trait_order_02': trait_order_02,
    'trait_order_03': trait_order_03,
    'trait_order_04': trait_order_04,
    'trait_order_05': trait_order_05,
    'trait_chaos_01': trait_chaos_01,
    'trait_chaos_02': trait_chaos_02,
    'trait_chaos_03': trait_chaos_03,
    'trait_chaos_04': trait_chaos_04,
    'trait_chaos_05': trait_chaos_05,
    'trait_geo_01': trait_geo_01,
    'trait_geo_02': trait_geo_02,
    'trait_geo_03': trait_geo_03,
    'trait_geo_04': trait_geo_04,
    'trait_geo_05': trait_geo_05,
    'trait_water_01': trait_water_01,
    'trait_water_02': trait_water_02,
    'trait_water_03': trait_water_03,
    'trait_water_04': trait_water_04,
    'trait_water_05': trait_water_05,
    'trait_air_01': trait_air_01,
    'trait_air_02': trait_air_02,
    'trait_air_03': trait_air_03,
    'trait_air_04': trait_air_04,
    'trait_air_05': trait_air_05,
    'trait_fire_01': trait_fire_01,
    'trait_fire_02': trait_fire_02,
    'trait_fire_03': trait_fire_03,
    'trait_fire_04': trait_fire_04,
    'trait_fire_05': trait_fire_05,

    // MARK: negative elemental traits
    'trait_order_01_neg': trait_order_01_neg,
    'trait_order_02_neg': trait_order_02_neg,
    'trait_order_03_neg': trait_order_03_neg,
    'trait_order_04_neg': trait_order_04_neg,
    'trait_order_05_neg': trait_order_05_neg,
    'trait_chaos_01_neg': trait_chaos_01_neg,
    'trait_chaos_02_neg': trait_chaos_02_neg,
    'trait_chaos_03_neg': trait_chaos_03_neg,
    'trait_chaos_04_neg': trait_chaos_04_neg,
    'trait_chaos_05_neg': trait_chaos_05_neg,
    'trait_geo_01_neg': trait_geo_01_neg,
    'trait_geo_02_neg': trait_geo_02_neg,
    'trait_geo_03_neg': trait_geo_03_neg,
    'trait_geo_04_neg': trait_geo_04_neg,
    'trait_geo_05_neg': trait_geo_05_neg,
    'trait_water_01_neg': trait_water_01_neg,
    'trait_water_02_neg': trait_water_02_neg,
    'trait_water_03_neg': trait_water_03_neg,
    'trait_water_04_neg': trait_water_04_neg,
    'trait_water_05_neg': trait_water_05_neg,
    'trait_air_01_neg': trait_air_01_neg,
    'trait_air_02_neg': trait_air_02_neg,
    'trait_air_03_neg': trait_air_03_neg,
    'trait_air_04_neg': trait_air_04_neg,
    'trait_air_05_neg': trait_air_05_neg,
    'trait_fire_01_neg': trait_fire_01_neg,
    'trait_fire_02_neg': trait_fire_02_neg,
    'trait_fire_03_neg': trait_fire_03_neg,
    'trait_fire_04_neg': trait_fire_04_neg,
    'trait_fire_05_neg': trait_fire_05_neg,

    // MARK: additional weapon traits
    'trait_bareHand_01': trait_bareHand_01,
    'trait_bareHand_02': trait_bareHand_02,
    'trait_bareHand_03': trait_bareHand_03,
    'trait_bareHand_04': trait_bareHand_04,
    'trait_bareHand_05': trait_bareHand_05,
    'trait_sword_01': trait_sword_01,
    'trait_sword_02': trait_sword_02,
    'trait_sword_03': trait_sword_03,
    'trait_sword_04': trait_sword_04,
    'trait_sword_05': trait_sword_05,
    'trait_blade_01': trait_blade_01,
    'trait_blade_02': trait_blade_02,
    'trait_blade_03': trait_blade_03,
    'trait_blade_04': trait_blade_04,
    'trait_blade_05': trait_blade_05,
    'trait_spear_01': trait_spear_01,
    'trait_spear_02': trait_spear_02,
    'trait_spear_03': trait_spear_03,
    'trait_spear_04': trait_spear_04,
    'trait_spear_05': trait_spear_05,
    'trait_axe_01': trait_axe_01,
    'trait_axe_02': trait_axe_02,
    'trait_axe_03': trait_axe_03,
    'trait_axe_04': trait_axe_04,
    'trait_axe_05': trait_axe_05,
    'trait_bow_01': trait_bow_01,
    'trait_bow_02': trait_bow_02,
    'trait_bow_03': trait_bow_03,
    'trait_bow_04': trait_bow_04,
    'trait_bow_05': trait_bow_05,
    'trait_dagger_01': trait_dagger_01,
    'trait_dagger_02': trait_dagger_02,
    'trait_dagger_03': trait_dagger_03,
    'trait_dagger_04': trait_dagger_04,
    'trait_dagger_05': trait_dagger_05,
    'trait_magicWand_01': trait_magicWand_01,
    'trait_magicWand_02': trait_magicWand_02,
    'trait_magicWand_03': trait_magicWand_03,
    'trait_magicWand_04': trait_magicWand_04,
    'trait_magicWand_05': trait_magicWand_05,
    'trait_staff_01': trait_staff_01,
    'trait_staff_02': trait_staff_02,
    'trait_staff_03': trait_staff_03,
    'trait_staff_04': trait_staff_04,
    'trait_staff_05': trait_staff_05,
    'trait_tome_01': trait_tome_01,
    'trait_tome_02': trait_tome_02,
    'trait_tome_03': trait_tome_03,
    'trait_tome_04': trait_tome_04,
    'trait_tome_05': trait_tome_05,
    'trait_orb_01': trait_orb_01,
    'trait_orb_02': trait_orb_02,
    'trait_orb_03': trait_orb_03,
    'trait_orb_04': trait_orb_04,
    'trait_orb_05': trait_orb_05,
    'trait_mace_01': trait_mace_01,
    'trait_mace_02': trait_mace_02,
    'trait_mace_03': trait_mace_03,
    'trait_mace_04': trait_mace_04,
    'trait_mace_05': trait_mace_05,
    'trait_shield_01': trait_shield_01,
    'trait_shield_02': trait_shield_02,
    'trait_shield_03': trait_shield_03,
    'trait_shield_04': trait_shield_04,
    'trait_shield_05': trait_shield_05,
    // MARK: negative weapon traits
    'trait_bareHand_01_neg': trait_bareHand_01_neg,
    'trait_bareHand_02_neg': trait_bareHand_02_neg,
    'trait_bareHand_03_neg': trait_bareHand_03_neg,
    'trait_bareHand_04_neg': trait_bareHand_04_neg,
    'trait_bareHand_05_neg': trait_bareHand_05_neg,
    'trait_sword_01_neg': trait_sword_01_neg,
    'trait_sword_02_neg': trait_sword_02_neg,
    'trait_sword_03_neg': trait_sword_03_neg,
    'trait_sword_04_neg': trait_sword_04_neg,
    'trait_sword_05_neg': trait_sword_05_neg,
    'trait_blade_01_neg': trait_blade_01_neg,
    'trait_blade_02_neg': trait_blade_02_neg,
    'trait_blade_03_neg': trait_blade_03_neg,
    'trait_blade_04_neg': trait_blade_04_neg,
    'trait_blade_05_neg': trait_blade_05_neg,
    'trait_spear_01_neg': trait_spear_01_neg,
    'trait_spear_02_neg': trait_spear_02_neg,
    'trait_spear_03_neg': trait_spear_03_neg,
    'trait_spear_04_neg': trait_spear_04_neg,
    'trait_spear_05_neg': trait_spear_05_neg,
    'trait_axe_01_neg': trait_axe_01_neg,
    'trait_axe_02_neg': trait_axe_02_neg,
    'trait_axe_03_neg': trait_axe_03_neg,
    'trait_axe_04_neg': trait_axe_04_neg,
    'trait_axe_05_neg': trait_axe_05_neg,
    'trait_bow_01_neg': trait_bow_01_neg,
    'trait_bow_02_neg': trait_bow_02_neg,
    'trait_bow_03_neg': trait_bow_03_neg,
    'trait_bow_04_neg': trait_bow_04_neg,
    'trait_bow_05_neg': trait_bow_05_neg,
    'trait_dagger_01_neg': trait_dagger_01_neg,
    'trait_dagger_02_neg': trait_dagger_02_neg,
    'trait_dagger_03_neg': trait_dagger_03_neg,
    'trait_dagger_04_neg': trait_dagger_04_neg,
    'trait_dagger_05_neg': trait_dagger_05_neg,
    'trait_magicWand_01_neg': trait_magicWand_01_neg,
    'trait_magicWand_02_neg': trait_magicWand_02_neg,
    'trait_magicWand_03_neg': trait_magicWand_03_neg,
    'trait_magicWand_04_neg': trait_magicWand_04_neg,
    'trait_magicWand_05_neg': trait_magicWand_05_neg,
    'trait_staff_01_neg': trait_staff_01_neg,
    'trait_staff_02_neg': trait_staff_02_neg,
    'trait_staff_03_neg': trait_staff_03_neg,
    'trait_staff_04_neg': trait_staff_04_neg,
    'trait_staff_05_neg': trait_staff_05_neg,
    'trait_tome_01_neg': trait_tome_01_neg,
    'trait_tome_02_neg': trait_tome_02_neg,
    'trait_tome_03_neg': trait_tome_03_neg,
    'trait_tome_04_neg': trait_tome_04_neg,
    'trait_tome_05_neg': trait_tome_05_neg,
    'trait_orb_01_neg': trait_orb_01_neg,
    'trait_orb_02_neg': trait_orb_02_neg,
    'trait_orb_03_neg': trait_orb_03_neg,
    'trait_orb_04_neg': trait_orb_04_neg,
    'trait_orb_05_neg': trait_orb_05_neg,
    'trait_mace_01_neg': trait_mace_01_neg,
    'trait_mace_02_neg': trait_mace_02_neg,
    'trait_mace_03_neg': trait_mace_03_neg,
    'trait_mace_04_neg': trait_mace_04_neg,
    'trait_mace_05_neg': trait_mace_05_neg,
    'trait_shield_01_neg': trait_shield_01_neg,
    'trait_shield_02_neg': trait_shield_02_neg,
    'trait_shield_03_neg': trait_shield_03_neg,
    'trait_shield_04_neg': trait_shield_04_neg,
    'trait_shield_05_neg': trait_shield_05_neg,

    // MARK: additional combat traits
    'trait_pATK_01': trait_pATK_01,
    'trait_pATK_02': trait_pATK_02,
    'trait_pATK_03': trait_pATK_03,
    'trait_pATK_04': trait_pATK_04,
    'trait_pATK_05': trait_pATK_05,
    'trait_pHIT_01': trait_pHIT_01,
    'trait_pHIT_02': trait_pHIT_02,
    'trait_pHIT_03': trait_pHIT_03,
    'trait_pHIT_04': trait_pHIT_04,
    'trait_pHIT_05': trait_pHIT_05,
    'trait_pDEF_01': trait_pDEF_01,
    'trait_pDEF_02': trait_pDEF_02,
    'trait_pDEF_03': trait_pDEF_03,
    'trait_pDEF_04': trait_pDEF_04,
    'trait_pDEF_05': trait_pDEF_05,
    'trait_pCRT_01': trait_pCRT_01,
    'trait_pCRT_02': trait_pCRT_02,
    'trait_pCRT_03': trait_pCRT_03,
    'trait_pCRT_04': trait_pCRT_04,
    'trait_pCRT_05': trait_pCRT_05,
    'trait_mATK_01': trait_mATK_01,
    'trait_mATK_02': trait_mATK_02,
    'trait_mATK_03': trait_mATK_03,
    'trait_mATK_04': trait_mATK_04,
    'trait_mATK_05': trait_mATK_05,
    'trait_mHIT_01': trait_mHIT_01,
    'trait_mHIT_02': trait_mHIT_02,
    'trait_mHIT_03': trait_mHIT_03,
    'trait_mHIT_04': trait_mHIT_04,
    'trait_mHIT_05': trait_mHIT_05,
    'trait_mDEF_01': trait_mDEF_01,
    'trait_mDEF_02': trait_mDEF_02,
    'trait_mDEF_03': trait_mDEF_03,
    'trait_mDEF_04': trait_mDEF_04,
    'trait_mDEF_05': trait_mDEF_05,
    'trait_mCRT_01': trait_mCRT_01,
    'trait_mCRT_02': trait_mCRT_02,
    'trait_mCRT_03': trait_mCRT_03,
    'trait_mCRT_04': trait_mCRT_04,
    'trait_mCRT_05': trait_mCRT_05,
    'trait_dodge_01': trait_dodge_01,
    'trait_dodge_02': trait_dodge_02,
    'trait_dodge_03': trait_dodge_03,
    'trait_dodge_04': trait_dodge_04,
    'trait_dodge_05': trait_dodge_05,

    // MARK: negative combat traits
    'trait_pATK_01_neg': trait_pATK_01_neg,
    'trait_pATK_02_neg': trait_pATK_02_neg,
    'trait_pATK_03_neg': trait_pATK_03_neg,
    'trait_pATK_04_neg': trait_pATK_04_neg,
    'trait_pATK_05_neg': trait_pATK_05_neg,
    'trait_pHIT_01_neg': trait_pHIT_01_neg,
    'trait_pHIT_02_neg': trait_pHIT_02_neg,
    'trait_pHIT_03_neg': trait_pHIT_03_neg,
    'trait_pHIT_04_neg': trait_pHIT_04_neg,
    'trait_pHIT_05_neg': trait_pHIT_05_neg,
    'trait_pDEF_01_neg': trait_pDEF_01_neg,
    'trait_pDEF_02_neg': trait_pDEF_02_neg,
    'trait_pDEF_03_neg': trait_pDEF_03_neg,
    'trait_pDEF_04_neg': trait_pDEF_04_neg,
    'trait_pDEF_05_neg': trait_pDEF_05_neg,
    'trait_pCRT_01_neg': trait_pCRT_01_neg,
    'trait_pCRT_02_neg': trait_pCRT_02_neg,
    'trait_pCRT_03_neg': trait_pCRT_03_neg,
    'trait_pCRT_04_neg': trait_pCRT_04_neg,
    'trait_pCRT_05_neg': trait_pCRT_05_neg,
    'trait_mATK_01_neg': trait_mATK_01_neg,
    'trait_mATK_02_neg': trait_mATK_02_neg,
    'trait_mATK_03_neg': trait_mATK_03_neg,
    'trait_mATK_04_neg': trait_mATK_04_neg,
    'trait_mATK_05_neg': trait_mATK_05_neg,
    'trait_mHIT_01_neg': trait_mHIT_01_neg,
    'trait_mHIT_02_neg': trait_mHIT_02_neg,
    'trait_mHIT_03_neg': trait_mHIT_03_neg,
    'trait_mHIT_04_neg': trait_mHIT_04_neg,
    'trait_mHIT_05_neg': trait_mHIT_05_neg,
    'trait_mDEF_01_neg': trait_mDEF_01_neg,
    'trait_mDEF_02_neg': trait_mDEF_02_neg,
    'trait_mDEF_03_neg': trait_mDEF_03_neg,
    'trait_mDEF_04_neg': trait_mDEF_04_neg,
    'trait_mDEF_05_neg': trait_mDEF_05_neg,
    'trait_mCRT_01_neg': trait_mCRT_01_neg,
    'trait_mCRT_02_neg': trait_mCRT_02_neg,
    'trait_mCRT_03_neg': trait_mCRT_03_neg,
    'trait_mCRT_04_neg': trait_mCRT_04_neg,
    'trait_mCRT_05_neg': trait_mCRT_05_neg,
    'trait_dodge_01_neg': trait_dodge_01_neg,
    'trait_dodge_02_neg': trait_dodge_02_neg,
    'trait_dodge_03_neg': trait_dodge_03_neg,
    'trait_dodge_04_neg': trait_dodge_04_neg,
    'trait_dodge_05_neg': trait_dodge_05_neg,

    // MARK: 24 starter traits
    'trait_starter_01': trait_starter_01,
    'trait_starter_02': trait_starter_02,
    'trait_starter_03': trait_starter_03,
    'trait_starter_04': trait_starter_04,
    'trait_starter_05': trait_starter_05,
    'trait_starter_06': trait_starter_06,
    'trait_starter_07': trait_starter_07,
    'trait_starter_08': trait_starter_08,
    'trait_starter_09': trait_starter_09,
    'trait_starter_10': trait_starter_10,
    'trait_starter_11': trait_starter_11,
    'trait_starter_12': trait_starter_12,
    'trait_starter_13': trait_starter_13,
    'trait_starter_14': trait_starter_14,
    'trait_starter_15': trait_starter_15,
    'trait_starter_16': trait_starter_16,
    'trait_starter_17': trait_starter_17,
    'trait_starter_18': trait_starter_18,
    'trait_starter_19': trait_starter_19,
    'trait_starter_20': trait_starter_20,
    'trait_starter_21': trait_starter_21,
    'trait_starter_22': trait_starter_22,
    'trait_starter_23': trait_starter_23,
    'trait_starter_24': trait_starter_24,

    // MARK: story traits
    'trait_pactWithDevil': trait_pactWithDevil,
    'trait_faithful': trait_faithful,
    'trait_heretic': trait_heretic,
    'trait_enlightened': trait_enlightened,
    'trait_motherEarthBlessing': trait_motherEarthBlessing,
    'trait_warLord': trait_warLord,
    'trait_warCaster': trait_warCaster,
    'trait_darkVision': trait_darkVision,

    // MARK: monster traits
    'trait_skeleton': trait_skeleton,
    'trait_undead': trait_undead,

    // MARK: internal skills
    'trait_inner_harmony_01': trait_inner_harmony_01,
    'trait_inner_harmony_02': trait_inner_harmony_02,
    'trait_inner_harmony_03': trait_inner_harmony_03,
    'trait_inner_harmony_04': trait_inner_harmony_04,
    'trait_inner_harmony_05': trait_inner_harmony_05,
    'trait_inner_harmony_06': trait_inner_harmony_06,
    'trait_inner_warm_01': trait_inner_warm_01,
    'trait_inner_warm_02': trait_inner_warm_02,
    'trait_inner_warm_03': trait_inner_warm_03,
    'trait_inner_warm_04': trait_inner_warm_04,
    'trait_inner_warm_05': trait_inner_warm_05,
    'trait_inner_warm_06': trait_inner_warm_06,
    'trait_inner_cold_01': trait_inner_cold_01,
    'trait_inner_cold_02': trait_inner_cold_02,
    'trait_inner_cold_03': trait_inner_cold_03,
    'trait_inner_cold_04': trait_inner_cold_04,
    'trait_inner_cold_05': trait_inner_cold_05,
    'trait_inner_cold_06': trait_inner_cold_06,

    // MARK: Starting bgs traits
    'trait_hardWorker': trait_hardWorker,
    'trait_quickLearner': trait_quickLearner,
    'trait_luckyBreak': trait_luckyBreak,
    'trait_nimbleFingers': trait_nimbleFingers,
    'trait_toughBody': trait_toughBody,
    'trait_socialCharm': trait_socialCharm,
    'trait_balancedStep': trait_balancedStep,
    'trait_resilientMind': trait_resilientMind,
    'trait_attentive': trait_attentive,
    'trait_focusedStrike': trait_focusedStrike,
    'trait_bornSurvivor': trait_bornSurvivor,
    'trait_lightWalker': trait_lightWalker,
    'trait_determined': trait_determined,
};
