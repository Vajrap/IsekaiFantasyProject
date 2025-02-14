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
import { K } from "../../../Common/Constant.js";
import { EquipmentsAndItemsMenu } from "../../../Client/classes/GameMenu/EquipmentsAndItemsMenu/EquipementsAndItemsMenu.js";
import { SkillMenu } from "../../../Client/classes/GameMenu/SkillMenu/SkillMenu.js";
import { PlanningMenu } from "../../../Client/classes/GameMenu/PlanningMenu/PlanningMenu.js";
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
        this.planningBtn = document.getElementById('menu-planning');
        this.skillsBtn = document.getElementById('menu-skills');
        this.questBtn = document.getElementById('menu-quest');
        this.inventoryBtn = document.getElementById('menu-inventory');
        this.optionBtn = document.getElementById('menu-options');
        this.helpBtn = document.getElementById('menu-help');
        this._gameMenu = new GameMenu();
        this.initiateVM();
    }
    initiateVM() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Wait for GameModel to initialize
                this.model = yield GameModel.create();
                // Setup ViewModel after model is ready
                this.addEventListener();
                this.updatePortraits();
                this.initializeEventListeners();
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
        const playerCharacter = model.getPlayerCharacter();
        this.playerPortrait.src = `../../assets/portrait/${playerCharacter.portrait}.png`;
        const companionCharacters = model.getAllCompanionCharacters();
        if (companionCharacters.length === 0) {
            return;
        }
        else {
            for (let i = 0; i < companionCharacters.length; i++) {
                this.companionPortraits[i].src = companionCharacters[i].portrait;
            }
        }
    }
    addEventListener() {
        const model = this.ensureModel();
        const playerCharacter = model.getPlayerCharacter();
        if (!playerCharacter) {
            throw new Error('Player Character not found');
        }
        this.playerPortrait.addEventListener('click', () => {
            this.showCharacterInfo(playerCharacter, 'player');
        });
        const companionCharacters = model.getAllCompanionCharacters();
        this.companionPortraits.forEach((portrait, index) => {
            if (!portrait) {
                return;
            }
            portrait.addEventListener('click', () => {
                this.showCharacterInfo(companionCharacters[index], 'companion');
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
        this.planningBtn.addEventListener('click', () => {
            if (model.party === null || model.party === undefined) {
                throw new Error('Party not found');
            }
            this.showPlanningMenu(model.party);
        });
        this.skillsBtn.addEventListener('click', () => {
            this.showSkillsMenu(playerCharacter);
        });
        this.inventoryBtn.addEventListener('click', () => {
            this.showEquipmentsAndItemsMenu(playerCharacter);
        });
    }
    showPlanningMenu(party) {
        const popupScreen = getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');
        new PlanningMenu(party);
    }
    showSkillsMenu(character) {
        const popupScreen = getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');
        const learnedSkills = character.skills.concat(character.activeSkills);
        const skillMenu = new SkillMenu(character, learnedSkills, character.activeSkills, 'mainGame');
        const skillMenuElement = skillMenu.skillMenu;
        popupScreen.appendChild(skillMenuElement);
    }
    showEquipmentsAndItemsMenu(character) {
        const popupScreen = getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');
        const equipmentsAndItemsMenu = new EquipmentsAndItemsMenu(character, 'mainGame');
        const equipmentsAndItemsMenuElement = equipmentsAndItemsMenu.menu;
        popupScreen.appendChild(equipmentsAndItemsMenuElement);
    }
    showCharacterInfo(character, type) {
        if (!character) {
            console.error('Player Character not found');
            return;
        }
        else {
            this._gameMenu.showGameMenuWithPlayerCharacterInfo(character, type);
            const popupScreen = getCharacterInfoPopupScreen();
            popupScreen.classList.add('visible');
            popupScreen.classList.remove('hidden');
        }
    }
    showBattleReport() {
        battleReportMenu.showBattleReportMenu();
    }
    initializeEventListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            const screamerStation = this.screamer.listenToMe();
            screamerStation.on('GAME_MODEL_UPDATE', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.updatePortraits();
                    const popupWindow = getCharacterInfoPopupScreen();
                    popupWindow.innerHTML = '';
                    popupWindow.classList.add('hidden');
                    popupWindow.classList.remove('visible');
                }
                catch (error) {
                    console.error('Error updating party:', error);
                }
            }));
            // screamerStation.on(K.SKILL_MENU_CLOSE, async (_: any) => {
            //     const playerCharacter = this.model?.playerCharacter;
            //     if (!playerCharacter) {
            //         throw new Error('Player Character not found');
            //     }
            //     this.playerPortrait.addEventListener('click', () => {
            //         this.showCharacterInfo(playerCharacter, 'player')
            //     });
            // })
            screamerStation.on(K.SKILL_MENU_CLOSE, (payload) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (payload.comingFrom === 'gameMenu') {
                    const playerCharacter = (_a = this.model) === null || _a === void 0 ? void 0 : _a.getPlayerCharacter();
                    if (!playerCharacter) {
                        throw new Error('Player Character not found');
                    }
                    this.showCharacterInfo(playerCharacter, 'player');
                }
                else {
                    const skillWindow = getCharacterInfoPopupScreen();
                    skillWindow.innerHTML = '';
                    skillWindow.classList.add('hidden');
                    skillWindow.classList.remove('visible');
                }
            }));
            screamerStation.on(K.EQUIPMENT_MENU_CLOSE, (payload) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (payload.comingFrom === 'gameMenu') {
                    const playerCharacter = (_a = this.model) === null || _a === void 0 ? void 0 : _a.getPlayerCharacter();
                    if (!playerCharacter) {
                        throw new Error('Player Character not found');
                    }
                    this.showCharacterInfo(playerCharacter, 'player');
                }
                else {
                    const equipmentWindow = getCharacterInfoPopupScreen();
                    equipmentWindow.innerHTML = '';
                    equipmentWindow.classList.add('hidden');
                    equipmentWindow.classList.remove('visible');
                }
            }));
        });
    }
}
export const gameVM = new GameViewModel();
function getCharacterInfoPopupScreen() {
    let popupScreen = document.getElementById('gameMenu-popup');
    if (!popupScreen) {
        popupScreen = createCharacterInfoPopup();
    }
    return popupScreen;
}
function createCharacterInfoPopup() {
    const popupScreen = document.createElement('div');
    popupScreen.classList.add('gameMenu-popup', 'hidden');
    popupScreen.id = 'gameMenu-popup';
    document.body.appendChild(popupScreen);
    return popupScreen;
}
