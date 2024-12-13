"use strict";
class EquipmentsAndItemsMenu {
    constructor() {
        this.character = gameModel.playerCharacter;
        this.equipments = gameModel.playerCharacter.equipments;
        this.itemsBag = gameModel.playerCharacter.itemsBag;
        this.showItem = null;
        this.menu = this.createMenu();
    }
    createMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.classList.add('equipmentsAndItems-menu-container');
        const menu = document.createElement('div');
        menu.classList.add('equipmentsAndItems-menu');
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
        const equipmentsBox = document.createElement('div');
        equipmentsBox.classList.add('equipmentsAndItems-menu-equipmentsBox');
        const title = document.createElement('div');
        title.classList.add('equipmentsAndItems-menu-title');
        title.textContent = 'Equipments';
        equipmentsBox.appendChild(title);
        const leftBoxContainer = document.createElement('div');
        leftBoxContainer.classList.add('equipmentsAndItems-menu-equipmentBox-container');
        const rightBoxContainer = document.createElement('div');
        rightBoxContainer.classList.add('equipmentsAndItems-menu-equipmentBox-container');
        for (const equipment in this.equipments) {
            const element = document.createElement('div');
            element.classList.add(`equipmentsAndItems-menu-equipmentElement`);
            const label = document.createElement('div');
            label.classList.add('equipmentsAndItems-menu-equipmentLabel');
            label.textContent = equipment;
            element.appendChild(label);
            const equipmentItem = this.equipments[equipment];
            if (equipmentItem) {
                element.appendChild(this.makeItemSmallCard(equipmentItem));
            }
            const side = (equipment === 'mainHand' || equipment === 'offHand') ? 'left' : 'right';
            if (side === 'left') {
                leftBoxContainer.appendChild(element);
            }
            else {
                rightBoxContainer.appendChild(element);
            }
        }
        equipmentsBox.appendChild(leftBoxContainer);
        equipmentsBox.appendChild(rightBoxContainer);
        return equipmentsBox;
    }
    createItemsBox() {
        const itemsBox = document.createElement('div');
        itemsBox.classList.add('equipmentsAndItems-menu-itemsBox');
        const title = document.createElement('div');
        title.classList.add('equipmentsAndItems-menu-title');
        title.textContent = 'Items';
        itemsBox.appendChild(title);
        const itemSlots = document.createElement('div');
        itemSlots.classList.add('equipmentsAndItems-menu-itemSlot-container');
        for (let i = 1; i <= 20; i++) {
            const itemSlot = document.createElement('div');
            itemSlot.id = `itemSlot${i}`;
            itemSlot.classList.add('equipmentsAndItems-menu-itemSlot');
            itemSlots.appendChild(itemSlot);
        }
        itemsBox.appendChild(itemSlots);
        for (let i = 1; i <= this.itemsBag.length; i++) {
            const item = this.itemsBag[i - 1];
            const itemCard = this.makeItemSmallCard(item);
            const itemSlot = document.getElementById(`itemSlot${i}`);
            itemSlot.appendChild(itemCard);
        }
        return itemsBox;
    }
    createInventoryBar() {
        const inventoryBar = document.createElement('div');
        inventoryBar.classList.add('equipmentsAndItems-menu-inventoryBar');
        //Size
        //to be removed
        this.character.bagSize = 20;
        const size = document.createElement('div');
        size.classList.add('equipmentsAndItems-menu-inventoryBar-size');
        size.textContent = `Capacity: ${this.character.itemsBag.items.length + this.countEquipmentItems()}/${this.character.bagSize}`;
        inventoryBar.appendChild(size);
        return inventoryBar;
    }
    countEquipmentItems() {
        let count = 0;
        for (const equipment in this.equipments) {
            if (this.equipments[equipment]) {
                count += 1;
            }
        }
        return count;
    }
    createReturnButton() {
        const returnButton = document.createElement('button');
        returnButton.classList.add('equipmentsAndItems-menu-returnButton');
        returnButton.textContent = 'Return';
        returnButton.addEventListener('click', () => {
            let popupScreen = document.getElementById('gameMenu-popup');
            popupScreen.innerHTML = '';
            gameMenu.showCharacterInfo(this.character, 'player');
        });
        return returnButton;
    }
    makeItemSmallCard(item) {
        const container = document.createElement('div');
        container.classList.add('equipmentsAndItems-menu-smallCard-container');
        const label = document.createElement('div');
        label.classList.add('equipmentsAndItems-menu-smallCard-label');
        label.textContent = item.name;
        container.appendChild(label);
        const smallImage = document.createElement('img');
        //to be fix
        smallImage.src = `../../assets/skills/skill_rogue_05.png`;
        smallImage.classList.add('equipmentsAndItems-menu-smallCard-image');
        container.appendChild(smallImage);
        container.addEventListener('click', () => {
            this.showItem = item;
            this.showItemCard(item);
        });
        return container;
    }
    createItemCardSection() {
        const itemCardSection = document.createElement('div');
        itemCardSection.classList.add('equipmentsAndItems-menu-itemCard-container');
        return itemCardSection;
    }
    createItemCard(item) {
        const card = new ItemCard(item);
        const itemCard = document.createElement('div');
        itemCard.classList.add('equipmentsAndItems-menu-itemCard');
        itemCard.appendChild(card);
    }
    showItemCard(item) {
        const itemCardSection = document.querySelector('.equipmentsAndItems-menu-itemCard-container');
        itemCardSection.innerHTML = '';
        const card = new ItemCard(item);
        itemCardSection.appendChild(card.card);
    }
}
