import { FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";

export class SkillConsume {
    hp: number[];
    mp: number[];
    sp: number[];
    elements: ElementConsume[]
    constructor({
        hp = Array(10).fill(0), 
        mp = Array(10).fill(0), 
        sp = Array(10).fill(0), 
        elements
    }: {
        hp?: number[],
        mp?: number[],
        sp?: number[],
        elements: ElementConsume[]
    }) {
        this.hp = hp
        this.mp = mp
        this.sp = sp
        this.elements = elements
    }
        
    validateConsume(
        level: number, 
        userElements: { 
            "none": number,
            "order": number,
            "chaos": number,
            "geo": number,
            "water": number,
            "air": number,
            "fire": number
        },
        userHp: number,
        userMp: number,
        userSp: number
    ): boolean
    {
        if (this.hp[level - 1] > userHp) return false;
        if (this.mp[level - 1] > userMp) return false;
        if (this.sp[level - 1] > userSp) return false;
        for (const element of this.elements) {
            if (element.amount[level - 1] > userElements[element.element]) return false;
        }
        return true;
    }

    intoInterface(): {
        hp: number[],
        mp: number[],
        sp: number[],
        elements: {
            element: string,
            amount: number[]
        }[]
    } {
        return {
            hp: this.hp,
            mp: this.mp,
            sp: this.sp,
            elements: this.elements.map(element => ({
                element: element.element,
                amount: element.amount
            }))
        }
    }
}

export class ElementConsume {
    element: FundamentalElementTypes
    amount: number[]
    constructor({
        element,
        amount
    } : {
        element: FundamentalElementTypes,
        amount: number[]
    }) {
        this.element = element
        this.amount = amount
    }
}

export class SkillProduce {
    elements: ElementProduce[]
    constructor({
        elements
    } : {
        elements: ElementProduce[]
    }) {
        this.elements = elements
    }

    intoInterface(): {
        elements: {
            element: string,
            amountRange: [number, number][]
        }[]
    } {
        return {
            elements: this.elements.map(element => ({
                element: element.element,
                amountRange: element.amountRange
            }))
        }
    }
}

export class ElementProduce {
    element: FundamentalElementTypes
    amountRange: [number, number][]
    constructor({
        element,
        amountRange
    } : {
        element: FundamentalElementTypes,
        amountRange: [number, number][]
    }) {
        this.element = element
        this.amountRange = amountRange
    }

    getAmount(level: number): number {
        const [min, max] = this.amountRange[level - 1];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}