import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";
import { defaultAttackStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultAttackStats";
import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
export class Accessory extends Equipment {
    constructor(dto) {
        var _a, _b;
        const updatedDto = Object.assign(Object.assign({}, dto), { equipmentType: EquipmentType.accessory, jewelSlots: 0, slottedJewels: [], spellCastingDamageMultiplier: 1, spellCastingPenaltyHit: 0, maxJewelGrade: null, arcaneAptitude: 0, accessoryType: (_a = dto.accessoryType) !== null && _a !== void 0 ? _a : null, specialTrait: (_b = dto.specialTrait) !== null && _b !== void 0 ? _b : [], defenseStats: Object.assign(Object.assign({}, defaultDefenseStats), dto.defenseStats), attackStats: Object.assign(Object.assign({}, defaultAttackStats), dto.attackStats), weaponType: null, weaponSpecificType: null, armorType: null });
        super(updatedDto);
    }
}
