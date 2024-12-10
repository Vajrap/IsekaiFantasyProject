export class DamageMultiplierFromPosition {
    static get ({
        preferPosition, 
        rightModifier, 
        wrongModifier, 
        position, 
    } : {
        preferPosition: 'front' | 'back' | 'both', 
        rightModifier: number, 
        wrongModifier: number, 
        position: number
    }): number {
        if (preferPosition === 'both') {
            return rightModifier;
        } else 
        if ((preferPosition === 'front' && position < 3) || (preferPosition === 'back' && position > 2)) {
            return rightModifier;
        } else {
            return wrongModifier;
        }
    }
}