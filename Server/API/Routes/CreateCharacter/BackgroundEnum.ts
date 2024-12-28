import { TraitEnum } from "../../../../Common/DTOsEnumsInterfaces/Character/TraitEnums";
import { BackgroundEnum } from '../../../../Common/RequestResponse/characterCreation';

class Background {
    name: BackgroundEnum;
    description: string;
    traits: TraitEnum[];
    bonusStats: {
        attribute: {
            charisma: number;
            luck: number;
            intelligence: number;
            leadership: number;
            vitality: number;
            willpower: number;
            breath: number;
            planar: number;
            dexterity: number;
            agility: number;
            strength: number;
            endurance: number;
        },
        proficiency: {
            bareHand: number;
            sword: number;
            blade: number;
            dagger: number;
            spear: number;
            axe: number;
            mace: number;
            shield: number;
            bow: number;
            magicWand: number;
            staff: number;
            tome: number;
            orb: number;
        },
        artisan: {
            mining: number;
            smithing: number;
            woodcutting: number;
            carpentry: number;
            foraging: number;
            weaving: number;
            skinning: number;
            tanning: number;
            jewelry: number;
            cooking: number;
            alchemy: number;
            enchanting: number;
        },
    }
    constructor(
        name: BackgroundEnum,
        description: string,
        traits: TraitEnum[],
        bonusStats: {
            attribute?: {
                charisma?: number;
                luck?: number;
                intelligence?: number;
                leadership?: number;
                vitality?: number;
                willpower?: number;
                breath?: number;
                planar?: number;
                dexterity?: number;
                agility?: number;
                strength?: number;
                endurance?: number;
            },
            proficiency?: {
                bareHand?: number;
                sword?: number;
                blade?: number;
                dagger?: number;
                spear?: number;
                axe?: number;
                mace?: number;
                shield?: number;
                bow?: number;
                magicWand?: number;
                staff?: number;
                tome?: number;
                orb?: number;
            },
            artisan?: {
                mining?: number;
                smithing?: number;
                woodcutting?: number;
                carpentry?: number;
                foraging?: number;
                weaving?: number;
                skinning?: number;
                tanning?: number;
                jewelry?: number;
                cooking?: number;
                alchemy?: number;
                enchanting?: number;
            }
        }
    ) {
        this.name = name;
        this.description = description;
        this.traits = traits;
        this.bonusStats = {
            attribute: {
                charisma: bonusStats.attribute?.charisma ?? 0,
                luck: bonusStats.attribute?.luck ?? 0,
                intelligence: bonusStats.attribute?.intelligence ?? 0,
                leadership: bonusStats.attribute?.leadership ?? 0,
                vitality: bonusStats.attribute?.vitality ?? 0,
                willpower: bonusStats.attribute?.willpower ?? 0,
                breath: bonusStats.attribute?.breath ?? 0,
                planar: bonusStats.attribute?.planar ?? 0,
                dexterity: bonusStats.attribute?.dexterity ?? 0,
                agility: bonusStats.attribute?.agility ?? 0,
                strength: bonusStats.attribute?.strength ?? 0,
                endurance: bonusStats.attribute?.endurance ?? 0,
            },
            proficiency: {
                bareHand: bonusStats.proficiency?.bareHand ?? 0,
                sword: bonusStats.proficiency?.sword ?? 0,
                blade: bonusStats.proficiency?.blade ?? 0,
                dagger: bonusStats.proficiency?.dagger ?? 0,
                spear: bonusStats.proficiency?.spear ?? 0,
                axe: bonusStats.proficiency?.axe ?? 0,
                mace: bonusStats.proficiency?.mace ?? 0,
                shield: bonusStats.proficiency?.shield ?? 0,
                bow: bonusStats.proficiency?.bow ?? 0,
                magicWand: bonusStats.proficiency?.magicWand ?? 0,
                staff: bonusStats.proficiency?.staff ?? 0,
                tome: bonusStats.proficiency?.tome ?? 0,
                orb: bonusStats.proficiency?.orb ?? 0,
            },
            artisan: {
                mining: bonusStats.artisan?.mining ?? 0,
                smithing: bonusStats.artisan?.smithing ?? 0,
                woodcutting: bonusStats.artisan?.woodcutting ?? 0,
                carpentry: bonusStats.artisan?.carpentry ?? 0,
                foraging: bonusStats.artisan?.foraging ?? 0,
                weaving: bonusStats.artisan?.weaving ?? 0,
                skinning: bonusStats.artisan?.skinning ?? 0,
                tanning: bonusStats.artisan?.tanning ?? 0,
                jewelry: bonusStats.artisan?.jewelry ?? 0,
                cooking: bonusStats.artisan?.cooking ?? 0,
                alchemy: bonusStats.artisan?.alchemy ?? 0,
                enchanting: bonusStats.artisan?.enchanting ?? 0,
            }
        }
    }
}

