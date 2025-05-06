import { TraitEnum } from "../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { NecklaceEnum, RingEnum } from "../Common/DTOsEnumsInterfaces/Item/Equipment/Accessory/Enums";
import { ArmorEnum, BootsEnum, GlovesEnum, HeadwearEnum } from "../Common/DTOsEnumsInterfaces/Item/Equipment/Armor/Enums";
import { WeaponEnum } from "../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { GameEnvironment } from "../Common/DTOsEnumsInterfaces/Map/GameEnvironment";
import { LocationName } from "../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { MobCharacterEnum } from "../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import {
  ClassEnum,
  RaceEnum,
} from "../Common/RequestResponse/characterCreation";
import { Character } from "./Entities/Character/Character";
import { enemyRepositoryByType, getEnemyArchetypeByName } from "./Entities/Character/Enemy";
import { getEnemyFromRepository } from "./Entities/Character/Enemy/EnemyRepository";
import {
  learnSkill,
  trainSkill,
} from "./Entities/Character/Utils/skillFunctions";
import { bladeRepository } from "./Entities/Items/Equipments/Weapon/Blade/Repository";
import { bowRepository } from "./Entities/Items/Equipments/Weapon/Bow/Repository";
import { daggerRepository } from "./Entities/Items/Equipments/Weapon/Dagger/Repository";
import { maceRepository } from "./Entities/Items/Equipments/Weapon/Mace/Repository";
import { shieldRepository } from "./Entities/Items/Equipments/Weapon/Shield/Repository";
import { spearRepository } from "./Entities/Items/Equipments/Weapon/Spear/Repository";
import { swordRepository } from "./Entities/Items/Equipments/Weapon/Sword/Repository";
import { tomeRepository } from "./Entities/Items/Equipments/Weapon/Tome/Repository";
import { wandRepository } from "./Entities/Items/Equipments/Weapon/Wand/Repository";
import { getItem } from "./Entities/Items/Repository";
import { ResourceNameEnum } from "./Entities/Items/Resource/ResourceNameEnum";
import { Party } from "./Entities/Party/Party";
import { Trait, TraitRepository } from "./Entities/Traits/Trait";
import { Battle } from "./Game/Battle/Battle";
import { Game } from "./Game/Game";
import { BattleType } from "./Game/GameEvent/battleEvent";
import { GameTime } from "./Game/TimeAndDate/GameTime";
import * as fs from 'fs';
import * as path from 'path';

const game = new Game();

