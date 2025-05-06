import { TurnReport } from "../../../Common/DTOsEnumsInterfaces/Battle/battleInterfaces";
import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import {
  TargetScope,
  TargetSortingOptions,
  TargetType,
  TargetRow,
  TargetTauntConsideration,
} from "../../../Common/DTOsEnumsInterfaces/TargetTypes";
import { Character } from "../../Entities/Character/Character";
import { Party } from "../../Entities/Party/Party";
import { skillExecNoTargetReport } from "../../Entities/Skills/Utils/report";
import { Dice } from "../../Utility/Dice";

class TargetSelectionProcess {
  private targetedParty: Party;
  private actor: Character;
  private targetType: TargetType;
  private exceptions: Character[];
  targets: Character[];

  constructor(
    targetedParty: Party,
    actor: Character,
    targetType: TargetType,
    exceptions: Character[],
  ) {
    this.targetedParty = targetedParty;
    this.actor = actor;
    this.targetType = targetType;
    this.exceptions = exceptions;
    this.targets = this.initializeTargets();
  }

  private initializeTargets(): Character[] {
    let targets = this.targetedParty.getAvailableCharacters();
    if (targets.length === 0) {
      return [];
    }

    targets = this.applyExceptions(targets);
    if (targets.length === 0) {
      return [];
    }

    if (
      this.targetType.scope === TargetScope.All &&
      this.targetType.row === undefined
    ) {
      return targets;
    }

    let tauntTargets: Character[] = [];
    if (this.targetType.taunt === TargetTauntConsideration.TauntCount) {
      tauntTargets = targets.filter(
        (target) => target.buffsAndDebuffs.taunt > 0,
      );
    }
    if (tauntTargets.length === 1) {
      return tauntTargets;
    }
    if (tauntTargets.length > 1) {
      targets = tauntTargets;
    }

    let filtered = this.applyRowFiltering(targets);
    if (filtered.characters.length === 0) {
      return [];
    }
    if (filtered.characters.length === 1) {
      return filtered.characters;
    }

    targets = this.applyConditionFiltering(filtered.characters);
    if (targets.length === 0) {
      return [];
    }
    if (targets.length === 1) {
      return targets;
    }

    if (this.targetType.scope === TargetScope.All) {
      return targets;
    }

    // End of filtering, start sorting

    targets = this.applySortingOptions(targets);
    if (targets.length === 0) {
      return [];
    }
    if (targets.length === 1) {
      return targets;
    }

    return [this.pickTargetWithStealthCheck(targets)];
  }

  private applyExceptions(targets: Character[]): Character[] {
    return targets.filter((target) => !this.exceptions.includes(target));
  }

  private applyRowFiltering(targets: Character[]): { characters: Character[] } {
    switch (this.targetType.row) {
      case TargetRow.Front:
        return { characters: targets.filter((target) => target.position <= 2) };
      case TargetRow.Back:
        return { characters: targets.filter((target) => target.position >= 3) };
      case TargetRow.ShiftableFront:
        let shiftFrontTarget = targets.filter((target) => target.position <= 2);
        if (shiftFrontTarget.length === 0) {
          shiftFrontTarget = targets.filter((target) => target.position >= 3);
        }
        return { characters: shiftFrontTarget };
      case TargetRow.ShiftableBack:
        let shiftBackTarget = targets.filter((target) => target.position >= 3);
        if (shiftBackTarget.length === 0) {
          shiftBackTarget = targets.filter((target) => target.position <= 2);
        }
        return { characters: shiftBackTarget };
      case TargetRow.Opposite:
        const characterPosition: "front" | "back" =
          this.actor.position <= 2 ? "back" : "front";
        let oppositeRowCharacters = targets.filter(
          (target) => target.position <= 2,
        );
        return { characters: oppositeRowCharacters };
      case TargetRow.OppositeShiftable:
        const characterPositionShiftable: "front" | "back" =
          this.actor.position <= 2 ? "back" : "front";
        let oppositeRowShiftableCharacters = targets.filter(
          (target) => target.position <= 2,
        );
        if (oppositeRowShiftableCharacters.length === 0) {
          oppositeRowShiftableCharacters = targets.filter(
            (target) => target.position >= 3,
          );
        }
        return { characters: oppositeRowShiftableCharacters };
      default:
        return { characters: targets };
    }
  }

  private applyConditionFiltering(targets: Character[]): Character[] {
    switch (this.targetType.filter?.type) {
      case "isDead":
        return targets.filter((target) => target.isDead);
      case "isSummoned":
        return targets.filter((target) => target.isSummoned && !target.isDead);
      case "buffOrDebuff":
        let buffOrDebuff = this.targetType.filter.buff;
        let value = this.targetType.filter.value;
        return targets.filter(
          (target) =>
            target.buffsAndDebuffs[buffOrDebuff] >= value && !target.isDead,
        );
      case "trait":
        if (this.targetType.filter.trait === "none") {
          return targets.filter((target) => !target.isDead);
        } else {
          let value = this.targetType.filter.value;
          let possibleTargets = [];
          for (let target of targets) {
            if (
              target.traits.filter((trait) => trait === trait).length >=
                value &&
              !target.isDead
            ) {
              possibleTargets.push(target);
            }
          }
          return possibleTargets;
        }
      default:
        return targets.filter((target) => !target.isDead);
    }
  }

  private applySortingOptions(targets: Character[]): Character[] {
    switch (this.targetType.sort) {
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
        return targets.sort(
          (a, b) => b.attribute("agility") - a.attribute("agility"),
        );
      case TargetSortingOptions.Slowest:
        return targets.sort(
          (a, b) => a.attribute("agility") - b.attribute("agility"),
        );
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
        targets.filter((target) => target !== candidate),
      );
    }
    return candidate;
  }

  private stealthVisibleRollCheck(
    actor: Character,
    target: Character,
  ): boolean {
    const roll = Dice.rollTwenty();
    const actorBonus = actor.getModifier(CharacterStatusEnum.intelligence);
    const targetBonus = target.getModifier(CharacterStatusEnum.dexterity);
    // Critical success or meeting the threshold makes the target visible
    return roll === 20 || roll + actorBonus >= 14 + targetBonus;
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

export function selectTargets(
  targetedParty: Party,
  actor: Character,
  targetType: TargetType,
  exceptions: Character[] = [],
): Character[] {
  const process = new TargetSelectionProcess(
    targetedParty,
    actor,
    targetType,
    exceptions,
  );
  return process.targets;
}

export function selectOneTarget(
  actor: Character,
  targetParty: Party,
  targetType: TargetType,
): Character | "NO_TARGET" {
  const targets = selectTargets(targetParty, actor, targetType);
  if (targets.length === 0) {
    return "NO_TARGET";
  } else {
    return targets[0];
  }
}

export function selectMultipleTargets(
  actor: Character,
  targetParty: Party,
  targetType: TargetType,
): Character[] {
  return selectTargets(targetParty, actor, targetType);
}

export function trySelectOneTarget(
  actor: Character,
  targetParty: Party,
  targetType: TargetType,
  skillName: string,
): Character | TurnReport {
  const target = selectOneTarget(actor, targetParty, targetType);

  if (target === "NO_TARGET") {
    return skillExecNoTargetReport(actor, skillName);
  }
  return target;
}
