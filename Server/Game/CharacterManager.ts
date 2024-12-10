import { Character, PlayerCharacter } from "../Entities/Character/Character";
import { CharacterArchetype } from "../Entities/Character/Subclasses/CharacterArchetype";

export class CharacterManager {
    players: PlayerCharacter[] = [];
    characters: Character[] = [];
    constructor() {
        this.characters = [];
    }
    getPlayerCharacterByUserID(userID: string): PlayerCharacter {
        const player = this.players.find(p => p.userID === userID);
        if (!player) { throw new Error(`Player with ID ${userID} not found`); }
        return player;
    }
    getPlayerCharacterByCharacterID(characterID: string): PlayerCharacter {
        const player = this.players.find(p => p.id === characterID);
        if (!player) { throw new Error(`Player with ID ${characterID} not found`); }
        return player;
    }
    getCharacterByID(id: string): Character {
        const character = this.characters.find(c => c.id === id);
        if (!character) { throw new Error(`Character with ID ${id} not found`); }
        return character;
    }

    createPlayerCharacterFromData(data: CharacterArchetype): PlayerCharacter {
        let skills = [];
        for (const skillID in data.skills) {
            skills.push(skillID)
        }

        let dto = {
            gender: data.gender,
            portrait: data.portrait,
            name: data.name,
            userID: data.id,
            charisma: data.attributes.charisma.base,
            luck: data.attributes.luck.base,
            intelligence: data.attributes.intelligence.base,
            leadership: data.attributes.leadership.base,
            vitality: data.attributes.vitality.base,
            willpower: data.attributes.willpower.base,
            breath: data.attributes.breath.base,
            planar: data.attributes.planar.base,
            dexterity: data.attributes.dexterity.base,
            agility: data.attributes.agility.base,
            strength: data.attributes.strength.base,
            endurance: data.attributes.endurance.base,
            bareHand: data.proficiencies.bareHand.base,
            sword: data.proficiencies.sword.base,
            blade: data.proficiencies.blade.base,
            dagger: data.proficiencies.dagger.base,
            spear: data.proficiencies.spear.base,
            axe: data.proficiencies.axe.base,
            mace: data.proficiencies.mace.base,
            shield: data.proficiencies.shield.base,
            bow: data.proficiencies.bow.base,
            magicWand: data.proficiencies.magicWand.base,
            staff: data.proficiencies.staff.base,
            tome: data.proficiencies.tome.base,
            orb: data.proficiencies.orb.base,
            mining: data.artisans.mining.base,
            smithing: data.artisans.smithing.base,
            woodcutting: data.artisans.woodcutting.base,
            carpentry: data.artisans.carpentry.base,
            foraging: data.artisans.foraging.base,
            weaving: data.artisans.weaving.base,
            skinning: data.artisans.skinning.base,
            tanning: data.artisans.tanning.base,
            jewelry: data.artisans.jewelry.base,
            alchemy: data.artisans.alchemy.base,
            cooking: data.artisans.cooking.base,
            enchanting: data.artisans.enchanting.base,
            gold: data.gold,
        }

        return new PlayerCharacter(dto);
    }

    addPlayerCharacter(player: PlayerCharacter) {
        this.players.push(player);
    }

    // createCharacterFromData(name: string, gender: "male" | "female" | "none", archeType: CharacterArchetype): Character {
    //     return new Character(name, gender, archeType);
    // }

    addCharacter(character: Character) {
        this.characters.push(character);
    }
}