import { ClassEnum, RaceEnum, BackgroundEnum, CharacterCreationResponseStatus } from '../../../Common/RequestResponse/characterCreation.js';
import { characterCreationModel, CharacterCreationModel, matchBackground, matchClass, matchRace } from './characterCreationModel.js';
import { popup } from '../../classes/popup/popup.js';

class CharacterCreationViewModel {
    model: CharacterCreationModel;
    portrait: string;
    dom!: {
        prevPortrait: HTMLButtonElement;
        nextPortrait: HTMLButtonElement;
        genderMale: HTMLButtonElement;
        genderFemale: HTMLButtonElement;
        characterPortrait: HTMLImageElement;
        
        createCharacterButton: HTMLButtonElement;
        internalSkillInfo: HTMLDivElement;
        cardDeckInfo: HTMLDivElement;
        attributes: {
            strength: HTMLSpanElement;
            endurance: HTMLSpanElement;
            breath: HTMLSpanElement;
            planar: HTMLSpanElement;
            dexterity: HTMLSpanElement;
            agility: HTMLSpanElement;
            vitality: HTMLSpanElement;
            willpower: HTMLSpanElement;
            intelligence: HTMLSpanElement;
            leadership: HTMLSpanElement;
            charisma: HTMLSpanElement;
            luck: HTMLSpanElement;
        };
        proficiencies: {
            bareHand: HTMLSpanElement;
            sword: HTMLSpanElement;
            blade: HTMLSpanElement;
            dagger: HTMLSpanElement;
            spear: HTMLSpanElement;
            axe: HTMLSpanElement;
            mace: HTMLSpanElement;
            shield: HTMLSpanElement;
            bow: HTMLSpanElement;
            magicWand: HTMLSpanElement;
            staff: HTMLSpanElement;
            tome: HTMLSpanElement;
            orb: HTMLSpanElement;
        };
        artisans: {
            mining: HTMLSpanElement;
            smithing: HTMLSpanElement;
            woodCutting: HTMLSpanElement;
            carpentry: HTMLSpanElement;
            foraging: HTMLSpanElement;
            weaving: HTMLSpanElement;
            skinning: HTMLSpanElement;
            tanning: HTMLSpanElement;
            jewelry: HTMLSpanElement;
            cooking: HTMLSpanElement;
            alchemy: HTMLSpanElement;
            enchanting: HTMLSpanElement;
        };
        statInfo_1: HTMLDivElement;
        statInfo_2: HTMLDivElement;
        statInfo_3: HTMLDivElement;
        raceSelection: HTMLSelectElement;
        classSelection: HTMLSelectElement;
        backgroundSelection: HTMLSelectElement;
        raceDescription: HTMLDivElement;
        classDescription: HTMLDivElement;
        backgroundDescription: HTMLDivElement;
    }

    constructor() {
        this.model = characterCreationModel;
        this.initializeDOMElements();
        this.initializeEventListeners();

        // Bindings
        this.portraitL = this.portraitL.bind(this);
        this.portraitR = this.portraitR.bind(this);
        this.genderMale = this.genderMale.bind(this);
        this.genderFemale = this.genderFemale.bind(this);
        this.updateUI = this.updateUI.bind(this);
        this.createCharacterButtonPressed = this.createCharacterButtonPressed.bind(this);

        this.model.selectRace("HUMAN");
        this.model.selectClass("CLERIC");
        this.model.selectBackground("MAGE_APPRENTICE");
        this.model.selectGender("MALE");
        this.portrait = `${this.model.selectedGender}_${this.model.selectedRace}_${this.model.portraitNumber.toString()}`
        this.dom.genderMale.classList.add('active'); // Highlight male button

        // Set initial UI
   
        this.updateUI();
    }

    updatePortrait() {
        const string = this.getPortraitString();
        const src = `../../assets/portrait/${string}.png`;
        this.portrait = string;
        this.dom.characterPortrait.src = src;
    }

    getPortraitString = () => {
        return `${this.model.selectedGender}_${this.model.selectedRace}_${this.model.portraitNumber.toString()}`
    }

    portraitL = () => {
        this.model.portraitL();
        this.updatePortrait();
    }

    portraitR = () => {
        this.model.portraitR();
        this.updatePortrait();
    }

    genderMale = () => {
        this.model.selectGender("MALE")
        this.updatePortrait();

        this.dom.genderMale.classList.add('active');
        this.dom.genderFemale.classList.remove('active');
    }

