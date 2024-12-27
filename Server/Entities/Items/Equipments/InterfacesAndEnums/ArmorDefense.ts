export interface ArmorDefense {
    pDEF: number,
    slashDEF: number,
    pierceDEF: number,
    bluntDEF: number,
    mDEF: number,
    geoDEF: number,
    waterDEF: number,
    airDEF: number,
    fireDEF: number,
    orderDEF: number,
    chaosDEF: number,
    dodge: number,
}


export const defaultDefenseStats: ArmorDefense = {
    pDEF: 0, slashDEF: 0, pierceDEF: 0, bluntDEF: 0, 
    mDEF: 0, geoDEF: 0, waterDEF: 0, airDEF: 0, 
    fireDEF: 0, orderDEF: 0, chaosDEF: 0, dodge: 0
}