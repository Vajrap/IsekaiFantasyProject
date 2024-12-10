export class CharacterActiveInternalBonus {
    attributes: any;
    proficiencies: any;
    battlers: any;
    elements: any;
    constructor() {
        this.attributes = {
            charisma: 0,
            luck: 0,
            intelligence: 0,
            leadership: 0,
            vitality: 0,
            willpower: 0,
            breath: 0,
            planar: 0,
            dexterity: 0,
            agility: 0,
            strength: 0,
            endurance: 0
        };
        
        this.proficiencies = {
            bareHand: 0,
            sword: 0,
            blade: 0,
            spear: 0,
            axe: 0,
            bow: 0,
            dagger: 0,
            magicWand: 0,
            staff: 0,
            tome: 0,
            orb: 0,
            mace: 0,
        };
        
        this.battlers = {
            pATK: 0,
            pHIT: 0,
            pDEF: 0,
            pCRT: 0,
            mATK: 0,
            mHIT: 0,
            mDEF: 0,
            mCRT: 0,
            dodge: 0
        };

        this.elements = {
            order: 0,
            chaos: 0,
            geo: 0,
            water: 0,
            air: 0,
            fire: 0,
        };        
    }  
}