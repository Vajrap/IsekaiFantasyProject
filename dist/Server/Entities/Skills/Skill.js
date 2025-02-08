var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SkillConsume, SkillProduce } from "./SubClasses/SkillConsume";
import { SkillEquipmentRequirement } from "./SubClasses/SkillEquipmentRequirement";
import { SkillLearningRequirement } from "./SubClasses/SkillLearningRequirement";
import { Tier } from "../../../Common/DTOsEnumsInterfaces/Tier";
import { SkillActiveEffect } from "./SubClasses/SkillActiveEffect";
import { db } from "../../Database";
import { WeaponType } from "../../../Common/DTOsEnumsInterfaces/Item/Equipment/Weapon/Enums";
export class Skill {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier, isSpell, isAuto, isWeaponAttack, isReaction) {
        this.isAuto = false;
        this.isWeaponAttack = false;
        this.isReaction = false;
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
        this.isAuto = isAuto || false;
        this.isWeaponAttack = isWeaponAttack || false;
        this.isReaction = isReaction || false;
    }
    validateSkillLearning(characterLevel, status, skills, traits) {
        let isValid = true;
        // Check character level requirement
        if (this.requirement.preRequireCharacterLevel) {
            if (characterLevel < this.requirement.preRequireCharacterLevel) {
                isValid = false;
            }
        }
        // Check required skills
        if (this.requirement.preRequireSkillID) {
            if (!skills.some(skill => { var _a; return (_a = this.requirement.preRequireSkillID) === null || _a === void 0 ? void 0 : _a.includes(skill); })) {
                isValid = false;
            }
        }
        // Check required elements
        if (this.requirement.preRequireElements) {
            for (const elementRequired of this.requirement.preRequireElements) {
                if (status.elements[elementRequired.element].base < elementRequired.value) {
                    isValid = false;
                }
            }
        }
        // Check required proficiencies
        if (this.requirement.preRequireProficiencies) {
            for (const proficiencyRequired of this.requirement.preRequireProficiencies) {
                if (status.proficiencies[proficiencyRequired.proficiency].base < proficiencyRequired.value) {
                    isValid = false;
                }
            }
        }
        // Check required attributes
        if (this.requirement.preRequireAttributes) {
            for (const attributeRequired of this.requirement.preRequireAttributes) {
                if (status.attributes[attributeRequired.attribute].base < attributeRequired.value) {
                    isValid = false;
                }
            }
        }
        // Check required artisans
        if (this.requirement.preRequireArtisans) {
            for (const artisanRequired of this.requirement.preRequireArtisans) {
                if (status.artisans[artisanRequired.artisan].base < artisanRequired.value) {
                    isValid = false;
                }
            }
        }
        // Check required traits
        if (this.requirement.preRequireCharacterTrait) {
            if (!traits.some(trait => { var _a; return (_a = this.requirement.preRequireCharacterTrait) === null || _a === void 0 ? void 0 : _a.includes(trait); })) {
                isValid = false;
            }
        }
        return isValid;
    }
    validateEquipment(equipments) {
        var _a, _b;
        if (((_a = this.equipmentNeeded.weapon) === null || _a === void 0 ? void 0 : _a.length) === 0 && this.equipmentNeeded.weapon !== undefined) {
            return true;
        }
        // Case where the skill requires bare hands; user must 'NOT' equip any weapon
        if (((_b = this.equipmentNeeded.weapon) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            if (this.equipmentNeeded.weapon[0] === WeaponType.bare_hand) {
                if (equipments.weapon.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        if (this.equipmentNeeded.weapon) {
            let weaponNeeded = this.equipmentNeeded.weapon;
            if (equipments.weapon.length === 0) {
                return false;
            }
            ;
            if (equipments.weapon.some((weapon) => weaponNeeded.includes(weapon))) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    }
    neededExp(level) {
        return level < this.growth.expNeeded.length ? this.growth.expNeeded[level - 1] : Infinity;
    }
}
export class SkillGrowth {
    constructor(maxLevel, expNeeded) {
        this.maxLevel = maxLevel;
        this.expNeeded = expNeeded;
    }
}
export class SkillGrowthManager {
    static getGrowth(tier) {
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
SkillGrowthManager.commonGrowth = new SkillGrowth(5, [50, 100, 150, 200, 250]);
SkillGrowthManager.unCommonGrowth = new SkillGrowth(5, [70, 140, 210, 280, 350]);
SkillGrowthManager.rareGrowth = new SkillGrowth(7, [200, 400, 600, 800, 1000, 1200, 1400]);
SkillGrowthManager.epicGrowth = new SkillGrowth(7, [250, 500, 750, 1000, 1250, 1500, 1750]);
SkillGrowthManager.legendaryGrowth = new SkillGrowth(10, [300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000]);
SkillGrowthManager.uniqueGrowth = new SkillGrowth(10, [350, 700, 1050, 1400, 1750, 2100, 2450, 2800, 3150, 3500]);
SkillGrowthManager.divineGrowth = new SkillGrowth(15, [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000]);
export function getSkillFromDB(skillID) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Fetching skill with ID: ${skillID}`);
        const skillArchetype = yield db.read('skills', 'id', skillID);
        if (!skillArchetype) {
            console.error(`ATOM: Skill with ID ${skillID} not found in the database.`);
            return null;
        }
        // Parse stringified JSON fields into proper objects
        const requirement = typeof skillArchetype.requirement === 'string' ? JSON.parse(skillArchetype.requirement) : SkillLearningRequirement;
        const equipmentNeeded = typeof skillArchetype.equipmentNeeded === 'string' ? JSON.parse(skillArchetype.equipmentNeeded) : SkillEquipmentRequirement;
        const activeEffect = typeof skillArchetype.activeEffect === 'string' ? JSON.parse(skillArchetype.activeEffect) : skillArchetype.activeEffect.map((effect) => new SkillActiveEffect(effect.targetTypes, effect.skillActionObjects));
        const consume = typeof skillArchetype.consume === 'string' ? JSON.parse(skillArchetype.consume) : SkillConsume;
        const produce = typeof skillArchetype.produce === 'string' ? JSON.parse(skillArchetype.produce) : SkillProduce;
        // Create the Skill object with the parsed values
        const skill = new Skill(skillArchetype.id, skillArchetype.name, skillArchetype.baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, skillArchetype.tier, skillArchetype.isSpell, false, skillArchetype.isWeaponAttack);
        return skill;
    });
}
class Spell extends Skill {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier, true);
    }
}
class Martial extends Skill {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier, false);
    }
}
class AutoSpell extends Spell {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = true;
    }
}
class NonAutoSpell extends Spell {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = false;
    }
}
class AutoMartial extends Martial {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = true;
    }
}
class NonAutoMartial extends Martial {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isAuto = false;
    }
}
export class AutoMartialWeapon extends AutoMartial {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = true;
    }
}
export class AutoMartialNonWeapon extends AutoMartial {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = false;
    }
}
export class NonAutoMartialWeapon extends NonAutoMartial {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = true;
    }
}
export class NonAutoMartialNonWeapon extends NonAutoMartial {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = false;
    }
}
export class AutoSpellWeapon extends AutoSpell {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = true;
    }
}
export class AutoSpellNonWeapon extends AutoSpell {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = false;
    }
}
export class NonAutoSpellWeapon extends NonAutoSpell {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = true;
    }
}
export class NonAutoSpellNonWeapon extends NonAutoSpell {
    constructor(params) {
        super(params.id, params.name, params.baseDescription, params.requirement, params.equipmentNeeded, params.activeEffect, params.consume, params.produce, params.tier);
        this.isWeaponAttack = false;
    }
}
export class SpellReaction extends Spell {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isReaction = true;
    }
}
export class MartialReaction extends Martial {
    constructor(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier) {
        super(id, name, baseDescription, requirement, equipmentNeeded, activeEffect, consume, produce, tier);
        this.isReaction = true;
    }
}
