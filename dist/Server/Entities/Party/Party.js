var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LocationActionEnum, UserInputAction, } from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { PartyType } from "./PartyType";
import { DayOfWeek, TimeOfDay, } from "../../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { turnCharacterIntoInterface } from "../Character/Utils/turnCharacterIntoInterface";
export class PartyBehavior {
    constructor(init) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.useCampSupplies = false;
        this.partyType = (_a = init === null || init === void 0 ? void 0 : init.partyType) !== null && _a !== void 0 ? _a : PartyType.peasant;
        this.combatPolicy = (_b = init === null || init === void 0 ? void 0 : init.combatPolicy) !== null && _b !== void 0 ? _b : "strategic";
        this.trade = (_c = init === null || init === void 0 ? void 0 : init.trade) !== null && _c !== void 0 ? _c : {
            engagement: "noTrade",
            selling: {
                strategy: "sellNone",
                markupPercentage: 0,
                rarityThreshold: 0,
                itemList: {},
            },
            buying: {
                strategy: "buyNone",
                discountPercentage: 0,
                rarityThreshold: 0,
                itemList: {},
                autoBuyEssentials: false,
            },
        };
        this.riskTaking = (_d = init === null || init === void 0 ? void 0 : init.riskTaking) !== null && _d !== void 0 ? _d : "balanced";
        this.travelPace = (_e = init === null || init === void 0 ? void 0 : init.travelPace) !== null && _e !== void 0 ? _e : "normal";
        this.eventResponse = (_f = init === null || init === void 0 ? void 0 : init.eventResponse) !== null && _f !== void 0 ? _f : "neutral";
        this.craft = (_g = init === null || init === void 0 ? void 0 : init.craft) !== null && _g !== void 0 ? _g : {
            craftingList: {},
        };
    }
}
export class Party {
    constructor(characters, location, firstEnemyPosition, behavior) {
        this.characters = [
            "none",
            "none",
            "none",
            "none",
            "none",
            "none",
        ];
        this.actionSequence = {
            [DayOfWeek.laoh]: {
                [TimeOfDay.morning]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.afternoon]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.evening]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.night]: new UserInputAction(LocationActionEnum.None),
            },
            [DayOfWeek.rowana]: {
                [TimeOfDay.morning]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.afternoon]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.evening]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.night]: new UserInputAction(LocationActionEnum.None),
            },
            [DayOfWeek.aftree]: {
                [TimeOfDay.morning]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.afternoon]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.evening]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.night]: new UserInputAction(LocationActionEnum.None),
            },
            [DayOfWeek.udur]: {
                [TimeOfDay.morning]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.afternoon]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.evening]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.night]: new UserInputAction(LocationActionEnum.None),
            },
            [DayOfWeek.matris]: {
                [TimeOfDay.morning]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.afternoon]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.evening]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.night]: new UserInputAction(LocationActionEnum.None),
            },
            [DayOfWeek.seethar]: {
                [TimeOfDay.morning]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.afternoon]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.evening]: new UserInputAction(LocationActionEnum.None),
                [TimeOfDay.night]: new UserInputAction(LocationActionEnum.None),
            },
        };
        this.isTraveling = false;
        this.location = LocationName.None;
        this.inventory = {};
        this.gold = 0;
        this.justArrived = false;
        this.informations = {};
        this.characters[0] = characters[0];
        this.partyID = characters[0].id;
        if (this.partyID === "temp") {
            this.addCharactersToTemporarilyBattleSceneParty(characters);
        }
        else {
            //Normal creation of party when player character is created; the party id is the same as the player character id: Player character will 'ALWAYS' be in this party!
            this.characters[0] = characters[0];
            this.characters[0].partyID = this.partyID;
            this.characters[0].position = firstEnemyPosition ? firstEnemyPosition : 1;
        }
        this.currentLocation = location !== null && location !== void 0 ? location : LocationName.None;
        this.behavior = behavior !== null && behavior !== void 0 ? behavior : new PartyBehavior();
        this.moveAllCharacterItemsToInventory(this.characters[0]);
    }
    moveAllCharacterItemsToInventory(character) {
        for (const item of character.itemsBag.items) {
            if (this.inventory[item.item.id]) {
                this.inventory[item.item.id] += 1;
            }
            else {
                this.inventory;
                this.inventory[item.item.id] = 1;
            }
            character.itemsBag.items = [];
            this.gold += character.gold;
            character.gold = 0;
        }
    }
    leader() {
        // leader is the character with the same id
        return this.characters.find((character) => character != "none" && character.id === this.partyID);
    }
    getPlayerCharacter() {
        for (const character of this.characters) {
            if (character != "none" && character.isPlayerCharacter === true) {
                return character;
            }
        }
        return "none";
    }
    getPlayerCharacterID() {
        const playerCharacter = this.getPlayerCharacter();
        if (playerCharacter === "none") {
            return "none";
        }
        return playerCharacter.id;
    }
    //this only used for temporarily battle scene party for targeting
    addCharactersToTemporarilyBattleSceneParty(characters) {
        for (const character of characters) {
            this.characters.push(character);
        }
    }
    addCharacterToParty(character, position) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPartyFull()) {
                return "Party is full";
            }
            if (position !== undefined) {
                if (position < 0 || position > 5) {
                    throw new Error("Character Position in Party must be between 0 - 5");
                }
                for (let i = 0; i < 6; i++) {
                    const currentIndex = (position + i) % 6; // Wrap around using modulo
                    if (this.characters[currentIndex] === "none") {
                        this.characters[currentIndex] = character;
                        character.position = currentIndex;
                        character.partyID = this.partyID;
                        this.moveAllCharacterItemsToInventory(character);
                        return;
                    }
                }
            }
            else {
                for (let i = 0; i < 6; i++) {
                    if (this.characters[i] === "none") {
                        this.characters[i] = character;
                        character.position = i;
                        character.partyID = this.partyID;
                        this.moveAllCharacterItemsToInventory(character);
                        break;
                    }
                }
            }
        });
    }
    isPartyFull() {
        for (let i = 0; i < 5; i++) {
            if (this.characters[i] === "none") {
                return false;
            }
        }
        return true;
    }
    isAllDead() {
        for (const character of this.characters) {
            if (character != "none" && !character.isDead) {
                return false;
            }
        }
        return true;
    }
    removeCharacterFromParty(character) {
        //IF THE PLAYER CHARACTER IS LEAVING ITS OWN PARTY, THAT IS ABSURD! SO WE WILL NOT ALLOW IT!
        if (character.id === this.partyID) {
            return "Player character cannot leave its own party";
        }
        const index = this.characters.indexOf(character);
        if (index !== -1) {
            this.characters[index] = "none";
            character.partyID = "none";
            character.position = 0;
        }
    }
    getPartyMember(id) {
        for (const character of this.characters) {
            if (character !== "none" && character.id === id) {
                return character;
            }
        }
        throw new Error("Character not found in party");
    }
    getPartyLeader() {
        for (const character of this.characters) {
            if (character !== "none" && character.id === this.partyID) {
                return character;
            }
        }
        throw new Error("Party Leader not found in party");
    }
    getPartyMemberWithHighestAttr(attr) {
        const highest = this.characters
            .filter((c) => c !== "none")
            .reduce((max, character) => character.attribute(attr) >
            max.attribute(attr)
            ? character
            : max);
        if (!highest) {
            throw new Error("No valid characters in party");
        }
        return highest;
    }
    changeCharacterPosition(character, newPosition) {
        if (newPosition < 0 || newPosition > 5) {
            throw new Error("Character Position in Party must be between 0 - 5");
        }
        for (let otherCharacter of this.characters) {
            if (otherCharacter !== "none" &&
                otherCharacter.position === newPosition) {
                otherCharacter.position = character.position;
            }
        }
        character.position = newPosition;
    }
    getPosssibleTargetsAsCharacterArray() {
        return this.characters.filter((character) => character !== "none");
    }
    getOneDeadTarget(character) {
        return this.characters.find((character) => character !== "none" && character.isDead);
    }
    intoCharacterArray() {
        return this.characters.filter((character) => character !== "none");
    }
    toDatabase() {
        return {
            partyID: this.partyID,
            characters: this.characters.map((character) => character === "none" ? "none" : character.id),
            actionSequence: JSON.stringify(this.actionSequence),
            isTraveling: this.isTraveling,
            location: this.location,
        };
    }
    intoInterface() {
        return {
            partyID: this.partyID,
            location: this.location,
            isTraveling: this.isTraveling,
            characters: this.characters.map((character) => character === "none" ? "none" : turnCharacterIntoInterface(character)),
            // TODO: Implement actionsSequence
            actionSequence: this.actionSequence,
            actionsList: [],
        };
    }
    getAvailableCharacters() {
        return this.characters.filter((character) => character !== "none");
    }
    getPartyAverageAgility() {
        const characters = this.getAvailableCharacters();
        const totalAgility = characters.reduce((total, character) => total + character.status.attributes.agility.base, 0);
        return totalAgility / characters.length;
    }
    getPartyAverageLuck() {
        const characters = this.getAvailableCharacters();
        const totalLuck = characters.reduce((total, character) => total + character.status.attributes.luck.base, 0);
        return totalLuck / characters.length;
    }
    getPartyAverageIntelligence() {
        const characters = this.getAvailableCharacters();
        const totalIntelligence = characters.reduce((total, character) => total + character.status.attributes.intelligence.base, 0);
        return totalIntelligence / characters.length;
    }
}
