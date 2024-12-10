class SkillCard {
    constructor(skill) {
        this.skill = skill;
        this.card = this.createSkillCard();
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
        frontFace.appendChild(this.createSkillLearningRequirements());
        frontFace.appendChild(this.createSkillEquipmentRequirements());
        frontFace.appendChild(this.createSkillCardConsume());
        frontFace.appendChild(this.createSkillCardProduce());
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
        portrait.src = `../../assets/skills/${this.skill.id}.png`;
        portrait.classList.add('skillCard-portrait');
        return portrait;
    }

    createSkillCardDescription() {
        const description = document.createElement('div');
        description.classList.add('skillCard-description');
        description.textContent = this.skill.baseDescription;
        return description;
    }

    createSkillLearningRequirements() {
        const learningRequirements = document.createElement('div');
        learningRequirements.classList.add('skillCard-learningRequirements');
        const label = document.createElement('div');
        label.classList.add('skillCard-label');
        label.textContent = 'Learning Requirements';
        learningRequirements.appendChild(label);

        let requiredLevel = document.createElement('div');
        requiredLevel.classList.add('skillCard-value');
        requiredLevel.textContent = `Level: ${this.skill.requirement.preRequireCharacterLevel}`;
        learningRequirements.appendChild(requiredLevel);

        // let requiredTraits = `<br>Traits: `;
        let requiredTraits = document.createElement('div');
        requiredTraits.classList.add('skillCard-value');
        requiredTraits.textContent = `Traits: `;
        for (const trait in this.skill.requirement.preRequireCharacterTrait) {
            if (trait === 'none') {
                requiredTraits.textContent += 'None';
                break;
            }
            requiredTraits.textContent += `${trait}, `;
        }
        learningRequirements.appendChild(requiredTraits);

        let requiredElements = document.createElement('div');
        requiredElements.classList.add('skillCard-value');
        requiredElements.textContent = `Elements: `;
        for (const elementValue of this.skill.requirement.preRequireElementValue) {
            console.log(elementValue)
            if (elementValue === 'none') {
                requiredElements.textContent += 'None';
                break;
            }
            requiredElements.textContent += `${elementValue.element}: ${elementValue.value}, `;
        }
        if (requiredElements.textContent.charAt(requiredElements.textContent.length - 2) === ',') {
            requiredElements.textContent = requiredElements.textContent.slice(0, -2);
        }
        learningRequirements.appendChild(requiredElements);

        let requiredSkills = document.createElement('div');
        requiredSkills.classList.add('skillCard-value');
        requiredSkills.textContent = `Skills: `;
        for (const skillID of this.skill.requirement.preRequireSkillID) {
            if (skillID === undefined || skillID === 'none') {
                requiredSkills.textContent += 'None';
                break;
            }
            requiredSkills.textContent += `${skillID}, `;
        }
        learningRequirements.appendChild(requiredSkills);

        return learningRequirements;
    }

    createSkillEquipmentRequirements() {
        const equipmentRequirements = document.createElement('div');
        equipmentRequirements.classList.add('skillCard-equipmentRequirements');
        const label = document.createElement('div');
        label.classList.add('skillCard-label');
        label.textContent = 'Equipment Requirement:';
        equipmentRequirements.appendChild(label);

        for (const requirement in this.skill.equipmentNeeded) {
            if (this.skill.equipmentNeeded[requirement] && this.skill.equipmentNeeded[requirement].length > 0) {
                const textValue = document.createElement('div');
                textValue.classList.add('skillCard-value');
                textValue.textContent = `${requirement}: ${this.skill.equipmentNeeded[requirement].join(', ')}`;
                equipmentRequirements.appendChild(textValue);
            }
        }

        return equipmentRequirements;
    }

    createSkillCardConsume() {
        const consume = document.createElement('div');
        consume.classList.add('skillCard-consume');
        const label = document.createElement('div');
        label.classList.add('skillCard-label');
        label.textContent = 'Consume';
        consume.appendChild(label);

        let consumeValue = ''
        const hpConsumeValue = this.skill.consume.hp[this.skill.level - 1];
        if (hpConsumeValue !== 0) {
            consumeValue += `HP: ${hpConsumeValue}, `;
        }
        const mpConsumeValue = this.skill.consume.mp[this.skill.level - 1];
        if (mpConsumeValue !== 0) {
            consumeValue += `MP: ${mpConsumeValue}, `;
        }
        const spConsumeValue = this.skill.consume.sp[this.skill.level - 1];
        if (spConsumeValue !== 0) {
            consumeValue += `SP: ${spConsumeValue}, `;
        }

        for(const element in this.skill.consume.elements) {
            const elementName = this.skill.consume.elements[element].element;
            const elementConsumeAmount = this.skill.consume.elements[element].amount[this.skill.level - 1];
            if (elementConsumeAmount !== 0) {
                consumeValue += `${elementName}: ${elementConsumeAmount}, `;
            }
        }

        if (consumeValue.charAt(consumeValue.length - 2) === ',') {
            consumeValue = consumeValue.slice(0, -2);
        }

        const consumeElement = document.createElement('div');
        consumeElement.classList.add('skillCard-value');
        consumeElement.textContent = consumeValue;

        consume.appendChild(consumeElement);

        return consume;
    }

    createSkillCardProduce() {
        const produce = document.createElement('div');
        produce.classList.add('skillCard-produce');
        const label = document.createElement('div');
        label.classList.add('skillCard-label');
        label.textContent = 'Produce';
        produce.appendChild(label);

        let produceValue = '';

        for (const element in this.skill.produce.elements) {
            const elementName = this.skill.produce.elements[element].element;
            const elementProduceAmount = `${this.skill.produce.elements[element].amountRange[this.skill.level - 1][0]} - ${this.skill.produce.elements[element].amountRange[this.skill.level - 1][1]}`;
            if (elementProduceAmount !== 0) {
                produceValue += `${elementName}: ${elementProduceAmount}, `;
            }
        }


        if (produceValue.charAt(produceValue.length - 2) === ',') {
            produceValue = produceValue.slice(0, -2);
        }

        const produceElement = document.createElement('div');
        produceElement.classList.add('skillCard-value');
        produceElement.textContent = produceValue;

        produce.appendChild(produceElement);

        return produce;
    }

    render() {
        return this.card;
    }
}