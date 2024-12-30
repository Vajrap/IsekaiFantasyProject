import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { AttributeEnum } from "../../Character/Subclasses/CharacterDataEnum";
import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { ItemCostInterface } from "../../../../Common/DTOsEnumsInterfaces/Item/ItemCost";
import { Item } from "../Items";
import { JewelEnum, JewelGrade } from "../../../../Common/DTOsEnumsInterfaces/Item/Jewel/Enums";
import { PreferredPosition, WeaponSpecificType, WeaponType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { ArmorType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { AccessoryType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { EquipmentType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { ItemType } from "../../../../Common/DTOsEnumsInterfaces/Item/Enums";



export class Equipment extends Item {
    equipmentType: EquipmentType;
    armorType: ArmorType | null;
    accessoryType: AccessoryType | null;
    weaponType: WeaponType | null;
    weaponSpecificType: WeaponSpecificType | null;
    jewelSlots: number;
    slottedJewels: JewelEnum[];
    maxJewelGrade: JewelGrade | null;
    material: string;
    spellCastingDamageMultiplier: number;
    spellCastingPenaltyHit: number;
    arcaneAptitude: number;
    specialTrait: TraitEnum[];
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
    };
    attackStats?: {  // Only for weapons
        physicalType: DamageTypes;
        magicalType: DamageTypes
        physicalDiceEnum: DiceEnum;
        physicalDamageStat: AttributeEnum;
        magicalDiceEnum: DiceEnum;
        magicalDamageStat: AttributeEnum;
        preferredPosition: PreferredPosition;
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
    constructor(dto: {
        id: string, 
        name: string, 
        description: string, 
        image: string,
        cost: ItemCostInterface,
        weight: number,
        tier: Tier,
        equipmentType: EquipmentType;        
        armorType: ArmorType | null;
        accessoryType: AccessoryType | null;
        weaponType: WeaponType | null;
        weaponSpecificType: WeaponSpecificType | null;        
        jewelSlots: number,
        slottedJewels: JewelEnum[],
        maxJewelGrade: JewelGrade | null,
        material: string,
        spellCastingDamageMultiplier: number,
        spellCastingPenaltyHit: number,
        arcaneAptitude: number,
        specialTrait: TraitEnum[],
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
        attackStats?: {  // Only for weapons
            physicalType: DamageTypes;
            magicalType: DamageTypes
            physicalDiceEnum: DiceEnum;
            physicalDamageStat: AttributeEnum;
            magicalDiceEnum: DiceEnum;
            magicalDamageStat: AttributeEnum;
            preferredPosition: PreferredPosition;
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
        }
    } 
    ) {
        super(
            dto.id, 
            ItemType.equipment, 
            dto.name, 
            dto.description,
            dto.image, 
            dto.weight,
            dto.tier,
            dto.cost
        );
        this.equipmentType = dto.equipmentType;
        this.armorType = dto.armorType;
        this.accessoryType = dto.accessoryType;
        this.weaponType = dto.weaponType;
        this.weaponSpecificType = dto.weaponSpecificType;
        this.jewelSlots = dto.jewelSlots;
        this.slottedJewels = dto.slottedJewels;
        this.maxJewelGrade = dto.maxJewelGrade;
        this.material = dto.material;
        this.spellCastingDamageMultiplier = dto.spellCastingDamageMultiplier;
        this.spellCastingPenaltyHit = dto.spellCastingPenaltyHit;
        this.arcaneAptitude = dto.arcaneAptitude;
        this.specialTrait = dto.specialTrait;
        this.defenseStats = dto.defenseStats;
        this.attackStats = dto.attackStats;
    }
}