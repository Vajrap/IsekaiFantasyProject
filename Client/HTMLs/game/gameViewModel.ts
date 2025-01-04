import { CharacterInterface } from "../../../Common/RequestResponse/characterWS.js";
import { GameModel, gameModel } from "../../../Client/HTMLs/game/gameModel.js";

class GameViewModel {
    // Model
    model: GameModel | null;

    // View
    playerPortrait: HTMLImageElement;
    companionPortraits: HTMLImageElement[];
    dialogueBoxCharacterLeft: HTMLElement;
    dialogueBoxCharacterRight: HTMLElement;
    battleReportBtn: HTMLElement;
    helpBtn: HTMLElement;
    
    // ViewModel
    constructor() {
        this.model = null;
        this.playerPortrait = document.getElementById('player-portrait') as HTMLImageElement;
        this.companionPortraits = [
            document.getElementById('companion-portrait-1') as HTMLImageElement,
            document.getElementById('companion-portrait-2') as HTMLImageElement,
            document.getElementById('companion-portrait-3') as HTMLImageElement,
            document.getElementById('companion-portrait-4') as HTMLImageElement,
            document.getElementById('companion-portrait-5') as HTMLImageElement
        ];
        this.dialogueBoxCharacterLeft = document.querySelector('.dialogueBoxCharacter-left') as HTMLElement;
        this.dialogueBoxCharacterRight = document.querySelector('.dialogueBoxCharacter-right') as HTMLElement;
        this.battleReportBtn = document.getElementById('menu-battleReport') as HTMLElement;
        this.helpBtn = document.getElementById('menu-help') as HTMLElement;
        this.initiateVM();
    }

    async initiateVM() {
        this.model = await gameModel;
        this.addEventListener();
        this.updatePortraits();
    }

    private ensureModel(): GameModel {
        if (!this.model) {
            throw new Error('GameModel is not initialized');
        }
        return this.model;
    }

    updatePortraits() {
        const model = this.ensureModel();
        if (!model.playerCharacter) {
            console.error('Player Character not found');
            return;
        }
        this.playerPortrait.src = `../../assets/portrait/${model.playerCharacter.portrait}.png`;

        if (model.companionCharacters.length === 0) {
            return;
        } else {
            for (let i = 0; i < model.companionCharacters.length; i++) {
                this.companionPortraits[i].src = model.companionCharacters[i].portrait;
            }
        }
    }

    addEventListener() {
        const model = this.ensureModel();
        const playerCharacter = model.playerCharacter;

        if (!playerCharacter) {
            throw new Error('Player Character not found');
        }

        this.playerPortrait.addEventListener('click', () => {
            this.showCharacterInfo(playerCharacter, 'player')
        });

        this.companionPortraits.forEach((portrait, index) => {
            if (!portrait) {
                return;
            }
            portrait.addEventListener('click', () => {
                this.showCharacterInfo(model.companionCharacters[index], 'companion')
            });
        });
        this.battleReportBtn.addEventListener('click', () => {
            this.showBattleReport();
        });
        // this.helpBtn.addEventListener('click', () => {
        //     model.battleWS.send({
        //         type: 'START_BATTLE_DEMO',
        //         selectedClass: 'fighter'
        //     });
        // });
    }

    showCharacterInfo(character: CharacterInterface, type: 'player' | 'companion') {
        if (!character) {
            console.error('Player Character not found');
            return;
        } else {
            gameMenu.showCharacterInfo(character, type);
        }
    }

    showBattleReport() {
        battleReportMenu.showBattleReportMenu();
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const gameVM = new GameViewModel();
