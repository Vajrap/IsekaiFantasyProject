export class ItemCard {
    constructor(item) {
        this.item = item;
        this.card = this.createItemCard();
    }
    createItemCard() {
        const card = document.createElement('div');
        card.classList.add('itemCard');
        const frontFace = this.createFrontFace();
        card.appendChild(frontFace);
        return card;
    }
    createFrontFace() {
        const frontFace = document.createElement('div');
        frontFace.classList.add('itemCard-front');
        frontFace.appendChild(this.createItemCardNameAndCost());
        frontFace.appendChild(this.createItemCardPortrait());
        frontFace.appendChild(this.createItemCardDescription());
        return frontFace;
    }
    createItemCardNameAndCost() {
        console.log(this.item.cost);
        const nameAndCostContainer = document.createElement('div');
        nameAndCostContainer.classList.add('itemCard-nameAndCost');
        const name = document.createElement('div');
        name.classList.add('itemCard-name');
        name.textContent = this.item.name;
        nameAndCostContainer.appendChild(name);
        const cost = document.createElement('div');
        cost.classList.add('itemCard-cost');
        cost.textContent = `Cost: ${this.item.cost}`;
        nameAndCostContainer.appendChild(cost);
        return nameAndCostContainer;
    }
    createItemCardPortrait() {
        const portrait = document.createElement('img');
        // portrait.src = `../../assets/items/${this.item.id}.png`;
        portrait.src = `../../assets/skills/skill_rogue_05.png`;
        portrait.classList.add('itemCard-portrait');
        return portrait;
    }
    createItemCardDescription() {
        const description = document.createElement('div');
        description.classList.add('itemCard-description');
        description.textContent = this.item.description;
        return description;
    }
}
