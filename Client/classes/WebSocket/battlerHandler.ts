class BattleHandler {
    process(subType: string, message: any) {
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

    handleBattleStart(message: any) {
        console.log('Battle started:', message);
    }

    handleBattleEnd(message: any) {
        console.log('Battle ended:', message);
    }
}

export const battleHandler = new BattleHandler();