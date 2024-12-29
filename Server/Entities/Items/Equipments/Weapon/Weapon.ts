import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";
import { defaultAttackStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultAttackStats";
import { WeaponDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";


export class Weapon extends Equipment {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            equipmentType: EquipmentType.weapon,
            attackStats: { ...defaultAttackStats, ...dto.attackStats },
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats },
            armorType: null,
            accessoryType: null,
            arcaneAptitude: 0,
            spellCastingDamageMultiplier: 0,
            spellCastingPenaltyHit: 0,
            weaponType: dto.weaponType ?? null,
            weaponSpecificType: dto.weaponSpecificType ?? null,
        };
        super(updatedDto);
    };
}

