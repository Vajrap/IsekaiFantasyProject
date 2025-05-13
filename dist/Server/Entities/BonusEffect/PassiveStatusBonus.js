export class PassiveStatusBonus {
    constructor({ charisma = null, luck = null, intelligence = null, leadership = null, vitality = null, willpower = null, breath = null, planar = null, dexterity = null, agility = null, strength = null, endurance = null, bareHand = null, sword = null, blade = null, spear = null, axe = null, bow = null, dagger = null, magicWand = null, staff = null, tome = null, orb = null, mace = null, shield = null, mining = null, smithing = null, woodcutting = null, carpentry = null, foraging = null, weaving = null, skinning = null, tanning = null, jewelry = null, alchemy = null, cooking = null, enchanting = null, pATK = null, pHIT = null, pDEF = null, pCRT = null, mATK = null, mHIT = null, mDEF = null, mCRT = null, chiWarmATK = null, chiWarmDEF = null, chiColdATK = null, chiColdDEF = null, dodge = null, order = null, chaos = null, geo = null, water = null, air = null, fire = null }) {
        this.attributes = {
            charisma,
            luck,
            intelligence,
            leadership,
            vitality,
            willpower,
            breath,
            planar,
            dexterity,
            agility,
            strength,
            endurance
        };
        this.proficiencies = {
            bareHand,
            sword,
            blade,
            spear,
            axe,
            bow,
            dagger,
            magicWand,
            staff,
            tome,
            orb,
            mace,
            shield
        };
        this.artisans = {
            mining,
            smithing,
            woodcutting,
            carpentry,
            foraging,
            weaving,
            skinning,
            tanning,
            jewelry,
            alchemy,
            cooking,
            enchanting
        };
        this.battlers = {
            pATK,
            pHIT,
            pDEF,
            pCRT,
            mATK,
            mHIT,
            mDEF,
            mCRT,
            chiWarmATK,
            chiWarmDEF,
            chiColdATK,
            chiColdDEF,
            dodge
        };
        this.elements = {
            order,
            chaos,
            geo,
            water,
            air,
            fire
        };
    }
}
