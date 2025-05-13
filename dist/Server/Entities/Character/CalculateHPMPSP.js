export const calculateBaseHP = (baseValue, characterLevel, constitution) => {
    return calculateBaseStat(baseValue, characterLevel, constitution);
};
export const calculateBaseMP = (baseValue, characterLevel, planar) => {
    return calculateBaseStat(baseValue, characterLevel, planar);
};
export const calculateBaseSP = (baseValue, characterLevel, endurance) => {
    return calculateBaseStat(baseValue, characterLevel, endurance);
};
export const calculateBaseStat = (baseValue, characterLevel, attributeValue) => {
    return baseValue + (characterLevel * getValue(attributeValue));
};
function getValue(statValue) {
    return Math.round(statValue / 2);
}
