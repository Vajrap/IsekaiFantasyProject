import { Dice } from "../../Utility/Dice";
import { DiceEnum } from "../../Utility/Enum/DamageDIce";
import { StatMod } from "../../Utility/StatMod";

export const calculateBaseHP = (constitution: number): number => {
    return calculateBaseStat(constitution);
};

export const calculateBaseMP = (planar: number): number => {
    return calculateBaseStat(planar);
};

export const calculateBaseSP = (endurance: number): number => {
    return calculateBaseStat(endurance);
};

export const calculateBaseStat = (attributeValue: number): number => {
    // We first roll 8 dices, take best 2 accumulative rolls and add them to the base value
    const FirstRandomHealth = Dice.roll(DiceEnum.EightD6).rolls;
    let baseValue = FirstRandomHealth.sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a + b, 0);

    const diceFace = getDiceFace(attributeValue);
    const diceRolls = Dice.roll(diceFace).rolls;
    const bestRoll = Math.max(...diceRolls);

    return baseValue + bestRoll;
};

function getDiceFace(forStatValue: number): DiceEnum {
    const statMod = StatMod.value(forStatValue);
    let diceFace = DiceEnum.ThreeD2;

    if (statMod <= -4) {
        diceFace = DiceEnum.ThreeD2;
    } else if (statMod <= -2) {
        diceFace = DiceEnum.ThreeD4;
    } else if (statMod <= 0) {
        diceFace = DiceEnum.ThreeD6;
    } else if (statMod <= 2) {
        diceFace = DiceEnum.ThreeD8;
    } else if (statMod <= 4) {
        diceFace = DiceEnum.ThreeD10;
    } else if (statMod <= 6) {
        diceFace = DiceEnum.ThreeD12;
    } else if (statMod <= 8) {
        diceFace = DiceEnum.ThreeD14;
    } else if (statMod <= 10) {
        diceFace = DiceEnum.ThreeD16;
    }

    return diceFace;
}