import { WeaponSpecificType, WeaponType } from "../../../../Common/Enums/Item/EquipmentTypes";

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