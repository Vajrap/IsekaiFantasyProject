import { Party } from "../../Entities/Party/Party";
import { Dice } from "../../Utility/Dice";
import { screamer } from "../../Utility/Screamer/Screamer";
import { REST_EVENT, RestEventEnum } from "../../../Common/DTOsEnumsInterfaces/Events/RestEvents";

function screamRestEvent(party: Party, restType: RestEventEnum): void {
    screamer.scream(
        REST_EVENT,
        {
            type: restType,
            party: party.intoInterface(),
        }
    );
}

export function event_rest_force(party: Party): void {
    apply_rest_benefits(party, 1.0);
    screamRestEvent(party, RestEventEnum.REST);
}

export function event_rest_camp(party: Party): void {
    let useItem = false;
    let restType = RestEventEnum.CAMP_NO_SUPPLY;

    if (party.behavior.useCampSupplies && party.inventory['campSupplies'] > 0) {
        party.inventory['campSupplies'] -= 1;
        useItem = true;
        restType = RestEventEnum.CAMP_SUPPLY;
    }
    apply_rest_benefits(party, useItem ? 1.2 : 1.0);
    screamRestEvent(party, restType);
}

export function event_rest_house(party: Party): void {
    apply_rest_benefits(party, 1.4);
    screamRestEvent(party, RestEventEnum.HOUSE);
}

export function event_rest_inn_poor(party: Party): void {
    const totalCost = calculateRoomCost(100, party); // Adjusted to 100 copper per room
    if (party.gold >= totalCost) {
        party.gold -= totalCost;
        apply_rest_benefits(party, 1.2);
        screamRestEvent(party, RestEventEnum.INN_POOR);
    } else {
        event_rest_force(party);
    }
}

export function event_rest_inn_comfortable(party: Party): void {
    const totalCost = calculateRoomCost(300, party); // Adjusted to 300 copper per room
    if (party.gold >= totalCost) {
        party.gold -= totalCost;
        apply_rest_benefits(party, 1.4);
        screamRestEvent(party, RestEventEnum.INN_COMFORTABLE);
    } else {
        event_rest_force(party);
    }
}

export function event_rest_inn_luxury(party: Party): void {
    const totalCost = calculateRoomCost(2000, party); // Adjusted to 2000 copper per room
    if (party.gold >= totalCost) {
        party.gold -= totalCost;
        apply_rest_benefits(party, 1.7);
        screamRestEvent(party, RestEventEnum.INN_LUXURY);
    } else {
        event_rest_force(party);
    }
}

export function event_rest_inn_premium(party: Party): void {
    const totalCost = calculateRoomCost(5000, party); // Adjusted to 5000 copper per room
    if (party.gold >= totalCost) {
        party.gold -= totalCost;
        apply_rest_benefits(party, 2.0);
        screamRestEvent(party, RestEventEnum.INN_PREMIUM);
    } else {
        event_rest_force(party);
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

function calculateRoomCost(cost: number, party: Party): number {
    let allCharacters = 0;
    for (const character of party.characters) {
        if (character !== "none") {
            allCharacters++;
        }
    }
    return Math.ceil(allCharacters / 2) * cost;
}