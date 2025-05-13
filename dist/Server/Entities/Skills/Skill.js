/**
 * Enum containing all skill IDs in the game
 * Organized by skill type/class for better readability
 */
export var SkillEnum;
(function (SkillEnum) {
    // Auto attacks
    SkillEnum["AUTO_PHYSICAL"] = "skill_auto_physical";
    SkillEnum["AUTO_MAGICAL"] = "skill_auto_magical";
    // Fighter skills
    SkillEnum["POWER_STRIKE"] = "skill_power_strike";
    SkillEnum["DEFENSIVE_STANCE"] = "skill_defensive_stance";
    SkillEnum["RECKLESS_ATTACK"] = "skill_reckless_attack";
    SkillEnum["SECOND_WIND"] = "skill_second_wind";
    SkillEnum["TRIPLE_SLASH"] = "skill_triple_slash";
    // Rogue skills
    SkillEnum["BACKSTAB"] = "skill_back_stab";
    SkillEnum["POISONED_BLADE"] = "skill_poisoned_blade";
    SkillEnum["STEALTH"] = "skill_stealth";
    // Mage skills
    SkillEnum["FIREBALL"] = "skill_fireball";
    SkillEnum["FROSTBOLT"] = "skill_frostbolt";
    SkillEnum["LIGHTNING_BOLT"] = "skill_lightning_bolt";
    SkillEnum["ARCANE_MISSILE"] = "skill_arcane_missile";
    // Cleric skills
    SkillEnum["HEAL"] = "skill_aid";
    SkillEnum["SMITE"] = "skill_smite";
    SkillEnum["BLESSING"] = "skill_blessing";
    SkillEnum["HOLY_BLAST"] = "skill_holy_blast";
    SkillEnum["CHANT"] = "skill_chant";
    // Druid skills
    SkillEnum["ENTANGLE"] = "skill_entangle";
    SkillEnum["WILDSHAPE"] = "skill_wildshape";
    SkillEnum["NATURE_TOUCH"] = "skill_nature_touch";
    // Warlock skills
    SkillEnum["SHADOW_BOLT"] = "skill_shadow_bolt";
    SkillEnum["LIFE_DRAIN"] = "skill_life_drain";
    SkillEnum["CURSE"] = "skill_curse";
    // Beast/Animal skills
    SkillEnum["BITE"] = "skill_bite";
    SkillEnum["CLAW_SWIPE"] = "skill_claw_swipe";
    SkillEnum["MAUL"] = "skill_maul";
    SkillEnum["HOWL"] = "skill_howl";
    SkillEnum["PACK_HUNT"] = "skill_pack_hunt";
    // Snake specific skills
    SkillEnum["VENOM_BITE"] = "skill_venom_bite";
    SkillEnum["CONSTRICTIVE_COIL"] = "skill_constrictive_coil";
    // Spider skills
    SkillEnum["VENOM_SPRAY"] = "skill_venom_spray";
    SkillEnum["WEB_SHOT"] = "skill_web_shot";
})(SkillEnum || (SkillEnum = {}));
export class Skill {
    constructor(meta) {
        this.meta = meta;
    }
}
export class ActiveSkill extends Skill {
    constructor(meta, data) {
        super(meta);
        this.equipmentNeeded = data.equipmentNeeded;
        this.consume = data.consume;
        this.produce = data.produce;
        this.isSpell = data.isSpell;
        this.isWeaponAttack = data.isWeaponAttack;
        this.executor = data.executor;
    }
}
export class PassiveSkill extends Skill {
    constructor(meta, data) {
        super(meta);
        this.adding = data.adding;
        this.removing = data.removing;
        this.takingTurn = data.takingTurn;
    }
}
