//MARK: Cleric Skills
/*
1. Smite
2. Orderic Blast
3. Blessing
4. Holy Water
5. Ball of Light
6. Heal
7. Divine's Fury
8. Divine Shield
9. Divine Intervention
10. Harmony
11. Inspiration
12. Laoh's Blessing
13. Judgement of Laoh
14. Holy Nova
15. Smite Infidel
*/

import {
	ActorSkillEffect,
	TargetSkillEffect,
	TurnReport,
} from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { WeaponSpecificType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
	BuffsAndDebuffsEnum,
	TargetScope,
	TargetSortingOptions,
	TargetTauntConsideration,
	TargetType,
} from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import { selectMultipleTargets, selectOneTarget } from "../../../Game/Battle/TargetSelectionProcess";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { Skill } from "../Skill";
import {
	ElementConsume,
	ElementProduce,
	SkillConsume,
	SkillProduce,
} from "../SubClasses/SkillConsume";
import { SkillLearningRequirement } from "../SubClasses/SkillLearningRequirement";
import {
	calculateCritAndHit,
	noEquipmentNeeded,
	noRequirementNeeded,
} from "../Utils";
import { Character } from "../../Character/Character";
import { Party } from "../../Party/Party";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";
import { noTarget } from "../Utils/noTarget";
import { Dice } from "../../../Utility/Dice";
import { CharacterType } from "../../Character/Enums/CharacterType";
import { StatMod } from "../../../Utility/StatMod";
import { AttributeEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import {
	DamageMultiplierFromBothPositions,
	DamageMultiplierFromPosition,
} from "../../../Utility/DamageMultiplierFromPosition";
import { createCastString } from "../Utils/makeCastString";
import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";

const skill_smite = new Skill(
	{
		id: "skill_smite",
		name: "Smite",
		tier: Tier.common,
		description: `Attack one enemy, dealing 1.2 times weapon's physical damage (+0.1 per level) (+strength, +charisma) if the target is undead, damage is doubled. If the user is in the back row, damage is halved.`,
		requirement: noRequirementNeeded,
		equipmentNeeded: [
			WeaponSpecificType.sword_great,
			WeaponSpecificType.sword_long,
			WeaponSpecificType.sword_short,
			WeaponSpecificType.mace_hammer,
			WeaponSpecificType.mace_morningstar,
			WeaponSpecificType.mace_warhammer,
			WeaponSpecificType.tome_bible,
		],
		castString: "use smite",
		consume: new SkillConsume({
			sp: [5, 5, 5, 5, 5],
			elements: [
				new ElementConsume({
					element: FundamentalElementTypes.none,
					amount: [2, 2, 2, 2, 2],
				}),
			],
		}),
		produce: new SkillProduce({
			elements: [
				new ElementProduce({
					element: FundamentalElementTypes.order,
					amountRange: [
						[0, 1],
						[0, 1],
						[0, 1],
						[0, 1],
						[0, 1],
					],
				}),
			],
		}),
		isSpell: false,
		isAuto: false,
		isWeaponAttack: true,
		isReaction: false,
	},
	skill_smite_exec
);

function skill_smite_exec(
	character: Character,
	allies: Party,
	enemies: Party,
	skillLevel: number,
	context: { time: GameTime; location: LocationName }
): TurnReport {
	const targetType: TargetType = {
		scope: TargetScope.Single,
		taunt: TargetTauntConsideration.TauntCount,
	};
	const target = selectOneTarget(character, enemies, targetType);
	if (target === "NO_TARGET") {
		return noTarget(character, "use smite");
	}

	let weapon = character.getWeapon();
	if (weapon === "none") {
		throw new Error("Exceptional: No weapon found");
	}

	const [crit, hitChance] = calculateCritAndHit(
		character,
		target,
		AttributeEnum.dexterity,
		AttributeEnum.luck
	);

	let damage =
		Dice.roll(weapon.attackStats!.physicalDiceEnum).sum *
			(1.2 + 0.1 * skillLevel) +
		(StatMod.value(character.status.strength()) +
			StatMod.value(character.status.charisma()));

	if (target.type === CharacterType.undead) {
		damage *= 2;
	}
	if (crit) {
		damage *= 2;
	}

	const damageModifierFromPosition = DamageMultiplierFromBothPositions.get({
		preferredActorPosition: "front",
		preferredTargetPosition: "front",
		rightModifier: 1,
		middleGroundModifier: 0.75,
		wrongModifier: 0.5,
		actorPosition: character.position,
		targetPosition: target.position,
	});

	damage *= damageModifierFromPosition;

	let result = target.receiveDamage({
		attacker: character,
		damage: damage,
		hitChance: hitChance,
		damageType: DamageTypes.order,
		locationName: context.location,
	});

	let castString = createCastString({
		actor: character,
		target: target,
		skillName: "smite",
		damage: result.damage,
		dHit: result.dHit,
		crit: crit,
		damageType: DamageTypes.order,
	});

	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_smite",
		actorSkillEffect: ActorSkillEffect.Order_Cast,
		targets: [
			{
				character: turnCharacterIntoInterface(target),
				damageTaken: result.damage,
				effect: TargetSkillEffect.Order_1,
			},
		],
		castString,
	};
}

