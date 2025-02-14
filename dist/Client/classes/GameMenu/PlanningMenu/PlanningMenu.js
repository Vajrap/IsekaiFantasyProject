import { getPopupMenu } from "../../../../Client/classes/popup/popup.js";
import { screamer } from "../../../../Client/Screamer/Screamer.js";
export class PlanningMenu {
    constructor(party) {
        this.screamer = screamer;
        this.party = party;
        this.planningMenu = this.createPlanningMenu();
    }
    createPlanningMenu() {
        const gameMenuPopup = getPopupMenu();
        // create the planning menu
        const planningMenu = document.createElement('div');
        planningMenu.classList.add('planning-menu');
        gameMenuPopup.appendChild(planningMenu);
        // here we need to create 2 sections and append them to the planning menu
        const characterPositionSection = this.createCharacterPositionSection();
        planningMenu.appendChild(characterPositionSection);
        this.updateCharacterPositionSection();
        /*
        
        This is a planning menu that player can.
            1. Swap party members positions.
            2. Assign actions to party
        
            So we need 2 sections:
            1. Party members section
                - Just list all the positions and characters in the position, drag and drop to swap positions
            2. Action section
                - We need to list all the actions that player can assign to the party, this might appeared as a list of buttons
                - Time slots to assign the actions

            Party Interface looks like this
            export interface PartyInterface {
                partyID: string;
                location: string;
                isTraveling: boolean;
                characters: (CharacterInterface | "none")[]; // Simplified character data for each party member
                actionsSequence: string[]; // List of action names or enums
                actionsList: { [time: number]: string | null }; // Action schedule
            }
        */
        // lastly append the planning menu to the popup screen
        return planningMenu;
    }
    createCharacterPositionSection() {
        // A section of 6 slots, 2 columns, 3 rows, right column for front row, left column for back row
        // Each slot contains a character
        const characterPositionSection = document.createElement('div');
        characterPositionSection.classList.add('character-position-section');
        const frontRow = document.createElement('div');
        frontRow.classList.add('front-row');
        const backRow = document.createElement('div');
        backRow.classList.add('back-row');
        characterPositionSection.appendChild(frontRow);
        characterPositionSection.appendChild(backRow);
        // Create slots
        for (let i = 0; i < 6; i++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.setAttribute('data-position', i.toString());
            slot.addEventListener('drop', this.drop);
            slot.addEventListener('dragover', this.allowDrop);
            if (i < 3) {
                frontRow.appendChild(slot);
            }
            else {
                backRow.appendChild(slot);
            }
        }
        return characterPositionSection;
    }
    updateCharacterPositionSection() {
        let iterator = 0;
        for (const character of this.party.characters) {
            console.log('Mapping slot', iterator);
            const slot = document.querySelector(`.slot[data-position="${iterator}"]`);
            if (!slot) {
                throw new Error('Slot not found');
            }
            if (character === 'none') {
                iterator++;
                continue;
            }
            slot.innerHTML = '';
            slot.appendChild(this.createCharacterSmallCard(character));
            iterator++;
        }
    }
    createCharacterSmallCard(character) {
        const characterSmallCard = document.createElement('div');
        characterSmallCard.classList.add('character-small-card');
        characterSmallCard.innerHTML = `
            <div class="character-portrait">
                <img src="${character.portrait}" alt="${character.name}">
            </div>
            <div class="character-name">${character.name}</div>
            <div class="character-level">Level ${character.level}</div>
            <div class="character-hp">HP ${character.currentHP} / ${character.maxHP}</div>
            <div class="character-mp">MP ${character.currentMP} / ${character.maxMP}</div>
            <div class="character-sp">SP ${character.currentSP} / ${character.maxSP}</div>
        `;
        return characterSmallCard;
    }
    drop() {
    }
    allowDrop() {
    }
}
