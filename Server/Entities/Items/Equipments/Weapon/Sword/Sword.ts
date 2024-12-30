import { Weapon } from "./Weapon";
import { WeaponType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponSpecificType } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { WeaponDTO } from "../../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/DTOs";
export class Sword extends Weapon {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponType: WeaponType.sword,
        };
        super(updatedDto);
    };
}

export class Sword_Short extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_short,
        };
        super(updatedDto);
    };
}

export class Sword_Long extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_long,
        };
        super(updatedDto);
    };
}

export class Sword_Great extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_great,
        };
        super(updatedDto);
    };
}

export class Sword_Rapier extends Sword {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            weaponSpecificType: WeaponSpecificType.sword_rapier,
        };
        super(updatedDto);
    };
}


// const swordBastard = new Sword_Bastard({
//     id: 'sword_bastard',
//     name: 'Bastard Sword',
//     description: 'A sword that is a bastard.',
//     image: 'sword_bastard.jpg',
//     cost: new ItemCost(10, 0),
//     weight: 10,
//     tier: Tier.common,
//     jewelSlots: 0,
//     slottedJewels: [],
//     maxJewelGrade: null,
//     material: 'steel',
//     specialTrait: [],
//     attackStats: {
//         physicalType: DamageTypes.slash,
//         magicalType: DamageTypes.arcane,
//         physicalDiceEnum: DiceEnum.OneD8,
//         physicalDamageStat: AttributeEnum.STRENGTH,
//         magicalDiceEnum: DiceEnum.OneD4,
//         magicalDamageStat: AttributeEnum.PLANAR,
//         preferredPosition: PreferredPosition.melee,
//         handle: 1
//     },
//     defenseStats: {}
// })