const skill_aid = new Skill(
	{
		id: "skill_aid",
		name: "Aid",
		tier: Tier.common,
		description: `Heals one ally with least HP. The amount of healing is 1D4 + willpower modifier. Amount of healing is increased by 1D2 for each level of the skill.`,
		requirement: noRequirementNeeded,
		equipmentNeeded: noEquipmentNeeded,
		castString: "cast aid",
		consume: new SkillConsume({
			mp: [3, 3, 3, 3, 5],
			elements: [
				new ElementConsume({
					element: FundamentalElementTypes.water,
					amount: [1, 1, 1, 1, 1],
				}),
			],
		}),
		produce: new SkillProduce({
			elements: [
				new ElementProduce({
					element: FundamentalElementTypes.none,
					amountRange: [
						[0, 1],
						[0, 1],
						[0, 1],
						[0, 1],
						[0, 1],
					],
				}),
			],
		}),
		isSpell: true,
		isAuto: false,
		isWeaponAttack: false,
		isReaction: false,
	},
	skill_aid_exec
);

function skill_aid_exec(
	character: Character,
	allies: Party,
	enemies: Party,
	skillLevel: number,
	context: { time: GameTime; location: LocationName }
): TurnReport {
	const targetType: TargetType = {
		scope: TargetScope.Single,
		sort: TargetSortingOptions.LowestHP,
	};
	const target = selectOneTarget(character, allies, targetType);

	if (target === "NO_TARGET") {
		return noTarget(character, "cast aid");
	}

	let levelingHeal = 0;
	for (let i = 1; i <= skillLevel; i++) {
		levelingHeal += Dice.roll(DiceEnum.OneD2).sum;
	}

	let healing = Math.max(
		+Dice.roll(DiceEnum.OneD4).sum +
			StatMod.value(character.status.willpower()) +
			levelingHeal,
		0
	);

	const crit = Dice.rollTwenty() === 20;
	if (crit) {
		healing = Math.floor((healing *= 1.5));
	}

	const castString = `${character.name} casts Aid on ${target.name}, ${
		crit ? "with critical" : ""
	} healing ${healing} HP.`;

	let result = target.receiveHeal({
		actor: character,
		healing: healing,
	});

	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_aid",
		actorSkillEffect: ActorSkillEffect.Water_Magical,
		targets: [
			{
				character: turnCharacterIntoInterface(target),
				damageTaken: result.heal,
				effect: TargetSkillEffect.heal,
			},
		],
		castString,
	};
}

const skill_orderic_blast = new Skill(
	{
		id: "skill_orderic_blast",
		name: "Orderic Blast",
		tier: Tier.uncommon,
		description: `Blast the enemy with order energy dealing 1.3 times weapon magical damage (+ 0.1 per skill level) (+ charisma).`,
		requirement: noRequirementNeeded,
		equipmentNeeded: [
			WeaponSpecificType.wand_magic,
			WeaponSpecificType.wand_scepter,
			WeaponSpecificType.orb_crystal,
			WeaponSpecificType.orb_metallic,
			WeaponSpecificType.staff_long,
			WeaponSpecificType.staff_magic,
			WeaponSpecificType.staff_quarter,
			WeaponSpecificType.tome_bible,
			WeaponSpecificType.tome_codex,
		],
		castString: "cast orderic blast",
		consume: new SkillConsume({
			mp: [5, 5, 6, 6, 7],
			elements: [
				new ElementConsume({
					element: FundamentalElementTypes.order,
					amount: [1, 1, 1, 1, 1],
				}),
			],
		}),
		produce: new SkillProduce({
			elements: [
				new ElementProduce({
					element: FundamentalElementTypes.fire,
					amountRange: [
						[0, 1],
						[0, 1],
						[1, 1],
						[1, 1],
						[1, 2],
					],
				}),
			],
		}),
		isSpell: true,
		isAuto: false,
		isWeaponAttack: false,
		isReaction: false,
	},
	skill_orderic_blast_exec
);

