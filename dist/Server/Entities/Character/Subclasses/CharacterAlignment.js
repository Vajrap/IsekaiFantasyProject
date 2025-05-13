export class CharacterAlignment {
    constructor({ law, chaos, good, evil }) {
        this.law = law;
        this.chaos = chaos;
        this.good = good;
        this.evil = evil;
    }
    alignment() {
        let lawChaos = 'NEUTRAL';
        let goodEvil = 'NEUTRAL';
        if (this.law - this.chaos > 10) {
            lawChaos = 'LAWFUL';
        }
        else if (this.chaos - this.law > 10) {
            lawChaos = 'CHAOTIC';
        }
        if (this.good - this.evil > 10) {
            goodEvil = 'GOOD';
        }
        else if (this.evil - this.good > 10) {
            goodEvil = 'EVIL';
        }
        const alignmentKey = `${lawChaos}_${goodEvil}`;
        if (!(alignmentKey in CharacterAlignmentEnum)) {
            throw new Error(`Invalid alignment: ${alignmentKey}`);
        }
        return CharacterAlignmentEnum[alignmentKey];
    }
    intoInterface() {
        return this.alignment();
    }
}
export var CharacterAlignmentEnum;
(function (CharacterAlignmentEnum) {
    CharacterAlignmentEnum["LAWFUL_GOOD"] = "\u0E04\u0E19\u0E14\u0E35 \u0E21\u0E35\u0E01\u0E0E\u0E40\u0E01\u0E13\u0E11\u0E4C";
    CharacterAlignmentEnum["LAWFUL_NEUTRAL"] = "\u0E04\u0E19\u0E21\u0E35\u0E01\u0E0E\u0E40\u0E01\u0E13\u0E11\u0E4C";
    CharacterAlignmentEnum["LAWFUL_EVIL"] = "\u0E04\u0E19\u0E0A\u0E31\u0E48\u0E27 \u0E21\u0E35\u0E01\u0E0E\u0E40\u0E01\u0E13\u0E11\u0E4C";
    CharacterAlignmentEnum["NEUTRAL_GOOD"] = "\u0E04\u0E19\u0E14\u0E35";
    CharacterAlignmentEnum["NEUTRAL_NEUTRAL"] = "\u0E04\u0E19\u0E1B\u0E01\u0E15\u0E34";
    CharacterAlignmentEnum["NEUTRAL_EVIL"] = "\u0E04\u0E19\u0E0A\u0E31\u0E48\u0E27";
    CharacterAlignmentEnum["CHAOTIC_GOOD"] = "\u0E04\u0E19\u0E14\u0E35 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E0E\u0E40\u0E01\u0E13\u0E11\u0E4C";
    CharacterAlignmentEnum["CHAOTIC_NEUTRAL"] = "\u0E04\u0E19\u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E0E\u0E40\u0E01\u0E13\u0E11\u0E4C";
    CharacterAlignmentEnum["CHAOTIC_EVIL"] = "\u0E04\u0E19\u0E0A\u0E31\u0E48\u0E27 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E0E\u0E40\u0E01\u0E13\u0E11\u0E4C";
})(CharacterAlignmentEnum || (CharacterAlignmentEnum = {}));
