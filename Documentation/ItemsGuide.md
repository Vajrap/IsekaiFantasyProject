# Items Guide

## Overview

This document provides a comprehensive overview of items in Isekai Fantasy, covering equipment, consumables, and resources. It serves as a reference for content creators and developers.

## Item Base Structure

All items share these core properties:
- `id`: Unique identifier
- `name`: Display name
- `description`: Item description
- `image`: File path to item image
- `weight`: Weight in grams
- `tier`: Rarity tier (Common, Uncommon, Rare, Epic, Legendary, etc.)
- `cost`: Base cost and possible deviation for merchants
- `itemType`: Category (equipment, consumable, resource)

## Equipment

### Weapons

Weapon damage should follow these guidelines for balance:

| Weapon Type | Base Dice | Speed | Range | Primary Attribute |
|-------------|-----------|-------|-------|-------------------|
| Dagger      | 1d4       | Fast  | Melee | DEX               |
| Sword       | 1d6-1d8   | Medium| Melee | STR/DEX           |
| Axe         | 1d8-1d10  | Slow  | Melee | STR               |
| Mace        | 1d6-1d8   | Medium| Melee | STR               |
| Spear       | 1d8       | Medium| Melee | STR/DEX           |
| Bow         | 1d6       | Medium| Ranged| DEX               |
| Staff       | 1d6       | Medium| Both  | INT/STR           |
| Wand        | 1d4       | Fast  | Ranged| INT               |
| Tome        | 1d4       | Slow  | Ranged| INT               |
| Orb         | 1d4       | Medium| Ranged| INT               |
| Shield      | 1d4       | Slow  | Melee | STR/END           |

#### Weapon Scale by Tier

| Tier      | Damage Dice                     | Properties                            |
|-----------|--------------------------------|---------------------------------------|
| Common    | Base (1d4, 1d6, 1d8, etc.)     | Standard                              |
| Uncommon  | Base +1 size (1d4→1d6)         | +1 to one attribute or skill          |
| Rare      | Base +2 sizes (1d4→1d8)        | +2 to one attribute or skill          |
| Epic      | Base +3 sizes (1d4→1d10)       | +3 to stats, +1 effect                |
| Legendary | Base +4 sizes (1d4→1d12)       | +4 to stats, unique ability           |

### Armor

| Armor Type  | pDEF | mDEF | Dodge Penalty | Weight Class | Special                    |
|-------------|------|------|---------------|-------------|----------------------------|
| Cloth       | 1    | 2    | 0            | Light       | +1 MP regeneration         |
| Light Leather| 2    | 1    | -1           | Light       | +1 dodge bonus             |
| Studded     | 3    | 1    | -2           | Medium      | +1 to physical resistance  |
| Chain       | 4    | 0    | -3           | Medium      | +1 slash resistance        |
| Plate       | 5-6  | 0    | -4           | Heavy       | Reduced critical damage    |

#### Armor Scale by Tier

| Tier      | Defense Bonus                   | Properties                            |
|-----------|--------------------------------|---------------------------------------|
| Common    | Base                           | Standard protection                   |
| Uncommon  | +1 to primary defense          | Small resistance to one damage type   |
| Rare      | +2 to primary defense          | Notable resistance to one damage type |
| Epic      | +3 to all defense types        | Major resistance + minor effect       |
| Legendary | +4-5 to all defense, special   | Unique protective abilities           |

### Accessories

| Type       | Slot     | Primary Benefits                         |
|------------|----------|------------------------------------------|
| Ring       | Ring L/R | Attribute bonuses, skill bonuses         |
| Necklace   | Neck     | Resistance bonuses, resource generation  |
| Charm      | Utility  | Luck effects, special actions            |
| Belt       | Waist    | Carrying capacity, minor protection      |
| Earring    | Ear      | Magic effects, perception bonuses        |

## Consumables

Consumables provide temporary or permanent effects when used. They cannot be used during battle.

### Duration Guidelines

