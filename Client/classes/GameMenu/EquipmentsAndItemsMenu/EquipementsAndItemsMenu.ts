import {
  CharacterEquipmentsInterface,
  CharacterInterface,
  ItemInterface,
} from "../../../../Common/RequestResponse/characterWS.js";
import { screamer } from "../../../../Client/Screamer/Screamer.js";
import { EquipmentType } from "../../../../Common/DTOsEnumsInterfaces/Item/Equipment/Enums.js";
import { ItemCard } from "../../../../Client/classes/Cards/ItemCard/ItemCard.js";
import { ItemCostInterface } from "../../../../Common/DTOsEnumsInterfaces/Item/ItemCost.js";
import { ItemType } from "../../../../Common/DTOsEnumsInterfaces/Item/Enums.js";
import { Tier } from "../../../../Common/DTOsEnumsInterfaces/Tier.js";
import { K } from "../../../../Common/Constant.js";

export class EquipmentsAndItemsMenu {
  character: CharacterInterface;
  equipments: CharacterEquipmentsInterface;
  itemsBag: ItemInterface[];
  menu: HTMLDivElement;
  comingFrom: "gameMenu" | "mainGame";

  constructor(
    character: CharacterInterface,
    comingFrom: "gameMenu" | "mainGame",
  ) {
    this.character = character;
    this.equipments = character.equipment;
    this.itemsBag = character.itemsBag;
    this.menu = this.createMenu();
    this.comingFrom = comingFrom;
  }

  createMenu() {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("equipmentsAndItems-menu-container");

    const menu = document.createElement("div");
    menu.classList.add("equipmentsAndItems-menu");
    menuContainer.appendChild(menu);
    menu.appendChild(this.createEquipmentsBox());
    menu.appendChild(this.createItemsBox());
    menu.appendChild(this.createInventoryBar());
    menu.appendChild(this.createReturnButton());

    const showCard = this.createItemCardSection();
    menuContainer.appendChild(showCard);

    return menuContainer;
  }

  createEquipmentsBox() {
    const equipmentsBox = document.createElement("div");
    equipmentsBox.classList.add("equipmentsAndItems-menu-equipmentsBox");

    const title = document.createElement("div");
    title.classList.add("equipmentsAndItems-menu-title");
    title.textContent = "Equipments";
    equipmentsBox.appendChild(title);

    const equippingItemsBoxesContainer = document.createElement("div");
    equippingItemsBoxesContainer.classList.add(
      "equipmentsAndItems-menu-equipmentBoxes-container",
    );

    const leftBoxContainer = document.createElement("div");
    leftBoxContainer.classList.add(
      "equipmentsAndItems-menu-equipmentBox-container",
    );
    const rightBoxContainer = document.createElement("div");
    rightBoxContainer.classList.add(
      "equipmentsAndItems-menu-equipmentBox-container",
    );

    const equipmentSlots = [
      { name: "มือหลัก", key: "mainHand", side: "left" },
      { name: "มือสำรอง", key: "offHand", side: "right" },

      { name: "เกราะ", key: "armor", side: "left" },
      { name: "หมวก", key: "headwear", side: "right" },

      { name: "ถุงมือ", key: "gloves", side: "left" },
      { name: "รองเท้า", key: "boots", side: "right" },

      // TODO: Utility Equipment slot is not implemented in BE yet.
      { name: "สร้อยคอ", key: "necklace", side: "left" },
      { name: "อื่น ๆ", key: "utility", side: "right" },

      { name: "แหวนซ้าย", key: "ring_L", side: "left" },
      { name: "แหวนขวา", key: "ring_R", side: "right" },
    ];

    const createEquipmentElement = (name: string, key: string) => {
      const element = document.createElement("div");
      element.classList.add("equipmentsAndItems-menu-equipmentElement");

      const item = this.equipments[key as keyof CharacterEquipmentsInterface];

      if (item) {
        const itemCard = this.makeEquipmentsSmallCard(
          item,
          key as keyof EquipmentType,
        );
        element.appendChild(itemCard);
      } else {
        const image = `../../assets/icons/equipments/${key}.png`;
        const img = document.createElement("img");
        img.src = image;
        img.classList.add(
          "equipmentsAndItems-menu-equipmentElement-empty-image",
        );
        element.appendChild(img);
      }

      return element;
    };

    equipmentSlots.forEach((slot) => {
      const equipmentElement = createEquipmentElement(slot.name, slot.key);
      if (slot.side === "left") {
        leftBoxContainer.appendChild(equipmentElement);
      }
      if (slot.side === "right") {
        rightBoxContainer.appendChild(equipmentElement);
      }
    });

    equippingItemsBoxesContainer.appendChild(leftBoxContainer);
    equippingItemsBoxesContainer.appendChild(rightBoxContainer);

    equipmentsBox.appendChild(equippingItemsBoxesContainer);

    return equipmentsBox;
  }

  createItemsBox() {
    const itemsBox = document.createElement("div");
    itemsBox.classList.add("equipmentsAndItems-menu-itemsBox");

    const title = document.createElement("div");
    title.classList.add("equipmentsAndItems-menu-title");
    title.textContent = "Items";
    itemsBox.appendChild(title);

    const itemSlots = document.createElement("div");
    itemSlots.classList.add("equipmentsAndItems-menu-itemSlot-container");
    for (let i = 1; i <= 20; i++) {
      const itemSlot = document.createElement("div");
      itemSlot.id = `itemSlot${i}`;
      itemSlot.classList.add("equipmentsAndItems-menu-itemSlot");
      itemSlots.appendChild(itemSlot);

      if (this.itemsBag[i - 1] != null) {
        const item = this.itemsBag[i - 1];
        const itemCard = this.makeItemSmallCard(item);
        itemSlot.appendChild(itemCard);
      }
    }
    itemsBox.appendChild(itemSlots);

    return itemsBox;
  }

