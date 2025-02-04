import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { BuffsAndDebuffsEnum } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { TraitEnum } from "../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { EquipmentType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { AccessoryType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { ArmorType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { WeaponSpecificType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";

export interface CharacterBattleContext {
    actorID: string;
    actorPosition: number;
    actorEquipment: {
        mainHand: WeaponSpecificType | null,
        offHand: WeaponSpecificType | null,
        armor: ArmorType | null,
        Headwear: EquipmentType.Headwear | null,
        gloves: EquipmentType.gloves | null,
        boots: EquipmentType.boots | null,
        necklace: AccessoryType.necklace | null,
        ring_R: AccessoryType.ring | null,
        ring_L: AccessoryType.ring | null,
    };
    actorStats: Record<CharacterStatusEnum, number>;
    actorBuffs: Record<BuffsAndDebuffsEnum, number>;
    actorTraits: TraitEnum[]; 
}