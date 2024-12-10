// import { StatMod } from "../Utility/StatMod";
// import { gameEvent_houseRest, gameEvent_innRest, gameEvent_rest } from "../GameEvent/GameEvent";

// export class LocationAction {
//     //since Location are village, town, city, etc which is a big idea for the place, some locationAction then named like a place in that location.
//     name: string;
//     description: string;
//     action: (...args: any[]) => void;
//     constructor(name: string, description: string, action: (...args: any[]) => void) {
//         this.name = name;
//         this.description = description;
//         this.action = action;
//     }
// }

// export class LocationActionRepository {
//     //Normal LocationActions that can be performed in any location
//     static moveIn: LocationAction 
//     static moveOut: LocationAction
//     //Resting LocationActions, would help replenish health and mana.
//     static rest: LocationAction //Free rest, at some special locations, provide some restoration, can trigger some events.
//     static inn: LocationAction //Rest at an inn, costs money, most normal way to rest own no home, effect like rest.
//     static camping: LocationAction //Rest in the wild, free but dangerous. If own a camping gear, it would be safer and restore more.
//     static houseRest: LocationAction //Rest at own house, fully restore health and mana, remove curse, free. But you need to own a house first.

//     //Shop LocationActions
//     static blacksmith: LocationAction //Sell and buy weapons
//     static apothecary: LocationAction //Sell and buy potions
//     static tailor: LocationAction // Sell and buy clothes
//     static armorer: LocationAction // Sell and buy armor and shields
//     static jeweler: LocationAction // Sell and buy jewelry
//     static arcanist: LocationAction // Sell and buy magical items
//     static grocery: LocationAction // Sell and buy food and ingredients (Cooked food can't be carried in your bag! so you have to cook and eat it on the spot!)
//     static tavern: LocationAction // A place to drink and eat, restore some health and mood, cost money and can trigger some dialogue.

//     //Religious LocationActions
//     //Heaven's Decree see all gods as one, projection on the True God, got persecuted.
//     static heavensDecreeMeeting: LocationAction
//     //Laoh is the god of Order, main Religion of the Empire, see all other gods as inferior. Associated with Order, Law, Justice and Light.
//     static churchOfLaoh: LocationAction
//     static greatTempleOfLaoh: LocationAction
//     //Cult of Nizarith is the god of Chaos, also need to be secretive. Associated with Chaos, Void, Darkness and Death.
//     static cultOfNizarith: LocationAction
//     //Gelthoran god of Earth. Associated with Earth, Nature, Growth, Life, Balance and Harmony.
//     static shrineOfGelthoran: LocationAction
//     static majorShrineOfGelthoran: LocationAction
//     //Aqorath god of Water. Associated with Water, Change, Time, Knowledge and Magic.
//     static shrineOfAqorath: LocationAction
//     static majorShrineOfAqorath: LocationAction
//     //Valthoria god of Air. Associated with Air, Freedom, Travel, Creativity, Music and Love.
//     static shrineOfValthoria: LocationAction
//     static majorShrineOfValthoria: LocationAction
//     //Pyrnthanas god of Fire. Associated with Fire, Passion, Destruction, War, Pride and Power.
//     static shrineOfPyrnthanas: LocationAction
//     static majorShrineOfPyrnthanas: LocationAction

//     //Special LocationActions
//     //Quests
//     static barrack: LocationAction //Join the army, get money and fame, learn some combat skills.
//     static knightOrder: LocationAction //Join the knight order, get money and fame, learn some combat skills, only available in big cities, need certain reputation.
//     static magicSchool: LocationAction //small magic school, teach some low level magic.
//     static magicAcademy: LocationAction //Main magical school in the continent, hard to access, teach lots of standard magic.
//     static churchOfLaohMagicLearning: LocationAction //Teach divine magic, available only in the church of Laoh.
//     static cultOfNizarithMagicLearning: LocationAction //Teach dark magic, available only in the cult of Nizarith.    

//     static adventureGuild: LocationAction //Get quests, sell loot, get information, etc.
//     static bountyBoard: LocationAction //Get bounty quests, kill bandits, monsters, etc.
//     static arena: LocationAction //Fight in the arena, get money and fame.
// }

// LocationActionRepository.moveOut = new LocationAction(
//     'Move Out', 
//     'Move out of this location', 
//     (location: GameLocation, party: Party, characterID: string) => {
//         for (const character in party.characters) {
//             if (character !== null) {
//                 location.characterMoveOut(characterID);
//             }
//         }
//     }
// );

// LocationActionRepository.moveIn = new LocationAction(
//     'Move In', 
//     'Move in to this location', 
//     (location: GameLocation, party: Party, characterID: string) => {
//         for (const character in party.characters) {
//             if (character !== null) {
//                 location.characterMoveIn(characterID);
//             }
//         }
//     }
// );

// LocationActionRepository.rest = new LocationAction(
//     `Rest`,
//     `Rest in the wilderness, can restore health mana stamina energy and mood, free but dangerous.`,
//     (location: GameLocation, party: Party, characterID: string) => {
//         const highestLuck = party.characters.reduce((acc, char) => char != null && acc < char.status.attributes.luck.base ? char.status.attributes.luck.base : acc, 0)
//         let randomEvent = location.region.getRandomEvent('rest', StatMod.value(highestLuck))
//         if (randomEvent) {
//             randomEvent.execute({ party: party, actor: characterID })
//         }
//         gameEvent_rest.execute({party: party })
//     }
// )

// LocationActionRepository.inn = new LocationAction(
//     `Rest at Inn`,
//     `Rest at an inn, costs some money.`,
//     (location: GameLocation, party: Party, costPerRoom: number, roomSize: number, characterID: string) => {
//         const playerCharacter = party.getPlayerCharacter()

//         if (playerCharacter != null){
//             let partySize = 0;
//             for (const character of party.characters) {
//                 if (character != null && character != undefined) {
//                     partySize++;
//                 }
//             }

//             let roomNeededForParty = Math.ceil(partySize / roomSize)
//             let cost = costPerRoom * roomNeededForParty

//             if (playerCharacter != null && playerCharacter != undefined) {
//                 if (playerCharacter.gold >= cost) {
//                     playerCharacter.gold -= cost
//                     gameEvent_innRest.execute({ party: party })
//                 }
//             } else {

//             }
//         } else {
//             throw new Error('Player character is not in the party')
//         }
//     }
// )

// LocationActionRepository.houseRest = new LocationAction(
//     `Rest at Own House`,
//     `Rest at your own house, fully restore health mana stamina energy and mood.`,
//     (location: GameLocation, party: Party, characterID: string) => {
//         gameEvent_houseRest.execute({ party: party })
//     }
// )

