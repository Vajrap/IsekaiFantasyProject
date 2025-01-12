export interface CreateCharacterRequest {
    characterName: string;
    portrait: string;
    race: string;
    className: string;
    background: string;
    gender: 'MALE' | 'FEMALE';
    userID: string;
};

export enum CharacterCreationResponseStatus {
    SUCCESS = 'SUCCESS',
    FATAL_ERROR = 'FATAL_ERROR',
    FAILED = 'FAILED',
};

export interface CreateCharacterResponse {
    status: CharacterCreationResponseStatus;
    message: string;
    characterId?: string;
};

export interface CharacterAttributesInterface {
    charisma: number;
    luck: number;
    intelligence: number;
    leadership: number;
    vitality: number;
    willpower: number;
    breath: number;
    planar: number;
    dexterity: number;
    agility: number;
    strength: number;
    endurance: number;
}

export interface CharacterProficienciesInterface {
    bareHand: number;
    sword: number;
    blade: number;
    dagger: number;
    spear: number;
    axe: number;
    mace: number;
    shield: number;
    bow: number;
    magicWand: number;
    staff: number;
    tome: number;
    orb: number;
}

export interface CharacterArtisansInterface {
    mining: number;
    smithing: number;
    woodcutting: number;
    carpentry: number;
    foraging: number;
    weaving: number;
    skinning: number;
    tanning: number;
    jewelry: number;
    cooking: number;
    alchemy: number;
    enchanting: number;
}

export enum BackgroundEnum {
    MAGE_APPRENTICE = 'MAGE_APPRENTICE',
    DESERTED_MILITARY = 'DESERTED_MILITARY',
    TAVERN_BRAWLER = 'TAVERN_BRAWLER',
    FALLEN_NOBILITY = 'FALLEN_NOBILITY',
    MERCS_CHILD = 'MERCS_CHILD',
    TRAINEE_IN_CARAVAN = 'TRAINEE_IN_CARAVAN',
    WANDERING_MUSICIAN = 'WANDERING_MUSICIAN',
    APPRENTICE_SCRIBE = 'APPRENTICE_SCRIBE',
    ABANDONED_FARMHAND = 'ABANDONED_FARMHAND',
    STREET_URCHIN = 'STREET_URCHIN',
    FAILED_CRAFTSMAN = 'FAILED_CRAFTSMAN',
    INNKEEPERS_CHILD = 'INNKEEPERS_CHILD',

    // MAGE_APPRENTICE = 'เด็กฝึกเวทย์',
    // DESERTED_MILITARY = 'ทหารหนีทัพ',
    // TAVERN_BRAWLER = 'ขี้เมา',
    // FALLEN_NOBILITY = 'คนเคยรวย',
    // MERCS_CHILD = 'ลูกทหารรับจ้าง',
    // TRAINEE_IN_CARAVAN = 'เด็กในคาราวานค้าขาย',
    // WANDERING_MUSICIAN = 'นักดนตรีพเนจร',
    // APPRENTICE_SCRIBE = 'อาลักษณ์ฝึกหัด',
    // ABANDONED_FARMHAND = 'ชาวนาทอดทิ้งสวน',
    // STREET_URCHIN = 'เด็กข้่างถนน',
    // FAILED_CRAFTSMAN = 'ช่างที่ล้มเหลว',
    // INNKEEPERS_CHILD = 'ลูกของเจ้าของโรงแรม',
}   

export enum ClassEnum {
    CLERIC = 'CLERIC',
    MAGE = 'MAGE',
    SCOUT = 'SCOUT',
    HEXBINDER = 'HEXBINDER',
    FIGHTER = 'FIGHTER',
    WARDEN = 'WARDEN',
    GUARDIAN = 'GUARDIAN',
    SPELLBLADE = 'SPELLBLADE',
    SKIRMISHER = 'SKIRMISHER',
    OCCULTIST = 'OCCULTIST',
    SOLDIER = 'SOLDIER',
    TEMPLAR = 'TEMPLAR',
}

export enum RaceEnum {
    HUMAN = 'HUMAN',
    ELVEN = 'ELVEN',
    ORC = 'ORC',
    TRITON = 'TRITON',
    DWARF = 'DWARF',
    HALFLING = 'HALFLING',
    HALF_ELF = 'HALF_ELF',
    HALF_ORC = 'HALF_ORC',
    HALF_TRITON = 'HALF_TRITON',
    DWARFLING = 'DWARFLING',
    ELVON = 'ELVON',

    // HUMAN = 'มนุษย์',
    // ELVEN = 'เอลฟ์',
    // ORC = 'ออร์ค',
    // TRITON = 'คนเงือก',
    // DWARF = 'คนแคระ',
    // HALFLING = 'ฮาล์ฟลิง',
    // HALF_ELF = 'ครึ่งเอลฟ์',
    // HALF_ORC = 'ครึ่งออร์ค',
    // HALF_TRITON = 'ครึ่งคนเงือก',
    // DWARFLING = 'ดวาร์ฟลิง',
    // ELVON = 'เอลวอน',

    // Monster
    GOBLIN = 'GOBLIN',
    KOBOLD = 'KOBOLD',
    FELINE = 'FELINE',
    CANINE = 'CANINE',
    AVIAN = 'AVIAN',
    INSECT = 'INSECT',
    REPTILE = 'REPTILE',
    AQUATIC = 'AQUATIC',
    PLANT = 'PLANT',
    DRAGON = 'DRAGON',
    GIANT = 'GIANT',
    ELEMENTAL = 'ELEMENTAL',
    CELESTIAL = 'CELESTIAL',
    CONSTRUCT = 'CONSTRUCT',
    OOZE = 'OOZE',
    SPIRIT = 'SPIRIT',
    MONSTROSITY = 'MONSTROSITY',
    FIEND = 'FIEND',
    DEMON = 'DEMON',
    UNDEAD = 'UNDEAD',
    TROLL = 'TROLL',

    // Undefined
    UNDEFINED = 'UNDEFINED'
}