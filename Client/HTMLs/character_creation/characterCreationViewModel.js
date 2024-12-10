const races = {
    raceHuman: raceHuman,
    raceElven: raceElven,
    raceOrc: raceOrc,
    raceTriton: raceTriton,
    raceDwarf: raceDwarf,
    raceHalfling: raceHalfling,
    raceHalfElf: raceHalfElf,
    raceHalfOrc: raceHalfOrc,
    raceHalfTriton: raceHalfTriton,
    raceDwarfling: raceDwarfling,
    raceElvon: raceElvon,
};

const classes = {
    classCleric: classCleric,
    classMage: classMage,
    classScout: classScout,
    classHexbinder: classHexbinder,
    classFighter: classFighter,
    classWarden: classWarden,
    classGuardian: classGuardian,
    classSpellblade: classSpellblade,
    classSkirmisher: classSkirmisher,
    classOccultist: classOccultist,
    classSoldier: classSoldier,
    classTemplar: classTemplar,
}

const backGrounds = {
    backgroundMageApprentice: backgroundMageApprentice,
    backgroundDesertedMilitary: backgroundDesertedMilitary,
    backgroundTavernBrawler: backgroundTavernBrawler,
    backgroundFallenNobility: backgroundFallenNobility,
    backgroundMercsChild: backgroundMercsChild,
    backgroundTraineeInCaravan: backgroundTraineeInCaravan,
    backgroundWanderingMusician: backgroundWanderingMusician,
    backgroundApprenticeScribe: backgroundApprenticeScribe,
    backgroundAbandonedFarmhand: backgroundAbandonedFarmhand,
    backgroundStreetUrchin: backgroundStreetUrchin,
    backgroundFailedCraftsman: backgroundFailedCraftsman,
    backgroundInnkeepersChild: backgroundInnkeepersChild,
}

class CharacterCreationViewModel {
    constructor() {
        this.model = characterCreationModel;
        this.initializeDOMElements();
        this.initializeEventListeners();
        this.currentPortrait = 1;

        // Bindings
        this.portraitL = this.portraitL.bind(this);
        this.portraitR = this.portraitR.bind(this);
        this.backgroundUpHandle = this.backgroundUpHandle.bind(this);
        this.backgroundDownHandle = this.backgroundDownHandle.bind(this);
        this.updateUI = this.updateUI.bind(this);
        this.createCharacterButtonPressed = this.createCharacterButtonPressed.bind(this);

        this.model.selectRace(raceHuman);
        this.model.selectClass(classCleric);
        this.model.selectBackground(backgroundMageApprentice);
        // Set initial UI
        this.updateUI();
    }

    initializeDOMElements() {
        // Selecting DOM elements
        this.dom = {
            prevPortrait: document.getElementById('prevPortrait'),
            nextPortrait: document.getElementById('nextPortrait'),
            characterPortrait: document.getElementById('characterPortrait'),
            createCharacterButton: document.getElementById('createCharacterButton'),
            internalSkillInfo: document.getElementById('internalSkill-info'),
            cardDeckInfo: document.getElementById('skill-info'),
            attributes: {
                strength: document.getElementById('strengthValue'),
                endurance: document.getElementById('enduranceValue'),
                breath: document.getElementById('breathValue'),
                planar: document.getElementById('planarValue'),
                dexterity: document.getElementById('dexterityValue'),
                agility: document.getElementById('agilityValue'),
                vitality: document.getElementById('vitalityValue'),
                willpower: document.getElementById('willpowerValue'),
                intelligence: document.getElementById('intelligenceValue'),
                leadership: document.getElementById('leadershipValue'),
                charisma: document.getElementById('charismaValue'),
                luck: document.getElementById('luckValue'),
            },
            proficiencies: {
                bareHand: document.getElementById('bareHandValue'),
                sword: document.getElementById('swordValue'),
                blade: document.getElementById('bladeValue'),
                dagger: document.getElementById('daggerValue'),
                spear: document.getElementById('spearValue'),
                axe: document.getElementById('axeValue'),
                mace: document.getElementById('maceValue'),
                shield: document.getElementById('shieldValue'),
                bow: document.getElementById('bowValue'),
                magicWand: document.getElementById('magicWandValue'),
                staff: document.getElementById('staffValue'),
                tome: document.getElementById('tomeValue'),
                orb: document.getElementById('orbValue'),
            },
            artisans: {
                mining: document.getElementById('miningValue'),
                smithing: document.getElementById('smithingValue'),
                woodCutting: document.getElementById('woodCuttingValue'),
                carpentry: document.getElementById('carpentryValue'),
                foraging: document.getElementById('foragingValue'),
                weaving: document.getElementById('weavingValue'),
                skinning: document.getElementById('skinningValue'),
                tanning: document.getElementById('tanningValue'),
                jewelry: document.getElementById('jewelryValue'),
                cooking: document.getElementById('cookingValue'),
                alchemy: document.getElementById('alchemyValue'),
                enchanting: document.getElementById('enchantingValue'),
            },
            statInfo_1: document.getElementById('stat-info-1'),
            statInfo_2: document.getElementById('stat-info-2'),
            statInfo_3: document.getElementById('stat-info-3'),

            raceSelection: document.getElementById('raceSelection'),
            classSelection: document.getElementById('classSelection'),
            backgroundSelection: document.getElementById('backgroundSelection'),
            raceDescription: document.getElementById('raceDescription'),
            classDescription: document.getElementById('classDescription'),
            backgroundDescription: document.getElementById('backgroundDescription'),
        };
    }