// Set up the characters for the tests
// partyA: Fighter, Guardian, SpellSword, Mage, Scout, Cleric
// partyB: Soldier, Templar, Skirmisher, Occultis, HexBinder, Warden
function createPlayerCharacter(
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

function setUpCharacters() {
  const characters = [
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
  ];

  characters.forEach((character) =>
    game.characterManager.addCharacter(character),
  );

  const fighter = game.characterManager.characters[0];
  fighter.status.attributes.strength.base = 15;
  fighter.status.attributes.dexterity.base = 12;
  fighter.status.attributes.endurance.base = 14;
  fighter.status.attributes.vitality.base = 13;
  fighter.hpUp(100);
  fighter.mpUp(100);
  fighter.spUp(100);
  fighter.equip("mainHand", swordRepository.sword_short.id);
  const guardian = game.characterManager.characters[1];
  guardian.status.attributes.strength.base = 12;
  guardian.status.attributes.dexterity.base = 13;
  guardian.status.attributes.endurance.base = 15;
  guardian.status.attributes.vitality.base = 14;
  guardian.hpUp(100);
  guardian.mpUp(100);
  guardian.spUp(100);
  guardian.equip("mainHand", bladeRepository.blade_katana.id);
  const spellBlade = game.characterManager.characters[2];
  spellBlade.status.attributes.dexterity.base = 15;
  spellBlade.status.attributes.agility.base = 13;
  spellBlade.status.attributes.planar.base = 14;
  spellBlade.status.attributes.strength.base = 12;
  spellBlade.hpUp(100);
  spellBlade.mpUp(100);
  spellBlade.spUp(100);
  spellBlade.equip("mainHand", swordRepository.sword_rapier.id);
  const mage = game.characterManager.characters[3];
  mage.status.attributes.planar.base = 15;
  mage.status.attributes.intelligence.base = 14;
  mage.status.attributes.willpower.base = 13;
  mage.status.attributes.charisma.base = 12;
  mage.hpUp(100);
  mage.mpUp(100);
  mage.spUp(100);
  mage.equip("mainHand", tomeRepository.tome_grimoire.id);
  const scout = game.characterManager.characters[4];
  scout.status.attributes.agility.base = 14;
  scout.status.attributes.dexterity.base = 15;
  scout.status.attributes.endurance.base = 13;
  scout.status.attributes.vitality.base = 12;
  scout.hpUp(100);
  scout.mpUp(100);
  scout.spUp(100);
  scout.equip("mainHand", bowRepository.bow_long.id);
  const cleric = game.characterManager.characters[5];
  cleric.status.attributes.charisma.base = 15;
  cleric.status.attributes.intelligence.base = 14;
  cleric.status.attributes.willpower.base = 13;
  cleric.status.attributes.vitality.base = 12;
  cleric.hpUp(100);
  cleric.mpUp(100);
  cleric.spUp(100);
  cleric.equip("mainHand", maceRepository.mace_morningstar.id);
  const soldier = game.characterManager.characters[6];
  soldier.status.attributes.strength.base = 15;
  soldier.status.attributes.endurance.base = 14;
  soldier.status.attributes.vitality.base = 13;
  soldier.status.attributes.dexterity.base = 12;
  soldier.hpUp(100);
  soldier.mpUp(100);
  soldier.spUp(100);
  soldier.equip("mainHand", spearRepository.spear_dory.id);
  const templar = game.characterManager.characters[7];
  templar.status.attributes.strength.base = 12;
  templar.status.attributes.endurance.base = 15;
  templar.status.attributes.vitality.base = 14;
  templar.status.attributes.dexterity.base = 13;
  templar.hpUp(100);
  templar.mpUp(100);
  templar.spUp(100);
  templar.equip("mainHand", swordRepository.sword_short.id);
  templar.equip("offHand", shieldRepository.shield_kite.id);
  const skirmisher = game.characterManager.characters[8];
  skirmisher.status.attributes.dexterity.base = 15;
  skirmisher.status.attributes.agility.base = 13;
  skirmisher.status.attributes.planar.base = 14;
  skirmisher.status.attributes.strength.base = 12;
  skirmisher.hpUp(100);
  skirmisher.mpUp(100);
  skirmisher.spUp(100);
  skirmisher.equip("mainHand", daggerRepository.dagger_stiletto.id);
  const occultist = game.characterManager.characters[9];
  occultist.status.attributes.planar.base = 15;
  occultist.status.attributes.intelligence.base = 14;
  occultist.status.attributes.willpower.base = 13;
  occultist.status.attributes.charisma.base = 12;
  occultist.hpUp(100);
  occultist.mpUp(100);
  occultist.spUp(100);
  occultist.equip("mainHand", wandRepository.wand_magic.id);
  const hexBinder = game.characterManager.characters[10];
  hexBinder.status.attributes.charisma.base = 15;
  hexBinder.status.attributes.intelligence.base = 14;
  hexBinder.status.attributes.planar.base = 13;
  hexBinder.status.attributes.vitality.base = 12;
  hexBinder.hpUp(100);
  hexBinder.mpUp(100);
  hexBinder.spUp(100);
  hexBinder.equip("mainHand", wandRepository.wand_magic.id);
  const warden = game.characterManager.characters[11];
  warden.status.attributes.strength.base = 15;
  warden.status.attributes.dexterity.base = 14;
  warden.status.attributes.endurance.base = 13;
  warden.status.attributes.vitality.base = 12;
  warden.hpUp(100);
  warden.mpUp(100);
  warden.spUp(100);
  warden.equip("mainHand", spearRepository.spear_halberd.id);

  const partyA = new Party([fighter]);
  partyA.addCharacterToParty(guardian);
  partyA.addCharacterToParty(spellBlade);
  partyA.addCharacterToParty(mage);
  partyA.addCharacterToParty(scout);
  partyA.addCharacterToParty(cleric);
  const partyB = new Party([soldier]);
  partyB.addCharacterToParty(templar);
  partyB.addCharacterToParty(skirmisher);
  partyB.addCharacterToParty(occultist);
  partyB.addCharacterToParty(hexBinder);
  partyB.addCharacterToParty(warden);

  game.partyManager.addParty(partyA);
  game.partyManager.addParty(partyB);
}

// Skill Learning and Training Tests
async function testSkillLearningAndTraining() {
  console.log("--- Skill Learning and Training Tests ---");
  const actor = game.characterManager.characters[0];

  learnSkill(actor, "skill_power_strike");
  console.log("Skills after learning:", actor.skills);

  trainSkill(actor, "skill_power_strike");
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

  // console.log(`Party-A: ${partyA}`);
  // game.partyManager.parties.push(partyA);
  // game.partyManager.parties.push(partyB);

  const partyA = game.partyManager.parties[0];
  const partyB = game.partyManager.parties[1];

  const battle = new Battle(
    partyA,
    partyB,
    LocationName.WhiteOakEstate,
    GameTime.getCurrentGameDate(),
    BattleType.Normal,
  );

  battle.startBattle();

  // try {
  //   const battle = new Battle(
  //     partyA,
  //     partyB,
  //     LocationName.WhiteOakEstate,
  //     GameTime.getCurrentGameDate(),
  //     BattleType.Normal,
  //   );
  //   const battleResult = battle.startBattle();
  //   return battleResult;
  // } catch (error) {
  //   console.error("Error during battle:", error);
  // }
}

async function testGetTraits() {
  let allTraitsCounter = 0;
  let allMissingTraitsCounter = 0;
  let allTraits = TraitEnum;
  for (const trait in allTraits) {
    allTraitsCounter++;
    let isFound = false;
    Object.values(TraitRepository).forEach((t: Trait) => {
      if (t.id === trait) {
        isFound = true;
      }
    });
    if (!isFound) {
      allMissingTraitsCounter++;
      console.log(`${trait} not found`)
    };
  }
  console.log(`All traits: ${allTraitsCounter}`);
  console.log(`All missing traits: ${allMissingTraitsCounter}`);
}

async function testResourceRepository() {
  let allResourcesCounter = 0;
  let allMissingResourcesCounter = 0;
  for (const resource in ResourceNameEnum) {
    allResourcesCounter++;
    const resourceObject = getItem(resource);
    if (!resourceObject) {
      allMissingResourcesCounter++;
      console.log(`${resource} not found`);
    }
  }
  console.log(`All resources: ${allResourcesCounter}`);
  console.log(`All missing resources: ${allMissingResourcesCounter}`);
}

async function testEnemyRepository() {
  let allEnemiesCounter = 0;
  let allMissingEnemiesCounter = 0;
  for (const mob in MobCharacterEnum) {
    allEnemiesCounter++;
    const enemy = getEnemyArchetypeByName(mob);
    if (!enemy) {
      allMissingEnemiesCounter++;
      console.log(`${mob} not found`);
    }
  }
  console.log(`All enemies: ${allEnemiesCounter}`);
  console.log(`All missing enemies: ${allMissingEnemiesCounter}`);
}

async function testEquipmentRepository() {
  let allEquipmentCounter = 0;
  let allMissingEquipmentCounter = 0;
  const equipmentList = [NecklaceEnum, ArmorEnum, WeaponEnum, HeadwearEnum, GlovesEnum, BootsEnum, RingEnum];
  function check(list: any) {
    for (const equipment in list) {
      allEquipmentCounter++;
      const equipmentObject = getItem(equipment);
      if (!equipmentObject) {
        allMissingEquipmentCounter++;
        console.log(`${equipment} not found`);
      }
    }
    console.log(`All equipment: ${allEquipmentCounter}`);
    console.log(`All missing equipment: ${allMissingEquipmentCounter}`);
  }
  for (const list of equipmentList) {
    check(list);
  }
}

// Generic repository test function
async function testRepository(
  enumObj: any, 
  finderFn: (key: string) => any, 
  repositoryName: string
) {
  let allItemsCounter = 0;
  let missingItems: string[] = [];
  
  for (const item in enumObj) {
    allItemsCounter++;
    const foundItem = finderFn(item);
    if (!foundItem) {
      missingItems.push(item);
      console.log(`${item} not found in ${repositoryName} repository`);
    }
  }
  
  console.log(`All ${repositoryName} items: ${allItemsCounter}`);
  console.log(`Missing ${repositoryName} items: ${missingItems.length}`);
  
  // Write missing items to a file
  if (missingItems.length > 0) {
    const content = `Missing ${repositoryName} items (${missingItems.length}/${allItemsCounter}):\n${missingItems.join('\n')}`;
    const filePath = path.join(__dirname, `../Server/TestResults/missing_${repositoryName.toLowerCase()}_items.txt`);
    fs.writeFileSync(filePath, content);
    console.log(`Missing ${repositoryName} items written to ${filePath}`);
  }
  
  return {
    total: allItemsCounter,
    missing: missingItems.length,
    missingItems
  };
}

// Test all repositories in one go
async function testAllRepositories() {
  console.log("\n--- Repository Tests ---");
  
  // Test traits
  await testRepository(
    TraitEnum, 
    (trait) => Object.values(TraitRepository).find((t: Trait) => t.id === trait),
    "Trait"
  );
  
  // Test resources
  await testRepository(
    ResourceNameEnum,
    (resource) => getItem(resource),
    "Resource"
  );
  
  // Test enemies
  await testRepository(
    MobCharacterEnum,
    (mob) => getEnemyArchetypeByName(mob),
    "Enemy"
  );
  
  // Test equipment by category
  const equipmentCategories = [
    { enum: NecklaceEnum, name: "Necklace" },
    { enum: ArmorEnum, name: "Armor" },
    { enum: WeaponEnum, name: "Weapon" },
    { enum: HeadwearEnum, name: "Headwear" },
    { enum: GlovesEnum, name: "Gloves" },
    { enum: BootsEnum, name: "Boots" },
    { enum: RingEnum, name: "Ring" }
  ];
  
  let allEquipment = 0;
  let allMissingEquipment = 0;
  const allMissingEquipmentItems: string[] = [];
  
  for (const category of equipmentCategories) {
    const result = await testRepository(
      category.enum,
      (item) => getItem(item),
      category.name
    );
    
    allEquipment += result.total;
    allMissingEquipment += result.missing;
    allMissingEquipmentItems.push(...result.missingItems);
  }
  
  console.log(`\nAll equipment items: ${allEquipment}`);
  console.log(`All missing equipment items: ${allMissingEquipment}`);
  
  // Write comprehensive equipment missing items to a file
  if (allMissingEquipmentItems.length > 0) {
    const content = `Missing equipment items (${allMissingEquipment}/${allEquipment}):\n${allMissingEquipmentItems.join('\n')}`;
    const filePath = path.join(__dirname, '../Server/TestResults/missing_all_equipment_items.txt');
    fs.writeFileSync(filePath, content);
    console.log(`Missing all equipment items written to ${filePath}`);
  }
}

// Main test runner
(async function runTests() {
  await game.start();
  // Make sure the character list is empty (normally it'll load from the databse, but we're not using the database here)
  // game.characterManager.characters = [];

  // setUpCharacters(); // Set up characters
  // Uncomment the tests you want to run
  // await testInternalLearningAndTraining();
  // testSkillLearningAndTraining();
  // const battleResult = await testBattle();
  // console.log('Battle Result:', battleResult);

  // Run the consolidated repository tests
  await testAllRepositories();

  process.exit(0);
})();
