export interface CreateCharacterRequest {
    characterName: string;
    portrait: string;
    race: string;
    class: string;
    background: string;
};

export enum CharacterCreationResponseStatus {
    SUCCESS = 'SUCCESS',
    INVALID_NAME = 'INVALID_NAME',
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
    woodCutting: number;
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
    MAGE_APPRENTICE = 'เด็กฝึกเวทย์',
    DESERTED_MILITARY = 'ทหารหนีทัพ',
    TAVERN_BRAWLER = 'นักสู้ในร้านเหล้า',
    FALLEN_NOBILITY = 'ลูกหลานตระกูลดัง',
    MERCS_CHILD = 'ลูกทหารรับจ้าง',
    TRAINEE_IN_CARAVAN = 'เด็กฝึกงานในขบวนพ่อค้า',
    WANDERING_MUSICIAN = 'นักดนตรีพเนจร',
    APPRENTICE_SCRIBE = 'ผู้ช่วยจดบันทึก',
    ABANDONED_FARMHAND = 'เด็กฟาร์มที่ถูกทอดทิ้ง',
    STREET_URCHIN = 'เด็กเร่ร่อนในเมือง',
    FAILED_CRAFTSMAN = 'ช่างฝึกหัด',
    INNKEEPERS_CHILD = 'ลูกเจ้าของโรงแรม',
}

export enum ClassEnum {
    CLERIC = 'นักบวช',
    MAGE = 'จอมเวท',
    SCOUT = 'นักสอดแนม',
    HEXBINDER = 'นักผูกคำสาป',
    FIGHTER = 'นักสู้',
    WARDEN = 'ดรูอิด',
    GUARDIAN = 'ผู้พิทักษ์',
    SPELLBLADE = 'นักดาบเวท',
    SKIRMISHER = 'นักลอบโจมตี',
    OCCULTIST = 'นักอาคม',
    SOLDIER = 'นักรบ',
    TEMPLAR = 'นักรบศักดิ์สิทธิ์',
}

export enum RaceEnum {
    HUMAN = 'มนุษย์',
    ELVEN = 'เอลฟ์',
    ORC = 'ออร์ค',
    TRITON = 'ไทรทัน',
    DWARF = 'ดวอร์ฟ',
    HALFLING = 'ฮาล์ฟลิ่ง',
    HALF_ELF = 'ครึ่งเอลฟ์',
    HALF_ORC = 'ครึ่งออร์ค',
    HALF_TRITON = 'ครึ่งไทรทัน',
    DWARFLING = 'ดวอร์ฟลิ่ง',
    ELVON = 'เอลวอน',

    // Monster
    GOBLIN = 'ก๊อบลิน',
    KOBOLD = 'โคโบลด์',
    FELINE = 'เฟลีน',
    CANINE = 'เคนีน',
    AVIAN = 'สัตว์ปีก',
    INSECT = 'แมลง',
    REPTILE = 'สัตว์เลื้อยคลาน',
    AQUATIC = 'สัตว์น้ำ',
    PLANT = 'พืช',
    DRAGON = 'มังกร',
    GIANT = 'ยักษ์',
    ELEMENTAL = 'ธาตุ',
    CELESTIAL = 'เทวทูต',
    CONSTRUCT = 'สิ่งก่อสร้าง',
    OOZE = 'เมือก',
    SPIRIT = 'วิญญาณ',
    MONSTROSITY = 'สัตว์ประหลาด',
    FIEND = 'อสูร',
    DEMON = 'ปีศาจ',
    UNDEAD = 'ผีดิบ',
    TROLL = 'โทรล',

    // 
    UNDEFINED = 'ไม่ระบุ'
}