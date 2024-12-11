import { ClassEnum, RaceEnum, BackgroundEnum, CharacterAttributesInterface, CharacterProficienciesInterface, CharacterArtisansInterface, CreateCharacterRequest, CreateCharacterResponse, CharacterCreationResponseStatus } from '../../../Common/RequestResponse/characterCreation.js';

// Races
const raceHuman = {
    attributes: {
        charisma: 6,
        luck: 6,
        intelligence: 6,
        leadership: 6,
        vitality: 6,
        willpower: 6,
        breath: 6,
        planar: 6,
        dexterity: 6,
        agility: 6,
        strength: 6,
        endurance: 6,
    },
    description: `มนุษย์ในเอเวอร์เมียร์มีความยืดหยุ่นและความหลากหลายในการดำรงชีวิต พวกเขาโดดเด่นในฐานะนักสำรวจ นักประดิษฐ์ และผู้ก่อตั้งชุมชนใหม่ ด้วยการปรับตัวที่รวดเร็วและความทะเยอทะยาน มนุษย์สามารถเติมเต็มบทบาทได้หลากหลาย ไม่ว่าจะเป็นนักรบ นักการทูต หรือพ่อค้า ความหลากหลายทางวัฒนธรรมทำให้มนุษย์เป็นผู้นำในการเชื่อมโยงและสร้างความสมดุลระหว่างเผ่าพันธุ์`
}

const raceElven = {
    attributes: {
        charisma: 7,
        luck: 6,
        intelligence: 7,
        leadership: 5,
        vitality: 5,
        willpower: 5,
        breath: 5,
        planar: 7,
        dexterity: 8,
        agility: 7,
        strength: 4,
        endurance: 5,
    },
    description: `เอลฟ์เป็นเผ่าพันธุ์ที่มีความสง่างามและสืบทอดมรดกทางวัฒนธรรมมายาวนาน พวกเขามีความเชื่อมโยงกับธรรมชาติอย่างลึกซึ้งและความสามารถในการใช้พลังธาตุที่โดดเด่น เอลฟ์บางกลุ่มมุ่งเน้นชีวิตที่กลมกลืนกับป่าไม้ ขณะที่บางกลุ่มเลือกพัฒนาเทคนิคการต่อสู้ที่เน้นความแม่นยำและความรวดเร็ว พวกเขาคือผู้พิทักษ์แห่งความสมดุลและวัฒนธรรมอันล้ำค่า`
}

const raceOrc = {
    attributes: {
        charisma: 5,
        luck: 6,
        intelligence: 5,
        leadership: 6,
        vitality: 8,
        willpower: 7,
        breath: 6,
        planar: 5,
        dexterity: 5,
        agility: 4,
        strength: 8,
        endurance: 7,
    },
    description: `ออร์คเป็นเผ่าพันธุ์ที่ให้ความสำคัญกับความแข็งแกร่งและความสามัคคีในชุมชน วัฒนธรรมของพวกเขาเต็มไปด้วยเกียรติยศและความจงรักภักดี ออร์คไม่ได้เป็นเพียงนักรบที่ทรงพลัง แต่ยังเป็นนักแก้ไขปัญหาที่มุ่งมั่นในวิทยาการและการพัฒนา อาณาเขตของพวกเขาเป็นทั้งศูนย์กลางการค้าและสถานที่ฝึกฝนที่มีชีวิตชีวา`
}

const raceTriton = {
    attributes: {
        charisma: 5,
        luck: 6,
        intelligence: 6,
        leadership: 4,
        vitality: 5,
        willpower: 5,
        breath: 7,
        planar: 7,
        dexterity: 8,
        agility: 7,
        strength: 5,
        endurance: 6,
    },
    description: `ไทรทันอาศัยอยู่ตามแนวชายฝั่งหรือใกล้แหล่งน้ำ ด้วยความสามารถในการกลั้นหายใจได้นานและความชำนาญในพลังธาตุ (Planar) พวกเขาโดดเด่นในบทบาทนักสำรวจ นักเดินเรือ และผู้พิทักษ์ชุมชนริมน้ำ ไทรทันมีวิถีชีวิตที่มุ่งเน้นการพึ่งพาสภาพแวดล้อมทางธรรมชาติและการปรับตัวในสถานการณ์ที่หลากหลาย`
};

const raceDwarf = {
    attributes: {
        charisma: 5,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 8,
        willpower: 7,
        breath: 6,
        planar: 4,
        dexterity: 5,
        agility: 4,
        strength: 7,
        endurance: 9,
    },
    description: `คนแคระเป็นเผ่าพันธุ์ที่เชี่ยวชาญด้านช่างฝีมือและการก่อสร้าง พวกเขาอาศัยอยู่ในภูเขาสูงและเครือข่ายเหมืองลึก สร้างสรรค์ผลงานที่ยืนยาวทั้งในด้านอาวุธและสถาปัตยกรรม วัฒนธรรมของคนแคระเน้นความขยันและความมุ่งมั่น ซึ่งทำให้พวกเขาเป็นพันธมิตรที่น่าเชื่อถือและผู้เชี่ยวชาญในสาขาที่พวกเขาเลือก`
};

