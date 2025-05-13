import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
export class Axe extends Weapon {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponType: WeaponType.axe });
        super(updatedDto);
    }
    ;
}
export class Axe_Broad extends Axe {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.axe_broad });
        super(updatedDto);
    }
    ;
}
export class Axe_Great extends Axe {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.axe_great });
        super(updatedDto);
    }
    ;
}
