import { Weapon } from "./Weapon";
import { WeaponType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";

export class Spear extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.spear,
        };
        super(updatedDto);
    };
}

export class Spear_Dory extends Spear {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.spear_dory,
        };
        super(updatedDto);
    };
}

export class Spear_Javelin extends Spear {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.spear_javelin,
        };
        super(updatedDto);
    };
}

export class Spear_Halberd extends Spear {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.spear_halberd,
        };
        super(updatedDto);
    };
}
