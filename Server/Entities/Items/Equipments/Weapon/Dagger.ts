import { Weapon } from "./Weapon";
import { WeaponDTO } from "../InterfacesAndEnums/DTOs";
import { WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { WeaponSpecificType } from "../../../../../Common/Enums/Item/EquipmentTypes";

export class Dagger extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.dagger,
        };
        super(updatedDto);
    };
}

export class Dagger_Stiletto extends Dagger {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.dagger_stiletto,
        };
        super(updatedDto);
    };
}

export class Dagger_Knife extends Dagger {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.dagger_knife,
        };
        super(updatedDto);
    };
}
