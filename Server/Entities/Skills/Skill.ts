import { SkillConsume, SkillProduce } from "./SubClasses/SkillConsume";
import { SkillEquipmentRequirement } from "./SubClasses/SkillEquipmentRequirement";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { SkillActiveEffect } from "./SubClasses/SkillActiveEffect";
import { db } from "../../Database";
import { SkillArchetype } from "../../Database/Skill/skill";
import { CharacterStatus } from "../Character/Subclasses/CharacterStatus";
import { WeaponType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";

export class Skill {
    id: string;
    name: string;
    baseDescription: string;
    requirement: SkillLearningRequirement;
    equipmentNeeded: SkillEquipmentRequirement;
    activeEffect: SkillActiveEffect[];
    consume: SkillConsume;
    produce: SkillProduce;
    tier: Tier;
    isSpell: boolean;
    isAuto: boolean = false;
    isWeaponAttack: boolean = false;
    isReaction: boolean = false;
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
        isSpell: boolean,
        isAuto?: boolean,
        isWeaponAttack?: boolean,
        isReaction?: boolean
    ) {
        this.id = id;
        this.name = name;
        this.baseDescription = baseDescription;
        this.requirement = requirement;
        this.equipmentNeeded = equipmentNeeded;
        this.activeEffect = activeEffect;
        this.consume = consume;
        this.produce = produce;
        this.tier = tier;
        this.isSpell = isSpell;
        this.isAuto = isAuto || false;
        this.isWeaponAttack = isWeaponAttack || false;
        this.isReaction = isReaction || false;
    }

    validateSkillLearning(
        characterLevel: number,
        status: CharacterStatus,
        skills: string[],
        traits: string[]
    ): boolean {
        let isValid = true;

        // Check character level requirement
        if (this.requirement.preRequireCharacterLevel) {
            if (characterLevel < this.requirement.preRequireCharacterLevel) {
                isValid = false;
            }
        }

        // Check required skills
        if (this.requirement.preRequireSkillID) {
            if (!skills.some(skill => this.requirement.preRequireSkillID?.includes(skill))) {
                isValid = false;
            }
        }

        // Check required elements
        if (this.requirement.preRequireElements) {
            for (const elementRequired of this.requirement.preRequireElements) {
                if (status.elements[elementRequired.element as keyof CharacterStatus['elements']].base < elementRequired.value) {
                    isValid = false;
                }
            }
        }

        // Check required proficiencies
        if (this.requirement.preRequireProficiencies) {
            for (const proficiencyRequired of this.requirement.preRequireProficiencies) {
                if (status.proficiencies[proficiencyRequired.proficiency as keyof CharacterStatus['proficiencies']].base < proficiencyRequired.value) {
                    isValid = false;
                }
            }
        }

        // Check required attributes
        if (this.requirement.preRequireAttributes) {
            for (const attributeRequired of this.requirement.preRequireAttributes) {
                if (status.attributes[attributeRequired.attribute as keyof CharacterStatus['attributes']].base < attributeRequired.value) {
                    isValid = false;
                }
            }
        }

        // Check required artisans
        if (this.requirement.preRequireArtisans) {
            for (const artisanRequired of this.requirement.preRequireArtisans) {
                if (status.artisans[artisanRequired.artisan as keyof CharacterStatus['artisans']].base < artisanRequired.value) {
                    isValid = false;
                }
            }
        }

        // Check required traits
        if (this.requirement.preRequireCharacterTrait) {
            if (!traits.some(trait => this.requirement.preRequireCharacterTrait?.includes(trait))) {
                isValid = false;
            }
        }

        return isValid;
    }

    validateEquipment(equipments: {weapon: string[]}): boolean {
        if (this.equipmentNeeded.weapon?.length === 0 && this.equipmentNeeded.weapon !== undefined) { 
            return true; 
        }

        // Case where the skill requires bare hands; user must 'NOT' equip any weapon
        if (this.equipmentNeeded.weapon?.length === 1) {
            if (this.equipmentNeeded.weapon[0] === WeaponType.bare_hand) {
                if (equipments.weapon.length === 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        if (this.equipmentNeeded.weapon) {
            let weaponNeeded = this.equipmentNeeded.weapon
            if (equipments.weapon.length === 0) { return false };
            if (equipments.weapon.some((weapon) => weaponNeeded.includes(weapon))) {
                return true;
            } else {
                return false;
            }
        }
        return true
    }
}

export async function getSkillFromDB(skillID: string): Promise<Skill | null> {
    console.log(`Fetching skill with ID: ${skillID}`);

    const skillArchetype = await db.read('skills', 'id', skillID) as SkillArchetype;

    if (!skillArchetype) {
        console.error(`ATOM: Skill with ID ${skillID} not found in the database.`);
        return null;
    }

        // Parse stringified JSON fields into proper objects
        const requirement = typeof skillArchetype.requirement === 'string' ? JSON.parse(skillArchetype.requirement) : SkillLearningRequirement;
        const equipmentNeeded = typeof skillArchetype.equipmentNeeded === 'string' ? JSON.parse(skillArchetype.equipmentNeeded) : SkillEquipmentRequirement;
        const activeEffect = typeof skillArchetype.activeEffect === 'string' ? JSON.parse(skillArchetype.activeEffect) : skillArchetype.activeEffect.map((effect: any) => new SkillActiveEffect(effect.targetTypes, effect.skillActionObjects));
        const consume = typeof skillArchetype.consume === 'string' ? JSON.parse(skillArchetype.consume) : SkillConsume;
        const produce = typeof skillArchetype.produce === 'string' ? JSON.parse(skillArchetype.produce) : SkillProduce;
    
        // Create the Skill object with the parsed values
        const skill = new Skill(
            skillArchetype.id,
            skillArchetype.name,
            skillArchetype.baseDescription,
            requirement,          
            equipmentNeeded,      
            activeEffect,         
            consume,              
            produce,              
            skillArchetype.tier,
            skillArchetype.isSpell,
            false,
            skillArchetype.isWeaponAttack
        );

    return skill;
}

class Spell extends Skill {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier, true);
    }
}

class Martial extends Skill {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier, false);
    }
}

