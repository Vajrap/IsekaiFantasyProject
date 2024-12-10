import { BuffsAndDebuffs } from "../../../Entities/Character/Subclasses/BuffsAndDebuffs";
import { CharacterStatus } from "../../../Entities/Character/Subclasses/CharacterStatus";
import { DamageTypes } from "../../../Utility/Enum/DamageTypes";

export class EffectAppenderSendObject {
    status: CharacterStatus;
    buffsAndDebuffs: BuffsAndDebuffs;
    duration: number;

    constructor(status: CharacterStatus, buffsAndDebuffs: BuffsAndDebuffs, duration: number) {
        this.status = status;
        this.buffsAndDebuffs = buffsAndDebuffs;
        this.duration = duration;
    }
}
export class EffectResolverSendObject {
    status: CharacterStatus;
    buffsAndDebuffs: BuffsAndDebuffs;
    durationDecrease: number;

    constructor(status: CharacterStatus, buffsAndDebuffs: BuffsAndDebuffs, durationDecrease?: number) {
        this.status = status;
        this.buffsAndDebuffs = buffsAndDebuffs;
        this.durationDecrease = durationDecrease? durationDecrease : 1;
    }
}

export class EffectReturnObject {
    enableTurnOrder: boolean;
    buffsAndDebuffs: BuffsAndDebuffs;
    status: CharacterStatus;
    type: "hpUp" | "hpDown" | "mpUp" | "mpDown" | "spUp" | "spDown" | "buffsAndDebuffs" | "damage";
    damage?: { 
        amount: number; 
        type: DamageTypes 
    };

    constructor(
        enableTurnOrder: boolean,
        buffsAndDebuffs: BuffsAndDebuffs,
        type: "hpUp" | "hpDown" | "mpUp" | "mpDown" | "spUp" | "spDown" | "buffsAndDebuffs" | "damage", 
        status: CharacterStatus,
        damage?: { amount: number; type: DamageTypes }
    ) {
        this.enableTurnOrder = enableTurnOrder;
        this.buffsAndDebuffs = buffsAndDebuffs;
        this.type = type;
        this.status = status;
        this.damage = damage;
    }
}