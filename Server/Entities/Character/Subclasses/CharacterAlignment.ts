export class CharacterAlignment {
    law: number;
    chaos: number;
    good: number;
    evil: number;
    constructor({law, chaos, good, evil}: {
        law: number,
        chaos: number,
        good: number,
        evil: number
    }){ 
        this.law = law;
        this.chaos = chaos;
        this.good = good;
        this.evil = evil;
    }

    alignment(): CharacterAlignmentEnum {
        let lawChaos, goodEvil = 'NEUTRAL';
        if (this.law - this.chaos > 10) {
            lawChaos = 'LAWFUL';
        } else if (this.chaos - this.law > 10) {
            lawChaos = 'CHAOTIC';
        }
        if (this.good - this.evil > 10) {
            goodEvil = 'GOOD';
        } else if (this.evil - this.good > 10) {
            goodEvil = 'EVIL';
        }
        
        return `${lawChaos}_${goodEvil}` as CharacterAlignmentEnum;
    }

    intoInterface(): string{
        return this.alignment();
    }
}

export enum CharacterAlignmentEnum {
    LAWFUL_GOOD = 'LAWFUL_GOOD',
    LAWFUL_NEUTRAL = 'LAWFUL_NEUTRAL',
    LAWFUL_EVIL = 'LAWFUL_EVIL',
    NEUTRAL_GOOD = 'NEUTRAL_GOOD',
    NEUTRAL = 'NEUTRAL',
    NEUTRAL_EVIL = 'NEUTRAL_EVIL',
    CHAOTIC_GOOD = 'CHAOTIC_GOOD',
    CHAOTIC_NEUTRAL = 'CHAOTIC_NEUTRAL',
    CHAOTIC_EVIL = 'CHAOTIC_EVIL'
}