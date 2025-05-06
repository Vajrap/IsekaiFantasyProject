// import { CharacterType } from "../Enums/CharacterType";
// import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
// import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
// import { Enemy } from "./Enemy";
// import { EnemyArchetype } from "./Enemy";


// export class SkeletonEnemyArchetype {
//     name: MobCharacterEnum = MobCharacterEnum.skeleton_archer;
//     type: CharacterType = CharacterType.undead;
//     description: string = "A reanimated skeleton, hostile and mindless.";
//     portrait: string = "skeleton_portrait.png";
//     race: RaceEnum = RaceEnum.UNDEAD;

//     create(): Enemy {
//         return new Enemy(
//             this.name,
//             "NONE",
//             this.description,
//             this.portrait,
//             0,
//             0,
//             []
//         );
//     }
// }

// const skeletonArcher = new SkeletonEnemyArchetype();

// export class SkeletonEnemyFighter {
//     name: MobCharacterEnum = MobCharacterEnum.skeleton_fighter;
//     type: CharacterType = CharacterType.undead;
//     description: string = "A reanimated skeleton, hostile and mindless.";
//     portrait: string = "skeleton_portrait.png";
//     race: RaceEnum = RaceEnum.UNDEAD;

//     create(): Enemy {
//         return new Enemy(
//             this.name,
//             "NONE",
//             this.description,
//             this.portrait,
//             0,
//             0,
//             []
//         )
//     }
// }

// const skeletonFighter = new SkeletonEnemyFighter();

// export const skeletonEnemyRepository = [
//     skeletonArcher,
//     skeletonFighter,
// ]

// // ZOMBIE - Basic undead enemy
// export const ZombieArchetype = new EnemyArchetype({
//     name: "Zombie",
//     gender: "none",
//     type: CharacterType.undead,
//     level: 2,
//     race: Race.undead,
//     alignment: Alignment.chaotic,
//     HPrange: {
//         min: 12,
//         max: 15
//     },
//     MPrange: {
//         min: 0,
//         max: 0 
//     },
//     SPrange: {
//         min: 5,
//         max: 8
//     },
//     attributeRange: {
//         strength: {
//             min: 12,
//             max: 14
//         },
//         dexterity: {
//             min: 6,
//             max: 8
//         },
//         constitution: {
//             min: 13,
//             max: 15
//         },
//         intelligence: {
//             min: 3,
//             max: 4
//         },
//         wisdom: {
//             min: 5,
//             max: 6
//         },
//         charisma: {
//             min: 3,
//             max: 4
//         }
//     },
//     proficiencyRange: {},
//     battlerRange: {
//         initiative: {
//             min: 0,
//             max: 1
//         },
//         pATK: {
//             min: 2,
//             max: 3
//         },
//         mATK: {
//             min: 0,
//             max: 0
//         },
//         pDEF: {
//             min: 1,
//             max: 2
//         },
//         mDEF: {
//             min: 0,
//             max: 0
//         },
//         dodge: {
//             min: 0,
//             max: 1
//         },
//         hit: {
//             min: 2,
//             max: 3
//         }
//     },
//     elementRange: {},
//     artisanRange: {},
//     traits: [
//         CharacterTrait.undead_trait,
//         CharacterTrait.slow_trait,
//         CharacterTrait.brainless
//     ],
//     activeSkills: [
//         { id: "skill_bite", level: 1 }
//     ],
//     equipments: [],
//     baseACRange: {
//         min: 8,
//         max: 10
//     },
//     arcaneAptitudeRange: {
//         min: 0,
//         max: 0
//     },
//     givenExp: 20,
//     givenGold: 5,
//     dropList: [
//         { id: "rotting_flesh", probability: 0.8, minAmount: 1, maxAmount: 2 },
//         { id: "tattered_clothing", probability: 0.5, minAmount: 1, maxAmount: 1 }
//     ]
// });

// // SKELETON - Weak but common undead
// export const SkeletonArchetype = new EnemyArchetype({
//     name: "Skeleton",
//     gender: "none",
//     type: CharacterType.undead,
//     level: 3,
//     race: Race.undead,
//     alignment: Alignment.chaotic,
//     HPrange: {
//         min: 10,
//         max: 12
//     },
//     MPrange: {
//         min: 0,
//         max: 0
//     },
//     SPrange: {
//         min: 8,
//         max: 10
//     },
//     attributeRange: {
//         strength: {
//             min: 10,
//             max: 12
//         },
//         dexterity: {
//             min: 12,
//             max: 14
//         },
//         constitution: {
//             min: 10,
//             max: 12
//         },
//         intelligence: {
//             min: 6,
//             max: 8
//         },
//         wisdom: {
//             min: 8,
//             max: 10
//         },
//         charisma: {
//             min: 5,
//             max: 6
//         }
//     },
//     proficiencyRange: {},
//     battlerRange: {
//         initiative: {
//             min: 2,
//             max: 3
//         },
//         pATK: {
//             min: 3,
//             max: 4
//         },
//         mATK: {
//             min: 0,
//             max: 0
//         },
//         pDEF: {
//             min: 2,
//             max: 3
//         },
//         mDEF: {
//             min: 0,
//             max: 1
//         },
//         dodge: {
//             min: 3,
//             max: 4
//         },
//         hit: {
//             min: 3,
//             max: 4
//         }
//     },
//     elementRange: {},
//     artisanRange: {},
//     traits: [
//         CharacterTrait.undead_trait,
//         CharacterTrait.piercing_resistance
//     ],
//     activeSkills: [
//         { id: "skill_claw_swipe", level: 1 }
//     ],
//     equipments: [],
//     baseACRange: {
//         min: 10,
//         max: 12
//     },
//     arcaneAptitudeRange: {
//         min: 0,
//         max: 0
//     },
//     givenExp: 30,
//     givenGold: 10,
//     dropList: [
//         { id: "bone_fragment", probability: 0.8, minAmount: 2, maxAmount: 4 },
//         { id: "skull", probability: 0.3, minAmount: 1, maxAmount: 1 }
//     ]
// });

