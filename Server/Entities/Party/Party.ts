import { Character } from "../Character/Character";
import {
	LocationActionEnum,
	UserInputAction,
} from "../../../Common/DTOsEnumsInterfaces/Map/LocationActions+Events";
import { PartyInterface } from "../../../Common/RequestResponse/characterWS";
import { LocationName } from "../../../Common/DTOsEnumsInterfaces/Map/LocationNames";
import { PartyType } from "./PartyType";
import { AttributeEnum } from "../Character/Subclasses/CharacterDataEnum";
import { CharacterStatus } from "../Character/Subclasses/CharacterStatus";
import {
	DayOfWeek,
	TimeOfDay,
} from "../../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { turnCharacterIntoInterface } from "../Character/Utils/turnCharacterIntoInterface";

export class PartyBehavior {
	partyType: PartyType;
	/*
	Combat Policy: When two parties encounter each other and pass the 'hostile' test, 
	there is a chance that battle will take place.

	If both parties have different Combat Policies:
		- The battle is determined by each party's 'Combat Initiative'.
		- Combat Initiative is calculated as: 
		  Combat Initiative = (partyAvgAgilityModifier) + 1D6
		- If the party with **higher** Combat Initiative has **Combat Policy = 'engage'**, battle **will** occur.
		- If the party with **lower** Combat Initiative has **Combat Policy = 'evasive'**, battle **will not** occur.

	If both parties have the same Combat Policy:
		- If **both** are 'engage' → Battle **always** occurs.
		- If **both** are 'evasive' → Battle **never** occurs.

	Strategic Combat Policy:
		- The party will assess the enemy’s strength before deciding to **engage** or **evade**.
		- **Formula for Party Strength (PS):** 
		  PS = (partySize * avgLevel)
		- When evaluating another party's strength, intelligence is factored in:
		  - The character with the **highest Intelligence** in the party makes the assessment.
		  - **Formula for Estimated Party Strength (EPS):** 
		    EPS = (otherPartySize * otherAvgLevel) ± (5 - Math.min(mostIntelligent.intModifier(), 5))
		  - This ensures parties with higher Intelligence make better assessments.

		- Decision Process:
			- If `EPS > PS`, the party acts as if its Combat Policy is **'evasive'**.
			- If `EPS ≤ PS`, the party acts as if its Combat Policy is **'engage'**.

	This ensures intelligent leaders assess battles **more accurately**, 
	while agility influences reaction speed in encounters.
	*/
	combatPolicy: "engage" | "strategic" | "evasive";