function skill_orderic_blast_exec(
	character: Character,
	allies: Party,
	enemies: Party,
	skillLevel: number,
	context: { time: GameTime; location: LocationName }
): TurnReport {
	const targetType: TargetType = {
		scope: TargetScope.Single,
		taunt: TargetTauntConsideration.TauntCount,
	};
	const target = selectOneTarget(character, enemies, targetType);
	if (target === "NO_TARGET") {
		return noTarget(character, "cast orderic blast");
	}

	let weapon = character.getWeapon();
	if (weapon === "none") {
		throw new Error("Exceptional: No weapon found");
	}

	const [crit, hitChance] = calculateCritAndHit(
		character,
		target,
		AttributeEnum.intelligence,
		AttributeEnum.luck
	);

	let damage =
		Dice.roll(weapon.attackStats!.magicalDiceEnum).sum *
			(1.3 + 0.1 * skillLevel) +
		StatMod.value(character.status.charisma());

	if (crit) {
		damage *= 2;
	}

	let result = target.receiveDamage({
		attacker: character,
		damage: damage,
		hitChance: hitChance,
		damageType: DamageTypes.order,
		locationName: context.location,
	});

	let castString = `(actor=${character.name}) used orderic blast on (target=${target.name}), `;
	if (crit) {
		castString += `CRITICAL! `;
	}
	if (result.dHit) {
		castString += `dealing (damage=${result.damage}) order damage.`;
	} else {
		castString += `but missed!`;
	}

	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_orderic_blast",
		actorSkillEffect: ActorSkillEffect.Order_Cast,
		targets: [
			{
				character: turnCharacterIntoInterface(target),
				damageTaken: result.damage,
				effect: TargetSkillEffect.Order_2,
			},
		],
		castString,
	};
}

const skill_blessing = new Skill(
	{
		id: "skill_blessing",
		name: "Blessing",
		tier: Tier.common,
		description: `Bless all party members for 1 turn, all blessed party members gain 1d4 to all saving throws. At level 3 and 5 duration increases to 2 and 3 turns respectively.`,
		requirement: noRequirementNeeded,
		equipmentNeeded: noEquipmentNeeded,
		castString: "cast blessing",
		consume: new SkillConsume({
			mp: [7, 6, 5, 4, 3],
			elements: [
				new ElementConsume({
					element: FundamentalElementTypes.order,
					amount: [1, 1, 2, 2, 2],
				}),
			],
		}),
		produce: new SkillProduce({
			elements: [
				new ElementProduce({
					element: FundamentalElementTypes.water,
					amountRange: [
						[0, 1],
						[0, 1],
						[1, 1],
						[1, 1],
						[1, 2],
					],
				}),
			],
		}),
		isSpell: true,
		isAuto: false,
		isWeaponAttack: false,
		isReaction: false,
	},
	skill_blessing_exec
);

function skill_blessing_exec(
	character: Character,
	allies: Party,
	enemies: Party,
	skillLevel: number,
	context: { time: GameTime; location: LocationName }
): TurnReport {
	let castString = `${character.name} casts Blessing on all allies.`;

	let duration = 1;
	if (skillLevel >= 3) duration += 1;
	if (skillLevel === 5) duration += 1;

	let targets = [];
	for (const target of allies.characters) {
		if (target && target !== "none") {
			const buffResult = target.receiveBuff(
				BuffsAndDebuffsEnum.bless,
				duration
			);

			if (buffResult.result) {
				targets.push({
					character: turnCharacterIntoInterface(target),
					damageTaken: 0,
					effect: TargetSkillEffect.bless,
				});
			} 

			castString += buffResult.message;
		}
	}

	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_blessing",
		actorSkillEffect: ActorSkillEffect.Order_Cast,
		targets,
		castString,
	};
}

const skill_holy_water = new Skill(
	{
		id: "skill_holy_water",
		name: "Holy Water",
		tier: Tier.uncommon,
		description: `Deals 1d3 damage to all enemies (+ Charisma Modifier) and target must roll DC10 willpower save or get Awed for 2 turns. Awed target saving throws are -2. Each level deal additional 1 damage.`,
		requirement: new SkillLearningRequirement({
			preRequireSkillID: [],
			preRequireElements: [
				{ element: FundamentalElementTypes.order, value: 1 },
			],
			preRequireCharacterLevel: 3,
			preRequireCharacterTrait: [],
		}),
		equipmentNeeded: noEquipmentNeeded,
		castString: "cast holy water",
		consume: new SkillConsume({
			mp: [5, 5, 5, 5, 5],
			elements: [
				new ElementConsume({
					element: FundamentalElementTypes.water,
					amount: [2, 2, 2, 2, 2],
				}),
			],
		}),
		produce: new SkillProduce({
			elements: [
				new ElementProduce({
					element: FundamentalElementTypes.order,
					amountRange: [
						[1, 2],
						[1, 2],
						[1, 2],
						[1, 2],
						[1, 2],
					],
				}),
				new ElementProduce({
					element: FundamentalElementTypes.geo,
					amountRange: [
						[0, 1],
						[0, 1],
						[0, 1],
						[0, 1],
						[0, 1],
					],
				}),
			],
		}),
		isSpell: true,
		isAuto: false,
		isWeaponAttack: false,
		isReaction: false,
	},
	skill_holy_water_exec
);

