export class SkillConsume {
    constructor({ hp = Array(10).fill(0), mp = Array(10).fill(0), sp = Array(10).fill(0), elements }) {
        this.hp = hp;
        this.mp = mp;
        this.sp = sp;
        this.elements = elements;
    }
    validateConsume(level, userElements, userHp, userMp, userSp) {
        if (this.hp[level - 1] > userHp)
            return false;
        if (this.mp[level - 1] > userMp)
            return false;
        if (this.sp[level - 1] > userSp)
            return false;
        for (const element of this.elements) {
            if (element.amount[level - 1] > userElements[element.element])
                return false;
        }
        return true;
    }
    intoInterface() {
        return {
            hp: this.hp,
            mp: this.mp,
            sp: this.sp,
            elements: this.elements.map(element => ({
                element: element.element,
                amount: element.amount
            }))
        };
    }
}
export class ElementConsume {
    constructor({ element, amount }) {
        this.element = element;
        this.amount = amount;
    }
}
export class SkillProduce {
    constructor({ elements }) {
        this.elements = elements;
    }
    intoInterface() {
        return {
            elements: this.elements.map(element => ({
                element: element.element,
                amountRange: element.amountRange
            }))
        };
    }
}
export class ElementProduce {
    constructor({ element, amountRange }) {
        this.element = element;
        this.amountRange = amountRange;
    }
    getAmount(level) {
        const [min, max] = this.amountRange[level - 1];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
