import { ItemResourceInstance, ResourceTrait, ResourceType } from "../../Database/Item/Resource/resource";
import { CharacterStatus } from "../../Entities/Character/Subclasses/CharacterStatus";
import { Dice } from "../../Utility/Dice";
import { StatMod } from "../../Utility/StatMod";
import { Tier } from "../../Utility/Tier";
import { GearArchetype } from "./GearArcheType";


export function calculateFinalTier(materials: ItemResourceInstance[]): Tier {
    const totalTier = materials.reduce((sum, material) => sum + tierToNumber(material.tier), 0);
    const averageTier = Math.round(totalTier / materials.length);
    return numberToTier(averageTier);
}

export function numberToTier(tierNumber: number): Tier {
    switch (tierNumber) {
        case 0: return Tier.common;
        case 1: return Tier.uncommon;
        case 2: return Tier.rare;
        case 3: return Tier.epic;
        case 4: return Tier.legendary;
        case 5: return Tier.unique;
        case 6: return Tier.divine;
        default: return Tier.common;  // Default to common if something goes wrong
    }
}

export function generateUniqueId(baseID: string, crafter?: string): string {
    const crafterPart = crafter ? crafter.toLowerCase().replace(/\s+/g, '') : 'unknown';
    const uniquePart = Math.random().toString(36).substr(2, 6);
    return `${baseID}-${crafterPart}-${uniquePart}`;
}

export function generateSpecialTraits(bonusPoints: number, availableTraits: ResourceTrait[]): ResourceTrait[] {
    const specialTraits: ResourceTrait[] = [];

    // Every 3 bonus points = 1 special trait
    const numberOfTraits = Math.floor(bonusPoints / 3);

    for (let i = 0; i < numberOfTraits; i++) {
        const diceRoll = Dice.roll('1d20').sum;
        // map dicePossibility (1-20) to availableTraits (given as parameter); So that we know which trait should be add into the return array
        // Once a trait was added, pop it out from the possible array
        
    }

    return specialTraits;
}

export function calculateBonusPoints(
    characterStatus: CharacterStatus,
    materialsProvided: { [part: string]: { material: ItemResourceInstance, quantity: number } }
): number {
    let bonusPoints = 0;
    // Base bonus points from player luck
    let bonusFromLuck = StatMod.value(characterStatus.luck());

    let materialCount = 0;
    // Additional bonus for using higher-tier materials
    // First we must know if character tier is higher than the material or not, if so, how much higher?
    // Let's say the character skill's Tier is 1 level higher, then we got 1 bonus?
    for (const part in materialsProvided) {
        const resourceTier = materialsProvided[part].material.tier;
        const resourceType = materialsProvided[part].material.type;

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
        
        bonusPoints += (tierToNumber(playerTier) - tierToNumber(resourceTier));
        materialCount ++
    }

    bonusPoints = bonusPoints/materialCount
    bonusPoints += bonusFromLuck

    return bonusPoints;
}


export function getTierForCharacterStatusBasedOnMaterialType(characterStatus: CharacterStatus, resourceType: ResourceType): Tier {
    switch (resourceType) {
        case ResourceType.ingot:
            return getTierForCharacterStatus(characterStatus.smithing());
        case ResourceType.plank:
            return getTierForCharacterStatus(characterStatus.carpentry());
        case ResourceType.leather:
        case ResourceType.fabric:
            return getTierForCharacterStatus(characterStatus.weaving());
        case ResourceType.jewel:
            return getTierForCharacterStatus(characterStatus.jewelry());
        case ResourceType.bone:
        case ResourceType.scale:
            return getTierForCharacterStatus(characterStatus.enchanting());
        default:
            return Tier.common;
    }
}

export function getTierForCharacterStatus(statusValue: number): Tier {
    if (statusValue < 10) {
        return Tier.common;
    } else if (statusValue < 13) {
        return Tier.uncommon;
    } else if (statusValue < 18) {
        return Tier.rare;
    } else if (statusValue < 21) {
        return Tier.epic;
    } else if (statusValue < 26) {
        return Tier.legendary;
    } else if (statusValue < 29) {
        return Tier.unique;
    } else {
        return Tier.divine;
    }
}

export function tierToNumber(tier: Tier): number {
    switch (tier) {
        case Tier.common: return 0;
        case Tier.uncommon: return 1;
        case Tier.rare: return 2;
        case Tier.epic: return 3;
        case Tier.legendary: return 4;
        case Tier.unique: return 5;
        case Tier.divine: return 6;
    }
    return 0;
}

export function calculateSuccessRate(
    archetype: GearArchetype, 
    materialsProvided: { [part: string]: { material: ItemResourceInstance, quantity: number } },
    characterStatus: CharacterStatus
): number {
    let baseSuccessRate = 100;
    
    for (const part in archetype.resourceNeeded) {
        const material = materialsProvided[part]?.material;
        if (!material) {
            baseSuccessRate -= 20;  // If part is missing, apply heavy penalty
            continue;
        }

        const resourceTier = material.tier;
        const playerTier = getTierForCharacterStatusBasedOnMaterialType(characterStatus, material.type);
        baseSuccessRate -= getSuccessRatePenalty(playerTier, resourceTier);
    }

    return clampSuccessRate(baseSuccessRate);
}

function clampSuccessRate(rate: number): number {
    return Math.min(100, Math.max(0, rate));  // Clamp success rate between 0 and 100
}

function getSuccessRatePenalty(playerTier: Tier, resourceTier: Tier): number {
    const tierDifference = Math.abs(tierToNumber(playerTier) - tierToNumber(resourceTier));
    return tierDifference * 10;
}
