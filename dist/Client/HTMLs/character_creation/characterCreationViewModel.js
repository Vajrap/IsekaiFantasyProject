var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ClassEnum, RaceEnum, BackgroundEnum, CharacterCreationResponseStatus } from '../../../Common/RequestResponse/characterCreation.js';
import { characterCreationModel, matchBackground, matchClass, matchRace } from './characterCreationModel.js';
import { popup } from '../../classes/popup/popup.js';
class CharacterCreationViewModel {
    constructor() {
        this.getPortraitString = () => {
            return `${this.model.selectedGender}_${this.model.selectedRace}_${this.model.portraitNumber.toString()}`;
        };
        this.portraitL = () => {
            this.model.portraitL();
            this.updatePortrait();
        };
        this.portraitR = () => {
            this.model.portraitR();
            this.updatePortrait();
        };
        this.genderMale = () => {
            this.model.selectGender("MALE");
            this.updatePortrait();
            this.dom.genderMale.classList.add('active');
            this.dom.genderFemale.classList.remove('active');
        };
        this.genderFemale = () => {
            this.model.selectGender("FEMALE");
            this.updatePortrait();
            this.dom.genderFemale.classList.add('active');
            this.dom.genderMale.classList.remove('active');
        };
        this.createCharacterButtonPressed = () => __awaiter(this, void 0, void 0, function* () {
            const characterNameElement = document.getElementById('characterName');
            if (!characterNameElement) {
                console.error('Character name element not found');
                return;
            }
            if (characterNameElement.value.length < 3) {
                popup.show('อุ๊ปส์! ชื่อตัวละครสั้นเกินไป', 'ชื่อตัวละครต้องมีอย่างน้อย 3 ตัวอักษร', [{
                        label: 'ตกลง',
                        action: popup.hide.bind(popup)
                    }]);
            }
            const characterName = characterNameElement.value;
            let result = yield this.model.createCharacter(characterName, this.portrait);
            if (result.status === CharacterCreationResponseStatus.INVALID_NAME) {
                popup.show('อุ๊ปส์! ชื่อตัวละครไม่ถูกต้อง', result.message, [{
                        label: 'ตกลง',
                        action: popup.hide.bind(popup)
                    }]);
            }
            else if (result.status === CharacterCreationResponseStatus.SUCCESS) {
                // Redirect into Game
            }
        });
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
        this.portrait = `${this.model.selectedGender}_${this.model.selectedRace}_${this.model.portraitNumber.toString()}`;
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
    updateUI() {
        const formatNumber = (num) => num.toString().padStart(2, '0');
        // Generic function to update UI for a given type
        const updateValues = (type) => {
            for (const key in this.model[type]) {
                let elementID = `${key}Value`;
                let value = this.model[type][key];
                if (document.getElementById(elementID)) {
                    const element = document.getElementById(elementID);
                    if (element) {
                        element.textContent = formatNumber(value);
                    }
                }
            }
            let raceObj = matchRace(this.model.selectedRace);
            if (raceObj === undefined || raceObj === null) {
                console.error(`Invalid Race`);
                return;
            }
            let classObj = matchClass(this.model.selectedClass);
            if (classObj === undefined || classObj === null) {
                console.error(`Invalid Class`);
                return;
            }
            let backgroundObj = matchBackground(this.model.selectedBackground);
            if (backgroundObj === undefined || backgroundObj === null) {
                console.error(`Invalid Background`);
                return;
            }
            this.dom.raceDescription.innerHTML = raceObj.description;
            this.dom.classDescription.innerHTML = classObj.description;
            this.dom.backgroundDescription.innerHTML = backgroundObj.description;
            this.updatePortrait();
        };
        // Update attributes, proficiencies, and artisans
        updateValues("attributes");
        updateValues("proficiencies");
        updateValues("artisans");
    }
    initializeDOMElements() {
        // Selecting DOM elements
        this.dom = {
            prevPortrait: document.getElementById('prevPortrait'),
            nextPortrait: document.getElementById('nextPortrait'),
            genderMale: document.getElementById('genderMale'),
            genderFemale: document.getElementById('genderFemale'),
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
        this.dom.genderMale.addEventListener('click', this.genderMale);
        this.dom.genderFemale.addEventListener('click', this.genderFemale);
        this.dom.createCharacterButton.addEventListener('click', this.createCharacterButtonPressed);
        this.dom.statInfo_1.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        this.dom.statInfo_2.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        this.dom.statInfo_3.addEventListener('click', () => popup.show('ค่าสถานะตัวละคร', statusDescription));
        this.dom.raceSelection.addEventListener('change', (event) => {
            const target = event.target;
            if (target) {
                const selectedRaceKey = target.value;
                if (!(selectedRaceKey in RaceEnum)) {
                    console.error(`Invalid race selected: ${selectedRaceKey}`);
                    return;
                }
                this.model.selectRace(selectedRaceKey);
                this.updateUI();
            }
            else {
                console.error(`Invalid target: ${target}`);
            }
        });
        this.dom.classSelection.addEventListener('change', (event) => {
            const target = event.target;
            if (target) {
                const selectedClassKey = target.value;
                if (!(selectedClassKey in ClassEnum)) {
                    console.error(`Invalid class selected: ${selectedClassKey}`);
                    return;
                }
                this.model.selectClass(selectedClassKey);
                this.updateUI();
            }
            else {
                console.error(`Invalid target: ${target}`);
            }
        });
        this.dom.backgroundSelection.addEventListener('change', (event) => {
            const target = event.target;
            if (target) {
                const selectedBackgroundKey = target.value;
                if (!(selectedBackgroundKey in BackgroundEnum)) {
                    console.error(`Invalid background selected: ${selectedBackgroundKey}`);
                    return;
                }
                this.model.selectBackground(selectedBackgroundKey);
                this.updateUI();
            }
            else {
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
