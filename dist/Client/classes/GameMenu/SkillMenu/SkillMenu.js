"use strict";
class SkillMenu {
    constructor() {
        this.character = gameModel.playerCharacter;
        this.learnedSkills = gameModel.playerCharacter.skills;
        this.battleSkills = gameModel.playerCharacter.battleCards;
        this.beforeChangeLearnedSKills = [...gameModel.playerCharacter.skills];
        this.beforeChangeBattleSkills = [...gameModel.playerCharacter.battleCards];
        this.showingSkill = null;
        this.skillMenu = this.createSkillMenu();
    }
    moveCardToBattle(card, position) {
        const currentIndex = this.battleSkills.indexOf(card);
        if (currentIndex > -1) {
            // Remove the card from its current position if it's being moved within the same section
            this.battleSkills.splice(currentIndex, 1);
        }
        if (position >= 0 && position <= this.battleSkills.length) {
            this.battleSkills.splice(position, 0, card);
        }
        else {
            this.battleSkills.push(card);
        }
        if (currentIndex === -1) {
            // Only remove from learnedSkills if it wasn't moved within the same section
            this.learnedSkills = this.learnedSkills.filter(skill => skill !== card);
        }
        this.updateSkillMenu();
    }
    moveCardToSkills(card, position) {
        // Remove the card from battleSkills if it exists
        const battleIndex = this.battleSkills.indexOf(card);
        if (battleIndex > -1) {
            this.battleSkills.splice(battleIndex, 1);
        }
        // Add the card to learnedSkills at the specified position
        const currentIndex = this.learnedSkills.indexOf(card);
        if (currentIndex > -1) {
            // Remove the card from its current position if it's being moved within the same section
            this.learnedSkills.splice(currentIndex, 1);
        }
        if (position >= 0 && position <= this.learnedSkills.length) {
            this.learnedSkills.splice(position, 0, card);
        }
        else {
            this.learnedSkills.push(card);
        }
        this.updateSkillMenu();
    }
    updateSkillMenu() {
        const popupScreen = document.getElementById('gameMenu-popup');
        if (!popupScreen) {
            popupScreen = this.createCharacterInfoPopup();
        }
        popupScreen.innerHTML = '';
        const skillMenu = this.createSkillMenu();
        popupScreen.appendChild(skillMenu);
    }
    createSkillMenu() {
        const skillMenu = document.createElement('div');
        skillMenu.classList.add('skill-menu');
        const allSkillsSection = document.createElement('div');
        allSkillsSection.classList.add('skills-menu-section');
        allSkillsSection.appendChild(this.createSkillsSection(this.learnedSkills, 'upper', 8, 3));
        allSkillsSection.appendChild(this.createSkillsSection(this.battleSkills, 'lower', 8, 1));
        skillMenu.appendChild(allSkillsSection);
        const showingSkillCardSection = document.createElement('div');
        showingSkillCardSection.classList.add('showing-skillCard-section');
        skillMenu.appendChild(showingSkillCardSection);
        skillMenu.appendChild(this.createButtonsContainer());
        return skillMenu;
    }
    createSkillsSection(skills, section, rows, cols) {
        const skillsSection = this.createGrid(section, rows, cols);
        // Add event listeners for dragover and drop
        skillsSection.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow drop
        });
        skillsSection.addEventListener('drop', (event) => {
            event.preventDefault();
            const skillId = event.dataTransfer.getData('text/plain');
            const skill = this.getSkillById(skillId);
            if (skill) {
                if (section === 'lower' && this.battleSkills.length >= 8) {
                    popup.show('Exceed', 'Only 8 skills can be set into the deck', [{
                            label: "Ok",
                            action: Popup.hide
                        }]);
                    return;
                }
                const dropPosition = this.calculateDropPosition(event.clientY, skillsSection);
                if (section === 'upper') {
                    this.moveCardToSkills(skill, dropPosition);
                }
                else if (section === 'lower') {
                    this.moveCardToBattle(skill, dropPosition);
                }
            }
        });
        skills.forEach(skill => {
            const skillSlot = this.createSkillSlot(skill);
            skillsSection.appendChild(skillSlot);
        });
        return skillsSection;
    }
    createGrid(section, rows, cols) {
        const grid = document.createElement('div');
        grid.classList.add(`skills-menu-${section}-section`);
        grid.style.display = 'grid';
        grid.style.gridTemplateRows = `repeat(${rows})`;
        grid.style.gridTemplateColumns = `repeat(${cols})`;
        return grid;
    }
    createSkillSlot(skill) {
        const skillSlot = document.createElement('div');
        skillSlot.classList.add('skillCard-small-container');
        const smallImage = document.createElement('img');
        smallImage.src = `../../assets/skills/${skill.id}.png`;
        smallImage.classList.add('skillCard-small');
        smallImage.addEventListener('click', () => {
            this.showSkillCard(skill);
        });
        smallImage.draggable = true;
        smallImage.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', skill.id);
        });
        skillSlot.appendChild(smallImage);
        const skillName = document.createElement('div');
        skillName.classList.add('skillCard-small-name');
        skillName.textContent = skill.name;
        skillSlot.appendChild(skillName);
        const skillConsumes = document.createElement('div');
        skillConsumes.classList.add('skillCard-small-consumes-container');
        skillConsumes.appendChild(this.createSkillConsume(skill));
        skillSlot.appendChild(skillConsumes);
        const skillProduces = document.createElement('div');
        skillProduces.classList.add('skillCard-small-produces-container');
        skillProduces.appendChild(this.createSkillProduce(skill));
        skillSlot.appendChild(skillProduces);
        return skillSlot;
    }
    createSkillConsume(skill) {
        const consume = skill.consume;
        const skillConsumesText = document.createElement('div');
        skillConsumesText.classList.add('skillCard-small-consumes');
        Object.entries(consume.elements).forEach(([key, value]) => {
            if (value.amount[skill.level - 1] !== 0) {
                const elementText = document.createElement('div');
                elementText.classList.add('skillCard-small-consumes-element');
                elementText.textContent = `${value.element}: ${value.amount[skill.level - 1]}`;
                skillConsumesText.appendChild(elementText);
            }
        });
        return skillConsumesText;
    }
    createSkillProduce(skill) {
        const produce = skill.produce;
        const skillProducesText = document.createElement('div');
        skillProducesText.classList.add('skillCard-small-produces');
        Object.entries(produce.elements).forEach(([key, value]) => {
            if (value.amount !== 0) {
                const elementText = document.createElement('div');
                elementText.classList.add('skillCard-small-produces-element');
                elementText.textContent = `${value.element}: ${value.amountRange[skill.level - 1][0]} - ${value.amountRange[skill.level - 1][1]}`;
                skillProducesText.appendChild(elementText);
            }
        });
        return skillProducesText;
    }
    createButtonsContainer() {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('skills-menu-buttonsContainer');
        const backButton = document.createElement('button');
        backButton.classList.add('skills-menu-button');
        backButton.textContent = 'Save and Back';
        backButton.addEventListener('click', () => {
            const updateMessage = {
                type: 'UPDATE_SKILLS_AND_BATTLE_CARDS',
                characterID: this.character.characterID,
                skills: this.learnedSkills,
                battleCards: this.battleSkills
            };
            characterWS.send(updateMessage);
            let popupScreen = document.getElementById('gameMenu-popup');
            popupScreen.innerHTML = '';
            gameMenu.showCharacterInfo(this.character, 'player');
        });
        buttonsContainer.appendChild(backButton);
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('skills-menu-button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            gameModel.playerCharacter.skills = this.beforeChangeLearnedSKills;
            gameModel.playerCharacter.battleCards = this.beforeChangeBattleSkills;
            let popupScreen = document.getElementById('gameMenu-popup');
            popupScreen.innerHTML = '';
            gameMenu.showCharacterInfo(this.character, 'player');
        });
        buttonsContainer.appendChild(cancelButton);
        return buttonsContainer;
    }
    showSkillCard(skill) {
        const showingSkillCardSection = document.querySelector('.showing-skillCard-section');
        showingSkillCardSection.innerHTML = '';
        const skillCard = new SkillCard(skill).card;
        showingSkillCardSection.appendChild(skillCard);
    }
    calculateDropPosition(clientY, container) {
        const containerRect = container.getBoundingClientRect();
        const offsetY = clientY - containerRect.top;
        const children = Array.from(container.children);
        for (let i = 0; i < children.length; i++) {
            const childRect = children[i].getBoundingClientRect();
            if (offsetY < childRect.top + childRect.height / 2) {
                return i;
            }
        }
        return children.length;
    }
    getSkillById(skillId) {
        return this.learnedSkills.find(skill => skill.id === skillId) || this.battleSkills.find(skill => skill.id === skillId);
    }
}
