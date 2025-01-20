import { popup } from "../../../../Client/classes/popup/popup.js";
import { gameVM } from "../../../../Client/HTMLs/game/gameViewModel.js";
import { gameMenu } from "../GameMenu.js";
import { SkillCard, mapElementName } from "../../../../Client/classes/Cards/SkillCard/SkillCard.js";
export class SkillMenu {
    // eslint-disable-next-line max-lines-per-function
    constructor(playerCharacter, learnedSkills, battleSkills) {
        // battleSkills might needed to be slots, we allow 7 cards in the deck so 7 slots of battleSkills
        // might be like battleSkills: {slot1: CharacterSkillInterface | undefined, slot2: CharacterSkillInterface | undefined, ...}
        this.battleSkills = {
            slot1: undefined,
            slot2: undefined,
            slot3: undefined,
            slot4: undefined,
            slot5: undefined,
            slot6: undefined,
            slot7: undefined,
        };
        this.character = playerCharacter;
        this.learnedSkills = playerCharacter.skills;
        // this.battleSkills = playerCharacter.activeSkills;
        this.beforeChangeLearnedSKills = [...playerCharacter.skills];
        this.beforeChangeBattleSkills = [...playerCharacter.activeSkills];
        this.showingSkill = null;
        this.battleSkills = {
            slot1: battleSkills[0],
            slot2: battleSkills[1],
            slot3: battleSkills[2],
            slot4: battleSkills[3],
            slot5: battleSkills[4],
            slot6: battleSkills[5],
            slot7: battleSkills[6],
        };
        this.skillMenu = this.createSkillMenu();
    }
    getCharacterInfoPopupScreen() {
        let popupScreen = document.getElementById('gameMenu-popup');
        if (!popupScreen) {
            popupScreen = this.createCharacterInfoPopup();
        }
        return popupScreen;
    }
    createCharacterInfoPopup() {
        const popupScreen = document.createElement('div');
        popupScreen.classList.add('gameMenu-popup', 'hidden');
        popupScreen.id = 'gameMenu-popup';
        document.body.appendChild(popupScreen);
        return popupScreen;
    }
    moveCardToBattle(card, position) {
        // Check if the card is already in a battleSkills slot
        let currentSlotKey;
        for (const [key, value] of Object.entries(this.battleSkills)) {
            if (value === card) {
                currentSlotKey = key;
                break;
            }
        }
        // If the card is already in a slot, remove it from the current slot
        if (currentSlotKey) {
            this.battleSkills[currentSlotKey] = undefined;
        }
        let previousCardInTheSlot;
        // Remove the previous card from the target slot
        switch (position) {
            case 1:
                previousCardInTheSlot = this.battleSkills.slot1;
                this.battleSkills.slot1 = card;
                break;
            case 2:
                previousCardInTheSlot = this.battleSkills.slot2;
                this.battleSkills.slot2 = card;
                break;
            case 3:
                previousCardInTheSlot = this.battleSkills.slot3;
                this.battleSkills.slot3 = card;
                break;
            case 4:
                previousCardInTheSlot = this.battleSkills.slot4;
                this.battleSkills.slot4 = card;
                break;
            case 5:
                previousCardInTheSlot = this.battleSkills.slot5;
                this.battleSkills.slot5 = card;
                break;
            case 6:
                previousCardInTheSlot = this.battleSkills.slot6;
                this.battleSkills.slot6 = card;
                break;
            case 7:
                previousCardInTheSlot = this.battleSkills.slot7;
                this.battleSkills.slot7 = card;
                break;
            default:
                throw new Error('Invalid position while moving card to battle');
        }
        // If there was a previous card in the slot, move it back to learnedSkills
        if (previousCardInTheSlot && previousCardInTheSlot !== card) {
            this.moveCardToSkills(previousCardInTheSlot);
        }
        // Remove the new card from learnedSkills (if it exists there)
        const learnedIndex = this.learnedSkills.findIndex(skill => skill.id === card.id);
        if (learnedIndex > -1) {
            this.learnedSkills.splice(learnedIndex, 1);
        }
        this.updateSkillMenu();
    }
    moveCardToSkills(card) {
        // Check and remove the card from battleSkills
        if (this.battleSkills.slot1 === card) {
            this.battleSkills.slot1 = undefined;
        }
        else if (this.battleSkills.slot2 === card) {
            this.battleSkills.slot2 = undefined;
        }
        else if (this.battleSkills.slot3 === card) {
            this.battleSkills.slot3 = undefined;
        }
        else if (this.battleSkills.slot4 === card) {
            this.battleSkills.slot4 = undefined;
        }
        else if (this.battleSkills.slot5 === card) {
            this.battleSkills.slot5 = undefined;
        }
        else if (this.battleSkills.slot6 === card) {
            this.battleSkills.slot6 = undefined;
        }
        else if (this.battleSkills.slot7 === card) {
            this.battleSkills.slot7 = undefined;
        }
        // Find the card in learnedSkills using findIndex to avoid object reference issues
        const existingIndex = this.learnedSkills.findIndex(skill => skill.id === card.id);
        if (existingIndex === -1) {
            // Add the card back to learnedSkills if it doesn't already exist
            this.learnedSkills.push(card);
        }
        this.updateSkillMenu();
    }
    updateSkillMenu() {
        let popupScreen = document.getElementById('gameMenu-popup');
        if (!popupScreen) {
            popupScreen = this.createCharacterInfoPopup();
        }
        if (popupScreen) {
            popupScreen.innerHTML = '';
        }
        const skillMenu = this.createSkillMenu();
        if (popupScreen) {
            popupScreen.appendChild(skillMenu);
        }
    }
    createSkillMenu() {
        const skillMenu = document.createElement('div');
        skillMenu.classList.add('skill-menu');
        const allSkillsSection = document.createElement('div');
        allSkillsSection.classList.add('skills-menu-section');
        allSkillsSection.appendChild(this.createSkillsSection(this.learnedSkills, 'upper', 8, 3));
        allSkillsSection.appendChild(this.createBattleSkillsSection(this.battleSkills, 1, 7));
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
            const dataTransfer = event.dataTransfer;
            if (!dataTransfer) {
                return;
            }
            const skillId = dataTransfer.getData('text/plain');
            const skill = this.getSkillById(skillId);
            if (skill && section === 'upper') {
                this.moveCardToSkills(skill);
            }
        });
        // Render learnedSkills
        skills.forEach(skill => {
            const skillSlot = this.createSkillSlot(skill);
            skillsSection.appendChild(skillSlot);
        });
        return skillsSection;
    }
    createBattleSkillsSection(battleSkills, rows, cols) {
        const battleSkillsSection = this.createGrid('lower', rows, cols);
        // Add event listeners for dragover and drop
        battleSkillsSection.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow drop
        });
        battleSkillsSection.addEventListener('drop', (event) => {
            event.preventDefault();
            const dataTransfer = event.dataTransfer;
            if (!dataTransfer) {
                return;
            }
            const skillId = dataTransfer.getData('text/plain');
            const skill = this.getSkillById(skillId);
            if (skill) {
                const currentSkillsCount = Object.values(this.battleSkills).filter(s => s !== undefined).length;
                if (currentSkillsCount >= 8) {
                    popup.show('Exceed', 'Only 8 skills can be set into the deck', [
                        {
                            label: 'Ok',
                            action: popup.hide,
                        },
                    ]);
                    return;
                }
            }
        });
        // Render battleSkills
        Object.keys(battleSkills).forEach(slotKey => {
            const skill = battleSkills[slotKey];
            const skillSlot = this.createSkillSlot(skill, slotKey); // Pass slotKey for unique ID
            skillSlot.id = `battle-skill-slot-${slotKey}`; // Add a unique ID for the slot
            battleSkillsSection.appendChild(skillSlot);
        });
        return battleSkillsSection;
    }
    createGrid(section, rows, cols) {
        const grid = document.createElement('div');
        grid.classList.add(`skills-menu-${section}-section`);
        grid.style.display = 'grid';
        grid.style.gridTemplateRows = `repeat(${rows})`;
        grid.style.gridTemplateColumns = `repeat(${cols})`;
        return grid;
    }
    createSkillSlot(skill, slotKey) {
        const skillSlot = document.createElement('div');
        skillSlot.classList.add('skillCard-small-container');
        if (skill) {
            // Populate the slot with a skill
            const smallImage = document.createElement('img');
            smallImage.src = `../../assets/skills/${skill.id}.png`;
            smallImage.classList.add('skillCard-small');
            smallImage.addEventListener('click', () => {
                this.showSkillCard(skill);
            });
            smallImage.draggable = true;
            smallImage.addEventListener('dragstart', (event) => {
                if (event.dataTransfer) {
                    event.dataTransfer.setData('text/plain', skill.id);
                }
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
        }
        else {
            // Empty slot (for battleSkills)
            skillSlot.classList.add('empty-slot');
            skillSlot.textContent = 'Empty Slot';
            skillSlot.addEventListener('dragover', (event) => {
                event.preventDefault(); // Allow drop
            });
            skillSlot.addEventListener('drop', (event) => {
                event.preventDefault();
                const dataTransfer = event.dataTransfer;
                if (!dataTransfer)
                    return;
                const skillId = dataTransfer.getData('text/plain');
                const skill = this.getSkillById(skillId);
                if (skill && slotKey) {
                    const position = parseInt(slotKey.replace('slot', ''), 10); // Extract the slot number
                    this.moveCardToBattle(skill, position);
                }
            });
        }
        return skillSlot;
    }
    createSkillConsume(skill) {
        const consume = skill.consume;
        const skillConsumesText = document.createElement('div');
        skillConsumesText.classList.add('skillCard-small-consumes');
        let hpConsume = consume.hp[skill.level - 1];
        let mpConsume = consume.mp[skill.level - 1];
        let spConsume = consume.sp[skill.level - 1];
        let elementConsume = consume.elements[skill.level - 1];
        if (hpConsume !== 0) {
            const hpText = document.createElement('div');
            hpText.classList.add('skillCard-small-consumes-element');
            hpText.textContent = `HP: ${hpConsume}`;
            skillConsumesText.appendChild(hpText);
        }
        if (mpConsume !== 0) {
            const mpText = document.createElement('div');
            mpText.classList.add('skillCard-small-consumes-element');
            mpText.textContent = `MP: ${mpConsume}`;
            skillConsumesText.appendChild(mpText);
        }
        if (spConsume !== 0) {
            const spText = document.createElement('div');
            spText.classList.add('skillCard-small-consumes-element');
            spText.textContent = `SP: ${spConsume}`;
            skillConsumesText.appendChild(spText);
        }
        if (elementConsume !== undefined) {
            const elementText = document.createElement('div');
            elementText.classList.add('skillCard-small-consumes-element');
            elementText.textContent = `${mapElementName(elementConsume.element)}: ${elementConsume.amount[skill.level - 1]}`;
            skillConsumesText.appendChild(elementText);
        }
        // TODO: case when hpConsume, mpConsume, spConsume, elementConsume are 0 or undefined
        return skillConsumesText;
    }
    createSkillProduce(skill) {
        const produce = skill.produce;
        const skillProducesText = document.createElement('div');
        skillProducesText.classList.add('skillCard-small-produces');
        let produceByLevel = produce.elements[skill.level - 1];
        if (produceByLevel !== undefined) {
            const elementText = document.createElement('div');
            elementText.classList.add('skillCard-small-produces-element');
            const isOnlyOneValue = (produceByLevel.amount[skill.level - 1][0] === produceByLevel.amount[skill.level - 1][1]);
            elementText.textContent = isOnlyOneValue ?
                `${mapElementName(produceByLevel.element)}: ${produceByLevel.amount[skill.level - 1][0]}` :
                `${mapElementName(produceByLevel.element)}: ${produceByLevel.amount[skill.level - 1][0]} - ${produceByLevel.amount[skill.level - 1][1]}`;
            skillProducesText.appendChild(elementText);
        }
        ;
        // TODO: case when produceByLevel is undefined
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
                characterID: this.character.id,
                skills: this.learnedSkills,
                battleCards: this.battleSkills
            };
            // characterWS.send(updateMessage);
            let popupScreen = this.getCharacterInfoPopupScreen();
            popupScreen.innerHTML = '';
            gameMenu.showCharacterInfo(this.character, 'player');
        });
        buttonsContainer.appendChild(backButton);
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('skills-menu-button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            var _a, _b;
            if (((_a = gameVM.model) === null || _a === void 0 ? void 0 : _a.playerCharacter) !== undefined && ((_b = gameVM.model) === null || _b === void 0 ? void 0 : _b.playerCharacter) !== null) {
                gameVM.model.playerCharacter.skills = this.beforeChangeLearnedSKills;
                gameVM.model.playerCharacter.activeSkills = this.beforeChangeBattleSkills;
                let popupScreen = this.getCharacterInfoPopupScreen();
                popupScreen.innerHTML = '';
            }
            gameMenu.showCharacterInfo(this.character, 'player');
        });
        buttonsContainer.appendChild(cancelButton);
        return buttonsContainer;
    }
    showSkillCard(skill) {
        const showingSkillCardSection = document.querySelector('.showing-skillCard-section');
        if (!showingSkillCardSection) {
            throw new Error('Showing Skill Card Section not found');
        }
        showingSkillCardSection.innerHTML = '';
        const skillCard = new SkillCard(skill).card;
        showingSkillCardSection.appendChild(skillCard);
    }
    getSkillById(skillId) {
        // Search in learnedSkills array
        const learnedSkill = this.learnedSkills.find(skill => skill.id === skillId);
        if (learnedSkill) {
            return learnedSkill;
        }
        // Search in battleSkills object
        const battleSkill = Object.values(this.battleSkills).find(skill => skill !== undefined && skill.id === skillId);
        if (battleSkill === undefined) {
            throw new Error(`Skill not found: ${skillId}`);
        }
        return battleSkill;
    }
}
