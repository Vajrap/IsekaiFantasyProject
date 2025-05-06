import { MobCharacterEnum } from "../../../../Common/DTOsEnumsInterfaces/Map/MobCharacterEnum";
import { goblinEnemyRepository } from "./Goblin";
import { slimeEnemyRepository } from "./Slime";
import { humanEnemyRepository } from "./Human";
import { beastEnemyRepository } from "./Beast";
import { reptileEnemyRepository } from "./Reptile";
import { wolfEnemyRepository } from "./Wolf";
import { Enemy, EnemyArchetype } from "./Enemy";
import { Character } from "../Character";

// Type definition for any enemy that can be created
interface EnemyCreator {
    name: MobCharacterEnum;
    create?: () => Character;
    createEnemy?: (description: string, portrait: string) => Character;
}

const enemyRepository = [
    ...goblinEnemyRepository,
    ...slimeEnemyRepository,
    ...humanEnemyRepository,
    ...beastEnemyRepository,
    ...reptileEnemyRepository,
    ...wolfEnemyRepository
]

export function getEnemyFromRepository(name: MobCharacterEnum): Character {
    // Use type assertion to handle different enemy creator implementations
    const enemy = enemyRepository.find(enemy => enemy.name === name) as EnemyCreator;
    if (!enemy) {
        throw new Error(`Enemy ${name} not found in repository`);
    }
    
    // Different repository implementations might have different methods to create enemies
    if (enemy.create) {
        return enemy.create();
    } 
    else if (enemy.createEnemy) {
        // Default description and portrait if needed
        return enemy.createEnemy("An enemy creature", name.toString());
    }
    
    throw new Error(`Enemy ${name} found in repository but couldn't be created`);
}