  createInventoryBar() {
    const inventoryBar = document.createElement("div");
    inventoryBar.classList.add("equipmentsAndItems-menu-inventoryBar");

    //Size
    //to be removed
    this.character.bagSize = 20;

    const size = document.createElement("div");
    size.classList.add("equipmentsAndItems-menu-inventoryBar-size");
    size.textContent = `Capacity: ${this.character.itemsBag.length + this.countEquipmentItems()}/${this.character.bagSize}`;
    inventoryBar.appendChild(size);

    return inventoryBar;
  }

  countEquipmentItems() {
    let count = 0;
    for (const equipment in this.equipments) {
      if (equipment) {
        count += 1;
      }
    }
    return count;
  }

  createReturnButton() {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "equipmentsAndItems-menu-returnButton-container",
    );
    const returnButton = document.createElement("button");
    returnButton.classList.add("equipmentsAndItems-menu-returnButton");
    returnButton.textContent = "กลับ";
    returnButton.addEventListener("click", () => {
      screamer.scream(K.EQUIPMENT_MENU_CLOSE, {
        comingFrom: this.comingFrom,
      });
    });
    buttonContainer.appendChild(returnButton);
    return buttonContainer;
  }

  makeItemSmallCard(item: ItemInterface) {
    const container = document.createElement("div");
    container.classList.add("equipmentsAndItems-menu-smallCard-container");

    const smallImage = document.createElement("img");
    //TODO: to be fix
    smallImage.src = `../../assets/items/test_item.png`;
    smallImage.classList.add("equipmentsAndItems-menu-smallCard-image");
    container.appendChild(smallImage);

    const label = document.createElement("div");
    label.classList.add("equipmentsAndItems-menu-smallCard-label");
    label.textContent = item.name;
    container.appendChild(label);

    container.addEventListener("click", () => {
      this.showItemCard(item);
    });

    return container;
  }

  makeEquipmentsSmallCard(
    equipment: {
      id: string;
      name: string;
      cost: ItemCostInterface;
      weight: number;
      description: string;
    },
    key: keyof EquipmentType,
  ) {
    const container = document.createElement("div");
    container.classList.add("equipmentsAndItems-menu-smallCard-container");

    const smallImage = document.createElement("img");
    //TODO: to be fix
    smallImage.src = `../../assets/items/test_item.png`;
    smallImage.classList.add("equipmentsAndItems-menu-smallCard-image");
    container.appendChild(smallImage);

    container.addEventListener("click", () => {
      const showItem: ItemInterface = {
        id: equipment.id,
        itemType: ItemType.equipment,
        name: equipment.name,
        description: equipment.description,
        weight: equipment.weight,
        cost: equipment.cost,
        quantity: 1,
        isCraftable: false,
        resource: new Map<string, number>(),
      };
      this.showItemCard(showItem);
    });

    return container;
  }

  createItemCardSection() {
    const itemCardSection = document.createElement("div");
    itemCardSection.classList.add("equipmentsAndItems-menu-itemCard-container");
    return itemCardSection;
  }

  createItemCardButtons(cardType: ItemType) {
    let specificButton = document.createElement("button");
    specificButton.classList.add("equipmentsAndItems-menu-itemCard-button");
    let isSpecificCard = false;
    switch (cardType) {
      case ItemType.equipment:
        // equip button + close button
        specificButton.textContent = "ใส่";
        specificButton.addEventListener("click", () => {
          // equip item
        });
        isSpecificCard = true;
        break;
      case ItemType.resource:
        // close button
        break;
      case ItemType.consumable:
        // use button + close button
        specificButton.textContent = "ใช้";
        specificButton.addEventListener("click", () => {
          // use item
        });
        isSpecificCard = true;
        break;
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("equipmentsAndItems-menu-itemCard-buttons");

    if (isSpecificCard) {
      buttonContainer.appendChild(specificButton);
    }

    const closeButton = document.createElement("button");
    closeButton.classList.add("equipmentsAndItems-menu-itemCard-button");
    closeButton.textContent = "ปิด";
    closeButton.addEventListener("click", () => {
      this.closeItemCard();
    });

    buttonContainer.appendChild(closeButton);

    return buttonContainer;
  }

  closeItemCard() {
    const itemCardSection = document.querySelector(
      ".equipmentsAndItems-menu-itemCard-container",
    );
    if (!itemCardSection) {
      return;
    }
    itemCardSection.innerHTML = "";
  }

  createItemCard(item: ItemInterface) {
    const card = new ItemCard(item);
    const itemCard = document.createElement("div");
    itemCard.classList.add("equipmentsAndItems-menu-itemCard");
    itemCard.appendChild(card.card);
  }

  showItemCard(item: ItemInterface) {
    const itemCardSection = document.querySelector(
      ".equipmentsAndItems-menu-itemCard-container",
    );
    if (!itemCardSection) {
      return;
    }
    itemCardSection.innerHTML = "";
    const card = new ItemCard(item);
    itemCardSection.appendChild(card.card);

    const buttons = this.createItemCardButtons(item.itemType);
    itemCardSection.appendChild(buttons);
  }
}
