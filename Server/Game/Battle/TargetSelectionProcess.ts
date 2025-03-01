import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { BuffsAndDebuffsEnum, TargetConditionFilters, TargetSelectionScope, TargetSortingOptions, TargetType } from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Character } from "../../Entities/Character/Character";
import { Party } from "../../Entities/Party/Party";
import { Dice } from "../../Utility/Dice";

export class TargetSelectionProcess {
	private targetedParty: Party;
	private actor: Character;
	private targetType: TargetType;
	private exceptions: Character[];
	targets: Character[];

	constructor(targetedParty: Party, actor: Character, targetType: TargetType, exceptions: Character[]) {
		this.targetedParty = targetedParty;
		this.actor = actor;
		this.targetType = targetType;
		this.exceptions = exceptions;
		this.targets = this.initializeTargets();
	}

	private initializeTargets(): Character[] {
		let targets = this.targetedParty.getAvailableCharacters()	
        if (targets.length === 0) { return [] }	

		targets = this.applyExceptions(targets);
        if (targets.length === 0) { return [] }

		let filtered = this.applyRowFiltering(targets);
        if (filtered.characters.length === 0) { return [] }	
		if (filtered.isOfType === 'all') { return filtered.characters }

		targets = this.applyConditionFiltering(filtered.characters);
        if (targets.length === 0) { return [] }	

		targets = this.applySortingOptions(targets);
        if (targets.length === 0) { return [] }	

		return [this.pickTargetWithStealthCheck(targets)];
	}

	private applyExceptions(targets: Character[]): Character[] {
		return targets.filter(target => !this.exceptions.includes(target));
	}

	private applyRowFiltering(targets: Character[]): { characters: Character[], isOfType: 'single' | 'all' } {
		switch (this.targetType.targetScope) {
			case TargetSelectionScope.AllFrontRow:
				return { 
					characters: targets.filter(target => target.position < 3),
					isOfType: 'all' 
				};
			case TargetSelectionScope.AllBackRow:
				return {
					characters: targets.filter(target => target.position > 2),
					isOfType: 'all'
				};
			case TargetSelectionScope.AllFrontRowShiftable: 
				if (targets.filter(target => target.position < 3).length === 0) {
					return {
						characters: targets.filter(target => target.position > 2),
						isOfType: 'all'
					};
				}
				return {
					characters: targets.filter(target => target.position < 3),
					isOfType: 'all'
				};
			case TargetSelectionScope.AllBackRowShiftable: 
				if (targets.filter(target => target.position > 2).length === 0) {
					return {
						characters: targets.filter(target => target.position < 3),
						isOfType: 'all'
					};
				}
				return {
					characters: targets.filter(target => target.position > 2),
					isOfType: 'all'
				}
			case TargetSelectionScope.OppositeRow:
				if (this.actor.position < 3) {
					return {
						characters: targets.filter(target => target.position > 2),
						isOfType: 'single'
					};
				}
				return {
					characters: targets.filter(target => target.position < 3),
					isOfType: 'single'
				};
			case TargetSelectionScope.OppositeRowShiftable:
				if (this.actor.position < 3) {
					if (targets.filter(target => target.position > 2).length === 0) {
						return {
							characters: targets.filter(target => target.position < 3),
							isOfType: 'single'
						};
					}
					return {
						characters: targets.filter(target => target.position > 2),
						isOfType: 'single'
					};
				}
				if (targets.filter(target => target.position < 3).length === 0) {
					return {
						characters: targets.filter(target => target.position > 2),
						isOfType: 'single'
					};
				}
				return {
					characters: targets.filter(target => target.position < 3),
					isOfType: 'single'
				};
			case TargetSelectionScope.Single:
				return { characters: targets, isOfType: 'single' };
			case TargetSelectionScope.All:
				return { characters: targets, isOfType: 'all' };
			default:
				return { characters: targets, isOfType: 'all' };
		}
	}

	private applyConditionFiltering(targets: Character[]): Character[] {
		switch (this.targetType.targetConditionFilter) {
			case TargetConditionFilters.IsDead:
				return targets.filter(target => target.isDead);
			case TargetConditionFilters.IsSummoned:
				return targets.filter(target => target.isSummoned && !target.isDead);
			case TargetConditionFilters.None:
				return targets.filter(target => !target.isDead);
			case TargetConditionFilters.HasBuffOrDebuff:
                if (this.targetType.targetBuffOrDebuffCondition === 'none' ) {
                    return targets.filter(target => !target.isDead);
                } else if (this.targetType.targetBuffOrDebuffCondition.buffOrDebuff === BuffsAndDebuffsEnum.none) {
                    return targets.filter(target => !target.isDead);
                } else {
                    let buffOrDebuff = this.targetType.targetBuffOrDebuffCondition.buffOrDebuff;
                    let value = this.targetType.targetBuffOrDebuffCondition.value;
                    return targets.filter(target => target.buffsAndDebuffs[buffOrDebuff] >= value && !target.isDead);
                }
			case TargetConditionFilters.HasTrait:
                if (this.targetType.targetTraitCondition === 'none') {
                    return targets.filter(target => !target.isDead);
                } else if (this.targetType.targetTraitCondition.trait === 'none') {
                    return targets.filter(target => !target.isDead);
                } else {
                    let value = this.targetType.targetTraitCondition.value;
                    let possibleTargets = []
                    for (let target of targets) {
                        if (target.traits.filter(trait => trait === trait).length >= value && !target.isDead) {
                            possibleTargets.push(target);
                        }
                    }
                    return possibleTargets;
                }
			default:
				return targets.filter(target => !target.isDead);
		}
	}