function skill_holy_water_exec(
	character: Character,
	allies: Party,
	enemies: Party,
	skillLevel: number,
	context: { time: GameTime; location: LocationName }
): TurnReport {
	const targetType: TargetType = {
		scope: TargetScope.All,
		taunt: TargetTauntConsideration.TauntCount,
	};
	const avaliableTargets = selectMultipleTargets(character, enemies, targetType);
	if (avaliableTargets.length === 0) {
		return noTarget(character, "cast holy water");
	}

	let castString = `${character.name} casts Holy Water, attacking all enemies.`;
	
	let targets = [];

	let damage =
			Dice.roll(DiceEnum.OneD3).sum +
			StatMod.value(character.status.charisma()) +
			skillLevel;
	
	for (const target of avaliableTargets) {
		//Can't crit
		const [_, hitChance] = calculateCritAndHit(
			character,
			target,
			AttributeEnum.intelligence,
			AttributeEnum.luck
		);

		let result = target.receiveDamage({
			attacker: character,
			damage: damage,
			hitChance: hitChance,
			damageType: DamageTypes.order,
			locationName: context.location,
		});
	
		castString += `\n${target.name} ${result.dHit ? `takes ${result.damage} order damage.` : `avoided the attack.`}`
		
		if (result.dHit) {
			const [diceRoll, baseModifier, buffModifier] = target.saveRoll(CharacterStatusEnum.willpower)
			if (diceRoll + baseModifier + buffModifier < 10) {
				const debuffResult = target.receiveDebuff(
					BuffsAndDebuffsEnum.awed,
					2
				);
				castString += debuffResult.message;
			}
		}

		targets.push({
			character: turnCharacterIntoInterface(target),
			damageTaken: result.damage,
			effect: TargetSkillEffect.Order_1,
		})
	}

	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_holy_water",
		actorSkillEffect: ActorSkillEffect.Holy_Cast,
		targets,
		castString,
	};
}

// const skill_cleric_05 = new Skill(
//     `skill_cleric_05`,
//     `Ball of Light`,
//     `Shoot a Ball of Light at the target, dealing 1d8 order damage at an enemy. If the target is in awed state, player may roll for 10DC if the roll is higher will attack again.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ],
//         preRequireCharacterLevel: 3,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');

//             const castMessage = `(actor=${actor.name}) cast (skill=ball of light) at (target=${target.name}).`;
//             const sequenceMessage = [];

//             let message = `(actor=${actor.name}) attack (target=${target.name}), `;
//             const firstAttack = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '1d8',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.order,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage()
//             });
//             firstAttack.dHit ? message += `dealing (damage=${firstAttack.damage}) order damage.` : message += `but Missed!`;

//             let secondAttackResult = null;
//             if (firstAttack.dHit && target.buffsAndDebuffs.awed > 0) {
//                 const roll = Dice.roll('1d20').sum + level;
//                 if (roll > 10) {
//                     message += ` since (target=${target.name}) is in Awed state, (actor=${actor.name}) attacks again, `;
//                     secondAttackResult = actor.attack({
//                         actor: actor,
//                         target: target,
//                         damageDice: '1d8',
//                         hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                         damageType: DamageTypes.order,
//                         damageMultiplier: 1,
//                         damageStatModifier: [new CharacterStatusModifier('charisma')]
//                     });
//                     secondAttackResult.dHit ? message += `dealing (damage=${secondAttackResult.damage}) order damage.` : message += `but Missed!`;
//                 }
//             }
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 [target],
//                 [],
//                 [ActorSkillEffect.Order_Cast],
//                 [TargetSkillEffect.Order_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [5,5,5,5,5],
//         sp: [0,0,0,0,0],
//         elements: [
//             new ElementConsume({
//                 element: 'order',
//                 amount: [1,1,1,1,1]
//             }),
//             new ElementConsume({
//                 element: 'fire',
//                 amount: [1,1,1,1,1]
//             })
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'none',
//             amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]
//         })]
//     }),
//     Tier.uncommon
// )

