import { AttributeEnum } from "../../Entities/Character/Subclasses/CharacterDataEnum";
import { TraitEnum } from "../../Entities/Traits/Trait";
import { EquipmentType, GearType, WeaponType } from "../../../Common/DTOsEnumsInterfaces/Item/EquipmentTypes";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { ResourceRequirement } from "./enums";

export class GearArchetype {
    baseID: string;
    baseName: string;
    baseImage: string;
    baseCost: number;
    baseWeight: number;
    baseTier: Tier;
    gearType: GearType;
    specificType: EquipmentType | WeaponType | null;
    handle: 0 | 1 | 2;
    resourceNeeded: { [part: string]: ResourceRequirement };  // Resources required for each part of the gear
    defenseStats?: {
        pDEF: number,
        slashDEF: number,
        pierceDEF: number,
        bluntDEF: number,
        mDEF: number,
        geoDEF: number,
        waterDEF: number,
        airDEF: number,
        fireDEF: number,
        orderDEF: number,
        chaosDEF: number,
        dodge: number
    }
    attackStats?: {
        physicalType: 'slash' | 'blunt' | 'pierce';
        magicalType: 'order' | 'chaos' | 'geo' | 'water' | 'air' | 'fire' | 'ice' | 
        "spirit" | "lightning" | 'demonic' | 'metal' | 'angelic' | 'human' | 'life' |
        'dark' | 'ghost' | 'ghost' | 'poison' | 'holy' | 'arcane';
        physicalDiceEnum: string;
        magicalDiceEnum: string;
        preferredPosition: 'melee' | 'ranged' | 'both';
        physicalDamageStat: AttributeEnum;
        magicalDamageStat: AttributeEnum,
        bonus?: {
            pATK?: number;
            pDEF?: number;
            pHIT?: number;
            pCRT?: number;
            slash?: number;
            pierce?: number;
            blunt?: number;
            mATK?: number;
            mDEF?: number;
            mHIT?: number;
            mCRT?: number;
            geo?: number;
            geoDef?: number;
            water?: number;
            waterDef?: number;
            air?: number;
            airDef?: number;
            fire?: number;
            fireDef?: number;
            order?: number;
            chaos?: number;
            dodge?: number;
        }
    };
    spellCastingDamageMultiplier?: number;
    spellCastingPenaltyHit?: number;
    AC?: number;
    specialTrait?: TraitEnum[];

    constructor(dto: {
        baseID: string,
        baseName: string,
        baseImage: string,
        baseCost: number,
        baseWeight: number,
        baseTier: Tier,
        gearType: GearType,
        specificType: EquipmentType | WeaponType | null,
        handle?: 0 | 1 | 2,
        resourceNeeded: { [part: string]: ResourceRequirement },
        defenseStats?: {
            pDEF: number,
            slashDEF: number,
            pierceDEF: number,
            bluntDEF: number,
            mDEF: number,
            geoDEF: number,
            waterDEF: number,
            airDEF: number,
            fireDEF: number,
            orderDEF: number,
            chaosDEF: number,
            dodge: number
        },
        attackStats?: {
            physicalType: 'slash' | 'blunt' | 'pierce';
            magicalType: 'order' | 'chaos' | 'geo' | 'water' | 'air' | 'fire' | 'ice' | 
            "spirit" | "lightning" | 'demonic' | 'metal' | 'angelic' | 'human' | 'life' |
            'dark' | 'ghost' | 'ghost' | 'poison' | 'holy' | 'arcane';
            physicalDiceEnum: string;
            magicalDiceEnum: string;
            preferredPosition: 'melee' | 'ranged' | 'both';
            physicalDamageStat: AttributeEnum;
            magicalDamageStat: AttributeEnum;
            bonus?: {
                pATK?: number;
                pDEF?: number;
                pHIT?: number;
                pCRT?: number;
                slash?: number;
                pierce?: number;
                blunt?: number;
                mATK?: number;
                mDEF?: number;
                mHIT?: number;
                mCRT?: number;
                geo?: number;
                geoDef?: number;
                water?: number;
                waterDef?: number;
                air?: number;
                airDef?: number;
                fire?: number;
                fireDef?: number;
                order?: number;
                chaos?: number;
                dodge?: number;
            },
        },
        spellCastingDamageMultiplier?: number;
        spellCastingPenaltyHit?: number;
        AC?: number;
        specialTrait?: TraitEnum[];
    }) {
        this.baseID = dto.baseID;
        this.baseName = dto.baseName;
        this.baseImage = dto.baseImage;
        this.baseCost = dto.baseCost;
        this.baseWeight = dto.baseWeight;
        this.baseTier = dto.baseTier;
        this.gearType = dto.gearType;
        this.specificType = dto.specificType;
        this.handle = dto.handle ? dto.handle : 0;
        this.resourceNeeded = dto.resourceNeeded;
        if (dto.defenseStats) { this.defenseStats = dto.defenseStats }
        if (dto.attackStats) { this.attackStats = dto.attackStats }
        if (dto.spellCastingDamageMultiplier) { this.spellCastingDamageMultiplier = dto.spellCastingDamageMultiplier }
        if (dto.spellCastingPenaltyHit) { this.spellCastingPenaltyHit = dto.spellCastingPenaltyHit }
        if (dto.AC) { this.AC = dto.AC }
        if (dto.specialTrait) { this.specialTrait = dto.specialTrait }
    }
}