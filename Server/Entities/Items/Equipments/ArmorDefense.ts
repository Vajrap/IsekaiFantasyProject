export class ArmorDefense {
    pDEF?: number | null;
    slashDEF?: number | null;
    pierceDEF?: number | null;
    bluntDEF?: number | null;
    mDEF?: number | null;
    geoDEF?: number | null;
    waterDEF?: number | null;
    airDEF?: number | null;
    fireDEF?: number | null;
    orderDEF?: number | null;
    chaosDEF?: number | null;
    dodge?: number | null;

    constructor({
        pDEF = null,
        slashDEF = null,
        pierceDEF = null,
        bluntDEF = null,
        mDEF = null,
        geoDEF = null,
        waterDEF = null,
        airDEF = null,
        fireDEF = null,
        orderDEF = null,
        chaosDEF = null,
        dodge = null
    }: {
        pDEF?: number | null,
        slashDEF?: number  | null,
        pierceDEF?: number  | null,
        bluntDEF?: number  | null,
        mDEF?: number  | null,
        geoDEF?: number  | null,
        waterDEF?: number  | null,
        airDEF?: number  | null,
        fireDEF?: number  | null,
        orderDEF?: number  | null,
        chaosDEF?: number  | null,
        dodge?: number  | null
    }) {
        this.pDEF = pDEF;
        this.slashDEF = slashDEF;
        this.pierceDEF = pierceDEF;
        this.bluntDEF = bluntDEF;
        this.mDEF = mDEF;
        this.geoDEF = geoDEF;
        this.waterDEF = waterDEF;
        this.airDEF = airDEF;
        this.fireDEF = fireDEF;
        this.orderDEF = orderDEF;
        this.chaosDEF = chaosDEF;
        this.dodge = dodge;
    } 
}

