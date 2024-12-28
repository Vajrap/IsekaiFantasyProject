import { WeaponSpecificType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";

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