// // WRAITH - Powerful incorporeal undead
// export const WraithArchetype = new EnemyArchetype({
//     name: "Wraith",
//     gender: "none",
//     type: CharacterType.undead,
//     level: 6,
//     race: Race.undead,
//     alignment: Alignment.chaotic,
//     HPrange: {
//         min: 18,
//         max: 22
//     },
//     MPrange: {
//         min: 15,
//         max: 20
//     },
//     SPrange: {
//         min: 10,
//         max: 12
//     },
//     attributeRange: {
//         strength: {
//             min: 8,
//             max: 10
//         },
//         dexterity: {
//             min: 14,
//             max: 16
//         },
//         constitution: {
//             min: 12,
//             max: 14
//         },
//         intelligence: {
//             min: 13,
//             max: 15
//         },
//         wisdom: {
//             min: 14,
//             max: 16
//         },
//         charisma: {
//             min: 15,
//             max: 17
//         }
//     },
//     proficiencyRange: {},
//     battlerRange: {
//         initiative: {
//             min: 4,
//             max: 5
//         },
//         pATK: {
//             min: 3,
//             max: 4
//         },
//         mATK: {
//             min: 4,
//             max: 5
//         },
//         pDEF: {
//             min: 3,
//             max: 4
//         },
//         mDEF: {
//             min: 4,
//             max: 5
//         },
//         dodge: {
//             min: 5,
//             max: 6
//         },
//         hit: {
//             min: 5,
//             max: 6
//         }
//     },
//     elementRange: {},
//     artisanRange: {},
//     traits: [
//         CharacterTrait.undead_trait,
//         CharacterTrait.incorporeal,
//         CharacterTrait.dark_vision
//     ],
//     activeSkills: [
//         { id: "skill_claw_swipe", level: 2 }
//     ],
//     equipments: [],
//     baseACRange: {
//         min: 14,
//         max: 16
//     },
//     arcaneAptitudeRange: {
//         min: 3,
//         max: 4
//     },
//     givenExp: 120,
//     givenGold: 50,
//     dropList: [
//         { id: "spectral_essence", probability: 0.6, minAmount: 1, maxAmount: 2 },
//         { id: "ectoplasm", probability: 0.4, minAmount: 1, maxAmount: 2 },
//         { id: "wraith_shroud", probability: 0.1, minAmount: 1, maxAmount: 1 }
//     ]
// });

// // LICH - Powerful undead spellcaster
// export const LichArchetype = new EnemyArchetype({
//     name: "Lich",
//     gender: "male",
//     type: CharacterType.undead,
//     level: 10,
//     race: Race.undead,
//     alignment: Alignment.lawful,
//     HPrange: {
//         min: 25,
//         max: 30
//     },
//     MPrange: {
//         min: 40,
//         max: 50
//     },
//     SPrange: {
//         min: 15,
//         max: 20
//     },
//     attributeRange: {
//         strength: {
//             min: 10,
//             max: 12
//         },
//         dexterity: {
//             min: 12,
//             max: 14
//         },
//         constitution: {
//             min: 16,
//             max: 18
//         },
//         intelligence: {
//             min: 20,
//             max: 22
//         },
//         wisdom: {
//             min: 18,
//             max: 20
//         },
//         charisma: {
//             min: 16,
//             max: 18
//         }
//     },
//     proficiencyRange: {},
//     battlerRange: {
//         initiative: {
//             min: 5,
//             max: 6
//         },
//         pATK: {
//             min: 3,
//             max: 4
//         },
//         mATK: {
//             min: 8,
//             max: 10
//         },
//         pDEF: {
//             min: 4,
//             max: 5
//         },
//         mDEF: {
//             min: 8,
//             max: 10
//         },
//         dodge: {
//             min: 4,
//             max: 5
//         },
//         hit: {
//             min: 7,
//             max: 8
//         }
//     },
//     elementRange: {},
//     artisanRange: {},
//     traits: [
//         CharacterTrait.undead_trait,
//         CharacterTrait.magic_resistance,
//         CharacterTrait.dark_vision,
//         CharacterTrait.immortal_trait
//     ],
//     activeSkills: [
//         // Would need more complex magical skills defined
//         { id: "skill_claw_swipe", level: 3 }
//     ],
//     equipments: [],
//     baseACRange: {
//         min: 16,
//         max: 18
//     },
//     arcaneAptitudeRange: {
//         min: 8,
//         max: 10
//     },
//     givenExp: 500,
//     givenGold: 200,
//     dropList: [
//         { id: "gold_coins", probability: 1.0, minAmount: 50, maxAmount: 100 },
//         { id: "lich_dust", probability: 0.8, minAmount: 1, maxAmount: 3 },
//         { id: "phylactery", probability: 0.05, minAmount: 1, maxAmount: 1 },
//         { id: "ancient_grimoire", probability: 0.2, minAmount: 1, maxAmount: 1 }
//     ]
// });

// // Create instances for the repository
// export const zombie = ZombieArchetype.createEnemy();
// export const skeleton = SkeletonArchetype.createEnemy();
// export const wraith = WraithArchetype.createEnemy();
// export const lich = LichArchetype.createEnemy();

// // Export the undead enemies repository
// export const undeadEnemyRepository = [
//     zombie,
//     skeleton,
//     wraith,
//     lich
// ];
