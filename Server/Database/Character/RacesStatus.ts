import { TraitEnum } from "../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";

export class RaceStatus {
    hp: number;
    mp: number;
    sp: number;
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
    traits: TraitEnum[];

    constructor(
        initialStats: { hp: number; mp: number; sp: number },
        attributes: {
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
        traits: TraitEnum[]
    ) {
        this.hp = initialStats.hp;
        this.mp = initialStats.mp;
        this.sp = initialStats.sp;
        this.charisma = attributes.charisma;
        this.luck = attributes.luck;
        this.intelligence = attributes.intelligence;
        this.leadership = attributes.leadership;
        this.vitality = attributes.vitality;
        this.willpower = attributes.willpower;
        this.breath = attributes.breath;
        this.planar = attributes.planar;
        this.dexterity = attributes.dexterity;
        this.agility = attributes.agility;
        this.strength = attributes.strength;
        this.endurance = attributes.endurance;
        this.traits = traits;
    }
}

export const humanRace = new RaceStatus(
    {
        hp: 6,
        mp: 6,
        sp: 6,
    },
    {
        charisma: 6,
        luck: 6,
        intelligence: 6,
        leadership: 6,
        vitality: 6,
        willpower: 6,
        breath: 6,
        planar: 6,
        dexterity: 6,
        agility: 6,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_human_adaptable, TraitEnum.trait_human_versatile]
);

export const elvenRace = new RaceStatus(
    {
        hp: 5,
        mp: 7,
        sp: 5,
    },
    {
        charisma: 7,
        luck: 6,
        intelligence: 7,
        leadership: 5,
        vitality: 5,
        willpower: 5,
        breath: 5,
        planar: 7,
        dexterity: 8,
        agility: 7,
        strength: 4,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_elven_darkvision, TraitEnum.trait_elven_planarAffinity]
);

export const orcRace = new RaceStatus(
    {
        hp: 7,
        mp: 4,
        sp: 7,
    },
    {
        charisma: 5,
        luck: 6,
        intelligence: 5,
        leadership: 6,
        vitality: 8,
        willpower: 7,
        breath: 6,
        planar: 5,
        dexterity: 5,
        agility: 4,
        strength: 8,
        endurance: 7,
    },
    [TraitEnum.trait_bodySize_large, TraitEnum.trait_orc_intimidatePresence, TraitEnum.trait_orc_savageResilience]
);

export const tritonRace = new RaceStatus(
    {
        hp: 6,
        mp: 7,
        sp: 5,
    },
    {
        charisma: 5,
        luck: 6,
        intelligence: 6,
        leadership: 4,
        vitality: 5,
        willpower: 5,
        breath: 7,
        planar: 7,
        dexterity: 8,
        agility: 7,
        strength: 5,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_triton_planarAffinity, TraitEnum.trait_triton_slippery]
);

export const dwarfRace = new RaceStatus(
    {
        hp: 7,
        mp: 5,
        sp: 7,
    },
    {
        charisma: 5,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 8,
        willpower: 7,
        breath: 6,
        planar: 4,
        dexterity: 4,
        agility: 4,
        strength: 7,
        endurance: 9,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_dwarf_darkvision, TraitEnum.trait_dwarf_sturdy]
);

export const halflingRace = new RaceStatus(
    {
        hp: 6,
        mp: 6,
        sp: 6,
    },
    {
        charisma: 6,
        luck: 8,
        intelligence: 6,
        leadership: 5,
        vitality: 5,
        willpower: 5,
        breath: 6,
        planar: 5,
        dexterity: 8,
        agility: 8,
        strength: 5,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_small, TraitEnum.trait_halfling_lucky, TraitEnum.trait_halfling_nimble]
);

export const halfElvenRace = new RaceStatus(
    {
        hp: 6,
        mp: 7,
        sp: 5,
    },
    {
        charisma: 7,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 5,
        willpower: 6,
        breath: 6,
        planar: 7,
        dexterity: 7,
        agility: 6,
        strength: 5,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_halfElf_adaptable, TraitEnum.trait_halfElf_charming, TraitEnum.trait_halfElf_versatile]
);

export const halfOrcRace = new RaceStatus(
    {
        hp: 7,
        mp: 5,
        sp: 7,
    },
    {
        charisma: 5,
        luck: 6,
        intelligence: 6,
        leadership: 6,
        vitality: 7,
        willpower: 6,
        breath: 6,
        planar: 5,
        dexterity: 6,
        agility: 5,
        strength: 7,
        endurance: 7,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_halfOrc_bloodRage, TraitEnum.trait_halfOrc_intimidatePresence, TraitEnum.trait_halfOrc_savageResilience]
);

export const halfTritonRace = new RaceStatus(
    {
        hp: 6,
        mp: 7,
        sp: 5,
    },
    {
        charisma: 6,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 6,
        willpower: 5,
        breath: 7,
        planar: 6,
        dexterity: 7,
        agility: 7,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_halfTriton_breathless, TraitEnum.trait_halfTriton_planarAffinity, TraitEnum.trait_halfTriton_slippery]
);

export const elvonRace = new RaceStatus(
    {
        hp: 5,
        mp: 8,
        sp: 5,
    },
    {
        charisma: 7,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 5,
        willpower: 6,
        breath: 6,
        planar: 7,
        dexterity: 7,
        agility: 7,
        strength: 5,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.trait_elvon_darkvision, TraitEnum.trait_elvon_planarAffinity, TraitEnum.trait_elvon_slippery]
);

export const dwarflingRace = new RaceStatus(
    {
        hp: 6,
        mp: 5,
        sp: 7,
    },
    {
        charisma: 6,
        luck: 7,
        intelligence: 6,
        leadership: 5,
        vitality: 6,
        willpower: 6,
        breath: 6,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 7,
        endurance: 7,
    },
    [TraitEnum.trait_bodySize_small, TraitEnum.trait_dwarfling_lucky, TraitEnum.trait_dwarfling_darkvision, TraitEnum.trait_dwarfling_sturdy]
);


// MARK: NPC Races
export const goblinRace = new RaceStatus(
    {
        hp: 5,
        mp: 5,
        sp: 5,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 4,
        vitality: 5,
        willpower: 5,
        breath: 5,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 4,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_small, TraitEnum.triat_darkvision, TraitEnum.trait_sneaky]
);

export const koboldRace = new RaceStatus(
    {
        hp: 4,
        mp: 4,
        sp: 4,
    },
    {
        charisma: 4,
        luck: 4,
        intelligence: 4,
        leadership: 4,
        vitality: 4,
        willpower: 4,
        breath: 4,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 4,
        endurance: 4,
    },
    [TraitEnum.trait_bodySize_small, TraitEnum.triat_darkvision, TraitEnum.trait_sneaky]
);

export const gnollRace = new RaceStatus(
    {
        hp: 6,
        mp: 4,
        sp: 6,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 5,
        vitality: 6,
        willpower: 6,
        breath: 5,
        planar: 4,
        dexterity: 5,
        agility: 5,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_savage_resilience]
);

export const hobgoblinRace = new RaceStatus(
    {
        hp: 6,
        mp: 5,
        sp: 6,
    },
    {
        charisma: 5,
        luck: 5,
        intelligence: 5,
        leadership: 5,
        vitality: 6,
        willpower: 6,
        breath: 5,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_intimidate_presence]
);

export const bugbearRace = new RaceStatus(
    {
        hp: 7,
        mp: 4,
        sp: 7,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 5,
        vitality: 7,
        willpower: 6,
        breath: 5,
        planar: 4,
        dexterity: 5,
        agility: 5,
        strength: 7,
        endurance: 7,
    },
    [TraitEnum.trait_bodySize_large, TraitEnum.triat_darkvision, TraitEnum.trait_intimidate_presence]
);

export const trollRace = new RaceStatus(
    {
        hp: 8,
        mp: 3,
        sp: 8,
    },
    {
        charisma: 3,
        luck: 4,
        intelligence: 3,
        leadership: 4,
        vitality: 8,
        willpower: 6,
        breath: 4,
        planar: 4,
        dexterity: 4,
        agility: 4,
        strength: 8,
        endurance: 8,
    },
    [TraitEnum.trait_bodySize_large, TraitEnum.triat_darkvision, TraitEnum.trait_regenerative]
);

export const slimeRace = new RaceStatus(
    {
        hp: 5,
        mp: 5,
        sp: 5,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 4,
        vitality: 5,
        willpower: 5,
        breath: 5,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 4,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_small, TraitEnum.triat_darkvision, TraitEnum.trait_slipperty]
);

export const skeletonRace = new RaceStatus(
    {
        hp: 5,
        mp: 5,
        sp: 5,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 4,
        vitality: 5,
        willpower: 5,
        breath: 5,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 4,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_undead]
);

export const zombieRace = new RaceStatus(
    {
        hp: 6,
        mp: 4,
        sp: 6,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 4,
        vitality: 6,
        willpower: 5,
        breath: 4,
        planar: 4,
        dexterity: 4,
        agility: 4,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_undead]
);

export const ghostRace = new RaceStatus(
    {
        hp: 5,
        mp: 6,
        sp: 5,
    },
    {
        charisma: 6,
        luck: 5,
        intelligence: 6,
        leadership: 5,
        vitality: 5,
        willpower: 6,
        breath: 6,
        planar: 6,
        dexterity: 6,
        agility: 6,
        strength: 5,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_undead]
);

export const familiarRace = new RaceStatus(
    {
        hp: 5,
        mp: 5,
        sp: 5,
    },
    {
        charisma: 5,
        luck: 5,
        intelligence: 5,
        leadership: 5,
        vitality: 5,
        willpower: 5,
        breath: 5,
        planar: 5,
        dexterity: 5,
        agility: 5,
        strength: 5,
        endurance: 5,
    },
    [TraitEnum.trait_bodySize_small, TraitEnum.triat_darkvision, TraitEnum.trait_planar_affinity]
);

export const demonRace = new RaceStatus(
    {
        hp: 7,
        mp: 6,
        sp: 7,
    },
    {
        charisma: 6,
        luck: 6,
        intelligence: 6,
        leadership: 6,
        vitality: 7,
        willpower: 7,
        breath: 6,
        planar: 7,
        dexterity: 6,
        agility: 6,
        strength: 7,
        endurance: 7,
    },
    [TraitEnum.trait_bodySize_large, TraitEnum.triat_darkvision, TraitEnum.trait_planar_affinity]
);

export const angelRace = new RaceStatus(
    {
        hp: 7,
        mp: 6,
        sp: 7,
    },
    {
        charisma: 7,
        luck: 7,
        intelligence: 7,
        leadership: 7,
        vitality: 7,
        willpower: 7,
        breath: 7,
        planar: 7,
        dexterity: 7,
        agility: 7,
        strength: 7,
        endurance: 7,
    },
    [TraitEnum.trait_bodySize_large, TraitEnum.triat_darkvision, TraitEnum.trait_planar_affinity]
);

export const dragonRace = new RaceStatus(
    {
        hp: 8,
        mp: 7,
        sp: 8,
    },
    {
        charisma: 7,
        luck: 7,
        intelligence: 7,
        leadership: 7,
        vitality: 8,
        willpower: 8,
        breath: 8,
        planar: 7,
        dexterity: 7,
        agility: 7,
        strength: 8,
        endurance: 8,
    },
    [TraitEnum.trait_bodySize_large, TraitEnum.triat_darkvision, TraitEnum.trait_planar_affinity]
);

export const elementalRace = new RaceStatus(
    {
        hp: 6,
        mp: 8,
        sp: 6,
    },
    {
        charisma: 6,
        luck: 6,
        intelligence: 6,
        leadership: 6,
        vitality: 6,
        willpower: 6,
        breath: 8,
        planar: 8,
        dexterity: 6,
        agility: 6,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_planar_affinity]
);

export const beastWolfRace = new RaceStatus(
    {
        hp: 6,
        mp: 4,
        sp: 6,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 4,
        vitality: 6,
        willpower: 5,
        breath: 4,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_savage_resilience]
);

export const beastTigerRace = new RaceStatus(
    {
        hp: 6,
        mp: 4,
        sp: 6,
    },
    {
        charisma: 4,
        luck: 5,
        intelligence: 4,
        leadership: 4,
        vitality: 6,
        willpower: 5,
        breath: 4,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 6,
        endurance: 6,
    },
    [TraitEnum.trait_bodySize_medium, TraitEnum.triat_darkvision, TraitEnum.trait_savage_resilience]
);