const raceHalfling = {
    attributes: {
        charisma: 6,
        luck: 8,
        intelligence: 6,
        leadership: 5,
        vitality: 5,
        willpower: 5,
        breath: 6,
        planar: 5,
        dexterity: 8,
        agility: 8,
        strength: 5,
        endurance: 5,
    },
    description: `ฮาล์ฟลิ่งเป็นเผ่าพันธุ์ที่รักความเรียบง่ายและอิสระ พวกเขาอาศัยอยู่ในหมู่บ้านชนบทหรือเขตที่เต็มไปด้วยทุ่งหญ้า วิถีชีวิตของพวกเขาเน้นการร่วมมือในชุมชนและการพึ่งพาตนเอง ฮาล์ฟลิ่งมีความชำนาญในด้านการลอบเร้นและการสำรวจ ทำให้พวกเขาเป็นนักผจญภัยและนักการทูตที่มีประสิทธิภาพ`
};

const raceHalfElf = {
    attributes: {
        charisma: 7,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 5,
        willpower: 6,
        breath: 6,
        planar: 7,
        dexterity: 7,
        agility: 6,
        strength: 5,
        endurance: 6,
    },
    description: `ฮาล์ฟเอลฟ์คือผู้ที่ผสมผสานมรดกของมนุษย์และเอลฟ์ไว้ในตัวเอง พวกเขามักมีมุมมองที่เป็นเอกลักษณ์ต่อโลก และสามารถปรับตัวได้ในหลากหลายวัฒนธรรม ความสามารถในการดึงจุดแข็งของทั้งสองเผ่าพันธุ์ทำให้พวกเขาเป็นนักสำรวจที่มีความคิดสร้างสรรค์ หรือผู้นำที่เชื่อมโยงชุมชนต่าง ๆ เข้าด้วยกัน`
};

const raceHalfOrc = {
    attributes: {
        charisma: 5,
        luck: 6,
        intelligence: 6,
        leadership: 6,
        vitality: 7,
        willpower: 6,
        breath: 6,
        planar: 5,
        dexterity: 6,
        agility: 5,
        strength: 7,
        endurance: 7,
    },
    description: `ฮาล์ฟออร์คเป็นที่รู้จักในด้านความกล้าหาญและพลังอันยิ่งใหญ่ที่มาพร้อมกับความยืดหยุ่นของมนุษย์ พวกเขามักแสวงหาความสมดุลระหว่างเกียรติยศของออร์คและความทะเยอทะยานของมนุษย์ ฮาล์ฟออร์คสามารถเป็นทั้งนักรบที่ดุดันและนักแก้ไขปัญหาที่ใช้ไหวพริบเพื่อสร้างโอกาสในสังคม`
};

const raceHalfTriton = {
    attributes: {
        charisma: 6,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 6,
        willpower: 5,
        breath: 7,
        planar: 6,
        dexterity: 7,
        agility: 7,
        strength: 6,
        endurance: 6,
    },
    description: `ฮาล์ฟไทรทันเป็นผู้ที่ผสมผสานความสามารถในการสำรวจและความเชื่อมโยงกับธรรมชาติของไทรทันเข้ากับความหลากหลายของมนุษย์ พวกเขาเป็นนักเดินเรือและผู้พิทักษ์ชุมชนที่มีวิสัยทัศน์กว้างไกล ด้วยความสามารถเฉพาะตัว ฮาล์ฟไทรทันมักจะมีบทบาทสำคัญในการสร้างเส้นทางใหม่หรือการปกป้องทรัพยากรที่สำคัญ`
};

const raceDwarfling = {
    attributes: {
        charisma: 6,
        luck: 7,
        intelligence: 6,
        leadership: 5,
        vitality: 6,
        willpower: 6,
        breath: 6,
        planar: 4,
        dexterity: 6,
        agility: 6,
        strength: 7,
        endurance: 7,
    },
    description: `ดวอร์ฟลิ่งเป็นเผ่าพันธุ์ที่สืบทอดความขยันและความแม่นยำของคนแคระ พร้อมกับความกระฉับกระเฉงของฮาล์ฟลิ่ง พวกเขามักโดดเด่นในฐานะช่างฝีมือหรือผู้สร้างสรรค์ที่ผสานความละเอียดและความยืดหยุ่นได้อย่างสมดุล ดวอร์ฟลิ่งคือผู้เชื่อมโยงวิทยาการกับชีวิตประจำวันที่ลงตัว`
};

const raceElvon = {
    attributes: {
        charisma: 7,
        luck: 6,
        intelligence: 6,
        leadership: 5,
        vitality: 5,
        willpower: 6,
        breath: 6,
        planar: 7,
        dexterity: 7,
        agility: 7,
        strength: 5,
        endurance: 5,
    },
    description: `เอลวอนเป็นเอลฟ์สายพิเศษที่พัฒนาความชำนาญในพลังธาตุให้สอดคล้องกับการใช้ชีวิตแบบนักสำรวจ พวกเขาเชี่ยวชาญการควบคุมพลังงานธรรมชาติในแบบที่ผสมผสานกับศาสตร์การต่อสู้ เอลวอนมักมีบทบาทสำคัญในฐานะผู้รักษาหรือผู้พิทักษ์ทรัพยากรธรรมชาติในช่วงเวลาสำคัญ`
};

