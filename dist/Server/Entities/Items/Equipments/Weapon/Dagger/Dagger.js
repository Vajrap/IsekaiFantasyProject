import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
export class Dagger extends Weapon {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponType: WeaponType.dagger });
        super(updatedDto);
    }
    ;
}
export class Dagger_Stiletto extends Dagger {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.dagger_stiletto });
        super(updatedDto);
    }
    ;
}
export class Dagger_Knife extends Dagger {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.dagger_knife });
        super(updatedDto);
    }
    ;
}
export class Dagger_Kunai extends Dagger {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.dagger_kunai });
        super(updatedDto);
    }
    ;
}
export class Dagger_Parrying extends Dagger {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.dagger_parrying });
        super(updatedDto);
    }
    ;
}
export class Dagger_Throwing extends Dagger {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.dagger_throwing });
        super(updatedDto);
    }
    ;
}
