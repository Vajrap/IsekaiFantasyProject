import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { ClassModifier } from "../../../Database/Character/ClassModifier";
import { CharacterType } from "./CharacterType";

export class CharacterArchetype {
    name: string;
    gender: "MALE" | "FEMALE" | "NONE";
    id: string;
    type: CharacterType;
    level: number;
    portrait: string;
    background: string;
    alignment: { law: number, chaos: number, good: number, evil: number };
    mood: number;
    energy: number;
    fame: number;
    gold: number;
    exp: number;
    isDead: boolean;
    lastTarget: string;
    currentHP: number | null;
    currentMP: number | null;
    currentSP: number | null;
    attributes: {
        charisma: {base: number, exp: number};
        luck: {base: number, exp: number};
        intelligence: {base: number, exp: number};
        leadership: {base: number, exp: number};
        vitality: {base: number, exp: number};
        willpower: {base: number, exp: number};
        breath: {base: number, exp: number};
        planar: {base: number, exp: number};
        dexterity: {base: number, exp: number};
        agility: {base: number, exp: number};
        strength: {base: number, exp: number};
        endurance: {base: number, exp: number};
    };
    proficiencies: {
        bareHand: {base: number, exp: number};
        sword: {base: number, exp: number};
        blade: {base: number, exp: number};
        dagger: {base: number, exp: number};
        spear: {base: number, exp: number};
        axe: {base: number, exp: number};
        mace: {base: number, exp: number};
        shield: {base: number, exp: number};
        bow: {base: number, exp: number};
        magicWand: {base: number, exp: number};
        staff: {base: number, exp: number};
        tome: {base: number, exp: number};
        orb: {base: number, exp: number};
    }
    battlers: {
        pATK: {base: number, exp: number};
        pHIT: {base: number, exp: number};
        pCRT: {base: number, exp: number};
        pDEF: {base: number, exp: number};
        mATK: {base: number, exp: number};
        mHIT: {base: number, exp: number};
        mCRT: {base: number, exp: number};
        mDEF: {base: number, exp: number};
        chiWarmATK: {base: number, exp: number};
        chiColdATK: {base: number, exp: number};
        chiWarmDEF: {base: number, exp: number};
        chiColdDEF: {base: number, exp: number};
        slash: {base: number, exp: number};
        pierce: {base: number, exp: number};
        blunt: {base: number, exp: number};
        slashDEF: {base: number, exp: number};
        pierceDEF: {base: number, exp: number};
        bluntDEF: {base: number, exp: number};
        dodge: {base: number, exp: number};
        orderATK: {base: number, exp: number};
        chaosATK: {base: number, exp: number};
        geoATK: {base: number, exp: number};
        waterATK: {base: number, exp: number};
        airATK: {base: number, exp: number};
        fireATK: {base: number, exp: number};
        orderDEF: {base: number, exp: number};
        chaosDEF: {base: number, exp: number};
        geoDEF: {base: number, exp: number};
        waterDEF: {base: number, exp: number};
        airDEF: {base: number, exp: number};
        fireDEF: {base: number, exp: number};
    }   
    elements: {
        order: {base: number, exp: number};
        chaos: {base: number, exp: number};
        geo: {base: number, exp: number};
        water: {base: number, exp: number};
        air: {base: number, exp: number};
        fire: {base: number, exp: number};
    }
    artisans: {
        mining: {base: number, exp: number};
        smithing: {base: number, exp: number};
        woodcutting: {base: number, exp: number};
        carpentry: {base: number, exp: number};
        foraging: {base: number, exp: number};
        weaving: {base: number, exp: number};
        skinning: {base: number, exp: number};
        tanning: {base: number, exp: number};
        jewelry: {base: number, exp: number};
        cooking: {base: number, exp: number};
        alchemy: {base: number, exp: number};
        enchanting: {base: number, exp: number};
    }
    equipments: {
        mainHand: string | null;
        offHand: string | null;
        cloth: string | null;
        headWear: string | null;
        armor: string | null;
        necklace: string | null;
        ring: string | null;
    };
    traits: string[];
    skills: { skillID: string, level: number, exp: number }[];
    activeSkills: { skillID: string, level: number, exp: number }[];
    position: number | null;
    itemsBag: string[];
    baseAC: number;
    location: string;
    isSummoned: boolean;
    arcaneAptitude: number;
    race: RaceEnum;
    classModifier?: ClassModifier;
    constructor(dto:{
        name: string,
        gender: "MALE" | "FEMALE" | "NONE",
        id: string,
        type: CharacterType,
        level: number,
        portrait: string,
        race: RaceEnum,
        background: string,
        alignment: { good: number, evil: number, law: number, chaos: number },
        mood: number,
        energy: number,
        fame: number,
        gold: number,
        exp: number,
        isDead: boolean,
        lastTarget: string,
        currentHP?: number,
        currentMP?: number,
        currentSP?: number,
        attributes: {
            charisma: {base: number, exp: number};
            luck: {base: number, exp: number};
            intelligence: {base: number, exp: number};
            leadership: {base: number, exp: number};
            vitality: {base: number, exp: number};
            willpower: {base: number, exp: number};
            breath: {base: number, exp: number};
            planar: {base: number, exp: number};
            dexterity: {base: number, exp: number};
            agility: {base: number, exp: number};
            strength: {base: number, exp: number};
            endurance: {base: number, exp: number};
        };
        proficiencies: {
            bareHand: {base: number, exp: number};
            sword: {base: number, exp: number};
            blade: {base: number, exp: number};
            dagger: {base: number, exp: number};
            spear: {base: number, exp: number};
            axe: {base: number, exp: number};
            mace: {base: number, exp: number};
            shield: {base: number, exp: number};
            bow: {base: number, exp: number};
            magicWand: {base: number, exp: number};
            staff: {base: number, exp: number};
            tome: {base: number, exp: number};
            orb: {base: number, exp: number};
        }
        battlers: {
            pATK: {base: number, exp: number};
            pHIT: {base: number, exp: number};
            pCRT: {base: number, exp: number};
            pDEF: {base: number, exp: number};
            mATK: {base: number, exp: number};
            mHIT: {base: number, exp: number};
            mCRT: {base: number, exp: number};
            mDEF: {base: number, exp: number};
            chiWarmATK: {base: number, exp: number};
            chiColdATK: {base: number, exp: number};
            chiWarmDEF: {base: number, exp: number};
            chiColdDEF: {base: number, exp: number};
            slash: {base: number, exp: number};
            pierce: {base: number, exp: number};
            blunt: {base: number, exp: number};
            slashDEF: {base: number, exp: number};
            pierceDEF: {base: number, exp: number};
            bluntDEF: {base: number, exp: number};
            dodge: {base: number, exp: number};
            orderATK: {base: number, exp: number};
            chaosATK: {base: number, exp: number};
            geoATK: {base: number, exp: number};
            waterATK: {base: number, exp: number};
            airATK: {base: number, exp: number};
            fireATK: {base: number, exp: number};
            orderDEF: {base: number, exp: number};
            chaosDEF: {base: number, exp: number};
            geoDEF: {base: number, exp: number};
            waterDEF: {base: number, exp: number};
            airDEF: {base: number, exp: number};
            fireDEF: {base: number, exp: number};
        }
        elements: {
            order: {base: number, exp: number};
            chaos: {base: number, exp: number};
            geo: {base: number, exp: number};
            water: {base: number, exp: number};
            air: {base: number, exp: number};
            fire: {base: number, exp: number};
        }
        artisans: {
            mining: {base: number, exp: number};
            smithing: {base: number, exp: number};
            woodcutting: {base: number, exp: number};
            carpentry: {base: number, exp: number};
            foraging: {base: number, exp: number};
            weaving: {base: number, exp: number};
            skinning: {base: number, exp: number};
            tanning: {base: number, exp: number};
            jewelry: {base: number, exp: number};
            cooking: {base: number, exp: number};
            alchemy: {base: number, exp: number};
            enchanting: {base: number, exp: number};
        }
        equipments: {
            mainHand: string | null;
            offHand: string | null;
            cloth: string | null;
            headWear: string | null
            armor: string | null;
            necklace: string | null;
            ring: string | null;
        };        
        traits: string[],
        skills: { skillID: string, level: number, exp: number }[],
        activeSkills: { skillID: string, level: number, exp: number }[],
        position?: number,
        itemsBag: string[],
        baseAC: number,
        location: string,
        isSummoned: boolean,
        arcaneAptitude: number,
        classModifier?: ClassModifier
    }
    ) {
        this.name = dto.name;
        this.gender = dto.gender;
        this.id = dto.id;
        this.type = dto.type;
        this.level = dto.level;
        this.portrait = dto.portrait;
        this.race = dto.race;
        this.background = dto.background;
        this.alignment = dto.alignment;
        this.mood = dto.mood;
        this.energy = dto.energy;
        this.fame = dto.fame;
        this.gold = dto.gold;
        this.exp = dto.exp;
        this.isDead = dto.isDead;
        this.lastTarget = dto.lastTarget;
        this.currentHP = dto.currentHP? dto.currentHP : null;
        this.currentMP = dto.currentMP? dto.currentMP : null;
        this.currentSP = dto.currentSP? dto.currentSP : null;
        this.attributes = {
            charisma: {base: dto.attributes.charisma.base, exp: dto.attributes.charisma.exp},
            luck: {base: dto.attributes.luck.base, exp: dto.attributes.luck.exp},
            intelligence: {base: dto.attributes.intelligence.base, exp: dto.attributes.intelligence.exp},
            leadership: {base: dto.attributes.leadership.base, exp: dto.attributes.leadership.exp},
            vitality: {base: dto.attributes.vitality.base, exp: dto.attributes.vitality.exp},
            willpower: {base: dto.attributes.willpower.base, exp: dto.attributes.willpower.exp},
            breath: {base: dto.attributes.breath.base, exp: dto.attributes.breath.exp},
            planar: {base: dto.attributes.planar.base, exp: dto.attributes.planar.exp},
            dexterity: {base: dto.attributes.dexterity.base, exp: dto.attributes.dexterity.exp},
            agility: {base: dto.attributes.agility.base, exp: dto.attributes.agility.exp},
            strength: {base: dto.attributes.strength.base, exp: dto.attributes.strength.exp},
            endurance: {base: dto.attributes.endurance.base, exp: dto.attributes.endurance.exp}
        };
        this.proficiencies = {
            bareHand: {base: dto.proficiencies.bareHand.base, exp: dto.proficiencies.bareHand.exp},
            sword: {base: dto.proficiencies.sword.base, exp: dto.proficiencies.sword.exp},
            blade: {base: dto.proficiencies.blade.base, exp: dto.proficiencies.blade.exp},
            dagger: {base: dto.proficiencies.dagger.base, exp: dto.proficiencies.dagger.exp},
            spear: {base: dto.proficiencies.spear.base, exp: dto.proficiencies.spear.exp},
            axe: {base: dto.proficiencies.axe.base, exp: dto.proficiencies.axe.exp},
            mace: {base: dto.proficiencies.mace.base, exp: dto.proficiencies.mace.exp},
            shield: {base: dto.proficiencies.shield.base, exp: dto.proficiencies.shield.exp},
            bow: {base: dto.proficiencies.bow.base, exp: dto.proficiencies.bow.exp},
            magicWand: {base: dto.proficiencies.magicWand.base, exp: dto.proficiencies.magicWand.exp},
            staff: {base: dto.proficiencies.staff.base, exp: dto.proficiencies.staff.exp},
            tome: {base: dto.proficiencies.tome.base, exp: dto.proficiencies.tome.exp},
            orb: {base: dto.proficiencies.orb.base, exp: dto.proficiencies.orb.exp}
        };
        this.battlers = {
            pATK: {base: dto.battlers.pATK.base, exp: dto.battlers.pATK.exp},
            pHIT: {base: dto.battlers.pHIT.base, exp: dto.battlers.pHIT.exp},
            pCRT: {base: dto.battlers.pCRT.base, exp: dto.battlers.pCRT.exp},
            pDEF: {base: dto.battlers.pDEF.base, exp: dto.battlers.pDEF.exp},
            mATK: {base: dto.battlers.mATK.base, exp: dto.battlers.mATK.exp},
            mHIT: {base: dto.battlers.mHIT.base, exp: dto.battlers.mHIT.exp},
            mCRT: {base: dto.battlers.mCRT.base, exp: dto.battlers.mCRT.exp},
            mDEF: {base: dto.battlers.mDEF.base, exp: dto.battlers.mDEF.exp},
            chiWarmATK: {base: dto.battlers.chiWarmATK.base, exp: dto.battlers.chiWarmATK.exp},
            chiColdATK: {base: dto.battlers.chiColdATK.base, exp: dto.battlers.chiColdATK.exp},
            chiWarmDEF: {base: dto.battlers.chiWarmDEF.base, exp: dto.battlers.chiWarmDEF.exp},
            chiColdDEF: {base: dto.battlers.chiColdDEF.base, exp: dto.battlers.chiColdDEF.exp},
            slash: {base: dto.battlers.slash.base, exp: dto.battlers.slash.exp},
            pierce: {base: dto.battlers.pierce.base, exp: dto.battlers.pierce.exp},
            blunt: {base: dto.battlers.blunt.base, exp: dto.battlers.blunt.exp},
            slashDEF: {base: dto.battlers.slashDEF.base, exp: dto.battlers.slashDEF.exp},
            pierceDEF: {base: dto.battlers.pierceDEF.base, exp: dto.battlers.pierceDEF.exp},
            bluntDEF: {base: dto.battlers.bluntDEF.base, exp: dto.battlers.bluntDEF.exp},
            dodge: {base: dto.battlers.dodge.base, exp: dto.battlers.dodge.exp},
            orderATK: dto.battlers.orderATK,
            chaosATK: dto.battlers.chaosATK,
            geoATK: dto.battlers.geoATK,
            waterATK: dto.battlers.waterATK,
            airATK: dto.battlers.airATK,
            fireATK: dto.battlers.fireATK,
            orderDEF: dto.battlers.orderDEF,
            chaosDEF: dto.battlers.chaosDEF,
            geoDEF: dto.battlers.geoDEF,
            waterDEF: dto.battlers.waterDEF,
            airDEF: dto.battlers.airDEF,
            fireDEF: dto.battlers.fireDEF
        };
        this.elements = {
            order: {base: dto.elements.order.base, exp: dto.elements.order.exp},
            chaos: {base: dto.elements.chaos.base, exp: dto.elements.chaos.exp},
            geo: {base: dto.elements.geo.base, exp: dto.elements.geo.exp},
            water: {base: dto.elements.water.base, exp: dto.elements.water.exp},
            air: {base: dto.elements.air.base, exp: dto.elements.air.exp},
            fire: {base: dto.elements.fire.base, exp: dto.elements.fire.exp}
        };
        this.artisans = {
            mining: {base: dto.artisans.mining.base, exp: dto.artisans.mining.exp},
            smithing: {base: dto.artisans.smithing.base, exp: dto.artisans.smithing.exp},
            woodcutting: {base: dto.artisans.woodcutting.base, exp: dto.artisans.woodcutting.exp},
            carpentry: {base: dto.artisans.carpentry.base, exp: dto.artisans.carpentry.exp},
            foraging: {base: dto.artisans.foraging.base, exp: dto.artisans.foraging.exp},
            weaving: {base: dto.artisans.weaving.base, exp: dto.artisans.weaving.exp},
            skinning: {base: dto.artisans.skinning.base, exp: dto.artisans.skinning.exp},
            tanning: {base: dto.artisans.tanning.base, exp: dto.artisans.tanning.exp},
            jewelry: {base: dto.artisans.jewelry.base, exp: dto.artisans.jewelry.exp},
            cooking: {base: dto.artisans.cooking.base, exp: dto.artisans.cooking.exp},
            alchemy: {base: dto.artisans.alchemy.base, exp: dto.artisans.alchemy.exp},
            enchanting: {base: dto.artisans.enchanting.base, exp: dto.artisans.enchanting.exp}
        };
        this.equipments = {
            mainHand: dto.equipments.mainHand? dto.equipments.mainHand : null,
            offHand: dto.equipments.offHand? dto.equipments.offHand : null,
            cloth: dto.equipments.cloth? dto.equipments.cloth : null,
            headWear: dto.equipments.headWear? dto.equipments.headWear : null,
            armor: dto.equipments.armor? dto.equipments.armor : null,
            necklace: dto.equipments.necklace? dto.equipments.necklace : null,
            ring: dto.equipments.ring? dto.equipments.ring : null
        };
        this.traits = dto.traits;
        this.skills = dto.skills;
        this.activeSkills = dto.activeSkills;
        this.position = dto.position? dto.position : null;
        this.itemsBag = dto.itemsBag;
        this.baseAC = dto.baseAC;
        this.location = dto.location;
        this.isSummoned = dto.isSummoned;
        this.arcaneAptitude = dto.arcaneAptitude;
        this.classModifier = dto.classModifier;
    }
}

    