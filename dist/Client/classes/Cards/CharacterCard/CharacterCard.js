import { statusTextMapper } from "../../../../Client/TextMapper/status.js";
export class CharacterCard {
    constructor(character) {
        this.character = character;
        this.card = this.createCharacterCard();
        this.showingSide = 'front';
        this.frontFace = document.createElement('div');
        this.backFace = document.createElement('div');
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
        frontFace.appendChild(this.createEquipments());
        return frontFace;
    }
    createBackFace() {
        const backFace = document.createElement('div');
        backFace.classList.add('characterCard-back');
        backFace.classList.add('hidden');
        backFace.appendChild(this.createAttributes());
        backFace.appendChild(this.createElements());
        backFace.appendChild(this.createProficiencies());
        backFace.appendChild(this.createArtisans());
        backFace.appendChild(this.createLearnedSkills());
        backFace.appendChild(this.createTraits());
        return backFace;
    }
    createCharacterInfo() {
        const characterInfoPanel = document.createElement('div');
        characterInfoPanel.classList.add('characterCard-panel-Info');
        const characterInfoValueContainer = document.createElement('div');
        characterInfoValueContainer.classList.add('characterCard-info-valueContainer');
        characterInfoValueContainer.appendChild(this.createItemLabel(`ชื่อ: ${this.character.name}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`นิสัย: ${this.character.alignment}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`เลเวล: ${this.character.level}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`ฉายา: ${'TITLE PLACE HOLDER'}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`ชื่อเสียง: ${this.character.fame}`));
        characterInfoValueContainer.appendChild(this.createItemLabel(`อารมณ์: ${this.character.mood}`));
        characterInfoValueContainer.appendChild(this.createItemValue(`HP: ${this.character.currentHP}/${this.character.maxHP}`));
        characterInfoValueContainer.appendChild(this.createItemValue(`MP: ${this.character.currentMP}/${this.character.maxMP}`));
        characterInfoValueContainer.appendChild(this.createItemValue(`SP: ${this.character.currentSP}/${this.character.maxSP}`));
        characterInfoPanel.appendChild(characterInfoValueContainer);
        return characterInfoPanel;
    }
    createCharacterPortrait() {
        const characterPortrait = document.createElement('img');
        characterPortrait.src = `../../assets/portrait/${this.character.portrait}.png`;
        characterPortrait.classList.add('characterCard-portrait');
        return characterPortrait;
    }
    createEquipments() {
        const equipmentPanel = this.createPanel(`Equipments`, `อุปกรณ์สวมใส่`);
        const equipmentContainer = document.createElement('div');
        equipmentContainer.classList.add('characterCard-equipment-container');
        const equipment = this.character.equipment;
        const equipItems = [
            { label: 'มือหลัก', item: equipment.mainHand },
            { label: 'มือรอง', item: equipment.offHand },
            { label: 'ชุดเกราะ', item: equipment.armor },
            { label: 'หมวก', item: equipment.headwear },
            { label: 'ถุงมือ', item: equipment.gloves },
            { label: 'รองเท้า', item: equipment.boots },
            { label: 'แหวน', item: equipment.ring_R },
            { label: 'แหวน', item: equipment.ring_L },
            { label: 'สร้อย', item: equipment.necklace },
        ];
        equipItems.forEach(equip => {
            if (equip.item === undefined) {
                const equipmentLabel = this.createItemLabel(equip.label);
                const equipmentValue = this.createItemValue('-');
                equipmentContainer.appendChild(equipmentLabel);
                equipmentContainer.appendChild(equipmentValue);
                return;
            }
            const equipmentLabel = this.createItemLabel(equip.label);
            const equipmentValue = this.createItemValue(equip.item.name ? equip.item.name : '-');
            equipmentContainer.appendChild(equipmentLabel);
            equipmentContainer.appendChild(equipmentValue);
        });
        equipmentPanel.appendChild(equipmentContainer);
        return equipmentPanel;
    }
    createTraits() {
        const traitsPanel = this.createPanel(`Traits`, `คุณสมบัติ`);
        const traitsContainer = document.createElement('div');
        traitsContainer.classList.add('characterCard-traits-container');
        const traits = this.character.traits;
        traits.forEach(trait => {
            if (trait === null) {
                const traitElement = this.createItemValue('-');
                traitsContainer.appendChild(traitElement);
                return;
            }
            const traitElement = this.createItemValue(`${trait.name}`);
            traitsContainer.appendChild(traitElement);
        });
        traitsPanel.appendChild(traitsContainer);
        return traitsPanel;
    }
    createSkills() {
        const skillPanel = this.createPanel('Skill Sequence', 'ลำดับการใช้สกิล');
        const skillContainer = document.createElement('div');
        skillContainer.classList.add('characterCard-skill-container');
        // Display the battleCards in reverse order
        for (let i = this.character.activeSkills.length - 1; i >= 0; i--) {
            const skillValue = this.createItemValue(`${this.character.activeSkills.length - i}. ${this.character.activeSkills[i].name}`);
            skillContainer.appendChild(skillValue);
        }
        skillPanel.appendChild(skillContainer);
        return skillPanel;
    }
    createPosition() {
        const positionPanel = this.createPanel(`Party Position`, `ตำแหน่งในปาร์ตี้`);
        const positionValue = this.createItemValue(this.character.position <= 2 ? 'Front' : 'Back');
        positionPanel.appendChild(positionValue);
        return positionPanel;
    }
    createAttributes() {
        const attributesPanel = this.createPanel(`Attributes`, `ค่าสถานะพื้นฐาน`);
        const attributesContainer = document.createElement('div');
        attributesContainer.classList.add('characterCard-status-container');
        const attributes = [
            'charisma',
            'luck',
            'intelligence',
            'leadership',
            'vitality',
            'willpower',
            'breath',
            'planar',
            'dexterity',
            'agility',
            'strength',
            'endurance',
        ];
        for (const attribute of attributes) {
            const attributeName = statusTextMapper(attribute);
            const attributeElement = this.createItemValue(`${attributeName}: ${this.character.status[attribute]}`);
            attributesContainer.appendChild(attributeElement);
        }
        attributesPanel.appendChild(attributesContainer);
        return attributesPanel;
    }
    createElements() {
        const elementsPanel = this.createPanel(`Elements`, `ธาตุ`);
        const elementsContainer = document.createElement('div');
        elementsContainer.classList.add('characterCard-status-container');
        const elements = [
            'order',
            'chaos',
            'geo',
            'water',
            'air',
            'fire',
        ];
        for (const element of elements) {
            const elementName = statusTextMapper(element);
            const elementElement = this.createItemValue(`${elementName}: ${this.character.status[element]}`);
            elementsContainer.appendChild(elementElement);
        }
        elementsPanel.appendChild(elementsContainer);
        return elementsPanel;
    }
    createProficiencies() {
        const proficienciesPanel = this.createPanel(`Proficiencies`, `ความเชี่ยวชาญอาวุธ`);
        const proficienciesContainer = document.createElement('div');
        proficienciesContainer.classList.add('characterCard-status-container');
        const proficiencies = [
            'bareHand',
            'sword',
            'blade',
            'dagger',
            'spear',
            'axe',
            'mace',
            'shield',
            'bow',
            'magicWand',
            'staff',
            'tome',
            'orb',
        ];
        for (const proficiency of proficiencies) {
            const proficiencyName = statusTextMapper(proficiency);
            const proficiencyElement = this.createItemValue(`${proficiencyName}: ${this.character.status[proficiency]}`);
            proficienciesContainer.appendChild(proficiencyElement);
        }
        proficienciesPanel.appendChild(proficienciesContainer);
        return proficienciesPanel;
    }
    createArtisans() {
        const artisansPanel = this.createPanel(`Artisans`, `ความชำนาญอาชีพ`);
        const artisansContainer = document.createElement('div');
        artisansContainer.classList.add('characterCard-status-container');
        const artisans = [
            'mining',
            'smithing',
            'woodcutting',
            'carpentry',
            'foraging',
            'weaving',
            'skinning',
            'tanning',
            'jewelry',
            'cooking',
            'alchemy',
            'enchanting',
        ];
        for (const artisan of artisans) {
            const artisanName = statusTextMapper(artisan);
            const artisanElement = this.createItemValue(`${artisanName}: ${this.character.status[artisan]}`);
            artisansContainer.appendChild(artisanElement);
        }
        artisansPanel.appendChild(artisansContainer);
        return artisansPanel;
    }
    createLearnedSkills() {
        const learnedSkillsPanel = this.createPanel(`Learned Skills`, `สกิลที่เรียนรู้`);
        const learnedSkillsContainer = document.createElement('div');
        learnedSkillsContainer.classList.add('characterCard-learnedSkills-container');
        for (const skill in this.character.skills) {
            const skillElement = this.createItemValue(`${this.character.skills[skill].name}`);
            learnedSkillsContainer.appendChild(skillElement);
        }
        for (const skill in this.character.activeSkills) {
            const skillElement = this.createItemValue(`${this.character.activeSkills[skill].name}`);
            learnedSkillsContainer.appendChild(skillElement);
        }
        learnedSkillsPanel.appendChild(learnedSkillsContainer);
        return learnedSkillsPanel;
    }
    createPanel(panelName, label) {
        const panel = document.createElement('div');
        const className = `characterCard-panel-` + panelName.replace(/\s+/g, '-');
        panel.classList.add(className);
        const backgroundBox = document.createElement('div');
        backgroundBox.classList.add('characterCard-panel-backgroundBox');
        const panelLabel = this.createPanelLabel(label);
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
        console.log('Flipping Card');
        const frontFace = this.card.querySelector('.characterCard-front');
        const backFace = this.card.querySelector('.characterCard-back');
        if (this.showingSide === 'front') {
            console.log(`case: ${this.showingSide}`);
            frontFace.classList.add('hidden');
            backFace.classList.remove('hidden');
            this.showingSide = 'back';
        }
        else {
            console.log(`case: ${this.showingSide}`);
            frontFace.classList.remove('hidden');
            backFace.classList.add('hidden');
            this.showingSide = 'front';
        }
    }
    render() {
        return this.card;
    }
}
