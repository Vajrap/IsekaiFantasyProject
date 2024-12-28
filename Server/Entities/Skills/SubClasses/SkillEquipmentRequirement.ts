import { WeaponSpecificType, WeaponType } from "../../../../Common/DTOsEnumsInterfaces/Item/EquipmentTypes";

export class SkillEquipmentRequirement {
    weapon?: string[];
    constructor({
        weapon, 
    }: {
        weapon?: WeaponSpecificType[], 
    }) {
        this.weapon = weapon;
    }
}