import { GameEnvironment } from "../Common/DTOsEnumsInterfaces/Map/GameEnvironment";
import { LocationName } from "../Common/DTOsEnumsInterfaces/Map/LocationNames";
import {
  ClassEnum,
  RaceEnum,
} from "../Common/RequestResponse/characterCreation";
import { Character } from "./Entities/Character/Character";
import {
  learnSkill,
  trainSkill,
} from "./Entities/Character/Utils/skillFunctions";
import { Party } from "./Entities/Party/Party";
import { Battle } from "./Game/Battle/Battle";
import { Game } from "./Game/Game";
import { BattleType } from "./Game/GameEvent/battleEvent";
import { GameTime } from "./Game/TimeAndDate/GameTime";

const game = new Game();

// Set up the characters for the tests
// partyA: Fighter, Guardian, SpellSword, Mage, Scout, Cleric
// partyB: Soldier, Templar, Skirmisher, Occultis, HexBinder, Warden
async function createPlayerCharacter(
  name: string,
  id: string,
  selectedClass: ClassEnum,
  selectedRace: RaceEnum,
) {
  const character = new Character({
    id: id,
    name: name,
    gender: "NONE",
    portrait: "NONE",
  });
  character.setBodyValue();

  for (const attribute in character.status.attributes) {
    const key = attribute as keyof typeof character.status.attributes;
    character.status.attributes[key].base = Math.floor(Math.random() * 8) + 8;
  }

  character.isDead = false;

  return character;
}

async function setUpCharacters() {
  const characters = await Promise.all([
    createPlayerCharacter("Fighter", "1", ClassEnum.FIGHTER, RaceEnum.HALF_ORC),
    createPlayerCharacter("Guardian", "2", ClassEnum.GUARDIAN, RaceEnum.HUMAN),
    createPlayerCharacter(
      "SpellBlade",
      "3",
      ClassEnum.SPELLBLADE,
      RaceEnum.HALF_ELF,
    ),
    createPlayerCharacter("Mage", "4", ClassEnum.MAGE, RaceEnum.ELVEN),
    createPlayerCharacter("Scout", "5", ClassEnum.SCOUT, RaceEnum.ELVON),
    createPlayerCharacter(
      "Cleric",
      "6",
      ClassEnum.CLERIC,
      RaceEnum.HALF_TRITON,
    ),
    createPlayerCharacter("Soldier", "7", ClassEnum.SOLDIER, RaceEnum.ORC),
    createPlayerCharacter("Templar", "8", ClassEnum.TEMPLAR, RaceEnum.DWARF),
    createPlayerCharacter(
      "Skirmisher",
      "9",
      ClassEnum.SKIRMISHER,
      RaceEnum.HALFLING,
    ),
    createPlayerCharacter(
      "Occultist",
      "10",
      ClassEnum.OCCULTIST,
      RaceEnum.HUMAN,
    ),
    createPlayerCharacter(
      "HexBinder",
      "11",
      ClassEnum.HEXBINDER,
      RaceEnum.HALF_ELF,
    ),
    createPlayerCharacter("Warden", "12", ClassEnum.WARDEN, RaceEnum.ELVEN),
  ]);

  characters.forEach((character) =>
    game.characterManager.addCharacter(character),
  );

  const fighter = game.characterManager.characters[0];
  fighter.status.attributes.strength.base = 15;
  fighter.status.attributes.dexterity.base = 12;
  fighter.status.attributes.endurance.base = 14;
  fighter.status.attributes.vitality.base = 13;
  const guardian = game.characterManager.characters[1];
  guardian.status.attributes.strength.base = 12;
  guardian.status.attributes.dexterity.base = 13;
  guardian.status.attributes.endurance.base = 15;
  guardian.status.attributes.vitality.base = 14;
  const spellBlade = game.characterManager.characters[2];
  spellBlade.status.attributes.dexterity.base = 15;
  spellBlade.status.attributes.agility.base = 13;
  spellBlade.status.attributes.planar.base = 14;
  spellBlade.status.attributes.strength.base = 12;
  const mage = game.characterManager.characters[3];
  mage.status.attributes.planar.base = 15;
  mage.status.attributes.intelligence.base = 14;
  mage.status.attributes.willpower.base = 13;
  mage.status.attributes.charisma.base = 12;
  const scout = game.characterManager.characters[4];
  scout.status.attributes.agility.base = 14;
  scout.status.attributes.dexterity.base = 15;
  scout.status.attributes.endurance.base = 13;
  scout.status.attributes.vitality.base = 12;
  const cleric = game.characterManager.characters[5];
  cleric.status.attributes.charisma.base = 15;
  cleric.status.attributes.intelligence.base = 14;
  cleric.status.attributes.willpower.base = 13;
  cleric.status.attributes.vitality.base = 12;
  const soldier = game.characterManager.characters[6];
  soldier.status.attributes.strength.base = 15;
  soldier.status.attributes.endurance.base = 14;
  soldier.status.attributes.vitality.base = 13;
  soldier.status.attributes.dexterity.base = 12;
  const templar = game.characterManager.characters[7];
  templar.status.attributes.strength.base = 12;
  templar.status.attributes.endurance.base = 15;
  templar.status.attributes.vitality.base = 14;
  templar.status.attributes.dexterity.base = 13;
  const skirmisher = game.characterManager.characters[8];
  skirmisher.status.attributes.dexterity.base = 15;
  skirmisher.status.attributes.agility.base = 13;
  skirmisher.status.attributes.planar.base = 14;
  skirmisher.status.attributes.strength.base = 12;
  const occultist = game.characterManager.characters[9];
  occultist.status.attributes.planar.base = 15;
  occultist.status.attributes.intelligence.base = 14;
  occultist.status.attributes.willpower.base = 13;
  occultist.status.attributes.charisma.base = 12;
  const hexBinder = game.characterManager.characters[10];
  hexBinder.status.attributes.charisma.base = 15;
  hexBinder.status.attributes.intelligence.base = 14;
  hexBinder.status.attributes.planar.base = 13;
  hexBinder.status.attributes.vitality.base = 12;
  const warden = game.characterManager.characters[11];
  warden.status.attributes.strength.base = 15;
  warden.status.attributes.dexterity.base = 14;
  warden.status.attributes.endurance.base = 13;
  warden.status.attributes.vitality.base = 12;
}

