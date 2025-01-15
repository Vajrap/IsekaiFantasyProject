import { CharacterInterface, CharacterSkillInterface } from "../../../../Common/RequestResponse/characterWS.js";
import { popup } from "../../../../Client/classes/popup/popup.js";
import { screamer } from "../../../../Client/Screamer/Screamer.js";
import { gameVM } from "../../../../Client/HTMLs/game/gameViewModel.js";
import { gameMenu } from "../GameMenu.js";

export class SkillMenu {
    character: CharacterInterface;
    learnedSkills: CharacterSkillInterface[];
    battleSkills: CharacterSkillInterface[];
    beforeChangeLearnedSKills: CharacterSkillInterface[];
    beforeChangeBattleSkills: CharacterSkillInterface[];
    showingSkill: CharacterSkillInterface | null;
    skillMenu: HTMLDivElement;
    
    // eslint-disable-next-line max-lines-per-function
    constructor(
        playerCharacter: CharacterInterface,
        learnedSkills: CharacterSkillInterface[],
        battleSkills: CharacterSkillInterface[],
    ) {
        this.character = playerCharacter;
        this.learnedSkills = playerCharacter.skills;
        this.battleSkills = playerCharacter.activeSkills;
        this.beforeChangeLearnedSKills = [...playerCharacter.skills];
        this.beforeChangeBattleSkills = [...playerCharacter.activeSkills];
        this.showingSkill = null;
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


    moveCardToBattle(card: CharacterSkillInterface, position: number) {
        const currentIndex = this.battleSkills.indexOf(card);
        if (currentIndex > -1) {
            // Remove the card from its current position if it's being moved within the same section
            this.battleSkills.splice(currentIndex, 1);
        }
        if (position >= 0 && position <= this.battleSkills.length) {
            this.battleSkills.splice(position, 0, card);
        } else {
            this.battleSkills.push(card);
        }
        if (currentIndex === -1) {
            // Only remove from learnedSkills if it wasn't moved within the same section
            this.learnedSkills = this.learnedSkills.filter(skill => skill !== card);
        }
        this.updateSkillMenu();
    }

    moveCardToSkills(card: CharacterSkillInterface, position: number) {
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
        } else {
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
        allSkillsSection.appendChild(this.createSkillsSection(this.battleSkills, 'lower', 8, 1));
        skillMenu.appendChild(allSkillsSection);

        const showingSkillCardSection = document.createElement('div');
        showingSkillCardSection.classList.add('showing-skillCard-section');
        skillMenu.appendChild(showingSkillCardSection);

        skillMenu.appendChild(this.createButtonsContainer());

        return skillMenu;
    }

    createSkillsSection(skills: CharacterSkillInterface[], section: string, rows: number, cols: number) {
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
    
            if (skill) {
                if (section === 'lower' && this.battleSkills.length >= 8) {
                    popup.show(
                        'Exceed',
                        'Only 8 skills can be set into the deck',
                        [{
                            label: "Ok",
                            action: popup.hide
                        }]
                    );
                    return;
                }
                
                const dropPosition = this.calculateDropPosition(event.clientY, skillsSection);
                if (section === 'upper') {
                    this.moveCardToSkills(skill, dropPosition);
                } else if (section === 'lower') {
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

    createGrid(section: string, rows: number, cols: number) {
        const grid = document.createElement('div');
        grid.classList.add(`skills-menu-${section}-section`);
        grid.style.display = 'grid';
        grid.style.gridTemplateRows = `repeat(${rows})`;
        grid.style.gridTemplateColumns = `repeat(${cols})`;
        return grid;
    }

    createSkillSlot(skill: CharacterSkillInterface) {
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

        return skillSlot;
    }

    createSkillConsume(skill: CharacterSkillInterface) {
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
            elementText.textContent = `${elementConsume.element}: ${elementConsume.amount[0]} - ${elementConsume.amount[1]}`;
            skillConsumesText.appendChild(elementText);
        }
        
        // TODO: case when hpConsume, mpConsume, spConsume, elementConsume are 0 or undefined
    
        return skillConsumesText;
    }    

    createSkillProduce(skill: CharacterSkillInterface) {
        const produce = skill.produce;
        const skillProducesText = document.createElement('div');
        skillProducesText.classList.add('skillCard-small-produces');
        
        let produceByLevel = produce.elements[skill.level - 1];
        
        if (produceByLevel !== undefined) {
            const elementText = document.createElement('div');
            elementText.classList.add('skillCard-small-produces-element');
            elementText.textContent = `${produceByLevel.element}: ${produceByLevel.amount[0]} - ${produceByLevel.amount[1]}`;
            skillProducesText.appendChild(elementText);
        };

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
            if (gameVM.model?.playerCharacter !== undefined && gameVM.model?.playerCharacter !== null) {
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

    showSkillCard(skill: CharacterSkillInterface) {
        const showingSkillCardSection = document.querySelector('.showing-skillCard-section');
        if (!showingSkillCardSection) {
            throw new Error('Showing Skill Card Section not found');
        }
        showingSkillCardSection.innerHTML = '';
        const skillCard = new SkillCard(skill).card;
        showingSkillCardSection.appendChild(skillCard);
    }

    calculateDropPosition(clientY: number, container: HTMLElement) {
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

    getSkillById(skillId: string) {
        return this.learnedSkills.find(skill => skill.id === skillId) || this.battleSkills.find(skill => skill.id === skillId);
    }
}
