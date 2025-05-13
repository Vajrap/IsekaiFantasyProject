export var ElementTypes;
(function (ElementTypes) {
    // Fundamental
    ElementTypes["order"] = "order";
    ElementTypes["chaos"] = "chaos";
    ElementTypes["geo"] = "geo";
    ElementTypes["water"] = "water";
    ElementTypes["air"] = "air";
    ElementTypes["fire"] = "fire";
    // Secondary
    ElementTypes["ice"] = "ice";
    ElementTypes["mist"] = "mist";
    ElementTypes["lightning"] = "lightning";
    ElementTypes["ash"] = "ash";
    ElementTypes["metal"] = "metal";
    ElementTypes["crystal"] = "crystal";
    // Tertiary
    ElementTypes["nature"] = "nature";
    ElementTypes["spirit"] = "spirit";
    ElementTypes["dark"] = "dark";
    ElementTypes["blight"] = "blight";
    ElementTypes["poison"] = "poison";
    ElementTypes["holy"] = "holy";
    // Arcane
    ElementTypes["arcane"] = "arcane";
    // None
    ElementTypes["none"] = "none";
})(ElementTypes || (ElementTypes = {}));
const ElementTierGroups = {
    primary: new Set([
        ElementTypes.order,
        ElementTypes.chaos,
        ElementTypes.geo,
        ElementTypes.water,
        ElementTypes.air,
        ElementTypes.fire,
    ]),
    secondary: new Set([
        ElementTypes.ice,
        ElementTypes.mist,
        ElementTypes.lightning,
        ElementTypes.ash,
        ElementTypes.metal,
        ElementTypes.crystal,
    ]),
    tertiary: new Set([
        ElementTypes.nature,
        ElementTypes.spirit,
        ElementTypes.dark,
        ElementTypes.blight,
        ElementTypes.poison,
        ElementTypes.holy,
    ]),
    arcane: new Set([ElementTypes.arcane]),
    none: new Set([ElementTypes.none]),
};
export var ElementTier;
(function (ElementTier) {
    ElementTier["primary"] = "primary";
    ElementTier["secondary"] = "secondary";
    ElementTier["tertiary"] = "tertiary";
    ElementTier["none"] = "none";
    ElementTier["arcane"] = "arcane";
})(ElementTier || (ElementTier = {}));
export function getElementTier(element) {
    for (const [tier, group] of Object.entries(ElementTierGroups)) {
        if (group.has(element))
            return tier;
    }
    return ElementTier.none;
}
export var FundamentalElementTypes;
(function (FundamentalElementTypes) {
    FundamentalElementTypes["order"] = "order";
    FundamentalElementTypes["chaos"] = "chaos";
    FundamentalElementTypes["geo"] = "geo";
    FundamentalElementTypes["water"] = "water";
    FundamentalElementTypes["air"] = "air";
    FundamentalElementTypes["fire"] = "fire";
    FundamentalElementTypes["none"] = "none";
})(FundamentalElementTypes || (FundamentalElementTypes = {}));
export var SecondaryElementTypes;
(function (SecondaryElementTypes) {
    SecondaryElementTypes["ice"] = "ice";
    SecondaryElementTypes["mist"] = "mist";
    SecondaryElementTypes["lightning"] = "lightning";
    SecondaryElementTypes["ash"] = "ash";
    SecondaryElementTypes["metal"] = "metal";
    SecondaryElementTypes["crystal"] = "crystal";
})(SecondaryElementTypes || (SecondaryElementTypes = {}));
export var TertiaryElementTypes;
(function (TertiaryElementTypes) {
    TertiaryElementTypes["nature"] = "nature";
    TertiaryElementTypes["spirit"] = "spirit";
    TertiaryElementTypes["dark"] = "dark";
    TertiaryElementTypes["blight"] = "blight";
    TertiaryElementTypes["poison"] = "poison";
    TertiaryElementTypes["holy"] = "holy";
})(TertiaryElementTypes || (TertiaryElementTypes = {}));
