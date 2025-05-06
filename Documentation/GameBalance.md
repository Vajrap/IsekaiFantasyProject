# Game Balance Document

## Character Base Stats (Level 1)

### Player Character Classes
| Class    | Key Stats | HP  | MP  | SP  | Main Attributes (Base) | Secondary Attributes |
|----------|-----------|-----|-----|-----|------------------------|----------------------|
| Fighter  | STR/END   | 12  | 6   | 10  | STR: 12, END: 12, DEX: 10 | AGI: 10, pATK: +2 |
| Rogue    | DEX/AGI   | 8   | 6   | 12  | DEX: 12, AGI: 12, LUK: 10 | dodge: +2, pCRT: +1 |
| Mage     | INT/PLA   | 6   | 12  | 6   | INT: 12, PLA: 12, WIL: 10 | mATK: +2, MP regen: +1 |
| Cleric   | WIL/CHA   | 8   | 10  | 8   | WIL: 12, CHA: 12, PLA: 10 | order: +2, healing: +10% |
| Druid    | WIL/END   | 10  | 8   | 8   | WIL: 12, END: 12, INT: 10 | elements: +1, HP regen: +1 |
| Warlock  | INT/CHA   | 8   | 10  | 8   | INT: 12, CHA: 12, WIL: 10 | chaos: +2, SP regen: +1 |

*Note: Other attributes start at 8 unless specified*

### Monster Base Stats
| Tier     | HP Range | Damage/Turn | Key Stats | Defense |
|----------|----------|-------------|-----------|---------|
| Weak     | 6-8      | 2-4         | 8-10      | pDEF: 0-1, mDEF: 0-1 |
| Normal   | 8-12     | 3-6         | 10-12     | pDEF: 1-2, mDEF: 1-2 |
| Elite    | 12-16    | 4-8         | 12-14     | pDEF: 2-3, mDEF: 2-3 |
| Boss     | 20-30    | 6-12        | 14-16     | pDEF: 3-5, mDEF: 3-5 |

## Equipment Stats

### Weapons
| Type          | Base Dice | Attribute | Special | Scaling Factor |
|---------------|-----------|-----------|---------|----------------|
| Dagger        | 1d4      | DEX       | +1 crit chance | 0.8x damage, 1.2x speed |
| Short Sword   | 1d6      | STR/DEX   | Balanced | 1.0x all stats |
| Long Sword    | 1d8      | STR       | - | 1.1x damage, 0.9x speed |
| Great Sword   | 2d6      | STR       | 2H only | 1.2x damage, 0.8x speed |
| Bow          | 1d6      | DEX       | Ranged | 1.0x damage, back row only |
| Staff        | 1d6      | INT       | +1 MP regen | +10% spell effectiveness |
| Wand         | 1d4      | INT       | +1 spell power | +20% element generation |
| Shield       | -        | -         | +2 pDEF | -10% damage output |

### Armor
| Type          | pDEF | mDEF | Dodge Penalty | Special | Weight |
|---------------|------|------|---------------|---------|--------|
| Cloth         | 1    | 2    | 0            | +1 MP regen | Light |
| Light Leather | 2    | 1    | -1           | +1 dodge | Light |
| Studded      | 3    | 1    | -2           | - | Medium |
| Chain        | 4    | 0    | -3           | - | Medium |
| Plate        | 5    | 0    | -4           | Reduces crit damage | Heavy |

### Weapon Scaling By Tier
| Tier      | Damage Dice Upgrade | Attribute Bonus | Special Properties |
|-----------|---------------------|-----------------|-------------------|
| Common    | Base                | -              | -                |
| Uncommon  | +1 die size        | +1 to key stat  | Small bonus     |
| Rare      | +2 die sizes       | +1 to two stats | Notable bonus   |
| Epic      | +3 die sizes       | +2 to key stat  | Powerful effect |
| Legendary | +4 die sizes       | +2 to multiple  | Unique ability  |

## Skill Damage Guidelines

### Physical Skills
| Level | MP/SP Cost | Base Damage Formula | Cooldown | Target |
|-------|------------|---------------------|----------|--------|
| Basic | 2 SP       | weapon + (0.5×lvl) + STR mod | 0-1 | Single |
| Advanced | 4 SP    | weapon + (1.0×lvl) + STR mod | 2-3 | Single/AoE |
| Ultimate | 6 SP    | weapon × 1.5 + (1.5×lvl) + STR mod | 4-5 | AoE |

### Magical Skills
| Level | MP Cost | Base Damage Formula | Cooldown | Element Generation |
|-------|---------|---------------------|----------|-------------------|
| Basic | 3 MP    | 1d6 + (1.0×lvl) + INT mod | 0-1 | 1 |
| Advanced | 5 MP  | 2d6 + (1.5×lvl) + INT mod | 2-3 | 1-2 |
| Ultimate | 8 MP  | 3d6 + (2.0×lvl) + INT mod | 4-5 | 2-3 |

