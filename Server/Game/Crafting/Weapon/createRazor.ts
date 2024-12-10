import { ItemResourceInstance, ResourceTrait, ResourceType } from "../../../Database/Item/Resource/resource";
import { CharacterStatus } from "../../../Entities/Character/Subclasses/CharacterStatus";
import { Dice } from "../../../Utility/Dice";
import { Tier } from "../../../Utility/Tier";
import { getTierForCharacterStatus, tierToNumber } from "../helper";

export function createRazor(
    characterStatus: CharacterStatus,
    material: ItemResourceInstance,
    basePhysicalDiceEnum: string,
    baseMagicalDiceEnum: string
): {
    physicalDiceEnum: string;
    magicalDiceEnum: string;
} {
    const validDice = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // Allowed die faces

    const [physicalDiceCount, physicalDiceSides] = basePhysicalDiceEnum.split('d').map(Number);
    const [magicalDiceCount, magicalDiceSides] = baseMagicalDiceEnum.split('d').map(Number);

    let physicalDiceEnum = basePhysicalDiceEnum;
    let magicalDiceEnum = baseMagicalDiceEnum;

    const resourceTier = material.tier;
    const resourceTierAsNumber = tierToNumber(resourceTier);
    const playerTier = getTierForCharacterStatus(characterStatus.smithing()); // Assuming smithing skill
    const playerTierAsNumber = tierToNumber(playerTier);

    // Calculate the chance magnitude based on player and resource tier differences
    let chanceMagnitude = Math.max(playerTierAsNumber - resourceTierAsNumber, 0);
    let resourceChances = resourceTierAsNumber >= 2 ? 1 : 0;  // Start from Uncommon tier

    // Boost chance for rare materials
    if (resourceTier >= Tier.rare) {
        chanceMagnitude += 1;
    }

    let stepUp = false;
    let addExtraDie = false;

    // Index of the current die face in the valid dice array for physical dice
    const physicalIndex = validDice.indexOf(physicalDiceSides);

    // Roll for step up or extra die for physical dice
    for (let i = 0; i < resourceChances + chanceMagnitude; i++) {
        const roll = Dice.roll('1d20').sum;

        if (roll >= 19) {  
            // Natural 19 or 20 triggers the chance to add an extra die
            if (physicalIndex >= 2) { // Ensure there is room to step down 2 steps
                addExtraDie = true;
                break;
            }
        } else if (roll >= 10) {
            stepUp = true;
        }
    }

    if (addExtraDie) {
        // Add an extra die and step down the die face by 2
        const newDiceCount = physicalDiceCount + 1;
        const newDieFaceIndex = Math.max(physicalIndex - 2, 0); // Step down by 2
        physicalDiceEnum = `${newDiceCount}d${validDice[newDieFaceIndex]}`;
    } else if (stepUp) {
        // Step the die face up
        if (physicalIndex < validDice.length - 1) {
            physicalDiceEnum = `${physicalDiceCount}d${validDice[physicalIndex + 1]}`;
        }
    } else {
        // Step the die face down
        if (physicalIndex > 0) {
            physicalDiceEnum = `${physicalDiceCount}d${validDice[physicalIndex - 1]}`;
        }
    }

    // Check if the material is magically conductive
    const isMagicalConductive = material.resourceTraits.some(trait => 
        trait === ResourceTrait.forging_magicalConductive ||
        trait === ResourceTrait.leatherwork_magicalConductive ||
        trait === ResourceTrait.weaving_magicalConductive ||
        trait === ResourceTrait.woodworking_magicalConductive
    );

    if (isMagicalConductive) {
        let magicalStepUp = false;
        let magicalAddExtraDie = false;

        // Index of the current die face in the valid dice array for magical dice
        const magicalIndex = validDice.indexOf(magicalDiceSides);

        // Roll for step up or extra die for magical dice
        for (let i = 0; i < resourceChances + chanceMagnitude; i++) {
            const roll = Dice.roll('1d20').sum;

            if (roll >= 19) {  
                if (magicalIndex >= 2) { // Ensure there is room to step down 2 steps
                    magicalAddExtraDie = true;
                    break;
                }
            } else if (roll >= 10) {
                magicalStepUp = true;
            }
        }

        if (magicalAddExtraDie) {
            // Add an extra die and step down the die face by 2
            const newDiceCount = magicalDiceCount + 1;
            const newDieFaceIndex = Math.max(magicalIndex - 2, 0); // Step down by 2
            magicalDiceEnum = `${newDiceCount}d${validDice[newDieFaceIndex]}`;
        } else if (magicalStepUp) {
            // Step the magical die face up
            if (magicalIndex < validDice.length - 1) {
                magicalDiceEnum = `${magicalDiceCount}d${validDice[magicalIndex + 1]}`;
            }
        } else {
            // Step the magical die face down
            if (magicalIndex > 0) {
                magicalDiceEnum = `${magicalDiceCount}d${validDice[magicalIndex - 1]}`;
            }
        }
    }

    return {
        physicalDiceEnum,
        magicalDiceEnum,
    };
}