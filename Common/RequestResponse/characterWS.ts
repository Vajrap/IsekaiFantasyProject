import { SkillConsumeInterface, SkillProduceInterface } from "Common/DTOsEnumsInterfaces/Skill/Consume+Produce";

export interface GetPartyRequest {
    type: 'GET_PARTY';
    partyID: string;
}

export interface GetPartyResponse {
    type: 'GET_PARTY';
    status: 'SUCCESS' | 'FAILURE';
    message: string;
    party?: PartyInterface;
}

export interface PartyInterface {
    partyID: string;
    location: string;
    isTraveling: boolean;
    characters: (CharacterInterface | "none")[]; // Simplified character data for each party member
    actionsSequence: string[]; // List of action names or enums
    actionsList: { [time: number]: string | null }; // Action schedule
}

export interface UpdatePartyActionsRequest {
    type: 'UPDATE_PARTY_ACTIONS';
    partyID: string;
    actions: { [time: number]: string | null }; // Updated action schedule
}

export interface UpdatePartyActionsResponse {
    type: 'UPDATE_PARTY_ACTIONS_RESPONSE';
    status: 'SUCCESS' | 'FAILURE';
    message: string;
}

// PlayerCharacter request-response scope
export interface GetCharacterRequest {
    type: 'GET_CHARACTER';
    userID: string;
}

export interface GetCharacterResponse {
    type: 'GET_CHARACTER_RESPONSE';
    status: 'SUCCESS' | 'FAILURE';
    message: string;
    character?: CharacterInterface;
}

export interface UpdateSkillListRequest {
    type: 'UPDATE_SKILL_LIST';
    userID: string;
    skills: string[]; // Array of all skills in the current list, Only push skillID to this array
    activeSkills: string[]; // Array of all active skills
};

export interface UpdateSkillListResponse {
    type: 'UPDATE_SKILL_LIST_RESPONSE';
    status: 'SUCCESS' | 'FAILURE';
    message: string;
    character: CharacterInterface; // Optionally return the updated character
};

// Modules
export interface CharacterInterface {
    id: string;
    partyID: string;
    name: string;
    type: string | undefined;
    gender: "MALE" | "FEMALE" | "NONE" | undefined;
    portrait: string;
    background: string;
    race: string;
    alignment: string;
    mood: number;
    energy: number;
    fame: number;
    level: number;
    gold: number;
    isDead: boolean;
    status: CharacterStatusInterface;
    equipment: CharacterEquipmentInterface;
    internals: CharacterInternalInterface[];
    activeInternal: CharacterInternalInterface;
    traits: CharacterTraitInterface[];
    skills: CharacterSkillInterface[];
    activeSkills: CharacterSkillInterface[];
    position: number;
    itemsBag: CharacterItemInBag[];
    arcaneAptitude: string;
    bagSize: number;
    currentHP: number;
    maxHP: number;
    currentMP: number;
    maxMP: number;
    currentSP: number;
    maxSP: number;
}

export interface CharacterStatusInterface {
    charisma: number;
    luck: number;
    intelligence: number;
    leadership: number;
    vitality: number;
    willpower: number;
    breath: number;
    planar: number;
    dexterity: number;
    agility: number;
    strength: number;
    endurance: number;
    bareHand: number;
    sword: number;
    blade: number;
    dagger: number;
    spear: number;
    axe: number;
    mace: number;
    shield: number;
    bow: number;
    magicWand: number;
    staff: number;
    tome: number;
    orb: number;
    dodge: number;
    mining: number;
    smithing: number;
    woodcutting: number;
    carpentry: number;
    foraging: number;
    weaving: number;
    skinning: number;
    tanning: number;
    jewelry: number;
    cooking: number;
    alchemy: number;
    enchanting: number;
    order: number;
    chaos: number;
    geo: number;
    water: number;
    air: number;
    fire: number;
}

export interface CharacterSkillInterface {
    id: string;
    name: string;
    level: number;
    description: string;
    tier: string;
    consume: SkillConsumeInterface;
    produce: SkillProduceInterface;
    isSpell: boolean;
};

export interface CharacterItemInBag {
    id: string;
    name: string;
    description: string;
    quantity: number;
};

export interface CharacterEquipmentInterface {
    mainHand: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    offHand: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    armor: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    headwear: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    gloves: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    boots: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    necklace: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    ring_R: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
    ring_L: {id: string, name: string, cost: number, weight: number, description: string}|undefined;
};

export interface CharacterInternalInterface {
    id: string;
    name: string;
    level: number;
    description: string;
    tier: string;
};

export interface CharacterTraitInterface {
    id: string;
    name: string;
    description: string;
};
