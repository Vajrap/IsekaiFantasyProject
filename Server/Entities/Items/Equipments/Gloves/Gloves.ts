import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { Equipment } from "../Equipment";
import { ArmorDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/DTOs";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";
import { JewelEnum } from "../../../../../Common/DTOsEnumsInterfaces/Item/Jewel/Enums";

export class Gloves extends Equipment {
    constructor(dto: ArmorDTO) {
        const updatedDto = {
            ...dto,
            equipmentType: EquipmentType.gloves,
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats },
            accessoryType: null,
            weaponType: null,
            weaponSpecificType: null,
            specialTrait: dto.specialTrait !== undefined ? dto.specialTrait: [],
            spellCastingDamageMultiplier: dto.spellCastingDamageMultiplier !== undefined ? dto.spellCastingDamageMultiplier : 1,
            spellCastingPenaltyHit: dto.spellCastingPenaltyHit !== undefined ? dto.spellCastingPenaltyHit : 0,
            arcaneAptitude: dto.arcaneAptitude !== undefined ? dto.arcaneAptitude : 0,
            maxJewelGrade: dto.maxJewelGrade !== undefined ? dto.maxJewelGrade : null,
            jewelSlots: dto.jewelSlots !== undefined ? dto.jewelSlots : 0,
            slottedJewels: dto.slottedJewels ?? ([] as JewelEnum[]),
        };    
        super(updatedDto);
    }
}