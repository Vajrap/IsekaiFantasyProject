import { Weapon } from "./Weapon";
import { WeaponDTO } from "../InterfacesAndEnums/DTOs";
import { WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { WeaponSpecificType } from "../../../../../Common/Enums/Item/EquipmentTypes";

export class Sword extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.sword,
        };
        super(updatedDto);
    };
}

export class Sword_Short extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_short,
        };
        super(updatedDto);
    };
}

export class Sword_Long extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_long,
        };
        super(updatedDto);
    };
}

export class Sword_Great extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_great,
        };
        super(updatedDto);
    };
}

export class Sword_Rapier extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_rapier,
        };
        super(updatedDto);
    };
}