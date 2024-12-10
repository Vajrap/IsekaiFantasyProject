import { CharacterClass, class_cleric, class_fighter, class_guardian, class_hexbinder, class_mage, class_occultist, class_scout, class_skirmisher, class_soldier, class_spellblade, class_templar, class_warden, ClassEnum } from "./API/Routes/CreateCharacter/ClassEnum";
import { RaceEnum } from "./API/Routes/CreateCharacter/RaceEnum";
import { db } from "./Database";
import { SkillEnum } from "./Database/Skill/skill";
import { PlayerCharacter, setCharacterStatus } from "./Entities/Character/Character";
import { InternalRepository } from "./Entities/Internal/Internal";
import { GearInstance } from "./Entities/Items/GearInstance/GearInstance";
import { Party } from "./Entities/Party/Party";
import { game } from "./server";

// Set up the characters for the tests
// partyA: Fighter, Guardian, SpellSword, Mage, Scout, Cleric
// partyB: Soldier, Templar, Skirmisher, Occultis, HexBinder, Warden
async function createPlayerCharacter(name: string, userID: string, selectedClass: ClassEnum, selectedRace: RaceEnum) {
    const character = new PlayerCharacter({
        gender: 'none',
        portrait: 'none',
        name: name,
        userID: userID,
        charisma: 8,
        luck: 8,
        intelligence: 8,
        leadership: 8,
        vitality: 8,
        willpower: 8,
        breath: 8,
        planar: 8,
        strength: 8,
        dexterity: 8,
        agility: 8,
        endurance: 8,
        bareHand: 8,
        sword: 8,
        blade: 8,
        dagger: 8,
        spear: 8,
        axe: 8,
        mace: 8,
        shield: 8,
        bow: 8,
        magicWand: 8,
        staff: 8,
        tome: 8,
        orb: 8,
        mining: 8,
        smithing: 8,
        woodcutting: 8,
        carpentry: 8,
        foraging: 8,
        weaving: 8,
        skinning: 8,
        tanning: 8,
        jewelry: 8,
        alchemy: 8,
        cooking: 8,
        enchanting: 8,
        selectedClass: selectedClass,
        selectedRace: selectedRace,
    })
    character.setBodyValue();
    character.isDead = false;
    
    if (selectedClass) {
        await setCharacterStatus(character, selectedClass, selectedRace);
    }

    return character;
}

async function setUpCharacters() {
    console.log('Setting up characters...');

    const characters = await Promise.all([
        createPlayerCharacter('Fighter', '1', ClassEnum.FIGHTER, RaceEnum.HALF_ORC),
        createPlayerCharacter('Guardian', '2', ClassEnum.GUARDIAN, RaceEnum.HUMAN),
        createPlayerCharacter('SpellBlade', '3', ClassEnum.SPELLBLADE, RaceEnum.HALF_ELF),
        createPlayerCharacter('Mage', '4', ClassEnum.MAGE, RaceEnum.ELVEN),
        createPlayerCharacter('Scout', '5', ClassEnum.SCOUT, RaceEnum.ELVON),
        createPlayerCharacter('Cleric', '6', ClassEnum.CLERIC, RaceEnum.HALF_TRITON),
        createPlayerCharacter('Soldier', '7', ClassEnum.SOLDIER, RaceEnum.ORC),
        createPlayerCharacter('Templar', '8', ClassEnum.TEMPLAR, RaceEnum.DWARF),
        createPlayerCharacter('Skirmisher', '9', ClassEnum.SKIRMISHER, RaceEnum.HALFLING),
        createPlayerCharacter('Occultist', '10', ClassEnum.OCCULTIST, RaceEnum.HUMAN),
        createPlayerCharacter('HexBinder', '11', ClassEnum.HEXBINDER, RaceEnum.HALF_ELF),
        createPlayerCharacter('Warden', '12', ClassEnum.WARDEN, RaceEnum.ELVEN),
    ]);

    characters.forEach(character => game.characterManager.addPlayerCharacter(character));

    const fighter = game.characterManager.players[0];
    fighter.status.attributes.strength.base = 15;
    fighter.status.attributes.dexterity.base = 12;
    fighter.status.attributes.endurance.base = 14;
    fighter.status.attributes.vitality.base = 13;
    const guardian = game.characterManager.players[1];
    guardian.status.attributes.strength.base = 12;
    guardian.status.attributes.dexterity.base = 13;
    guardian.status.attributes.endurance.base = 15;
    guardian.status.attributes.vitality.base = 14;
    const spellBlade = game.characterManager.players[2];
    spellBlade.status.attributes.dexterity.base = 15;
    spellBlade.status.attributes.agility.base = 13;
    spellBlade.status.attributes.planar.base = 14;
    spellBlade.status.attributes.strength.base = 12;
    const mage = game.characterManager.players[3];
    mage.status.attributes.planar.base = 15;
    mage.status.attributes.intelligence.base = 14;
    mage.status.attributes.willpower.base = 13;
    mage.status.attributes.charisma.base = 12;
    const scout = game.characterManager.players[4];
    scout.status.attributes.agility.base = 14;
    scout.status.attributes.dexterity.base = 15;
    scout.status.attributes.endurance.base = 13;
    scout.status.attributes.vitality.base = 12;
    const cleric = game.characterManager.players[5];
    cleric.status.attributes.charisma.base = 15;
    cleric.status.attributes.intelligence.base = 14;
    cleric.status.attributes.willpower.base = 13;
    cleric.status.attributes.vitality.base = 12;
    const soldier = game.characterManager.players[6];
    soldier.status.attributes.strength.base = 15;
    soldier.status.attributes.endurance.base = 14;
    soldier.status.attributes.vitality.base = 13;
    soldier.status.attributes.dexterity.base = 12;
    const templar = game.characterManager.players[7];
    templar.status.attributes.strength.base = 12;
    templar.status.attributes.endurance.base = 15;
    templar.status.attributes.vitality.base = 14;
    templar.status.attributes.dexterity.base = 13;
    const skirmisher = game.characterManager.players[8];
    skirmisher.status.attributes.dexterity.base = 15;
    skirmisher.status.attributes.agility.base = 13;
    skirmisher.status.attributes.planar.base = 14;
    skirmisher.status.attributes.strength.base = 12;
    const occultist = game.characterManager.players[9];
    occultist.status.attributes.planar.base = 15;
    occultist.status.attributes.intelligence.base = 14;
    occultist.status.attributes.willpower.base = 13;
    occultist.status.attributes.charisma.base = 12;
    const hexBinder = game.characterManager.players[10];
    hexBinder.status.attributes.charisma.base = 15;
    hexBinder.status.attributes.intelligence.base = 14;
    hexBinder.status.attributes.planar.base = 13;
    hexBinder.status.attributes.vitality.base = 12;
    const warden = game.characterManager.players[11];
    warden.status.attributes.strength.base = 15;
    warden.status.attributes.dexterity.base = 14;
    warden.status.attributes.endurance.base = 13;
    warden.status.attributes.vitality.base = 12;

    console.log('Characters setup complete.');
}



