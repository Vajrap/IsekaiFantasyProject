export class K {
    //Profession name
    static Fighter = 'Fighter';
    static Knight = 'Knight';
    static Paladin = 'Paladin';
    static RoyalGuard = 'Royal_Guard';
    static DarkKnight = 'Dark_Knight';
    static Warrior = 'Warrior';
    static Samurai = 'Samurai';
    static Gladiator = 'Gladiator';
    static Warlord = 'Warlord';
    static Berserker = 'Berserker';
    static Reaver = 'Reaver';
    static Demoniac = 'Demoniac';
    static Marauder = 'Marauder';
    static Thief = 'Thief';
    static Rogue = 'Rogue';
    static Phantom = 'Phantom';
    static Hunter = 'Hunter';
    static MasterThief = 'Master_Thief';
    static Assassin = 'Assassin';
    static Ninja = 'Ninja';
    static PoisonMaster = 'Poison_Master';
    static SilentBlade = 'Silent_Blade';
    static Swashbuckler = 'Swashbuckler';
    static Duelist = 'Duelist';
    static Pirate = 'Pirate';
    static Daredevil = 'Daredevil';
    static Mage = 'Mage';
    static Wizard = 'Wizard';
    static Elementalist = 'Elementalist';
    static Chronomancer = 'Chronomancer';
    static Archmage = 'Archmage';
    static Conjurer = 'Conjurer';
    static Summoner = 'Summoner';
    static Necromancer = 'Necromancer';
    static Channeller = 'Channeller';
    static BattleMage = 'Battle_Mage';
    static Warlock = 'Warlock';
    static MasterSwordMage = 'Master_Swordmage';
    static NullMage = 'Null_Mage';
    static Acolyte = 'Acolyte';
    static Cleric = 'Cleric';
    static HighPriest = 'High_Priest';
    static Escetic = 'Escetic';
    static Inquisitor = 'Inquisitor';
    static Scholar = 'Scholar';
    static RuneMaster = 'Rune_Master';
    static LoreMaster = 'Lore_Master';
    static Atheist = 'Atheist';
    static Occultist = 'Occultist';
    static DivineHarbinger = 'Divine_Harbinger';
    static ShadowSage = 'Shadow_Sage';
    static Heretic = 'Heretic';
    
    //stats
    static baseHP = 'baseHP';
    static baseMP = 'baseMP';
    static baseSP = 'baseSP';
    static bonusHP = 'bonusHP';
    static bonusMP = 'bonusMP';
    static bonusSP = 'bonusSP';
    static maxHP = 'maxHP';
    static maxMP = 'maxMP';
    static maxSP = 'maxSP';
    static currentHP = 'currentHP';
    static currentMP = 'currentMP';
    static currentSP = 'currentSP';

    static attributes = 'attributes';
    static attribute = 'attribute';
    static charisma = 'charisma'
    static luck = 'luck'
    static intellingence = 'intelligence'
    static leadership = 'leadership'
    static vitality = 'vitality'
    static willpower = 'willpower'
    static breath = 'breath'
    static planar = 'planar'
    static dexterity = 'dexterity'
    static agility = 'agility'
    static strength = 'strength'
    static endurance = 'endurance'

    static equipment = {
        armor: 'armor',
        equipment: 'equipment',
        headGear: 'headGear',
        bodyGear: 'bodyGear',
        accessory: 'accessory',
        legsGear: 'legsGear',
        boots: 'boots',
        gloves: 'gloves',
        weapon: 'weapon',
        mainHand: 'mainHand',
        offHand: 'offHand',
        sword: 'sword',
        blade: 'blade',
        spear: 'spear',
        axe: 'axe',
        bow: 'bow',
        dagger: 'dagger',
        magicWand: 'magicWand',
        staff: 'staff',
        tome: 'tome',
        orb: 'orb',
        mace: 'mace',
        shield: 'shield'
    }

    static buffsAndDebuffs = {
        //debuffs
        stun: 'stun',
        blind: 'blind',
        slow: 'slow',
        bleed: 'bleed',
        poison: 'poison',
        bound: 'bound',
        paralyse: 'paralyse',
        burn: 'burn',
        awed: 'awed',
        curse: 'curse',
        freeze: 'freeze',
        confuse: 'confuse',
        fear: 'fear',
        entangled: 'entangled',
        soaked: 'soaked',

        //buffs
        counterAttack_1: 'counterAttack_1',
        counterAttack_2: 'counterAttack_2',
        counterAttackCharge_1: 'counterAttackCharge_1',
        counterAttackCharge_2: 'counterAttackCharge_2',
        cautious: 'cautious',
        focus: 'focus',
        defend: 'defend',
        defensiveStance_1: 'defensiveStance_1',
        defensiveStance_2: 'defensiveStance_2',
        taunt: 'taunt',
        arcaneShield: 'arcaneShield',
        timeWarp: 'timeWarp',
        weaponMagicalCoating: 'weaponMagicalCoating',
        stealth: 'stealth',
        bless: 'bless',
        haste: 'haste',
        shielded: 'shielded',
        inspiration: 'inspiration',
        fightingSpirit_1: 'fightingSpirit_1',
        fightingSpirit_2: 'fightingSpirit_2',
        fightingSpirit_3: 'fightingSpirit_3',
        divineShield: 'divineShield',
        manaShield: 'manaShield',
        zealotsFury: 'zealotsFury',

        //internal
        lectioDivina_01: 'lectioDivina_01',
        lectioDivina_02: 'lectioDivina_02',
        lectioDivina_03: 'lectioDivina_03',
        aquaVitae_01: 'aquaVitae_01',
        aquaVitae_02: 'aquaVitae_02',
        aquaVitae_03: 'aquaVitae_03',
        aeromancy_01: 'aeromancy_01',
        aeromancy_02: 'aeromancy_02',
        aeromancy_03: 'aeromancy_03',
        eldritchHexBreathingTechnique_01: 'eldritchHexBreathingTechnique_01',
        eldritchHexBreathingTechnique_02: 'eldritchHexBreathingTechnique_02',
        eldritchHexBreathingTechnique_03: 'eldritchHexBreathingTechnique_03',
        pyromancy_01: 'pyromancy_01',
        pyromancy_02: 'pyromancy_02',
        pyromancy_03: 'pyromancy_03',
        geomancy_01: 'geomancy_01',
        geomancy_02: 'geomancy_02',
        geomancy_03: 'geomancy_03',
        innerFire_01: 'innerFire_01',
        innerFire_02: 'innerFire_02',
        innerFire_03: 'innerFIre_03'
    }
  
    static proficiencies = 'proficiencies';
    static proficiency = 'proficiency'
    static bareHand = 'bareHand'
    static sword = 'sword'
    static blade = 'blade'
    static spear = 'spear'
    static axe = 'axe'
    static bow = 'bow'
    static dagger = 'dagger'
    static magicWand = 'magicWand'
    static staff = 'staff'
    static tome = 'tome'
    static orb = 'orb'
    static mace = 'mace'
    
    static battlers = 'battlers'
    static battler = 'battler'
    static pATK = 'pATK'
    static pHIT = 'pHIT'
    static pDEF = 'pDEF'
    static pCRT = 'pCRT'
    static mATK = 'mATK'
    static mHIT = 'mHIT'
    static mDEF = 'mDEF'
    static mCRT = 'mCRT'
    static dodge = 'dodge'

    static elements = 'elements'
    static element = 'element'
    static none = 'none'
    static order = 'order'
    static chaos = 'chaos'
    static geo = 'geo'
    static water = 'water'
    static air = 'air'
    static fire = 'fire'
    static ice = 'ice'
    static spirit = 'spirit'
    static lightning = 'lightning'
    static demonic = 'demonic'
    static metal = 'metal'
    static angelic = 'angelic'
    static human = 'human'
    static ghost = 'ghost'
    static holy = 'holy'
    static life = 'life'
    static poison = 'poison'
    static dark = 'dark'

    //armorType
    static lightArmor = 'LightArmor';
    static mediumArmor = 'MediumArmor';
    static heavyArmor = 'HeavyArmor';
    //damageType
    
    //skillType
    static oneEnemyDamage = 'oneEnemyDamage'
    static oneConsecutiveRandomEnemyDamageNoRepeat = 'oneConsecutiveRandomEnemyDamageNoRepeat'
    static oneConsecutiveRandomEnemyDamageCanRepeat = 'oneConsecutiveRandomEnemyDamageCanRepeat'
    static allEnemyDamage = 'allEnemyDamage'

    static oneEnemyDebuff = 'oneEnemyDebuff'
    static allEnemyDebuff = 'allEnemyDebuff'

    static selfBuff = 'selfBuff'
    static selfDamage = 'selfDamage'

    static onePartyBuff = 'onePartyBuff'
    static allPartyBuff = 'allPartyBuff'

    //status effect
    static heal = 'heal'
    static passive = 'passive'

    //misc effect
    static stun = 'stun'//passed turn
    static blind = 'blind'//accuracy = 20
    static slow = 'slow' //abGauge / 2 need coding
    static haste = 'haste'//abGauge * 2 need coding
    static bleed = 'bleed'//hp - 3 * buffcount per turn

    //fighter
    static defensiveStance = 'defensiveStance' //self pDef + 2
    static taunt = 'taunt' //self taunt
    static weaponProficiency = 'weaponProficiency' //passive pAtk+2
    static boostDefense = 'boostDefense' //passive pDef+2, mDef+1

    //mage
    static magicBarrier = 'magicBarrier' //self
    static timeWarp = 'timeWarp' //self when check abGauge + 10
    static magicalCoating = 'magicalCoating' //self
    static arcaneKnowledge = 'arcaneKnowledge' //passive

    //thief
    static stealth = 'stealth' //self not targeted
    static backStab = 'backStab' //self atk+2, if stealth atk+5
    static evasiveMovement = 'evasiveMovement' //passive dodge+2 <-new stat in def
    static quickBody = 'quickBody' //passive speed+2
    static dexterityUp = 'dexterityUp' //passive dex+2
    static lucky = 'lucky' //passive luck+2
    
    //acolyte
    static bless = 'bless' //party/oneParty/self pDef+1 mDef+1 luk+2
    static enlightenment = 'enlightenment' //self aDARK +2 aHOLY +2
    static faithAndReason = 'faithAndReason' //passive wisdom+2 int+2
    static inspiration = 'inspiration' //passive mDef+2 mAtk+1


    //elemental effect
    static bounded = 'bounded'
    static soaked = 'soaked'
    static chilled = 'chilled'
    static disoriented = 'disoriented'
    static paralysed = 'paralysed'
    static burn = 'burn'
    static poisoned = 'poisoned'
    static entangled = 'entangled'
    static awed = 'awed'
    static cursed = 'cursed'
    //static 2nd tier effect
    static petrified = 'petrified'
    static drowned = 'drowned'
    static frozen = 'frozen'
    static confused = 'confused'
    static ignited = 'ignited'
    static discharge = 'discharge'
    static corrosion = 'corrosion'
    static overgrowth = 'overgrowth'
    static judged = 'judged'
    static fear = 'fear'
    //best combo
    static eruption = 'eruption' //earth-fire: oneTime, huge damage all enemy
    static frostbite = 'frostbite' // water-ice: duration, totally stop turn and take damage over time
    static thunderstorm = 'thunderstorm' // wind-thunder: oneTime, medium damage all enemy, small chance to stun all
    static poisonivy = 'poisonivy' // toxic-nature: duration, medium damage, and take damage over time
    static eclipsed = 'eclipsed' // dark-holy: chance to deal huge dark damage to enemy party or heal user’s party hugely
    
    //secret combo
    static primordialDepth = 'primordialDepth'//water-Dark: Drains enemy health and increases user's defense temporarily. 
    static holyLand = 'holyLand'//earth-holy Provides a temporary protective shield to the user's party. 
    static toxicExplosion = 'toxicExplosion'//fire-toxic Causes a powerful explosion, damaging all enemies and poisoning them. 
    static catastrophicHurricane  = 'catastrophicHurricane'//wind-nature dealing damage and reducing enemy accuracy. 
    static thunderSnow = 'thunderSnow'//ice-thunder, damaging enemies and causing paralysis. 
    
    
    //locations
    static tower = 'Tower'
    static inn = 'Inn'
    static shop = 'Shop'
    static temple = 'Temple'
    static castle = 'Castle'
    static trainingGround = 'TrainingGround'
    static library = 'Library'
    static thievesDen = 'ThievesDen'
    static ancientRuin = 'AncientRuin'
    static graveyard = 'Graveyard'
    static forbiddenForest = 'ForbiddenForest'
    static redvelvetLounge = 'RevelvetLounge'
    static pleasureCruise = 'PleasureCruise'
    static hotSpring = 'HotSpring'
    static residentialZone = 'ResidentialZone'
    static playerHouse = 'PlayerHouse'

    //traits
    static hardWorker = `Hard Worker`
    static haggler = `Haggler`
    static trainKnight = `Train With the Knights`
    static blacksmith = `Blacksmith Apprentice`
    static medicine = `Medicinal Knowledge`
    static devotee = `Devotee`
}

class Colors {
    static AzureWhale = '#3FB5D8'; // Some blue pastel color
    static VerdantDragon = '#52C66E'; // Some green pastel color
    static OnyxOx = '#563933'; // Some red pastel color
    static EmberBird = '#DC1414'; // Some orange pastel color
    static GoldenLion = '#f1c40f'; // Some yellow pastel color 

    static Characters = '#A57A54'; // Blue for characters
    static Items = '#2ecc71'; // Green for items
    static Events = '#e74c3c'; // Red for events
    static Romance = `#ff69b4`
}  