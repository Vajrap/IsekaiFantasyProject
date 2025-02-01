import { CharacterInterface } from "../../../Common/RequestResponse/characterWS.js";
import { GameModel } from "../../../Client/HTMLs/game/gameModel.js";
import { GameMenu } from "../../../Client/classes/GameMenu/GameMenu.js";
import { screamer } from "../../../Client/Screamer/Screamer.js";
import { K } from "../../../Common/Constant.js";

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

    _gameMenu: GameMenu;
    screamer = screamer;

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
        
        this._gameMenu = new GameMenu();
        this.initiateVM();

    }

    async initiateVM() {
        try {
            // Wait for GameModel to initialize
            this.model = await GameModel.create();
            // Setup ViewModel after model is ready
            this.addEventListener();
            this.updatePortraits();
            this.initializeEventListeners();
        } catch (error) {
            console.error('Failed to initialize GameViewModel:', error);
        }
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
            this._gameMenu.showCharacterInfo(character, type);
        }
    }

    showBattleReport() {
        battleReportMenu.showBattleReportMenu();
    }

    private async initializeEventListeners() {
        const screamerStation = this.screamer.listenToMe();

        screamerStation.on('GAME_MODEL_UPDATE', async () => {
            try {
                this.updatePortraits();
            } catch (error) {
                console.error('Error updating party:', error);
            }
        })

        screamerStation.on(K.SKILL_MENU_CLOSE, async (_: any) => {
            const playerCharacter = this.model?.playerCharacter;

            if (!playerCharacter) {
                throw new Error('Player Character not found');
            }
    
            this.playerPortrait.addEventListener('click', () => {
                this.showCharacterInfo(playerCharacter, 'player')
            });
        })
        screamerStation.on(K.SKILL_MENU_CLOSE, async (_: any) => {
            const playerCharacter = this.model?.playerCharacter;
            if (!playerCharacter) {
                throw new Error('Player Character not found');
            }
    
            this.showCharacterInfo(playerCharacter, 'player');
        })
    } 
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const gameVM = new GameViewModel();