import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponDTO } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";
export class Bow extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.bow,
        };
        super(updatedDto);
    };
}

export class Bow_Long extends Bow {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.bow_long,
        };
        super(updatedDto);
    };
}

export class Bow_Short extends Bow {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.bow_short,
        };
        super(updatedDto);
    };
}

export class Bow_Cross extends Bow {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.bow_cross,
        };
        super(updatedDto);
    };
}
