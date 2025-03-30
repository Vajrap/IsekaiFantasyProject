import { DamageTypes } from "../../../../Common/DTOsEnumsInterfaces/DamageTypes";
import { Character } from "../../Character/Character";

export function createCastString({
    actor,
    target,
    skillName,
    damage,
    healing,
    crit,
    dHit,
    damageType,
  }: {
    actor: Character;
    target: Character;
    skillName: string;
    damage?: number;
    healing?: number;
    crit?: boolean;
    dHit: boolean;
    damageType?: DamageTypes;
  }): string {
    let str = `${actor.name} used ${skillName} on ${target.name}, `;
    if (crit) str += `CRITICAL! `;
    if (dHit) {
      if (damage) str += `dealing ${damage} ${damageType} damage.`;
      if (healing) str += `healing ${healing} HP.`;
    } else {
      str += "but missed!";
    }
    return str;
  }