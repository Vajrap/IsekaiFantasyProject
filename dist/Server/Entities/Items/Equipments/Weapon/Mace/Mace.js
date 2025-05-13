import { Weapon } from "../Weapon";
import { WeaponType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
export class Mace extends Weapon {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponType: WeaponType.mace });
        super(updatedDto);
    }
    ;
}
export class Mace_Morningstar extends Mace {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.mace_morningstar });
        super(updatedDto);
    }
    ;
}
export class Mace_Hammer extends Mace {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.mace_hammer });
        super(updatedDto);
    }
    ;
}
export class Mace_Warhammer extends Mace {
    constructor(dto) {
        const updatedDto = Object.assign(Object.assign({}, dto), { weaponSpecificType: WeaponSpecificType.mace_warhammer });
        super(updatedDto);
    }
    ;
}