// const skill_cleric_07 = new Skill(
//     `skill_cleric_07`,
//     `Divine's Fury`,
//     `Deals 2d6 order damage to all enemies and has a 50% chance to inflict Awed for 2 turns.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ],
//         preRequireCharacterLevel: 7,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();

//             const castMessage = `(actor=${actor.name}) cast (skill=Divine's Fury) on all enemies.`;
//             const sequenceMessage = [];
//             const targets = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with Divine's Fury, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '2d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.order,
//                     damageMultiplier: 1 + (level/20),
//                     damageStatModifier: [new CharacterStatusModifier('charisma')],
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage()
//                 });

//                 if (attackResult.dHit) {targets.push(target)}

//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) order damage.` : message += `but Missed!`;

//                 const effectHit = Math.random() < 0.5;
//                 if (effectHit) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.awed,
//                         effectDuration: 2,
//                         effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit()
//                     });
//                     message += ` and inflicting Awed.`;
//                 }

//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Order_Cast],
//                 [TargetSkillEffect.Order_3, TargetSkillEffect.awed],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [7,7,7,7,10,10,10],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({
//                 element: 'order',
//                 amount: [2,2,2,2,2,2,2]
//             }),
//             new ElementConsume({
//                 element: 'fire',
//                 amount: [2,2,2,2,2,2,2]
//             })
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'geo',
//             amountRange: [[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]
//         })]
//     }),
//     Tier.rare
// )

// const skill_cleric_08 = new Skill(
//     `skill_cleric_08`,
//     `Divine Shield`,
//     `Create a Divine Shield for 3 turns, all damage taken will be reduced by 2 plus charisma modifier.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ],
//         preRequireCharacterLevel: 5,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {

//             const castMessage = `(actor=${actor.name}) cast (skill=Divine Shield).`;
//             const sequenceMessage = [];
//             const targetsDetails = [];

//             actor.inflictEffect({
//                 actor: actor,
//                 target: actor,
//                 inflictEffect: K.buffsAndDebuffs.divineShield,
//                 effectDuration: 3
//             });

//             sequenceMessage.push(`(actor=${actor.name}) got (skill=Divine Shield) for 3 turns.`);

//             return new ActionDetails(
//                 actor,
//                 [],
//                 [actor],
//                 [ActorSkillEffect.Order_Cast],
//                 [],
//                 [TargetSkillEffect.divineShield],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [4,3,3,3,2,2,2],
//         sp: [4,4,3,3,2,2,2],
//         elements: [
//             new ElementConsume({element: 'order', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume({element: 'geo', amount: [1,1,1,1,1,1,1]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({
//                 element: 'water',
//                 amountRange: [[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]
//             }),
//             new ElementProduce({
//                 element: 'order',
//                 amountRange: [[0,0],[0,0],[0,1],[0,1],[1,1],[1,1],[1,0]]
//             })
//         ]
//     }),
//     Tier.rare
// )

// const skill_cleric_09 = new Skill(
//     `skill_cleric_09`,
//     `Divine Intervention`,
//     `Revive a dead party member with 50% chance and heal for 20% hp.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 5 }
//         ],
//         preRequireCharacterLevel: 0,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),

// new SkillActiveEffect(
//     (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//         const target = selfParty.getOneDeadTarget(actor);
//         if (!target) {
//             console.log('No dead character in party.');
//             return new ActionDetails(actor, [], [], [], [], [], 'No dead character in party.');
//         }

//         const castMessage = `(actor=${actor.name}) cast (skill=Divine Intervention) on (target=${target.name}).`;
//         const sequenceMessage = [];

//         const penalty = actor.getArmorPentaltyForSpellCastingDamage();
//         const reviveChance = 4 + actor.getModifier('attributes', 'willpower') - penalty + (level-1);
//         const diceRoll = Dice.roll('1d20').sum;

//         let message;
//         let success = false;

//         if (diceRoll + reviveChance >= 15) {
//             target.isDead = false;
//             target.currentHP = Math.floor(target.maxHP() * (0.2 + (level/10))) - penalty;
//             message = `(actor=${actor.name}) cast (skill=Divine Intervention) to revive (target=${target.name}), restoring them to (heal=${target.currentHP}) HP.`;
//             success = true;
//             sequenceMessage.push(message);
//         } else {
//             message = `(actor=${actor.name}) cast (skill=Divine Intervention) on (target=${target.name}) but fails.`;
//             sequenceMessage.push(message);
//         }

