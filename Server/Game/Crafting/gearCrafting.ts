import { db } from "../../Database";
import { GearInstance } from "../../Entities/Items/GearInstance/GearInstance";
import { ItemResourceInstance} from "../../Database/Item/Resource/resource";
import { AttributeEnum } from "../../Entities/Character/Subclasses/CharacterDataEnum";
import { CharacterStatus } from "../../Entities/Character/Subclasses/CharacterStatus";
import { Dice } from "../../Utility/Dice";
import { GearType, WeaponType } from "../../../Common/DTOsEnumsInterfaces/Item/EquipmentTypes";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { GearArchetype } from "./GearArcheType";
import { calculateFinalTier, calculateSuccessRate, generateUniqueId } from "./helper";
import { createHandle } from "./Weapon/createHandle";
import { createHilt } from "./Weapon/createHilt";
import { createRazor } from "./Weapon/createRazor";
import { createShaft } from "./Weapon/createShaft";
import { createShieldBody } from "./Weapon/createShieldBody";
import { createShiledHandle } from "./Weapon/createShieldHandle";

// MARK: Sword
export function craftSword(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialsProvided: {
        handle: { material: ItemResourceInstance, quantity: number },
        hilt: { material: ItemResourceInstance, quantity: number },
        edge: { material: ItemResourceInstance, quantity: number }
    },    
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.sword_short && 
        archetype.specificType !== WeaponType.sword_long &&
        archetype.specificType !== WeaponType.sword_zweihander &&
        archetype.specificType !== WeaponType.sword_great &&
        archetype.specificType !== WeaponType.sword_jian &&
        archetype.specificType !== WeaponType.sword_rapier &&
        archetype.specificType !== WeaponType.sword_broad &&
        archetype.specificType !== WeaponType.sword_claymore &&
        archetype.specificType !== WeaponType.sword_bastard &&
        archetype.specificType !== WeaponType.sword_flamberge
    ) {
        throw new Error("Archetype is not a sword");
    }
    
    const successRate = calculateSuccessRate(archetype, materialsProvided, characterStatus);

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Sword archetype is missing physical or magical damage dice");
    }

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const handle = createHandle(characterStatus, materialsProvided.handle.material);
    const hilt = createHilt(characterStatus, materialsProvided.hilt.material);
    const edge = createRazor(characterStatus, materialsProvided.edge.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: edge.physicalDiceEnum,
        magicalDiceEnum: edge.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + handle.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + handle.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + handle.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + handle.mATK,
            mHIT: (archetype.attackStats.bonus?.mHIT ?? 0) + handle.mHIT,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + handle.mCRT,
            geo: (archetype.attackStats.bonus?.geo ?? 0) + handle.geo,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: (archetype.attackStats.bonus?.water ?? 0) + handle.water,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: (archetype.attackStats.bonus?.air ?? 0) + handle.air,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: (archetype.attackStats.bonus?.fire ?? 0) + handle.fire,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: (archetype.attackStats.bonus?.order ?? 0) + handle.order,
            chaos: (archetype.attackStats.bonus?.chaos ?? 0) + handle.chaos,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    const finalTier = calculateFinalTier([materialsProvided.handle.material, materialsProvided.hilt.material, materialsProvided.edge.material]);

    const materialPrefix = materialsProvided.handle.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: hilt.jewelSlots,
        maxJewelGrade: hilt.maxJewelGrade,
        attackStats,
        material: materialsProvided.handle.material.type,
        specialTrait: []
    });
}

