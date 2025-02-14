import { CharacterInterface, PartyInterface } from "../../../Common/RequestResponse/characterWS.js";
import { GameModel } from "../../../Client/HTMLs/game/gameModel.js";
import { GameMenu } from "../../../Client/classes/GameMenu/GameMenu.js";
import { screamer } from "../../../Client/Screamer/Screamer.js";
import { K } from "../../../Common/Constant.js";
import { EquipmentsAndItemsMenu } from "../../../Client/classes/GameMenu/EquipmentsAndItemsMenu/EquipementsAndItemsMenu.js";
import { SkillMenu } from "../../../Client/classes/GameMenu/SkillMenu/SkillMenu.js";
import { PlanningMenu } from "../../../Client/classes/GameMenu/PlanningMenu/PlanningMenu.js";

class GameViewModel {
    // Model
    model: GameModel | null;

    // View
    playerPortrait: HTMLImageElement;
    companionPortraits: HTMLImageElement[];
    dialogueBoxCharacterLeft: HTMLElement;
    dialogueBoxCharacterRight: HTMLElement;

    battleReportBtn: HTMLElement;
    planningBtn: HTMLElement;
    skillsBtn: HTMLElement;
    questBtn: HTMLElement;
    inventoryBtn: HTMLElement;
    optionBtn: HTMLElement;
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
        this.planningBtn = document.getElementById('menu-planning') as HTMLElement;
        this.skillsBtn = document.getElementById('menu-skills') as HTMLElement;
        this.questBtn = document.getElementById('menu-quest') as HTMLElement;
        this.inventoryBtn = document.getElementById('menu-inventory') as HTMLElement;
        this.optionBtn = document.getElementById('menu-options') as HTMLElement;
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

        const playerCharacter = model.getPlayerCharacter();
        
        this.playerPortrait.src = `../../assets/portrait/${playerCharacter.portrait}.png`;

        const companionCharacters = model.getAllCompanionCharacters();
        if (companionCharacters.length === 0) {
            return;
        } else {
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
            this.showCharacterInfo(playerCharacter, 'player')
        });

        const companionCharacters = model.getAllCompanionCharacters();
        this.companionPortraits.forEach((portrait, index) => {
            if (!portrait) {
                return;
            }
            portrait.addEventListener('click', () => {
                this.showCharacterInfo(companionCharacters[index], 'companion')
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
            if (model.party === null || model.party === undefined) { throw new Error('Party not found'); }
            this.showPlanningMenu(model.party);
        });

        this.skillsBtn.addEventListener('click', () => {
            this.showSkillsMenu(playerCharacter);
        });

        this.inventoryBtn.addEventListener('click', () => {
            this.showEquipmentsAndItemsMenu(playerCharacter);
        });
    }

    showPlanningMenu(party: PartyInterface) {
        const popupScreen = getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');

        new PlanningMenu(party)
    }

    showSkillsMenu(character: CharacterInterface) {
        const popupScreen = getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';        
        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');
    
        const learnedSkills = character.skills.concat(character.activeSkills);
    
        const skillMenu = new SkillMenu(
            character, 
            learnedSkills, 
            character.activeSkills,
            'mainGame'
        )
            
        const skillMenuElement = skillMenu.skillMenu;
        popupScreen.appendChild(skillMenuElement);
    }

    showEquipmentsAndItemsMenu(character: CharacterInterface) {
        const popupScreen = getCharacterInfoPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.remove('hidden');
        popupScreen.classList.add('visible');

        const equipmentsAndItemsMenu = new EquipmentsAndItemsMenu(character, 'mainGame');
        const equipmentsAndItemsMenuElement = equipmentsAndItemsMenu.menu;
        popupScreen.appendChild(equipmentsAndItemsMenuElement);
    }
    

    showCharacterInfo(character: CharacterInterface, type: 'player' | 'companion') {
        if (!character) {
            console.error('Player Character not found');
            return;
        } else {
            this._gameMenu.showGameMenuWithPlayerCharacterInfo(character, type);

            const popupScreen = getCharacterInfoPopupScreen();
            
            popupScreen.classList.add('visible');
            popupScreen.classList.remove('hidden');
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
                const popupWindow = getCharacterInfoPopupScreen();
                popupWindow.innerHTML = '';
                popupWindow.classList.add('hidden');
                popupWindow.classList.remove('visible');
            } catch (error) {
                console.error('Error updating party:', error);
            }
        })

        // screamerStation.on(K.SKILL_MENU_CLOSE, async (_: any) => {
        //     const playerCharacter = this.model?.playerCharacter;

        //     if (!playerCharacter) {
        //         throw new Error('Player Character not found');
        //     }
    
        //     this.playerPortrait.addEventListener('click', () => {
        //         this.showCharacterInfo(playerCharacter, 'player')
        //     });
        // })

        screamerStation.on(K.SKILL_MENU_CLOSE, async (payload: any) => {
            if (payload.comingFrom === 'gameMenu') {
                const playerCharacter = this.model?.getPlayerCharacter()
                if (!playerCharacter) { throw new Error('Player Character not found')}
                this.showCharacterInfo(playerCharacter, 'player');
            } else {
                const skillWindow = getCharacterInfoPopupScreen();
                skillWindow.innerHTML = '';
                skillWindow.classList.add('hidden');
                skillWindow.classList.remove('visible');
            }
        })

        screamerStation.on(K.EQUIPMENT_MENU_CLOSE, async (payload: any) => {
            if (payload.comingFrom === 'gameMenu') {
                const playerCharacter = this.model?.getPlayerCharacter();
                if (!playerCharacter) {
                    throw new Error('Player Character not found');
                }
                this.showCharacterInfo(playerCharacter, 'player');
            } else {
                const equipmentWindow = getCharacterInfoPopupScreen();
                equipmentWindow.innerHTML = '';
                equipmentWindow.classList.add('hidden');
                equipmentWindow.classList.remove('visible');
            }
        })
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