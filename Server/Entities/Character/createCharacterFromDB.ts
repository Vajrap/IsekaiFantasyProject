import { CharacterDB } from "../../Database/Character/CharacterDB";
import { skillRepository } from "../Skills/SkillRepository";
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
    character.satiety = dbCharacter.satiety;
    character.fame = dbCharacter.fame;
    character.level = dbCharacter.level;
    character.gold = dbCharacter.gold;
    character.statTracker = dbCharacter.exp;
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

    if (dbCharacter.equipments.mainHand !== null) { await character.equip("mainHand", dbCharacter.equipments.mainHand) }
    if (dbCharacter.equipments.offHand !== null) { await character.equip("offHand", dbCharacter.equipments.offHand) }
    if (dbCharacter.equipments.armor  !== null) { await character.equip("armor", dbCharacter.equipments.armor) }
    if (dbCharacter.equipments.headwear !== null) { await character.equip("headwear", dbCharacter.equipments.headwear) }
    if (dbCharacter.equipments.gloves !== null) { await character.equip("gloves", dbCharacter.equipments.gloves) }
    if (dbCharacter.equipments.boots !== null) { await character.equip("boots", dbCharacter.equipments.boots) }
    if (dbCharacter.equipments.necklace !== null) { await character.equip("necklace", dbCharacter.equipments.necklace) }
    if (dbCharacter.equipments.ring_R !== null) { await character.equip("ring_R", dbCharacter.equipments.ring_R) }
    if (dbCharacter.equipments.ring_L !== null) { await character.equip("ring_L", dbCharacter.equipments.ring_L) }

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
    for (const skill of dbCharacter.skills) {
        const skillObj = await skillRepository.getSkill(skill.skill);
        character.skills.push({
            skill: skillObj,
            level: skill.level,
            exp: skill.exp,
        })
    };

    for (const skill of dbCharacter.activeSkills) {
        const skillObj = await skillRepository.getSkill(skill.skill);
        character.activeSkills.push({
            skill: skillObj,
            level: skill.level,
            exp: skill.exp,
        })
    }

    // TODO: Item look up.
    // TODO: Internal Implementation still in progress
    // TODO: Relation Implementation still in progress

    return character;
}
