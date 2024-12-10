import { Item, ItemCost } from "../Items";
import { Character } from "../../Character/Character";
import { ItemType } from "../../../Utility/Enum/EquipmentTypes";

export enum ItmeConsumableEnum {
    //Common Healing
    crimsonGrassTonic = "consume_crimsonGrassTonic",
    
    consume_potion_healing_02 = "consume_potion_healing_02",
    consume_potion_healing_03 = "consume_potion_healing_03"
}

export enum ItemResourceEnum {
    crimsomGrass = "crimsonGrass"
}

export class Consumable extends Item {
        consumeEffect: (character: Character) => void;
        isDecreaseAfterUse: boolean;
    constructor(id: string, name: string, description: string, itemCost: ItemCost, consumeEffect: (character: Character) => void, isDecreaseAfterUse: boolean = true) {
        super(id, ItemType.consumable, name, description, itemCost);
        this.consumeEffect = consumeEffect;
        this.isDecreaseAfterUse = isDecreaseAfterUse;
    }
    consumeBy(character: Character) {
        this.consumeEffect(character);
        if (this.isDecreaseAfterUse) {
            // character.itemsBag.items = character.itemsBag.items.filter(item => item !== this);
        }
    }
}


const consumeable_potion_healing_01 = new Consumable(
    ItmeConsumableEnum.crimsonGrassTonic,
    "Crimson Grass Tonic",
    "A common healing tonic made by crimson grass, use by applying on the wound. Healing + 3",
    new ItemCost(5, 0),
    (character: Character) => {
        character.hpUp(5)
    },
    true
)

// const consumeable_potion_healing_02 = new Consumable(
//     ConsumableEnum.consume_potion_healing_02,
//     "Healing Potion (M)",
//     "A potion that heals 15 HP",
//     new ItemCost(10, 0),
//     (character: Character) => {
//         character.hpUp(15);
//     }
// )

// ConsumableRepository.consumeable_potion_healing_03 = new Consumable(
//     ConsumableEnum.consume_potion_healing_03,
//     "Healing Potion (L)",
//     "A potion that heals 30 HP",
//     new ItemCost(15, 0),
//     (character: Character) => {
//         character.hpUp(30);
//     }
// )

// ConsumableRepository.consumeable_food_01 = new Consumable(
//     "Apple",
//     "A fresh apple",
//     new ItemCost(1, 0),
//     (character: Character) => {
//         character.hpUp(3);
//         character.moodUp(1);
//     }
// )

// ConsumableRepository.consumeable_food_02 = new Consumable(
//     "Bread",
//     "A loaf of bread",
//     new ItemCost(2, 0),
//     (character: Character) => {
//         character.hpUp(5);
//     }
// )

// ConsumableRepository.consumeable_food_03 = new Consumable(
//     "Cheese",
//     "A piece of cheese",
//     new ItemCost(3, 0),
//     (character: Character) => {
//         character.hpUp(7);
//     }
// )

// ConsumableRepository.consumeable_food_04 = new Consumable(
//     "Meat",
//     "A piece of meat",
//     new ItemCost(4, 0),
//     (character: Character) => {
//         character.hpUp(9);
//     }
// )

// ConsumableRepository.consumeable_food_05 = new Consumable(
//     "Fish",
//     "A piece of fish",
//     new ItemCost(5, 0),
//     (character: Character) => {
//         character.hpUp(11);
//     }
// )