// Class
const classCleric = {
    attributes: {
        willpower: 1,
    },
    proficiencies: {
        mace: 1,
        shield: 2,
    },
    description: `
            <strong>นักบวช</strong>: นักบวชผู้เชี่ยวชาญในการรักษาและสนับสนุนเพื่อนร่วมทีมในยามสงคราม พวกเขาเป็นแสงสว่างในความมืดที่ปกป้องและชุบชีวิต
            <br/><br/>
            <strong>ทักษะเริ่มต้น:</strong>
            <ul>
                <li>เพลิงศักดิ์สิทธิ์ (Divine Flame)</li>
                <li>พร (Bless)</li>
                <li>รักษา (Heal)</li>
            </ul>
            <br/>
            <strong>อุปกรณ์เริ่มต้น:</strong>
            <ul>
                <li>ไม้เท้าสั้น (Quarterstaff)</li>
                <li>เกราะหนังเบา (Light Leather Armor)</li>
            </ul>
            `
}

const classMage = {
    attributes: {
        planar: 1,
    },
    proficiencies: {
        magicWand: 2,
        tome: 1,
    },
    description: `
            <strong>จอมเวท</strong>: จอมเวทที่ควบคุมพลังแห่งธาตุเพื่อโจมตีและควบคุมศัตรูในสนามรบ พวกเขาเป็นตัวแทนของความรู้และพลังอันไร้ขีดจำกัด
            <br/><br>
            <strong>ทักษะเริ่มต้น:</strong>
            <ul>
                <li>ลูกธนูเวทมนตร์ (Arcane Bolt)</li>
                <li>ลูกไฟ (Fireball)</li>
            </ul>
            <br/>
            <strong>อุปกรณ์เริ่มต้น:</strong>
            <ul>
                <li>ไม้กายสิทธิ์ (Magic Wand)</li>
                <li>ผ้าไหม (Silk Cloth)</li>
            </ul>
        `
}

const classScout = {
    attributes: {
        dexterity: 1,
    },
    proficiencies: {
        bow: 1,
        dagger: 2,
    },
    description: `
            <strong>นักสอดแนม</strong>: นักสอดแนมผู้คล่องตัวและมีไหวพริบสูง เชี่ยวชาญการต่อสู้จากระยะไกลและการสำรวจพื้นที่
            <br/><br/>
            <strong>ทักษะเริ่มต้น:</strong>
            <ul>
                <li>ยิงโจมตี (Aimed Attack)</li>
            </ul>
            <br/>
            <strong>อุปกรณ์เริ่มต้น:</strong>
            <ul>
                <li>ธนูสั้น (Short Bow)</li>
                <li>เกราะหนังเบา (Light Leather Armor)</li>
            </ul>
        `
}

const classHexbinder = {
    attributes: {
        planar: 1,
    },
    proficiencies: {
        orb: 1,
        staff: 2,
    },
    description: `
            <strong>นักผูกคำสาป</strong>: นักผูกคำสาปที่ใช้พลังมืดเพื่อควบคุมศัตรูและเสริมสร้างพลังของตัวเอง
            <br/><br/>
            <strong>ทักษะเริ่มต้น:</strong>
            <ul>
                <li>ระเบิดเอลดริช (Eldritch Blast)</li>
                <li>คำสาป (Curse)</li>
                <li>สัมผัสเย็นชา (Chill Touch)</li>
            </ul>
            <br/>
            <strong>อุปกรณ์เริ่มต้น:</strong>
            <ul>
                <li>ลูกแก้ว (Orb)</li>
                <li>เกราะหนังเบา (Light Leather Armor)</li>
            </ul>
        `
}

const classFighter = {
    attributes: {
        strength: 1,
    },
    proficiencies: {
        sword: 2,
        shield: 1,
    },
    description: `
    <strong>นักรบ</strong>: นักรบมีความสมดุลในพลังและการป้องกัน เหมาะสำหรับการต่อสู้ระยะประชิด
    <br/><br/>
    <strong>ทักษะเริ่มต้น:</strong>
    <ul>
        <li>โจมตีอย่างแรง (Power Strike)</li>
    </ul>
    <br/>
    <strong>อุปกรณ์เริ่มต้น:</strong>
    <ul>
        <li>ดาบยาวสัมฤทธิ์ (Bronze Long Sword)</li>
        <li>เกราะหนังเบา (Light Leather Armor)</li>
    </ul>
`
}

const classWarden = {
    attributes: {
        breath: 1,
    },
    proficiencies: {
        axe: 1,
        spear: 2,
    },
    description: `
            <strong>วอร์เดน</strong>: วอร์เดนคือผู้เชี่ยวชาญในการต่อสู้ในสนามรบและการปกป้องทรัพยากรธรรมชาติ พวกเขาเป็นผู้คล่องตัวและมีความแข็งแกร่งในการต่อสู้
            <br/><br/>
            <strong>ทักษะเริ่มต้น:</strong>
            <ul>
                <li>ดาวพระพริบ (Starry Wisp)</li>
                <li>เถาวัลย์ (Entangle)</li>
                <li>เจริญงอกงาม (Rejuvenate)</li>
            </ul>
            <br/>
            <strong>อุปกรณ์เริ่มต้น:</strong>
            <ul>
                <li>หอกทองแดงเล็ก (Bronze Dory)</li>
                <li>ผ้าไหม (Silk Cloth)</li>
            </ul>
        `
}