//         return new ActionDetails(
//             actor,
//             [],
//             [target],
//             [ActorSkillEffect.Order_Cast],
//             [],
//             [TargetSkillEffect.heal],
//             castMessage,
//             sequenceMessage
//         );
//     }
// ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [0,0,0,0,0,0,0],
//         sp: [3,3,3,3,3,3,3],
//         elements: [
//             new ElementConsume({ element: 'order', amount: [3,3,3,3,3,3,3]}),
//             new ElementConsume({ element: 'air', amount: [2,2,2,2,2,2,2]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'geo', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]}),
//             new ElementProduce({ element: 'water', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]})
//         ]
//     })
//     ,
//     Tier.rare
// )

// const skill_cleric_10 = new Skill(
//     `skill_cleric_10`,
//     `Harmony`,
//     `Deals damge to enemy twice once with order and once with chaos, each attack deals 1d6 damage. If target is in awed status, the first attack will deal 2d6 damage. If target is in cursed status, the second attack will deal 2d6 damage.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ],
//         preRequireCharacterLevel: 8,
//         preRequireCharacterTrait: [TraitRepository.trait_enlightened]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');

//             const castMessage = `(actor=${actor.name}) cast (skill=Harmony) on (target=${target.name}).`;
//             const sequenceMessage = [];

//             let message = `(actor=${actor.name}) attack (target=${target.name}) with Harmony, `;
//             const firstAttack = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: target.buffsAndDebuffs.awed > 0 ? '2d6' : '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.order,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalDamage: level
//             });
//             firstAttack.dHit ? message += `dealing (damage=${firstAttack.damage}) order damage.` : message += `but Missed!`;

//             message += `(actor=${actor.name}) attack (target=${target.name}) again with Harmony, `;
//             const secondAttack = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: target.buffsAndDebuffs.cursed > 0 ? '2d6' : '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.chaos,
//                 damageMultiplier: 1,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                 additionalDamage: level
//             });
//             secondAttack.dHit ? message += `dealing (damage=${secondAttack.damage}) chaos damage.` : firstAttack.dHit? `but Missed!` : message += `and Also Missed!`;
//             sequenceMessage.push(message);

//             return new ActionDetails(
//                 actor,
//                 [target],
//                 [],
//                 [ActorSkillEffect.Order_Cast, ActorSkillEffect.Chaos_Cast],
//                 [TargetSkillEffect.Order_1, TargetSkillEffect.Chaos_1],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0],
//         mp: [5,5,7,7,8,9,10],
//         sp: [0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'order', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume({ element: 'chaos', amount: [2,2,2,2,2,2,2]}),
//             new ElementConsume({ element: 'none', amount: [1,1,1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'order', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]}),
//             new ElementProduce({ element: 'chaos', amountRange: [[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1]]})
//         ]
//     }),
//     Tier.epic
// )

// const skill_cleric_11 = new Skill(
//     `skill_cleric_11`,
//     `inspiration`,
//     `Give an inspriing speech to all party members, all party members get
//     +2 bonus for all saving roll for 1 turn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [],
//         preRequireCharacterLevel: 3,
//         preRequireCharacterTrait: []
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level:number): ActionDetails => {
//             const targets = [];
//             const castMessage = `(actor=${actor.name}) give an (skill=inspiration) speech to all party members.`;
//             const sequenceMessage = [];

//             let effectDurationFromLevel = 1;
//             if (level < 3) {effectDurationFromLevel = 1}
//             if (level < 5) {effectDurationFromLevel = 2}
//             if (level === 5) {effectDurationFromLevel = 3}

//             for (const target of selfParty.characters) {
//                 if (target) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.inspiration,
//                         effectDuration: effectDurationFromLevel
//                     });
//                     targets.push(target);
//                     sequenceMessage.push(`(target=${target.name}) is feeling (skill=inspiring) and got inspired for ${effectDurationFromLevel} turns.`);
//                 }
//             }

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Order_Cast],
//                 [],
//                 [TargetSkillEffect.inspiration],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0],
//         mp: [5,5,4,3,0],
//         sp: [3,3,3,3,3],
//         elements: [
//             new ElementConsume({ element: 'none', amount: [1,1,1,1,1] })
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'order', amountRange: [[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]}),
//         ]
//     }),
//     Tier.uncommon
// )

// const skill_cleric_12 = new Skill(
//     'skill_cleric_12',
//     `Laoh's Blessing`,
//     `Heal all party members for 1d6 plus charisma modifier, and have a d6 chance to grant them bless status for 2 turn.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 10}
//         ],
//         preRequireCharacterLevel: 10,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const targets = [];
//             const castMessage = `(actor=${actor.name}) is asking for (skill=Laoh's Blessing) on all party members.`;
//             const sequenceMessage = [];