    genderFemale = () => {
        this.model.selectGender("FEMALE")
        this.updatePortrait();

        this.dom.genderFemale.classList.add('active');
        this.dom.genderMale.classList.remove('active');
    }

    updateUI() {
        const formatNumber = (num: number) => num.toString().padStart(2, '0');
    
        // Generic function to update UI for a given type
        const updateValues = (type: keyof CharacterCreationModel) => {
            for (const key in this.model[type] as any) {
                let elementID = `${key}Value`;
                let value = (this.model[type] as any)[key];
                if (document.getElementById(elementID)) {
                    const element = document.getElementById(elementID);
                    if (element) {
                        element.textContent = formatNumber(value);
                    }
                }
            }

            let raceObj = matchRace(this.model.selectedRace);
            if (raceObj === undefined || raceObj === null) { console.error(`Invalid Race`); return; }
            let classObj = matchClass(this.model.selectedClass);
            if (classObj === undefined || classObj === null) { console.error(`Invalid Class`); return; }
            let backgroundObj = matchBackground(this.model.selectedBackground);
            if (backgroundObj === undefined || backgroundObj === null) { console.error(`Invalid Background`); return; }

            this.dom.raceDescription.innerHTML = raceObj.description;
            this.dom.classDescription.innerHTML = classObj.description;
            this.dom.backgroundDescription.innerHTML = backgroundObj.description

            this.updatePortrait();
        };
    
        // Update attributes, proficiencies, and artisans
        updateValues("attributes");
        updateValues("proficiencies");
        updateValues("artisans");
    }

    createCharacterButtonPressed = async() => {
        const characterNameElement = document.getElementById('characterName') as HTMLInputElement | null;

        if (!characterNameElement) {
            console.error('Character name element not found');
            return;
        }

        if (characterNameElement.value.length < 3) {
            popup.show(
                'อุ๊ปส์! ชื่อตัวละครสั้นเกินไป', 
                'ชื่อตัวละครต้องมีอย่างน้อย 3 ตัวอักษร', 
                [{ 
                    label:'ตกลง', 
                    action: popup.hide.bind(popup)
                }]
            )
        }

        const characterName = characterNameElement.value;

        let result = await this.model.createCharacter(characterName, this.portrait);
        if (result.status === CharacterCreationResponseStatus.INVALID_NAME) {
            popup.show(
                'อุ๊ปส์! ชื่อตัวละครไม่ถูกต้อง', 
                result.message, 
                [{ 
                    label:'ตกลง', 
                    action: popup.hide.bind(popup)
                }]
            );
        } else if (result.status === CharacterCreationResponseStatus.SUCCESS) {
            // Redirect into Game
        }
    }

    
    initializeDOMElements() {
        // Selecting DOM elements
        this.dom = {
            prevPortrait: document.getElementById('prevPortrait') as HTMLButtonElement,
            nextPortrait: document.getElementById('nextPortrait') as HTMLButtonElement,
            genderMale: document.getElementById('genderMale') as HTMLButtonElement,
            genderFemale: document.getElementById('genderFemale') as HTMLButtonElement,
            characterPortrait: document.getElementById('characterPortrait') as HTMLImageElement,
            createCharacterButton: document.getElementById('createCharacterButton') as HTMLButtonElement,
            internalSkillInfo: document.getElementById('internalSkill-info') as HTMLDivElement,
            cardDeckInfo: document.getElementById('skill-info') as HTMLDivElement,
            attributes: {
                strength: document.getElementById('strengthValue') as HTMLSpanElement,
                endurance: document.getElementById('enduranceValue') as HTMLSpanElement,
                breath: document.getElementById('breathValue') as HTMLSpanElement,
                planar: document.getElementById('planarValue') as HTMLSpanElement,
                dexterity: document.getElementById('dexterityValue') as HTMLSpanElement,
                agility: document.getElementById('agilityValue') as HTMLSpanElement,
                vitality: document.getElementById('vitalityValue') as HTMLSpanElement,
                willpower: document.getElementById('willpowerValue') as HTMLSpanElement,
                intelligence: document.getElementById('intelligenceValue') as HTMLSpanElement,
                leadership: document.getElementById('leadershipValue') as HTMLSpanElement,
                charisma: document.getElementById('charismaValue') as HTMLSpanElement,
                luck: document.getElementById('luckValue') as HTMLSpanElement,
            },
            proficiencies: {
                bareHand: document.getElementById('bareHandValue') as HTMLSpanElement,
                sword: document.getElementById('swordValue') as HTMLSpanElement,
                blade: document.getElementById('bladeValue') as HTMLSpanElement,
                dagger: document.getElementById('daggerValue') as HTMLSpanElement,
                spear: document.getElementById('spearValue') as HTMLSpanElement,
                axe: document.getElementById('axeValue') as HTMLSpanElement,
                mace: document.getElementById('maceValue') as HTMLSpanElement,
                shield: document.getElementById('shieldValue') as HTMLSpanElement,
                bow: document.getElementById('bowValue') as HTMLSpanElement,
                magicWand: document.getElementById('magicWandValue') as HTMLSpanElement,
                staff: document.getElementById('staffValue') as HTMLSpanElement,
                tome: document.getElementById('tomeValue') as HTMLSpanElement,
                orb: document.getElementById('orbValue') as HTMLSpanElement,
            },
            artisans: {
                mining: document.getElementById('miningValue') as HTMLSpanElement,
                smithing: document.getElementById('smithingValue') as HTMLSpanElement,
                woodCutting: document.getElementById('woodCuttingValue') as HTMLSpanElement,
                carpentry: document.getElementById('carpentryValue') as HTMLSpanElement,
                foraging: document.getElementById('foragingValue') as HTMLSpanElement,
                weaving: document.getElementById('weavingValue') as HTMLSpanElement,
                skinning: document.getElementById('skinningValue') as HTMLSpanElement,
                tanning: document.getElementById('tanningValue') as HTMLSpanElement,
                jewelry: document.getElementById('jewelryValue') as HTMLSpanElement,
                cooking: document.getElementById('cookingValue') as HTMLSpanElement,
                alchemy: document.getElementById('alchemyValue') as HTMLSpanElement,
                enchanting: document.getElementById('enchantingValue') as HTMLSpanElement,
            },
            statInfo_1: document.getElementById('stat-info-1') as HTMLDivElement,
            statInfo_2: document.getElementById('stat-info-2') as HTMLDivElement,
            statInfo_3: document.getElementById('stat-info-3') as HTMLDivElement,

            raceSelection: document.getElementById('raceSelection') as HTMLSelectElement,
            classSelection: document.getElementById('classSelection') as HTMLSelectElement,
            backgroundSelection: document.getElementById('backgroundSelection') as HTMLSelectElement,
            raceDescription: document.getElementById('raceDescription') as HTMLDivElement,
            classDescription: document.getElementById('classDescription') as HTMLDivElement,
            backgroundDescription: document.getElementById('backgroundDescription') as HTMLDivElement,
        };
    }

