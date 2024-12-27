export enum DamageTypes {
    // Main types, shouldn't be used to determine skill, but how to take damage.
    physical = "physical",
    magical = "magical",

    slash = "slash",
    pierce = "pierce",
    blunt = "blunt",
    order = "order",
    chaos = "chaos",
    geo = "geo",
    water = "water",
    air = "air",
    fire = "fire",
    ice = "ice",
    spirit = "spirit",
    lightning = "lightning",
    demonic = "demonic",
    metal = "metal",
    angelic = "angelic",
    nature = "nature",
    life = "life",
    dark = "dark",
    necrotic = "necrotic",
    poison = "poison",
    holy = "holy",
    arcane = "arcane",
    resource = "resource",
    chiWarm = "chiWarm",
    chiCold = "chiCold",
    chiHarmony = "chiHarmony",

    None = "none"
}

export function getMainDamageType(damageType: DamageTypes): DamageTypes {
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