// Skill Learning and Training Tests
async function testSkillLearningAndTraining() {
  console.log("--- Skill Learning and Training Tests ---");
  const actor = game.characterManager.characters[0];

  learnSkill(actor, "skill_shield_basg");
  console.log("Skills after learning:", actor.skills);

  learnSkill(actor, "skill_shield_bash");
  console.log("Skills after training:", actor.skills);

  trainSkill(actor, "skill_shield_bash");
  console.log("Skills after training:", actor.skills);
}

// // Battle Tests
async function testBattle() {
  console.log("--- Battle Tests ---");
  const fighter = game.characterManager.characters[0];
  const guardian = game.characterManager.characters[1];
  const spellBlade = game.characterManager.characters[2];
  const mage = game.characterManager.characters[3];
  const scout = game.characterManager.characters[4];
  const cleric = game.characterManager.characters[5];
  const soldier = game.characterManager.characters[6];
  const templar = game.characterManager.characters[7];
  const skirmisher = game.characterManager.characters[8];
  const occultist = game.characterManager.characters[9];
  const hexBinder = game.characterManager.characters[10];
  const warden = game.characterManager.characters[11];

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
    const battle = new Battle(
      partyA,
      partyB,
      LocationName.WhiteOakEstate,
      GameTime.getCurrentGameDate(),
      BattleType.Normal,
    );
    const battleResult = battle.startBattle();
    return battleResult;
  } catch (error) {
    console.error("Error during battle:", error);
  }
}

// Main test runner
(async function runTests() {
  await game.start();
  // Make sure the character list is empty (normally it'll load from the databse, but we're not using the database here)
  game.characterManager.characters = [];

  await setUpCharacters(); // Set up characters
  // Uncomment the tests you want to run
  // await testInternalLearningAndTraining();
  // await testSkillLearningAndTraining();
  const battleResult = await testBattle();
  // console.log('Battle Result:', battleResult);

  // process.exit(0);
})();
