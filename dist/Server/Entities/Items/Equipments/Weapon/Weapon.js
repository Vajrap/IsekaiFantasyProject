import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";
import { defaultAttackStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultAttackStats";
export class Weapon extends Equipment {
    constructor(dto) {
        var _a, _b;
        const updatedDto = Object.assign(Object.assign({}, dto), { equipmentType: EquipmentType.weapon, attackStats: Object.assign(Object.assign({}, defaultAttackStats), dto.attackStats), defenseStats: Object.assign(Object.assign({}, defaultDefenseStats), dto.defenseStats), armorType: null, accessoryType: null, arcaneAptitude: 0, spellCastingDamageMultiplier: 0, spellCastingPenaltyHit: 0, weaponType: (_a = dto.weaponType) !== null && _a !== void 0 ? _a : null, weaponSpecificType: (_b = dto.weaponSpecificType) !== null && _b !== void 0 ? _b : null });
        super(updatedDto);
    }
    ;
}
