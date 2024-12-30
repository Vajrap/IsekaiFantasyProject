import { Weapon } from "./Weapon";
import { WeaponType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";

export class Axe extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.axe,
        };
        super(updatedDto);
    };
}

export class Axe_Broad extends Axe {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.axe_broad,
        };
        super(updatedDto);
    };
}

export class Axe_Great extends Axe {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.axe_great,
        };
        super(updatedDto);
    };
}
