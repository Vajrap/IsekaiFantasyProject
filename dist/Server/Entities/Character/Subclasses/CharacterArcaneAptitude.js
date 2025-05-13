export class CharacterArcaneAptitude {
    constructor(startingAptitude = 100) {
        this.aptitude = startingAptitude;
    }
    decreaseAptitude(amount) {
        this.aptitude = Math.max(0, this.aptitude - amount);
        return this.aptitude;
    }
    increaseAptitude(amount) {
        this.aptitude = Math.min(200, this.aptitude + amount);
        return this.aptitude;
    }
    getMagicResistanceAptitude() {
        //at aptitude 100, magic resistance is 0 meaning character will take 100% magic damage
        //at aptitude 0, magic resistance is 0.9 meaning will take 10% magic damage
        //aptitude for magic resistance is capped at 100
        const capped = Math.min(this.aptitude, 100);
        return 0.1 + (1 - capped / 100) * 0.9;
    }
    getSpellEffectivenessAptitude() {
        // at aptitude 100, spell effectiveness is 1 meaning character will deal 100% magic damage
        // at aptitude 0, spell effectiveness is 0 meaning will deal 0% magic damage
        // aptitude for spell effectiveness is capped at 200
        // At aptitude 200, spell effectiveness is 2 meaning character will deal 200% magic damage
        const capped = Math.min(this.aptitude, 200);
        return capped / 100;
    }
    getArcaneAptitudeDescription() {
        if (this.aptitude < 40)
            return 'ไม่เป็นสื่อเวทย์มนตร์';
        if (this.aptitude < 80)
            return 'เป็นสื่อเวทย์มนตร์เล็กน้อย';
        if (this.aptitude < 120)
            return 'เป็นสื่อเวทย์มนตร์ปานกลาง';
        if (this.aptitude < 160)
            return 'เป็นสื่อเวทย์มนตร์สูง';
        return 'สื่อเวทย์มนตร์สมบูรณ์แบบ';
    }
    intoInterface() {
        return this.getArcaneAptitudeDescription();
    }
}
export var arcaneAptitudeEnum;
(function (arcaneAptitudeEnum) {
    arcaneAptitudeEnum["noMagic"] = "\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E17\u0E22\u0E4C\u0E21\u0E19\u0E15\u0E23\u0E4C";
    arcaneAptitudeEnum["lowMagic"] = "\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E17\u0E22\u0E4C\u0E21\u0E19\u0E15\u0E23\u0E4C\u0E40\u0E25\u0E47\u0E01\u0E19\u0E49\u0E2D\u0E22";
    arcaneAptitudeEnum["mediumMagic"] = "\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E17\u0E22\u0E4C\u0E21\u0E19\u0E15\u0E23\u0E4C\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07";
    arcaneAptitudeEnum["highMagic"] = "\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E17\u0E22\u0E4C\u0E21\u0E19\u0E15\u0E23\u0E4C\u0E2A\u0E39\u0E07";
    arcaneAptitudeEnum["fullMagic"] = "\u0E2A\u0E37\u0E48\u0E2D\u0E40\u0E27\u0E17\u0E22\u0E4C\u0E21\u0E19\u0E15\u0E23\u0E4C\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C\u0E41\u0E1A\u0E1A";
})(arcaneAptitudeEnum || (arcaneAptitudeEnum = {}));
