import { CharacterInterface } from "../../../Common/RequestResponse/characterWS.js";
import { CharacterCard } from "../../../Client/classes/Cards/CharacterCard/CharacterCard.js";
import { SkillMenu } from "./SkillMenu/SkillMenu.js";
export class GameMenu {
    isPopupVisible: boolean;

    constructor() {
        this.isPopupVisible = false;
    }

    showCharacterInfo(character: CharacterInterface, type: 'player' | 'companion') {
        const characterCard = new CharacterCard(character).card;
        const popupScreen = this.getCharacterInfoPopupScreen();

        popupScreen.innerHTML = '';
        popupScreen.classList.add('gameMenu-popup');

        const popupContainer = this.makeCharacterInfoContainer();

        popupContainer.appendChild(characterCard);
        popupContainer.appendChild(this.makeButtonsContainer(character, type));
        popupScreen.appendChild(popupContainer);

        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');
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


    makeCharacterInfoContainer() {
        const containerElement = document.createElement('div');
        containerElement.classList.add('gameMenu-popup-container');
        return containerElement;
    }

    makeCharacterInfoButton(button: { 
        label: string, 
        action: () => void 
    }) {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('gameMenu-popup-button');
        buttonElement.textContent = button.label;
        const action = button.action || (() => { this.hideCharacterInfo(); });
        buttonElement.addEventListener('click', action);
        return buttonElement;
    }

    makeButtonsContainer(character: CharacterInterface, type: 'player' | 'companion') {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('gameMenu-popup-buttonsContainer');

        const playerButtons: { label: string, action: () => void }[] = [
            { label: 'รายละเอียด', action: () => this.showCharacterInformation(character) },
            { label: 'สกิล', action: () => this.showSkillsMenu(character) },
            { label: 'ไอเทม', action: () => this.showEquipmentsAndItemsMenu(character) },
            { label: 'ปาร์ตี้', action: () => this.showPartyMenu(character) },
            { label: 'ปิด', action: () => this.hideCharacterInfo() }
        ];

        const companionButtons: { label: string, action: () => void }[] = [
            { label: 'รายละเอียด', action: () => this.showCharacterInformation(character) },
            { label: 'สัมพันธ์', action: () => this.showInteractMenu(character) },
            { label: 'ปาร์ตี้', action: () => this.showPartyMenu(character) },
            { label: 'ปิด', action: () => this.hideCharacterInfo() }
        ];
        
        const buttons = type === 'player' ? playerButtons : companionButtons;

        buttons.forEach(button => {
            buttonsContainer.appendChild(this.makeCharacterInfoButton(button));
        });

        return buttonsContainer;
    }

    showCharacterInformation(character: CharacterInterface) {
        // TODO: Implement
    };

    showInteractMenu(character: CharacterInterface) {
        // TODO: Implement
    };

    showBackgroundMenu(character: CharacterInterface) {
        // TODO: Implement
    };

    dropFromParty(character: CharacterInterface) {
        // TODO: Implement
    };

    showPartyMenu(character: CharacterInterface) {
        // TODO: Implement
    };

    showSkillsMenu(character: CharacterInterface) {
        const popupScreen = this.getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        
<<<<<<< master
        const learnedSkills = character.skills.concat(character.activeSkills);

        const skillMenu = new SkillMenu(
            character, 
            learnedSkills, 
            character.activeSkills
        )
        
=======
        const skillMenu = new SkillMenu();
>>>>>>> 934df06 save
        const skillMenuElement = skillMenu.skillMenu;
        popupScreen.appendChild(skillMenuElement);
    }

    showInternalsMenu(character: CharacterInterface) {
        // TODO: Implement
    };

    showEquipmentsAndItemsMenu(character: CharacterInterface) {
        const popupScreen = this.getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';

        const equipmentsAndItemsMenu = new EquipmentsAndItemsMenu();
        const equipmentsAndItemsMenuElement = equipmentsAndItemsMenu.menu;
        popupScreen.appendChild(equipmentsAndItemsMenuElement);
    }
    

    hideCharacterInfo() {
        const popupScreen = this.getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.add('hidden');
        popupScreen.classList.remove('visible');
    }
}

export const gameMenu = new GameMenu();
