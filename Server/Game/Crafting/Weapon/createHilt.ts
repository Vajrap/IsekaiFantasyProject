import { ItemResourceInstance, ResourceType } from "../../../Database/Item/Resource/resource";
import { CharacterStatus } from "../../../Entities/Character/Subclasses/CharacterStatus";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { getTierForCharacterStatus, tierToNumber } from "../helper";

export function createHilt(
    characterStatus: CharacterStatus,
    material: ItemResourceInstance,
): {
    jewelSlots: number;
    maxJewelGrade: 'flawed' | 'cracked' | 'refined' | 'pristine' | 'perfect';
} {
    let jewelSlots = 0;
    let maxJewelGrade: 'flawed' | 'cracked' | 'refined' | 'pristine' | 'perfect' = 'flawed';


    const resourceTier = material.tier;
    const resourceTierAsNumber = tierToNumber(resourceTier);
    const resourceType = material.type;

    let playerTier: Tier;
    switch (resourceType) {
        case ResourceType.ingot:
            playerTier = getTierForCharacterStatus(characterStatus.smithing());
            break;
        case ResourceType.plank:
            playerTier = getTierForCharacterStatus(characterStatus.carpentry());
            break;
        case ResourceType.leather || ResourceType.fabric:
            playerTier = getTierForCharacterStatus(characterStatus.weaving());
            break;
        default:
            playerTier = Tier.common;
            break;
    }
    const playerTierAsNumber = tierToNumber(playerTier);

    const baseBonus = (playerTierAsNumber * 0.5 + resourceTierAsNumber * 1.5) / 2;
    const fluctuationRange = 0.2;

    const randomMultiplier = 1 + (Math.random() * fluctuationRange * 2 - fluctuationRange);
    const bonusMagnitude = Math.floor(baseBonus * randomMultiplier);

    if (bonusMagnitude >= 3) {
        jewelSlots = 1;
    }

    if (bonusMagnitude >= 5) {
        jewelSlots = 2;
    }

    if (resourceTierAsNumber >= 3) {
        maxJewelGrade = 'refined';
    }
    if (resourceTierAsNumber >= 4) {
        maxJewelGrade = 'pristine';
    }
    if (resourceTierAsNumber >= 5) {
        maxJewelGrade = 'perfect';
    }

    return {
        jewelSlots,
        maxJewelGrade,
    };
}