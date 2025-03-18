export class SkillConsume {
    constructor({ hp = Array(10).fill(0), mp = Array(10).fill(0), sp = Array(10).fill(0), elements }) {
        this.hp = hp;
        this.mp = mp;
        this.sp = sp;
        this.elements = elements;
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