- Short: 1 phase (1/4 day)
- Medium: 1 day (4 phases)
- Long: 3 days (12 phases)
- Extended: 7 days (28 phases)
- Permanent: No duration, one-time permanent effect

### Types of Consumable Effects

| Effect Type        | Duration  | Typical Bonus                       | Rarity      |
|--------------------|-----------|-------------------------------------|-------------|
| Attribute Boost    | Medium    | +1-3 to an attribute                | Common-Rare |
| Skill Boost        | Medium    | +2-5 to a skill                     | Common-Rare |
| Resource Regen     | Short     | +1-3 MP/SP regen per turn           | Uncommon    |
| Status Protection  | Medium    | Immunity to a status effect         | Rare        |
| Element Affinity   | Medium    | +25-50% damage with element         | Rare        |
| Permanent Stat     | Permanent | +1 to a base attribute              | Epic+       |
| Special Ability    | Long      | Unique ability/effect               | Epic+       |
| Experience Boost   | Medium    | +25-50% experience gain             | Rare+       |

## Resources

Resources are used for crafting, trading, and quests.

### Material Resources

| Category    | Examples                         | Primary Uses                   |
|-------------|----------------------------------|--------------------------------|
| Metals      | Iron, Steel, Silver, Gold        | Weapons, armor, accessories    |
| Wood        | Oak, Pine, Maple, Exotic         | Weapons, tools, structures     |
| Cloth       | Cotton, Silk, Wool, Leather      | Armor, clothing, accessories   |
| Stone       | Granite, Marble, Gems            | Crafting, jewelry, structures  |
| Plants      | Herbs, Flowers, Roots            | Potions, food, medicine        |

### Monster Parts (New)

| Category    | Examples                              | Primary Uses                       |
|-------------|---------------------------------------|-----------------------------------|
| Fangs/Claws | Wolf Fang, Bear Claw, Dragon Tooth   | Weapons, trophies, special potions |
| Hides/Pelts | Bear Hide, Wolf Pelt, Lizard Skin    | Armor, clothing, bags              |
| Bones       | Skeleton Bone, Monster Rib, Skull    | Weapons, armor reinforcement       |
| Organs      | Monster Heart, Dragon Liver, Eye     | Potions, magical items, rituals    |
| Essences    | Slime Core, Ghost Essence, Dragon Blood | Magic items, enchantments, potions |
| Venom/Toxin | Spider Venom, Scorpion Toxin         | Poisons, antidotes, special weapons |

### Resource Rarity Guidelines

| Tier      | Acquisition                       | Value    | Crafting Power                   |
|-----------|----------------------------------|----------|----------------------------------|
| Common    | Widely available                 | Low      | Basic crafting, common items     |
| Uncommon  | Specific locations/monsters      | Medium   | Better items, some specialties   |
| Rare      | Difficult areas, rare monsters   | High     | Specialty items, rare equipment  |
| Epic      | Very specific sources, bosses    | Very High| Powerful equipment, unique items |
| Legendary | Unique sources, major bosses     | Extreme  | Best possible items, unique effects |

## Item Cost Guidelines

| Tier      | Base Cost (Gold) | Deviation % | Notes                             |
|-----------|------------------|-------------|-----------------------------------|
| Common    | 0.1-1            | ±20%        | Widely available                  |
| Uncommon  | 1-10             | ±15%        | Moderately available              |
| Rare      | 10-100           | ±10%        | Limited availability              |
| Epic      | 100-1000         | ±5%         | Very rare, specialized merchants  |
| Legendary | 1000+            | ±2%         | Extremely rare, special merchants |

## Weight Guidelines

| Category     | Light    | Medium     | Heavy      | Notes                        |
|--------------|----------|------------|------------|------------------------------|
| Weapons      | <1000g   | 1000-3000g | >3000g     | Affects speed, requirements |
| Armor        | <2000g   | 2000-5000g | >5000g     | Affects mobility, stamina   |
| Resources    | <100g    | 100-500g   | >500g      | Affects carrying capacity   |
| Consumables  | <100g    | 100-300g   | >300g      | Affects inventory space     | 