const classGuardian = {
    attributes: {
        endurance: 1,
    },
    proficiencies: {
        mace: 2,
        shield: 1,
    },
    description: `
            <strong>ผู้พิทักษ์</strong>: ผู้พิทักษ์ผู้ยืนหยัดปกป้องทีมและทนต่อการโจมตีอย่างหนัก
            <br/><br/>
            <strong>ทักษะเริ่มต้น:</strong>
            <ul>
                <li>ยั่วยุ (Taunt)</li>
                <li>ตอบโต้การโจมตี (Counter Attack)</li>
            </ul>
            <br/>
            <strong>อุปกรณ์เริ่มต้น:</strong>
            <ul>
                <li>ดาบสั้นสัมฤทธิ์ (Bronze Short Sword)</li>
                <li>โล่กลมไม้ (Wooden Round Shield)</li>
                <li>เกราะหนังเบา (Light Leather Armor)</li>
            </ul>
        `
}

const classSpellblade = {
    attributes: {
        planar: 1,
    },
    proficiencies: {
        blade: 1,
        magicWand: 2,
    },
    description: `
            <strong>นักดาบเวท</strong>: นักดาบเวทผู้ผสมผสานการต่อสู้และการใช้พลังเวทย์ในการโจมตีศัตรู พวกเขาเป็นผู้ที่มีความคล่องตัวและมีความแม่นยำในการโจมตี
            <br/><br/>
            <strong>ทักษะเริ่มต้น:</strong>
            <ul>
                <li>ดาบเวทย์ (Arcane Blade)</li>
                <li>สัญชาติญาณเวทย์ (Mage Reflex)</li>
                <li>ฝ่ามือช๊อค (Shocking Grasp)</li>
            </ul>
            <br/>
            <strong>อุปกรณ์เริ่มต้น:</strong>
            <ul>
                <li>ดาบสั้นสัมฤทธิ์ (Bronze Scimitar)</li>
                <li>เกราะหนังเบา (light leather armor)</li>
            </ul>
        `
}

const classSkirmisher = {
    attributes: {
        agility: 1,
    },
    proficiencies: {
        dagger: 1,
        bareHand: 2,
    },
    description: `
        <strong>นักลอบโจมตี</strong>: นักลอบโจมตีที่คล่องแคล่วและร้ายกาจ เหมาะสำหรับการโจมตีศัตรูในจุดที่ไม่ทันตั้งตัว
        <br/><br/>
        <strong>ทักษะเริ่มต้น:</strong>
        <ul>
            <li>การลอบเร้น (Stealth)</li>
            <li>แทงหลัง (Backstab)</li>
        </ul>
        <br/>
        <strong>อุปกรณ์เริ่มต้น:</strong>
        <ul>
            <li>มีดสั้นทองแดง (Bronze Dirk)</li>
            <li>เกราะหนังเบา (Light Leather Armor)</li>
        </ul>
    `
};

const classOccultist = {
    attributes: {
        planar: 1,
    },
    proficiencies: {
        tome: 1,
        orb: 2,
    },
    description: `
        <strong>นักอาคม</strong>: นักอาคมผู้ศึกษาพลังลึกลับเพื่อควบคุมและเสริมสร้างพลังของตัวเอง
        <br/><br/>
        <strong>ทักษะเริ่มต้น:</strong>
        <ul>
            <li>ไฟปีศาจ (Demonic Fire)</li>
            <li>เสริมพลังปีศาจ (Demonic Empowerment)</li>
        </ul>
        <br/>
        <strong>อุปกรณ์เริ่มต้น:</strong>
        <ul>
            <li>คัมภีร์เวทมนตร์ (Grimoire)</li>
            <li>ผ้าไหม (Silk Cloth)</li>
        </ul>
    `
};

const classSoldier = {
    attributes: {
        vitality: 1,
    },
    proficiencies: {
        spear: 2,
        axe: 1,
    },
    description: `
        <strong>ทหาร</strong>: ทหารผู้มีความแข็งแกร่งและวินัยในสนามรบ เชี่ยวชาญการใช้อาวุธหลากหลายประเภท
        <br/><br/>
        <strong>ทักษะเริ่มต้น:</strong>
        <ul>
            <li>กระแทกด้วยโล่ (Shield Bash)</li>
            <li>ตั้งท่าป้องกัน (Defensive Stance)</li>
        </ul>
        <br/>
        <strong>อุปกรณ์เริ่มต้น:</strong>
        <ul>
            <li>ดาบสั้นสัมฤทธิ์ (Bronze Short Sword)</li>
            <li>โล่บัคเลอร์ไม้ (Wooden Buckler)</li>
            <li>เกราะหนังเบา (Light Leather Armor)</li>
        </ul>
    `
};

