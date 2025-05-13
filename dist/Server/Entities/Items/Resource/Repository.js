import { Resource } from './Resource';
import { ItemCost } from '../ItemCost';
import { Tier } from '../../../../Common/DTOsEnumsInterfaces/Tier';
import { ResourceNameEnum } from './ResourceNameEnum';
// Mining Resources - Ore
export const resource_ore_iron = new Resource({
    id: ResourceNameEnum.resource_ore_iron,
    name: 'Iron Ore',
    description: 'Raw iron ore, can be smelted into iron ingots.',
    image: 'ore_iron.png',
    weight: 200,
    tier: Tier.rare,
    cost: new ItemCost(40, 0, 20)
});
export const resource_ore_copper = new Resource({
    id: ResourceNameEnum.resource_ore_copper,
    name: 'Copper Ore',
    description: 'A lump of copper ore.',
    image: 'ore_copper.png',
    weight: 150,
    tier: Tier.common,
    cost: new ItemCost(20, 0, 20)
});
export const resource_ore_gold = new Resource({
    id: ResourceNameEnum.resource_ore_gold,
    name: 'Gold Ore',
    description: 'A lump of gold ore, highly valued for its rarity.',
    image: 'ore_gold.png',
    weight: 250,
    tier: Tier.epic,
    cost: new ItemCost(1000, 0, 10)
});
// Mining Resources - Ingots
export const resource_ingot_iron = new Resource({
    id: ResourceNameEnum.resource_ingot_iron,
    name: 'Iron Ingot',
    description: 'Refined iron, ready for crafting.',
    image: 'ingot_iron.png',
    weight: 150,
    tier: Tier.rare,
    cost: new ItemCost(100, 0, 20)
});
export const resource_ingot_steel = new Resource({
    id: ResourceNameEnum.resource_ingot_steel,
    name: 'Steel Ingot',
    description: 'High-quality steel, excellent for weapons and armor.',
    image: 'ingot_steel.png',
    weight: 150,
    tier: Tier.epic,
    cost: new ItemCost(400, 0, 15)
});
export const resource_ingot_copper = new Resource({
    id: ResourceNameEnum.resource_ingot_copper,
    name: 'Copper Ingot',
    description: 'A copper ingot with good conductive properties.',
    image: 'ingot_copper.png',
    weight: 120,
    tier: Tier.common,
    cost: new ItemCost(60, 0, 20)
});
export const resource_ingot_mithril = new Resource({
    id: ResourceNameEnum.resource_ingot_mithril,
    name: 'Mithril Ingot',
    description: 'A mithril ingot, lightweight but incredibly strong.',
    image: 'ingot_mithril.png',
    weight: 100,
    tier: Tier.legendary,
    cost: new ItemCost(2000, 0, 5)
});
// Wood Resources
export const resource_wood_oak = new Resource({
    id: ResourceNameEnum.resource_wood_oak,
    name: 'Oak Wood',
    description: 'Sturdy oak wood, good for crafting.',
    image: 'wood_oak.png',
    weight: 100,
    tier: Tier.common,
    cost: new ItemCost(40, 0, 20)
});
export const resource_wood_pine = new Resource({
    id: ResourceNameEnum.resource_wood_pine,
    name: 'Pine Wood',
    description: 'Lightweight pine wood, good for bows and staves.',
    image: 'wood_pine.png',
    weight: 80,
    tier: Tier.common,
    cost: new ItemCost(40, 0, 20)
});
export const resource_wood_maple = new Resource({
    id: ResourceNameEnum.resource_wood_maple,
    name: 'Maple Wood',
    description: 'A flexible wood with a beautiful grain pattern.',
    image: 'wood_maple.png',
    weight: 90,
    tier: Tier.uncommon,
    cost: new ItemCost(80, 0, 15)
});
export const resource_wood_duskWood = new Resource({
    id: ResourceNameEnum.resource_wood_duskWood,
    name: 'Duskwood',
    description: 'A mystical wood that absorbs light, used in crafting dark magic items.',
    image: 'wood_duskWood.png',
    weight: 120,
    tier: Tier.legendary,
    cost: new ItemCost(1600, 0, 5)
});
// Wood Planks
export const resource_plank_oak = new Resource({
    id: ResourceNameEnum.resource_plank_oak,
    name: 'Oak Plank',
    description: 'A sturdy plank made from oak wood.',
    image: 'plank_oak.png',
    weight: 90,
    tier: Tier.common,
    cost: new ItemCost(50, 0, 20)
});
export const resource_plank_pine = new Resource({
    id: ResourceNameEnum.resource_plank_pine,
    name: 'Pine Plank',
    description: 'A lightweight plank made from pine wood.',
    image: 'plank_pine.png',
    weight: 70,
    tier: Tier.common,
    cost: new ItemCost(50, 0, 20)
});
// Thread Resources
export const resource_thread_cotton = new Resource({
    id: ResourceNameEnum.resource_thread_cotton,
    name: 'Cotton Thread',
    description: 'Soft cotton fibers for cloth production.',
    image: 'thread_cotton.png',
    weight: 50,
    tier: Tier.common,
    cost: new ItemCost(20, 0, 20)
});
export const resource_thread_silk = new Resource({
    id: ResourceNameEnum.resource_thread_silk,
    name: 'Silk Thread',
    description: 'A smooth and luxurious thread spun from silk fibers.',
    image: 'thread_silk.png',
    weight: 40,
    tier: Tier.uncommon,
    cost: new ItemCost(100, 0, 15)
});
export const resource_thread_spiderSilk = new Resource({
    id: ResourceNameEnum.resource_thread_spiderSilk,
    name: 'Spider Silk Thread',
    description: 'An incredibly strong thread harvested from giant spiders.',
    image: 'thread_spiderSilk.png',
    weight: 30,
    tier: Tier.epic,
    cost: new ItemCost(600, 0, 10)
});
// Fabric Resources
export const resource_fabric_cotton = new Resource({
    id: ResourceNameEnum.resource_fabric_cotton,
    name: 'Cotton Fabric',
    description: 'Soft, breathable cotton fabric.',
    image: 'fabric_cotton.png',
    weight: 60,
    tier: Tier.common,
    cost: new ItemCost(40, 0, 20)
});
export const resource_fabric_silk = new Resource({
    id: ResourceNameEnum.resource_fabric_silk,
    name: 'Silk Fabric',
    description: 'Luxurious silk fabric, smooth and lightweight.',
    image: 'fabric_silk.png',
    weight: 50,
    tier: Tier.uncommon,
    cost: new ItemCost(160, 0, 15)
});
// Leather Resources
export const resource_leather_cured_cattle = new Resource({
    id: ResourceNameEnum.resource_leather_cured_cattle,
    name: 'Cured Cattle Leather',
    description: 'Tanned leather, good for light armor.',
    image: 'leather_cured_cattle.png',
    weight: 100,
    tier: Tier.common,
    cost: new ItemCost(60, 0, 20)
});
export const resource_leather_dragon = new Resource({
    id: ResourceNameEnum.resource_leather_dragon,
    name: 'Dragon Leather',
    description: 'Legendary leather from a dragon, resistant to heat and magical effects.',
    image: 'leather_dragon.png',
    weight: 120,
    tier: Tier.legendary,
    cost: new ItemCost(2400, 0, 5)
});
// Monster Parts - Fangs/Claws
export const resource_skinner_fang = new Resource({
    id: ResourceNameEnum.resource_skinner_fang,
    name: 'Fang',
    description: 'Sharp fang from a predator, used in crafting and potions.',
    image: 'skinner_fang.png',
    weight: 20,
    tier: Tier.uncommon,
    cost: new ItemCost(100, 0, 20)
});
export const resource_skinner_talon = new Resource({
    id: ResourceNameEnum.resource_skinner_talon,
    name: 'Talon',
    description: 'A sharp talon from a predator.',
    image: 'skinner_talon.png',
    weight: 15,
    tier: Tier.uncommon,
    cost: new ItemCost(100, 0, 20)
});
export const resource_skinner_fang_razor = new Resource({
    id: ResourceNameEnum.resource_skinner_fang_razor,
    name: 'Razor Fang',
    description: 'An exceptionally sharp fang from a rare predator.',
    image: 'skinner_fang_razor.png',
    weight: 25,
    tier: Tier.rare,
    cost: new ItemCost(240, 0, 15)
});
// Animal Hides/Pelts
export const resource_skinner_hide_reptile = new Resource({
    id: ResourceNameEnum.resource_skinner_hide_reptile,
    name: 'Reptile Hide',
    description: 'Tough, scaly hide from a reptile, good for lightweight armor.',
    image: 'skinner_hide_reptile.png',
    weight: 120,
    tier: Tier.uncommon,
    cost: new ItemCost(120, 0, 15)
});
export const resource_skinner_hide_dragon = new Resource({
    id: ResourceNameEnum.resource_skinner_hide_dragon,
    name: 'Dragon Hide',
    description: 'Incredibly durable hide from a dragon.',
    image: 'skinner_hide_dragon.png',
    weight: 180,
    tier: Tier.legendary,
    cost: new ItemCost(2000, 0, 5)
});
export const resource_skinner_scale_dragon = new Resource({
    id: ResourceNameEnum.resource_skinner_scale_dragon,
    name: 'Dragon Scale',
    description: 'Hard, heat-resistant scale from a dragon, excellent for armor.',
    image: 'skinner_scale_dragon.png',
    weight: 100,
    tier: Tier.legendary,
    cost: new ItemCost(1600, 0, 5)
});
// Food and Ingredients
export const resource_bear_meat = new Resource({
    id: ResourceNameEnum.resource_bear_meat,
    name: 'Bear Meat',
    description: 'Rich and fatty meat from a bear.',
    image: 'culinary_meat_bear.png',
    weight: 150,
    tier: Tier.uncommon,
    cost: new ItemCost(140, 0, 15)
});
export const resource_bear_pelt = new Resource({
    id: ResourceNameEnum.resource_bear_pelt,
    name: 'Bear Pelt',
    description: 'Incredibly durable hide from a bear.',
    image: 'skinner_hide_bear.png',
    weight: 180,
    tier: Tier.rare,
    cost: new ItemCost(450, 0, 5)
});
export const resource_spider_leg = new Resource({
    id: ResourceNameEnum.resource_spider_leg,
    name: 'Spider Leg',
    description: 'Strong and flexible leg from a spider.',
    image: 'skinner_leg_spider.png',
    weight: 50,
    tier: Tier.uncommon,
    cost: new ItemCost(100, 0, 10)
});
export const resource_culinary_meat_fowl = new Resource({
    id: ResourceNameEnum.resource_culinary_meat_fowl,
    name: 'Fowl Meat',
    description: 'Tender meat from a bird, good for cooking.',
    image: 'culinary_meat_fowl.png',
    weight: 80,
    tier: Tier.common,
    cost: new ItemCost(40, 0, 20)
});
export const resource_culinary_meat_dragon = new Resource({
    id: ResourceNameEnum.resource_culinary_meat_dragon,
    name: 'Dragon Meat',
    description: 'Exotic meat from a dragon, said to have magical properties when consumed.',
    image: 'culinary_meat_dragon.png',
    weight: 250,
    tier: Tier.legendary,
    cost: new ItemCost(3000, 0, 5)
});
export const resource_culinary_wildBerry = new Resource({
    id: ResourceNameEnum.resource_culinary_wildBerry,
    name: 'Wild Berries',
    description: 'Sweet berries gathered from the wild.',
    image: 'culinary_wildBerry.png',
    weight: 30,
    tier: Tier.common,
    cost: new ItemCost(20, 0, 20)
});
export const resource_culinary_goldenApple = new Resource({
    id: ResourceNameEnum.resource_culinary_goldenApple,
    name: 'Golden Apple',
    description: 'A rare apple with a golden sheen and restorative properties.',
    image: 'culinary_goldenApple.png',
    weight: 50,
    tier: Tier.rare,
    cost: new ItemCost(300, 0, 10)
});
// Gems and Jewels
export const resource_gem_ruby = new Resource({
    id: ResourceNameEnum.resource_gem_ruby,
    name: 'Ruby',
    description: 'A precious ruby, attuned to the element of Fire.',
    image: 'gem_ruby.png',
    weight: 25,
    tier: Tier.rare,
    cost: new ItemCost(600, 0, 10)
});
export const resource_gem_diamond = new Resource({
    id: ResourceNameEnum.resource_gem_diamond,
    name: 'Diamond',
    description: 'A brilliant diamond, embodying the essence of Order.',
    image: 'gem_diamond.png',
    weight: 20,
    tier: Tier.epic,
    cost: new ItemCost(1400, 0, 10)
});
export const resource_jewel_ruby_perfect = new Resource({
    id: ResourceNameEnum.resource_jewel_ruby_perfect,
    name: 'Perfect Ruby',
    description: 'A flawless ruby cut to perfection, radiating fire magic.',
    image: 'jewel_ruby_perfect.png',
    weight: 22,
    tier: Tier.rare,
    cost: new ItemCost(1000, 0, 10)
});
// Slime Resources
export const resource_slime_core = new Resource({
    id: ResourceNameEnum.resource_slime_core,
    name: 'Slime Core',
    description: 'Gelatinous core from a slime, prized for alchemical properties.',
    image: 'slime_core.png',
    weight: 50,
    tier: Tier.uncommon,
    cost: new ItemCost(160, 0, 15)
});
export const resource_slime_jelly = new Resource({
    id: ResourceNameEnum.resource_slime_jelly,
    name: 'Slime Jelly',
    description: 'Viscous jelly from a slime, used in potions and alchemy.',
    image: 'slime_jelly.png',
    weight: 60,
    tier: Tier.uncommon,
    cost: new ItemCost(140, 0, 15)
});
export const resource_giant_slime_core = new Resource({
    id: ResourceNameEnum.resource_giant_slime_core,
    name: 'Giant Slime Core',
    description: 'Massive core from a giant slime, contains concentrated magical energy.',
    image: 'giant_slime_core.png',
    weight: 120,
    tier: Tier.rare,
    cost: new ItemCost(500, 0, 10)
});
// Elements and Alchemical
export const resource_fire_slime_essence = new Resource({
    id: ResourceNameEnum.resource_fire_slime_essence,
    name: 'Fire Slime Essence',
    description: 'Burning essence captured from a fire slime, used in magical crafting.',
    image: 'fire_slime_essence.png',
    weight: 40,
    tier: Tier.rare,
    cost: new ItemCost(600, 0, 10)
});
export const resource_alchemy_gland_fire_dragon = new Resource({
    id: ResourceNameEnum.resource_alchemy_gland_fire_dragon,
    name: 'Fire Dragon Gland',
    description: 'Fire gland from a dragon, brimming with elemental energy.',
    image: 'alchemy_gland_fire_dragon.png',
    weight: 100,
    tier: Tier.legendary,
    cost: new ItemCost(2400, 0, 5)
});
export const resource_ingredient_blood_dragon = new Resource({
    id: ResourceNameEnum.resource_ingredient_blood_dragon,
    name: 'Dragon Blood',
    description: 'Powerful blood from a dragon, brimming with magical energy.',
    image: 'ingredient_blood_dragon.png',
    weight: 80,
    tier: Tier.legendary,
    cost: new ItemCost(2800, 0, 5)
});
export const resource_alchemy_emberRoot = new Resource({
    id: ResourceNameEnum.resource_alchemy_emberRoot,
    name: 'Ember Root',
    description: 'A rare root that still burns with inner fire.',
    image: 'alchemy_emberRoot.png',
    weight: 60,
    tier: Tier.legendary,
    cost: new ItemCost(1600, 0, 5)
});
// Misc Resources
export const resource_goblin_ear = new Resource({
    id: ResourceNameEnum.resource_goblin_ear,
    name: 'Goblin Ear',
    description: 'Small, pointed ear from a goblin, has minor magical properties.',
    image: 'goblin_ear.png',
    weight: 10,
    tier: Tier.common,
    cost: new ItemCost(60, 0, 20)
});
export const resource_mana_crystal = new Resource({
    id: ResourceNameEnum.resource_mana_crystal,
    name: 'Mana Crystal',
    description: 'A small crystal containing condensed magical energy.',
    image: 'mana_crystal.png',
    weight: 30,
    tier: Tier.uncommon,
    cost: new ItemCost(240, 0, 15)
});
export const resource_gold_coins = new Resource({
    id: ResourceNameEnum.resource_gold_coins,
    name: 'Gold Coins',
    description: 'Standard currency, accepted by merchants everywhere.',
    image: 'gold_coins.png',
    weight: 10,
    tier: Tier.common,
    cost: new ItemCost(200, 0, 0)
});
// Natural Beast Drops
export const resource_wolf_pelt = new Resource({
    id: ResourceNameEnum.resource_wolf_pelt,
    name: 'Wolf Pelt',
    description: 'A thick, warm pelt harvested from a wolf. Used in crafting light armor and clothing.',
    image: 'wolf_pelt.png',
    weight: 60,
    tier: Tier.common,
    cost: new ItemCost(25, 0, 20)
});
export const resource_wolf_fang = new Resource({
    id: ResourceNameEnum.resource_wolf_fang,
    name: 'Wolf Fang',
    description: 'A sharp fang from a wolf. Can be used in crafting or alchemy.',
    image: 'wolf_fang.png',
    weight: 15,
    tier: Tier.uncommon,
    cost: new ItemCost(70, 0, 15)
});
export const resource_wolf_meat = new Resource({
    id: ResourceNameEnum.resource_wolf_meat,
    name: 'Wolf Meat',
    description: 'Gamey meat from a wolf. Edible when properly cooked.',
    image: 'wolf_meat.png',
    weight: 80,
    tier: Tier.common,
    cost: new ItemCost(35, 0, 20)
});
export const resource_bear_claw = new Resource({
    id: ResourceNameEnum.resource_bear_claw,
    name: 'Bear Claw',
    description: 'A large, sharp claw from a bear. Useful for crafting weapons and talismans.',
    image: 'bear_claw.png',
    weight: 30,
    tier: Tier.uncommon,
    cost: new ItemCost(110, 0, 15)
});
export const resource_spider_silk = new Resource({
    id: ResourceNameEnum.resource_spider_silk,
    name: 'Spider Silk',
    description: 'Strong, flexible silk harvested from giant spiders. Highly valued for crafting lightweight clothing and bowstrings.',
    image: 'spider_silk.png',
    weight: 20,
    tier: Tier.uncommon,
    cost: new ItemCost(100, 0, 15)
});
export const resource_venom_sac = new Resource({
    id: ResourceNameEnum.resource_venom_sac,
    name: 'Venom Sac',
    description: 'A poison gland extracted from a giant spider. Used in alchemy for creating poisons and antidotes.',
    image: 'venom_sac.png',
    weight: 25,
    tier: Tier.rare,
    cost: new ItemCost(250, 0, 10)
});
// Humanoid Drops
export const resource_crude_weapon = new Resource({
    id: ResourceNameEnum.resource_crude_weapon,
    name: 'Crude Weapon',
    description: 'A poorly crafted weapon, likely made by goblins. Can be salvaged for materials.',
    image: 'crude_weapon.png',
    weight: 120,
    tier: Tier.common,
    cost: new ItemCost(40, 0, 20)
});
export const resource_occult_symbol = new Resource({
    id: ResourceNameEnum.resource_occult_symbol,
    name: 'Occult Symbol',
    description: 'A strange symbol used by cultists in their rituals. Emanates a faint aura of dark magic.',
    image: 'occult_symbol.png',
    weight: 50,
    tier: Tier.uncommon,
    cost: new ItemCost(125, 0, 15)
});
export const resource_spell_scroll = new Resource({
    id: ResourceNameEnum.resource_spell_scroll,
    name: 'Spell Scroll',
    description: 'A parchment containing arcane knowledge. Can be studied to learn new spells or crafted into magical items.',
    image: 'spell_scroll.png',
    weight: 30,
    tier: Tier.rare,
    cost: new ItemCost(250, 0, 10)
});
export const resource_soul_essence = new Resource({
    id: ResourceNameEnum.resource_soul_essence,
    name: 'Soul Essence',
    description: 'Mysterious ethereal substance captured from undead creatures. Used in powerful enchantments.',
    image: 'soul_essence.png',
    weight: 10,
    tier: Tier.rare,
    cost: new ItemCost(250, 0, 10)
});
// Magical Creature Drops
export const resource_slime_residue = new Resource({
    id: ResourceNameEnum.resource_slime_residue,
    name: 'Slime Residue',
    description: 'Gelatinous residue from a slime. Has unusual alchemical properties.',
    image: 'slime_residue.png',
    weight: 45,
    tier: Tier.common,
    cost: new ItemCost(125, 0, 20)
});
export const resource_ember_core = new Resource({
    id: ResourceNameEnum.resource_ember_core,
    name: 'Ember Core',
    description: 'A glowing core of concentrated fire energy. Remains hot to the touch indefinitely.',
    image: 'ember_core.png',
    weight: 50,
    tier: Tier.rare,
    cost: new ItemCost(600, 0, 10)
});
export const resource_fire_crystal = new Resource({
    id: ResourceNameEnum.resource_fire_crystal,
    name: 'Fire Crystal',
    description: 'A beautiful crystal infused with elemental fire. Essential for crafting high-tier fire-based magical items.',
    image: 'fire_crystal.png',
    weight: 40,
    tier: Tier.epic,
    cost: new ItemCost(1350, 0, 10)
});
export const resource_chaos_fragment = new Resource({
    id: ResourceNameEnum.resource_chaos_fragment,
    name: 'Chaos Fragment',
    description: 'A unstable fragment of pure chaos energy. Handling it carelessly can lead to unpredictable effects.',
    image: 'chaos_fragment.png',
    weight: 30,
    tier: Tier.rare,
    cost: new ItemCost(250, 0, 10)
});
// Mythical Beast Drops
export const resource_griffin_feather = new Resource({
    id: ResourceNameEnum.resource_griffin_feather,
    name: 'Griffin Feather',
    description: 'A golden feather from a majestic griffin. Prized for crafting lightweight armor and magical items associated with air and flight.',
    image: 'griffin_feather.png',
    weight: 15,
    tier: Tier.rare,
    cost: new ItemCost(350, 0, 10)
});
export const resource_wyvern_scale = new Resource({
    id: ResourceNameEnum.resource_wyvern_scale,
    name: 'Wyvern Scale',
    description: 'A tough, heat-resistant scale from a wyvern. Excellent material for crafting armor with elemental resistances.',
    image: 'wyvern_scale.png',
    weight: 60,
    tier: Tier.rare,
    cost: new ItemCost(500, 0, 10)
});
export const resource_wyvern_venom_sac = new Resource({
    id: ResourceNameEnum.resource_wyvern_venom_sac,
    name: 'Wyvern Venom Sac',
    description: 'A deadly poison gland harvested from a wyvern\'s tail. Used in creating powerful poisons and alchemical concoctions.',
    image: 'wyvern_venom_sac.png',
    weight: 35,
    tier: Tier.rare,
    cost: new ItemCost(600, 0, 10)
});
export const resource_dragon_fang = new Resource({
    id: ResourceNameEnum.resource_dragon_fang,
    name: 'Dragon Fang',
    description: 'A massive tooth from a dragon. As hard as steel and infused with magical properties.',
    image: 'dragon_fang.png',
    weight: 80,
    tier: Tier.epic,
    cost: new ItemCost(1250, 0, 10)
});
// Undead and Spirit Drops
export const resource_ectoplasm = new Resource({
    id: ResourceNameEnum.resource_ectoplasm,
    name: 'Ectoplasm',
    description: 'Semi-physical residue left behind by spirits. Essential component in ghost-related alchemy and enchanting.',
    image: 'ectoplasm.png',
    weight: 25,
    tier: Tier.rare,
    cost: new ItemCost(250, 0, 10)
});
export const resource_shadow_essence = new Resource({
    id: ResourceNameEnum.resource_shadow_essence,
    name: 'Shadow Essence',
    description: 'Condensed darkness captured from powerful wraiths. Used in creating items with shadow magic properties.',
    image: 'shadow_essence.png',
    weight: 20,
    tier: Tier.epic,
    cost: new ItemCost(800, 0, 10)
});
export const resource_phylactery = new Resource({
    id: ResourceNameEnum.resource_phylactery,
    name: 'Phylactery',
    description: 'A container used by liches to store their souls. Extremely rare and dangerous to handle without proper precautions.',
    image: 'phylactery.png',
    weight: 50,
    tier: Tier.legendary,
    cost: new ItemCost(4000, 0, 5)
});
// Eldritch/Otherworldly Drops
export const resource_psychic_crystal = new Resource({
    id: ResourceNameEnum.resource_psychic_crystal,
    name: 'Psychic Crystal',
    description: 'A crystal humming with psychic energy. Looking into it too long causes strange visions and headaches.',
    image: 'psychic_crystal.png',
    weight: 30,
    tier: Tier.epic,
    cost: new ItemCost(1150, 0, 10)
});
export const resource_void_essence = new Resource({
    id: ResourceNameEnum.resource_void_essence,
    name: 'Void Essence',
    description: 'Pure nothingness given form. Extremely unstable and dangerous, but invaluable for the most powerful arcane crafting.',
    image: 'void_essence.png',
    weight: 15,
    tier: Tier.legendary,
    cost: new ItemCost(3000, 0, 5)
});
// Snake resources
export const resource_snake_skin = new Resource({
    id: ResourceNameEnum.resource_snake_skin,
    name: 'Snake Skin',
    description: 'A flexible, scaly skin from a snake. Used in crafting lightweight armor and accessories.',
    image: 'snake_skin.png',
    weight: 60,
    tier: Tier.uncommon,
    cost: new ItemCost(120, 0, 15)
});
export const resource_snake_fang = new Resource({
    id: ResourceNameEnum.resource_snake_fang,
    name: 'Snake Fang',
    description: 'A sharp, venomous fang from a snake. Used in alchemy and weapon crafting.',
    image: 'snake_fang.png',
    weight: 15,
    tier: Tier.uncommon,
    cost: new ItemCost(100, 0, 15)
});
export const resource_giant_snake_skin = new Resource({
    id: ResourceNameEnum.resource_giant_snake_skin,
    name: 'Giant Snake Skin',
    description: 'An exceptionally large snake skin with unique patterns. Used in crafting high-quality armor and magical items.',
    image: 'giant_snake_skin.png',
    weight: 120,
    tier: Tier.rare,
    cost: new ItemCost(350, 0, 10)
});
export const resource_human_blood = new Resource({
    id: ResourceNameEnum.resource_human_blood,
    name: 'Human Blood',
    description: 'A drop of human blood. Used in crafting potions and alchemy.',
    image: 'human_blood.png',
    weight: 10,
    tier: Tier.common,
    cost: new ItemCost(1, 0, 10)
});
// Export all resources
export const resourcesRepository = {
    // Ores
    resource_ore_iron,
    resource_ore_copper,
    resource_ore_gold,
    // Ingots
    resource_ingot_iron,
    resource_ingot_steel,
    resource_ingot_copper,
    resource_ingot_mithril,
    // Wood
    resource_wood_oak,
    resource_wood_pine,
    resource_wood_maple,
    resource_wood_duskWood,
    // Wood Planks
    resource_plank_oak,
    resource_plank_pine,
    // Textiles
    resource_thread_cotton,
    resource_thread_silk,
    resource_thread_spiderSilk,
    resource_fabric_cotton,
    resource_fabric_silk,
    resource_leather_cured_cattle,
    resource_leather_dragon,
    // Monster Parts
    resource_skinner_fang,
    resource_skinner_talon,
    resource_skinner_fang_razor,
    resource_skinner_hide_reptile,
    resource_skinner_hide_dragon,
    resource_skinner_scale_dragon,
    // Food and Ingredients
    resource_bear_meat,
    resource_bear_pelt,
    resource_culinary_meat_fowl,
    resource_culinary_meat_dragon,
    resource_culinary_wildBerry,
    resource_culinary_goldenApple,
    // Gems and Jewels
    resource_gem_ruby,
    resource_gem_diamond,
    resource_jewel_ruby_perfect,
    // Slime Resources
    resource_slime_core,
    resource_slime_jelly,
    resource_giant_slime_core,
    resource_fire_slime_essence,
    // Alchemical Resources
    resource_alchemy_gland_fire_dragon,
    resource_ingredient_blood_dragon,
    resource_alchemy_emberRoot,
    // Misc Resources
    resource_goblin_ear,
    resource_mana_crystal,
    resource_gold_coins,
    // Natural Beast Drops
    resource_wolf_pelt,
    resource_wolf_fang,
    resource_wolf_meat,
    resource_bear_claw,
    resource_spider_silk,
    resource_venom_sac,
    // Humanoid Drops
    resource_crude_weapon,
    resource_occult_symbol,
    resource_spell_scroll,
    resource_soul_essence,
    // Magical Creature Drops
    resource_slime_residue,
    resource_ember_core,
    resource_fire_crystal,
    resource_chaos_fragment,
    // Mythical Beast Drops
    resource_griffin_feather,
    resource_wyvern_scale,
    resource_wyvern_venom_sac,
    resource_dragon_fang,
    // Undead and Spirit Drops
    resource_ectoplasm,
    resource_shadow_essence,
    resource_phylactery,
    // Eldritch/Otherworldly Drops
    resource_psychic_crystal,
    resource_void_essence,
    // Snake resources
    resource_snake_skin,
    resource_snake_fang,
    resource_giant_snake_skin,
    // Human
    resource_human_blood
};
