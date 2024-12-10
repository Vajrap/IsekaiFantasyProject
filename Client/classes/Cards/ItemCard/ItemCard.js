class ItemCard {
    constructor(item) {
        this.item = item;
        this.card = this.createItemCard();
    }

    createItemCard() {
        const card = document.createElement('div');
        card.classList.add('itemCard');
        this.frontFace = this.createFrontFace();
        card.appendChild(this.frontFace);

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
        const nameAndCostContainer = document.createElement('div');
        nameAndCostContainer.classList.add('itemCard-nameAndCost');
        
        const name = document.createElement('div');
        name.classList.add('itemCard-name');
        name.textContent = this.item.name;
        nameAndCostContainer.appendChild(name);

        const cost = document.createElement('div');
        cost.classList.add('itemCard-cost');
        cost.textContent = `Cost: ${this.item.itemCost.baseCost + this.item.itemCost.bonusCost}`;
        nameAndCostContainer.appendChild(cost);

        return nameAndCostContainer;
    }

    createItemCardPortrait() {
        const portrait = document.createElement('img');
        // portrait.src = `../../assets/items/${this.item.id}.png`;
        portrait.src = `../../assets/skills/skill_rogue_05.png`
        portrait.classList.add('itemCard-portrait');
        return portrait;
    }

    createItemCardDescription() {
        switch (this.item.itemType) {
            case "equipment" :
                const equipmentType = this.item.equipmentType;
                if (equipmentType === "weapon") {
                    return this.createWeaponDescription();
                }
                else if (equipmentType === "armor") {
                    return this.createArmorDescription();
                }
                else if (equipmentType === "accessory") {
                    return this.createAccessoryDescription();
                }
                else {
                    popup.show("Error", "Equipment type not found");
                }
                break;
            case "consumable" :
                return this.createConsumableDescription();
            default:
                console.log("Item type not found");
                break;
        }
    }

    createWeaponDescription() {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('itemCard-descriptionBox');

        const weaponData = document.createElement('div');
        weaponData.classList.add('itemCard-weaponData');

        const weaponType = document.createElement('div');
        weaponType.textContent = `Weapon Type: ${this.item.weaponType} ${this.item.isUnique ? "(Unique)" : ""}`;
        weaponData.appendChild(weaponType);

        const handler = document.createElement('div');
        handler.textContent = `Handler: ${this.item.handler === 1 ? "One-Handed" : "Two-Handed"}`;
        weaponData.appendChild(handler);

        const mainAttackType = document.createElement('div');
        mainAttackType.textContent = `Main Weapon Damage type: ${this.item.mainWeaponAttackType}`
        weaponData.appendChild(mainAttackType);

        const preferredPosition = document.createElement('div');
        preferredPosition.textContent = `Preferred Position: ${this.item.preferredPosition}`
        weaponData.appendChild(preferredPosition);

        const physical = document.createElement('div')
        physical.textContent = `Physical: ${this.item.weaponAttack.physicalType} (${this.item.weaponAttack.physicalDamageDice}+${this.item.physicalDamageModifier.target}; Hit Modifier: ${this.item.physicalHitModifier.target})`
        weaponData.appendChild(physical);

        const magical = document.createElement('div')
        magical.textContent = `Magical: ${this.item.weaponAttack.magicalType} (${this.item.weaponAttack.magicalDamageDice}+${this.item.magicalDamageModifier.target}; Hot Modifier: ${this.item.magicalHitModifier.target})`
        weaponData.appendChild(magical)

        descriptionContainer.appendChild(weaponData)

        const description = document.createElement('div');
        description.textContent = this.item.description;
        description.classList.add('itemCard-description');
        descriptionContainer.appendChild(description);

        return descriptionContainer;
    }

    createArmorDescription() {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('itemCard-descriptionBox');
        
        const armorType = document.createElement('div');
        armorType.classList.add('itemCard-equipmentType');

        armorType.textContent = `Armor Type: ${this.item.material} ${this.item.isUnique ? "(Unique)" : ""}`;
        descriptionContainer.appendChild(armorType);

        const armorAC = document.createElement('div');
        armorAC.classList.add('itemCard-equipmentAC');
        armorAC.textContent = `Armor Class: ${this.item.AC}`;
        descriptionContainer.appendChild(armorAC);

        const description = document.createElement('div');
        description.classList.add('itemCard-description');
        description.textContent = this.item.description;
        descriptionContainer.appendChild(description);

        return descriptionContainer;
    }

    createAccessoryDescription() {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('itemCard-descriptionBox');
        
        const accessoryType = document.createElement('div');
        accessoryType.classList.add('itemCard-equipmentType');
        accessoryType.textContent = `Accessory Type: ${this.item.material} ${this.item.isUnique ? "(Unique)" : ""}`;
        descriptionContainer.appendChild(accessoryType);

        const description = document.createElement('div');
        description.classList.add('itemCard-description');
        description.textContent = this.item.description;
        descriptionContainer.appendChild(description);

        return descriptionContainer;
    }

    createConsumableDescription() {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('itemCard-descriptionBox');
        
        const description = document.createElement('div');
        description.classList.add('itemCard-description');
        description.textContent = this.item.description;
        descriptionContainer.appendChild(description);

        return descriptionContainer;
    }
}