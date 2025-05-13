export class StatMod {
    static value(stat) {
        const boundaries = [
            { upperBound: 1, modifier: -5 },
            { upperBound: 3, modifier: -4 },
            { upperBound: 5, modifier: -3 },
            { upperBound: 7, modifier: -2 },
            { upperBound: 9, modifier: -1 },
            { upperBound: 11, modifier: 0 },
            { upperBound: 13, modifier: 1 },
            { upperBound: 15, modifier: 2 },
            { upperBound: 17, modifier: 3 },
            { upperBound: 19, modifier: 4 },
            { upperBound: 21, modifier: 5 },
            { upperBound: 23, modifier: 6 },
            { upperBound: 25, modifier: 7 },
            { upperBound: 27, modifier: 8 },
            { upperBound: 29, modifier: 9 },
            { upperBound: 30, modifier: 10 }
        ];
        for (const boundary of boundaries) {
            if (stat <= boundary.upperBound) {
                return boundary.modifier;
            }
        }
        return 0;
    }
}
