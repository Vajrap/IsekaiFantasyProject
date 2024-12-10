class CharacterCard {
    constructor(character) {
        this.character = character;
        this.card = this.createCharacterCard();
        this.showingSide = 'front';
    }

    createCharacterCard() {
        const card = document.createElement('div');
        card.classList.add('characterCard');
        this.frontFace = this.createFrontFace();
        this.backFace = this.createBackFace();

        this.frontFace.addEventListener('click', () => this.flipCard());
        this.backFace.addEventListener('click', () => this.flipCard());

        card.appendChild(this.frontFace);
        card.appendChild(this.backFace);

        return card;
    }

    createFrontFace() {
        const frontFace = document.createElement('div');
        frontFace.classList.add('characterCard-front');
        frontFace.appendChild(this.createCharacterInfo());
        frontFace.appendChild(this.createCharacterPortrait());
        frontFace.appendChild(this.createActiveInternal());
        frontFace.appendChild(this.createEquipments());
        frontFace.appendChild(this.createSkills());
        frontFace.appendChild(this.createPosition());
        return frontFace;
    }

    createBackFace() {
        const backFace = document.createElement('div');
        backFace.classList.add('characterCard-back');
        backFace.classList.add('hidden');
        backFace.appendChild(this.createAttributes());
        backFace.appendChild(this.createBattlers());
        backFace.appendChild(this.createElements());
        backFace.appendChild(this.createProficiencies());
        backFace.appendChild(this.createArtisans());
        backFace.appendChild(this.createLearnedInternal());
        backFace.appendChild(this.createLearnedSkills());
        backFace.appendChild(this.createTraits());
        return backFace;
    }

    createCharacterInfo() {
        const characterInfoPanel = document.createElement('div');
        characterInfoPanel.classList.add('characterCard-panel-Info');
        const characterInfoValueContainer = document.createElement('div');
        characterInfoValueContainer.classList.add('characterCard-info-valueContainer');
        characterInfoValueContainer.appendChild(this.createItemLabel(this.character.name));
        characterInfoValueContainer.appendChild(this.createItemLabel(this.character.alignment));
        characterInfoValueContainer.appendChild(this.createItemLabel(`Level: ${this.character.level}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`Title: ${this.character.title}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`Fame: ${this.character.fame}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`Mood: ${this.character.mood}`));
        characterInfoValueContainer.appendChild(this.createItemValue(`🔴: ${this.character.currentHP}/${this.character.maxHP}`));
        characterInfoValueContainer.appendChild(this.createItemValue(`🔵: ${this.character.currentMP}/${this.character.maxMP}`))
        characterInfoValueContainer.appendChild(this.createItemValue(`🟡: ${this.character.currentSP}/${this.character.maxSP}`));
        characterInfoPanel.appendChild(characterInfoValueContainer);
        return characterInfoPanel;
    }

    createCharacterPortrait() {
        const characterPortrait = document.createElement('img');
        characterPortrait.src = `../../assets/portrait/${this.character.portrait}.png`;
        characterPortrait.classList.add('characterCard-portrait');
        return characterPortrait;
    }

    createActiveInternal() {
        const activeInternalPanel = this.createPanel(`Active Internal`);
        let activeInternalName = 'None';
        console.log(this.character.activeInternal);
        if (this.character.activeInternal !== undefined) {
            activeInternalName = this.character.activeInternal
        }
        activeInternalPanel.appendChild(this.createItemValue(activeInternalName));
        return activeInternalPanel;
    }

    createEquipments() {
        const equipmentPanel = this.createPanel(`Equipments`);
        const equipmentContainer = document.createElement('div');
        equipmentContainer.classList.add('characterCard-equipment-container');

        const equipment = this.character.equipments;

        const equipItems = [
            { label: 'Main Hand', item: equipment.mainHand },
            { label: 'Off Hand', item: equipment.offHand },
            { label: 'Armor', item: equipment.armor },
            { label: 'Accessory', item: equipment.accessory }
        ];

        equipItems.forEach(equip => {
            if (equip.item === null) {
                const equipmentLabel = this.createItemLabel(equip.label);
                const equipmentValue = this.createItemValue('None');
                equipmentContainer.appendChild(equipmentLabel);
                equipmentContainer.appendChild(equipmentValue);
                return;
            }
            const equipmentLabel = this.createItemLabel(equip.label);
            const equipmentValue = this.createItemValue(equip.item.name? equip.item.name : 'None');
            equipmentContainer.appendChild(equipmentLabel);
            equipmentContainer.appendChild(equipmentValue);
        });

        equipmentPanel.appendChild(equipmentContainer);
        return equipmentPanel;
    }


    createTraits() {
        const traitsPanel = this.createPanel(`Traits`);

        const traitsContainer = document.createElement('div');
        traitsContainer.classList.add('characterCard-traits-container');

        const traits = this.character.traits;
        traits.forEach(trait => {
            if (trait === null) {
                const traitElement = this.createItemValue('None');
                traitsContainer.appendChild(traitElement);
                return;
            }

            const traitElement = this.createItemValue(`${trait.name}`)
            traitsContainer.appendChild(traitElement);
        });

        traitsPanel.appendChild(traitsContainer);
        return traitsPanel;
    }

    createSkills() {
        const skillPanel = this.createPanel('Skill Sequence');
    
        const skillContainer = document.createElement('div');
        skillContainer.classList.add('characterCard-skill-container');
    
        // Display the battleCards in reverse order
        for (let i = this.character.battleCards.length - 1; i >= 0; i--) {
            const skillValue = this.createItemValue(`${this.character.battleCards.length - i}. ${this.character.battleCards[i].name}`);
            skillContainer.appendChild(skillValue);
        }
    
        skillPanel.appendChild(skillContainer);
    
        return skillPanel;
    }
    

    createPosition() {
        const positionPanel = this.createPanel(`Party Position`);
        const positionValue = this.createItemValue(this.character.position <= 2 ? 'Front' : 'Back');
        positionPanel.appendChild(positionValue);
        return positionPanel;
    }


    createAttributes() {
        const attributesPanel = this.createPanel(`Attributes`);
        const attributesContainer = document.createElement('div');
        attributesContainer.classList.add('characterCard-status-container');
        for (const attribute in this.character.attributes) {
            const attributeName = attribute.slice(0, 3).toUpperCase();
            const attributeElement = this.createItemValue(`${attributeName}: ${this.character.attributes[attribute].base + this.character.attributes[attribute].bonus}`);
            attributesContainer.appendChild(attributeElement);
        }
        attributesPanel.appendChild(attributesContainer);
        return attributesPanel;
    }

    createBattlers() {
        const battlersPanel = this.createPanel(`Battlers`);
        const battlersContainer = document.createElement('div');
        battlersContainer.classList.add('characterCard-status-container');
        for (const battler in this.character.battlers) {
            const battlerElement = this.createItemValue(`${battler}: ${this.character.battlers[battler].base + this.character.battlers[battler].bonus}`);
            battlersContainer.appendChild(battlerElement);
        }
        battlersPanel.appendChild(battlersContainer);
        return battlersPanel;
    }

    createElements() {
        const elementsPanel = this.createPanel(`Elements`);
        const elementsContainer = document.createElement('div');
        elementsContainer.classList.add('characterCard-status-container');
        for (const element in this.character.elements) {
            const elementElement = this.createItemValue(`${element}: ${this.character.elements[element].base + this.character.elements[element].bonus}`);
            elementsContainer.appendChild(elementElement);
        }
        elementsPanel.appendChild(elementsContainer);
        return elementsPanel;
    }

    createProficiencies() {
        const proficienciesPanel = this.createPanel(`Proficiencies`);
        const proficienciesContainer = document.createElement('div');
        proficienciesContainer.classList.add('characterCard-status-container');
        for (const proficiency in this.character.proficiencies) {
            const proficiencyElement = this.createItemValue(`${proficiency}: ${this.character.proficiencies[proficiency].base + this.character.proficiencies[proficiency].bonus}`);
            proficienciesContainer.appendChild(proficiencyElement);
        }
        proficienciesPanel.appendChild(proficienciesContainer);
        return proficienciesPanel;
    }

    createArtisans() {
        const artisansPanel = this.createPanel(`Artisans`);
        const artisansContainer = document.createElement('div');
        artisansContainer.classList.add('characterCard-status-container');
        for (const artisan in this.character.artisans) {
            const artisanElement = this.createItemValue(`${artisan}: ${this.character.artisans[artisan].base + this.character.artisans[artisan].bonus}`);
            artisansContainer.appendChild(artisanElement);
        }
        artisansPanel.appendChild(artisansContainer);
        return artisansPanel;
    }

    createLearnedInternal() {
        const learnedInternalPanel = this.createPanel(`Learned Internal`);
        const learnedInternalContainer = document.createElement('div');
        learnedInternalContainer.classList.add('characterCard-learnedInternal-container');
        for (const internal in this.character.allInternal) {
            const internalElement = this.createItemValue(`${this.character.allInternal[internal].name}: level ${this.character.allInternal[internal].level}`);
            learnedInternalContainer.appendChild(internalElement);
        }
        learnedInternalPanel.appendChild(learnedInternalContainer);
        return learnedInternalPanel;
    }

    createLearnedSkills() {
        const learnedSkillsPanel = this.createPanel(`Learned Skills`);
        const learnedSkillsContainer = document.createElement('div');
        learnedSkillsContainer.classList.add('characterCard-learnedSkills-container');
        for (const skill in this.character.skills) {
            const skillElement = this.createItemValue(`${this.character.skills[skill].name}`);
            learnedSkillsContainer.appendChild(skillElement);
        }
        for (const skill in this.character.battleCards) {
            const skillElement = this.createItemValue(`${this.character.battleCards[skill].name}`);
            learnedSkillsContainer.appendChild(skillElement);
        }
        learnedSkillsPanel.appendChild(learnedSkillsContainer);
        return learnedSkillsPanel;
    }


    createPanel(panelName) {
        const panel = document.createElement('div');
        const className = `characterCard-panel-` + panelName.replace(/\s+/g, '-');
        panel.classList.add(className);
        
        const backgroundBox = document.createElement('div');
        backgroundBox.classList.add('characterCard-panel-backgroundBox');
        
        const panelLabel = this.createPanelLabel(panelName);
        backgroundBox.appendChild(panelLabel);
        
        panel.appendChild(backgroundBox);
    
        return panel;
    }

    createPanelLabel(label) {
        const labelElement = document.createElement('div');
        const className = 'characterCard-panel-label-' + label.replace(/\s+/g, '-');
        labelElement.classList.add(className);
        labelElement.textContent = label;
        return labelElement;
    }

    createItemLabel(label) {
        const labelElement = document.createElement('div');
        labelElement.classList.add('characterCard-item-label');
        labelElement.textContent = label;
        return labelElement;
    }

    createItemValue(value) {
        const valueElement = document.createElement('div');
        valueElement.classList.add('characterCard-item-value');
        valueElement.textContent = value;
        return valueElement;
    }

    flipCard() {
        if (this.showingSide === 'front') {
            this.frontFace.classList.add('hidden');
            this.backFace.classList.remove('hidden');
            this.showingSide = 'back';
        } else {
            this.frontFace.classList.remove('hidden');
            this.backFace.classList.add('hidden');
            this.showingSide = 'front';
        }
    }

    render() {
        return this.card;
    }
}
