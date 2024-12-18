class CharacterHandler {
    process(subType, message) {
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
    handleCharacterCreate(message) {
        console.log('Character created:', message);
    }
    handleCharacterUpdate(message) {
        console.log('Character updated:', message);
    }
}
export const characterHandler = new CharacterHandler();
