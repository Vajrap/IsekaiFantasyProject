export class ClassModifier {
    attributes: {
        charisma: number;
        luck: number;
        intelligence: number;
        leadership: number;
        vitality: number;
        willpower: number;
        breath: number;
        planar: number;
        dexterity: number;
        agility: number;
        strength: number;
        endurance: number;
    };
    proficiencies: {
        bareHand: number;
        sword: number;
        blade: number;
        dagger: number;
        spear: number;
        axe: number;
        mace: number;
        shield: number;
        bow: number;
        magicWand: number;
        staff: number;
        tome: number;
        orb: number;
    };
    battlers: {
        pATK: number;
        pHIT: number;
        pCRT: number;
        pDEF: number;
        mATK: number;
        mHIT: number;
        mCRT: number;
        mDEF: number;
        chiWarmATK: number;
        chiColdATK: number;
        chiWarmDEF: number;
        chiColdDEF: number;
        slash: number;
        pierce: number;
        blunt: number;
        dodge: number;
    };
    elements: {
        order: number;
        chaos: number;
        geo: number;
        water: number;
        air: number;
        fire: number;
    };
    artisans: {
        mining: number;
        smithing: number;
        woodcutting: number;
        carpentry: number;
        foraging: number;
        weaving: number;
        skinning: number;
        tanning: number;
        jewelry: number;
        alchemy: number;
        cooking: number;
        enchanting: number;
    };

    constructor(
        attributes: Partial<ClassModifier['attributes']> = {},
        proficiencies: Partial<ClassModifier['proficiencies']> = {},
        battlers: Partial<ClassModifier['battlers']> = {},
        elements: Partial<ClassModifier['elements']> = {},
        artisans: Partial<ClassModifier['artisans']> = {}
    ) {
        const defaultAttributes = {
            charisma: 0, luck: 0, intelligence: 0, leadership: 0,
            vitality: 0, willpower: 0, breath: 0, planar: 0,
            dexterity: 0, agility: 0, strength: 0, endurance: 0
        };
        
        const defaultProficiencies = {
            bareHand: 0, sword: 0, blade: 0, dagger: 0,
            spear: 0, axe: 0, mace: 0, shield: 0,
            bow: 0, magicWand: 0, staff: 0, tome: 0, orb: 0
        };

        const defaultBattlers = {
            pATK: 0, pHIT: 0, pCRT: 0, pDEF: 0,
            mATK: 0, mHIT: 0, mCRT: 0, mDEF: 0,
            chiWarmATK: 0, chiColdATK: 0, chiWarmDEF: 0,
            chiColdDEF: 0, slash: 0, pierce: 0, blunt: 0, dodge: 0
        };

        const defaultElements = { order: 0, chaos: 0, geo: 0, water: 0, air: 0, fire: 0 };

        const defaultArtisans = {
            mining: 0, smithing: 0, woodcutting: 0, carpentry: 0,
            foraging: 0, weaving: 0, skinning: 0, tanning: 0,
            jewelry: 0, alchemy: 0, cooking: 0, enchanting: 0
        };

        this.attributes = Object.assign(defaultAttributes, attributes);
        this.proficiencies = Object.assign(defaultProficiencies, proficiencies);
        this.battlers = Object.assign(defaultBattlers, battlers);
        this.elements = Object.assign(defaultElements, elements);
        this.artisans = Object.assign(defaultArtisans, artisans);
    }
}

// Breath is a stats used for class like Xia, (Chinese Wuxia), about breathing and internal energy
export const classModifierCleric = new ClassModifier(
    { charisma: 2, leadership: 2, luck: 2 },
    { mace: 2, shield: 2, tome: 2 }
);

export const classModifierDruid = new ClassModifier(
    { vitality: 2, dexterity: 2, willpower: 2 },
    { staff: 2, orb: 2, spear: 2 }
);

export const classModifierMage = new ClassModifier(
    { intelligence: 2, willpower: 2, planar: 2 },
    { magicWand: 2, staff: 2, orb: 2 }
);

export const classModifierRogue = new ClassModifier(
    { agility: 2, dexterity: 2, luck: 2 },
    { dagger: 2, spear: 2, bow: 2 }
);

export const classModifierFighter = new ClassModifier(
    { strength: 2, vitality: 2, endurance: 2 },
    { sword: 2, blade: 2, shield: 2 }
);

export const classModifierWarlock = new ClassModifier(
    { intelligence: 2, charisma: 2, planar: 2 },
    { magicWand: 2, axe: 2, tome: 2 }
);

