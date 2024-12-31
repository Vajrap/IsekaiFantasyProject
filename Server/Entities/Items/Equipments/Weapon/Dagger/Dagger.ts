import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponDTO } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";

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
