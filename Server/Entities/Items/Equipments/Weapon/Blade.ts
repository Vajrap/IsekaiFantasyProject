import { Weapon } from "./Weapon";
import { WeaponDTO } from "../InterfacesAndEnums/DTOs";
import { WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { WeaponSpecificType } from "../../../../../Common/Enums/Item/EquipmentTypes";

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