import { Item } from "../Items";
import { ItemType } from "../../../../Common/DTOsEnumsInterfaces/Item/Enums";
export class Equipment extends Item {
    constructor(dto) {
        super(dto.id, ItemType.equipment, dto.name, dto.description, dto.image, dto.weight, dto.tier, dto.cost);
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