//             for (const target of selfParty.characters) {
//                 if (target) {
//                     const healAmount = actor.heal({
//                         target: target,
//                         healingDice: '1d6',
//                         healingStatModifier: [new CharacterStatusModifier('charisma')],
//                         penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                         additionalHealing: (level*2)
//                     });
//                     targets.push(target);
//                     let message = `(actor=${actor.name}) cast (skill=Laoh's Blessing) on (target=${target.name}), healing for (heal=${healAmount}) HP.`;

//                     const effectHit = Math.random() < 1 / 6;
//                     if (effectHit) {
//                         actor.inflictEffect({
//                             actor: actor,
//                             target: target,
//                             inflictEffect: K.buffsAndDebuffs.bless,
//                             effectDuration: 2
//                         });
//                         message += ` and granting them Bless status.`;
//                     }

//                     sequenceMessage.push(message);
//                 }
//             }

//             return new ActionDetails(
//                 actor,
//                 [],
//                 targets,
//                 [ActorSkillEffect.Order_Cast],
//                 [],
//                 [TargetSkillEffect.bless],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [10,10,9,9,8,8,7,7,6,6],
//         sp: [0,0,0,0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'order', amount: [4,4,4,4,4,4,4,4,4,4]}),
//         ]
//     }),
//     new SkillProduce({
//         elements: [
//             new ElementProduce({ element: 'chaos', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]}),
//             new ElementProduce({ element: 'geo', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]}),
//             new ElementProduce({ element: 'water', amountRange: [[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]})
//         ]
//     }),
//     Tier.legendary
// )

// const skill_cleric_13 = new Skill(
//     `skill_cleric_13`,
//     `Judgement of Laoh`,
//     `Deals 3d6 order damage to all enemies, and have a 50% chance to inflict awed for 2 turns.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ],
//         preRequireCharacterLevel: 10,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const targets = [];
//             const castMessage = `(actor=${actor.name}) chant for (skill=Judgement of Laoh) on all enemies.`;
//             const sequenceMessage = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with Judgement of Laoh, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '3d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.order,
//                     damageMultiplier: 1,
//                     damageStatModifier: [new CharacterStatusModifier('charisma')],
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: level*2
//                 });
//                 attackResult.dHit ? targets.push(target) : null;
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) order damage.` : message += `but Missed!`;

//                 const effectHit = Math.random() < 0.5;
//                 if (effectHit) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.awed,
//                         effectDuration: 2,
//                         effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit() + level/2
//                     });
//                     message += ` and inflicting Awed.`;
//                 }

//                 sequenceMessage.push(message);
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 [],
//                 [ActorSkillEffect.Order_Cast],
//                 [TargetSkillEffect.Order_3, TargetSkillEffect.awed],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [15,15,15,15,15,10,10,10,10,10],
//         sp: [0,0,0,0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'order', amount: [3,3,3,3,3,3,3,3,3,3]}),
//             new ElementConsume({ element: 'fire', amount: [2,2,2,2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'chaos',
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.legendary
// )

// //Holy nova
// const skill_cleric_14 = new Skill(
//     `skill_cleric_14`,
//     `Holy Nova`,
//     `Deals 2d6 order damage to all enemies and heals all party members for 2d6 plus charisma modifier.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 1}
//         ],
//         preRequireCharacterLevel: 10,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: [],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const possibleTargets = oppositeParty.getAllPossibleTargets();
//             const targets: Character[] = [];
//             const positiveTargets: Character[] = [];
//             const castMessage = `(actor=${actor.name}) cast (skill=Holy Nova) on all enemies.`;
//             const sequenceMessage = [];

//             for (const target of possibleTargets) {
//                 let message = `(actor=${actor.name}) attack (target=${target.name}) with Holy Nova, `;
//                 const attackResult = actor.attack({
//                     actor: actor,
//                     target: target,
//                     damageDice: '2d6',
//                     hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                     damageType: DamageTypes.order,
//                     damageMultiplier: 1,
//                     damageStatModifier: [new CharacterStatusModifier('charisma')],
//                     penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                     additionalDamage: level/2
//                 });
//                 attackResult.dHit ? targets.push(target) : null;
//                 attackResult.dHit ? message += `dealing (damage=${attackResult.damage}) order damage.` : message += `but Missed!`;

//                 const effectHit = Math.random() < 1 / 6;
//                 if (effectHit) {
//                     actor.inflictEffect({
//                         actor: actor,
//                         target: target,
//                         inflictEffect: K.buffsAndDebuffs.awed,
//                         effectDuration: 2,
//                         effectDC: 10 + actor.getArmorPenaltyForSpellCastingHit()
//                     });
//                     message += ` and inflicting Awed.`;
//                 }

