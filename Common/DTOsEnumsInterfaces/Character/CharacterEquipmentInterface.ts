import { AccessoryType } from "../Item/Equipment/Accessory/Enums";
import { ArmorType } from "../Item/Equipment/Armor/Enums";
import { WeaponSpecificType } from "../Item/Equipment/Weapon/Enums";

export interface CharacterEquipmentInterface {
    mainHand: WeaponSpecificType | undefined;
    offHand: WeaponSpecificType | undefined;
    armor: ArmorType | undefined;
    headwear: ArmorType | undefined;
    gloves: ArmorType | undefined;
    boots: ArmorType | undefined;
    necklace: AccessoryType | undefined;
    ring_R: AccessoryType | undefined;
    ring_L: AccessoryType | undefined;
}