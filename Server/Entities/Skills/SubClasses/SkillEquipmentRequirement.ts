import { WeaponType } from "../../../../Common/Enums/Item/EquipmentTypes";

export class SkillEquipmentRequirement {
    weapon?: string[];
    constructor({
        weapon, 
    }: {
        weapon?: WeaponType[], 
    }) {
        this.weapon = weapon;
    }
}