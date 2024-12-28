import { Weapon } from "./Weapon";
import { WeaponDTO } from "../InterfacesAndEnums/DTOs";
import { WeaponType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { WeaponSpecificType } from "../../../../../Common/Enums/Item/EquipmentTypes";

export class Shiled extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.shield,
        };
        super(updatedDto);
    };
}

export class Shield_Buckler extends Shiled {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.shield_buckler,
        };
        super(updatedDto);
    };
}

export class Shield_Kite extends Shiled {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.shield_kite,
        };
        super(updatedDto);
    };
}

export class Shield_Tower extends Shiled {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.shield_tower,
        };
        super(updatedDto);
    };
}

export class Shield_Round extends Shiled {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.shield_round,
        };
        super(updatedDto);
    };
}