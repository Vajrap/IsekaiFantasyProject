class BattleReportMenu {
    constructor() {
        this.isPopupVisible = false;
    }

    showBattleReportMenu() {
        const menu = this.createMenu();
        const popupScreen = this.getBattleReportPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.add('gameMenu-popup');
        popupScreen.classList.remove('hidden');
        popupScreen.appendChild(menu);
    }

    createMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.classList.add('battleReport-menu-container');

        const header = this.createHeader();
        menuContainer.appendChild(header);

        const reportBox = this.createReportBox();
        menuContainer.appendChild(reportBox);

        const footer = this.createFooter();
        menuContainer.appendChild(footer);

        return menuContainer;
    }

    getBattleReportPopupScreen() {
        let popupScreen = document.getElementById('gameMenu-popup');
        if (!popupScreen) {
            popupScreen = this.createBattleReportPopup();
        }
        return popupScreen;
    }

    createBattleReportPopup() {
        const popupScreen = document.createElement('div');
        popupScreen.classList.add('gameMenu-popup');
        popupScreen.id = 'gameMenu-popup';

        document.body.appendChild(popupScreen);
        return popupScreen;
    }

    createHeader() {
        const header = document.createElement('div');
        header.classList.add('battleReport-menu-header');
        header.textContent = 'Battle Reports';
        return header;
    }

    createReportBox() {
        const reportBox = document.createElement('div');
        reportBox.classList.add('battleReport-menu-reportBox');

        if (gameModel.battleReports.length === 0) {
            return reportBox;
        }

        for (const report of gameModel.battleReports) {
            const reportElement = this.createReportElement(report);
            reportBox.appendChild(reportElement);
        }

        return reportBox;
    }

    createReportElement(report) {
        const reportElement = document.createElement('div');
        reportElement.classList.add('battleReport-menu-reportElement');
    
        // Determine the winner and set the background color
        const isPartyAWinner = report.winnerParty === report.report.startingPartyAMembers[0].characterID;
        const partyAColor = isPartyAWinner ? 'lightblue' : 'lightcoral';
        const partyBColor = isPartyAWinner ? 'lightcoral' : 'lightblue';
    
        // Create a container for both parties and VS element
        const battleContainer = document.createElement('div');
        battleContainer.classList.add('battleReport-menu-battleContainer');

        // Create and append the grid for Party A with background color
        const partyAGrid = this.createPartyGrid(report.report.startingPartyAMembers, partyAColor);
        battleContainer.appendChild(partyAGrid);
    
        // Create and append the VS element
        const vsElement = document.createElement('div');
        vsElement.classList.add('battleReport-menu-vs');
        vsElement.textContent = 'vs';
        battleContainer.appendChild(vsElement);
    
        // Create and append the grid for Party B with background color
        const partyBGrid = this.createPartyGrid(report.report.startingPartyBMembers, partyBColor);
        battleContainer.appendChild(partyBGrid);

        // Append the battle container to the report element
        reportElement.appendChild(battleContainer);
    
        // Number of turns
        const turnsNumber = document.createElement('div');
        turnsNumber.classList.add('battleReport-menu-reportContent');
        turnsNumber.textContent = `Number of Turns: ${report.report.battleTurn.length}`;
        reportElement.appendChild(turnsNumber);

        // Create and append the "View Battle" button
        const viewBattleButton = document.createElement('button');
        viewBattleButton.classList.add('battleReport-menu-viewButton');
        viewBattleButton.textContent = 'View Battle';
        viewBattleButton.addEventListener('click', () => {
            const battleReplay = new BattleReplay(report)
        });
        reportElement.appendChild(viewBattleButton);
    
        return reportElement;
    }

    createPartyGrid(partyMembers, backgroundColor) {
        const partyGrid = document.createElement('div');
        partyGrid.classList.add('battleReport-menu-partyGrid');
        partyGrid.style.backgroundColor = backgroundColor;

        for (let i = 0; i < 6; i++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('battleReport-menu-gridCell');

            const member = partyMembers[i];
            if (member) {
                const portrait = document.createElement('img');
                portrait.classList.add('battleReport-menu-portrait');
                portrait.src = `../../assets/portrait/${member.portrait}.png`; // Assuming portrait field contains the filename
                gridCell.appendChild(portrait);

                const name = document.createElement('div');
                name.classList.add('battleReport-menu-name');
                name.textContent = member.name;
                gridCell.appendChild(name);
            }

            partyGrid.appendChild(gridCell);
        }
        return partyGrid;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.classList.add('battleReport-menu-footer');

        const clearButton = document.createElement('button');
        clearButton.classList.add('battleReport-menu-clearButton');
        clearButton.textContent = 'Clear Battle Report';
        clearButton.addEventListener('click', () => {
            // Implement clear functionality here
        });
        footer.appendChild(clearButton);

        const returnButton = document.createElement('button');
        returnButton.classList.add('battleReport-menu-returnButton');
        returnButton.textContent = 'Return';
        returnButton.addEventListener('click', () => {
            this.hideBattleReportMenu();
        });
        footer.appendChild(returnButton);

        return footer;
    }

    hideBattleReportMenu() {
        const popupScreen = this.getBattleReportPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.classList.add('hidden');
        popupScreen.classList.remove('visible');
    }
}

const battleReportMenu = new BattleReportMenu();