// MARK: Blade
export function craftBlade(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialsProvided: {
        handle: { material: ItemResourceInstance, quantity: number },
        hilt: { material: ItemResourceInstance, quantity: number },
        edge: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.blade_broadblade &&
        archetype.specificType !== WeaponType.blade_cutlass &&
        archetype.specificType !== WeaponType.blade_dao &&
        archetype.specificType !== WeaponType.blade_falchion &&
        archetype.specificType !== WeaponType.blade_katana &&
        archetype.specificType !== WeaponType.blade_khopesh &&
        archetype.specificType !== WeaponType.blade_machete &&
        archetype.specificType !== WeaponType.blade_randao &&
        archetype.specificType !== WeaponType.blade_saber &&
        archetype.specificType !== WeaponType.blade_scimitar &&
        archetype.specificType !== WeaponType.blade_zhanmadao
    ) {
        throw new Error("Archetype is not a blade");
    }

    const successRate = calculateSuccessRate(archetype, materialsProvided, characterStatus);

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Sword archetype is missing physical or magical damage dice");
    }

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const handle = createHandle(characterStatus, materialsProvided.handle.material);
    const hilt = createHilt(characterStatus, materialsProvided.hilt.material);
    const edge = createRazor(characterStatus, materialsProvided.edge.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: edge.physicalDiceEnum,
        magicalDiceEnum: edge.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + handle.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + handle.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + handle.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + handle.mATK,
            mHIT: (archetype.attackStats.bonus?.mHIT ?? 0) + handle.mHIT,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + handle.mCRT,
            geo: (archetype.attackStats.bonus?.geo ?? 0) + handle.geo,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: (archetype.attackStats.bonus?.water ?? 0) + handle.water,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: (archetype.attackStats.bonus?.air ?? 0) + handle.air,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: (archetype.attackStats.bonus?.fire ?? 0) + handle.fire,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: (archetype.attackStats.bonus?.order ?? 0) + handle.order,
            chaos: (archetype.attackStats.bonus?.chaos ?? 0) + handle.chaos,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    const finalTier = calculateFinalTier([materialsProvided.handle.material, materialsProvided.hilt.material, materialsProvided.edge.material]);

    const materialPrefix = materialsProvided.handle.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: hilt.jewelSlots,
        maxJewelGrade: hilt.maxJewelGrade,
        attackStats,
        material: materialsProvided.handle.material.type,
        specialTrait: []
    });
}

// MARK: Axe
export function craftAxe(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialsProvided: {
        handle: { material: ItemResourceInstance, quantity: number },
        decorator: { material: ItemResourceInstance, quantity: number },
        edge: { material: ItemResourceInstance, quantity: number }
    },    
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.axe_broad &&
        archetype.specificType !== WeaponType.axe_great &&
        archetype.specificType !== WeaponType.axe_shepherd &&
        archetype.specificType !== WeaponType.axe_spliitingMaul &&
        archetype.specificType !== WeaponType.axe_war
    ) {
        throw new Error("Archetype is not a blade");
    }

    const successRate = calculateSuccessRate(archetype, materialsProvided, characterStatus);

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Sword archetype is missing physical or magical damage dice");
    }

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const handle = createHandle(characterStatus, materialsProvided.handle.material);
    const hilt = createHilt(characterStatus, materialsProvided.decorator.material);
    const edge = createRazor(characterStatus, materialsProvided.edge.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: edge.physicalDiceEnum,
        magicalDiceEnum: edge.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + handle.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + handle.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + handle.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + handle.mATK,
            mHIT: (archetype.attackStats.bonus?.mHIT ?? 0) + handle.mHIT,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + handle.mCRT,
            geo: (archetype.attackStats.bonus?.geo ?? 0) + handle.geo,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: (archetype.attackStats.bonus?.water ?? 0) + handle.water,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: (archetype.attackStats.bonus?.air ?? 0) + handle.air,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: (archetype.attackStats.bonus?.fire ?? 0) + handle.fire,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: (archetype.attackStats.bonus?.order ?? 0) + handle.order,
            chaos: (archetype.attackStats.bonus?.chaos ?? 0) + handle.chaos,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    const finalTier = calculateFinalTier([materialsProvided.handle.material, materialsProvided.decorator.material, materialsProvided.edge.material]);

    const materialPrefix = materialsProvided.handle.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: hilt.jewelSlots,
        maxJewelGrade: hilt.maxJewelGrade,
        attackStats,
        material: materialsProvided.handle.material.type,
        specialTrait: []
    });
}

