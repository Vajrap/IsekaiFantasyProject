"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class GameViewModel {
    constructor() {
        this.model = gameModel;
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
        this.initiateVM();
    }
    initiateVM() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.initiate();
                this.addEventListener();
                this.updatePortraits();
                this.model.checkForNewGameFlag();
            }
            catch (error) {
                console.error('Failed to initialize game model:', error);
            }
        });
    }
    updatePortraits() {
        if (!this.model.playerCharacter) {
            console.error('Player Character not found');
            return;
        }
        this.playerPortrait.src = `../../assets/portrait/${this.model.playerCharacter.portrait}.png`;
        if (this.model.companionCharacters.length === 0) {
            return;
        }
        else {
            for (let i = 0; i < this.model.companionCharacters.length; i++) {
                this.companionPortraits[i].src = this.model.companionCharacters[i].portrait;
            }
        }
    }
    addEventListener() {
        this.playerPortrait.addEventListener('click', () => {
            this.showCharacterInfo(this.model.playerCharacter, 'player');
        });
        this.companionPortraits.forEach((portrait, index) => {
            if (!portrait) {
                return;
            }
            portrait.addEventListener('click', () => {
                this.showCharacterInfo(this.model.companionCharacters[index], 'companion');
            });
        });
        this.battleReportBtn.addEventListener('click', () => {
            this.showBattleReport();
        });
        this.helpBtn.addEventListener('click', () => {
            this.model.battleWS.send({
                type: 'START_BATTLE_DEMO',
                selectedClass: 'fighter'
            });
        });
    }
    showCharacterInfo(character, type) {
        if (!character) {
            console.error('Player Character not found');
            return;
        }
        else {
            gameMenu.showCharacterInfo(character, type);
        }
    }
    showBattleReport() {
        battleReportMenu.showBattleReportMenu();
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const gameVM = new GameViewModel();
