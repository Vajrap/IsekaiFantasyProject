import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { skeletonEnemyRepository } from "./Undead";

const enemyRepository = [
    ...skeletonEnemyRepository,
]

export function getEnemyFromRepository(name: MobCharacterEnum) {
    const enemy = enemyRepository.find(enemy => enemy.name === name);
    if (!enemy) {
        throw new Error(`Enemy ${name} not found in repository`);
    }
    return enemy.create();
}