import WebSocket from "ws";
import { EventEmitter } from 'events';
import { db } from "../../../Database";
import { PlayerCharacter } from "../../../Entities/Character/Character";
import { class_cleric, class_fighter, class_guardian, class_hexbinder, class_mage, class_occultist, class_scout, class_skirmisher, class_soldier, class_spellblade, class_templar, class_warden } from "./ClassEnum";
import { ClassEnum } from "../../../../Common/RequestResponse/characterCreation";
import { RaceEnum } from "../../../../Common/RequestResponse/characterCreation";
import { dwarflingRace, dwarfRace, elvenRace, elvonRace, halfElvenRace, halflingRace, halfOrcRace, halfTritonRace, humanRace, orcRace, tritonRace } from "../../../Database/Character/RacesStatus";
import { game } from "../../../server";

type Request =
    | CreateCharacterRequest
    | UserSelectClass
    | UserSelectRace
	| UserSelectBackground;

type Response =
    | UpdateCharacterCreationResponse
    | CharacterCreatedSuccessResponse
    | ErrorResponse;

type CharacterCreatedSuccessResponse = {
    type: "CHARACTER_CREATED";
};

type ErrorResponse = {
    type: "ERROR";
    message: string;
};

type CreateCharacterRequest = {
    type: "CREATE";
    characterName: string;
    portrait: string;
    background: number;
    userID: string;
};

type UserSelectClass = {
    type: "USER_SELECT_CLASS";
    class: ClassEnum;
    userID: string;
};

type UserSelectRace = {
    type: "USER_SELECT_RACE";
    race: RaceEnum;
    userID: string;
};

type UserSelectBackground = {
	type: "USER_SELECT_BACKGROUND";
	background: number;
	userID: string;
};

type UpdateCharacterCreationResponse = {
    type: "UPDATE";
    creationPoints: number;
    attributes: {
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
    };
    proficiencies: {
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
    };
    startingGold: number;
    userID: string;
    selectedClass: ClassEnum;
    selectedRace: RaceEnum;
};

export class CharacterCreationWebsocketService extends EventEmitter {
    private userSessions: Map<string, CharacterCreationSession> = new Map();
    private wsConnections: Map<string, WebSocket> = new Map();
    wss: WebSocket.Server;

    constructor(wss: WebSocket.Server) {
        super();
        this.wss = wss;

        this.wss.on("connection", (ws: WebSocket) => {
            ws.on("message", async (message: Buffer) => {
                try {
                    const parsedMessage = JSON.parse(message.toString());
                    const userID = parsedMessage.userID;

                    if (!userID) {
                        ws.send(JSON.stringify({ type: "ERROR", message: "User ID not found" }));
                        return;
                    }

                    this.wsConnections.set(userID, ws);

                    if (!this.userSessions.has(userID)) {
                        const session = new CharacterCreationSession(this, userID);
                        this.userSessions.set(userID, session);
                        session.sendUpdate();
                    }

                    const session = this.userSessions.get(userID);
                    if (session) {
                        session.handleRequest(parsedMessage);
                    } else {
                        ws.send(JSON.stringify({ type: "ERROR", message: "User session not found" }));
                    }
                } catch (error) {
                    console.error("Error parsing message:", error);
                    ws.close();
                }
            });

            ws.on("close", () => {
                this.wsConnections.forEach((wsConn, userID) => {
                    if (wsConn === ws) {
                        this.userSessions.delete(userID);
                        this.wsConnections.delete(userID);
                    }
                });
            });

            ws.on("error", (error: Error) => {
                console.error("WebSocket error:", error.message);
            });
        });
    }

    public sendResponse(response: Response, userID: string) {
        const ws = this.wsConnections.get(userID);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(response));
        } else {
            console.error("Error sending response: WebSocket not open");
        }
    }
}

class CharacterCreationSession {
    private service: CharacterCreationWebsocketService;
    userID: string;
    gender: 'male' | 'female' = 'male';
    charisma: number = 7;
    luck: number = 7;
    intelligence: number = 7;
    leadership: number = 7;
    vitality: number = 7;
    willpower: number = 7;
    breath: number = 7;
    planar: number = 7;
    dexterity: number = 7;
    agility: number = 7;
    strength: number = 7;
    endurance: number = 7;
    bareHand: number = 7;
    sword: number = 7;
    blade: number = 7;
    dagger: number = 7;
    spear: number = 7;
    axe: number = 7;
    mace: number = 7;
    shield: number = 7;
    bow: number = 7;
    magicWand: number = 7;
    staff: number = 7;
    tome: number = 7;
    orb: number = 7;
    startingGold: number = 100;
	selectedRace: RaceEnum = RaceEnum.HUMAN;
	selectedClass: ClassEnum = ClassEnum.FIGHTER;
	selectedBackground: number = 1;
    creationPoints: number = 8;

