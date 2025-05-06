# Battle System Execution Flow

## Initialization Phase

1. **Battle Creation**
   ```typescript
   new Battle(partyA, partyB, location, gameTime, battleType)
   ```
   - Parties A and B are established
   - All participants from both parties are collected into `allParticipants` array
   - Battle report is initialized to track all actions
   - Participants are sorted by speed (agility + dice roll)

2. **Battle Start**
   ```typescript
   startBattle() → battleLoop()
   ```
   - Main battle loop begins
   - Turn limit set to 100 rounds maximum

## Turn Execution Phase

### 1. Action Bar Processing
```typescript
for (const actor of this.allParticipants) {
  this.updateabGauge(actor);
  if (actor.abGauge >= 100) { /* actor's turn */ }
}
```

- Each participant's action bar (abGauge) is updated
- Base increment = max(agility, 10)
- Modifiers applied: haste(×2ⁿ), slow(÷2ⁿ), timeWarp(+25n)
- When abGauge reaches 100, character can act

### 2. Character Turn Resolution
```typescript
// Set abGauge to 0
// Check buffs/debuffs
// If able to act → startActorTurn()
```

1. **Buff/Debuff Processing**
   - Status effects (stun, sleep, etc.) may prevent turn
   - Ongoing effects apply their modifiers

2. **Resource Replenishment**
   ```typescript
   actor.replenishResources();
   ```
   - HP/MP/SP recovery based on attributes
   - Elements decay (-1 per turn)

3. **Passive Skill Activation**
   ```typescript
   this.activePassiveSkillEffect(actor);
   ```
   - Passive skills trigger their effects

### 3. Skill Selection & Execution

1. **Skill Determination**
   ```typescript
   getSkillThatCanBePlayForActor(actor, skillPosition)
   ```
   - Checks actor's active skills
   - Verifies playability (sufficient resources, no cooldown)
   - Falls back to default attack if no skills available

2. **Resource Consumption**
   ```typescript
   actorRemoveResource(actor, skill, level)
   ```
   - Deducts HP/MP/SP costs
   - Consumes elemental resources

3. **Skill Execution**
   ```typescript
   skill.executor(actor, selfGroup, oppositeGroup, skillLevel, context)
   ```
   - Selects targets according to skill's targeting rules
   - Calculates hit chance and critical
   - Determines damage
   - Applies position modifiers
   - Handles skill-specific effects

4. **Resource Generation**
   ```typescript
   actorAddResource(actor, skill, level)
   ```
   - Produces elemental resources
   - Amount based on skill level and random range

5. **Report Update**
   ```typescript
   battleReport.addTurn(result)
   ```
   - Records action in battle log

### 4. Battle Status Check
```typescript
checkBattleEnd()
```
- Checks if all characters in either party are defeated
- Determines winner, loser, or draw
- If battle continues, loop repeats

## Battle Resolution Phase

1. **End Processing**
   ```typescript
   handleBattleEnd(battleStatus)
   ```
   - Clears all temporary battle effects
   - Processes battle rewards based on battle type

2. **Experience & Training**
   ```typescript
   battleEndedCalc(battleStatus, winnerParty, defeatedParty)
   ```
   - Calculates XP based on relative party strength
   - Trains random attributes for all participants
   - Winners get full XP, losers get half

3. **Health Reset (if configured)**
   - Option to restore all characters to full health
   - Option to prevent permanent death

4. **Report Generation**
   ```typescript
   makeReportInterface(battleReport)
   ```
   - Creates structured battle summary
   - Delivers report via screamer event system

## Battle Mechanics Deep Dive

### Damage Calculation Flow

1. **Base Damage Determination**
   ```typescript
   // Example from a fighter skill:
   let damage = Dice.roll(dice).sum * (1 + skillLevel / 10) + 
     StatMod.value(character.status.strength());
   ```
   - Weapon dice roll (e.g., 1d8 for longsword)
   - Multiply by skill level modifier
   - Add attribute modifier from StatMod table

2. **Critical Hit Processing**
   ```typescript
   if (crit) damage *= 2;
   ```
   - Critical hits double damage
   - Critical chance based on luck and weapon

3. **Position Adjustment**
   ```typescript
   damage *= damageModifierFromPosition;
   ```
   - Front vs Front: 100%
   - Front vs Back: 75%
   - Back vs Front: 120%
   - Back vs Back: 100%

4. **Final Damage Application**
   ```typescript
   target.receiveDamage({
     attacker: character,
     damage,
     hitChance,
     damageType,
     locationName: context.location,
   });
   ```
   - Target's defense is subtracted
   - Hit chance determines if attack lands
   - Elemental/damage-type modifiers applied
   - Final damage deducted from target's HP

### Resource System

1. **Basic Resources (HP/MP/SP)**
   - Consumed by skills at fixed rates
   - Naturally regenerate each turn

2. **Elemental Resources**
   - Generated only by specific skills
   - Consumed by powerful elemental abilities
   - Decay by 1 each turn
   - Tied to elements: order, chaos, geo, water, air, fire

### Initiative System

1. **Turn Start**
   - Initial turn order based on agility + dice roll

2. **Action Bar**
   - Characters with higher agility act more frequently
   - Status effects like haste/slow modify action speed
   - System allows for dynamic turn order rather than fixed rounds 