import { ItemResourceInstance, ResourceType } from "../../../Database/Item/Resource/resource";
import { CharacterStatus } from "../../../Entities/Character/Subclasses/CharacterStatus";
import { Tier } from "../../../Utility/Tier";
import { getTraitResultFromResourceTrait, TraitResultEnum } from "../getTraitFromResource";
import { getTierForCharacterStatus, tierToNumber } from "../helper";

export function createShiledHandle(
    characterStatus: CharacterStatus,
    material: ItemResourceInstance,
):{
    pDEF: number, mDEF: number, order: number, chaos: number, geo: number, water: number, air: number, fire: number, chiCold: number, chiWarm: number, chiHarmony: number, arcaneAptitude: number
} {
    let pDEF = 0;
    let mDEF = 0;
    let order = 0;
    let chaos = 0;
    let geo = 0;
    let water = 0;
    let air = 0;
    let fire = 0;
    let chiCold = 0;
    let chiWarm = 0;
    let chiHarmony = 0;
    let arcaneAptitude = 0;

    const resourceTier = material.tier;
    const resourceTierAsNumber = tierToNumber(resourceTier);
    const resourceType = material.type;

    let playerTier: Tier;
    switch (resourceType) {
        case ResourceType.ingot:
            playerTier = getTierForCharacterStatus(characterStatus.smithing())
            break;
        case ResourceType.plank:
            playerTier = getTierForCharacterStatus(characterStatus.carpentry())
            break;
        case ResourceType.leather || ResourceType.fabric:
            playerTier = getTierForCharacterStatus(characterStatus.weaving())
            break;
        case ResourceType.jewel:
            playerTier = getTierForCharacterStatus(characterStatus.jewelry())
            break;
        case ResourceType.bone || ResourceType.scale:
            playerTier = getTierForCharacterStatus(characterStatus.enchanting())
            break;
        default:
            playerTier = Tier.common;
            break; 
    }
    const playerTierAsNumber = tierToNumber(playerTier);

    // if playerTier is higher than resourceTier, add bonus, if not, no bonus
    let bonusPoint = playerTierAsNumber - resourceTierAsNumber;
    if (bonusPoint < 0) { bonusPoint = 0 }

    const baseBonus = (playerTierAsNumber * 0.5 + resourceTierAsNumber * 1.5) / 2;
    const fluctuationRange = 0.2;  // 20% fluctuation

    //Now we know how many bonus points we got, we can calculate the bonus stats.
    for (let i = 0; i < bonusPoint; i++) {
        const randomMultiplier = 1 + (Math.random() * fluctuationRange * 2 - fluctuationRange); 
        const bonusMagnitude = Math.floor(baseBonus * randomMultiplier);

        // Pick one Resource trait from materail
        const trait = material.resourceTraits[Math.floor(Math.random() * material.resourceTraits.length)];
        const traitResult = getTraitResultFromResourceTrait(trait);
        switch (traitResult) {
            case TraitResultEnum.pDEF:
                pDEF += bonusMagnitude;
                break;
            case TraitResultEnum.mDEF:
                mDEF += bonusMagnitude;
                break;
            case TraitResultEnum.element_order:
                order += bonusMagnitude;
                break;
            case TraitResultEnum.element_chaos:
                chaos += bonusMagnitude;
                break;
            case TraitResultEnum.element_geo:
                geo += bonusMagnitude;
                break;
            case TraitResultEnum.element_water:
                water += bonusMagnitude;
                break;
            case TraitResultEnum.element_air:
                air += bonusMagnitude;
                break;
            case TraitResultEnum.element_fire:
                fire += bonusMagnitude;
                break;
            case TraitResultEnum.element_chiCold:
                chiCold += bonusMagnitude;
                break;
            case TraitResultEnum.element_chiWarm:
                chiWarm += bonusMagnitude;
                break;
            case TraitResultEnum.element_chiHarmony:
                chiHarmony += bonusMagnitude;
                break;
            case TraitResultEnum.arcane_aptitude_plus:
                arcaneAptitude += bonusMagnitude;
                break;
            case TraitResultEnum.arcane_aptitude_minus:
                arcaneAptitude -= bonusMagnitude;
                break;
        }
    }

    return { pDEF, mDEF, order, chaos, geo, water, air, fire, chiCold, chiWarm, chiHarmony, arcaneAptitude };  
}