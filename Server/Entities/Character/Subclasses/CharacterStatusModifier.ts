export class CharacterStatusModifier {
    type: 'attributes' | 'elements' | 'proficiencies' | 'elements' | 'battlers';
    target: 'charisma' | 'luck' | 'intelligence' | 'leadership' | 'vitality' | 'willpower' | 'breath' | 'planar' | 'dexterity' | 'agility' | 'strength' | 'endurance' | 'bareHand' | 'sword' | 'blade' | 'spear' | 'axe' | 'bow' | 'dagger' | 'magicWand' | 'staff' | 'tome' | 'orb' | 'mace' | 'shield' | 'pATK' | 'pHIT' | 'pCRT' | 'pDEF' | 'mATK' | 'mHIT' | 'mCRT' | 'mDEF' | 'dodge' | 'order' | 'chaos' | 'geo' | 'water' | 'air' | 'fire';
    constructor(
        target: 'charisma' | 'luck' | 'intelligence' | 'leadership' | 'vitality' | 'willpower' | 'breath' | 'planar' | 'dexterity' | 'agility' | 'strength' | 'endurance' | 'bareHand' | 'sword' | 'blade' | 'spear' | 'axe' | 'bow' | 'dagger' | 'magicWand' | 'staff' | 'tome' | 'orb' | 'mace' | 'shield' | 'pATK' | 'pHIT' | 'pCRT' | 'pDEF' | 'mATK' | 'mHIT' | 'mCRT' | 'mDEF' | 'dodge' | 'order' | 'chaos' | 'geo' | 'water' | 'air' | 'fire'
    ) {
        this.target = target;
        if (target === 'charisma' || 
        target === 'luck' || 
        target === 'intelligence' || 
        target === 'leadership' || 
        target === 'vitality' || 
        target === 'willpower' || 
        target === 'breath' || 
        target === 'planar' || 
        target === 'dexterity' || 
        target === 'agility' || 
        target === 'strength' || 
        target === 'endurance') {
            this.type = 'attributes';
            return;
        }
        if (target === 'bareHand' || target === 'sword' || target === 'blade' || target === 'spear' || target === 'axe' || target === 'bow' || target === 'dagger' || target === 'magicWand' || target === 'staff' || target === 'tome' || target === 'orb' || target === 'mace' || target === 'shield') {
            this.type = 'proficiencies';
            return
        }
        if (target === 'pATK' || target === 'pHIT' || target === 'pCRT' || target === 'pDEF' || target === 'mATK' || target === 'mHIT' || target === 'mCRT' || target === 'mDEF' || target === 'dodge') {
            this.type = 'battlers';
            return
        }
        if (target === 'order' || target === 'chaos' || target === 'geo' || target === 'water' || target === 'air' || target === 'fire') {
            this.type = 'elements';
            return
        }
        else {
            throw new Error('Invalid target');
        }
    }
}