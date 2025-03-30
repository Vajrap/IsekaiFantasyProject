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

// We need DamageMultiplierFromPositions, both actor and target too,
export class DamageMultiplierFromBothPositions {
    static get ({
        preferredActorPosition,
        preferredTargetPosition,
        rightModifier,
        middleGroundModifier,
        wrongModifier,
        actorPosition,
        targetPosition,
    }: {
        preferredActorPosition: 'front' | 'back' | 'both',
        preferredTargetPosition: 'front' | 'back' | 'both',
        rightModifier: number,
        middleGroundModifier: number,
        wrongModifier: number,
        actorPosition: number,
        targetPosition: number,
    }): number {
        let actor_inrightPosition = false;
        if (preferredActorPosition === 'both') { actor_inrightPosition = true } 
        if (preferredActorPosition === 'front' && actorPosition < 3) { actor_inrightPosition = true } 
        if (preferredActorPosition === 'back' && actorPosition > 2) { actor_inrightPosition = true }
        let target_inrightPosition = false;

        if (preferredTargetPosition === 'both') { target_inrightPosition = true } 
        if (preferredTargetPosition === 'front' && targetPosition < 3) { target_inrightPosition = true} 
        if (preferredTargetPosition === 'back' && targetPosition > 2) { target_inrightPosition = true }

        if (actor_inrightPosition && target_inrightPosition) { return rightModifier };
        if (!actor_inrightPosition && !target_inrightPosition) { return wrongModifier };
        
        return middleGroundModifier;
    }
}