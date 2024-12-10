import { BackgroundEnum } from "./BackgroundEnum";
import { ClassEnum } from "./ClassEnum";
import { RaceEnum } from "./RaceEnum";

export function createCharacterHandler(req: Request) {

}

interface CreateCharacterRequest {
    characterName: string;
    race: RaceEnum;
    class: ClassEnum;
    background: BackgroundEnum;
};