//                 sequenceMessage.push(message);
//             }

//             for (const target of selfParty.characters) {
//                 if (target) {
//                     if (target.isDead) {continue}
//                     let healAmount = actor.heal({
//                         target: target,
//                         healingDice: '2d6',
//                         healingStatModifier: [new CharacterStatusModifier('charisma')],
//                         penalty: actor.getArmorPentaltyForSpellCastingDamage(),
//                         additionalHealing: level/2
//                     });
//                     positiveTargets.push(target);
//                     sequenceMessage.push(`(actor=${actor.name}) heal (target=${target.name}) for (heal=${healAmount}) HP.`)
//                 }
//             }

//             return new ActionDetails(
//                 actor,
//                 targets,
//                 positiveTargets,
//                 [ActorSkillEffect.Holy_Cast],
//                 [TargetSkillEffect.Holy_2, TargetSkillEffect.awed],
//                 [TargetSkillEffect.heal],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [10,10,12,12,14,14,16,16,18,18],
//         sp: [0,0,0,0,0,0,0,0,0,0],
//         elements: [
//             new ElementConsume({ element: 'order', amount: [4,4,4,4,4,4,4,4,4,4]}),
//             new ElementConsume({ element: 'fire', amount: [2,2,2,2,2,2,2,2,2,2]})
//         ]
//     }),
//     new SkillProduce({
//         elements: [new ElementProduce({
//             element: 'chaos',
//             amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//         })]
//     }),
//     Tier.legendary
// )

// const skill_cleric_15 = new Skill(
//     'skill_cleric_15',
//     `Smite Infidel`,
//     `Deals 1.2 weapon damage as order damage to one enemy plus charisma modifier. If target's order element is less than half of the caster's order element, the damage will be doubled. If the user is in the back row damage will redeuce by 50%.`,
//     new SkillLearningRequirement({
//         preRequireSkillID: [],
//         preRequireElements: [
//             { element: 'order', value: 5 }
//         ],
//         preRequireCharacterLevel: 10,
//         preRequireCharacterTrait: [TraitRepository.trait_faithful]
//     }),
//     new SkillEquipmentRequirement({
//         weapon: ['axe', 'blade', 'mace', 'sword', 'tome'],
//         armor: [],
//         accessory: []
//     }),
//     new SkillActiveEffect(
//         (actor: Character, selfParty: Party, oppositeParty: Party, level: number): ActionDetails => {
//             const target = oppositeParty.getOnePreferredFrontRowTauntCount(actor);
//             if (!target) throw new Error('Exceptional: No target found.');
//             const castMessage = `(actor=${actor.name}) use (skill=smite) on (target=${target.name}).`;
//             const sequenceMessage = [];

//             let damageMultiplier = 1.2 + (level / 10);

//             if (target.element('order') < actor.element('order') / 2) {
//                 damageMultiplier = 2 + (level / 10);
//             }

//             if (actor.position > 2) {
//                 damageMultiplier = (damageMultiplier + (level/10)) / 2
//             }

//             const attackResult = actor.attack({
//                 actor: actor,
//                 target: target,
//                 damageDice: '1d6',
//                 hitBonus: actor.getArmorPenaltyForSpellCastingHit(),
//                 damageType: DamageTypes.order,
//                 damageMultiplier: damageMultiplier,
//                 damageStatModifier: [new CharacterStatusModifier('charisma')],
//                 penalty: actor.getArmorPentaltyForSpellCastingDamage()
//             });

//             attackResult.dHit ? sequenceMessage.push(`(actor=${actor.name}) attack (target=${target.name}) with the power of order, dealing (damage=${attackResult.damage}) order damage.`) : sequenceMessage.push(`(actor=${actor.name}) attack (target=${target.name}) with the power of order, but Missed!`);

//             return new ActionDetails(
//                 actor,
//                 [target],
//                 [],
//                 [ActorSkillEffect.Holy_Cast],
//                 [TargetSkillEffect.Holy_2],
//                 [],
//                 castMessage,
//                 sequenceMessage
//             );
//         }
//     ),
//     new SkillConsume({
//         hp: [0,0,0,0,0,0,0,0,0,0],
//         mp: [3,3,3,3,3,3,3,3,3,3],
//         sp: [3,3,3,3,3,3,3,3,3,3],
//         elements: [
//             new ElementConsume({ element: 'order', amount: [3,3,3,3,3,3,3,3,3,3]}),
//         ]
//     }),
//     new SkillProduce({

//         elements: [
//             new ElementProduce({
//                 element: 'fire',
//                 amountRange: [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]
//             })
//         ]
//     }),
//     Tier.unique
// )
