import { Consumable } from './Consumable';
import { ItemCost } from '../ItemCost';
import { Tier } from '../../../../Common/DTOsEnumsInterfaces/Tier';
import { ConsumableType } from '../../../../Common/DTOsEnumsInterfaces/Item/Consumable/Enums';
import { CharacterStatusEnum } from '../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes';
import { ConsumableEffect } from '../../../../Common/DTOsEnumsInterfaces/Item/Consumable/Interfaces';

// Helper function to create status effect
function createAttributeEffect(
    effectType: 'permanent' | 'temporary',
    attribute: CharacterStatusEnum | "hp" | "mp" | "sp" | "arcaneAptitude",
    magnitude: number,
    duration: { months: number, days: number, quarters: number }
): ConsumableEffect {
    return {
        effectType: effectType,
        target: attribute,
        magnitude: magnitude,
        duration: duration
    };
}
