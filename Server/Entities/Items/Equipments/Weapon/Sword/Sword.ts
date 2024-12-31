import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponDTO } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";

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