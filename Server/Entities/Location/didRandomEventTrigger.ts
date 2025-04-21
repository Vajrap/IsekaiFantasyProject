import { Dice } from "../../Utility/Dice";

export function didRandomEventTrigger(
  eventDC: number,
  actionType: "rest" | "train" | "travel" | "stroll" | "craft" | "learn",
): boolean {
  const roll = Dice.rollTwenty();
  const mod = actionTypeEventModifiers[actionType] ?? 0;
  return roll <= eventDC + mod;
}

const actionTypeEventModifiers: Record<
  "rest" | "train" | "travel" | "stroll" | "craft" | "learn",
  number
> = {
  rest: -4,
  train: -2,
  travel: +2,
  stroll: +1,
  craft: -1,
  learn: +2,
};
