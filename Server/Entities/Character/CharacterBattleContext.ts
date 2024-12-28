import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { AccessoryType, ArmorType, EquipmentType, WeaponSpecificType, WeaponType } from "../../../Common/DTOsEnumsInterfaces/Item/EquipmentTypes";
import { BuffsAndDebuffsEnum } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { TraitEnum } from "../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";


// export class CharacterBattleContext {
//     // Existing properties
//     actorID: string;
//     actorPosition: number;
//     actorEquipment: {
//         mainHand: WeaponType | null,
//         offHand: WeaponType | null,
//         armor: WeaponType | null,
//         accessories: WeaponType | null
//     };
//     targetID: string;
//     targetPosition: number;
//     targetEquipment: {
//         mainHand: WeaponType | null,
//         offHand: WeaponType | null,
//         armor: WeaponType | null,
//         accessories: WeaponType | null
//     };
//     selfPartyID: string;
//     oppositePartyID: string;
//     skillID: string;
//     skillLevel: number;

//     // New properties to store detailed stats, buffs, traits, etc.
//     actorStats: Record<CharacterStatusEnum, number>;  // Map of actor's stats like strength, intelligence, etc.
//     actorBuffs: Record<BuffsAndDebuffsEnum, number>;  // Active buffs on the actor with remaining duration
//     actorTraits: string[];  // List of traits the actor possesses

//     targetStats: Record<CharacterStatusEnum, number>;
//     targetBuffs: Record<string, number>;
//     targetTraits: string[];

//     constructor(
//         actorID: string, 
//         actorPosition: number,
//         actorEquipment: {
//             mainHand: WeaponType | null,
//             offHand: WeaponType | null,
//             armor: WeaponType | null,
//             accessories: WeaponType | null
//         },
//         targetID: string, 
//         targetPosition: number,
//         targetEquipment: {
//             mainHand: WeaponType | null,
//             offHand: WeaponType | null,
//             armor: WeaponType | null,
//             accessories: WeaponType | null
//         },
//         selfPartyID: string, 
//         oppositePartyID: string, 
//         skillID: string, 
//         skillLevel: number,
//         actorStats: Record<CharacterStatusEnum, number>,  // Additional parameter
//         actorBuffs: Record<string, number>,  // Additional parameter
//         actorTraits: string[],  // Additional parameter
//         targetStats: Record<CharacterStatusEnum, number>,  // Additional parameter
//         targetBuffs: Record<string, number>,  // Additional parameter
//         targetTraits: string[]  // Additional parameter
//     ) {
//         // Existing property assignments
//         this.actorID = actorID;
//         this.actorPosition = actorPosition;
//         this.actorEquipment = actorEquipment;
//         this.targetID = targetID;
//         this.targetPosition = targetPosition;
//         this.targetEquipment = targetEquipment;
//         this.selfPartyID = selfPartyID;
//         this.oppositePartyID = oppositePartyID;
//         this.skillID = skillID;
//         this.skillLevel = skillLevel;

//         // New property assignments
//         this.actorStats = actorStats;
//         this.actorBuffs = actorBuffs;
//         this.actorTraits = actorTraits;
//         this.targetStats = targetStats;
//         this.targetBuffs = targetBuffs;
//         this.targetTraits = targetTraits;
//     }

//     // Helper methods to fetch actor and target stats, buffs, and traits
//     getActorStat(stat: CharacterStatusEnum): number {
//         return this.actorStats[stat] || 0;
//     }

//     getTargetStat(stat: CharacterStatusEnum): number {
//         return this.targetStats[stat] || 0;
//     }

//     hasActorTrait(trait: string): boolean {
//         return this.actorTraits.includes(trait);
//     }

//     hasTargetTrait(trait: string): boolean {
//         return this.targetTraits.includes(trait);
//     }

//     getActorBuff(buff: BuffsAndDebuffsEnum): number {
//         return this.actorBuffs[buff] || 0;
//     }

//     getTargetBuff(buff: string): number {
//         return this.targetBuffs[buff] || 0;
//     }
// }


export interface CharacterBattleContext {
    actorID: string;
    actorPosition: number;
    actorEquipment: {
        mainHand: WeaponSpecificType | null,
        offHand: WeaponSpecificType | null,
        cloth: ArmorType.cloth | null,
        armor: ArmorType | null,
        headWear: EquipmentType.headWear | null,
        necklace: AccessoryType.necklace | null,
        ring: AccessoryType.ring | null,
    };
    actorStats: Record<CharacterStatusEnum, number>;
    actorBuffs: Record<BuffsAndDebuffsEnum, number>;
    actorTraits: TraitEnum[]; 
}