    constructor(service: CharacterCreationWebsocketService, userID: string) {
        this.service = service;
        this.userID = userID;
    }

    handleRequest(data: Request) {
        switch (data.type) {
            case "CREATE":
                this.handleCreateCharacter(data);
                break;
            case "USER_SELECT_CLASS":
                this.handleUserSelectClass(data);
                break;
            case "USER_SELECT_RACE":
                this.handleUserSelectRace(data);
                break;
        }
    }

    private async handleUserSelectClass(data: UserSelectClass) {
        try {
            const className = data.class;
            if (!Object.values(ClassEnum).includes(className)) {
                this.service.sendResponse({ type: "ERROR", message: "Character Class Invalid" }, this.userID);
            } else {
                // Handle class selection logic here
                this.sendUpdate();
            }
        } catch (error) {
            console.error("Error selecting class:", error);
            this.service.sendResponse({ type: "ERROR", message: "Error selecting class" }, this.userID);
        }
    }

    private async handleUserSelectRace(data: UserSelectRace) {
        try {
            const raceName = data.race;
            if (!Object.values(RaceEnum).includes(raceName)) {
                this.service.sendResponse({ type: "ERROR", message: "Character Race Invalid" }, this.userID);
            } else {
                // Handle race selection logic here
                this.sendUpdate();
            }
        } catch (error) {
            console.error("Error selecting race:", error);
            this.service.sendResponse({ type: "ERROR", message: "Error selecting race" }, this.userID);
        }
    }

