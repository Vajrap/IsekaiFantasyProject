import { SkillConsume, SkillProduce } from "./SubClasses/SkillConsume";
import { SkillEquipmentRequirement } from "./SubClasses/SkillEquipmentRequirement";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Tier } from "../../Utility/Tier";
import { SkillActiveEffect } from "./SubClasses/SkillActiveEffect";
import { db } from "../../Database";
import { SkillArchetype } from "../../Database/Skill/skill";
import { CharacterStatus } from "../Character/Subclasses/CharacterStatus";
import { SkillInternalType } from "./SubClasses/SkillInternalType";
import { WeaponType } from "../../../Common/Enums/Item/EquipmentTypes";

export class Skill {
    id: string;
    name: string;
    baseDescription: string;
    requirement: SkillLearningRequirement;
    equipmentNeeded: SkillEquipmentRequirement;
    activeEffect: SkillActiveEffect[];
    consume: SkillConsume;
    produce: SkillProduce;
    growth: SkillGrowth;
    tier: Tier;
    isSpell: boolean;
    isAuto: boolean = false;
    internalType: SkillInternalType;
    isWeaponAttack: boolean = false;
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
        internalType? : SkillInternalType,
        isAuto?: boolean,
        isWeaponAttack?: boolean
    ) {
        this.id = id;
        this.name = name;
        this.baseDescription = baseDescription;
        this.requirement = requirement;
        this.equipmentNeeded = equipmentNeeded;
        this.activeEffect = activeEffect;
        this.consume = consume;
        this.produce = produce;
        this.growth = SkillGrowthManager.getGrowth(tier);
        this.tier = tier;
        this.isSpell = isSpell;
        this.internalType = internalType || SkillInternalType.None;
        this.isAuto = isAuto || false;
        this.isWeaponAttack = isWeaponAttack || false;
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


    neededExp(level: number) {
        return level < this.growth.expNeeded.length ? this.growth.expNeeded[level - 1] : Infinity;
    }
}

export class SkillGrowth {
    maxLevel: number;
    expNeeded: number[];

    constructor(maxLevel: number, expNeeded: number[]) {
        this.maxLevel = maxLevel;
        this.expNeeded = expNeeded;
    }
}

class SkillGrowthManager {
    static commonGrowth = new SkillGrowth(5, [50, 100, 150, 200, 250]);
    static unCommonGrowth = new SkillGrowth(5, [70, 140, 210, 280, 350]);
    static rareGrowth = new SkillGrowth(7, [200, 400, 600, 800, 1000, 1200, 1400]);
    static epicGrowth = new SkillGrowth(7, [250, 500, 750, 1000, 1250, 1500, 1750]);
    static legendaryGrowth = new SkillGrowth(10, [300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000]);
    static uniqueGrowth = new SkillGrowth(10, [350, 700, 1050, 1400, 1750, 2100, 2450, 2800, 3150, 3500]);
    static divineGrowth = new SkillGrowth(15, [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000]);

    static getGrowth(tier: Tier): SkillGrowth {
        switch (tier) {
            case Tier.common:
                return this.commonGrowth;
            case Tier.uncommon:
                return this.unCommonGrowth;
            case Tier.rare:
                return this.rareGrowth;
            case Tier.epic:
                return this.epicGrowth;
            case Tier.legendary:
                return this.legendaryGrowth;
            case Tier.unique:
                return this.uniqueGrowth;
            case Tier.divine:
                return this.divineGrowth;
            default:
                throw new Error('Invalid skill tier.');
        }
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
            skillArchetype.internalType,  
            false,
            skillArchetype.isWeaponAttack
        );

    return skill;
}