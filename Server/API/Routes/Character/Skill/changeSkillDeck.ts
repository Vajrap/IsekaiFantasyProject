// import { game } from "../../../../Game/Game";
// import { ChangeSkillDeckRequest, ChangeSkillDeckResponse } from "../../../../../Common/DTOsEnumsInterfaces/Character/ChangeSkillREQRES";

// export async function changeSkillDeck(payload: ChangeSkillDeckRequest): Promise<ChangeSkillDeckResponse> {
//     let character = game.characterManager.getCharacterByID(payload.characterID);
//     // Reset character skill deck before modifying it    
//     for (const skill of [...character.activeSkills]) {
//         await character.moveCardToSkills(skill.skill.id);
//     }

//     // Move selected skills to battle deck
//     if (payload.battleCards.slot1 !== undefined) { await character.moveCardToBattle(payload.battleCards.slot1.id) }
//     if (payload.battleCards.slot2 !== undefined) { await character.moveCardToBattle(payload.battleCards.slot2.id) }
//     if (payload.battleCards.slot3 !== undefined) { await character.moveCardToBattle(payload.battleCards.slot3.id) }
//     if (payload.battleCards.slot4 !== undefined) { await character.moveCardToBattle(payload.battleCards.slot4.id) }
//     if (payload.battleCards.slot5 !== undefined) { await character.moveCardToBattle(payload.battleCards.slot5.id) }
//     if (payload.battleCards.slot6 !== undefined) { await character.moveCardToBattle(payload.battleCards.slot6.id) }
//     if (payload.battleCards.slot7 !== undefined) { await character.moveCardToBattle(payload.battleCards.slot7.id) }
    

//     return {
//         type: 'CHANGE_SKILL_DECK_RESPONSE',
//         characterID: character.id,
//         skills: payload.skills,
//         battleCards: payload.battleCards
//     };
// }
