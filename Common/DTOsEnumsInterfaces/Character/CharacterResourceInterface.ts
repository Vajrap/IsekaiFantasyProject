export interface CharacterResourceInterface {
    hp: number;
    mp: number;
    sp: number;
    elements: {
        element: string;
        amount: number;
    }[]
}