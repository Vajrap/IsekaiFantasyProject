import { Skill, TurnReport } from "../Skill";
import {
	ElementConsume,
	SkillConsume,
	SkillProduce,
} from "../SubClasses/SkillConsume";
import { ElementProduce } from "../SubClasses/SkillConsume";
import {
	TargetScope,
	TargetTauntConsideration,
	TargetType,
} from "../../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
import { Character } from "../../Character/Character";
import { GameTime } from "../../../Game/TimeAndDate/GameTime";
import { StatMod } from "../../../Utility/StatMod";
import { AttributeEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/AttributeEnum";
import { Dice } from "../../../Utility/Dice";
import { selectOneEnemy } from "../../../Game/Battle/TargetSelectionProcess";
import { Party } from "../../Party/Party";
import { ActorSkillEffect } from "../../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier";
import {
	applyOnHitEffects,
	buildCastString,
	buildNoTargetReport,
	calculateCritAndHit,
	DamageSourceType,
	extractWeaponStats,
	noEquipmentNeeded,
	noRequirementNeeded,
} from "../Utils";
import { LocationName } from "../../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { turnCharacterIntoInterface } from "../../Character/Utils/turnCharacterIntoInterface";

const skill_auto_physical = new Skill(
	{
		id: "skill_auto_physical",
		name: "Normal Physical Attack",
		tier: Tier.common,
		description: `Attack with weapon's physical damage.`,
		requirement: noRequirementNeeded,
		equipmentNeeded: noEquipmentNeeded,
		castString: "attacks",
		consume: new SkillConsume({
			elements: [
				new ElementConsume({
					element: FundamentalElementTypes.none,
					amount: [0, 0, 0, 0, 0],
				}),
			],
		}),
		produce: new SkillProduce({
			elements: [
				new ElementProduce({
					element: FundamentalElementTypes.none,
					amountRange: [
						[0, 0],
						[0, 0],
						[0, 0],
						[0, 0],
						[0, 0],
					],
				}),
			],
		}),
		isSpell: false,
		isAuto: true,
		isWeaponAttack: true,
		isReaction: false,
	},
	skill_auto_physical_exec
);

const skill_auto_magical = new Skill(
	{
		id: "skill_auto_magical",
		name: "Normal Magical Attack",
		tier: Tier.common,
		description: `Attack with weapon's magical damage.`,
		requirement: noRequirementNeeded,
		equipmentNeeded: noEquipmentNeeded,
		castString: "attacks",
		consume: new SkillConsume({
			elements: [
				new ElementConsume({
					element: FundamentalElementTypes.none,
					amount: [0, 0, 0, 0, 0],
				}),
			],
		}),
		produce: new SkillProduce({
			elements: [
				new ElementProduce({
					element: FundamentalElementTypes.none,
					amountRange: [
						[0, 0],
						[0, 0],
						[0, 0],
						[0, 0],
						[0, 0],
					],
				}),
			],
		}),
		isSpell: true,
		isAuto: true,
		isWeaponAttack: false,
		isReaction: false,
	},
	skill_auto_magical_exec
);

function skill_auto_physical_exec(
	character: Character,
	allies: Party,
	enemies: Party,
	context: { time: GameTime; location: LocationName }
): TurnReport {
	const { damageDice, bonusStat, damageType, preferredPosition, bonus } =
		extractWeaponStats(character, DamageSourceType.Physical);

	const targetType: TargetType = {
		scope: TargetScope.Single,
		taunt: TargetTauntConsideration.TauntCount,
	};

	const target = selectOneEnemy(character, enemies, targetType);

	if (target === "NO_TARGET") {
		return buildNoTargetReport(character);
	}

	const [crit, hitChance] = calculateCritAndHit(
		character,
		target,
		AttributeEnum.luck
	);
	let damage =
		StatMod.value(character.status[bonusStat]()) +
		Dice.roll(damageDice).sum +
		bonus;
	if (crit) {
		damage *= 1.5;
	}

	const result = target.receiveDamage({
		attacker: character,
		damage,
		hitChance,
		damageType,
		locationName: context.location,
	});

	let extraEffect = "";
	if (result.dHit) {
		const [onHitString, outPutDamage] = applyOnHitEffects(
			character,
			target,
			result.damage
		);
		extraEffect = onHitString;
		result.damage = outPutDamage;
	}

	const castString = result.dHit
		? buildCastString(
				`${character.name} attacked ${target.name} and dealt ${result.damage} ${result.damageType} damage.`,
				extraEffect
		  )
		: `${character.name} attacked ${target.name} but missed.`;

	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_auto_physical",
		actorSkillEffect: ActorSkillEffect.None,
		consume: { hp: [], mp: [], sp: [], elements: [] },
		produce: { elements: [] },
		targets: [
			{
				character: turnCharacterIntoInterface(target),
				damageTaken: result.damage,
				effect: "none",
			},
		],
		castString,
	};
}

function skill_auto_magical_exec(
	character: Character,
	allies: Party,
	enemies: Party,
	context: { time: GameTime; location: LocationName }
): TurnReport {
	const { damageDice, bonusStat, damageType, preferredPosition, bonus } =
		extractWeaponStats(character, DamageSourceType.Magical);

	const targetType: TargetType = {
		scope: TargetScope.Single,
		taunt: TargetTauntConsideration.TauntCount,
	};

	const target = selectOneEnemy(character, enemies, targetType);

	if (target === "NO_TARGET") {
		return buildNoTargetReport(character);
	}

	const [crit, hitChance] = calculateCritAndHit(
		character,
		target,
		AttributeEnum.luck
	);
	let damage =
		StatMod.value(character.status[bonusStat]()) +
		Dice.roll(damageDice).sum +
		bonus;
	if (crit) {
		damage *= 1.5;
	}

	const result = target.receiveDamage({
		attacker: character,
		damage,
		hitChance,
		damageType,
		locationName: context.location,
	});

	let extraEffect = "";
	if (result.dHit) {
		const [onHitString, outPutDamage] = applyOnHitEffects(
			character,
			target,
			result.damage
		);
		extraEffect = onHitString;
		result.damage = outPutDamage;
	}

	const castString = result.dHit
		? buildCastString(
				`${character.name} attacked ${target.name} and dealt ${result.damage} ${result.damageType} damage.`,
				extraEffect
		  )
		: `${character.name} attacked ${target.name} but missed.`;

	return {
		character: turnCharacterIntoInterface(character),
		skill: "skill_auto_physical",
		actorSkillEffect: ActorSkillEffect.None,
		consume: { hp: [], mp: [], sp: [], elements: [] },
		produce: { elements: [] },
		targets: [
			{
				character: turnCharacterIntoInterface(target),
				damageTaken: result.damage,
				effect: "none",
			},
		],
		castString,
	};
}

export const autoAttackSkills = [skill_auto_physical, skill_auto_magical];
