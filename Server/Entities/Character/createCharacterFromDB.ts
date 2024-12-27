import { CharacterDB } from "../../Database/Character/CharacterDB";
import { TraitRepository } from "../Traits/Trait";
import { Character } from "./Character";
import { CharacterAlignment } from "./Subclasses/CharacterAlignment";
import { CharacterEquipments } from "./Subclasses/CharacterEquipments";
import { CharacterStatus } from "./Subclasses/CharacterStatus";


export async function createCharacterFromDB(dbCharacter: CharacterDB): Promise<Character> {
    const character = new Character({
        id: dbCharacter.id,
        name: dbCharacter.name,
        gender: dbCharacter.gender,
        portrait: dbCharacter.portrait,
    });

    character.partyID = dbCharacter.partyID;
    character.type = dbCharacter.type;
    character.background = dbCharacter.background;
    character.race = dbCharacter.race;
    character.alignment = new CharacterAlignment({
        law: dbCharacter.alignment.law,
        chaos: dbCharacter.alignment.chaos,
        good: dbCharacter.alignment.good,
        evil: dbCharacter.alignment.evil,
    });
    character.mood = dbCharacter.mood;
    character.energy = dbCharacter.energy;
    character.fame = dbCharacter.fame;
    character.level = dbCharacter.level;
    character.gold = dbCharacter.gold;
    character.exp = dbCharacter.exp;
    character.isDead = dbCharacter.isDead;
    character.lastTarget = dbCharacter.lastTarget;
    character.raceHP = dbCharacter.raceHP;
    character.raceMP = dbCharacter.raceMP;
    character.raceSP = dbCharacter.raceSP;
    character.baseHP = dbCharacter.baseHP;
    character.baseMP = dbCharacter.baseMP;
    character.baseSP = dbCharacter.baseSP;
    character.bonusHP = dbCharacter.bonusHP;
    character.bonusMP = dbCharacter.bonusMP;
    character.bonusSP = dbCharacter.bonusSP;
    character.currentHP = dbCharacter.currentHP;
    character.currentMP = dbCharacter.currentMP;
    character.currentSP = dbCharacter.currentSP;
    character.status = new CharacterStatus();
    character.status.attributes = dbCharacter.status.attributes;
    character.status.proficiencies = dbCharacter.status.proficiencies;
    character.status.battlers = dbCharacter.status.battlers;
    character.status.artisans = dbCharacter.status.artisans;
    character.status.elements = dbCharacter.status.elements;

    character.equipments = new CharacterEquipments();

    if (dbCharacter.equipments.mainHand) { await character.equip("mainHand", dbCharacter.equipments.mainHand) }
    if (dbCharacter.equipments.offHand) { await character.equip("offHand", dbCharacter.equipments.offHand) }
    if (dbCharacter.equipments.armor) { await character.equip("armor", dbCharacter.equipments.armor) }
    if (dbCharacter.equipments.cloth) { await character.equip("cloth", dbCharacter.equipments.cloth) }
    if (dbCharacter.equipments.headWear) { await character.equip("headWear", dbCharacter.equipments.headWear) }
    if (dbCharacter.equipments.necklace) { await character.equip("necklace", dbCharacter.equipments.necklace) }
    if (dbCharacter.equipments.ring) { await character.equip("ring", dbCharacter.equipments.ring) }

    if (dbCharacter.traits.length > 0) { 
        for (const trait of dbCharacter.traits) {
            const traitInstance = TraitRepository[trait as keyof typeof TraitRepository];
            if (!traitInstance) {
                throw new Error(`Trait ${trait} not found in TraitRepository`);
            }
            character.gainTrait(traitInstance);
        }
    }

    character.position = dbCharacter.position;
    character.baseAC = dbCharacter.baseAC;
    character.location = dbCharacter.location;
    character.isSummoned = dbCharacter.isSummoned;
    character.arcaneAptitude.aptitude = dbCharacter.arcaneAptitude;
    character.bagSize = dbCharacter.bagSize;
    character.storyFlags = dbCharacter.storyFlags;

    // TODO: Item look up.
    // TODO: Skill Implementation still in progress
    // TODO: Internal Implementation still in progress
    // TODO: Relation Implementation still in progress

    return character;
}
