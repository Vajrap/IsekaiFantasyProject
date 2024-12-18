class GameHandler {
    process(subType: string, message: any) {
        switch (subType) {
            case 'CREATE':
                this.handleCharacterCreate(message);
                break;
            case 'UPDATE':
                this.handleCharacterUpdate(message);
                break;
            default:
                console.warn(`Unhandled CHARACTER message subtype: ${subType}`);
        }
    }

    handleCharacterCreate(message: any) {
        console.log('Character created:', message);
    }

    handleCharacterUpdate(message: any) {
        console.log('Character updated:', message);
    }
}

export const gameHandler = new GameHandler();