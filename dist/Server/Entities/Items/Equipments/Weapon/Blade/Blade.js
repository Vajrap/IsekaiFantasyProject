import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
export class Blade extends Weapon {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponType: WeaponType.blade });
        super(updatedDto);
    }
    ;
}
export class Blade_Katana extends Blade {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.blade_katana });
        super(updatedDto);
    }
    ;
}
export class Blade_Scimitar extends Blade {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.blade_scimitar });
        super(updatedDto);
    }
    ;
}
export class Blade_Cutlass extends Blade {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.blade_cutlass });
        super(updatedDto);
    }
    ;
}
export class Blade_Falchion extends Blade {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.blade_falchion });
        super(updatedDto);
    }
    ;
}