    initializeEventListeners() {
        this.dom.prevPortrait.addEventListener('click', this.portraitL);
        this.dom.nextPortrait.addEventListener('click', this.portraitR);
        this.dom.genderMale.addEventListener('click', this.genderMale);
        this.dom.genderFemale.addEventListener('click', this.genderFemale);
        this.dom.createCharacterButton.addEventListener('click', this.createCharacterButtonPressed);
        this.dom.statInfo_1.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        this.dom.statInfo_2.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        this.dom.statInfo_3.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        
        this.dom.raceSelection.addEventListener('change', (event) => {
            const target = event.target as HTMLSelectElement | null;
            if (target) {
                const selectedRaceKey = target.value as RaceEnum;
                if (!(selectedRaceKey in RaceEnum)) {
                    console.error(`Invalid race selected: ${selectedRaceKey}`);
                    return;
                }
                this.model.selectRace(selectedRaceKey);
                this.updateUI();
            } else {
                console.error(`Invalid target: ${target}`);
            }
        });
    
        this.dom.classSelection.addEventListener('change', (event) => {
            const target = event.target as HTMLSelectElement | null;
            if (target) {
                const selectedClassKey = target.value as ClassEnum;
                if (!(selectedClassKey in ClassEnum)) {
                    console.error(`Invalid class selected: ${selectedClassKey}`);
                    return;
                }
                this.model.selectClass(selectedClassKey);
                this.updateUI();
            } else {
                console.error(`Invalid target: ${target}`);
            }
        });
    
        this.dom.backgroundSelection.addEventListener('change', (event) => {
            const target = event.target as HTMLSelectElement | null;
            if (target) {
                const selectedBackgroundKey = target.value as BackgroundEnum;
                if (!(selectedBackgroundKey in BackgroundEnum)) {
                    console.error(`Invalid background selected: ${selectedBackgroundKey}`);
                    return;
                }
                this.model.selectBackground(selectedBackgroundKey);
                this.updateUI();
            } else {
                console.error(`Invalid target: ${target}`);
            }
        });
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

