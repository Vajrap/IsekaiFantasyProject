import { CharacterInterface } from "Common/RequestResponse/characterWS";

class GameMenu {
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

    makeCharacterInfoButton(button: { label: string, action: () => void }) {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('gameMenu-popup-button');
        buttonElement.textContent = button.label;
        const action = button.action || (() => { characterInfoPopup.hideCharacterInfo(); });
        buttonElement.addEventListener('click', action);
        return buttonElement;
    }

    makeButtonsContainer(character: CharacterInterface, type) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('gameMenu-popup-buttonsContainer');

        const playerButtons: { label: string, action: () => void }[] = [
            { label: 'Skills', action: () => this.showSkillsMenu(character) },
            { label: 'Equipments and Items', action: () => this.showEquipmentsAndItemsMenu(character) },
            { label: 'Internals', action: () => this.showInternalsMenu(character) },
            { label: 'Manage Party', action: () => this.showPartyMenu(character) },
            { label: 'Close', action: () => this.hideCharacterInfo() }
        ];

        const companionButtons: { label: string, action: () => void }[] = [
            { label: 'Interact', action: () => this.showInteractMenu(character) },
            { label: 'Background', action: () => this.showInteractMenu(character) },
            { label: 'Drop from Party', action: () => this.dropFromParty(character) },
            { label: 'Manage Party', action: () => this.showParty(character) },
            { label: 'Close', action: () => this.hideCharacterInfo() }
        ];
        
        const buttons = type === 'player' ? playerButtons : companionButtons;

        buttons.forEach(button => {
            buttonsContainer.appendChild(this.makeCharacterInfoButton(button: ));
        });

        return buttonsContainer;
    }

    showSkillsMenu(character: CharacterInterface) {
        const popupScreen = this.getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        
        const skillMenu = new SkillMenu();
        const skillMenuElement = skillMenu.skillMenu;
        popupScreen.appendChild(skillMenuElement);
    }

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

const gameMenu = new GameMenu();