	/*
		Trade System Flags:
		This system determines how a party engages in trade, including buying and selling behavior.

		: tradeEngagement - Determines if the party will engage in trade.
			- "trade": The party participates in trade.
			- "noTrade": The party does not engage in trade.

		-------------------
		SELLING CONFIGURATION
		-------------------
		: selling.strategy - Defines how the party sells items.
			- "sellSome": The party sells items if they meet stock and rarity criteria.
			- "sellNone": The party does not sell items.
			- "sellAtMarkUp": The party sells items if their price exceeds a certain threshold (based on market price)
			while also meeting stock and rarity criteria.

		: selling.markupPercentage - The percentage above the base price at which items will be sold (only applies to "sellAtMarkUp").
		: selling.rarityThreshold - The **maximum** rarity of an item that can be sold.
		: selling.itemList - List of items the party is willing to sell.
			- Each entry contains:
				- `itemName: string` → Name of the item.
				- `stockThreshold: number` → Minimum stock required before selling.

		- **"sellSome" and "sellAtMarkUp"** always follow `stockThreshold`, `rarityThreshold`, and `itemList`.

		-------------------
		BUYING CONFIGURATION
		-------------------
		: buying.strategy - Defines how the party buys items.
			- "buySome": The party buys items if they meet stock and rarity criteria.
			- "buyNone": The party does not buy items.
			- "buyAtDiscount": The party buys items if their price drops below a certain threshold (based on market price)
			while also meeting stock and rarity criteria.

		: buying.discountPercentage - The percentage below the base price at which items will be purchased (only applies to "buyAtDiscount").
		: buying.rarityThreshold - The **minimum** rarity of an item that can be purchased.
		: buying.itemList - List of items the party is willing to buy.
			- Each entry contains:
				- `itemName: string` → Name of the item.
				- `stockThreshold: number` → Maximum stock the party wants to keep.

		- **"buySome" and "buyAtDiscount"** always follow `stockThreshold`, `rarityThreshold`, and `itemList`.

		: autoBuyEssentials - Determines if the party will **automatically** buy essential items (e.g., food, water).
			- `true`: The party will always buy essential items when available.
			- `false`: The party does not auto-buy essentials.
	*/
	trade: {
		engagement: "trade" | "noTrade";
		selling: {
			strategy: "sellSome" | "sellNone" | "sellAtMarkUp";
			markupPercentage: number;
			rarityThreshold: number;
			itemList: Record<string, number>;
		};
		buying: {
			strategy: "buySome" | "buyNone" | "buyAtDiscount";
			discountPercentage: number;
			rarityThreshold: number;
			itemList: Record<string, number>;
			autoBuyEssentials: boolean;
		};
	};
	/*
	Crafting System Configuration:
	The crafting system determines how a party will engage in crafting activities.
	When the party has the 'craft' action set, at the designated time, the party will evaluate the `craftingList` to determine if crafting is possible.
 
	- If the `craftingList` is empty, the party will not craft anything and will fall back to resting.
	- If the `craftingList` contains items, the party will evaluate whether crafting is possible.
 
	**Criteria for Crafting:**
	1. The party must have enough resources to craft the item.
	2. The crafting strategy must be met:
	   - **"craftAll"**: Craft as many as possible with available resources.
	   - **"craftInRange"**: Craft if the item quantity is below `quantityLow` but does not exceed `quantityHigh`.
	   - **"craftOne"**: Craft a single item only if its quantity is 0.
	3. If resources are insufficient but `allowTradeForMaterials` is `true`, the party will attempt to buy materials from the market. If materials are successfully acquired, crafting will proceed.
 
	If none of the items in `craftingList` meet these criteria (including after trade attempts), the party will default to a rest action.
 
	**Crafting Execution:**
	- The party will assign crafting to the character with the highest skill in the required crafting category.
	- Some blueprints may require specific facilities such as a **Blacksmith**, **Alchemy Lab**, or **Cooking Station**.
	*/
	craft: {
		craftingList: {
			[order: number]: {
				bluePrintID: string;
				quantityLow: number;
				quantityHigh: number;
				allowTradeForMaterials: boolean;
				strategy: "craftInRange" | "craftAll" | "craftOne";
			};
		};
	};

	// During the game, many events may happened, the risk taking behavior of the party will be used as a modifier factor to determine the outcome of the event.
	riskTaking: "reckless" | "cautious" | "balanced";

	// Travel Pace affected the speed of the party when traveling on the map.
	travelPace: "fast" | "normal" | "slow";

	// Event Response flags affect how the party reacts to events.
	eventResponse: "friendly" | "neutral" | "hostile";

	useCampSupplies: boolean = false;

