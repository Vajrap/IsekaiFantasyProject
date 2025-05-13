import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
export class Orb extends Weapon {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponType: WeaponType.orb });
        super(updatedDto);
    }
    ;
}
export class Orb_Metallic extends Orb {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.orb_metallic });
        super(updatedDto);
    }
    ;
}
export class Orb_Crystal extends Orb {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.orb_crystal });
        super(updatedDto);
    }
    ;
}