const classTemplar = {
    attributes: {
        charisma: 1,
    },
    proficiencies: {
        sword: 2,
        shield: 1,
    },
    description: `
        <strong>เทมพลาร์</strong>: นักรบผู้ใช้พลังแห่งแสงเพื่อปกป้องและเสริมสร้างพลังของทีม
        <br/><br/>
        <strong>ทักษะเริ่มต้น:</strong>
        <ul>
            <li>สไมท์ (Smite)</li>
            <li>อวยพร (Bless)</li>
            <li>รักษา (Heal)</li>
        </ul>
        <br/>
        <strong>อุปกรณ์เริ่มต้น:</strong>
        <ul>
            <li>กระบองสัมฤทธิ์ (Bronze Club)</li>
            <li>โล่บัคเลอร์ไม้ (Wooden Buckler)</li>
            <li>เกราะหนังเบา (Light Leather Armor)</li>
        </ul>
    `
};

//Background
const backgroundMageApprentice = {
    attributes: {
        intelligence: 1,
    },
    proficiencies: {},
    artisans: {},
    description: `
        <strong>เด็กฝึกเวทย์</strong>: คุณเคยเป็นเด็กฝึกเวทย์ที่ได้รับการฝึกฝนจากอาจารย์ผู้มีชื่อเสียง แต่วันหนึ่งอาจารย์ของคุณหายตัวไปอย่างไร้ร่องรอย ทิ้งคำถามมากมายและความฝันที่ยังไม่สมบูรณ์ไว้ คุณต้องออกเดินทางเพื่อตามหาคำตอบและเติมเต็มเส้นทางเวทย์มนตร์ด้วยตัวเอง
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>ผู้เรียนรู้เร็ว (Quick Learner): ค่าประสบการ์ณที่ได้รับจากการเรียนเพิ่มขึ้น 1d4</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การเล่นแร่แปรธาตุ: 2</li>
            <li>การเสริมพลังเวทย์: 1</li>
        </ul>
    `
};

const backgroundDesertedMilitary = {
    attributes: {
        strength: 1,
    },
    proficiencies: {},
    artisans: {},
    description: `
        <strong>ทหารหนีทัพ</strong>: คุณเคยเป็นทหารผู้ภักดีในสนามรบ แต่สงครามที่โหดร้ายสร้างบาดแผลในใจจนคุณตัดสินใจละทิ้งหน้าที่และหาหนทางชีวิตใหม่ที่อิสระจากอดีต
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>ร่างกายแข็งแรง (Tough Body): ค่าปรับปรุงจากการทอย Save ความอดทน + 1 </li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การตีเหล็ก: 1</li>
            <li>การเก็บของป่า: 1</li>
            <li>การทำอาหาร: 1</li>
        </ul>
    `
};

const backgroundTavernBrawler = {
    attributes: {
        agility: 1,
    },
    proficiencies: {},
    artisans: {},
    description: `
        <strong>นักสู้ในร้านเหล้า</strong>: ชีวิตในร้านเหล้าสอนให้คุณรู้จักการต่อสู้โดยไร้กฎเกณฑ์ คุณรอดพ้นจากสถานการณ์ลำบากและฝึกฝนจนกลายเป็นคนแข็งแกร่ง ทั้งทางร่างกายและจิตใจ ตอนนี้คุณพร้อมจะเริ่มต้นใหม่เพื่อค้นหาสิ่งที่ดีกว่าในชีวิต
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>การโจมตีที่แม่นยำ (Focused Strike): เมื่อใช้อาวุธที่มีลักษณะ "ขนาดเล็ก" ความแม่นยำเพิ่มขึ้น +1</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การทำอาหาร: 2</li>
            <li>การลอกหนังสัตว์: 1</li>
        </ul>
    `
};

const backgroundFallenNobility = {
    attributes: {
        charisma: 1,
    },
    proficiencies: {},
    artisans: {},
    description: `
        <strong>ลูกหลานตระกูลดัง</strong>: ครั้งหนึ่งคุณเคยใช้ชีวิตหรูหราในคฤหาสน์ แต่หลังจากครอบครัวล่มสลาย คุณต้องเผชิญกับความลำบาก แม้ว่าจะสูญเสียทุกสิ่ง แต่คุณยังคงยึดมั่นในศักดิ์ศรีและความหวังเพื่อสร้างอนาคตใหม่
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>เสน่ห์ทางสังคม (Social Charm): ค่าปรับปรุงการทอยสเน่ห์ + 1</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การทำเครื่องประดับ: 1</li>
            <li>การทอผ้า: 1</li>
            <li>การเล่นแร่แปรธาตุ: 1</li>
        </ul>
    `
};

const backgroundMercsChild = {
attributes: {
        dexterity: 1,
    },
    proficiencies: {},
    artisans: {},
    description: `
        <strong>ลูกทหารรับจ้าง</strong>: ในวัยเด็ก คุณเดินทางไปกับกองทหารรับจ้างที่ต่อสู้เพื่อทองคำมากกว่าความเชื่อ คุณเรียนรู้ศิลปะแห่งสงครามและการเอาตัวรอด แต่เมื่อถึงเวลา คุณตัดสินใจสร้างชื่อเสียงของตัวเองในแบบที่แตกต่าง
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>เกิดมาเพื่อเอาตัวรอด (Born Survivor): ค่าปรับปรุงการทอยสุขภาพ + 1</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การตีเหล็ก: 2</li>
            <li>การฟอกหนัง: 1</li>
        </ul>
    `
};

