import { WeaponType } from "../../../Utility/Enum/EquipmentTypes";

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