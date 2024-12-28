import { Weapon } from "./Weapon";
import { WeaponDTO } from "../InterfacesAndEnums/DTOs";
import { WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { WeaponSpecificType } from "../../../../../Common/Enums/Item/EquipmentTypes";

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
