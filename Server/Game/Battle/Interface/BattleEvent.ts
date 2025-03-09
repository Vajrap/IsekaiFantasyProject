interface BattleEventInterface {
    type: string;
    data: any;
}

interface CharacterTurnEvent extends BattleEventInterface {
    type: "characterTurn";
    data: {
        id: string;
    };
}

interface SkillUsedEvent extends BattleEventInterface {
    type: 'skill_used';
    data: {
        characterId: string;
        skillName: string;
        targetId: string;
    };
}

interface CharacterDiedEvent extends BattleEventInterface {
    type: 'character_died';
    data: {
        characterId: string;
    };
}

interface BattleEndedEvent extends BattleEventInterface {
    type: 'battle_ended';
    data: {
        winner: string;
    };
}