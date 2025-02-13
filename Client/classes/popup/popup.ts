export class Popup {
    isPopupVisible: boolean;
    constructor(){
        this.isPopupVisible = false
    }

    createPopup() {
        const popupScreen = document.createElement('div');
        popupScreen.classList.add('popup', 'hidden');
        popupScreen.id = 'popup';
        
        document.body.appendChild(popupScreen);
        return popupScreen;
    }

    getPopupScreen() {
        let popupScreen = document.getElementById('popup');
        if (!popupScreen) {
            popupScreen = this.createPopup();
        }
        return popupScreen;
    }

    makeContainer() {
        const containerElement = document.createElement('div');
        containerElement.classList.add('popup-container');
        return containerElement
    }

    makeTitle(title: string) {
        const titleElement = document.createElement('div');
        titleElement.classList.add('popup-title');
        titleElement.textContent = title;
        return titleElement;
    }

    makeMessage(message: string) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('popup-message');
        messageElement.innerHTML = message;
        return messageElement;
    }

    makeButton(button: {label: string, action?: () => void}) {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('popup-button');
        buttonElement.textContent = button.label;
        let action;
        if (button.action === undefined) {
            action = ()=>{ popup.hide() } 
        } else {
            action = button.action
        }
        buttonElement.addEventListener('click', action);
        return buttonElement;
    }

    show(
        title: string, 
        message: string, 
        buttons?: {label: string, action?: () => void}[]
    ) {
        const popupScreen = this.getPopupScreen();
        popupScreen.innerHTML = ''; 

        const popupContainer = this.makeContainer();
        const popupTitle = this.makeTitle(title);
        const popupMessage = this.makeMessage(message);
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('popup-buttonsContainer');
        
        if (buttons && buttons.length > 0) {
            buttons.forEach(button => {
                const buttonElement = this.makeButton(button);
                buttonsContainer.appendChild(buttonElement);
            });
        } else {
            const okButton = this.makeButton({
                label: 'OK',
                action: () => popup.hide()
            });
            buttonsContainer.appendChild(okButton);
        }

        popupContainer.appendChild(popupTitle);
        popupContainer.appendChild(popupMessage);
        popupContainer.appendChild(buttonsContainer);
        popupScreen.appendChild(popupContainer)

        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');
    }

    hide() {
        const popupScreen = this.getPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.add('hidden');
        popupScreen.classList.remove('visible');
    }
}

export const popup = new Popup()

export function getPopupMenu() {
    let popupScreen = document.getElementById('gameMenu-popup');
    if (!popupScreen) {
        popupScreen = createPopupMenu();
    }
    return popupScreen;
}

function createPopupMenu() {
    const popupScreen = document.createElement('div');
    popupScreen.classList.add('gameMenu-popup', 'hidden');
    popupScreen.id = 'gameMenu-popup';
    
    document.body.appendChild(popupScreen);
    return popupScreen;
}