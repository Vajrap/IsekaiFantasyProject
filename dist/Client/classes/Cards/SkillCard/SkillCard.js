export class SkillCard {
    constructor(skill) {
        this.skill = skill;
        this.card = this.createSkillCard();
        this.frontFace = this.createFrontFace();
    }
    createSkillCard() {
        const card = document.createElement('div');
        card.classList.add('skillCard');
        this.frontFace = this.createFrontFace();
        card.appendChild(this.frontFace);
        return card;
    }
    createFrontFace() {
        const frontFace = document.createElement('div');
        frontFace.classList.add('skillCard-front');
        frontFace.appendChild(this.createSkillCardName());
        frontFace.appendChild(this.createSkillCardPortrait());
        frontFace.appendChild(this.createSkillCardDescription());
        const equipmentRequirements = this.createSkillEquipmentRequirements();
        if (equipmentRequirements)
            frontFace.appendChild(equipmentRequirements);
        const consume = this.createSkillCardConsume();
        if (consume)
            frontFace.appendChild(consume);
        const produce = this.createSkillCardProduce();
        if (produce)
            frontFace.appendChild(produce);
        return frontFace;
    }
    createSkillCardName() {
        const name = document.createElement('div');
        name.classList.add('skillCard-name');
        name.textContent = this.skill.name;
        return name;
    }
    createSkillCardPortrait() {
        const portrait = document.createElement('img');
        // TODO: Change to actual path
        // portrait.src = `../../assets/skills/${this.skill.id}.png`;
        portrait.src = `../../assets/skills/test_skill.png`;
        portrait.classList.add('skillCard-portrait');
        return portrait;
    }
    createSkillCardDescription() {
        const description = document.createElement('div');
        description.classList.add('skillCard-description');
        description.textContent = this.skill.description;
        return description;
    }
    createSkillEquipmentRequirements() {
        if (this.skill.equipmentRequirements.length === 0) {
            return undefined;
        }
        const equipmentRequirements = document.createElement('div');
        equipmentRequirements.classList.add('skillCard-equipmentRequirements');
        const label = document.createElement('div');
        label.classList.add('skillCard-label');
        label.textContent = 'อาวุธ: ';
        equipmentRequirements.appendChild(label);
        for (const requirement in this.skill.equipmentRequirements) {
            label.textContent += `${mapWeaponTypeName(this.skill.equipmentRequirements[requirement])}, `;
        }
        return equipmentRequirements;
    }
    createSkillCardConsume() {
        const consume = document.createElement('div');
        consume.classList.add('skillCard-consume');
        const label = document.createElement('div');
        label.classList.add('skillCard-label');
        label.innerHTML = 'ใช้';
        consume.appendChild(label);
        let consumeValue = '';
        const hpConsumeValue = this.skill.consume.hp[this.skill.level - 1];
        if (hpConsumeValue !== 0) {
            consumeValue += `HP: ${hpConsumeValue}<br>`;
        }
        const mpConsumeValue = this.skill.consume.mp[this.skill.level - 1];
        if (mpConsumeValue !== 0) {
            consumeValue += `MP: ${mpConsumeValue}<br>`;
        }
        const spConsumeValue = this.skill.consume.sp[this.skill.level - 1];
        if (spConsumeValue !== 0) {
            consumeValue += `SP: ${spConsumeValue}<br>`;
        }
        for (const element in this.skill.consume.elements) {
            const elementName = this.skill.consume.elements[element].element;
            const elementConsumeAmount = this.skill.consume.elements[element].amount[this.skill.level - 1];
            if (elementConsumeAmount !== 0) {
                consumeValue += `${mapElementName(elementName)}: ${elementConsumeAmount}<br>`;
            }
        }
        if (consumeValue === '') {
            return undefined;
        }
        ;
        if (consumeValue.charAt(consumeValue.length - 2) === ',') {
            consumeValue = consumeValue.slice(0, -2);
        }
        const consumeElement = document.createElement('div');
        consumeElement.classList.add('skillCard-value');
        consumeElement.innerHTML = consumeValue;
        consume.appendChild(consumeElement);
        return consume;
    }
    createSkillCardProduce() {
        let produceValue = '';
        if (this.skill.produce.elements.length === 0) {
            return undefined;
        }
        ;
        for (const element in this.skill.produce.elements) {
            const elementName = this.skill.produce.elements[element].element;
            const isOnlyOneValue = (this.skill.produce.elements[element].amount[this.skill.level - 1][0] === this.skill.produce.elements[element].amount[this.skill.level - 1][1]);
            const elementProduceAmount = isOnlyOneValue ?
                `${this.skill.produce.elements[element].amount[this.skill.level - 1][0]}` :
                `${this.skill.produce.elements[element].amount[this.skill.level - 1][0]} - ${this.skill.produce.elements[element].amount[this.skill.level - 1][1]}`;
            produceValue += `${mapElementName(elementName)}: ${elementProduceAmount}<br>`;
        }
        const produce = document.createElement('div');
        produce.classList.add('skillCard-produce');
        const label = document.createElement('div');
        label.classList.add('skillCard-label');
        label.textContent = 'ได้รับ';
        produce.appendChild(label);
        if (produceValue.charAt(produceValue.length - 2) === ',') {
            produceValue = produceValue.slice(0, -2);
        }
        const produceElement = document.createElement('div');
        produceElement.classList.add('skillCard-value');
        produceElement.innerHTML = produceValue;
        produce.appendChild(produceElement);
        return produce;
    }
    render() {
        return this.card;
    }
}
export function mapElementName(name) {
    switch (name) {
        case 'fire':
            return 'ไฟ';
        case 'water':
            return 'น้ำ';
        case 'geo':
            return 'ดิน';
        case 'air':
            return 'ลม';
        case 'order':
            return 'ระเบียบ';
        case 'chaos':
            return 'วุ่นวาย';
        case 'none':
            return 'ว่างเปล่า';
        default:
            return name;
    }
}
export function mapWeaponTypeName(name) {
    switch (name) {
        case 'sword_short':
            return 'กระบี่สั้น';
        case 'sword_long':
            return 'กระบี่ยาว';
        case 'sword_great':
            return 'กระบี่ใหญ่';
        case 'sword_rapier':
            return 'กระบี่ปลายแหลม';
        case 'blade_katana':
            return 'ดาบคาตานะ';
        case 'blade_scimitar':
            return 'ดาบโค้ง';
        case 'blade_cutlass':
            return 'ดาบยาว';
        case 'blade_falchion':
            return 'ดาบหนัก';
        case 'spear_dory':
            return 'หอก';
        case 'spear_javelin':
            return 'หอกซัด';
        case 'spear_halberd':
            return 'หอกง้าว';
        case 'axe_broad':
            return 'ขวาน';
        case 'axe_great':
            return 'ขวานสงคราม';
        case 'bow_long':
            return 'ธนูยาว';
        case 'bow_short':
            return 'ธนูสั้น';
        case 'bow_cross':
            return 'หน้าไม้';
        case 'dagger_stiletto':
            return 'มีดปลายแหลม';
        case 'dagger_knife':
            return 'มีดสั้น';
        case 'wand_magic':
            return 'คฑาเวทย์';
        case 'wand_scepter':
            return 'คฑาราชวงศ์';
        case 'staff_quarter':
            return 'กระบองสั้น';
        case 'staff_long':
            return 'กระบองยาว';
        case 'staff_magic':
            return 'กระบองเวทย์';
        case 'tome_bible':
            return 'คัมภีร์ศักดิ์สิทธิ์';
        case 'tome_grimoire':
            return 'คัมภีร์เวทย์มนต์';
        case 'tome_codex':
            return 'คัมภีร์โบราณ';
        case 'orb_metallic':
            return 'ลูกแก้วโลหะ';
        case 'orb_crystal':
            return 'ลูกแก้วคริสตัล';
        case 'mace_morningstar':
            return 'ฆ้อนหนาม';
        case 'mace_hammer':
            return 'ฆ้อม';
        case 'mace_warhammer':
            return 'ค้อนสงคราม';
        case 'shield_buckler':
            return 'โล่เล็ก';
        case 'shield_kite':
            return 'โล่หยดน้ำ';
        case 'shield_tower':
            return 'โล่ใหญ่';
        case 'shield_round':
            return 'โล่กลม';
        case 'bare_hand':
            return 'มือเปล่า';
        default:
            return name;
    }
}
