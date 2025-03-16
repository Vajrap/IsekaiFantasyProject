import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes";
import { Character } from "../../Entities/Character/Character";
import { Dice } from "../../Utility/Dice";

export function event_train(actor: Character, trainTarget: CharacterStatusEnum, bonusTrainingExp = 1): void {
    if (actor === undefined || actor === null) { throw new Error("Actor is undefined"); }
    if (trainTarget === undefined || trainTarget === null) { throw new Error("AttributeName is undefined, needed to verify the attribute trained"); }
    
    const learningBonus = actor.getModifier(CharacterStatusEnum.intelligence) + actor.getModifier(CharacterStatusEnum.willpower);
    const learningDice = Dice.rollTwenty();
    const trainingExpGain = (10 + learningBonus + learningDice)*bonusTrainingExp;

    actor.train(trainTarget, trainingExpGain);
}
