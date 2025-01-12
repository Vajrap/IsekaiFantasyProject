import { CharacterStatusEnum } from "../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes.js";
export function statusTextMapper(status) {
    switch (status) {
        case CharacterStatusEnum.charisma:
            return "สเน่ห์";
        case CharacterStatusEnum.luck:
            return "โชค";
        case CharacterStatusEnum.intelligence:
            return "ปัญญา";
        case CharacterStatusEnum.leadership:
            return "ผู้นำ";
        case CharacterStatusEnum.vitality:
            return "ชีวิต";
        case CharacterStatusEnum.willpower:
            return "พลังใจ";
        case CharacterStatusEnum.breath:
            return "ลมหายใจ";
        case CharacterStatusEnum.planar:
            return "เวทย์มนต์";
        case CharacterStatusEnum.dexterity:
            return "คล่องแคล่ว";
        case CharacterStatusEnum.agility:
            return "ว่องไว";
        case CharacterStatusEnum.strength:
            return "กำลัง";
        case CharacterStatusEnum.endurance:
            return "อดทน";
        case CharacterStatusEnum.bareHand:
            return "มือเปล่า";
        case CharacterStatusEnum.sword:
            return "กระบี่";
        case CharacterStatusEnum.blade:
            return "ดาบ";
        case CharacterStatusEnum.dagger:
            return "มีดสั้น";
        case CharacterStatusEnum.spear:
            return "หอก";
        case CharacterStatusEnum.mace:
            return "กระบอง";
        case CharacterStatusEnum.axe:
            return "ขวาน";
        case CharacterStatusEnum.shield:
            return "โล่";
        case CharacterStatusEnum.bow:
            return "ธนู";
        case CharacterStatusEnum.magicWand:
            return "ไม้กายสิทธิ์";
        case CharacterStatusEnum.staff:
            return "ไม้เท้า";
        case CharacterStatusEnum.tome:
            return "ตำรา";
        case CharacterStatusEnum.orb:
            return "ลูกแก้ว";
        case CharacterStatusEnum.pATK:
            return "โจมตีกายภาพ";
        case CharacterStatusEnum.pHIT:
            return "แม่นยำกายภาพ";
        case CharacterStatusEnum.pCRT:
            return "คริติคอลกายภาพ";
        case CharacterStatusEnum.pDEF:
            return "ป้องกันกายภาพ";
        case CharacterStatusEnum.slash:
            return "โจมตี-ฟัน";
        case CharacterStatusEnum.pierce:
            return "โจมตี-แทง";
        case CharacterStatusEnum.blunt:
            return "โจมตี-ทุบ";
        case CharacterStatusEnum.slashDEF:
            return "ป้องกัน-ฟัน";
        case CharacterStatusEnum.pierceDEF:
            return "ป้องกัน-แทง";
        case CharacterStatusEnum.bluntDEF:
            return "ป้องกัน-ทุบ";
        case CharacterStatusEnum.mATK:
            return "โจมตีเวทย์";
        case CharacterStatusEnum.mHIT:
            return "แม่นยำเวทย์";
        case CharacterStatusEnum.mCRT:
            return "คริติคอลเวทย์";
        case CharacterStatusEnum.mDEF:
            return "ป้องกันเวทย์";
        case CharacterStatusEnum.chiWarmATK:
            return "โจมตีปราณร้อน";
        case CharacterStatusEnum.chiColdATK:
            return "โจมตีปราณเย็น";
        case CharacterStatusEnum.chiWarmDEF:
            return "ป้องกันปราณร้อน";
        case CharacterStatusEnum.chiColdDEF:
            return "ป้องกันปราณเย็น";
        case CharacterStatusEnum.dodge:
            return "หลบหลีก";
        case CharacterStatusEnum.order:
            return "ธาตุระเบียบ";
        case CharacterStatusEnum.chaos:
            return "ธาตุวุ่นวาย";
        case CharacterStatusEnum.geo:
            return "ธาตุดิน";
        case CharacterStatusEnum.water:
            return "ธาตุน้ำ";
        case CharacterStatusEnum.air:
            return "ธาตุลม";
        case CharacterStatusEnum.fire:
            return "ธาตุไฟ";
        case CharacterStatusEnum.mining:
            return "ขุดแร่";
        case CharacterStatusEnum.smithing:
            return "ตีเหล็ก";
        case CharacterStatusEnum.woodcutting:
            return "ตัดไม้";
        case CharacterStatusEnum.carpentry:
            return "ช่างไม้";
        case CharacterStatusEnum.foraging:
            return "สำรวจ";
        case CharacterStatusEnum.weaving:
            return "ทอผ้า";
        case CharacterStatusEnum.skinning:
            return "ลอกหนัง";
        case CharacterStatusEnum.tanning:
            return "ฟอกหนัง";
        case CharacterStatusEnum.jewelry:
            return "ทำเครื่องประดับ";
        case CharacterStatusEnum.cooking:
            return "ทำอาหาร";
        case CharacterStatusEnum.alchemy:
            return "เล่นแร่แปรธาตุ";
        case CharacterStatusEnum.enchanting:
            return "เสริมพลังเวทย์";
        default:
            return `NA:${status}`;
    }
}
