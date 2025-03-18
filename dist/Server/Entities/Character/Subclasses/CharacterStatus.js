import { Dice } from "../../../Utility/Dice";
import { CharacterStatusEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { DiceEnum } from "../../../../Common/DTOsEnumsInterfaces/DiceEnum";
import { ElementTypes, FundamentalElementTypes } from "../../../../Common/DTOsEnumsInterfaces/ElementTypes";
export class CharacterStatus {
    constructor() {
        // Initialize all properties, if not given in constructor, set to 0
        this.attributes = {
            charisma: { base: 0, bonus: 0, battle: 0, exp: 0 },
            luck: { base: 0, bonus: 0, battle: 0, exp: 0 },
            intelligence: { base: 0, bonus: 0, battle: 0, exp: 0 },
            leadership: { base: 0, bonus: 0, battle: 0, exp: 0 },
            vitality: { base: 0, bonus: 0, battle: 0, exp: 0 },
            willpower: { base: 0, bonus: 0, battle: 0, exp: 0 },
            breath: { base: 0, bonus: 0, battle: 0, exp: 0 },
            planar: { base: 0, bonus: 0, battle: 0, exp: 0 },
            dexterity: { base: 0, bonus: 0, battle: 0, exp: 0 },
            agility: { base: 0, bonus: 0, battle: 0, exp: 0 },
            strength: { base: 0, bonus: 0, battle: 0, exp: 0 },
            endurance: { base: 0, bonus: 0, battle: 0, exp: 0 }
        };
        this.proficiencies = {
            bareHand: { base: 0, bonus: 0, battle: 0, exp: 0 },
            sword: { base: 0, bonus: 0, battle: 0, exp: 0 },
            blade: { base: 0, bonus: 0, battle: 0, exp: 0 },
            dagger: { base: 0, bonus: 0, battle: 0, exp: 0 },
            spear: { base: 0, bonus: 0, battle: 0, exp: 0 },
            axe: { base: 0, bonus: 0, battle: 0, exp: 0 },
            mace: { base: 0, bonus: 0, battle: 0, exp: 0 },
            shield: { base: 0, bonus: 0, battle: 0, exp: 0 },
            bow: { base: 0, bonus: 0, battle: 0, exp: 0 },
            magicWand: { base: 0, bonus: 0, battle: 0, exp: 0 },
            staff: { base: 0, bonus: 0, battle: 0, exp: 0 },
            tome: { base: 0, bonus: 0, battle: 0, exp: 0 },
            orb: { base: 0, bonus: 0, battle: 0, exp: 0 }
        };
        this.battlers = {
            pATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            pHIT: { base: 0, bonus: 0, battle: 0, exp: 0 },
            pCRT: { base: 0, bonus: 0, battle: 0, exp: 0 },
            pDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            slash: { base: 0, bonus: 0, battle: 0, exp: 0 },
            pierce: { base: 0, bonus: 0, battle: 0, exp: 0 },
            blunt: { base: 0, bonus: 0, battle: 0, exp: 0 },
            slashDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            pierceDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            bluntDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            mATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            mHIT: { base: 0, bonus: 0, battle: 0, exp: 0 },
            mCRT: { base: 0, bonus: 0, battle: 0, exp: 0 },
            mDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            chiWarmATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            chiColdATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            chiWarmDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            chiColdDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            dodge: { base: 0, bonus: 0, battle: 0, exp: 0 },
            orderATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            chaosATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            geoATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            waterATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            airATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            fireATK: { base: 0, bonus: 0, battle: 0, exp: 0 },
            orderDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            chaosDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            geoDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            waterDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            airDEF: { base: 0, bonus: 0, battle: 0, exp: 0 },
            fireDEF: { base: 0, bonus: 0, battle: 0, exp: 0 }
        };
        this.elements = {
            order: { base: 0, bonus: 0, battle: 0, exp: 0 },
            chaos: { base: 0, bonus: 0, battle: 0, exp: 0 },
            geo: { base: 0, bonus: 0, battle: 0, exp: 0 },
            water: { base: 0, bonus: 0, battle: 0, exp: 0 },
            air: { base: 0, bonus: 0, battle: 0, exp: 0 },
            fire: { base: 0, bonus: 0, battle: 0, exp: 0 }
        };
        this.artisans = {
            mining: { base: 0, bonus: 0, battle: 0, exp: 0 },
            smithing: { base: 0, bonus: 0, battle: 0, exp: 0 },
            woodcutting: { base: 0, bonus: 0, battle: 0, exp: 0 },
            carpentry: { base: 0, bonus: 0, battle: 0, exp: 0 },
            foraging: { base: 0, bonus: 0, battle: 0, exp: 0 },
            weaving: { base: 0, bonus: 0, battle: 0, exp: 0 },
            skinning: { base: 0, bonus: 0, battle: 0, exp: 0 },
            tanning: { base: 0, bonus: 0, battle: 0, exp: 0 },
            jewelry: { base: 0, bonus: 0, battle: 0, exp: 0 },
            cooking: { base: 0, bonus: 0, battle: 0, exp: 0 },
            alchemy: { base: 0, bonus: 0, battle: 0, exp: 0 },
            enchanting: { base: 0, bonus: 0, battle: 0, exp: 0 }
        };
    }
    randomPlayerStatus() {
        for (const attribute in this.attributes) {
            this.attributes[attribute].base = Dice.roll(DiceEnum.ThreeD4).sum;
        }
        for (const proficiency in this.proficiencies) {
            this.proficiencies[proficiency].base = Dice.roll(DiceEnum.OneD4).sum;
        }
    }
    getDominateElement() {
        let highestElement = { element: FundamentalElementTypes.none, value: 0 };
        for (const element in this.elements) {
            const value = this.elements[element].base + this.elements[element].bonus;
            if (value > highestElement.value) {
                highestElement = { element: element, value };
            }
        }
        return highestElement;
    }
    getSecondaryElement() {
        let highestElement = { element: FundamentalElementTypes.none, value: 0 };
        let secondHighestElement = { element: FundamentalElementTypes.none, value: 0 };
        for (const element in this.elements) {
            const value = this.elements[element].base + this.elements[element].bonus;
            if (value > highestElement.value) {
                secondHighestElement = highestElement;
                highestElement = { element: element, value };
            }
            else if (value > secondHighestElement.value) {
                secondHighestElement = { element: element, value };
            }
        }
        return secondHighestElement;
    }
    getElement() {
        //Get 2 highest elements
        let highestElement = this.getDominateElement();
        let secondHighestElement = this.getSecondaryElement();
        //if the highest element is not over 10, return none
        if (highestElement.value < 10) {
            return ElementTypes.none;
        }
        //Check if they can be combine and the 2nd is at least 80% of the highest element, if so, return the compound element
        if (highestElement.value > 10 && secondHighestElement.value > 10 && secondHighestElement.value >= highestElement.value * 0.8) {
            if (highestElement.element === FundamentalElementTypes.order && secondHighestElement.element === FundamentalElementTypes.water) {
                return ElementTypes.ice;
            }
            if (highestElement.element === FundamentalElementTypes.water && secondHighestElement.element === FundamentalElementTypes.air) {
                return ElementTypes.spirit;
            }
            if (highestElement.element === FundamentalElementTypes.air && secondHighestElement.element === FundamentalElementTypes.chaos) {
                return ElementTypes.lightning;
            }
            if (highestElement.element === FundamentalElementTypes.chaos && secondHighestElement.element === FundamentalElementTypes.fire) {
                return ElementTypes.demonic;
            }
            if (highestElement.element === FundamentalElementTypes.fire && secondHighestElement.element === FundamentalElementTypes.geo) {
                return ElementTypes.metal;
            }
            if (highestElement.element === FundamentalElementTypes.geo && secondHighestElement.element === FundamentalElementTypes.order) {
                return ElementTypes.angelic;
            }
            if (highestElement.element === FundamentalElementTypes.geo && secondHighestElement.element === FundamentalElementTypes.water) {
                return ElementTypes.nature;
            }
            if (highestElement.element === FundamentalElementTypes.order && secondHighestElement.element === FundamentalElementTypes.air) {
                return ElementTypes.life;
            }
            if (highestElement.element === FundamentalElementTypes.water && secondHighestElement.element === FundamentalElementTypes.chaos) {
                return ElementTypes.dark;
            }
            if (highestElement.element === FundamentalElementTypes.air && secondHighestElement.element === FundamentalElementTypes.fire) {
                return ElementTypes.necrotic;
            }
            if (highestElement.element === FundamentalElementTypes.chaos && secondHighestElement.element === FundamentalElementTypes.geo) {
                return ElementTypes.poison;
            }
            if (highestElement.element === FundamentalElementTypes.fire && secondHighestElement.element === FundamentalElementTypes.order) {
                return ElementTypes.holy;
            }
        }
        //if not, return the highest element
        //Return the highest element
        return highestElement.element;
    }
    charisma() { return this.attributes.charisma.base + this.attributes.charisma.bonus + this.attributes.charisma.battle; }
    ;
    luck() { return this.attributes.luck.base + this.attributes.luck.bonus + this.attributes.luck.battle; }
    ;
    intelligence() { return this.attributes.intelligence.base + this.attributes.intelligence.bonus + this.attributes.intelligence.battle; }
    ;
    leadership() { return this.attributes.leadership.base + this.attributes.leadership.bonus + this.attributes.leadership.battle; }
    ;
    vitality() { return this.attributes.vitality.base + this.attributes.vitality.bonus + this.attributes.vitality.battle; }
    ;
    willpower() { return this.attributes.willpower.base + this.attributes.willpower.bonus + this.attributes.willpower.battle; }
    ;
    breath() { return this.attributes.breath.base + this.attributes.breath.bonus + this.attributes.breath.battle; }
    ;
    planar() { return this.attributes.planar.base + this.attributes.planar.bonus + this.attributes.planar.battle; }
    ;
    dexterity() { return this.attributes.dexterity.base + this.attributes.dexterity.bonus + this.attributes.dexterity.battle; }
    ;
    agility() { return this.attributes.agility.base + this.attributes.agility.bonus + this.attributes.agility.battle; }
    ;
    strength() { return this.attributes.strength.base + this.attributes.strength.bonus + this.attributes.strength.battle; }
    ;
    endurance() { return this.attributes.endurance.base + this.attributes.endurance.bonus + this.attributes.endurance.battle; }
    ;
    bareHand() { return this.proficiencies.bareHand.base + this.proficiencies.bareHand.bonus + this.proficiencies.bareHand.battle; }
    sword() { return this.proficiencies.sword.base + this.proficiencies.sword.bonus + this.proficiencies.sword.battle; }
    blade() { return this.proficiencies.blade.base + this.proficiencies.blade.bonus + this.proficiencies.blade.battle; }
    dagger() { return this.proficiencies.dagger.base + this.proficiencies.dagger.bonus + this.proficiencies.dagger.battle; }
    spear() { return this.proficiencies.spear.base + this.proficiencies.spear.bonus + this.proficiencies.spear.battle; }
    axe() { return this.proficiencies.axe.base + this.proficiencies.axe.bonus + this.proficiencies.axe.battle; }
    mace() { return this.proficiencies.mace.base + this.proficiencies.mace.bonus + this.proficiencies.mace.battle; }
    shield() { return this.proficiencies.shield.base + this.proficiencies.shield.bonus + this.proficiencies.shield.battle; }
    bow() { return this.proficiencies.bow.base + this.proficiencies.bow.bonus + this.proficiencies.bow.battle; }
    magicWand() { return this.proficiencies.magicWand.base + this.proficiencies.magicWand.bonus + this.proficiencies.magicWand.battle; }
    staff() { return this.proficiencies.staff.base + this.proficiencies.staff.bonus + this.proficiencies.staff.battle; }
    tome() { return this.proficiencies.tome.base + this.proficiencies.tome.bonus + this.proficiencies.tome.battle; }
    orb() { return this.proficiencies.orb.base + this.proficiencies.orb.bonus + this.proficiencies.orb.battle; }
    pATK() { return this.battlers.pATK.base + this.battlers.pATK.bonus + this.battlers.pATK.battle; }
    pHIT() { return this.battlers.pHIT.base + this.battlers.pHIT.bonus + this.battlers.pHIT.battle; }
    pCRT() { return this.battlers.pCRT.base + this.battlers.pCRT.bonus + this.battlers.pCRT.battle; }
    pDEF() { return this.battlers.pDEF.base + this.battlers.pDEF.bonus + this.battlers.pDEF.battle; }
    mATK() { return this.battlers.mATK.base + this.battlers.mATK.bonus + this.battlers.mATK.battle; }
    mHIT() { return this.battlers.mHIT.base + this.battlers.mHIT.bonus + this.battlers.mHIT.battle; }
    mCRT() { return this.battlers.mCRT.base + this.battlers.mCRT.bonus + this.battlers.mCRT.battle; }
    mDEF() { return this.battlers.mDEF.base + this.battlers.mDEF.bonus + this.battlers.mDEF.battle; }
    chiWarmATK() { return this.battlers.chiWarmATK.base + this.battlers.chiWarmATK.bonus + this.battlers.chiWarmATK.battle; }
    chiColdATK() { return this.battlers.chiColdATK.base + this.battlers.chiColdATK.bonus + this.battlers.chiColdATK.battle; }
    chiWarmDEF() { return this.battlers.chiWarmDEF.base + this.battlers.chiWarmDEF.bonus + this.battlers.chiWarmDEF.battle; }
    chiColdDEF() { return this.battlers.chiColdDEF.base + this.battlers.chiColdDEF.bonus + this.battlers.chiColdDEF.battle; }
    slash() { return this.battlers.slash.base + this.battlers.slash.bonus + this.battlers.slash.battle; }
    pierce() { return this.battlers.pierce.base + this.battlers.pierce.bonus + this.battlers.pierce.battle; }
    blunt() { return this.battlers.blunt.base + this.battlers.blunt.bonus + this.battlers.blunt.battle; }
    slashDEF() { return this.battlers.slashDEF.base + this.battlers.slashDEF.bonus + this.battlers.slashDEF.battle; }
    pierceDEF() { return this.battlers.pierceDEF.base + this.battlers.pierceDEF.bonus + this.battlers.pierceDEF.battle; }
    bluntDEF() { return this.battlers.bluntDEF.base + this.battlers.bluntDEF.bonus + this.battlers.bluntDEF.battle; }
    dodge() { return this.battlers.dodge.base + this.battlers.dodge.bonus + this.battlers.dodge.battle; }
    order() { return this.elements.order.base + this.elements.order.bonus + this.elements.order.battle; }
    chaos() { return this.elements.chaos.base + this.elements.chaos.bonus + this.elements.chaos.battle; }
    geo() { return this.elements.geo.base + this.elements.geo.bonus + this.elements.geo.battle; }
    water() { return this.elements.water.base + this.elements.water.bonus + this.elements.water.battle; }
    air() { return this.elements.air.base + this.elements.air.bonus + this.elements.air.battle; }
    fire() { return this.elements.fire.base + this.elements.fire.bonus + this.elements.fire.battle; }
    mining() { return this.artisans.mining.base + this.artisans.mining.bonus + this.artisans.mining.battle; }
    smithing() { return this.artisans.smithing.base + this.artisans.smithing.bonus + this.artisans.smithing.battle; }
    woodcutting() { return this.artisans.woodcutting.base + this.artisans.woodcutting.bonus + this.artisans.woodcutting.battle; }
    carpentry() { return this.artisans.carpentry.base + this.artisans.carpentry.bonus + this.artisans.carpentry.battle; }
    foraging() { return this.artisans.foraging.base + this.artisans.foraging.bonus + this.artisans.foraging.battle; }
    weaving() { return this.artisans.weaving.base + this.artisans.weaving.bonus + this.artisans.weaving.battle; }
    skinning() { return this.artisans.skinning.base + this.artisans.skinning.bonus + this.artisans.skinning.battle; }
    tanning() { return this.artisans.tanning.base + this.artisans.tanning.bonus + this.artisans.tanning.battle; }
    jewelry() { return this.artisans.jewelry.base + this.artisans.jewelry.bonus + this.artisans.jewelry.battle; }
    cooking() { return this.artisans.cooking.base + this.artisans.cooking.bonus + this.artisans.cooking.battle; }
    alchemy() { return this.artisans.alchemy.base + this.artisans.alchemy.bonus + this.artisans.alchemy.battle; }
    enchanting() { return this.artisans.enchanting.base + this.artisans.enchanting.bonus + this.artisans.enchanting.battle; }
    orderAttack() { return this.battlers.orderATK.base + this.battlers.orderATK.bonus + this.battlers.orderATK.battle; }
    orderDefense() { return this.battlers.orderDEF.base + this.battlers.orderDEF.bonus + this.battlers.orderDEF.battle; }
    chaosAttack() { return this.battlers.chaosATK.base + this.battlers.chaosATK.bonus + this.battlers.chaosATK.battle; }
    chaosDefense() { return this.battlers.chaosDEF.base + this.battlers.chaosDEF.bonus + this.battlers.chaosDEF.battle; }
    geoAttack() { return this.battlers.geoATK.base + this.battlers.geoATK.bonus + this.battlers.geoATK.battle; }
    geoDefense() { return this.battlers.geoDEF.base + this.battlers.geoDEF.bonus + this.battlers.geoDEF.battle; }
    waterAttack() { return this.battlers.waterATK.base + this.battlers.waterATK.bonus + this.battlers.waterATK.battle; }
    waterDefense() { return this.battlers.waterDEF.base + this.battlers.waterDEF.bonus + this.battlers.waterDEF.battle; }
    airAttack() { return this.battlers.airATK.base + this.battlers.airATK.bonus + this.battlers.airATK.battle; }
    airDefense() { return this.battlers.airDEF.base + this.battlers.airDEF.bonus + this.battlers.airDEF.battle; }
    fireAttack() { return this.battlers.fireATK.base + this.battlers.fireATK.bonus + this.battlers.fireATK.battle; }
    fireDefense() { return this.battlers.fireDEF.base + this.battlers.fireDEF.bonus + this.battlers.fireDEF.battle; }
    iceAttack() { return (this.battlers.waterATK.base + this.battlers.waterATK.bonus + this.battlers.waterATK.battle + this.battlers.orderATK.base + this.battlers.orderATK.bonus + this.battlers.orderATK.battle) / 2; }
    iceDefense() { return (this.battlers.waterDEF.base + this.battlers.waterDEF.bonus + this.battlers.waterDEF.battle + this.battlers.orderDEF.base + this.battlers.orderDEF.bonus + this.battlers.orderDEF.battle) / 2; }
    spiritAttack() { return (this.battlers.waterATK.base + this.battlers.waterATK.bonus + this.battlers.waterATK.battle + this.battlers.airATK.base + this.battlers.airATK.bonus + this.battlers.airATK.battle) / 2; }
    spiritDefense() { return (this.battlers.waterDEF.base + this.battlers.waterDEF.bonus + this.battlers.waterDEF.battle + this.battlers.airDEF.base + this.battlers.airDEF.bonus + this.battlers.airDEF.battle) / 2; }
    lightningAttack() { return (this.battlers.airATK.base + this.battlers.airATK.bonus + this.battlers.airATK.battle + this.battlers.chaosATK.base + this.battlers.chaosATK.bonus + this.battlers.chaosATK.battle) / 2; }
    lightningDefense() { return (this.battlers.airDEF.base + this.battlers.airDEF.bonus + this.battlers.airDEF.battle + this.battlers.chaosDEF.base + this.battlers.chaosDEF.bonus + this.battlers.chaosDEF.battle) / 2; }
    demonicAttack() { return (this.battlers.chaosATK.base + this.battlers.chaosATK.bonus + this.battlers.chaosATK.battle + this.battlers.fireATK.base + this.battlers.fireATK.bonus + this.battlers.fireATK.battle) / 2; }
    demonicDefense() { return (this.battlers.chaosDEF.base + this.battlers.chaosDEF.bonus + this.battlers.chaosDEF.battle + this.battlers.fireDEF.base + this.battlers.fireDEF.bonus + this.battlers.fireDEF.battle) / 2; }
    metalAttack() { return (this.battlers.fireATK.base + this.battlers.fireATK.bonus + this.battlers.fireATK.battle + this.battlers.geoATK.base + this.battlers.geoATK.bonus + this.battlers.geoATK.battle) / 2; }
    metalDefense() { return (this.battlers.fireDEF.base + this.battlers.fireDEF.bonus + this.battlers.fireDEF.battle + this.battlers.geoDEF.base + this.battlers.geoDEF.bonus + this.battlers.geoDEF.battle) / 2; }
    angelicAttack() { return (this.battlers.geoATK.base + this.battlers.geoATK.bonus + this.battlers.geoATK.battle + this.battlers.orderATK.base + this.battlers.orderATK.bonus + this.battlers.orderATK.battle) / 2; }
    angelicDefense() { return (this.battlers.geoDEF.base + this.battlers.geoDEF.bonus + this.battlers.geoDEF.battle + this.battlers.orderDEF.base + this.battlers.orderDEF.bonus + this.battlers.orderDEF.battle) / 2; }
    natureAttack() { return (this.battlers.geoATK.base + this.battlers.geoATK.bonus + this.battlers.geoATK.battle + this.battlers.waterATK.base + this.battlers.waterATK.bonus + this.battlers.waterATK.battle) / 2; }
    natureDefense() { return (this.battlers.geoDEF.base + this.battlers.geoDEF.bonus + this.battlers.geoDEF.battle + this.battlers.waterDEF.base + this.battlers.waterDEF.bonus + this.battlers.waterDEF.battle) / 2; }
    lifeAttack() { return (this.battlers.orderATK.base + this.battlers.orderATK.bonus + this.battlers.orderATK.battle + this.battlers.airATK.base + this.battlers.airATK.bonus + this.battlers.airATK.battle) / 2; }
    lifeDefense() { return (this.battlers.orderDEF.base + this.battlers.orderDEF.bonus + this.battlers.orderDEF.battle + this.battlers.airDEF.base + this.battlers.airDEF.bonus + this.battlers.airDEF.battle) / 2; }
    darkAttack() { return (this.battlers.waterATK.base + this.battlers.waterATK.bonus + this.battlers.waterATK.battle + this.battlers.chaosATK.base + this.battlers.chaosATK.bonus + this.battlers.chaosATK.battle) / 2; }
    darkDefense() { return (this.battlers.waterDEF.base + this.battlers.waterDEF.bonus + this.battlers.waterDEF.battle + this.battlers.chaosDEF.base + this.battlers.chaosDEF.bonus + this.battlers.chaosDEF.battle) / 2; }
    necroticAttack() { return (this.battlers.airATK.base + this.battlers.airATK.bonus + this.battlers.airATK.battle + this.battlers.fireATK.base + this.battlers.fireATK.bonus + this.battlers.fireATK.battle) / 2; }
    necroticDefense() { return (this.battlers.airDEF.base + this.battlers.airDEF.bonus + this.battlers.airDEF.battle + this.battlers.fireDEF.base + this.battlers.fireDEF.bonus + this.battlers.fireDEF.battle) / 2; }
    poisonAttack() { return (this.battlers.chaosATK.base + this.battlers.chaosATK.bonus + this.battlers.chaosATK.battle + this.battlers.geoATK.base + this.battlers.geoATK.bonus + this.battlers.geoATK.battle) / 2; }
    poisonDefense() { return (this.battlers.chaosDEF.base + this.battlers.chaosDEF.bonus + this.battlers.chaosDEF.battle + this.battlers.geoDEF.base + this.battlers.geoDEF.bonus + this.battlers.geoDEF.battle) / 2; }
    holyAttack() { return (this.battlers.fireATK.base + this.battlers.fireATK.bonus + this.battlers.fireATK.battle + this.battlers.orderATK.base + this.battlers.orderATK.bonus + this.battlers.orderATK.battle) / 2; }
    holyDefense() { return (this.battlers.fireDEF.base + this.battlers.fireDEF.bonus + this.battlers.fireDEF.battle + this.battlers.orderDEF.base + this.battlers.orderDEF.bonus + this.battlers.orderDEF.battle) / 2; }
    arcaneAttack() { return (this.battlers.orderATK.base + this.battlers.orderATK.bonus + this.battlers.orderATK.battle + this.battlers.chaosATK.base + this.battlers.chaosATK.bonus + this.battlers.chaosATK.battle + this.battlers.geoATK.base + this.battlers.geoATK.bonus + this.battlers.geoATK.battle + this.battlers.waterATK.base + this.battlers.waterATK.bonus + this.battlers.waterATK.battle + this.battlers.airATK.base + this.battlers.airATK.bonus + this.battlers.airATK.battle + this.battlers.fireATK.base + this.battlers.fireATK.bonus + this.battlers.fireATK.battle) / 6; }
    arcaneDefense() { return (this.battlers.orderDEF.base + this.battlers.orderDEF.bonus + this.battlers.orderDEF.battle + this.battlers.chaosDEF.base + this.battlers.chaosDEF.bonus + this.battlers.chaosDEF.battle + this.battlers.geoDEF.base + this.battlers.geoDEF.bonus + this.battlers.geoDEF.battle + this.battlers.waterDEF.base + this.battlers.waterDEF.bonus + this.battlers.waterDEF.battle + this.battlers.airDEF.base + this.battlers.airDEF.bonus + this.battlers.airDEF.battle + this.battlers.fireDEF.base + this.battlers.fireDEF.bonus + this.battlers.fireDEF.battle) / 6; }
    slashAttack() { return this.battlers.slash.base + this.battlers.slash.bonus + this.battlers.slash.battle; }
    slashDefense() { return this.battlers.slashDEF.base + this.battlers.slashDEF.bonus + this.battlers.slashDEF.battle; }
    pierceAttack() { return this.battlers.pierce.base + this.battlers.pierce.bonus + this.battlers.pierce.battle; }
    pierceDefense() { return this.battlers.pierceDEF.base + this.battlers.pierceDEF.bonus + this.battlers.pierceDEF.battle; }
    bluntAttack() { return this.battlers.blunt.base + this.battlers.blunt.bonus + this.battlers.blunt.battle; }
    bluntDefense() { return this.battlers.bluntDEF.base + this.battlers.bluntDEF.bonus + this.battlers.bluntDEF.battle; }
    chiWarmAttack() { return this.battlers.chiWarmATK.base + this.battlers.chiWarmATK.bonus + this.battlers.chiWarmATK.battle; }
    chiWarmDefense() { return this.battlers.chiWarmDEF.base + this.battlers.chiWarmDEF.bonus + this.battlers.chiWarmDEF.battle; }
    chiColdAttack() { return this.battlers.chiColdATK.base + this.battlers.chiColdATK.bonus + this.battlers.chiColdATK.battle; }
    chiColdDefense() { return this.battlers.chiColdDEF.base + this.battlers.chiColdDEF.bonus + this.battlers.chiColdDEF.battle; }
    chiHarmonyAttack() { return (this.battlers.chiWarmATK.base + this.battlers.chiWarmATK.bonus + this.battlers.chiWarmATK.battle + this.battlers.chiColdATK.base + this.battlers.chiColdATK.bonus + this.battlers.chiColdATK.battle) / 2; }
    chiHarmonyDefense() { return (this.battlers.chiWarmDEF.base + this.battlers.chiWarmDEF.bonus + this.battlers.chiWarmDEF.battle + this.battlers.chiColdDEF.base + this.battlers.chiColdDEF.bonus + this.battlers.chiColdDEF.battle) / 2; }
    // Record<CharacterStatusEnum, number>;
    getStats() {
        return {
            [CharacterStatusEnum.none]: 0,
            [CharacterStatusEnum.charisma]: this.charisma(),
            [CharacterStatusEnum.luck]: this.luck(),
            [CharacterStatusEnum.intelligence]: this.intelligence(),
            [CharacterStatusEnum.leadership]: this.leadership(),
            [CharacterStatusEnum.vitality]: this.vitality(),
            [CharacterStatusEnum.willpower]: this.willpower(),
            [CharacterStatusEnum.breath]: this.breath(),
            [CharacterStatusEnum.planar]: this.planar(),
            [CharacterStatusEnum.dexterity]: this.dexterity(),
            [CharacterStatusEnum.agility]: this.agility(),
            [CharacterStatusEnum.strength]: this.strength(),
            [CharacterStatusEnum.endurance]: this.endurance(),
            [CharacterStatusEnum.bareHand]: this.bareHand(),
            [CharacterStatusEnum.sword]: this.sword(),
            [CharacterStatusEnum.blade]: this.blade(),
            [CharacterStatusEnum.dagger]: this.dagger(),
            [CharacterStatusEnum.spear]: this.spear(),
            [CharacterStatusEnum.axe]: this.axe(),
            [CharacterStatusEnum.mace]: this.mace(),
            [CharacterStatusEnum.shield]: this.shield(),
            [CharacterStatusEnum.bow]: this.bow(),
            [CharacterStatusEnum.magicWand]: this.magicWand(),
            [CharacterStatusEnum.staff]: this.staff(),
            [CharacterStatusEnum.tome]: this.tome(),
            [CharacterStatusEnum.orb]: this.orb(),
            [CharacterStatusEnum.pATK]: this.pATK(),
            [CharacterStatusEnum.pHIT]: this.pHIT(),
            [CharacterStatusEnum.pCRT]: this.pCRT(),
            [CharacterStatusEnum.pDEF]: this.pDEF(),
            [CharacterStatusEnum.mATK]: this.mATK(),
            [CharacterStatusEnum.mHIT]: this.mHIT(),
            [CharacterStatusEnum.mCRT]: this.mCRT(),
            [CharacterStatusEnum.mDEF]: this.mDEF(),
            [CharacterStatusEnum.chiWarmATK]: this.chiWarmATK(),
            [CharacterStatusEnum.chiColdATK]: this.chiColdATK(),
            [CharacterStatusEnum.chiWarmDEF]: this.chiWarmDEF(),
            [CharacterStatusEnum.chiColdDEF]: this.chiColdDEF(),
            [CharacterStatusEnum.slash]: this.slash(),
            [CharacterStatusEnum.pierce]: this.pierce(),
            [CharacterStatusEnum.blunt]: this.blunt(),
            [CharacterStatusEnum.slashDEF]: this.slashDEF(),
            [CharacterStatusEnum.pierceDEF]: this.pierceDEF(),
            [CharacterStatusEnum.bluntDEF]: this.bluntDEF(),
            [CharacterStatusEnum.dodge]: this.dodge(),
            [CharacterStatusEnum.order]: this.order(),
            [CharacterStatusEnum.chaos]: this.chaos(),
            [CharacterStatusEnum.geo]: this.geo(),
            [CharacterStatusEnum.water]: this.water(),
            [CharacterStatusEnum.air]: this.air(),
            [CharacterStatusEnum.fire]: this.fire(),
            [CharacterStatusEnum.mining]: this.mining(),
            [CharacterStatusEnum.smithing]: this.smithing(),
            [CharacterStatusEnum.woodcutting]: this.woodcutting(),
            [CharacterStatusEnum.carpentry]: this.carpentry(),
            [CharacterStatusEnum.foraging]: this.foraging(),
            [CharacterStatusEnum.weaving]: this.weaving(),
            [CharacterStatusEnum.skinning]: this.skinning(),
            [CharacterStatusEnum.tanning]: this.tanning(),
            [CharacterStatusEnum.jewelry]: this.jewelry(),
            [CharacterStatusEnum.cooking]: this.cooking(),
            [CharacterStatusEnum.alchemy]: this.alchemy(),
            [CharacterStatusEnum.enchanting]: this.enchanting(),
        };
    }
    intoInterface() {
        return {
            charisma: this.charisma(),
            luck: this.luck(),
            intelligence: this.intelligence(),
            leadership: this.leadership(),
            vitality: this.vitality(),
            willpower: this.willpower(),
            breath: this.breath(),
            planar: this.planar(),
            dexterity: this.dexterity(),
            agility: this.agility(),
            strength: this.strength(),
            endurance: this.endurance(),
            bareHand: this.bareHand(),
            sword: this.sword(),
            blade: this.blade(),
            dagger: this.dagger(),
            spear: this.spear(),
            axe: this.axe(),
            mace: this.mace(),
            shield: this.shield(),
            bow: this.bow(),
            magicWand: this.magicWand(),
            staff: this.staff(),
            tome: this.tome(),
            orb: this.orb(),
            dodge: this.dodge(),
            order: this.order(),
            chaos: this.chaos(),
            geo: this.geo(),
            water: this.water(),
            air: this.air(),
            fire: this.fire(),
            mining: this.mining(),
            smithing: this.smithing(),
            woodcutting: this.woodcutting(),
            carpentry: this.carpentry(),
            foraging: this.foraging(),
            weaving: this.weaving(),
            skinning: this.skinning(),
            tanning: this.tanning(),
            jewelry: this.jewelry(),
            cooking: this.cooking(),
            alchemy: this.alchemy(),
            enchanting: this.enchanting()
        };
    }
}