// MARK: Spear
export function craftSpear(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialsProvided: {
        shaft: { material: ItemResourceInstance, quantity: number },
        edge: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.spear_Brandistock &&
        archetype.specificType !== WeaponType.spear_dory &&
        archetype.specificType !== WeaponType.spear_glaive &&
        archetype.specificType !== WeaponType.spear_guisarme &&
        archetype.specificType !== WeaponType.spear_ji &&
        archetype.specificType !== WeaponType.spear_partisan &&
        archetype.specificType !== WeaponType.spear_halberd &&
        archetype.specificType !== WeaponType.spear_trident &&
        archetype.specificType !== WeaponType.spear_javelin
    ) {
        throw new Error("Archetype is not a blade");
    }

    const successRate = calculateSuccessRate(archetype, materialsProvided, characterStatus);

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Sword archetype is missing physical or magical damage dice");
    }

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const shaft = createShaft(characterStatus, materialsProvided.shaft.material);
    const edge = createRazor(characterStatus, materialsProvided.edge.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: edge.physicalDiceEnum,
        magicalDiceEnum: edge.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + shaft.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + shaft.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + shaft.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + shaft.mATK,
            mHIT: (archetype.attackStats.bonus?.mHIT ?? 0) + shaft.mHIT,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + shaft.mCRT,
            geo: (archetype.attackStats.bonus?.geo ?? 0) + shaft.geo,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: (archetype.attackStats.bonus?.water ?? 0) + shaft.water,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: (archetype.attackStats.bonus?.air ?? 0) + shaft.air,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: (archetype.attackStats.bonus?.fire ?? 0) + shaft.fire,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: (archetype.attackStats.bonus?.order ?? 0) + shaft.order,
            chaos: (archetype.attackStats.bonus?.chaos ?? 0) + shaft.chaos,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    const finalTier = calculateFinalTier([materialsProvided.shaft.material, materialsProvided.edge.material]);

    const materialPrefix = materialsProvided.edge.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: shaft.jewelSlots,
        maxJewelGrade: shaft.maxJewelGrade,
        attackStats,
        material: materialsProvided.edge.material.type,
        specialTrait: []
    });
}

// MARK: Bow
export function craftBow(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialsProvided: {
        limbs: { material: ItemResourceInstance, quantity: number },
        string: { material: ItemResourceInstance, quantity: number },
        triggerOrPulleys: { material: ItemResourceInstance, quantity: number }  // Only for crossbow/compound bow
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Bow archetype is missing physical or magical damage dice");
    }

    // Ensure correct archetype
    if (
        archetype.specificType !== WeaponType.bow_long &&
        archetype.specificType !== WeaponType.bow_short &&
        archetype.specificType !== WeaponType.bow_cross &&
        archetype.specificType !== WeaponType.bow_compound &&
        archetype.specificType !== WeaponType.bow_recurve
    ) {
        throw new Error("Archetype is not a bow");
    }

    const successRate = calculateSuccessRate(archetype, materialsProvided, characterStatus);
    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail if dice roll exceeds success rate
    }   

    // For weapon like bow, crossbow, compound bow: what determine the damage Dice should be the string
    // Then, the limbs, would normally act as something that provide bonus stats, along with the jewel slots, it's weird if we put jewel in trigger/pulleys
    // And, trigger/pulleys are component on the more advanced weapon like crossbow, compound bow: what would trigger do in real life? It's to release the string, so it should, maybe able to provide some pHIT, pCRT bonus? but just small amount 

    // Create components
    const limbs = createShaft(characterStatus, materialsProvided.limbs.material);  // Limbs provide bonuses
    const string = createRazor(characterStatus, materialsProvided.string.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);  // String affects damage and type
    const triggerOrPulleys = createHandle(characterStatus, materialsProvided.triggerOrPulleys.material);  // Triggers/Pulleys give jewel-related stats

    // Assemble attack stats
    const attackStats = {
        physicalDiceEnum: string.physicalDiceEnum,  // String affects damage dice
        magicalDiceEnum: string.magicalDiceEnum,    // String affects magical dice
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + limbs.pATK,  // Limbs provide the bonus stats
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + (triggerOrPulleys.pHIT? triggerOrPulleys.pHIT: limbs.pHIT),
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + (triggerOrPulleys.pCRT? triggerOrPulleys.pCRT: limbs.pCRT),
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + limbs.mATK,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0 + (triggerOrPulleys.mHIT? triggerOrPulleys.mHIT: limbs.mHIT),
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + (triggerOrPulleys.mCRT? triggerOrPulleys.mCRT: limbs.mCRT),
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    // Calculate final tier
    const finalTier = calculateFinalTier(
        [materialsProvided.limbs.material, materialsProvided.string.material, materialsProvided.triggerOrPulleys?.material]
    );

    const materialPrefix = materialsProvided.limbs.material.name.replace(/ingot|plank|fabric/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name ? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier ? tier : finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: limbs.jewelSlots,  // Jewel slots from trigger/pulleys
        maxJewelGrade: limbs.maxJewelGrade,  // Max jewel grade from trigger/pulleys
        attackStats,
        material: materialsProvided.limbs.material.type,
        specialTrait: []
    });
}