### Healing/Support Skills
| Level | Cost | Healing Formula | Duration | Additional Effects |
|-------|------|-----------------|----------|-------------------|
| Basic | 2 MP | 1d6 + WIL mod + (1.0×lvl) | 1-2 | Single target |
| Advanced | 4 MP | 2d6 + WIL mod + (1.5×lvl) | 2-3 | Group or +status effect |
| Ultimate | 6 MP | 3d6 + WIL mod + (2.0×lvl) | 3-4 | AoE or major buff |

## Resource Consumption & Generation Balance

### Combat Resource Economy
| Resource | Generation Rate | Consumption Rate | Cap |
|----------|-----------------|------------------|-----|
| HP | +1-2/turn (regen) | Damage taken | Max HP |
| MP | +1d3/turn | 2-8 per skill | Max MP |
| SP | +1d3/turn | 2-6 per skill | Max SP |
| Elements | +1-3 via skills | -1/turn decay, skill costs | 10 |

### Elemental Resources Usage (Per Skill Level)
| Element | Basic Skill Cost | Advanced Skill Cost | Ultimate Skill Cost |
|---------|------------------|---------------------|---------------------|
| Order   | 1-2              | 2-3                 | 3-5                 |
| Chaos   | 1-2              | 2-3                 | 3-5                 |
| Geo     | 1-2              | 2-3                 | 3-5                 |
| Water   | 1-2              | 2-3                 | 3-5                 |
| Air     | 1-2              | 2-3                 | 3-5                 |
| Fire    | 1-2              | 2-3                 | 3-5                 |

## Combat Formulas

### Damage Calculation
```
Physical Damage = (Weapon Dice + Attribute Mod + Skill Bonus) * Position Modifier * Skill Multiplier - Target pDEF
Magical Damage = (Spell Base + INT Mod + Skill Bonus) * Position Modifier * Skill Multiplier - Target mDEF
Critical Hit = Damage * 2
```

### Hit Chance
```
Physical Hit = 10 + Attacker DEX Mod + Weapon Bonus - Target Dodge
Spell Hit = 10 + Attacker INT Mod + Spell Bonus - Target Dodge
```

## Level Up Guidelines

### Per Level
- HP: +2-4 (based on class)
- MP: +1-3 (based on class)
- SP: +1-3 (based on class)
- Main Stats: Chance for +1 on d20 roll
- Skills: +1 damage per level for damage skills

## Enemy Party Composition Guidelines

### 4-Member Party Example
| Position | Role | HP % | Damage % | Special |
|----------|------|------|----------|---------|
| Front (2)| Tank/Melee | 100-120% | 80-100% | Taunt/debuff abilities |
| Back (2) | Range/Support | 80% | 100-120% | AoE/healing abilities |

### 6-Member Party Example
| Position | Role | HP % | Damage % | Special |
|----------|------|------|----------|---------|
| Front (3)| Tank/Melee | 100-120% | 80-100% | Mix of single/AoE attacks |
| Back (3) | Range/Support | 80% | 100-120% | Mix of support/damage |

## Turn Balance Guidelines

### Average Damage Output
| Level | Player vs Normal | Player vs Elite | Player vs Boss |
|-------|-----------------|-----------------|----------------|
| 1-5   | 3-6 per hit     | 2-4 per hit     | 1-3 per hit    |
| 6-10  | 6-10 per hit    | 4-8 per hit     | 3-6 per hit    |
| 11-15 | 10-16 per hit   | 8-12 per hit    | 6-10 per hit   |

### Resource Usage Per Battle
| Level | MP Usage | SP Usage | Element Generation |
|-------|----------|----------|-------------------|
| 1-5   | 40-60%   | 40-60%   | 4-8 per battle    |
| 6-10  | 60-80%   | 60-80%   | 8-12 per battle   |
| 11-15 | 70-90%   | 70-90%   | 12-20 per battle  |

## Optimized Damage Range Examples

### Level 1 Examples
| Class/Build | Weapon | Skill | Average Damage | Notes |
|-------------|--------|-------|----------------|-------|
| Warrior/STR | 1d8 sword | Basic attack | 4.5 + 1 = 5.5 | Consistent damage |
| Rogue/DEX | 1d4 dagger | Precision strike | 2.5 + 1 + 1 = 4.5 | Higher crit chance |
| Mage/INT | 1d4 wand | Fire bolt | 3.5 + 1 + 1 = 5.5 | Elemental damage |

### Level 5 Examples
| Class/Build | Weapon | Skill | Average Damage | Notes |
|-------------|--------|-------|----------------|-------|
| Warrior/STR | 1d8 sword | Power Strike (5) | 4.5 + 2 + 2.5 = 9 | High single target |
| Rogue/DEX | 1d6 bow | Multi-shot (5) | 3.5 + 2 + 2.5 = 8 × 2 targets | AoE advantage |
| Mage/INT | 1d4 staff | Fireball (5) | 7 + 2 + 5 = 14 | High damage, resource intensive | 