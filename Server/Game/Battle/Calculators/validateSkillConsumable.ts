import { CharacterResources } from "../../../Entities/Character/Subclasses/CharacterResources";
import { SkillConsume } from "../../../Entities/Skills/SubClasses/SkillConsume";

export function validateSkillConsumable(consume: SkillConsume, level: number, resources: CharacterResources, hp: number, mp: number, sp: number): boolean {
    if (consume.hp[level - 1] > hp) return false;
    if (consume.mp[level - 1] > mp) return false;
    if (consume.sp[level - 1] > sp) return false;
    for (const element of consume.elements) {
        if (element.amount[level - 1] > resources[element.element]) return false;
    }
    return true;
}