export function craftDagger(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialProvided: {
        grip: { material: ItemResourceInstance, quantity: number },
        edge: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Dagger archetype is missing physical or magical damage dice");
    }

    if (
        archetype.specificType !== WeaponType.dagger_dirk &&
        archetype.specificType !== WeaponType.dagger_khukuri &&
        archetype.specificType !== WeaponType.dagger_knife &&
        archetype.specificType !== WeaponType.dagger_kris &&
        archetype.specificType !== WeaponType.dagger_rondel &&
        archetype.specificType !== WeaponType.dagger_stiletto
    ) {
        throw new Error("Archetype is not a dagger");
    }
    
    const successRate = calculateSuccessRate(archetype, materialProvided, characterStatus);

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const grip = createShaft(characterStatus, materialProvided.grip.material);
    const edge = createRazor(characterStatus, materialProvided.edge.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: edge.physicalDiceEnum,
        magicalDiceEnum: edge.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + grip.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + grip.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + grip.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + grip.mATK,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + grip.mCRT,
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    const finalTier = calculateFinalTier([materialProvided.grip.material, materialProvided.edge.material]);

    const materialPrefix = materialProvided.grip.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: grip.jewelSlots,
        maxJewelGrade: grip.maxJewelGrade,
        attackStats,
        material: materialProvided.grip.material.type,
        specialTrait: []
    });
}

export function craftWand(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialProvided: {
        head: { material: ItemResourceInstance, quantity: number },
        shaft: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.wand_magic &&
        archetype.specificType !== WeaponType.wand_scepter
    ) {
        throw new Error("Archetype is not a wand");
    }

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Wand archetype is missing physical or magical damage dice");
    }

    const successRate = calculateSuccessRate(archetype, materialProvided, characterStatus);

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const shaft = createShaft(characterStatus, materialProvided.shaft.material);
    const head = createRazor(characterStatus, materialProvided.head.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: head.physicalDiceEnum,
        magicalDiceEnum: head.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + shaft.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + shaft.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + shaft.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + shaft.mATK,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + shaft.mCRT,
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    const finalTier = calculateFinalTier([materialProvided.shaft.material, materialProvided.head.material]);

    const materialPrefix = materialProvided.shaft.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: shaft.jewelSlots,
        maxJewelGrade: shaft.maxJewelGrade,
        attackStats,
        material: materialProvided.shaft.material.type,
        specialTrait: []
    });
}

export function craftStaff(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialProvided: {
        shaft: { material: ItemResourceInstance, quantity: number },
        head: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.staff_quarter &&
        archetype.specificType !== WeaponType.staff_long &&
        archetype.specificType !== WeaponType.staff_magic
    ) {
        throw new Error("Archetype is not a staff");
    }

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Staff archetype is missing physical or magical damage dice");
    }

    const successRate = calculateSuccessRate(archetype, materialProvided, characterStatus);

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const shaft = createShaft(characterStatus, materialProvided.shaft.material);
    const head = createRazor(characterStatus, materialProvided.head.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: head.physicalDiceEnum,
        magicalDiceEnum: head.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + shaft.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + shaft.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + shaft.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + shaft.mATK,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + shaft.mCRT,
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        }
    };

    const finalTier = calculateFinalTier([materialProvided.shaft.material, materialProvided.head.material]);

    const materialPrefix = materialProvided.shaft.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: shaft.jewelSlots,
        maxJewelGrade: shaft.maxJewelGrade,
        attackStats,
        material: materialProvided.shaft.material.type,
        specialTrait: []
    });
}

