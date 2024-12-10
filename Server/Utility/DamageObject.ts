import { CharacterStatus } from '../Entities/Character/Subclasses/CharacterStatus';
import { CharacterStatusModifier } from '../Entities/Character/Subclasses/CharacterStatusModifier';
import { CharacterStatusEnum } from './Enum/CharacterStatusTypes';
import { StatMod } from './StatMod';

export class DamageObject {
    isDamageOrHeal: 'damage' | 'heal';
    actionType: 'cast' | 'use' | 'attack' | 'chant' | 'strike' | 'throw' ;
    preferredPosition: 'front' | 'back' | 'any';
    preferredTargetPosition: 'front' | 'back' | 'any';
    damageType: 'slash' | 'pierce' | 'blunt' | 'order' | 'chaos' | 'geo' | 'water' | 'air' | 'fire' | 'ice' | 'spirit' | 'lightning' | 'demonic' | 'metal' | 'angelic' | 'human' | 'life' | 'dark' | 'ghost' | 'poison' | 'holy' | 'arcane' | 'resource' | 'chiWarm' | 'chiCold' | 'chiHarmony';
	baseDamage: string
    damageModifiers: DamageModifier[];
    additionalDamage: number;
    damageMultiplier: number;
    damagePenalty: number;
    hitStatModifier: CharacterStatusModifier[];
	hitBonus: number;
    hitPenalty: number;
	constructor(
        isDamageOrHeal: 'damage' | 'heal',
        actionType: 'cast' | 'use' | 'attack' | 'chant' | 'strike' | 'throw',
        preferredPosition: 'front' | 'back' | 'any',
		preferredTargetPosition: 'front' | 'back' | 'any',
        damageType: 'slash' | 'pierce' | 'blunt' | 'order' | 'chaos' | 'geo' | 'water' | 'air' | 'fire' | 'ice' | 'spirit' | 'lightning' | 'demonic' | 'metal' | 'angelic' | 'human' | 'life' | 'dark' | 'ghost' | 'poison' | 'holy' | 'arcane' | 'resource' | 'chiWarm' | 'chiCold' | 'chiHarmony',
        baseDamage: string,
        damageModifiers: DamageModifier[],
        additionalDamage: number,
        damageMultiplier: number,
        damagePenalty: number,
        hitStatModifier: CharacterStatusModifier[],
        hitBonus: number,
        hitPenalty: number
	) {
        this.isDamageOrHeal = isDamageOrHeal;
        this.actionType = actionType;
        this.preferredPosition = preferredPosition;
		this.preferredTargetPosition = preferredTargetPosition;
        this.damageType = damageType;
		this.baseDamage = baseDamage;
		this.damageModifiers = damageModifiers;
        this.additionalDamage = additionalDamage;
        this.damageMultiplier = damageMultiplier;
        this.damagePenalty = damagePenalty;
		this.hitStatModifier = hitStatModifier;
		this.hitBonus = hitBonus;
		this.hitPenalty = hitPenalty;
    }
}

export class DamageModifier {
	key: Exclude<CharacterStatusEnum, CharacterStatusEnum.none>;
    percentage: number;
	constructor(
		key: Exclude<CharacterStatusEnum, CharacterStatusEnum.none>, 
		percentage: number
	) {
		this.key = key;
		this.percentage = percentage;
	}

	value(status: CharacterStatus): number {
        return StatMod.value(status[this.key]());
	}
}

