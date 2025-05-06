/**
 * Centralized enemy management
 * 
 * This file exports all enemy archetypes and provides helpers to create actual Enemy instances
 * when needed. Archetypes are just templates, not actual enemy instances.
 */

import { beastEnemyRepository } from "./Beast";
import { goblinEnemyRepository } from "./Goblin";
import { humanEnemyRepository } from "./Human";
import { naturalBeastEnemyRepository } from "./NaturalBeast";
import { reptileEnemyRepository } from "./Reptile";
import { slimeEnemyRepository } from "./Slime";
import { Enemy, EnemyArchetype } from "./Enemy";

// Group all enemy archetypes by type/category
export const enemyRepositoryByType = {
  beasts: beastEnemyRepository,
  goblins: goblinEnemyRepository,
  humans: humanEnemyRepository,
  naturalBeasts: naturalBeastEnemyRepository,
  reptiles: reptileEnemyRepository,
  slimes: slimeEnemyRepository,
};

// Combine all enemy archetypes into a single collection for easy access
export const allEnemyArchetypes: EnemyArchetype[] = [
  ...beastEnemyRepository,
  ...goblinEnemyRepository,
  ...humanEnemyRepository,
  ...naturalBeastEnemyRepository,
  ...reptileEnemyRepository,
  ...slimeEnemyRepository,
];

/**
 * Get an enemy archetype by its name
 * @param name The name of the enemy archetype to retrieve
 * @returns The enemy archetype with the matching name, or undefined if not found
 */
export function getEnemyArchetypeByName(name: string): EnemyArchetype | undefined {
  return allEnemyArchetypes.find(enemy => enemy.name === name);
}

/**
 * Create an actual Enemy instance from an archetype
 * @param archetype The enemy archetype to instantiate
 * @param description Optional description (defaults to generic description)
 * @param portraitOverride Optional portrait filename override
 * @returns A new Enemy instance
 */
export function createEnemyFromArchetype(
  archetype: EnemyArchetype, 
  description?: string, 
  portraitOverride?: string
): Enemy {
  const defaultDescription = `A ${archetype.name} enemy.`;
  const portraitName = portraitOverride || `${archetype.name}.png`;
  return archetype.createEnemy(description || defaultDescription, portraitName);
}

/**
 * Get enemy archetypes by type category
 * @param type The type/category of enemy archetypes to retrieve
 * @returns An array of enemy archetypes belonging to the specified category
 */
export function getEnemyArchetypesByType(type: keyof typeof enemyRepositoryByType): EnemyArchetype[] {
  return enemyRepositoryByType[type];
}

/**
 * Get enemy archetypes by level range
 * @param minLevel The minimum level (inclusive)
 * @param maxLevel The maximum level (inclusive)
 * @returns An array of enemy archetypes within the specified level range
 */
export function getEnemyArchetypesByLevel(minLevel: number, maxLevel: number): EnemyArchetype[] {
  return allEnemyArchetypes.filter(enemy => enemy.level >= minLevel && enemy.level <= maxLevel);
}

/**
 * Create an array of Enemy instances from archetypes matching the specified level range
 * @param minLevel The minimum level (inclusive)
 * @param maxLevel The maximum level (inclusive)
 * @returns An array of instantiated Enemy objects within the specified level range
 */
export function createEnemiesByLevel(minLevel: number, maxLevel: number): Enemy[] {
  const archetypes = getEnemyArchetypesByLevel(minLevel, maxLevel);
  return archetypes.map(archetype => createEnemyFromArchetype(archetype));
}

// Export all enemy repositories individually for backward compatibility
export { beastEnemyRepository } from "./Beast";
export { goblinEnemyRepository } from "./Goblin";
export { humanEnemyRepository } from "./Human";
export { naturalBeastEnemyRepository } from "./NaturalBeast";
export { reptileEnemyRepository } from "./Reptile";
export { slimeEnemyRepository } from "./Slime";
export { Enemy, EnemyArchetype } from "./Enemy"; 