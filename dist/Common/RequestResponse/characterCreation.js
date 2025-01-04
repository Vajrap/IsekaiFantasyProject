;
export var CharacterCreationResponseStatus;
(function (CharacterCreationResponseStatus) {
    CharacterCreationResponseStatus["SUCCESS"] = "SUCCESS";
    CharacterCreationResponseStatus["FATAL_ERROR"] = "FATAL_ERROR";
    CharacterCreationResponseStatus["FAILED"] = "FAILED";
})(CharacterCreationResponseStatus || (CharacterCreationResponseStatus = {}));
;
;
export var BackgroundEnum;
(function (BackgroundEnum) {
    // MAGE_APPRENTICE = 'MAGE_APPRENTICE',
    // DESERTED_MILITARY = 'DESERTED_MILITARY',
    // TAVERN_BRAWLER = 'TAVERN_BRAWLER',
    // FALLEN_NOBILITY = 'FALLEN_NOBILITY',
    // MERCS_CHILD = 'MERCS_CHILD',
    // TRAINEE_IN_CARAVAN = 'TRAINEE_IN_CARAVAN',
    // WANDERING_MUSICIAN = 'WANDERING_MUSICIAN',
    // APPRENTICE_SCRIBE = 'APPRENTICE_SCRIBE',
    // ABANDONED_FARMHAND = 'ABANDONED_FARMHAND',
    // STREET_URCHIN = 'STREET_URCHIN',
    // FAILED_CRAFTSMAN = 'FAILED_CRAFTSMAN',
    // INNKEEPERS_CHILD = 'INNKEEPERS_CHILD',
    BackgroundEnum["MAGE_APPRENTICE"] = "\u0E40\u0E14\u0E47\u0E01\u0E1D\u0E36\u0E01\u0E40\u0E27\u0E17\u0E22\u0E4C";
    BackgroundEnum["DESERTED_MILITARY"] = "\u0E17\u0E2B\u0E32\u0E23\u0E2B\u0E19\u0E35\u0E17\u0E31\u0E1E";
    BackgroundEnum["TAVERN_BRAWLER"] = "\u0E02\u0E35\u0E49\u0E40\u0E21\u0E32";
    BackgroundEnum["FALLEN_NOBILITY"] = "\u0E04\u0E19\u0E40\u0E04\u0E22\u0E23\u0E27\u0E22";
    BackgroundEnum["MERCS_CHILD"] = "\u0E25\u0E39\u0E01\u0E17\u0E2B\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E08\u0E49\u0E32\u0E07";
    BackgroundEnum["TRAINEE_IN_CARAVAN"] = "\u0E40\u0E14\u0E47\u0E01\u0E43\u0E19\u0E04\u0E32\u0E23\u0E32\u0E27\u0E32\u0E19\u0E04\u0E49\u0E32\u0E02\u0E32\u0E22";
    BackgroundEnum["WANDERING_MUSICIAN"] = "\u0E19\u0E31\u0E01\u0E14\u0E19\u0E15\u0E23\u0E35\u0E1E\u0E40\u0E19\u0E08\u0E23";
    BackgroundEnum["APPRENTICE_SCRIBE"] = "\u0E2D\u0E32\u0E25\u0E31\u0E01\u0E29\u0E13\u0E4C\u0E1D\u0E36\u0E01\u0E2B\u0E31\u0E14";
    BackgroundEnum["ABANDONED_FARMHAND"] = "\u0E0A\u0E32\u0E27\u0E19\u0E32\u0E17\u0E2D\u0E14\u0E17\u0E34\u0E49\u0E07\u0E2A\u0E27\u0E19";
    BackgroundEnum["STREET_URCHIN"] = "\u0E40\u0E14\u0E47\u0E01\u0E02\u0E49\u0E48\u0E32\u0E07\u0E16\u0E19\u0E19";
    BackgroundEnum["FAILED_CRAFTSMAN"] = "\u0E0A\u0E48\u0E32\u0E07\u0E17\u0E35\u0E48\u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27";
    BackgroundEnum["INNKEEPERS_CHILD"] = "\u0E25\u0E39\u0E01\u0E02\u0E2D\u0E07\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E42\u0E23\u0E07\u0E41\u0E23\u0E21";
})(BackgroundEnum || (BackgroundEnum = {}));
export var ClassEnum;
(function (ClassEnum) {
    ClassEnum["CLERIC"] = "CLERIC";
    ClassEnum["MAGE"] = "MAGE";
    ClassEnum["SCOUT"] = "SCOUT";
    ClassEnum["HEXBINDER"] = "HEXBINDER";
    ClassEnum["FIGHTER"] = "FIGHTER";
    ClassEnum["WARDEN"] = "WARDEN";
    ClassEnum["GUARDIAN"] = "GUARDIAN";
    ClassEnum["SPELLBLADE"] = "SPELLBLADE";
    ClassEnum["SKIRMISHER"] = "SKIRMISHER";
    ClassEnum["OCCULTIST"] = "OCCULTIST";
    ClassEnum["SOLDIER"] = "SOLDIER";
    ClassEnum["TEMPLAR"] = "TEMPLAR";
})(ClassEnum || (ClassEnum = {}));
export var RaceEnum;
(function (RaceEnum) {
    // HUMAN = 'HUMAN',
    // ELVEN = 'ELVEN',
    // ORC = 'ORC',
    // TRITON = 'TRITON',
    // DWARF = 'DWARF',
    // HALFLING = 'HALFLING',
    // HALF_ELF = 'HALF_ELF',
    // HALF_ORC = 'HALF_ORC',
    // HALF_TRITON = 'HALF_TRITON',
    // DWARFLING = 'DWARFLING',
    // ELVON = 'ELVON',
    RaceEnum["HUMAN"] = "\u0E21\u0E19\u0E38\u0E29\u0E22\u0E4C";
    RaceEnum["ELVEN"] = "\u0E40\u0E2D\u0E25\u0E1F\u0E4C";
    RaceEnum["ORC"] = "\u0E2D\u0E2D\u0E23\u0E4C\u0E04";
    RaceEnum["TRITON"] = "\u0E04\u0E19\u0E40\u0E07\u0E37\u0E2D\u0E01";
    RaceEnum["DWARF"] = "\u0E04\u0E19\u0E41\u0E04\u0E23\u0E30";
    RaceEnum["HALFLING"] = "\u0E2E\u0E32\u0E25\u0E4C\u0E1F\u0E25\u0E34\u0E07";
    RaceEnum["HALF_ELF"] = "\u0E04\u0E23\u0E36\u0E48\u0E07\u0E40\u0E2D\u0E25\u0E1F\u0E4C";
    RaceEnum["HALF_ORC"] = "\u0E04\u0E23\u0E36\u0E48\u0E07\u0E2D\u0E2D\u0E23\u0E4C\u0E04";
    RaceEnum["HALF_TRITON"] = "\u0E04\u0E23\u0E36\u0E48\u0E07\u0E04\u0E19\u0E40\u0E07\u0E37\u0E2D\u0E01";
    RaceEnum["DWARFLING"] = "\u0E14\u0E27\u0E32\u0E23\u0E4C\u0E1F\u0E25\u0E34\u0E07";
    RaceEnum["ELVON"] = "\u0E40\u0E2D\u0E25\u0E27\u0E2D\u0E19";
    // Monster
    RaceEnum["GOBLIN"] = "GOBLIN";
    RaceEnum["KOBOLD"] = "KOBOLD";
    RaceEnum["FELINE"] = "FELINE";
    RaceEnum["CANINE"] = "CANINE";
    RaceEnum["AVIAN"] = "AVIAN";
    RaceEnum["INSECT"] = "INSECT";
    RaceEnum["REPTILE"] = "REPTILE";
    RaceEnum["AQUATIC"] = "AQUATIC";
    RaceEnum["PLANT"] = "PLANT";
    RaceEnum["DRAGON"] = "DRAGON";
    RaceEnum["GIANT"] = "GIANT";
    RaceEnum["ELEMENTAL"] = "ELEMENTAL";
    RaceEnum["CELESTIAL"] = "CELESTIAL";
    RaceEnum["CONSTRUCT"] = "CONSTRUCT";
    RaceEnum["OOZE"] = "OOZE";
    RaceEnum["SPIRIT"] = "SPIRIT";
    RaceEnum["MONSTROSITY"] = "MONSTROSITY";
    RaceEnum["FIEND"] = "FIEND";
    RaceEnum["DEMON"] = "DEMON";
    RaceEnum["UNDEAD"] = "UNDEAD";
    RaceEnum["TROLL"] = "TROLL";
    // Undefined
    RaceEnum["UNDEFINED"] = "UNDEFINED";
})(RaceEnum || (RaceEnum = {}));
