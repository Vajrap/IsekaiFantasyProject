import { StatMod } from "../../Utility/StatMod";

export const calculateBaseHP = (baseValue: number, characterLevel: number, constitution: number): number => {
    return calculateBaseStat(baseValue, characterLevel, constitution);
};

export const calculateBaseMP = (baseValue: number, characterLevel:number, planar: number): number => {
    return calculateBaseStat(baseValue, characterLevel, planar);
};

export const calculateBaseSP = (baseValue: number, characterLevel:number, endurance: number): number => {
    return calculateBaseStat(baseValue, characterLevel, endurance);
};

export const calculateBaseStat = (baseValue: number, characterLevel:number, attributeValue: number): number => {
    return baseValue + (characterLevel*getValue(attributeValue));
};

function getValue(statValue: number): number {
    return Math.round(statValue / 2)
}
