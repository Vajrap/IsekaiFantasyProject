# Monster Design Document

## Monster Classification System

### Threat Tiers
| Tier     | HP Range | Damage/Turn | Key Stats | Defense | XP Value |
|----------|----------|-------------|-----------|---------|----------|
| Weak     | 6-8      | 2-4         | 8-10      | pDEF: 0-1, mDEF: 0-1 | 10-25 |
| Normal   | 8-12     | 3-6         | 10-12     | pDEF: 1-2, mDEF: 1-2 | 25-50 |
| Elite    | 12-16    | 4-8         | 12-14     | pDEF: 2-3, mDEF: 2-3 | 50-100 |
| Boss     | 20-30    | 6-12        | 14-16     | pDEF: 3-5, mDEF: 3-5 | 100-250 |

### Common Monster Attributes
- **Level**: Determines base stats and scaling
- **Behavior**: Aggressive, Territorial, Passive, Ambusher, etc.
- **Movement**: Terrestrial, Aerial, Aquatic, Burrowing, etc.
- **Attack Type**: Physical, Magical, Ranged, AoE, etc.
- **Resistances/Weaknesses**: Elements, damage types, status effects
- **Skills**: Special abilities the monster can use
- **Drop Table**: Resources, equipment, gold, etc.

## Natural Beasts

### Wolf
- **Tier**: Weak-Normal
- **Level Range**: 1-5
- **Description**: Quick pack hunters that coordinate attacks
- **Key Stats**: DEX: 12, STR: 10, AGI: 12
- **Skills**: 
  - Bite (1d4 + STR)
  - Howl (Calls 1d3 additional wolves)
  - Pack Tactics (+1 attack for each adjacent wolf)
- **Behavior**: Pack hunter, flanks targets
- **Location**: Forests, plains
- **Drops**: 
  - Wolf Pelt (Common, 20-30 copper)
  - Wolf Fang (Uncommon, 60-80 copper)
  - Wolf Meat (Common, 30-40 copper)

### Bear
- **Tier**: Normal-Elite
- **Level Range**: 4-8
- **Description**: Powerful territorial predator
- **Key Stats**: STR: 14, END: 13, HP: +50%
- **Skills**: 
  - Claw Swipe (1d6 + STR)
  - Maul (2d6 + STR, 2-turn cooldown)
  - Intimidating Roar (forces Weak enemies to flee)
- **Behavior**: Territorial, protective of cubs
- **Location**: Forests, mountains
- **Drops**: 
  - Bear Pelt (Common, 80-100 copper)
  - Bear Meat (Common, 140 copper)
  - Bear Claw (Uncommon, 100-120 copper)

### Giant Spider
- **Tier**: Normal
- **Level Range**: 2-6
- **Description**: Venomous ambush predator
- **Key Stats**: DEX: 12, AGI: 10, INT: 8
- **Skills**: 
  - Bite (1d4 + DEX, 20% poison chance)
  - Web Shot (immobilizes target for 1d2 turns)
  - Venom Spray (AoE, 1d4 poison damage)
- **Behavior**: Ambusher, sets traps
- **Location**: Forests, caves, ruins
- **Drops**: 
  - Spider Silk (Uncommon, 100 copper)
  - Venom Sac (Rare, 200-300 copper)
  - Spider Leg (Common, 40-60 copper)

### Wild Boar
- **Tier**: Normal
- **Level Range**: 3-5
- **Description**: Aggressive territorial animal with sharp tusks
- **Key Stats**: STR: 12, END: 12, AGI: 8
- **Skills**: 
  - Gore (1d6 + STR)
  - Charge (1d8 + STR, requires straight-line movement)
  - Ground Rut (creates difficult terrain)
- **Behavior**: Territorial, charges when threatened
- **Location**: Forests, plains
- **Drops**: 
  - Boar Meat (Common, 60-80 copper)
  - Boar Tusk (Uncommon, 80-100 copper)
  - Boar Hide (Common, 50-70 copper)

## Humanoid Enemies

### Goblin
- **Tier**: Weak
- **Level Range**: 1-3
- **Description**: Small, green-skinned humanoids that favor crude weapons
- **Key Stats**: DEX: 11, AGI: 11, INT: 8
- **Skills**: 
  - Club Strike (1d4 + DEX)
  - Scavenge (10% chance to use a random consumable item)
  - Flee (50% chance to escape combat)
