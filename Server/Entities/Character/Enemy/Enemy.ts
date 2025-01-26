import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { WeaponEnum } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { ItemResourceEnum } from "../../../Database/Item/Resource/resource";
import { Character } from "../../../Entities/Character/Character";
import { CharacterArchetype } from "../../../Entities/Character/Subclasses/CharacterArchetype";
import { CharacterStatus } from "../Subclasses/CharacterStatus";
import { CharacterType } from "../Subclasses/CharacterType";

// TODO: Add item dropList?

export function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export class EnemyArchetype {
    name: MobCharacterEnum;
    gender: "MALE" | "FEMALE" | "NONE";
    type: CharacterType;
    level: number;
    race: RaceEnum;
    alignment: { good: number, evil: number, law: number, chaos: number };
    HPrange: { min: number, max: number };
    MPrange: { min: number, max: number };
    SPrange: { min: number, max: number };
    attributeRange: { [key: string]: { min: number, max: number } };
    proficiencyRange: { [key: string]: { min: number, max: number } };
    battlerRange: { [key: string]: { min: number, max: number } };
    elementRange: { [key: string]: { min: number, max: number } };
    artisanRange: { [key: string]: { min: number, max: number } };
    traits: TraitEnum[];
    activeSkills: { skillID: string, level: number }[];
    equipments: {
        mainHand: string | null;
        offHand: string | null;
        cloth: string | null;
        headWear: string | null;
        armor: string | null;
        necklace: string | null;
        ring: string | null;
    };
    baseACRange: { min: number, max: number };
    arcaneAptitudeRange: { min: number, max: number };
    givenExp: number;
    givenGold: number;
    dropList: { itemID: string, chance: number }[];
    isBoss: boolean = false;
    preferredPosition: 'front' | 'back' | 'any';

    constructor(data: {
        name: MobCharacterEnum;
        type: CharacterType;
        gender?: "MALE" | "FEMALE" | "NONE";
        level?: number;
        race?: RaceEnum;
        alignment?: { good: number, evil: number, law: number, chaos: number };
        HPrange?: { min: number, max: number };
        MPrange?: { min: number, max: number };
        SPrange?: { min: number, max: number };
        attributeRange?: { [key: string]: { min: number, max: number } };
        proficiencyRange?: { [key: string]: { min: number, max: number } };
        battlerRange?: { [key: string]: { min: number, max: number } };
        elementRange?: { [key: string]: { min: number, max: number } };
        artisanRange?: { [key: string]: { min: number, max: number } };
        traits?: TraitEnum[];
        activeSkills?: { skillID: string, level: number }[];
        equipments?: {
            mainHand?: string | null;
            offHand?: string | null;
            cloth?: string | null;
            headWear?: string | null;
            armor?: string | null;
            necklace?: string | null;
            ring?: string | null;
        };
        baseACRange?: { min: number, max: number };
        arcaneAptitudeRange?: { min: number, max: number };
        givenExpRange?: { min: number, max: number };
        givenGoldRange?: { min: number, max: number };
        dropList?: { itemID: ItemResourceEnum | WeaponEnum , chance: number }[];
        isBoss?: boolean;
        preferredPosition?: 'front' | 'back' | 'any';
    }) {
        this.name = data.name;
        this.type = data.type;
        this.gender = data.gender ?? "NONE";
        this.level = data.level ?? 1;
        this.race = data.race ?? RaceEnum.UNDEFINED;
        this.alignment = data.alignment ?? { good: 0, evil: 0, law: 0, chaos: 0 };
        this.HPrange = data.HPrange ?? { min: 10, max: 20 };
        this.MPrange = data.MPrange ?? { min: 5, max: 15 };
        this.SPrange = data.SPrange ?? { min: 5, max: 15 };
        this.attributeRange = data.attributeRange ?? {};
        this.proficiencyRange = data.proficiencyRange ?? {};
        this.battlerRange = data.battlerRange ?? {};
        this.elementRange = data.elementRange ?? {};
        this.artisanRange = data.artisanRange ?? {};
        this.traits = data.traits ?? [];
        this.activeSkills = data.activeSkills ?? [];
        this.equipments = {
            mainHand: data.equipments?.mainHand ?? null,
            offHand: data.equipments?.offHand ?? null,
            cloth: data.equipments?.cloth ?? null,
            headWear: data.equipments?.headWear ?? null,
            armor: data.equipments?.armor ?? null,
            necklace: data.equipments?.necklace ?? null,
            ring: data.equipments?.ring ?? null,
        };
        this.baseACRange = data.baseACRange ?? { min: 5, max: 10 };
        this.arcaneAptitudeRange = data.arcaneAptitudeRange ?? { min: 0, max: 10 };
        this.givenExp = this.generateFromRangeNoKey(data.givenExpRange ?? { min: 0, max: 1 });
        this.givenGold = this.generateFromRangeNoKey(data.givenGoldRange ?? { min: 0, max: 1 });
        this.dropList = data.dropList ?? [];
        this.isBoss = data.isBoss ?? false;
        this.preferredPosition = data.preferredPosition ?? 'any';
    }

    createEnemy(description: string, portrait: string): Enemy {
        const attributes = {
            charisma: { base: this.generateFromRange(this.attributeRange).charisma, exp: 0, bonus: 0, battle: 0 },
            luck: { base: this.generateFromRange(this.attributeRange).luck, exp: 0, bonus: 0, battle: 0 },
            intelligence: { base: this.generateFromRange(this.attributeRange).intelligence, exp: 0, bonus: 0, battle: 0 },
            leadership: { base: this.generateFromRange(this.attributeRange).leadership, exp: 0, bonus: 0, battle: 0 },
            vitality: { base: this.generateFromRange(this.attributeRange).vitality, exp: 0, bonus: 0, battle: 0 },
            willpower: { base: this.generateFromRange(this.attributeRange).willpower, exp: 0, bonus: 0, battle: 0 },
            breath: { base: this.generateFromRange(this.attributeRange).breath, exp: 0, bonus: 0, battle: 0 },
            planar: { base: this.generateFromRange(this.attributeRange).planar, exp: 0, bonus: 0, battle: 0 },
            dexterity: { base: this.generateFromRange(this.attributeRange).dexterity, exp: 0, bonus: 0, battle: 0 },
            agility: { base: this.generateFromRange(this.attributeRange).agility, exp: 0, bonus: 0, battle: 0 },
            strength: { base: this.generateFromRange(this.attributeRange).strength, exp: 0, bonus: 0, battle: 0 },
            endurance: { base: this.generateFromRange(this.attributeRange).endurance, exp: 0, bonus: 0, battle: 0 }
        };
        const proficiencies = {
            bareHand: { base: this.generateFromRange(this.proficiencyRange).bareHand, exp: 0, bonus: 0 , battle: 0 },
            sword: { base: this.generateFromRange(this.proficiencyRange).sword, exp: 0, bonus: 0 , battle: 0 },
            blade: { base: this.generateFromRange(this.proficiencyRange).blade, exp: 0, bonus: 0 , battle: 0 },
            dagger: { base: this.generateFromRange(this.proficiencyRange).dagger, exp: 0, bonus: 0 , battle: 0 },
            spear: { base: this.generateFromRange(this.proficiencyRange).spear, exp: 0, bonus: 0 , battle: 0 },
            axe: { base: this.generateFromRange(this.proficiencyRange).axe, exp: 0, bonus: 0 , battle: 0 },
            mace: { base: this.generateFromRange(this.proficiencyRange).mace, exp: 0, bonus: 0 , battle: 0 },
            shield: { base: this.generateFromRange(this.proficiencyRange).shield, exp: 0, bonus: 0 , battle: 0 },
            bow: { base: this.generateFromRange(this.proficiencyRange).bow, exp: 0, bonus: 0 , battle: 0 },
            magicWand: { base: this.generateFromRange(this.proficiencyRange).magicWand, exp: 0, bonus: 0 , battle: 0 },
            staff: { base: this.generateFromRange(this.proficiencyRange).staff, exp: 0, bonus: 0 , battle: 0 },
            tome: { base: this.generateFromRange(this.proficiencyRange).tome, exp: 0, bonus: 0 , battle: 0 },
            orb: { base: this.generateFromRange(this.proficiencyRange).orb, exp: 0, bonus: 0 , battle: 0 }
        };
        const battlers = {
            pATK: { base: this.generateFromRange(this.battlerRange).pATK, exp: 0, bonus: 0 , battle: 0 },
            pHIT: { base: this.generateFromRange(this.battlerRange).pHIT, exp: 0, bonus: 0 , battle: 0 },
            pCRT: { base: this.generateFromRange(this.battlerRange).pCRT, exp: 0, bonus: 0 , battle: 0 },
            pDEF: { base: this.generateFromRange(this.battlerRange).pDEF, exp: 0, bonus: 0 , battle: 0 },
            mATK: { base: this.generateFromRange(this.battlerRange).mATK, exp: 0, bonus: 0 , battle: 0 },
            mHIT: { base: this.generateFromRange(this.battlerRange).mHIT, exp: 0, bonus: 0 , battle: 0 },
            mCRT: { base: this.generateFromRange(this.battlerRange).mCRT, exp: 0, bonus: 0 , battle: 0 },
            mDEF: { base: this.generateFromRange(this.battlerRange).mDEF, exp: 0, bonus: 0 , battle: 0 },
            chiWarmATK: { base: this.generateFromRange(this.battlerRange).chiWarmATK, exp: 0, bonus: 0 , battle: 0 },
            chiColdATK: { base: this.generateFromRange(this.battlerRange).chiColdATK, exp: 0, bonus: 0 , battle: 0 },
            chiWarmDEF: { base: this.generateFromRange(this.battlerRange).chiWarmDEF, exp: 0, bonus: 0 , battle: 0 },
            chiColdDEF: { base: this.generateFromRange(this.battlerRange).chiColdDEF, exp: 0, bonus: 0 , battle: 0 },
            slash: { base: this.generateFromRange(this.battlerRange).slash, exp: 0, bonus: 0 , battle: 0 },
            pierce: { base: this.generateFromRange(this.battlerRange).pierce, exp: 0, bonus: 0 , battle: 0 },
            blunt: { base: this.generateFromRange(this.battlerRange).blunt, exp: 0, bonus: 0 , battle: 0 },
            slashDEF: { base: this.generateFromRange(this.battlerRange).slashDEF, exp: 0, bonus: 0 , battle: 0 },
            pierceDEF: { base: this.generateFromRange(this.battlerRange).pierceDEF, exp: 0, bonus: 0 , battle: 0 },
            bluntDEF: { base: this.generateFromRange(this.battlerRange).bluntDEF, exp: 0, bonus: 0 , battle: 0 },
            dodge: { base: this.generateFromRange(this.battlerRange).dodge, exp: 0, bonus: 0 , battle: 0 },
            orderATK: { base: this.generateFromRange(this.battlerRange).orderATK, exp: 0, bonus: 0 , battle: 0 },
            chaosATK: { base: this.generateFromRange(this.battlerRange).chaosATK, exp: 0, bonus: 0 , battle: 0 },
            geoATK: { base: this.generateFromRange(this.battlerRange).geoATK, exp: 0, bonus: 0 , battle: 0 },
            waterATK: { base: this.generateFromRange(this.battlerRange).waterATK, exp: 0, bonus: 0 , battle: 0 },
            airATK: { base: this.generateFromRange(this.battlerRange).airATK, exp: 0, bonus: 0 , battle: 0 },
            fireATK: { base: this.generateFromRange(this.battlerRange).fireATK, exp: 0, bonus: 0 , battle: 0 },
            orderDEF: { base: this.generateFromRange(this.battlerRange).orderDEF, exp: 0, bonus: 0 , battle: 0 },
            chaosDEF: { base: this.generateFromRange(this.battlerRange).chaosDEF, exp: 0, bonus: 0 , battle: 0 },
            geoDEF: { base: this.generateFromRange(this.battlerRange).geoDEF, exp: 0, bonus: 0 , battle: 0 },
            waterDEF: { base: this.generateFromRange(this.battlerRange).waterDEF, exp: 0, bonus: 0 , battle: 0 },
            airDEF: { base: this.generateFromRange(this.battlerRange).airDEF, exp: 0, bonus: 0 , battle: 0 },
            fireDEF: { base: this.generateFromRange(this.battlerRange).fireDEF, exp: 0, bonus: 0 , battle: 0 }
        };
        const elements = {
            order: { base: this.generateFromRange(this.elementRange).order, exp: 0, bonus: 0 , battle: 0 },
            chaos: { base: this.generateFromRange(this.elementRange).chaos, exp: 0, bonus: 0 , battle: 0 },
            geo: { base: this.generateFromRange(this.elementRange).geo, exp: 0, bonus: 0 , battle: 0 },
            water: { base: this.generateFromRange(this.elementRange).water, exp: 0, bonus: 0 , battle: 0 },
            air: { base: this.generateFromRange(this.elementRange).air, exp: 0, bonus: 0 , battle: 0 },
            fire: { base: this.generateFromRange(this.elementRange).fire, exp: 0, bonus: 0 , battle: 0 }
        };
        const artisans = {
            mining: { base: this.generateFromRange(this.artisanRange).mining, exp: 0, bonus: 0 , battle: 0 },
            smithing: { base: this.generateFromRange(this.artisanRange).smithing, exp: 0, bonus: 0 , battle: 0 },
            woodcutting: { base: this.generateFromRange(this.artisanRange).woodcutting, exp: 0, bonus: 0 , battle: 0 },
            carpentry: { base: this.generateFromRange(this.artisanRange).carpentry, exp: 0, bonus: 0 , battle: 0 },
            foraging: { base: this.generateFromRange(this.artisanRange).foraging, exp: 0, bonus: 0 , battle: 0 },
            weaving: { base: this.generateFromRange(this.artisanRange).weaving, exp: 0, bonus: 0 , battle: 0 },
            skinning: { base: this.generateFromRange(this.artisanRange).skinning, exp: 0, bonus: 0 , battle: 0 },
            tanning: { base: this.generateFromRange(this.artisanRange).tanning, exp: 0, bonus: 0 , battle: 0 },
            jewelry: { base: this.generateFromRange(this.artisanRange).jewelry, exp: 0, bonus: 0 , battle: 0 },
            cooking: { base: this.generateFromRange(this.artisanRange).cooking, exp: 0, bonus: 0 , battle: 0 },
            alchemy: { base: this.generateFromRange(this.artisanRange).alchemy, exp: 0, bonus: 0 , battle: 0 },
            enchanting: { base: this.generateFromRange(this.artisanRange).enchanting, exp: 0, bonus: 0 , battle: 0 }
        };

        const archeType = new CharacterArchetype({
            name: this.name,
            gender: this.gender,
            id: this.name,
            type: this.type,
            level: this.level,
            portrait: this.name,
            race: this.race,
            background: "Enemy",
            alignment: this.alignment,
            mood: 50,
            energy: 100,
            fame: 0,
            gold: 0,
            exp: 0,
            isDead: false,
            lastTarget: "",
            currentHP: randomBetween(this.HPrange.min, this.HPrange.max),
            currentMP: randomBetween(this.MPrange.min, this.MPrange.max),
            currentSP: randomBetween(this.SPrange.min, this.SPrange.max),
            attributes,
            proficiencies,
            battlers,
            elements,
            artisans,
            equipments: this.equipments,
            baseAC: randomBetween(this.baseACRange.min, this.baseACRange.max),
            arcaneAptitude: randomBetween(this.arcaneAptitudeRange.min, this.arcaneAptitudeRange.max),
            skills: [],
            traits: this.traits,
            activeSkills: this.activeSkills.map(skill => { return { skillID: skill.skillID, level: skill.level, exp: 0 } }),
            position: undefined,
            itemsBag: [],
            location: "",
            isSummoned: false,
        })

            // Create enemy object and assign archetype values
        const enemyObj = new Enemy (
            this.name,
            this.gender,
            description,
            portrait,
            this.givenExp,
            this.givenGold,
            this.dropList
        );

        const enemyStatus = new CharacterStatus();
        enemyStatus.attributes = attributes;
        enemyStatus.proficiencies = proficiencies;
        enemyStatus.battlers = battlers;
        enemyStatus.elements = elements;
        enemyStatus.artisans = artisans;
        enemyObj.status = enemyStatus;

        enemyObj.preferredPosition = this.preferredPosition;

        return enemyObj;
    }

    private generateFromRange(rangeObject: { [key: string]: { min: number, max: number } }) {
        const result: { [key: string]: number } = {};
        for (const key in rangeObject) {
            result[key] = randomBetween(rangeObject[key].min, rangeObject[key].max);
        }
        return result;
    }

    private generateFromRangeNoKey(rangeObject: { min: number, max: number }) {
        return randomBetween(rangeObject.min, rangeObject.max);
    }
}

export class Enemy extends Character {
	description: string;
	portrait: string;
    givenExp: number;
    givenGold: number;
    itemDropList: { itemID: string, chance: number }[];
    preferredPosition: 'front' | 'back' | 'any';
	constructor(
		name: string,
		gender: "MALE" | "FEMALE" | "NONE",
		description: string,
		portrait: string,
        givenExp: number,
        givenGold: number,
        itemDropList: { itemID: string, chance: number }[]
	) {
		super({
            id: name,
            name: name,
            gender: gender,
            portrait: portrait,
        });
		this.description = description;
		this.portrait = portrait;
        this.givenExp = givenExp;
        this.givenGold = givenGold;
        this.itemDropList = itemDropList;
        this.preferredPosition = 'any';
	}
}
