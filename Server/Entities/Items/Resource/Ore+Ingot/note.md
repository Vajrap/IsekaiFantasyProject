## Metal Resources

```yaml
# Ores
- name: Iron Ore
  type: ore
  rarity: common
  value: 40
  attributes:
    durability: 4
    weight: 4
    conductivity: 1
    flexibility: 2
- name: Copper Ore
  type: ore
  rarity: common
  value: 35
  attributes:
    durability: 2
    weight: 3
    conductivity: 4
    flexibility: 3
- name: Silver Ore
  type: ore
  rarity: uncommon
  value: 120
  attributes:
    durability: 2
    weight: 2
    conductivity: 5
    flexibility: 3
- name: Gold Ore
  type: ore
  rarity: rare
  value: 200
  attributes:
    durability: 1
    weight: 4
    conductivity: 5
    flexibility: 5
- name: Tin Ore
  type: ore
  rarity: common
  value: 25
  attributes:
    durability: 1
    weight: 2
    conductivity: 2
    flexibility: 4
- name: Zinc Ore
  type: ore
  rarity: common
  value: 30
  attributes:
    durability: 1
    weight: 3
    conductivity: 2
    flexibility: 2
- name: Lead Ore
  type: ore
  rarity: uncommon
  value: 32
  attributes:
    durability: 1
    weight: 5
    conductivity: 3
    flexibility: 5
- name: Nickel Ore
  type: ore
  rarity: uncommon
  value: 60
  attributes:
    durability: 3
    weight: 3
    conductivity: 3
    flexibility: 3

# Ingots
- name: Iron Ingot
  type: ingot
  source: Iron Ore
  rarity: common
  value: 80
  attributes:
    durability: 4
    weight: 4
    conductivity: 1
    flexibility: 2
- name: Copper Ingot
  type: ingot
  source: Copper Ore
  rarity: common
  value: 70
  attributes:
    durability: 2
    weight: 3
    conductivity: 4
    flexibility: 3
- name: Silver Ingot
  type: ingot
  source: Silver Ore
  rarity: uncommon
  value: 220
  attributes:
    durability: 2
    weight: 2
    conductivity: 5
    flexibility: 3
- name: Gold Ingot
  type: ingot
  source: Gold Ore
  rarity: rare
  value: 400
  attributes:
    durability: 1
    weight: 4
    conductivity: 5
    flexibility: 5
- name: Tin Ingot
  type: ingot
  source: Tin Ore
  rarity: common
  value: 45
  attributes:
    durability: 1
    weight: 2
    conductivity: 2
    flexibility: 4
- name: Zinc Ingot
  type: ingot
  source: Zinc Ore
  rarity: common
  value: 50
  attributes:
    durability: 1
    weight: 3
    conductivity: 2
    flexibility: 2
- name: Lead Ingot
  type: ingot
  source: Lead Ore
  rarity: uncommon
  value: 60
  attributes:
    durability: 1
    weight: 5
    conductivity: 3
    flexibility: 5
- name: Nickel Ingot
  type: ingot
  source: Nickel Ore
  rarity: uncommon
  value: 100
  attributes:
    durability: 3
    weight: 3
    conductivity: 3
    flexibility: 3

# Alloys
- name: Bronze
  type: alloy
  source: Copper Ingot + Tin Ingot
  rarity: uncommon
  value: 120
  attributes:
    durability: 3
    weight: 3
    conductivity: 3
    flexibility: 3
- name: Brass
  type: alloy
  source: Copper Ingot + Zinc Ingot
  rarity: uncommon
  value: 110
  attributes:
    durability: 2
    weight: 3
    conductivity: 3
    flexibility: 4
- name: Steel
  type: alloy
  source: Iron Ingot + Carbon (not listed)
  rarity: uncommon
  value: 180
  attributes:
    durability: 5
    weight: 4
    conductivity: 2
    flexibility: 3
- name: Pewter
  type: alloy
  source: Tin Ingot + Lead Ingot
  rarity: uncommon
  value: 65
  attributes:
    durability: 1
    weight: 3
    conductivity: 3
    flexibility: 4
- name: Electrum
  type: alloy
  source: Gold Ingot + Silver Ingot
  rarity: rare
  value: 300
  attributes:
    durability: 2
    weight: 3
    conductivity: 5
    flexibility: 4
- name: Rose Gold
  type: alloy
  source: Gold Ingot + Copper Ingot
  rarity: rare
  value: 320
  attributes:
    durability: 2
    weight: 3
    conductivity: 5
    flexibility: 5
```

Perfect—let’s give each ore and ingot a simple, game-usable personality. Here’s a concise table focusing on visuals, weight, value, and use for gameplay purposes:

⸻

🪨 Ores – Characteristics (Before Refining)

Ore	Visual	Weight	Hardness	Notes
Iron Ore	Dull gray-brown	Heavy	Hard	Common, useful for tools/armor
Copper Ore	Greenish veins	Medium	Soft	Early tools, conducts magic well
Silver Ore	Silvery sheen	Light	Soft	Valuable, used in holy gear
Gold Ore	Sparkling yellow	Heavy	Very soft	High value, low durability
Tin Ore	Pale gray	Light	Soft	Used in alloys
Zinc Ore	Dull gray-white	Medium	Brittle	Needed for brass
Lead Ore	Dark and oily	Very heavy	Very soft	Used in curses, dense gear
Nickel Ore	Shiny silver-gray	Medium	Medium	Useful in plating and coins



⸻

🔩 Ingots – Characteristics (Refined Form)

Ingot	Visual	Durability	Weight	Use Case
Iron	Matte gray	★★★★☆	Heavy	Standard weapons, armor
Copper	Reddish-orange	★★☆☆☆	Medium	Circuits, early tools
Silver	Bright silver	★★☆☆☆	Light	Jewelry, blessed weapons
Gold	Shiny yellow	★☆☆☆☆	Heavy	Currency, ornate gear
Tin	Dull gray	★☆☆☆☆	Light	Mixed into alloys
Zinc	Pale gray	★☆☆☆☆	Medium	Mixed into alloys
Lead	Dull and dark	★☆☆☆☆	Very heavy	Curse-focused items
Nickel	Polished silver	★★★☆☆	Medium	Coins, corrosion-resistant gear



⸻

🔧 Alloys – Gameplay Summary

Alloy	Durability	Use Case
Bronze	★★★☆☆	Sturdy tools, early armor
Brass	★★☆☆☆	Decorative, light tech gear
Steel	★★★★★	Best balance of durability and weight
Pewter	★☆☆☆☆	Trinkets, magical foci
Electrum	★★☆☆☆	Ancient currency, ritual gear
Rose Gold	★★☆☆☆	Elegant accessories, vanity gear



⸻

Want this in JSON or enum-compatible descriptions for use in your game code?