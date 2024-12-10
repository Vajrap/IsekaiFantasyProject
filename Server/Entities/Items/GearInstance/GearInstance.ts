import { AttributeEnum } from "../../Character/Subclasses/CharacterDataEnum";
import { EquipmentType, WeaponType } from "../../../Utility/Enum/EquipmentTypes";
import { Tier } from "../../../Utility/Tier";
import { TraitEnum } from "../../Traits/TraitEnums";
import { DiceEnum } from "../../../Utility/Enum/DamageDIce";
import { DamageTypes } from "../../../Utility/Enum/DamageTypes";

enum GearType {
    weapon = 'weapon',
    armor = 'armor',
    cloth = 'cloth',
    headwear = 'headwear',
    necklace = 'necklace',
    ring = 'ring',
    accessory = 'accessory',
    equipment = 'equipment',
}

export class GearInstance {
    id: string;
    name: string;
    crafter: string;
    description: string;
    image: string;
    cost: number;
    weight: number;
    tier: Tier;
    gearType: GearType;
    specificType: EquipmentType | WeaponType | null;
    jewelSlots?: number;
    slottedJewels: [];
    maxJewelGrade: 'flawed' | 'cracked' | 'refined' | 'pristine' | 'perfect' | null;
    defenseStats?: {  // Only for armor/equipment/ Shiled would get both defense and attack stats
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
    };
    attackStats?: {  // Only for weapons
        physicalType: DamageTypes;
        magicalType: DamageTypes
        physicalDiceEnum: DiceEnum;
        physicalDamageStat: AttributeEnum;
        magicalDiceEnum: DiceEnum;
        magicalDamageStat: AttributeEnum;
        preferredPosition: 'melee' | 'ranged' | 'both';
        handle: 0 | 1 | 2;
        bonus: {
            pATK: number;
            pHIT: number;
            pCRT: number;
            slash: number;
            pierce: number;
            blunt: number;
            mATK: number;
            mHIT: number;
            mCRT: number;
            geo: number;
            water: number;
            air: number;
            fire: number;
            order: number;
            chaos: number;
        };
    };
    material: string;
    spellCastingDamageMultiplier: number;
    spellCastingPenaltyHit: number;
    arcaneAptitude: number;
    specialTrait: TraitEnum[];
    class: 'cloth' | 'accessory' | 'light' | 'medium' | 'heavy' | 'shield' | 'weapon';

    constructor(dto: {
        id: string,
        name: string,
        crafter?: string,
        description: string,
        image: string,
        cost: number,
        weight: number,
        tier: Tier,
        gearType: GearType,
        specificType: EquipmentType | WeaponType | null,
        jewelSlots?: number,
        maxJewelGrade?: 'flawed' | 'cracked' | 'refined' | 'pristine' | 'perfect' ,
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
            physicalType: DamageTypes,
            magicalType: DamageTypes,
            physicalDiceEnum: DiceEnum,
            magicalDiceEnum: DiceEnum,
            physicalDamageStat: AttributeEnum,
            magicalDamageStat: AttributeEnum,
            preferredPosition: 'melee' | 'ranged' | 'both',
            handle: 0 | 1 | 2,
            bonus: {
                pATK: number;
                pHIT: number;
                pCRT: number;
                slash: number;
                pierce: number;
                blunt: number;
                mATK: number;
                mHIT: number;
                mCRT: number;
                geo: number;
                water: number;
                air: number;
                fire: number;
                order: number;
                chaos: number;
            };
        },
        material: string,
        spellCastingDamageMultiplier?: number,
        spellCastingPenaltyHit?: number,
        arcaneAptitude?: number,
        specialTrait: TraitEnum[],
        class: 'cloth' | 'accessory' | 'light' | 'medium' | 'heavy' | 'shield' | 'weapon';
    }) {
        this.id = dto.id;
        this.name = dto.name;
        this.crafter = dto.crafter? dto.crafter : "Unknown";
        this.description = dto.description;
        this.image = dto.image;
        this.cost = dto.cost;
        this.weight = dto.weight;
        this.tier = dto.tier;
        this.gearType = dto.gearType;
        this.specificType = dto.specificType;
        this.jewelSlots = dto.jewelSlots? dto.jewelSlots : 0;
        this.slottedJewels = [];
        this.maxJewelGrade = dto.maxJewelGrade? dto.maxJewelGrade : null;
        this.defenseStats = dto.defenseStats;
        this.attackStats = dto.attackStats;
        this.material = dto.material;
        this.spellCastingDamageMultiplier = dto.spellCastingDamageMultiplier ?  dto.spellCastingDamageMultiplier : 1;
        this.spellCastingPenaltyHit = dto.spellCastingPenaltyHit ? dto.spellCastingPenaltyHit : 0;
        this.arcaneAptitude = dto.arcaneAptitude? dto.arcaneAptitude : 0;
        this.specialTrait = dto.specialTrait;
        this.class = dto.class;
        // Run validation checks based on gear type
        this.validateFields();
    }

    // Check required fields based on gear type
    validateFields() {
        if (this.gearType === GearType.weapon) {
            if (!this.attackStats) {
                throw new Error("Weapons must have attack stats.");
            }
            if (!this.specificType) {
                throw new Error("Weapons must have a specific type.");
            }
        } else if (this.gearType === GearType.armor) {
            // if (!this.defenseStats) {
            //     throw new Error("Armor must have defense stats.");
            // }
            if (this.spellCastingDamageMultiplier === undefined || this.spellCastingPenaltyHit === undefined) {
                throw new Error("Armor must have spell casting modifiers.");
            }
        }
    }
}
