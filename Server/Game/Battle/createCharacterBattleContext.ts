import { AccessoryType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { EquipmentType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums";
import { Character } from "../../Entities/Character/Character";
import { CharacterBattleContext } from "../../Entities/Character/CharacterBattleContext";

export function createCharacterBattleContext(character: Character): CharacterBattleContext {
    return {
        actorID: character.id,
        actorPosition: character.position,
        actorEquipment: {
            mainHand: character.equipments.mainHand?.weaponSpecificType ?? null,
            offHand: character.equipments.offHand?.weaponSpecificType ?? null,
            armor: character.equipments.armor?.armorType ?? null,
            Headwear: character.equipments.headwear ? EquipmentType.Headwear : null,
            gloves: character.equipments.gloves ? EquipmentType.gloves : null,
            boots: character.equipments.boots ? EquipmentType.boots : null,
            necklace: character.equipments.necklace ? AccessoryType.necklace : null,
            ring_R: character.equipments.ring_R ? AccessoryType.ring : null,
            ring_L: character.equipments.ring_L ? AccessoryType.ring : null,
        },
        actorStats: character.status.getStats(),
        actorBuffs: character.buffsAndDebuffs.getBuffsAndDebuffs(),
        actorTraits: character.getTraits(),
    };
}