const backgroundTraineeInCaravan = {
    attributes: {
        luck: 1,
    },
    proficiencies: {},
    artisans: {},
    description: `
        <strong>เด็กฝึกงานในขบวนพ่อค้า</strong>: การเดินทางไปกับขบวนพ่อค้าเต็มไปด้วยบทเรียนและความเสี่ยง คุณเห็นโลกที่กว้างใหญ่และท้าทาย แต่เมื่อโตขึ้น คุณเลือกที่จะละทิ้งชีวิตเร่ร่อนเพื่อค้นหาสิ่งที่ยั่งยืนกว่า
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>ใส่ใจในรายละเอียด (Attentive): ค่าปรับปรุงการระบุไอเทม + 1</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การตัดไม้: 1</li>
            <li>การสร้างไม้: 2</li>
        </ul>
    `
};

const backgroundWanderingMusician = {
    attributes: {
        charisma: 1,
    },
    proficiencies: {},
    artisans: {
        weaving: 1,
        enchanting: 1,
        cooking: 1,
    },
    description: `
        <strong>นักดนตรีพเนจร</strong>: คุณเดินทางผ่านหมู่บ้านและเมืองด้วยเสียงเพลงในใจและเครื่องดนตรีในมือ สร้างความสุขให้ผู้คนรอบตัว แต่การเดินทางที่ไม่มีจุดหมายทำให้คุณเหนื่อยล้า คุณจึงตัดสินใจค้นหาความหมายที่ลึกซึ้งกว่าในชีวิต
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>เสน่ห์สังคม (Social Charm): เพิ่มเสน่ห์ทางสังคม</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การทอผ้า: 1</li>
            <li>การร่ายมนตร์: 1</li>
            <li>การทำอาหาร: 1</li>
        </ul>
    `,
};

const backgroundApprenticeScribe = {
    attributes: {
        intelligence: 1,
    },
    proficiencies: {},
    artisans: {
        enchanting: 1,
        weaving: 1,
        alchemy: 1,
    },
    description: `
        <strong>ผู้ช่วยจดบันทึก</strong>: คุณเคยเป็นผู้ช่วยในหอสมุดที่มีหน้าที่คัดลอกตำรา แม้ว่าคุณจะมีความรู้ทางทฤษฎีมากมาย แต่ยังไม่เคยมีโอกาสนำไปใช้ในชีวิตจริง
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>ใส่ใจในรายละเอียด (Attentive): เพิ่มความสามารถในการศึกษา</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การร่ายมนตร์: 1</li>
            <li>การทอผ้า: 1</li>
            <li>การปรุงยา: 1</li>
        </ul>
    `,
};

const backgroundAbandonedFarmhand = {
    attributes: {
        strength: 1,
    },
    proficiencies: {},
    artisans: {
        foraging: 2,
        cooking: 1,
    },
    description: `
        <strong>เด็กฟาร์มที่ถูกทอดทิ้ง</strong>: คุณเคยทำงานในฟาร์มเล็กๆ ในหมู่บ้านห่างไกล แต่เมื่อฟาร์มล่มสลาย คุณต้องออกเดินทางเพื่อหาชีวิตใหม่และโอกาสที่ดีกว่า
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>ขยันขันแข็ง (Hard Worker): เพิ่มความสามารถในการทำงาน</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การหาอาหาร: 2</li>
            <li>การทำอาหาร: 1</li>
        </ul>
    `,
};

const backgroundStreetUrchin = {
    attributes: {
        dexterity: 1,
    },
    proficiencies: {},
    artisans: {
        skinning: 1,
        foraging: 1,
        weaving: 1,
    },
    description: `
        <strong>เด็กเร่ร่อนในเมือง</strong>: เติบโตบนถนนในเมืองหลวง คุณต้องขโมยอาหารเพื่อเอาตัวรอดในวัยเด็ก ความฉลาดแกมโกงช่วยให้คุณรอดมาได้ แม้ว่าชีวิตจะยังคงไม่มั่นคง
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>เดินเบา (Light Walker): เพิ่มความสามารถในการหลบหลีก</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การลอกหนัง: 1</li>
            <li>การหาอาหาร: 1</li>
            <li>การทอผ้า: 1</li>
        </ul>
    `,
};

const backgroundFailedCraftsman = {
    attributes: {
        dexterity: 1,
    },
    proficiencies: {},
    artisans: {
        woodcutting: 2,
        carpentry: 1,
    },
    description: `
        <strong>ช่างฝึกหัดที่ล้มเหลว</strong>: คุณพยายามฝึกฝนเป็นช่างไม้ในหมู่บ้าน แต่ขาดความสามารถที่จะทำสำเร็จ ตอนนี้คุณตัดสินใจลองสิ่งใหม่ๆ ในชีวิตเพื่อความหวังและโอกาส
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>มุ่งมั่น (Determined): เพิ่มพลังใจในการทำงาน</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การตัดไม้: 2</li>
            <li>การสร้างไม้: 1</li>
        </ul>
    `,
};

