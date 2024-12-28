import { EquipmentType } from "../../../../../Common/Enums/Item/EquipmentTypes";
import { Equipment } from "../Equipment";
import { defaultDefenseStats } from "../InterfacesAndEnums/ArmorDefense";
import { WeaponDTO } from "../InterfacesAndEnums/DTOs";
import { defaultAttackStats } from "../InterfacesAndEnums/WeaponAttack";

export class Weapon extends Equipment {
    constructor(dto: WeaponDTO) {
        const updatedDto = {
            ...dto,
            equipmentType: EquipmentType.weapon,
            attackStats: { ...defaultAttackStats, ...dto.attackStats },
            defenseStats: { ...defaultDefenseStats, ...dto.defenseStats },
            armorType: null,
            accessoryType: null,
            arcaneAptitude: 0,
            spellCastingDamageMultiplier: 0,
            spellCastingPenaltyHit: 0,
            weaponType: dto.weaponType ?? null,
            weaponSpecificType: dto.weaponSpecificType ?? null,
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