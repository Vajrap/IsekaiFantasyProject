import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
export class Shiled extends Weapon {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponType: WeaponType.shield });
        super(updatedDto);
    }
    ;
}
export class Shield_Buckler extends Shiled {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.shield_buckler });
        super(updatedDto);
    }
    ;
}
export class Shield_Kite extends Shiled {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.shield_kite });
        super(updatedDto);
    }
    ;
}
export class Shield_Tower extends Shiled {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.shield_tower });
        super(updatedDto);
    }
    ;
}
export class Shield_Round extends Shiled {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.shield_round });
        super(updatedDto);
    }
    ;
}