export const classModifierXia = new ClassModifier(
    { dexterity: 2, breath: 2, willpower: 2 },
    { sword: 2, spear: 2, bareHand: 2 }
);
//Tier 2 classes, we only have 2 tiers, it's not actual class, but a stat modifier for character presets
export const classModifierRoyalGuard = new ClassModifier(
    { leadership: 3, vitality: 3, endurance: 3 },
    { sword: 3, shield: 3, blade: 3 }
);

export const classModifierSwordMage = new ClassModifier(
    { intelligence: 3, dexterity: 3, planar: 3 },
    { sword: 3, magicWand: 3, staff: 3 }
);

export const classModifierAssassin = new ClassModifier(
    { agility: 3, dexterity: 3, luck: 3 },
    { dagger: 3, spear: 3, bow: 3 }
);

export const classModifierHarbinger = new ClassModifier(
    { charisma: 3, luck: 3, willpower: 3 },
    { mace: 3, shield: 3, tome: 3 }
);

export const classModifierKnight = new ClassModifier(
    { strength: 3, vitality: 3, endurance: 3 },
    { sword: 3, shield: 3, spear: 3 }
);

export const classModifierPaladin = new ClassModifier(
    { charisma: 3, leadership: 3, vitality: 3 },
    { sword: 3, shield: 3, mace: 3 }
);

export const classModifierEngineer = new ClassModifier(
    { intelligence: 3, dexterity: 3, planar: 3 },
    { spear: 3, staff: 3, tome: 3 }
);

export const classModifierWarden = new ClassModifier(
    { vitality: 3, dexterity: 3, willpower: 3 },
    { staff: 3, orb: 3, spear: 3 }
);

export const classModifierNecromancer = new ClassModifier(
    { intelligence: 3, charisma: 3, planar: 3 },
    { magicWand: 3, staff: 3, tome: 3 }
);

export const classModifierOracle = new ClassModifier(
    { charisma: 3, luck: 3, willpower: 3 },
    { mace: 3, shield: 3, tome: 3 }
);

export const classModifierAlchemist = new ClassModifier(
    { intelligence: 3, willpower: 3, planar: 3 },
    { magicWand: 3, staff: 3, orb: 3 }
);

export const classModifierInquisitor = new ClassModifier(
    { charisma: 3, leadership: 3, luck: 3 },
    { tome: 3, mace: 3, shield: 3 }
);

export const classModifierBard = new ClassModifier(
    { charisma: 3, luck: 3, leadership: 3 },
    { staff: 3, orb: 3, tome: 3 }
);

export const classModifierRanger = new ClassModifier(
    { agility: 3, dexterity: 3, luck: 3 },
    { bow: 3, dagger: 3, spear: 3 }
);

export const classModifierBarbarian = new ClassModifier(
    { strength: 3, vitality: 3, endurance: 3 },
    { axe: 3, sword: 3, shield: 3 }
);

export const classModifierMonk = new ClassModifier(
    { dexterity: 3, breath: 3, willpower: 3 },
    { bareHand: 3, staff: 3, sword: 3 }
);

export const classModifierSorcerer = new ClassModifier(
    { intelligence: 3, willpower: 3, planar: 3 },
    { magicWand: 3, staff: 3, orb: 3 }
);

export const classModifierRogueKnight = new ClassModifier(
    { agility: 3, dexterity: 3, luck: 3 },
    { dagger: 3, spear: 3, bow: 3 }
);


// Tier 2 Xias group
export const classModifierSwordXia = new ClassModifier(
    { dexterity: 4, breath: 3, strength: 2 },
    { sword: 4 }
);

export const classModifierSpearXia = new ClassModifier(
    { strength: 3, breath: 2, dexterity: 4 },
    { spear: 4 }
);

export const classModifierBareHandXia = new ClassModifier(
    { dexterity: 2, breath: 5, intelligence: 2 },
    { bareHand: 4 }
);

export const classModifierBladeXia = new ClassModifier(
    { dexterity: 3, breath: 2, strength: 4 },
    { blade: 4 }
);

export const classModifierStaffXia = new ClassModifier(
    { dexterity: 2, vitality: 2, endurance: 2, strength: 2 },
    { staff: 4 }
);

export const classModifierAxeXia = new ClassModifier(
    { strength: 4, vitality: 3, endurance: 2 },
    { axe: 4 }
);

// Some weird classes
export const classModifierChieftain = new ClassModifier(
    { strength: 5, vitality: 5, endurance: 5 },
    { axe: 5, shield: 5, spear: 5 }
);