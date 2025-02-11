import { CharacterSkillInterface } from "Common/RequestResponse/characterWS";

export interface ChangeSkillDeckRequest {
    type: 'CHANGE_SKILL_DECK_REQUEST';
    characterID: string;
    skills: CharacterSkillInterface[];
    battleCards: {
        slot1: CharacterSkillInterface | undefined,
        slot2: CharacterSkillInterface | undefined,
        slot3: CharacterSkillInterface | undefined,
        slot4: CharacterSkillInterface | undefined,
        slot5: CharacterSkillInterface | undefined,
        slot6: CharacterSkillInterface | undefined,
        slot7: CharacterSkillInterface | undefined,
    }
}

export interface ChangeSkillDeckResponse {
    type: 'CHANGE_SKILL_DECK_RESPONSE';
    characterID: string;
    skills: CharacterSkillInterface[];
    battleCards: {
        slot1: CharacterSkillInterface | undefined,
        slot2: CharacterSkillInterface | undefined,
        slot3: CharacterSkillInterface | undefined,
        slot4: CharacterSkillInterface | undefined,
        slot5: CharacterSkillInterface | undefined,
        slot6: CharacterSkillInterface | undefined,
        slot7: CharacterSkillInterface | undefined,
    }
}