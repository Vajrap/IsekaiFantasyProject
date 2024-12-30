import { Weapon } from "./Weapon";
import { WeaponType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";

export class Blade extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.blade,
        };
        super(updatedDto);
    };
}

export class Blade_Katana extends Blade {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.blade_katana,
        };
        super(updatedDto);
    };
}

export class Blade_Scimitar extends Blade {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.blade_scimitar,
        };
        super(updatedDto);
    };
}

export class Blade_Cutlass extends Blade {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.blade_cutlass,
        };
        super(updatedDto);
    };
}

export class Blade_Falchion extends Blade {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.blade_falchion,
        };
        super(updatedDto);
    };
}