import { Equipment } from "../Equipment";
import { AccessoryDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/DTOs";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";
import { defaultAttackStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultAttackStats";
import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";

export class Accessory extends Equipment {
    constructor(dto: AccessoryDTO) {
        const updatedDto = {
            ...dto,
            equipmentType: EquipmentType.accessory,
            jewelSlots: 0,
            slottedJewels: [] as [],
            spellCastingDamageMultiplier: 1,
            spellCastingPenaltyHit: 0,
            maxJewelGrade: null,
            arcaneAptitude: 0,
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats },
            attackStats: { ...defaultAttackStats, ...dto.attackStats },
            weaponType: null,
            weaponSpecificType: null,
            armorType: null,
        }
        super(updatedDto);
    }
}
