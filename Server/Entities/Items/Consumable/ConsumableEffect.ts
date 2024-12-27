import { CharacterStatusEnum } from "../../../Utility/Enum/CharacterStatusTypes";


export interface ConsumableEffect {
    effectType: "permanent" | "temporary";
    target: CharacterStatusEnum | "hp" | "mp" | "sp" | "arcaneAptitude";
    magnitude: number;
    duration: { months: number, days: number, quarters: number };
}
