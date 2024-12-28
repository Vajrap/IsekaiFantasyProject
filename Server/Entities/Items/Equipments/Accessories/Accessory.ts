import { EquipmentType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../InterfacesAndEnums/ArmorDefense";
import { AccessoryDTO } from "../InterfacesAndEnums/DTOs";
import { defaultAttackStats } from "../InterfacesAndEnums/WeaponAttack";

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