	constructor(init?: Partial<PartyBehavior>) {
		this.partyType = init?.partyType ?? PartyType.peasant;
		this.combatPolicy = init?.combatPolicy ?? "strategic";
		this.trade = init?.trade ?? {
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
		this.riskTaking = init?.riskTaking ?? "balanced";
		this.travelPace = init?.travelPace ?? "normal";
		this.eventResponse = init?.eventResponse ?? "neutral";
		this.craft = init?.craft ?? {
			craftingList: {},
		};
	}
}

export class Party {
	partyID: string;
	characters: (Character | "none")[] = [
		"none",
		"none",
		"none",
		"none",
		"none",
		"none",
	];
	actionSequence: Record<DayOfWeek, Record<TimeOfDay, UserInputAction>> = {
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
	isTraveling: boolean = false;
	location: LocationName = LocationName.None;
	currentLocation: LocationName;
	behavior: PartyBehavior;
	inventory: Record<string, number> = {};
	gold: number = 0;
	justArrived: boolean = false;

	constructor(
		characters: Character[],
		location?: LocationName,
		firstEnemyPosition?: number,
		behavior?: PartyBehavior
	) {
		this.characters[0] = characters[0] as Character;
		this.partyID = characters[0].id;
		if (this.partyID === "temp") {
			this.addCharactersToTemporarilyBattleSceneParty(characters);
		} else {
			//Normal creation of party when player character is created; the party id is the same as the player character id: Player character will 'ALWAYS' be in this party!
			this.characters[0] = characters[0] as Character;
			this.characters[0].partyID = this.partyID;
			this.characters[0].position = firstEnemyPosition ? firstEnemyPosition : 1;
		}
		this.currentLocation = location ?? LocationName.None;
		this.behavior = behavior ?? new PartyBehavior();
		this.moveAllCharacterItemsToInventory(this.characters[0]);
	}

	moveAllCharacterItemsToInventory(character: Character) {
		for (const item of character.itemsBag.items) {
			if (this.inventory[item.item.id]) {
				this.inventory[item.item.id] += 1;
			} else {
				this.inventory;
				this.inventory[item.item.id] = 1;
			}
			character.itemsBag.items = [];
			this.gold += character.gold;
			character.gold = 0;
		}
	}

	leader(): Character {
		// leader is the character with the same id
		return this.characters.find(
			(character) => character != "none" && character.id === this.partyID
		) as Character;
	}

	getPlayerCharacter(): Character {
		return this.characters.find(
			(character) => character != "none" && character.isPlayerCharacter
		) as Character;
	}

	//this only used for temporarily battle scene party for targeting
	addCharactersToTemporarilyBattleSceneParty(characters: Character[]) {
		for (const character of characters) {
			this.characters.push(character);
		}
	}

	async addCharacterToParty(character: Character, position?: number) {
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
		} else {
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
	}

	isPartyFull(): Boolean {
		for (let i = 0; i < 5; i++) {
			if (this.characters[i] === "none") {
				return false;
			}
		}
		return true;
	}

	isAllDead(): Boolean {
		for (const character of this.characters) {
			if (character != "none" && !character.isDead) {
				return false;
			}
		}
		return true;
	}

	removeCharacterFromParty(character: Character) {
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

	getPartyMember(id: string): Character {
		for (const character of this.characters) {
			if (character !== "none" && character.id === id) {
				return character;
			}
		}
		throw new Error("Character not found in party");
	}

	getPartyLeader(): Character {
		for (const character of this.characters) {
			if (character !== "none" && character.id === this.partyID) {
				return character;
			}
		}
		throw new Error("Party Leader not found in party");
	}

	getPartyMemberWithHighestAttr(attr: AttributeEnum): Character {
		const highest = this.characters
			.filter((c) => c !== "none")
			.reduce((max, character) =>
				character.attribute(attr as keyof CharacterStatus["attributes"]) >
				max.attribute(attr as keyof CharacterStatus["attributes"])
					? character
					: max
			);

		if (!highest) {
			throw new Error("No valid characters in party");
		}

		return highest;
	}

	changeCharacterPosition(character: Character, newPosition: number) {
		if (newPosition < 0 || newPosition > 5) {
			throw new Error("Character Position in Party must be between 0 - 5");
		}

		for (let otherCharacter of this.characters) {
			if (
				otherCharacter !== "none" &&
				otherCharacter.position === newPosition
			) {
				otherCharacter.position = character.position;
			}
		}
		character.position = newPosition;
	}

	getPosssibleTargetsAsCharacterArray(): Character[] {
		return this.characters.filter(
			(character): character is Character => character !== "none"
		);
	}

	intoCharacterArray(): Character[] {
		return this.characters.filter(
			(character): character is Character => character !== "none"
		);
	}

	toDatabase(): {
		partyID: string;
		characters: string[];
		actionSequence: string;
		isTraveling: boolean;
		location: string;
	} {
		return {
			partyID: this.partyID,
			characters: this.characters.map((character) =>
				character === "none" ? "none" : character.id
			),
			actionSequence: JSON.stringify(this.actionSequence),
			isTraveling: this.isTraveling,
			location: this.location,
		};
	}

	intoInterface(): PartyInterface {
		return {
			partyID: this.partyID,
			location: this.location,
			isTraveling: this.isTraveling,
			characters: this.characters.map((character) =>
				character === "none" ? "none" : turnCharacterIntoInterface(character)
			),
			// TODO: Implement actionsSequence
			actionSequence: this.actionSequence,
			actionsList: [],
		};
	}

	getAvailableCharacters(): Character[] {
		return this.characters.filter((character) => character !== "none");
	}

	getPartyAverageAgility(): number {
		const characters = this.getAvailableCharacters();
		const totalAgility = characters.reduce(
			(total, character) => total + character.status.attributes.agility.base,
			0
		);
		return totalAgility / characters.length;
	}

	getPartyAverageLuck(): number {
		const characters = this.getAvailableCharacters();
		const totalLuck = characters.reduce(
			(total, character) => total + character.status.attributes.luck.base,
			0
		);
		return totalLuck / characters.length;
	}
}
