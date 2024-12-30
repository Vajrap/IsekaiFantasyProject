export var DamageTypes;
(function (DamageTypes) {
    // Main types, shouldn't be used to determine skill, but how to take damage.
    DamageTypes["physical"] = "physical";
    DamageTypes["magical"] = "magical";
    DamageTypes["slash"] = "slash";
    DamageTypes["pierce"] = "pierce";
    DamageTypes["blunt"] = "blunt";
    DamageTypes["order"] = "order";
    DamageTypes["chaos"] = "chaos";
    DamageTypes["geo"] = "geo";
    DamageTypes["water"] = "water";
    DamageTypes["air"] = "air";
    DamageTypes["fire"] = "fire";
    DamageTypes["ice"] = "ice";
    DamageTypes["spirit"] = "spirit";
    DamageTypes["lightning"] = "lightning";
    DamageTypes["demonic"] = "demonic";
    DamageTypes["metal"] = "metal";
    DamageTypes["angelic"] = "angelic";
    DamageTypes["nature"] = "nature";
    DamageTypes["life"] = "life";
    DamageTypes["dark"] = "dark";
    DamageTypes["necrotic"] = "necrotic";
    DamageTypes["poison"] = "poison";
    DamageTypes["holy"] = "holy";
    DamageTypes["arcane"] = "arcane";
    DamageTypes["resource"] = "resource";
    DamageTypes["chiWarm"] = "chiWarm";
    DamageTypes["chiCold"] = "chiCold";
    DamageTypes["chiHarmony"] = "chiHarmony";
    DamageTypes["None"] = "none";
})(DamageTypes || (DamageTypes = {}));
export function getMainDamageType(damageType) {
    switch (damageType) {
        case DamageTypes.slash:
        case DamageTypes.pierce:
        case DamageTypes.blunt:
            return DamageTypes.physical;
        case DamageTypes.order:
        case DamageTypes.chaos:
        case DamageTypes.geo:
        case DamageTypes.water:
        case DamageTypes.air:
        case DamageTypes.fire:
        case DamageTypes.ice:
        case DamageTypes.spirit:
        case DamageTypes.lightning:
        case DamageTypes.demonic:
        case DamageTypes.metal:
        case DamageTypes.angelic:
        case DamageTypes.nature:
        case DamageTypes.life:
        case DamageTypes.dark:
        case DamageTypes.necrotic:
        case DamageTypes.poison:
        case DamageTypes.holy:
        case DamageTypes.arcane:
            return DamageTypes.magical;
        case DamageTypes.resource:
        case DamageTypes.chiWarm:
        case DamageTypes.chiCold:
        case DamageTypes.chiHarmony:
            return damageType;
    }
    return DamageTypes.physical;
}
