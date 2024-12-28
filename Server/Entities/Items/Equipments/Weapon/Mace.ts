import { Weapon } from "./Weapon";
import { WeaponDTO } from "../InterfacesAndEnums/DTOs";
import { WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { WeaponSpecificType } from "../../../../../Common/Enums/Item/EquipmentTypes";

export class Mace extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.mace,
        };
        super(updatedDto);
    };
}

export class Mace_Morningstar extends Mace {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.mace_morningstar,
        };
        super(updatedDto);
    };
}

export class Mace_Hammer extends Mace {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.mace_hammer,
        };
        super(updatedDto);
    };
}

export class Mace_Warhammer extends Mace {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.mace_warhammer,
        };
        super(updatedDto);
    };
}