export function craftTome(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialProvided: {
        binding: { material: ItemResourceInstance, quantity: number },
        core: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.tome_grimoire &&
        archetype.specificType !== WeaponType.tome_bible &&
        archetype.specificType !== WeaponType.tome_codex
    ) {
        throw new Error("Archetype is not a tome");
    }

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Tome archetype is missing physical or magical damage dice");
    }

    const successRate = calculateSuccessRate(archetype, materialProvided, characterStatus);

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const binding = createShaft(characterStatus, materialProvided.binding.material);
    const core = createRazor(characterStatus, materialProvided.core.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: core.physicalDiceEnum,
        magicalDiceEnum: core.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + binding.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + binding.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + binding.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + binding.mATK,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + binding.mCRT,
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        },
    };

    const finalTier = calculateFinalTier([materialProvided.binding.material, materialProvided.core.material]);

    const materialPrefix = materialProvided.binding.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: binding.jewelSlots,
        maxJewelGrade: binding.maxJewelGrade,
        attackStats,
        material: materialProvided.binding.material.type,
        specialTrait: []
    });
}

export function craftOrb(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialProvided: {
        core: { material: ItemResourceInstance, quantity: number },
        enclosure: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.orb
    ) {
        throw new Error("Archetype is not an orb");
    }

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Orb archetype is missing physical or magical damage dice");
    }

    const successRate = calculateSuccessRate(archetype, materialProvided, characterStatus);

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const core = createShaft(characterStatus, materialProvided.core.material);
    const enclosure = createRazor(characterStatus, materialProvided.enclosure.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: enclosure.physicalDiceEnum,
        magicalDiceEnum: enclosure.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + core.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + core.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + core.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + core.mATK,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + core.mCRT,
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        },
    };

    const finalTier = calculateFinalTier([materialProvided.core.material, materialProvided.enclosure.material]);

    const materialPrefix = materialProvided.core.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: core.jewelSlots,
        maxJewelGrade: core.maxJewelGrade,
        attackStats,
        material: materialProvided.core.material.type,
        specialTrait: []
    });
} 

export function craftMace(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialProvided: {
        shaft: { material: ItemResourceInstance, quantity: number },
        head: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.mace_club &&
        archetype.specificType !== WeaponType.mace_flail &&
        archetype.specificType !== WeaponType.mace_morningStar &&
        archetype.specificType !== WeaponType.mace_warHammer
    ) {
        throw new Error("Archetype is not a mace");
    }

    if (!archetype.attackStats || !archetype.attackStats.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Mace archetype is missing physical or magical damage dice");
    }

    const successRate = calculateSuccessRate(archetype, materialProvided, characterStatus);

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const shaft = createShaft(characterStatus, materialProvided.shaft.material);
    const head = createRazor(characterStatus, materialProvided.head.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: head.physicalDiceEnum,
        magicalDiceEnum: head.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: (archetype.attackStats.bonus?.pATK ?? 0) + shaft.pATK,
            pHIT: (archetype.attackStats.bonus?.pHIT ?? 0) + shaft.pHIT,
            pCRT: (archetype.attackStats.bonus?.pCRT ?? 0) + shaft.pCRT,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: archetype.attackStats.bonus?.pDEF ?? 0,
            mATK: (archetype.attackStats.bonus?.mATK ?? 0) + shaft.mATK,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0,
            mCRT: (archetype.attackStats.bonus?.mCRT ?? 0) + shaft.mCRT,
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        },
    };

    const finalTier = calculateFinalTier([materialProvided.shaft.material, materialProvided.head.material]);

    const materialPrefix = materialProvided.shaft.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: shaft.jewelSlots,
        maxJewelGrade: shaft.maxJewelGrade,
        attackStats,
        material: materialProvided.shaft.material.type,
        specialTrait: []
    });
}

