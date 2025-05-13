import { EquipmentType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/defaultDefenseStats";
export class Headwear extends Equipment {
    constructor(dto) {
        var _a;
        const updatedDto = Object.assign(Object.assign({}, dto), { equipmentType: EquipmentType.Headwear, defenseStats: Object.assign(Object.assign({}, defaultDefenseStats), dto.defenseStats), accessoryType: null, weaponType: null, weaponSpecificType: null, specialTrait: dto.specialTrait !== undefined ? dto.specialTrait : [], spellCastingDamageMultiplier: dto.spellCastingDamageMultiplier !== undefined ? dto.spellCastingDamageMultiplier : 1, spellCastingPenaltyHit: dto.spellCastingPenaltyHit !== undefined ? dto.spellCastingPenaltyHit : 0, arcaneAptitude: dto.arcaneAptitude !== undefined ? dto.arcaneAptitude : 0, maxJewelGrade: dto.maxJewelGrade !== undefined ? dto.maxJewelGrade : null, jewelSlots: dto.jewelSlots !== undefined ? dto.jewelSlots : 0, slottedJewels: (_a = dto.slottedJewels) !== null && _a !== void 0 ? _a : [] });
        super(updatedDto);
    }
}