- **Behavior**: Cowardly, prefers group attacks
- **Location**: Caves, forests, makeshift camps
- **Drops**: 
  - Goblin Ear (Common, 60 copper)
  - Crude Weapon (Common, 30-50 copper)
  - Small Pouch (10-30 copper coins)

### Bandit
- **Tier**: Normal
- **Level Range**: 2-6
- **Description**: Outlaw humans that prey on travelers
- **Key Stats**: DEX: 12, STR: 11, CHA: 10
- **Skills**: 
  - Dagger Strike (1d4 + DEX)
  - Bow Shot (1d6 + DEX, range)
  - Dirty Trick (stuns target for 1 turn)
- **Behavior**: Ambushers, value self-preservation
- **Location**: Roads, wilderness, hideouts
- **Drops**: 
  - Leather Armor Piece (Common, 60-80 copper)
  - Weapon (Common-Uncommon, 50-150 copper)
  - Gold Pouch (30-80 copper coins)

### Cultist
- **Tier**: Normal
- **Level Range**: 4-8
- **Description**: Fanatical worshippers of dark gods
- **Key Stats**: INT: 12, WIL: 12, CHA: 10
- **Skills**: 
  - Sacrificial Dagger (1d4 + INT)
  - Dark Incantation (1d6 chaos damage)
  - Blood Offering (sacrifices HP to increase damage)
- **Behavior**: Suicidally brave, works in coordinated groups
- **Location**: Hidden temples, ruins, caves
- **Drops**: 
  - Occult Symbol (Uncommon, 100-150 copper)
  - Ritual Component (Uncommon, 80-120 copper)
  - Spell Scroll (Rare, 200-300 copper)