    initializeEventListeners() {
        this.dom.prevPortrait.addEventListener('click', this.portraitL);
        this.dom.nextPortrait.addEventListener('click', this.portraitR);
        this.dom.createCharacterButton.addEventListener('click', this.createCharacterButtonPressed);
        this.dom.statInfo_1.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        this.dom.statInfo_2.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        this.dom.statInfo_3.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        
        this.dom.raceSelection.addEventListener('change', (event) => {
            const selectedRaceKey = event.target.value; // Value now directly matches object key
            const raceObject = races[selectedRaceKey]; // Fetch the object from the `races` map
            if (raceObject) {
                this.model.selectRace(raceObject); // Pass the correct object
                this.updateUI();
            } else {
                console.error(`Race not found for: ${selectedRaceKey}`);
            }
        });
    
        this.dom.classSelection.addEventListener('change', (event) => {
            const selectedClass = event.target.value;
            const classObject = classes[selectedClass];
            this.model.selectClass(classObject); // Dynamically fetch class
            this.updateUI();
        });
    
        this.dom.backgroundSelection.addEventListener('change', (event) => {
            const selectedBackground = event.target.value;
            const backgroundObject = backGrounds[selectedBackground];
            this.model.selectBackground(backgroundObject);
            this.updateUI();
        });
    }

    portraitL() {
        if (this.currentPortrait === 1) {
            this.currentPortrait = 110;
        } else {
            this.currentPortrait -= 1;
        }
        document.getElementById('characterPortrait').src = `../../assets/portrait/m${this.currentPortrait}.png`
    }

    portraitR() {
        if (this.currentPortrait === 110) {
            this.currentPortrait = 1;
        } else {
            this.currentPortrait += 1;
        }
        document.getElementById('characterPortrait').src = `../../assets/portrait/m${this.currentPortrait}.png`
    }

    backgroundUpHandle() {
        const allBackgroundsAmount = characterBackgrounds.length;
        const currentBackgroundNumber = this.model.selectedBackground;
        if (currentBackgroundNumber === allBackgroundsAmount - 1) {
            this.model.selectedBackground = 0;
        }
        else {
            this.model.selectedBackground++;
        }
        this.updateUI();
    }

    backgroundDownHandle() {
        const allBackgroundsAmount = characterBackgrounds.length;
        const currentBackgroundNumber = this.model.selectedBackground;
        if (currentBackgroundNumber === 0) {
            this.model.selectedBackground = allBackgroundsAmount - 1;
        }
        else {
            this.model.selectedBackground--;
        }
        this.updateUI();
    }