class AutoSpell extends Spell {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = true;
    }
}

class NonAutoSpell extends Spell {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = false;
    }
}

class AutoMartial extends Martial {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = true;
    }
}

class NonAutoMartial extends Martial {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = false;
    }
}

export class AutoMartialWeapon extends AutoMartial {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );
        this.isWeaponAttack = true;
    }
}

export class AutoMartialNonWeapon extends AutoMartial {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );
        this.isWeaponAttack = false;
    }
}

export class NonAutoMartialWeapon extends NonAutoMartial {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );
        this.isWeaponAttack = true;
    }
}

export class NonAutoMartialNonWeapon extends NonAutoMartial {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );
        this.isWeaponAttack = false;
    }
}

export class AutoSpellWeapon extends AutoSpell {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );        
        this.isWeaponAttack = true;
    }
}

export class AutoSpellNonWeapon extends AutoSpell {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );        
        this.isWeaponAttack = false;
    }
}

export class NonAutoSpellWeapon extends NonAutoSpell {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );        
        this.isWeaponAttack = true;
    }
}

export class NonAutoSpellNonWeapon extends NonAutoSpell {
    constructor(params: {
        id: string;
        name: string;
        baseDescription: string;
        requirement: SkillLearningRequirement;
        equipmentNeeded: SkillEquipmentRequirement;
        activeEffect: SkillActiveEffect[];
        consume: SkillConsume;
        produce: SkillProduce;
        tier: Tier;
    }) {
        super(
            params.id,
            params.name,
            params.baseDescription,
            params.requirement,
            params.equipmentNeeded,
            params.activeEffect,
            params.consume,
            params.produce,
            params.tier
        );        
        this.isWeaponAttack = false;
    }
}

export class SpellReaction extends Spell {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isReaction = true;
    }
}

export class MartialReaction extends Martial {
    constructor(
        id: string, 
        name: string, 
        baseDescription: string,
        requirement: SkillLearningRequirement, 
        equipmentNeeded: SkillEquipmentRequirement, 
        activeEffect: SkillActiveEffect[], 
        consume: SkillConsume, 
        produce: SkillProduce,
        tier: Tier,
    ) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isReaction = true;
    }
}