### Orc Warrior
- **Tier**: Normal-Elite
- **Level Range**: 5-10
- **Description**: Brutish green-skinned humanoids with martial culture
- **Key Stats**: STR: 14, END: 12, WIL: 10
- **Skills**: 
  - Cleave (1d8 + STR)
  - Savage Strike (1d6 + STR, ignores 1 pDEF)
  - War Cry (+1 to all allies' STR for 2 turns)
- **Behavior**: Aggressive, fights to the death
- **Location**: Tribal camps, mountains, wastelands
- **Drops**: 
  - Orcish Weapon (Common, 100-150 copper)
  - Orc Armor Fragment (Common, 80-120 copper)
  - War Trophy (Uncommon, 150-200 copper)

### Skeletal Warrior
- **Tier**: Normal
- **Level Range**: 3-7
- **Description**: Animated skeleton with ancient weapons
- **Key Stats**: STR: 11, DEX: 10, no vital points
- **Skills**: 
  - Bone Strike (1d6 + STR)
  - Reassemble (recovers 1d4 HP, 3-turn cooldown)
  - Fear Aura (WIL save or -1 to all actions)
- **Behavior**: Mindlessly follows orders, fearless
- **Location**: Crypts, ruins, battlefields
- **Drops**: 
  - Bone Fragment (Common, 30-50 copper)
  - Ancient Weapon (Uncommon, 100-150 copper)
  - Soul Essence (Rare, 200-300 copper)

## Magical Creatures

### Slime
- **Tier**: Weak-Normal
- **Level Range**: 1-4
- **Description**: Amorphous gelatinous creature
- **Key Stats**: END: 12, resistant to physical, weak to fire
- **Skills**: 
  - Engulf (1d4 acid damage)
  - Split (at 50% HP, creates two weaker slimes)
  - Dissolve (1d4 damage to equipment)
- **Behavior**: Mindlessly hunts food
- **Location**: Caves, sewers, damp places
- **Drops**: 
  - Slime Jelly (Common, 140 copper)
  - Slime Core (Uncommon, 160 copper)

### Fire Elemental
- **Tier**: Elite
- **Level Range**: 6-10
- **Description**: Living embodiment of flames
- **Key Stats**: INT: 12, WIL: 12, immune to fire, weak to water
- **Skills**: 
  - Flame Lash (1d6 fire damage)
  - Fireball (2d6 fire damage, AoE, 2-turn cooldown)
  - Heat Aura (1d3 fire damage to all adjacent each turn)
- **Behavior**: Erratic, drawn to combustible materials
- **Location**: Volcanoes, forges, sites of great fires
- **Drops**: 
  - Fire Slime Essence (Rare, 600 copper)
  - Ember Core (Rare, 500-700 copper)
  - Fire Crystal (Epic, 1200-1500 copper)

### Imp
- **Tier**: Weak-Normal
- **Level Range**: 2-5
- **Description**: Small mischievous demon
- **Key Stats**: INT: 12, AGI: 14, CHA: 10
- **Skills**: 
  - Firebolt (1d4 fire damage)
  - Vanish (becomes invisible for 1d2 turns)
  - Trick (forces target to drop item)
- **Behavior**: Trickster, prefers pranks to direct combat
- **Location**: Anywhere chaotic, abandoned places
- **Drops**: 
  - Imp Horn (Uncommon, 100-150 copper)
  - Minor Fire Essence (Uncommon, 120-180 copper)
  - Chaos Fragment (Rare, 200-300 copper)

### Giant Slime
- **Tier**: Elite
- **Level Range**: 8-12
- **Description**: Massive slime with semi-intelligence
- **Key Stats**: END: 14, STR: 12, resistant to physical/magical
- **Skills**: 
  - Slam (2d6 + STR)
  - Acid Spray (2d4 acid damage, AoE)
  - Absorb (heals by engulfing smaller creatures)
- **Behavior**: Territorial, absorbs anything in its path
- **Location**: Deep caves, magical wastelands
- **Drops**: 
  - Giant Slime Core (Rare, 500 copper)
  - Caustic Essence (Rare, 400-600 copper)
  - Slime Residue (Common, 100-150 copper)

## Mythical Beasts

### Griffin
- **Tier**: Elite
- **Level Range**: 7-12
- **Description**: Majestic creature with eagle head and lion body
- **Key Stats**: STR: 13, DEX: 14, AGI: 13
- **Skills**: 
  - Talon Strike (1d8 + DEX)
  - Dive Attack (2d6 + STR, requires aerial positioning)
  - Wing Gust (knocks back all targets, 2-turn cooldown)
- **Behavior**: Territorial, protects nesting grounds
- **Location**: Mountains, high cliffs
- **Drops**: 
  - Griffin Feather (Rare, 300-400 copper)
  - Griffin Talon (Rare, 250-350 copper)
  - Griffin Hide (Epic, 1000-1200 copper)

### Wyvern
- **Tier**: Elite-Boss
- **Level Range**: 10-15
- **Description**: Dragon-like reptile with poisonous tail
- **Key Stats**: STR: 14, AGI: 12, resistant to poison
- **Skills**: 
  - Bite (1d8 + STR)
  - Tail Sting (1d6 + poison effect)
  - Wing Buffet (AoE, knocks targets prone)
- **Behavior**: Highly territorial, hunts large prey
- **Location**: Mountains, badlands
- **Drops**: 
  - Wyvern Scale (Rare, 400-600 copper)
  - Wyvern Venom Sac (Rare, 500-700 copper)
  - Wyvern Wing Membrane (Epic, 1200-1500 copper)

### Dragon (Young)
- **Tier**: Boss
- **Level Range**: 15-20
- **Description**: Young but powerful draconic creature
- **Key Stats**: STR: 16, INT: 14, END: 15, resistant to element
- **Skills**: 
  - Claw (2d6 + STR)
  - Bite (2d8 + STR)
  - Breath Weapon (3d6 elemental damage, AoE, 3-turn cooldown)
  - Dragon Fear (WIL save or -2 to all actions)
- **Behavior**: Arrogant, intelligent, values treasures
- **Location**: Mountain lairs, ruins, specially prepared dragon dens
- **Drops**: 
  - Dragon Scale (Legendary, 1600 copper)
  - Dragon Hide (Legendary, 2000 copper)
  - Dragon Fang (Epic, 1000-1500 copper)
  - Dragon Blood (Legendary, 2800 copper)
  - Dragon Meat (Legendary, 3000 copper)

### Cerberus
- **Tier**: Boss
- **Level Range**: 12-18
- **Description**: Three-headed hellhound with fiery breath
- **Key Stats**: STR: 15, END: 14, resistant to fire
- **Skills**: 
  - Triple Bite (3 × 1d6 + STR)
  - Hellfire Breath (2d8 fire damage, AoE)
  - Howl of Terror (WIL save or flee for 1d3 turns)
- **Behavior**: Guardian, never abandons post
- **Location**: Caverns, volcanic areas, entrances to dangerous places
- **Drops**: 
  - Hellhound Fang (Epic, 800-1000 copper)
  - Ember Core (Epic, 1200-1500 copper)
  - Infernal Hide (Legendary, 2000-2500 copper)

## Undead and Spirits

### Zombie
- **Tier**: Weak
- **Level Range**: 1-4
- **Description**: Reanimated corpse with basic instincts
- **Key Stats**: STR: 11, END: 10, immune to poison/mind effects
- **Skills**: 
  - Slam (1d4 + STR)
  - Bite (1d4 + disease chance)
  - Lurch (move and attack in one action, 2-turn cooldown)
- **Behavior**: Mindless, seeks living flesh
- **Location**: Graveyards, battlefields, sites of plague
- **Drops**: 
  - Rotting Flesh (Common, 20-40 copper)
  - Tattered Clothing (Common, 10-30 copper)
  - Zombie Tooth (Uncommon, 50-70 copper)

### Ghost
- **Tier**: Normal
- **Level Range**: 3-8
- **Description**: Incorporeal spirit of the deceased
- **Key Stats**: WIL: 12, CHA: 10, incorporeal (resistant to physical)
- **Skills**: 
  - Spectral Touch (1d6 cold damage, ignores armor)
  - Terrifying Visage (WIL save or frightened for 1d3 turns)
  - Possession (attempts to control target, WIL save to resist)
- **Behavior**: Haunting, often tied to specific location
- **Location**: Ruins, graveyards, sites of tragedy
- **Drops**: 
  - Ectoplasm (Rare, 200-300 copper)
  - Spirit Essence (Rare, 250-350 copper)
  - Haunted Trinket (Uncommon, 100-150 copper)

### Wraith
- **Tier**: Elite
- **Level Range**: 8-12
- **Description**: Powerful malevolent spirit
- **Key Stats**: WIL: 14, INT: 12, incorporeal, drains life
- **Skills**: 
  - Life Drain (1d8 damage, heals wraith)
  - Shadow Step (teleport up to 3 tiles)
  - Soul Rend (2d6 chaos damage, ignores mDEF)
- **Behavior**: Calculating, hateful of living
- **Location**: Ancient tombs, cursed lands
- **Drops**: 
  - Shadow Essence (Epic, 700-900 copper)
  - Soul Fragment (Epic, 800-1000 copper)
  - Wraith Shroud (Rare, 400-500 copper)

### Lich
- **Tier**: Boss
- **Level Range**: 15-20
- **Description**: Undead sorcerer who achieved immortality
- **Key Stats**: INT: 16, WIL: 15, CHA: 13
- **Skills**: 
  - Soul Bolt (2d6 + INT chaos damage)
  - Curse (target suffers -2 to all stats)
  - Necrotic Wave (2d8 AoE damage, summons 1d4 skeletons)
  - Phylactery (auto-revives after 3 turns unless phylactery destroyed)
- **Behavior**: Highly intelligent, strategic, values arcane knowledge
- **Location**: Ancient crypts, towers, necromantic laboratories
- **Drops**: 
  - Phylactery (Legendary, 3000-5000 copper)
  - Necromantic Tome (Epic, 1000-1500 copper)
  - Lich Dust (Rare, 500-700 copper)
  - Ancient Artifacts (Epic-Legendary, 1000-3000 copper)

## Eldritch/Otherworldly Beings

### Mind Flayer
- **Tier**: Elite-Boss
- **Level Range**: 12-16
- **Description**: Tentacle-faced humanoid with psychic powers
- **Key Stats**: INT: 16, WIL: 15, PLA: 14
- **Skills**: 
  - Mind Blast (2d6 psychic damage, AoE)
  - Tentacle Strike (1d4 × 4 damage)
  - Mind Control (takes control of target for 1d3 turns)
  - Extract Brain (instant kill on stunned targets)
- **Behavior**: Calculating, views other beings as cattle
- **Location**: Deep underground, alien structures
- **Drops**: 
  - Elder Brain Fragment (Epic, 1200-1500 copper)
  - Psychic Crystal (Epic, 1000-1300 copper)
  - Strange Artifact (Rare, 400-600 copper)

### Void Horror
- **Tier**: Boss
- **Level Range**: 14-20
- **Description**: Indescribable mass of tentacles, eyes, and mouths
- **Key Stats**: STR: 15, END: 14, WIL: 15, resistant to magic
- **Skills**: 
  - Tentacle Barrage (3d6 damage, hits random targets)
  - Reality Warp (teleports all creatures to random positions)
  - Maddening Gaze (WIL save or confused for 1d4 turns)
  - Consume (swallows target whole, dealing damage each turn)
- **Behavior**: Alien, incomprehensible motivations
- **Location**: Dimensional rifts, corrupted magical sites
- **Drops**: 
  - Void Essence (Legendary, 2500-3500 copper)
  - Reality Shard (Epic, 1500-2000 copper)
  - Alien Tissue (Rare, 500-800 copper)

## Regional Monster Distribution

### Forests
- Wolf (Common)
- Bear (Common)
- Wild Boar (Common) 
- Goblin (Common)
- Slime (Uncommon)
- Imp (Rare)
- Giant Spider (Uncommon)

### Mountains
- Wolf (Uncommon)
- Bear (Common)
- Griffin (Rare)
- Wyvern (Rare)
- Orc Warrior (Common)
- Dragon (Very Rare)

### Caves and Underground
- Giant Spider (Common)
- Slime (Common)
- Giant Slime (Rare)
- Goblin (Common)
- Skeletal Warrior (Uncommon)
- Mind Flayer (Very Rare)

### Ruins and Abandoned Structures
- Skeletal Warrior (Common)
- Ghost (Common)
- Zombie (Common)
- Cultist (Uncommon)
- Wraith (Rare)
- Lich (Very Rare)

### Magical Wastelands
- Fire Elemental (Common)
- Imp (Common)
- Void Horror (Rare)
- Giant Slime (Uncommon)
- Mutated Creatures (Common)

## Monster Party Compositions

### Forest Ambush (Level 1-5)
- 2-3 Wolves (Weak)
- 1 Goblin Archer (Weak)

### Goblin Raiding Party (Level 3-7)
- 3-4 Goblins (Weak)
- 1-2 Goblin Shamans (Normal)
- 1 Goblin Chief (Elite)

### Undead Horde (Level 5-10)
- 4-6 Zombies (Weak)
- 2-3 Skeletal Warriors (Normal)
- 1 Ghost (Normal)

### Cultist Ritual (Level 8-12)
- 3-4 Cultists (Normal)
- 1-2 Cultist Sorcerers (Elite)
- 1 Summoned Demon (Elite)

### Dragon's Lair (Level 15-20)
- 2-3 Dragon Wyrmlings (Elite)
- 1 Young Dragon (Boss)
- Various minions/thralls (Normal-Elite)

## Monster Scaling Guidelines

### Level Scaling Formula
- HP: Base + (Level × Tier Multiplier)
- Damage: Base + (Level × 0.5)
- Key Stats: Base + (Level × 0.3)

### Adding Abilities
- Every 3 levels: Add 1 new skill
- Every 5 levels: Upgrade 1 existing skill
- Level 10+: Add 1 passive ability

### Elite Versions
To create an elite version of a standard monster:
- Increase HP by 50%
- Add 1-2 special abilities
- Improve 1 key stat by +2
- Add a unique drop with 25% chance

## Monster Variants

### Elemental Variants
Add one elemental affinity (Fire, Water, Air, Earth, Light, Dark):
- +Resistance to that element
- +Weakness to opposing element
- Replace 1-2 attacks with elemental versions
- Add appropriate elemental drops

### Corrupted Variants
For monsters affected by chaos/void energy:
- Altered appearance (tentacles, extra eyes, etc.)
- Unpredictable behavior
- 1 random mutation ability
- Chance to drop Chaos Fragment

### Ancient Variants
For extremely old specimens:
- +25% HP and damage
- More strategic behavior
- Knowledge of ancient magic/techniques
- Drops ancient artifacts/knowledge 