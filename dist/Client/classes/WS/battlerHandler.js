class BattleHandler {
    process(subType, message) {
        switch (subType) {
            case 'START':
                this.handleBattleStart(message);
                break;
            case 'END':
                this.handleBattleEnd(message);
                break;
            default:
                console.warn(`Unhandled BATTLE message subtype: ${subType}`);
        }
    }
    handleBattleStart(message) {
        console.log('Battle started:', message);
    }
    handleBattleEnd(message) {
        console.log('Battle ended:', message);
    }
}
export const battleHandler = new BattleHandler();