// Internal Learning and Training Tests
async function testInternalLearningAndTraining() {
    console.log('--- Internal Learning and Training Tests ---');
    const actor = game.characterManager.players[0];

    for (const attribute in actor.status.attributes) {
        console.log(`PRE: ${attribute}: ${actor.status.attributes[attribute as keyof typeof actor.status.attributes].base + actor.status.attributes[attribute as keyof typeof actor.status.attributes].bonus}`);
    }

    actor.learnInternal(InternalRepository.internalCold.id);

    for (let i = 0; i < 10; i++) {
        actor.trainInternal(InternalRepository.internalCold.id, 10000);
    }

    for (const attribute in actor.status.attributes) {
        console.log(`BEFORE ACTIVE: ${attribute}: ${actor.status.attributes[attribute as keyof typeof actor.status.attributes].base + actor.status.attributes[attribute as keyof typeof actor.status.attributes].bonus}`);
    }

    actor.chooseActiveInternal(InternalRepository.internalCold.id);

    for (const attribute in actor.status.attributes) {
        console.log(`AFTER ACTIVE: ${attribute}: ${actor.status.attributes[attribute as keyof typeof actor.status.attributes].base + actor.status.attributes[attribute as keyof typeof actor.status.attributes].bonus}`);
    }

    actor.removeActiveInternal();

    for (const attribute in actor.status.attributes) {
        console.log(`AFTER REMOVE: ${attribute}: ${actor.status.attributes[attribute as keyof typeof actor.status.attributes].base + actor.status.attributes[attribute as keyof typeof actor.status.attributes].bonus}`);
    }

    actor.chooseActiveInternal(InternalRepository.internalCold.id);
}

// Skill Learning and Training Tests
async function testSkillLearningAndTraining() {
    console.log('--- Skill Learning and Training Tests ---');
    const actor = game.characterManager.players[0];

    await actor.learnSkill(SkillEnum.skill_shield_bash);
    console.log('Skills after learning:', actor.skills);

    actor.trainSkill(SkillEnum.skill_shield_bash, 10000);
    console.log('Skills after training:', actor.skills);

    actor.moveCardToBattle(SkillEnum.skill_shield_bash);
    console.log('Skills in battle:', actor.activeSkills);

    const res = actor.validateActiveSkills();
    console.log('Validate Active Skills Result:', res);
}

// Battle Tests
async function testBattle() {
    console.log('--- Battle Tests ---');
    const fighter = game.characterManager.players[0];
    const guardian = game.characterManager.players[1];
    const spellBlade = game.characterManager.players[2];
    const mage = game.characterManager.players[3];
    const scout = game.characterManager.players[4];
    const cleric = game.characterManager.players[5];
    const soldier = game.characterManager.players[6];
    const templar = game.characterManager.players[7];
    const skirmisher = game.characterManager.players[8];
    const occultist = game.characterManager.players[9];
    const hexBinder = game.characterManager.players[10];
    const warden = game.characterManager.players[11];
   

    const partyA = new Party([fighter]);
    await partyA.addCharacterToParty(guardian);
    await partyA.addCharacterToParty(spellBlade);
    await partyA.addCharacterToParty(mage);
    await partyA.addCharacterToParty(scout);
    await partyA.addCharacterToParty(cleric);
    const partyB = new Party([soldier]);
    await partyB.addCharacterToParty(templar);
    await partyB.addCharacterToParty(skirmisher);
    await partyB.addCharacterToParty(occultist);
    await partyB.addCharacterToParty(hexBinder);
    await partyB.addCharacterToParty(warden);

    game.partyManager.parties.push(partyA);
    game.partyManager.parties.push(partyB);

    try {
        const battleResult = await game.battles.startNewBattle(partyA, partyB, 'locA', 'envA', game.gameTime);
        console.log('Turns of Battle:', battleResult.toJSON().battleTurn.length);
    } catch (error) {
        console.error('Error during battle:', error);
    }
}

// Main test runner
(async function runTests() {
    await setUpCharacters();  // Set up characters
    // Uncomment the tests you want to run
    // await testInternalLearningAndTraining();
    // await testSkillLearningAndTraining();
    await testBattle();

    // process.exit(0);
})();