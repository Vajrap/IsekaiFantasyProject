interface BattleEvent {
    type: string;
    data: any;
}

interface CharacterTurnEvent extends BattleEvent {
    type: "characterTurn";
    data: {
        id: string;
    };
}

interface SkillUsedEvent extends BattleEvent {
    type: 'skill_used';
    data: {
        characterId: string;
        skillName: string;
        targetId: string;
    };
}

interface CharacterDiedEvent extends BattleEvent {
    type: 'character_died';
    data: {
        characterId: string;
    };
}

interface BattleEndedEvent extends BattleEvent {
    type: 'battle_ended';
    data: {
        winner: string;
    };
}