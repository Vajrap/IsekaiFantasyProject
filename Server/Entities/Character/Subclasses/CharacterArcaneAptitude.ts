export class CharacterArcaneAptitude {
    aptitude: number
    constructor(startingAptitude: number = 100) {
        this.aptitude = startingAptitude
    }

    decreaseAptitude(amount: number) {
        this.aptitude -= amount
        return this.aptitude
    }

    increaseAptitude(amount: number) {
        this.aptitude += amount
        return this.aptitude
    }

    getMagicResistanceAptitude() {
        //at aptitude 100, magic resistance is 0 meaning character will take 100% magic damage
        //at aptitude 0, magic resistance is 0.9 meaning will take 10% magic damage
        //aptitude for magic resistance is capped at 100
        const capped = Math.min(this.aptitude, 100)
        return 0.1 + (1 - capped / 100) * 0.9
    }

    getSpellEffectivenessAptitude() {
        // at aptitude 100, spell effectiveness is 1 meaning character will deal 100% magic damage
        // at aptitude 0, spell effectiveness is 0 meaning will deal 0% magic damage
        // aptitude for spell effectiveness is capped at 200
        // At aptitude 200, spell effectiveness is 2 meaning character will deal 200% magic damage
        const capped = Math.min(this.aptitude, 200)
        return capped / 100
    }

    getArcaneAptitudeDescription(): string {
        if (this.aptitude < 20) return 'ไม่เป็นสื่อเวทย์มนตร์';
        if (this.aptitude < 50) return 'เป็นสื่อเวทย์มนตร์เล็กน้อย';
        if (this.aptitude < 80) return 'เป็นสื่อเวทย์มนตร์ปานกลาง';
        if (this.aptitude < 100) return 'เป็นสื่อเวทย์มนตร์สูง';
        return 'สื่อเวทย์มนตร์สมบูรณ์แบบ';
    }

    intoInterface(): string {
        return this.getArcaneAptitudeDescription();
    }
}