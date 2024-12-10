// import express, { Request, Response } from 'express';
// import { PlayerCharacter } from '../classes/Character/PlayerCharacter';
// import { archetype_cleric } from '../classes/Character/Subclasses/Archetypes/ArcheTypeCleric';
// import { archetype_druid } from '../classes/Character/Subclasses/Archetypes/ArcheTypeDruid';
// import { archetype_fighter } from '../classes/Character/Subclasses/Archetypes/ArcheTypeFighter';
// import { archetype_mage } from '../classes/Character/Subclasses/Archetypes/ArcheTypeMage';
// import { archetype_rogue } from '../classes/Character/Subclasses/Archetypes/ArcheTypeRogue';
// import { archetype_warlock } from '../classes/Character/Subclasses/Archetypes/ArcheTypeWarlock';
// import { archetype_GM } from '../classes/Character/Subclasses/Archetypes/TestCharacterType';
// import { game } from '../Game/Game';
// import sqlite3 from 'sqlite3';
// import { Database } from 'sqlite3';
// import { db, DB } from '../Database';

// const characterCreationRouter = express.Router();
 
// function getArchetype(archetype: 'cleric'|'druid'|'fighter'|'mage'|'rogue'|'warlock'|'GM') {
//     const allArchetype = {
//         'cleric': archetype_cleric, 
//         'druid': archetype_druid, 
//         'fighter': archetype_fighter, 
//         'mage': archetype_mage, 
//         'rogue': archetype_rogue, 
//         'warlock': archetype_warlock,
//         'GM': archetype_GM
//     }   
//     return allArchetype[archetype]
// }

// characterCreationRouter.post(`/characterCreation`, async (req: Request, res: Response) => {
//     console.log(`characterCreationRouter.post with ${req}`)
//     const { userID, name, portrait, archetype } = req.body;
//     const result = await characterService.createCharacter(userID, name, portrait, archetype);
//     res.json(result);
// });

// interface CharacterNameAlreadyExistResponse {
//     status: 'Character name already Exist.',
//     message: 'There is already a Character with that name, Please choose another name.'
// }

// interface CharacterCreatedResponse {
//     status: 'success',
//     character: PlayerCharacter
// }

// const characterServiceRouter = express.Router();
// characterServiceRouter.get(`/character/:id`, async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const character = await characterService.getCharacter(id);
//     if (character) {
//         res.json(character);
//     } else {
//         res.json({ message: 'Character not found' });
//     }
// });

// class CharacterService {
//     private db: DB;

//     constructor(db: DB) {
//         this.db = db;
//     }

//     async createCharacter(id: string, name: string, portrait: string, archetype: 'cleric' | 'fighter' | 'mage' | 'warlock' | 'rogue' | 'druid'): Promise<CharacterNameAlreadyExistResponse | CharacterCreatedResponse> {
//         const characterNameExist = await this.checkIfCharacterNameAllowed(name);
//         if (characterNameExist) {
//             return { 
//                 status: 'Character name already Exist.', 
//                 message: 'There is already a Character with that name, Please choose another name.' 
//             } as CharacterNameAlreadyExistResponse;
//         }

//         const character = new PlayerCharacter(portrait, name, getArchetype(archetype), id);
//         console.log('CharacterID' + character.characterID)
//         console.log('UserID' + character.userID)
//         //this character need to be made JSON and written on to the database/character/data
//         const characterJSON = JSON.stringify(character);
//         await this.db.writeNew('players', `characterID`, character.characterID, [
//             {key: 'characterID', data: character.characterID},
//             {key: 'data', data: characterJSON}
//         ]);
//         await this.db.writeOver('users', 'userID', id, 'characterID', character.characterID);

//         game.addPlayerCharacter(character);
//         console.log(`added character to game completed`)
//         return { status: 'success', character } as CharacterCreatedResponse;
//     }

//     async checkIfCharacterNameAllowed(name: string): Promise<boolean | null> {
//         try {
//             const row = await this.db.read('characters', 'name', name);
//             return !!row; // true if row exists, false otherwise
//         } catch (error) {
//             throw error; // Propagate the error to the caller
//         }
//     }

//     async getCharacter(id: string): Promise<PlayerCharacter | undefined> {
//         try {
//             const row = await this.db.read('characters', 'username', id);
//             if (!row) {
//                 return undefined;
//             }
//             const character = JSON.parse(row.data) as PlayerCharacter;
//             return character;
//         } catch (error) {
//             throw error;
//         }
//     }
// }

// export const characterService = new CharacterService(db);
// export default characterCreationRouter;