    updateUI() {
        const formatNumber = (num) => num.toString().padStart(2, '0');
    
        // Generic function to update UI for a given type
        const updateValues = (type) => {
            for (const key in this.model[type]) {
                let elementID = `${key}Value`;
                let value = this.model[type][key];
                if (document.getElementById(elementID)) {
                    document.getElementById(elementID).textContent = formatNumber(value);
                }
            }

            this.dom.raceDescription.innerHTML = this.model.selectedRace.description;
            this.dom.classDescription.innerHTML = this.model.selectedClass.description;
            this.dom.backgroundDescription.innerHTML = this.model.selectedBackground.description
        };
    
        // Update attributes, proficiencies, and artisans
        updateValues("attributes");
        updateValues("proficiencies");
        updateValues("artisans");

        // Here we're update the Description in Race, Class and Background        
    }

    createCharacterButtonPressed() {
        const characterName = document.getElementById('characterName').value;
        const portrait = `m${this.currentPortrait}`;
        this.model.createCharacter(characterName, portrait);
    }
}

const characterCreationViewModel = new CharacterCreationViewModel();

const statusDescription = `
<div style="text-align: left;">
ตัวละครในเกมนี้ประกอบไปด้วยค่าต่าง ๆ (status) 3 ส่วนเป็นหลักได้แก่<br><br>
1. ค่าสถานะ (Attributes)<br>
  - ค่าสถานะของตัวละคร มีผลต่อการทำกิจกรรมต่าง ๆ จำนวนมากในเกมเช่นการต่อสู้ การใช้เวทย์มนต์และทักษะต่าง ๆ การเดินทาง การค้าขายพูดคุย และอื่น ๆ<br>ค่าสถานะเหล่านี้ส่งผลอย่างมากกับการใช้ชีวิตของตัวละครในเกม ดังนั้นจึงต้องสำรวจและทำความเข้าใจให้ดี<br><br>
2. ค่าความชำนาญ (Proficiencies) <br>
  - ค่าความชำนาญของตัวละครในการใช้อาวุธต่าง ส่งผลต่อความแม่นยำและพลังโจมตี<br><br>
3. ค่าอาชีพ (Artisans)<br>
  - ค่าความสามารถในการประกอบอาชีพต่าง ๆ ส่งผลในการหาวัตถุดิบและการผลิตอุปกรณ์เครื่องใช้ต่าง ๆ<br><br>

การทำสิ่งต่าง ๆ ในเกมนี้จะใช้ระบบลูกเต๋า (20หน้า) เป็นหลัก และค่าสถานะที่เกี่ยวข้องจะถูกนำไปเพิ่มให้กับค่าลูกเต๋าที่เราทอยได้ตามตารางนี้<br><br>

    <div style="text-align: center;">
    - ค่าตัวเลข 0-1: คะแนนจากการทอยลูกเต๋า -5<br>
    - ค่าตัวเลข 2-3: คะแนนจากการทอยลูกเต๋า -4<br>
    - ค่าตัวเลข 4-5: คะแนนจากการทอยลูกเต๋า -3<br>
    - ค่าตัวเลข 6-7: คะแนนจากการทอยลูกเต๋า -2<br>
    - ค่าตัวเลข 8-9: คะแนนจากการทอยลูกเต๋า -1<br>
    - ค่าตัวเลข 10-11: คะแนนจากการทอยลูกเต๋า 0<br>
    - ค่าตัวเลข 12-13: คะแนนจากการทอยลูกเต๋า +1<br>
    - ค่าตัวเลข 14-15: คะแนนจากการทอยลูกเต๋า +2<br>
    - ค่าตัวเลข 16-17: คะแนนจากการทอยลูกเต๋า +3<br>
    - ค่าตัวเลข 18-19: คะแนนจากการทอยลูกเต๋า +4<br>
    - ค่าตัวเลข 20-21: คะแนนจากการทอยลูกเต๋า +5<br>
    - ค่าตัวเลข 22-23: คะแนนจากการทอยลูกเต๋า +6<br>
    - ค่าตัวเลข 24-25: คะแนนจากการทอยลูกเต๋า +7<br>
    - ค่าตัวเลข 26-27: คะแนนจากการทอยลูกเต๋า +8<br>
    - ค่าตัวเลข 28-29: คะแนนจากการทอยลูกเต๋า +9<br>
    - ค่าตัวเลข 30: คะแนนจากการทอยลูกเต๋า +10
    </div>
</div>
`;