export function craftShield(
    archetype: GearArchetype,
    characterStatus: CharacterStatus,
    materialProvided: {
        handle: { material: ItemResourceInstance, quantity: number },
        body: { material: ItemResourceInstance, quantity: number }
    },
    crafter?: string,
    name?: string,
    tier?: Tier
): GearInstance | 'CraftFailed' {

    if (
        archetype.specificType !== WeaponType.shield_buckler &&
        archetype.specificType !== WeaponType.shield_kite &&
        archetype.specificType !== WeaponType.shield_round &&
        archetype.specificType !== WeaponType.shield_tower
    ) {
        throw new Error("Archetype is not a shield");
    }

    if (!archetype.defenseStats || !archetype.attackStats?.physicalDiceEnum || !archetype.attackStats.magicalDiceEnum) {
        throw new Error("Shield archetype is missing physical or magical defense");
    }

    const successRate = calculateSuccessRate(archetype, materialProvided, characterStatus);

    if (Dice.roll('1d100').sum > successRate) {
        return 'CraftFailed';  // Fail the craft if dice roll exceeds success rate
    }

    const handle = createShiledHandle(characterStatus, materialProvided.handle.material);
    const body = createShieldBody(characterStatus, materialProvided.body.material, archetype.attackStats.physicalDiceEnum, archetype.attackStats.magicalDiceEnum);

    const attackStats = {
        physicalDiceEnum: body.physicalDiceEnum,
        magicalDiceEnum: body.magicalDiceEnum,
        physicalType: archetype.attackStats.physicalType,
        magicalType: archetype.attackStats.magicalType,
        preferredPosition: archetype.attackStats.preferredPosition,
        handle: archetype.handle,
        physicalDamageStat: archetype.attackStats.physicalDamageStat,
        magicalDamageStat: archetype.attackStats.magicalDamageStat,
        bonus: {
            pATK: archetype.attackStats.bonus?.pATK ?? 0,
            pHIT: archetype.attackStats.bonus?.pHIT ?? 0,
            pCRT: archetype.attackStats.bonus?.pCRT ?? 0,
            slash: archetype.attackStats.bonus?.slash ?? 0,
            pierce: archetype.attackStats.bonus?.pierce ?? 0,
            blunt: archetype.attackStats.bonus?.blunt ?? 0,
            pDEF: (archetype.attackStats.bonus?.pDEF ?? 0) + handle.pDEF + body.pDEF,
            mATK: archetype.attackStats.bonus?.mATK ?? 0,
            mHIT: archetype.attackStats.bonus?.mHIT ?? 0,
            mCRT: archetype.attackStats.bonus?.mCRT ?? 0,
            mDEF: (archetype.attackStats.bonus?.mDEF ?? 0) + handle.mDEF + body.mDEF,
            geo: archetype.attackStats.bonus?.geo ?? 0,
            geoDef: archetype.attackStats.bonus?.geoDef ?? 0,
            water: archetype.attackStats.bonus?.water ?? 0,
            waterDef: archetype.attackStats.bonus?.waterDef ?? 0,
            air: archetype.attackStats.bonus?.air ?? 0,
            airDef: archetype.attackStats.bonus?.airDef ?? 0,
            fire: archetype.attackStats.bonus?.fire ?? 0,
            fireDef: archetype.attackStats.bonus?.fireDef ?? 0,
            order: archetype.attackStats.bonus?.order ?? 0,
            chaos: archetype.attackStats.bonus?.chaos ?? 0,
            dodge: archetype.attackStats.bonus?.dodge ?? 0
        },
    };

    const finalTier = calculateFinalTier([materialProvided.handle.material, materialProvided.body.material]);

    const materialPrefix = materialProvided.handle.material.name.replace(/ingot|plank/gi, '').trim();

    return new GearInstance({
        id: generateUniqueId(archetype.baseID, crafter),
        name: name? name : (crafter ? crafter + "'s " : "") + materialPrefix + ' ' + archetype.baseName,
        crafter: crafter || "Unknown",
        image: archetype.baseImage,
        description: `A finely crafted ${archetype.baseName}.`,
        cost: archetype.baseCost,
        weight: archetype.baseWeight,
        tier: tier? tier: finalTier,
        gearType: GearType.weapon,
        specificType: archetype.specificType,
        jewelSlots: body.jewelSlots,
        maxJewelGrade: body.maxJewelGrade,
        attackStats,
        material: materialProvided.handle.material.type,
        specialTrait: []
    });
}