const backgroundInnkeepersChild = {
    attributes: {
        charisma: 1,
    },
    proficiencies: {},
    artisans: {
        cooking: 1,
        weaving: 1,
        jewelry: 1,
    },
    description: `
        <strong>ลูกเจ้าของโรงแรม</strong>: คุณเติบโตในโรงแรมเล็กๆ ที่ไม่มีชื่อเสียงในหมู่บ้าน ความรู้ในการจัดการงานครัวและดูแลผู้คนช่วยให้คุณมีพื้นฐานที่แข็งแกร่งสำหรับอนาคต
        <br/><br/>
        <strong>ลักษณะพิเศษ:</strong>
        <ul>
            <li>ก้าวสมดุล (Balanced Step): เพิ่มความมั่นคงในการเคลื่อนไหว</li>
        </ul>
        <br/>
        <strong>ทักษะช่าง:</strong>
        <ul>
            <li>การทำอาหาร: 1</li>
            <li>การทอผ้า: 1</li>
            <li>การทำเครื่องประดับ: 1</li>
        </ul>
    `,
};


export class CharacterCreationModel {
    attributes: CharacterAttributesInterface;
    proficiencies: CharacterProficienciesInterface;
    artisans: CharacterArtisansInterface;
    selectedClass: string;
    selectedRace: string;
    selectedBackground: string;
    selectedGender: "MALE" | "FEMALE"
    portraitNumber: number = 1;
    constructor() {
        this.attributes = {
            charisma: 6,
            luck: 6,
            intelligence: 6,
            leadership: 6,
            vitality: 6,
            willpower: 6,
            breath: 6,
            planar: 6,
            dexterity: 6,
            agility: 6,
            strength: 6,
            endurance: 6,
        };

        this.proficiencies = {
            bareHand: 6,
            sword: 6,
            blade: 6,
            dagger: 6,
            spear: 6,
            axe: 6,
            mace: 6,
            shield: 6,
            bow: 6,
            magicWand: 6,
            staff: 6,
            tome: 6,
            orb: 6,
        };

        this.artisans = {
            mining: 6,
            smithing: 6,
            woodCutting: 6,
            carpentry: 6,
            foraging: 6,
            weaving: 6,
            skinning: 6,
            tanning: 6,
            jewelry: 6,
            cooking: 6,
            alchemy: 6,
            enchanting: 6,
        };
        
        this.selectedClass = "CLERIC";
        this.selectedRace = "HUMAN";
        this.selectedBackground = "MAGE_APPRENTICE";
        this.selectedGender = "MALE";
        this.portraitNumber = 1;
    }

    async createCharacter(
        characterName: string, 
        portrait: string
    ): Promise<CreateCharacterResponse> {
        const message: CreateCharacterRequest = {
            characterName,
            portrait,
            race: this.selectedRace,
            class: this.selectedClass,
            background: this.selectedBackground,
        };
        return await sendCharacterCreationRequest(message);
    }

    selectRace(race: string) {
        const raceObject = matchRace(race);
        if (raceObject == null) {
            console.error('Invalid Race');
            return;
        }
        
        if (this.selectedRace != null) {
            const previousRaceObject = matchRace(this.selectedRace);
            if (previousRaceObject == null) { 
                console.error('Invalid Previous Race');
                return; 
            }
            for (const key in previousRaceObject.attributes) {
                const attributeKey = key as keyof CharacterAttributesInterface;
                this.attributes[attributeKey] -=
                (previousRaceObject.attributes as CharacterAttributesInterface)[attributeKey];
            }
        }
    
        this.selectedRace = race;
        for (const key in raceObject.attributes) {
            const attributeKey = key as keyof CharacterAttributesInterface;
            this.attributes[attributeKey] +=
            (raceObject.attributes as CharacterAttributesInterface)[attributeKey];
        }
    }