	private applySortingOptions(targets: Character[]): Character[] {
		switch (this.targetType.targetSortingOption) {
			case TargetSortingOptions.None:
				return targets;
			case TargetSortingOptions.LowestHP:
				return targets.sort((a, b) => a.currentHP - b.currentHP);
			case TargetSortingOptions.HighestHP:
				return targets.sort((a, b) => b.currentHP - a.currentHP);
			case TargetSortingOptions.LowestMP:
				return targets.sort((a, b) => a.currentMP - b.currentMP);
			case TargetSortingOptions.HighestMP:
				return targets.sort((a, b) => b.currentMP - a.currentMP);
			case TargetSortingOptions.LowestSP:
				return targets.sort((a, b) => a.currentSP - b.currentSP);
			case TargetSortingOptions.HighestSP:
				return targets.sort((a, b) => b.currentSP - a.currentSP);
			case TargetSortingOptions.PreferredFrontRow:
				return targets.sort((a, b) => a.position - b.position);
			case TargetSortingOptions.PreferredBackRow:
				return targets.sort((a, b) => b.position - a.position);
			case TargetSortingOptions.LowestPhysicalAttack:
				return targets.sort((a, b) => a.battler("pATK") - b.battler("pATK"));
			case TargetSortingOptions.HighestPhysicalAttack:
				return targets.sort((a, b) => b.battler("pATK") - a.battler("pATK"));
			case TargetSortingOptions.LowestMagicalAttack:
				return targets.sort((a, b) => a.battler("mATK") - b.battler("mATK"));
			case TargetSortingOptions.HighestMagicalAttack:
				return targets.sort((a, b) => b.battler("mATK") - a.battler("mATK"));
			case TargetSortingOptions.LowestPhysicalDefense:
				return targets.sort((a, b) => a.battler("pDEF") - b.battler("pDEF"));
			case TargetSortingOptions.HighestPhysicalDefense:
				return targets.sort((a, b) => b.battler("pDEF") - a.battler("pDEF"));
			case TargetSortingOptions.LowestMagicalDefense:
				return targets.sort((a, b) => a.battler("mDEF") - b.battler("mDEF"));
			case TargetSortingOptions.HighestMagicalDefense:
				return targets.sort((a, b) => b.battler("mDEF") - a.battler("mDEF"));
			case TargetSortingOptions.LowestLevel:
				return targets.sort((a, b) => a.level - b.level);
			case TargetSortingOptions.HighestLevel:
				return targets.sort((a, b) => b.level - a.level);
			case TargetSortingOptions.Fastest:
				return targets.sort((a, b) => b.attribute("agility") - a.attribute("agility"));
			case TargetSortingOptions.Slowest:
				return targets.sort((a, b) => a.attribute("agility") - b.attribute("agility"));
			default:
				return targets;
		}
	}

	private pickTargetWithStealthCheck(targets: Character[]): Character {
		let candidate = targets[0];
		// If the candidate has stealth, try to verify its visibility.
		if (candidate.buffsAndDebuffs?.stealth >= 1) {
			let attempts = 5;
			while (attempts > 0) {
				if (this.stealthVisibleRollCheck(this.actor, candidate)) {
					return candidate;
				}
				// Pick another candidate randomly if stealth check fails
				candidate = targets[Math.floor(Math.random() * targets.length)];
				attempts--;
			}
			// Fallback: use weighted random selection excluding the problematic candidate
			return this.getWeightedRandomTarget(
				targets.filter(target => target !== candidate)
			);
		}
		return candidate;
	}

	private stealthVisibleRollCheck(actor: Character, target: Character): boolean {
		const roll = Dice.rollTwenty();
		const actorBonus = actor.getModifier(CharacterStatusEnum.intelligence);
		const targetBonus = target.getModifier(CharacterStatusEnum.dexterity);
		// Critical success or meeting the threshold makes the target visible
		return roll === 20 || (roll + actorBonus >= 14 + targetBonus);
	}

	private getWeightedRandomTarget(targets: Character[]): Character {
		if (targets.length === 0) throw new Error("No valid targets found!");

		let totalWeight = 0;
		const weightMap: number[] = [];

		for (let i = 0; i < targets.length; i++) {
			let weight = targets.length - i; // Higher position = higher weight
			totalWeight += weight;
			weightMap.push(totalWeight);
		}

		const roll = Math.floor(Math.random() * totalWeight) + 1;

		for (let i = 0; i < weightMap.length; i++) {
			if (roll <= weightMap[i]) {
				return targets[i];
			}
		}

		return targets[targets.length - 1];
	}
}