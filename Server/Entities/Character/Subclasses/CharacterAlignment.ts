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
        let lawChaos: 'LAWFUL' | 'NEUTRAL' | 'CHAOTIC' = 'NEUTRAL';
        let goodEvil: 'GOOD' | 'NEUTRAL' | 'EVIL' = 'NEUTRAL';

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

        const alignmentKey = `${lawChaos}_${goodEvil}` as keyof typeof CharacterAlignmentEnum;

        if (!(alignmentKey in CharacterAlignmentEnum)) {
            throw new Error(`Invalid alignment: ${alignmentKey}`);
        }

        return CharacterAlignmentEnum[alignmentKey];
    }

    intoInterface(): string{
        return this.alignment();
    }
}

export enum CharacterAlignmentEnum {
    LAWFUL_GOOD = 'คนดี มีกฎเกณฑ์',
    LAWFUL_NEUTRAL = 'คนมีกฎเกณฑ์',
    LAWFUL_EVIL = 'คนชั่ว มีกฎเกณฑ์',
    NEUTRAL_GOOD = 'คนดี',
    NEUTRAL_NEUTRAL = 'คนปกติ',
    NEUTRAL_EVIL = 'คนชั่ว',
    CHAOTIC_GOOD = 'คนดี ไม่มีกฎเกณฑ์',
    CHAOTIC_NEUTRAL = 'คนไม่มีกฎเกณฑ์',
    CHAOTIC_EVIL = 'คนชั่ว ไม่มีกฎเกณฑ์'
}