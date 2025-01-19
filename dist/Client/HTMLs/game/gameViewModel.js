var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GameModel } from "../../../Client/HTMLs/game/gameModel.js";
import { GameMenu } from "../../../Client/classes/GameMenu/GameMenu.js";
import { screamer } from "../../../Client/Screamer/Screamer.js";
class GameViewModel {
    // ViewModel
    constructor() {
        this.screamer = screamer;
        this.model = null;
        this.playerPortrait = document.getElementById('player-portrait');
        this.companionPortraits = [
            document.getElementById('companion-portrait-1'),
            document.getElementById('companion-portrait-2'),
            document.getElementById('companion-portrait-3'),
            document.getElementById('companion-portrait-4'),
            document.getElementById('companion-portrait-5')
        ];
        this.dialogueBoxCharacterLeft = document.querySelector('.dialogueBoxCharacter-left');
        this.dialogueBoxCharacterRight = document.querySelector('.dialogueBoxCharacter-right');
        this.battleReportBtn = document.getElementById('menu-battleReport');
        this.helpBtn = document.getElementById('menu-help');
        this._gameMenu = new GameMenu();
        this.initiateVM();
    }
    initiateVM() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Wait for GameModel to initialize
                console.log(`Wating for GameModel to initialize`);
                this.model = yield GameModel.create();
                console.log(`GameModel initialized`);
                // Setup ViewModel after model is ready
                this.addEventListener();
                this.updatePortraits();
                this.initializeEventListeners();
                console.log('GameViewModel initialized successfully');
            }
            catch (error) {
                console.error('Failed to initialize GameViewModel:', error);
            }
        });
    }
    ensureModel() {
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
        }
        else {
            for (let i = 0; i < model.companionCharacters.length; i++) {
                this.companionPortraits[i].src = model.companionCharacters[i].portrait;
            }
        }
    }
    initializeEventListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            const screamerStation = this.screamer.listenToMe();
            screamerStation.on('GAME_MODEL_UPDATE', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.updatePortraits();
                }
                catch (error) {
                    console.error('Error updating party:', error);
                }
            }));
        });
    }
    addEventListener() {
        console.log('Adding Event Listeners');
        const model = this.ensureModel();
        const playerCharacter = model.playerCharacter;
        if (!playerCharacter) {
            throw new Error('Player Character not found');
        }
        this.playerPortrait.addEventListener('click', () => {
            this.showCharacterInfo(playerCharacter, 'player');
        });
        this.companionPortraits.forEach((portrait, index) => {
            if (!portrait) {
                return;
            }
            portrait.addEventListener('click', () => {
                this.showCharacterInfo(model.companionCharacters[index], 'companion');
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
    showCharacterInfo(character, type) {
        if (!character) {
            console.error('Player Character not found');
            return;
        }
        else {
            this._gameMenu.showCharacterInfo(character, type);
        }
    }
    showBattleReport() {
        battleReportMenu.showBattleReportMenu();
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const gameVM = new GameViewModel();
