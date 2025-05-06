export enum ResourceNameEnum {
    // ==== Ore+Ingot ====
    resource_ore_iron = 'resource_ore_iron', // common
    resource_ore_copper = 'resource_ore_copper', // uncommon
    resource_ore_gold = 'resource_ore_gold', // rare
    resource_ore_mythril = 'resource_ore_mythril', // rare

    resource_ingot_iron = 'resource_ingot_iron', // common
    resource_ingot_steel = 'resource_ingot_steel', // uncommon
    resource_ingot_copper = 'resource_ingot_copper', // uncommon
    resource_ingot_mithril = 'resource_ingot_mithril', // rare
    resource_ingot_adamantite = 'resource_ingot_adamantite', // epic
    resource_ingot_orichalcum = 'resource_ingot_orichalcum', // legendary

    // TODO: Add more Ore+Ingot

    // ==== Wood+Plank ====
    resource_wood_oak = 'resource_wood_oak', // common
    resource_wood_pine = 'resource_wood_pine', // common
    resource_wood_maple = 'resource_wood_maple', // uncommon
    resource_wood_duskWood = 'resource_wood_duskWood', // uncommon
    resource_wood_bloodOak = 'resource_wood_bloodOak', // rare
    resource_wood_eldritchRoot = 'resource_wood_eldritchRoot', // epic

    resource_plank_oak = 'resource_plank_oak', // common
    resource_plank_pine = 'resource_plank_pine', // common
    resource_plank_bloodOak = 'resource_plank_bloodOak', // rare
    resource_plank_eldritchRoot = 'resource_plank_eldritchRoot', // epic

    // TODO: Add more Wood+Plank

    // ==== Cloth+Thread ====
    resource_thread_cotton = 'resource_thread_cotton', // common
    resource_thread_silk = 'resource_thread_silk', // uncommon
    resource_thread_spiderSilk = 'resource_thread_spiderSilk', // uncommon
    resource_thread_shadowSilk = 'resource_thread_shadowSilk', // rare

    resource_fabric_cotton = 'resource_fabric_cotton', // common
    resource_fabric_silk = 'resource_fabric_silk', // uncommon
    resource_fabric_shadowSilk = 'resource_fabric_shadowSilk', // rare

    // TODO: Add more Cloth+Thread

    // ==== Leather+Hide ====
    resource_leather_cured_cattle = 'resource_leather_cured_cattle', // common
    resource_leather_dragon = 'resource_leather_dragon', // rare
    resource_leather_phantom = 'resource_leather_phantom', // epic

    resource_skinner_hide_reptile = 'resource_skinner_hide_reptile', // uncommon
    resource_skinner_hide_dragon = 'resource_skinner_hide_dragon', // rare
    resource_skinner_scale_dragon = 'resource_skinner_scale_dragon', // rare
    resource_skinner_hide_spectral = 'resource_skinner_hide_spectral', // rare

    resource_boar_hide = 'resource_boar_hide', // common
    resource_snake_skin = 'resource_snake_skin', // uncommon
    resource_giant_snake_skin = 'resource_giant_snake_skin', // rare
    resource_infernal_hide = 'resource_infernal_hide', // legendary

    // TODO: Add more Leather+Hide

    // ==== Bone ====
    resource_bone_fragment = 'resource_bone_fragment', // common
    resource_bone_dragon = 'resource_bone_dragon', // epic
    resource_bone_ancient = 'resource_bone_ancient', // legendary

    // TODO: Add more Bone

    // ==== Meat ====
    resource_culinary_meat_fowl = 'resource_culinary_meat_fowl', // common
    resource_culinary_meat_dragon = 'resource_culinary_meat_dragon', // rare
    resource_meat_phantom = 'resource_meat_phantom', // rare

    resource_wolf_meat = 'resource_wolf_meat', // common
    resource_bear_meat = 'resource_bear_meat', // common
    resource_boar_meat = 'resource_boar_meat', // common

    // TODO: Add more Meat

    // ==== Cooking+Alchemical Ingredient ====
    resource_culinary_wildBerry = 'resource_culinary_wildBerry', // common
    resource_culinary_goldenApple = 'resource_culinary_goldenApple', // uncommon

    resource_alchemy_gland_fire_dragon = 'resource_alchemy_gland_fire_dragon', // rare
    resource_ingredient_blood_dragon = 'resource_ingredient_blood_dragon', // rare
    resource_alchemy_emberRoot = 'resource_alchemy_emberRoot', // uncommon
    resource_alchemy_voidBloom = 'resource_alchemy_voidBloom', // rare
    resource_alchemy_starPetal = 'resource_alchemy_starPetal', // epic

    // TODO: Add more Cooking+Alchemical Ingredient

    // ==== PreciousStones+Gem ====
    resource_gem_ruby = 'resource_gem_ruby', // rare
    resource_gem_diamond = 'resource_gem_diamond', // rare
    resource_gem_emerald = 'resource_gem_emerald', // rare
    resource_jewel_ruby_perfect = 'resource_jewel_ruby_perfect', // rare
    resource_jewel_diamond_flawless = 'resource_jewel_diamond_flawless', // epic

    // TODO: Add more PreciousStones+Gem

    // ==== Monster Parts - Fangs/Claws ====
    resource_skinner_fang = 'resource_skinner_fang', // uncommon
    resource_skinner_talon = 'resource_skinner_talon', // uncommon
    resource_skinner_fang_razor = 'resource_skinner_fang_razor', // rare
    resource_fang_nightbeast = 'resource_fang_nightbeast', // rare
    resource_claw_voidspawn = 'resource_claw_voidspawn', // epic

    resource_wolf_fang = 'resource_wolf_fang', // uncommon
    resource_bear_claw = 'resource_bear_claw', // uncommon
    resource_snake_fang = 'resource_snake_fang', // uncommon
    resource_dragon_fang = 'resource_dragon_fang', // rare
    resource_hellhound_fang = 'resource_hellhound_fang', // rare

    // TODO: Add more Monster Parts - Fangs/Claws

    // ==== Natural Beast Drops ====
    resource_wolf_pelt = 'resource_wolf_pelt', // common
    resource_bear_pelt = 'resource_bear_pelt', // uncommon

    resource_spider_silk = 'resource_spider_silk', // uncommon
    resource_venom_sac = 'resource_venom_sac', // uncommon
    resource_spider_leg = 'resource_spider_leg', // common

    resource_boar_tusk = 'resource_boar_tusk', // uncommon

    // TODO: Add more Natural Beast Drops

    // ==== Humanoid Drops ====
    resource_crude_weapon = 'resource_crude_weapon', // common
    resource_occult_symbol = 'resource_occult_symbol', // uncommon
    resource_ritual_component = 'resource_ritual_component', // uncommon
    resource_spell_scroll = 'resource_spell_scroll', // uncommon
    resource_orcish_weapon = 'resource_orcish_weapon', // uncommon
    resource_orc_armor_fragment = 'resource_orc_armor_fragment', // uncommon
    resource_war_trophy = 'resource_war_trophy', // uncommon
    resource_ancient_weapon = 'resource_ancient_weapon', // epic
    resource_soul_essence = 'resource_soul_essence', // legendary

    // TODO: Add more Humanoid Drops

    // ==== Magical Creature Drops ====
    resource_caustic_essence = 'resource_caustic_essence', // uncommon
    resource_slime_residue = 'resource_slime_residue', // common
    resource_ember_core = 'resource_ember_core', // uncommon
    resource_fire_crystal = 'resource_fire_crystal', // epic
    resource_imp_horn = 'resource_imp_horn', // uncommon
    resource_minor_fire_essence = 'resource_minor_fire_essence', // uncommon
    resource_chaos_fragment = 'resource_chaos_fragment', // legendary

    // TODO: Add more Magical Creature Drops

    // ==== Mythical Beast Drops ====
    resource_griffin_feather = 'resource_griffin_feather', // rare
    resource_griffin_talon = 'resource_griffin_talon', // rare
    resource_griffin_hide = 'resource_griffin_hide', // rare
    resource_wyvern_scale = 'resource_wyvern_scale', // epic
    resource_wyvern_venom_sac = 'resource_wyvern_venom_sac', // epic
    resource_wyvern_wing_membrane = 'resource_wyvern_wing_membrane', // epic

    // TODO: Add more Mythical Beast Drops

    // ==== Undead and Spirit Drops ====
    resource_rotting_flesh = 'resource_rotting_flesh', // common
    resource_tattered_clothing = 'resource_tattered_clothing', // common
    resource_zombie_tooth = 'resource_zombie_tooth', // uncommon
    resource_ectoplasm = 'resource_ectoplasm', // uncommon
    resource_spirit_essence = 'resource_spirit_essence', // uncommon
    resource_haunted_trinket = 'resource_haunted_trinket', // rare
    resource_shadow_essence = 'resource_shadow_essence', // uncommon
    resource_soul_fragment = 'resource_soul_fragment', // uncommon
    resource_wraith_shroud = 'resource_wraith_shroud', // rare
    resource_phylactery = 'resource_phylactery', // legendary
    resource_necromantic_tome = 'resource_necromantic_tome', // unique
    resource_lich_dust = 'resource_lich_dust', // rare

    // TODO: Add more Undead and Spirit Drops

    // ==== Eldritch/Otherworldly Drops ====
    resource_elder_brain_fragment = 'resource_elder_brain_fragment', // unique
    resource_psychic_crystal = 'resource_psychic_crystal', // rare
    resource_strange_artifact = 'resource_strange_artifact', // rare
    resource_void_essence = 'resource_void_essence', // rare
    resource_reality_shard = 'resource_reality_shard', // rare
    resource_alien_tissue = 'resource_alien_tissue', // rare
    resource_eye_of_void = 'resource_eye_of_void', // legendary

    // TODO: Add more Eldritch/Otherworldly Drops

    // ==== Slime Resources ====
    resource_slime_core = 'resource_slime_core', // uncommon
    resource_slime_jelly = 'resource_slime_jelly', // common
    resource_giant_slime_core = 'resource_giant_slime_core', // rare
    resource_fire_slime_essence = 'resource_fire_slime_essence', // uncommon
    resource_slime_core_arcane = 'resource_slime_core_arcane', // epic
    resource_slime_venomous_ooze = 'resource_slime_venomous_ooze', // rare

    // TODO: Add more Slime Resources

    // ==== Misc Resources ====
    resource_goblin_ear = 'resource_goblin_ear', // common
    resource_mana_crystal = 'resource_mana_crystal', // epic
    resource_gold_coins = 'resource_gold_coins', // common

    // TODO: Add more Misc Resources

    // ==== Human ====
    resource_human_blood = 'resource_human_blood' // common
}
