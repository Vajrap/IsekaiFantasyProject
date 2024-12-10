import { CharacterStatusModifier } from "../Entities/Character/Subclasses/CharacterStatusModifier"
import { K } from "./Constants"

export class EffectObject {
    effect: keyof typeof K.buffsAndDebuffs  
    dc: number
    dcModifier: CharacterStatusModifier[]
    duration: number
    durationModifier: CharacterStatusModifier[]
    savingModifier: CharacterStatusModifier[]
    constructor(
        effect: keyof typeof K.buffsAndDebuffs,
        dc: number,
        dcModifier: CharacterStatusModifier[],
        duration: number,
        durationModifier: CharacterStatusModifier[],
        savingModifier: CharacterStatusModifier[]
    ) {
        this.effect = effect;
        this.dc = dc;
        this.dcModifier = dcModifier;
        this.duration = duration;
        this.durationModifier = durationModifier;
        this.savingModifier = savingModifier;
    }
}