class GameModel {
    constructor() {
        this.playerCharacter = null;
        this.companionCharacters = [];
        this.battleReports = [];
        this.eventManager = null;
        this.battleManager = null;
        this.characterWS = characterWS;
        this.battleWS = battleWS;
        this.gameWS = gameWS;
    }

    async initiate() {
        try {
            const userID = this.getUserID();
            await this.connectAllWebSocketServices();
            await this.fetchCharacterData(userID);
            this.initializeEventManager();
        } catch (error) {
            console.error('Initialization failed:', error);
            throw error;
        }
    }

    getUserID() {
        const userID = localStorage.getItem('isekaiFantasy_userID');
        if (!userID) {
            console.error('User ID not found in localStorage');
            throw new Error('User ID not found in localStorage');
        }
        return userID;
    }

    connectAllWebSocketServices() {
        return Promise.all([
            this.connectCharacterWS(),
            this.connectGameWS(),
            this.connectBattleWS()
        ]);
    }

    connectCharacterWS() {
        return this.characterWS.connect();
    }

    connectGameWS() {
        return this.gameWS.connect();
    }

    connectBattleWS() {
        return this.battleWS.connect();
    }

    fetchCharacterData(userID) {
        return new Promise((resolve, reject) => {
            this.characterWS.send({
                type: 'GET_CHARACTER',
                userID: userID
            });

            this.characterWS.on('CHARACTER_RESPONSE', (message) => {
                console.log(message);
                this.playerCharacter = new Character(message.character);
                resolve();
            });

            this.characterWS.on('ERROR', (message) => {
                console.error('Server Error:', message.message);
                reject(new Error(message.message));
            });
        });
    }

    initializeEventManager() {
        this.eventManager = new EventManager(this);
    }

    checkForNewGameFlag() {
        if (this.playerCharacter.storyFlags.finishedStartingEvent === false) {
            this.eventManager.startNewGameEvent();
        }
    }
}

const gameModel = new GameModel();

