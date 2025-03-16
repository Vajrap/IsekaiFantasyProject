import { Party } from "../../Entities/Party/Party";
import { Dice } from "../../Utility/Dice";

export function event_rest_camp(party: Party): void {
    let useItem = false;
    if (party.behavior.useCampSupplies && party.inventory['campSupplies'] > 0) {
        party.inventory['campSupplies'] -= 1;
        useItem = true;
    }
    apply_rest_benefits(party, useItem ? 1.1 : 1.0);
}

export function event_rest_house(party: Party): void {
    apply_rest_benefits(party, 1.3);
}

export function event_rest_inn_poor(party: Party): void {
    if (party.gold >= 5) {
        party.gold -= 5;
        apply_rest_benefits(party, 1.2);
    }
}

export function event_rest_inn_comfortable(party: Party): void {
    if (party.gold >= 15) {
        party.gold -= 15;
        apply_rest_benefits(party, 1.4);
    }
}

export function event_rest_inn_luxury(party: Party): void {
    if (party.gold >= 30) {
        party.gold -= 30;
        apply_rest_benefits(party, 1.6);
    }
}

export function event_rest_inn_premium(party: Party): void {
    if (party.gold >= 50) {
        party.gold -= 50;
        apply_rest_benefits(party, 2.0);
    }
}

function apply_rest_benefits(party: Party, restFactor: number): void {
    for (const actor of party.characters) {
        if (!actor || actor === "none") continue;
        
        actor.hpUp(actor.maxHP()! * (Dice.rollTwenty() / 15) * restFactor);
        actor.mpUp(actor.maxMP()! * (Dice.rollTwenty() / 15) * restFactor);
        actor.spUp(actor.maxSP()! * (Dice.rollTwenty() / 15) * restFactor);
        actor.moodUp(Math.max(Math.floor((Dice.rollTwenty() + actor.attribute("willpower") / 2) * restFactor), 0));
        actor.energyUp(Math.max(Math.floor((Dice.rollTwenty() / 5 + actor.attribute("vitality") / 2) * restFactor), 0));
    }
}