export const background_mage_apprentice = new Background(
    BackgroundEnum.MAGE_APPRENTICE,
    'คุณเคยเป็นเด็กฝึกเวทย์ที่ได้รับการฝึกฝนจากอาจารย์ผู้มีชื่อเสียง แต่วันหนึ่งอาจารย์ของคุณหายตัวไปอย่างไร้ร่องรอย ทิ้งคำถามมากมายและความฝันที่ยังไม่สมบูรณ์ไว้ คุณต้องออกเดินทางเพื่อตามหาคำตอบและเติมเต็มเส้นทางเวทย์มนตร์ด้วยตัวเอง',
    [TraitEnum.trait_quickLearner],
    {
        attribute: {
            intelligence: 1,
        },
        proficiency: {},
        artisan: {
            alchemy: 2,
            enchanting: 1,
        }
    }
);

export const background_deserted_military = new Background(
    BackgroundEnum.DESERTED_MILITARY,
    'คุณเคยเป็นทหารผู้ภักดีในสนามรบ แต่สงครามที่โหดร้ายสร้างบาดแผลในใจจนคุณตัดสินใจละทิ้งหน้าที่และหาหนทางชีวิตใหม่ที่อิสระจากอดีต',
    [TraitEnum.trait_toughBody],
    {
        attribute: {
            strength: 1,
        },
        proficiency: {},
        artisan: {
            smithing: 1,
            foraging: 1,
            cooking: 1,
        }
    }
);

export const background_tavern_brawler = new Background(
    BackgroundEnum.TAVERN_BRAWLER,
    'ชีวิตในร้านเหล้าสอนให้คุณรู้จักการต่อสู้โดยไร้กฎเกณฑ์ คุณรอดพ้นจากสถานการณ์ลำบากและฝึกฝนจนกลายเป็นคนแข็งแกร่ง ทั้งทางร่างกายและจิตใจ ตอนนี้คุณพร้อมจะเริ่มต้นใหม่เพื่อค้นหาสิ่งที่ดีกว่าในชีวิต',
    [TraitEnum.trait_focusedStrike],
    {
        attribute: {
            agility: 1,
        },
        proficiency: {},
        artisan: {
            cooking: 2,
            skinning: 1,
        }
    }
);

export const background_fallen_nobility = new Background(
    BackgroundEnum.FALLEN_NOBILITY,
    'ครั้งหนึ่งคุณเคยใช้ชีวิตหรูหราในคฤหาสน์ แต่หลังจากครอบครัวล่มสลาย คุณต้องเผชิญกับความลำบาก แม้ว่าจะสูญเสียทุกสิ่ง แต่คุณยังคงยึดมั่นในศักดิ์ศรีและความหวังเพื่อสร้างอนาคตใหม่',
    [TraitEnum.trait_socialCharm],
    {
        attribute: {
            charisma: 1,
        },
        proficiency: {},
        artisan: {
            jewelry: 1,
            weaving: 1,
            alchemy: 1,
        }
    }
);

export const background_mercs_child = new Background(
    BackgroundEnum.MERCS_CHILD,
    'ในวัยเด็ก คุณเดินทางไปกับกองทหารรับจ้างที่ต่อสู้เพื่อทองคำมากกว่าความเชื่อ คุณเรียนรู้ศิลปะแห่งสงครามและการเอาตัวรอด แต่เมื่อถึงเวลา คุณตัดสินใจสร้างชื่อเสียงของตัวเองในแบบที่แตกต่าง',
    [TraitEnum.trait_bornSurvivor],
    {
        attribute: {
            dexterity: 1,
        },
        proficiency: {},
        artisan: {
            smithing: 2,
            tanning: 1,
        }
    }
);