    selectClass(classEnum: string) {
        const classObject = matchClass(classEnum);
        if (classObject == null) {
            console.error('Invalid Class');
            return;
        }

        if (this.selectedClass != null) {
            const previousClassObject = matchClass(this.selectedClass);
            if (previousClassObject == null) {
                console.error('Invalid Previous Class');
                return;
            }
            for (const key in previousClassObject.attributes) {
                const attributeKey = key as keyof CharacterAttributesInterface;
                this.attributes[attributeKey] -= 
                (previousClassObject.attributes as CharacterAttributesInterface)[attributeKey];
            }
            for (const key in previousClassObject.proficiencies) {
                const proficiencyKey = key as keyof CharacterProficienciesInterface;
                this.proficiencies[proficiencyKey] -= 
                (previousClassObject.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
            }
        }
        this.selectedClass = classEnum;

        for (const key in classObject.attributes) {
            const attributeKey = key as keyof CharacterAttributesInterface;
            this.attributes[attributeKey] += 
            (classObject.attributes as CharacterAttributesInterface)[attributeKey];
        }
        for (const key in classObject.proficiencies) {
            const proficiencyKey = key as keyof CharacterProficienciesInterface;
            this.proficiencies[proficiencyKey] += 
            (classObject.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
        }
    };

    selectBackground(backGroundEnum: string) {
        const backGroundObject = matchBackground(backGroundEnum);
        if (backGroundObject == null) {
            console.error('Invalid Background');
            return;
        }
        if (this.selectedBackground != null) {
            const previousBackground = matchBackground(this.selectedBackground);
            if (previousBackground == null) {
                console.error('Invalid Previous Background');
                return;
            }
            for (const key in previousBackground.attributes) {
                const attributeKey = key as keyof CharacterAttributesInterface;
                this.attributes[attributeKey] -= 
                (previousBackground.attributes as CharacterAttributesInterface)[attributeKey];
            }
            for (const key in previousBackground.proficiencies) {
                const proficiencyKey = key as keyof CharacterProficienciesInterface;
                this.proficiencies[proficiencyKey] -=
                (previousBackground.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
            }
            for (const key in previousBackground.artisans) {
                const artisanKey = key as keyof CharacterArtisansInterface;
                this.artisans[artisanKey] -=
                (previousBackground.artisans as CharacterArtisansInterface)[artisanKey];
            }        
        }
        this.selectedBackground = backGroundEnum;

        for (const key in backGroundObject.attributes) {
            const attributeKey = key as keyof CharacterAttributesInterface;
            this.attributes[attributeKey] +=
            (backGroundObject.attributes as CharacterAttributesInterface)[attributeKey];
        }
        for (const key in backGroundObject.proficiencies) {
            const proficiencyKey = key as keyof CharacterProficienciesInterface;
            this.proficiencies[proficiencyKey] +=
            (backGroundObject.proficiencies as CharacterProficienciesInterface)[proficiencyKey];
        }
        for (const key in backGroundObject.artisans) {
            const artisanKey = key as keyof CharacterArtisansInterface;
            this.artisans[artisanKey] +=
            (backGroundObject.artisans as CharacterArtisansInterface)[artisanKey];
        }
    }

    selectGender(gender: "MALE" | "FEMALE") {
        this.selectedGender = gender;
    }

    portraitL() {
        if (this.portraitNumber === 1) {
            this.portraitNumber = 20;
        } else {
            this.portraitNumber -= 1;
        }
    }

    portraitR() {
        if (this.portraitNumber === 20) {
            this.portraitNumber = 1;
        } else {
            this.portraitNumber += 1;
        }
    }
}

export function matchRace(race: string) {
    switch (race) {
        case 'HUMAN':
            return raceHuman;
        case "ELVEN":
            return raceElven;
        case "ORC":
            return raceOrc;
        case "TRITON":
            return raceTriton;
        case "DWARF":
            return raceDwarf;
        case "HALFLING":
            return raceHalfling;
        case "HALF_ELF":
            return raceHalfElf;
        case "HALF_ORC":
            return raceHalfOrc;
        case "HALF_TRITON":
            return raceHalfTriton;
        case "DWARFLING":
            return raceDwarfling;
        case "ELVON":
            return raceElvon;
        default:
            return null;
    }
}

export function matchClass(className: string) {
    switch (className) {
        case "CLERIC":
            return classCleric;
        case "FIGHTER":
            return classFighter;
        case "GUARDIAN":
            return classGuardian;
        case "HEXBINDER":
            return classHexbinder;
        case "MAGE":
            return classMage;
        case "OCCULTIST":
            return classOccultist;
        case "SCOUT":
            return classScout;
        case "SKIRMISHER":
            return classSkirmisher;
        case "SOLDIER":
            return classSoldier;
        case "SPELLBLADE":
            return classSpellblade;
        case "TEMPLAR":
            return classTemplar;
        case "WARDEN":
            return classWarden;
        default:
            return null;
    }
}

export function matchBackground(background: string) {
    switch (background) {
        case "MAGE_APPRENTICE":
            return backgroundMageApprentice;
        case "DESERTED_MILITARY":
            return backgroundDesertedMilitary;
        case "TAVERN_BRAWLER":
            return backgroundTavernBrawler;
        case "FALLEN_NOBILITY":
            return backgroundFallenNobility;
        case "MERCS_CHILD":
            return backgroundMercsChild;
        case "TRAINEE_IN_CARAVAN":
            return backgroundTraineeInCaravan;
        case "WANDERING_MUSICIAN":
            return backgroundWanderingMusician;
        case "APPRENTICE_SCRIBE":
            return backgroundApprenticeScribe;
        case "ABANDONED_FARMHAND":
            return backgroundAbandonedFarmhand;
        case "STREET_URCHIN":
            return backgroundStreetUrchin;
        case "FAILED_CRAFTSMAN":
            return backgroundFailedCraftsman;
        case "INNKEEPERS_CHILD":
            return backgroundInnkeepersChild;
        default:
            return null;
    }
}

async function sendCharacterCreationRequest(message: CreateCharacterRequest): Promise<CreateCharacterResponse> {
    console.log('Sending Character Creation Request', message);
    
    return {
        status: CharacterCreationResponseStatus.SUCCESS,
        message: 'Character Created Successfully',
        characterId: '1234567890',
    };
}

export const characterCreationModel = new CharacterCreationModel();