    private async handleCreateCharacter(data: CreateCharacterRequest) {        
        try {
            //1. check if user exists
            const user = await db.read('users', 'userID', data.userID);
            if (user === undefined) {
                this.service.sendResponse({ type: "ERROR", message: "User not found" }, this.userID);
                return;
            }
            //2. check if user already has a character
            if (user.characterID !== '') {
                this.service.sendResponse({ type: "ERROR", message: "This user already has a character" }, this.userID);
                return;
            }
            //3. Validate character name, 3-20 char, no numbers, no special characters
            if (data.characterName.length < 3 || data.characterName.length > 20) {
                this.service.sendResponse({ type: "ERROR", message: "Character name must be between 3 and 20 characters" }, this.userID);
                return;
            }

            if (!/^[a-zA-Z]+$/.test(data.characterName)) {
                this.service.sendResponse({ type: "ERROR", message: "Character name must contain only letters" }, this.userID);
                return;
            }

            const existingCharacter = await db.read('players', 'name', data.characterName);

            if (existingCharacter) {
                this.service.sendResponse({ type: "ERROR", message: "Character name already exists" }, this.userID);
                return;
            }

            const classAttributes = {
                [ClassEnum.CLERIC]: class_cleric,
                [ClassEnum.FIGHTER]: class_fighter,
                [ClassEnum.GUARDIAN]: class_guardian,
                [ClassEnum.HEXBINDER]: class_hexbinder,
                [ClassEnum.MAGE]: class_mage,
                [ClassEnum.OCCULTIST]: class_occultist,
                [ClassEnum.SCOUT]: class_scout,
                [ClassEnum.SKIRMISHER]: class_skirmisher,
                [ClassEnum.SOLDIER]: class_soldier,
                [ClassEnum.SPELLBLADE]: class_spellblade,
                [ClassEnum.TEMPLAR]: class_templar,
                [ClassEnum.WARDEN]: class_warden,
            };

            const characterClass = classAttributes[this.selectedClass];

            let race = humanRace;
            switch (this.selectedRace) {
                case RaceEnum.DWARF:
                    race = dwarfRace;
                    break;
                case RaceEnum.DWARFLING:
                    race = dwarflingRace;
                    break;
                case RaceEnum.ELVEN:
                    race = elvenRace;
                    break;
                case RaceEnum.ELVON:
                    race = elvonRace;
                    break;
                case RaceEnum.HALFLING:
                    race = halflingRace;
                    break;
                case RaceEnum.HALF_ELF:
                    race = halfElvenRace;
                    break;
                case RaceEnum.HALF_ORC:
                    race = halfOrcRace;
                    break;
                case RaceEnum.HALF_TRITON:
                    race = halfTritonRace;
                    break;
                case RaceEnum.HUMAN:
                    race = humanRace;
                    break;
                case RaceEnum.ORC:
                    race = orcRace;
                    break;
                case RaceEnum.TRITON:
                    race = tritonRace;
                    break;
                default:
                    this.service.sendResponse({ type: "ERROR", message: "Character Race Invalid" }, this.userID);
                    return;
            }

            let dto = {
                gender: this.gender,
                portrait: data.portrait,
                name: data.characterName,
                userID: this.userID,
                charisma: this.charisma + (characterClass.bonusStats.attribute.charisma || 0) + (race.charisma || 0),
                luck: this.luck + (characterClass.bonusStats.attribute.luck || 0) + (race.luck || 0),
                intelligence: this.intelligence + (characterClass.bonusStats.attribute.intelligence || 0) + (race.intelligence || 0),
                leadership: this.leadership + (characterClass.bonusStats.attribute.leadership || 0) + (race.leadership || 0),
                vitality: this.vitality + (characterClass.bonusStats.attribute.vitality || 0) + (race.vitality || 0),
                willpower: this.willpower + (characterClass.bonusStats.attribute.willpower || 0) + (race.willpower || 0),
                breath: this.breath + (characterClass.bonusStats.attribute.breath || 0) + (race.breath || 0),
                planar: this.planar + (characterClass.bonusStats.attribute.planar || 0) + (race.planar || 0),
                dexterity: this.dexterity + (characterClass.bonusStats.attribute.dexterity || 0) + (race.dexterity || 0),
                agility: this.agility + (characterClass.bonusStats.attribute.agility || 0) + (race.agility || 0),
                strength: this.strength + (characterClass.bonusStats.attribute.strength || 0) + (race.strength || 0),
                endurance: this.endurance + (characterClass.bonusStats.attribute.endurance || 0) + (race.endurance || 0),
                bareHand: this.bareHand + (characterClass.bonusStats.proficiency.bareHand || 0),
                sword: this.sword + (characterClass.bonusStats.proficiency.sword || 0),
                blade: this.blade + (characterClass.bonusStats.proficiency.blade || 0),
                dagger: this.dagger + (characterClass.bonusStats.proficiency.dagger || 0),
                spear: this.spear + (characterClass.bonusStats.proficiency.spear || 0),
                axe: this.axe + (characterClass.bonusStats.proficiency.axe || 0),
                mace: this.mace + (characterClass.bonusStats.proficiency.mace || 0),
                shield: this.shield + (characterClass.bonusStats.proficiency.shield || 0),
                bow: this.bow + (characterClass.bonusStats.proficiency.bow || 0),
                magicWand: this.magicWand + (characterClass.bonusStats.proficiency.magicWand || 0),
                staff: this.staff + (characterClass.bonusStats.proficiency.staff || 0),
                tome: this.tome + (characterClass.bonusStats.proficiency.tome || 0),
                orb: this.orb + (characterClass.bonusStats.proficiency.orb || 0),
                mining: 0 + (characterClass.bonusStats.artisan.mining || 0),
                smithing: 0 + (characterClass.bonusStats.artisan.smithing || 0),
                woodcutting: 0 + (characterClass.bonusStats.artisan.woodcutting || 0),
                carpentry: 0 + (characterClass.bonusStats.artisan.carpentry || 0),
                foraging: 0 + (characterClass.bonusStats.artisan.foraging || 0),
                weaving: 0 + (characterClass.bonusStats.artisan.weaving || 0),
                skinning: 0 + (characterClass.bonusStats.artisan.skinning || 0),
                tanning: 0 + (characterClass.bonusStats.artisan.tanning || 0),
                jewelry: 0 + (characterClass.bonusStats.artisan.jewelry || 0),
                alchemy: 0 + (characterClass.bonusStats.artisan.alchemy || 0),
                cooking: 0 + (characterClass.bonusStats.artisan.cooking || 0),
                enchanting: 0 + (characterClass.bonusStats.artisan.enchanting || 0),
                gold: 50,
                selectedClass: this.selectedClass,
                selectedRace: this.selectedRace,
                selectedBackground: this.selectedBackground,
            };

            const character = new PlayerCharacter(dto);

            const backgroundLocationMap: { [key: number]: string } = {
                0: "OceanTide",  // Nobody - Starts in the bustling city
                1: "Ivory Forest",  // Exiled Mystic's Apprentice - A mysterious forest, isolated
                2: "White Oak Estate",  // Forgotten Artisan - Large estate with skilled knights
                3: "Celestial Sword Sect",  // Wandering Sellsword - Martial art sect
                4: "Berris Grove",  // Alchemical Prodigy - Place known for herbs and alchemists
                5: "Smooth Shore",  // Runaway Blacksmith - Simple life, small village
                6: "Berris Grove",  // Nomadic Hunter - Wilderness and herbalists
                7: "Fyornar",  // Clockwork Tinkerer - Industrial capital
                8: "The Trident",  // Street Magician - Strategic place, travel & commerce
                9: "White Oak Estate",  // Disgraced Knight - Large estate, strong knights
                10: "Smooth Shore",  // Seafarer - Small fishing village
                11: "Salty Lake",  // Haunted Seer - Isolated, rumored monsters, bandits
                12: "Berris Grove",  // Village Healer - Forest known for herbs, alchemists
                13: "White Oak Estate",  // Exiled Aristocrat - Noble estate
                14: "Ivory Forest",  // Forest Ranger - Skilled in the wild
                15: "Ivory Forest",  // Nomadic Herbalist - Forest known for herbs
                16: "Ember Falls",  // Reluctant Priest - Faith and training grounds
                17: "Smooth Shore",  // Exiled Alchemist - Isolated, avoiding society
                18: "Ivory Forest",  // Runaway Mechanic - Technologically inclined, isolated
                19: "Umbral Veil",  // Shadowy Assassin - Shadow magic and assassination techniques
                20: "Desert Wanderer",  // Smooth Shore - Remote and harsh life
                21: "Blue Sky Mountain Sect",  // Mountain Hermit's Disciple - Internal power, meditation
                22: "Ivory Forest",  // Alchemist of the Hidden Valley - Secluded location
                23: "Berris Grove"  // Wandering Martial Artist - Internal power and herbs
            };

            if (data.background === 0) {
                game.locationManager.locations[0].characterMoveIn(character);
                // game.map.locations[0].characterMoveIn(character.characterID);
            } else {
                const locationName = backgroundLocationMap[data.background];
                // for (const location of game.map.locations) {
                // 	if (location.name === locationName) {
                // 		location.characterMoveIn(character.characterID);
                // 	}
                // }
                let traitName = `trait_starter_${data.background.toString().padStart(2, '0')}`;
                // let trait = TraitRepository[traitName as keyof typeof TraitRepository];
                // character.gainTrait(trait.id);
            }

            // character.learnSkill(SkillRepository.skill_auto_physical.id);
            // character.moveCardToBattle(SkillRepository.skill_auto_physical.id);

            await db.writeOver(
                {
                    tableName:'users', 
                    primaryKeyColumnName: 'userID', 
                    primaryKeyValue: data.userID
                },
                [{
                    dataKey: 'characterID', 
                    value: character.id
                }]
            );

            this.service.sendResponse({ type: "CHARACTER_CREATED" }, this.userID);
        } catch (error) {
            console.error("Error creating character:", error);
            this.service.sendResponse({ type: "ERROR", message: "Error creating character" }, this.userID);
        }
    }

    sendUpdate() {
        const update: UpdateCharacterCreationResponse = {
            type: "UPDATE",
            creationPoints: this.creationPoints,
            attributes: {
                charisma: this.charisma,
                luck: this.luck,
                intelligence: this.intelligence,
                leadership: this.leadership,
                vitality: this.vitality,
                willpower: this.willpower,
                breath: this.breath,
                planar: this.planar,
                dexterity: this.dexterity,
                agility: this.agility,
                strength: this.strength,
                endurance: this.endurance,
            },
            proficiencies: {
                bareHand: this.bareHand,
                sword: this.sword,
                blade: this.blade,
                dagger: this.dagger,
                spear: this.spear,
                axe: this.axe,
                mace: this.mace,
                shield: this.shield,
                bow: this.bow,
                magicWand: this.magicWand,
                staff: this.staff,
                tome: this.tome,
                orb: this.orb,
            },
            startingGold: this.startingGold,
            userID: this.userID,
            selectedClass: this.selectedClass,
            selectedRace: this.selectedRace,
        };
        this.service.sendResponse(update, this.userID);
    }
}