export const background_trainee_in_caravan = new Background(
    BackgroundEnum.TRAINEE_IN_CARAVAN,
    'การเดินทางไปกับขบวนพ่อค้าเต็มไปด้วยบทเรียนและความเสี่ยง คุณเห็นโลกที่กว้างใหญ่และท้าทาย แต่เมื่อโตขึ้น คุณเลือกที่จะละทิ้งชีวิตเร่ร่อนเพื่อค้นหาสิ่งที่ยั่งยืนกว่า',
    [TraitEnum.trait_attentive],
    {
        attribute: {
            luck: 1,
        },
        proficiency: {},
        artisan: {
            woodcutting: 1,
            carpentry: 2,
        }
    }
);

export const background_wandering_musician = new Background(
    BackgroundEnum.WANDERING_MUSICIAN,
    'คุณเดินทางผ่านหมู่บ้านและเมืองด้วยเสียงเพลงในใจและเครื่องดนตรีในมือ สร้างความสุขให้ผู้คนรอบตัว แต่การเดินทางที่ไม่มีจุดหมายทำให้คุณเหนื่อยล้า คุณจึงตัดสินใจค้นหาความหมายที่ลึกซึ้งกว่าในชีวิต',
    [TraitEnum.trait_socialCharm],
    {
        attribute: {
            charisma: 1,
        },
        proficiency: {},
        artisan: {
            weaving: 1,
            enchanting: 1,
            cooking: 1,
        }
    }
);

export const background_apprentice_scribe = new Background(
    BackgroundEnum.APPRENTICE_SCRIBE,
    'คุณเคยเป็นผู้ช่วยในหอสมุดที่มีหน้าที่คัดลอกตำรา แม้ว่าคุณจะมีความรู้ทางทฤษฎีมากมาย แต่ยังไม่เคยมีโอกาสนำไปใช้ในชีวิตจริง',
    [TraitEnum.trait_attentive],
    {
        attribute: {
            intelligence: 1,
        },
        proficiency: {},
        artisan: {
            enchanting: 1,
            weaving: 1,
            alchemy: 1,
        }
    }
);

export const background_abandoned_farmhand = new Background(
    BackgroundEnum.ABANDONED_FARMHAND,
    'คุณเคยทำงานในฟาร์มเล็กๆ ในหมู่บ้านห่างไกล แต่เมื่อฟาร์มล่มสลาย คุณต้องออกเดินทางเพื่อหาชีวิตใหม่และโอกาสที่ดีกว่า',
    [TraitEnum.trait_hardWorker],
    {
        attribute: {
            strength: 1,
        },
        proficiency: {},
        artisan: {
            foraging: 2,
            cooking: 1,
        }
    }
);

export const background_street_urchin = new Background(
    BackgroundEnum.STREET_URCHIN,
    'เติบโตบนถนนในเมืองหลวง คุณต้องขโมยอาหารเพื่อเอาตัวรอดในวัยเด็ก ความฉลาดแกมโกงช่วยให้คุณรอดมาได้ แม้ว่าชีวิตจะยังคงไม่มั่นคง',
    [TraitEnum.trait_lightWalker],
    {
        attribute: {
            dexterity: 1,
        },
        proficiency: {},
        artisan: {
            skinning: 1,
            foraging: 1,
            weaving: 1,
        }
    }
);

export const background_failed_craftsman = new Background(
    BackgroundEnum.FAILED_CRAFTSMAN,
    'คุณพยายามฝึกฝนเป็นช่างไม้ในหมู่บ้าน แต่ขาดความสามารถที่จะทำสำเร็จ ตอนนี้คุณตัดสินใจลองสิ่งใหม่ๆ ในชีวิตเพื่อความหวังและโอกาส',
    [TraitEnum.trait_determined],
    {
        attribute: {
            dexterity: 1,
        },
        proficiency: {},
        artisan: {
            woodcutting: 2,
            carpentry: 1,
        }
    }
);

export const background_innkeepers_child = new Background(
    BackgroundEnum.INNKEEPERS_CHILD,
    'คุณเติบโตในโรงแรมเล็กๆ ที่ไม่มีชื่อเสียงในหมู่บ้าน ความรู้ในการจัดการงานครัวและดูแลผู้คนช่วยให้คุณมีพื้นฐานที่แข็งแกร่งสำหรับอนาคต',
    [TraitEnum.trait_balancedStep],
    {
        attribute: {
            charisma: 1,
        },
        proficiency: {},
        artisan: {
            cooking: 1,
            weaving: 1,
            jewelry: 1,
        }
    }
);