class BattleReplay {
    constructor(battleReport) {
        this.battleReport = battleReport;
        this.currentTurnIndex = 0;
        this.menu = this.createMenu();
        this.showingCard;
        this.showBattleReplay();
        this.footer;
        this.isPlaying = false;
    }

    createMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.classList.add('battleReplay-menu-container');

        const header = this.createHeader();
        menuContainer.appendChild(header);

        const battleArea = this.createBattleArea();
        menuContainer.appendChild(battleArea);

        this.footer = this.createFooter();
        menuContainer.appendChild(this.footer);

        return menuContainer;
    }

    createHeader() {
        const header = document.createElement('div');
        header.classList.add('battleReplay-menu-header');

        const prevButton = document.createElement('button');
        prevButton.classList.add('battleReplay-menu-button');
        prevButton.textContent = '<';
        prevButton.addEventListener('click', () => this.showPreviousTurn());
        header.appendChild(prevButton);

        const playButton = document.createElement('button');
        playButton.classList.add('battleReplay-menu-button');
        playButton.textContent = '>';
        playButton.addEventListener('click', () => this.playReplay());
        header.appendChild(playButton);

        const nextButton = document.createElement('button');
        nextButton.classList.add('battleReplay-menu-button');
        nextButton.textContent = '>|';
        nextButton.addEventListener('click', () => this.showNextTurn());
        header.appendChild(nextButton);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('battleReplay-menu-button');
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', () => {
            this.cleanup();
            const battleReportMenu = new BattleReportMenu();
            battleReportMenu.showBattleReportMenu();
        });
        header.appendChild(closeBtn);

        return header;
    }

    createBattleArea() {
        const battleArea = document.createElement('div');
        battleArea.classList.add('battleReplay-battleArea');

        const partyA = this.createPartyContainerA(this.battleReport.report.startingPartyAMembers);
        battleArea.appendChild(partyA);

        const cardInUse = document.createElement('div');
        cardInUse.classList.add('battleReplay-cardInUse');
        battleArea.appendChild(cardInUse);
        this.showingCard = cardInUse;

        const partyB = this.createPartyContainerB(this.battleReport.report.startingPartyBMembers);
        battleArea.appendChild(partyB);

        return battleArea;
    }

    createPartyContainerA(partyMembers) {
        const partyContainer = document.createElement('div');
        partyContainer.classList.add('battleReplay-partyContainerA');
    
        for (let i = 0; i < 6; i++) {
            const member = partyMembers.find(member => member && member.position === i);
            const charContainer = this.createCharacterContainer(member);
            charContainer.dataset.characterId = member ? member.characterID : null;
            charContainer.style.gridArea = `char${i + 1}`;
            partyContainer.appendChild(charContainer);
        }
    
        return partyContainer;
    }
    
    createPartyContainerB(partyMembers) {
        const partyContainer = document.createElement('div');
        partyContainer.classList.add('battleReplay-partyContainerB');
    
        for (let i = 0; i < 6; i++) {
            const member = partyMembers.find(member => member && member.position === i);
            const charContainer = this.createCharacterContainer(member);
            charContainer.dataset.characterId = member ? member.characterID : null;
            charContainer.style.gridArea = `char${i + 1}`;
            partyContainer.appendChild(charContainer);
        }
    
        return partyContainer;
    }

    createCharacterContainer(member) {
        const charContainer = document.createElement('div');
        charContainer.classList.add('battleReplay-charContainer');

        if (member) {
            const charStats = document.createElement('div');
            charStats.classList.add('battleReplay-charStats');
            charContainer.appendChild(charStats);

            const charStatsHP = document.createElement('div');
            charStatsHP.classList.add('battleReplay-charStats-Element');
            charStatsHP.textContent = `🔴 ${member.currentHP}/${member.maxHP}`;
            charStats.appendChild(charStatsHP);

            const charStatsMP = document.createElement('div');
            charStatsMP.classList.add('battleReplay-charStats-Element');
            charStatsMP.textContent = `🔵 ${member.currentMP}/${member.maxMP}`;
            charStats.appendChild(charStatsMP);

            const charStatsSP = document.createElement('div');
            charStatsSP.classList.add('battleReplay-charStats-Element');
            charStatsSP.textContent = `🟡 ${member.currentSP}/${member.maxSP}`;
            charStats.appendChild(charStatsSP);

            const charPortraitAndName = document.createElement('div');
            charPortraitAndName.classList.add('battleReplay-charPortraitAndName');
            charContainer.appendChild(charPortraitAndName);

            const charPortrait = document.createElement('img');
            charPortrait.classList.add('battleReplay-charPortrait');
            charPortrait.src = `../../assets/portrait/${member.portrait}.png`;
            charPortraitAndName.appendChild(charPortrait);

            const charName = document.createElement('div');
            charName.classList.add('battleReplay-charName');
            charName.textContent = member.name;
            charPortraitAndName.appendChild(charName);

            charContainer.appendChild(charPortraitAndName);

            const charResources = document.createElement('div');
            charResources.classList.add('battleReplay-charResources');
            const resources = member.resources;
            const order = resources.order? resources.order : 0;
            const chaos = resources.chaos? resources.chaos : 0;
            const fire = resources.fire? resources.fire : 0;
            const water = resources.water? resources.water : 0;
            const geo = resources.geo? resources.geo : 0;
            const air = resources.air? resources.air : 0;
            const none = resources.none? resources.none : 0;
            const charResourcesOrder = document.createElement('div');
            charResourcesOrder.classList.add('battleReplay-charResources-Element');
            charResourcesOrder.textContent = `🔆 ${order}`;
            charResources.appendChild(charResourcesOrder);
            const charResourcesChaos = document.createElement('div');
            charResourcesChaos.classList.add('battleReplay-charResources-Element');
            charResourcesChaos.textContent = `🪬 ${chaos}`;
            charResources.appendChild(charResourcesChaos);
            const charResourcesFire = document.createElement('div');
            charResourcesFire.classList.add('battleReplay-charResources-Element');
            charResourcesFire.textContent = `🔥 ${fire}`;
            charResources.appendChild(charResourcesFire);
            const charResourcesWater = document.createElement('div');
            charResourcesWater.classList.add('battleReplay-charResources-Element');
            charResourcesWater.textContent = `💧 ${water}`;
            charResources.appendChild(charResourcesWater);
            const charResourcesGeo = document.createElement('div');
            charResourcesGeo.classList.add('battleReplay-charResources-Element');
            charResourcesGeo.textContent = `🌱 ${geo}`;
            charResources.appendChild(charResourcesGeo);
            const charResourcesAir = document.createElement('div');
            charResourcesAir.classList.add('battleReplay-charResources-Element');
            charResourcesAir.textContent = `🌬️ ${air}`;
            charResources.appendChild(charResourcesAir);
            const charResourcesNone = document.createElement('div');
            charResourcesNone.classList.add('battleReplay-charResources-Element');
            charResourcesNone.textContent = `⚪️ ${none}`;
            charResources.appendChild(charResourcesNone);
            charContainer.appendChild(charResources);
        }

        return charContainer;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.classList.add('battleReplay-menu-footer');

        const turnDescription = document.createElement('div');
        turnDescription.classList.add('battleReplay-turnDescription');
        turnDescription.textContent = 'A battle happened at ...';
        footer.appendChild(turnDescription);

        return footer;
    }

    showPreviousTurn() {
        if (this.currentTurnIndex > 0) {
            this.currentTurnIndex--;
            this.updateTurnDescription();
        }
    }

    playReplay() {
        for (let turn = 0; turn < this.battleReport.report.battleTurn.length; turn++) {
            setTimeout(() => {
                this.currentTurnIndex = turn;
                this.playReplayAnimation();
            }, turn * 5000);
        }
    }

    async playReplayAnimation() {
        const currentTurn = this.battleReport.report.battleTurn[this.currentTurnIndex];
        const actor = currentTurn.actor;
        const targets = currentTurn.targets;
        const skill = currentTurn.skillUsed;
        const actorEffects = currentTurn.actorSkillEffect || [];
        const targetEffects = currentTurn.targetSkillEffect || [];
    
        this.updateTurnDescription();
    
        const actorElement = this.findCharacterElement(actor.characterID);
        this.applyActorSkillEffects(actorElement, actorEffects);
        await delay(1000);
    
        this.showingCard.innerHTML = '';
        const skillCard = new SkillCard(skill);
        const skillCardElement = skillCard.render();
        skillCardElement.style.transform = 'scale(0.7)';
        skillCardElement.style.transformOrigin = 'center';
        skillCardElement.style.width = '100%';
        skillCardElement.style.height = '70%';
        this.showingCard.appendChild(skillCardElement);
        await delay(1000);
    
        this.applyTargetSkillEffects(targets, targetEffects);
        await delay(1000);
    
        this.updateCharacterStats(currentTurn);
        await delay(500);
        this.showingCard.innerHTML = '';
    }
    
    async applyActorSkillEffects(element, effects) {
        if (!element ) return;
        const totalDuration = 1000;
        const effectDuration = totalDuration / effects.length;
    
        for (const effect of effects) {
            element.classList.add(`skill-effect-${effect}`);
            await delay(effectDuration);
            element.classList.remove(`skill-effect-${effect}`);
        }
    }  

    async applyTargetSkillEffects(targets, effects) {
        let totalDuration = 1000;
        let effecDuration = totalDuration / (effects.length * targets.length);
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            const targetElement = this.findCharacterElement(target.target.characterID);
            for (let j = 0; j < effects.length; j++) {
                const effect = effects[j];
                targetElement.classList.add(`target-skill-effect-${effect}`);
                await delay(effecDuration);
                targetElement.classList.remove(`target-skill-effect-${effect}`);
            }
        }
    }

    showNextTurn() {
        if (this.currentTurnIndex < this.battleReport.report.battleTurn.length - 1) {
            this.currentTurnIndex++;
            this.updateTurnDescription();
        }
    }

    showBattleReplay() {
        const popupScreen = this.getBattleReportPopupScreen();
        popupScreen.innerHTML = '';
        popupScreen.appendChild(this.menu)
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

    updateTurnDescription() {
        const turnDescription = this.footer.querySelector('.battleReplay-turnDescription');
        const currentTurn = this.battleReport.report.battleTurn[this.currentTurnIndex];

        turnDescription.innerHTML = '';

        const turnNumber = document.createElement('div');
        turnNumber.classList.add('battleReplay-turnNumber');
        turnNumber.textContent = `Turn ${this.currentTurnIndex + 1}`;
        turnDescription.appendChild(turnNumber);

        const description = this.parseDescription(currentTurn.description);
        setTimeout(() => turnDescription.appendChild(description), 500);
    }

    parseDescription(description) {
        const fragment = document.createDocumentFragment();
    
        const parts = description.split(/(\(actor=.*?\))|(\(skill=.*?\))|(\(.*?=.*?\))/g).filter(Boolean);
        parts.forEach(part => {
            if (part.startsWith('(actor=')) {
                const actor = part.slice(7, -1);
                const span = document.createElement('span');
                span.classList.add('battleReplay-actor');
                span.textContent = actor;
                fragment.appendChild(span);
            } else if (part.startsWith('(skill=')) {
                const skill = part.slice(7, -1);
                const span = document.createElement('span');
                span.classList.add('battleReplay-skill');
                span.textContent = skill;
                fragment.appendChild(span);
            } else if (part.startsWith('(') && part.includes('=')) {
                const [type, value] = part.slice(1, -1).split('=');
                const span = document.createElement('span');
                span.classList.add(`battleReplay-${type}`);
                span.textContent = value;
                fragment.appendChild(span);
            } else {
                const text = document.createElement('span');
                text.textContent = part;
                fragment.appendChild(text);
            }
        });
    
        return fragment;
    }

    // Helper functions
    highlightElement(element, color) {
        if (element) {
            const defaultColor = element.style.backgroundColor;
            element.style.backgroundColor = color;
            element.classList.add('active');
            setTimeout(() => element.classList.remove('active'), 1000); 
            setTimeout(() => element.style.backgroundColor = defaultColor, 1000);
        }
    }

    applyShakeEffect(element) {
        if (element) {
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 500); // Remove shake after 0.5 second
        }
    }

    findCharacterElement(characterID) {
        return document.querySelector(`.battleReplay-charContainer[data-character-id="${characterID}"]`);
    }

    updateCharacterStats(currentTurn) {
        const updateStatsForCharacter = (character) => {
            const charContainer = document.querySelector(`[data-character-id="${character.characterID}"]`);
            if (charContainer) {
                const charStatsHP = charContainer.querySelector('.battleReplay-charStats-Element:nth-child(1)');
                if (charStatsHP) { charStatsHP.textContent = `🔴 ${character.currentHP}/${character.maxHP}`; }
                const charStatsMP = charContainer.querySelector('.battleReplay-charStats-Element:nth-child(2)');
                if (charStatsMP) { charStatsMP.textContent = `🔵 ${character.currentMP}/${character.maxMP}`; }
                const charStatsSP = charContainer.querySelector('.battleReplay-charStats-Element:nth-child(3)');
                if (charStatsSP) { charStatsSP.textContent = `🟡 ${character.currentSP}/${character.maxSP}`; }
    
                const resources = character.resources;
                const order = resources.order ? resources.order : 0;
                const chaos = resources.chaos ? resources.chaos : 0;
                const fire = resources.fire ? resources.fire : 0;
                const water = resources.water ? resources.water : 0;
                const geo = resources.geo ? resources.geo : 0;
                const air = resources.air ? resources.air : 0;
                const none = resources.none ? resources.none : 0;
                const charResourcesOrder = charContainer.querySelector('.battleReplay-charResources-Element:nth-child(1)');
                if (charResourcesOrder) { charResourcesOrder.textContent = `🔆 ${order}`; }
                const charResourcesChaos = charContainer.querySelector('.battleReplay-charResources-Element:nth-child(2)');
                if (charResourcesChaos) { charResourcesChaos.textContent = `🪬 ${chaos}`; }
                const charResourcesFire = charContainer.querySelector('.battleReplay-charResources-Element:nth-child(3)');
                if (charResourcesFire) { charResourcesFire.textContent = `🔥 ${fire}`; }
                const charResourcesWater = charContainer.querySelector('.battleReplay-charResources-Element:nth-child(4)');
                if (charResourcesWater) { charResourcesWater.textContent = `💧 ${water}`; }
                const charResourcesGeo = charContainer.querySelector('.battleReplay-charResources-Element:nth-child(5)');
                if (charResourcesGeo) { charResourcesGeo.textContent = `🌱 ${geo}`; }
                const charResourcesAir = charContainer.querySelector('.battleReplay-charResources-Element:nth-child(6)');
                if (charResourcesAir) { charResourcesAir.textContent = `🌬️ ${air}`; }
                const charResourcesNone = charContainer.querySelector('.battleReplay-charResources-Element:nth-child(7)');
                if (charResourcesNone) { charResourcesNone.textContent = `⚪️ ${none}`; }
            }

            if (character.currentHP <= 0) {
                charContainer.classList.add('isDead');
            } else {
                charContainer.classList.remove('isDead');
            }
        };
        updateStatsForCharacter(currentTurn.actor);

        currentTurn.targets.forEach(target => {
            updateStatsForCharacter(target.target);
        });
    }

    cleanup() {
        const popupScreen = document.getElementById('gameMenu-popup');
        if (popupScreen) {
            popupScreen.innerHTML = '';
        }
        this.battleReport = null;
        this.currentTurnIndex = 0;
        this.menu = null;
        this.showingCard = null;
        this.footer = null;
        this.isPlaying = false;
    }
}

