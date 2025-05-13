var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../../../Database";
export class CharacterEquipments {
    constructor() {
        this.mainHand = undefined;
        this.offHand = undefined;
        this.armor = undefined;
        this.headwear = undefined;
        this.gloves = undefined;
        this.boots = undefined;
        this.necklace = undefined;
        this.ring_R = undefined;
        this.ring_L = undefined;
    }
    constructFromDB(mainHand, offHand, armor, Headwear, necklace, ring_R, ring_L) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mainHand = (mainHand != undefined) ? yield db.getWeapon(mainHand) : undefined;
            this.offHand = (offHand != undefined) ? yield db.getWeapon(offHand) : undefined;
            this.armor = (armor != undefined) ? yield db.getArmor(armor) : undefined;
            this.headwear = (Headwear != undefined) ? yield db.getArmor(Headwear) : undefined;
            this.necklace = (necklace != undefined) ? yield db.getArmor(necklace) : undefined;
            this.ring_R = (ring_R != undefined) ? yield db.getArmor(ring_R) : undefined;
            this.ring_L = (ring_L != undefined) ? yield db.getArmor(ring_L) : undefined;
        });
    }
    intoInterface() {
        return {
            mainHand: this.mainHand
                ? {
                    id: this.mainHand.id,
                    name: this.mainHand.name,
                    cost: this.mainHand.cost.cost,
                    weight: this.mainHand.weight,
                    description: this.mainHand.description,
                    quantity: 1,
                    itemType: this.mainHand.itemType,
                    isCraftable: this.mainHand.isCraftable,
                    resource: this.mainHand.resource
                }
                : undefined,
            offHand: this.offHand
                ? {
                    id: this.offHand.id,
                    name: this.offHand.name,
                    cost: this.offHand.cost.cost,
                    weight: this.offHand.weight,
                    description: this.offHand.description,
                    quantity: 1,
                    itemType: this.offHand.itemType,
                    isCraftable: this.offHand.isCraftable,
                    resource: this.offHand.resource
                }
                : undefined,
            armor: this.armor
                ? {
                    id: this.armor.id,
                    name: this.armor.name,
                    cost: this.armor.cost.cost,
                    weight: this.armor.weight,
                    description: this.armor.description,
                    quantity: 1,
                    itemType: this.armor.itemType,
                    isCraftable: this.armor.isCraftable,
                    resource: this.armor.resource
                }
                : undefined,
            headwear: this.headwear
                ? {
                    id: this.headwear.id,
                    name: this.headwear.name,
                    cost: this.headwear.cost.cost,
                    weight: this.headwear.weight,
                    description: this.headwear.description,
                    quantity: 1,
                    itemType: this.headwear.itemType,
                    isCraftable: this.headwear.isCraftable,
                    resource: this.headwear.resource
                }
                : undefined,
            gloves: this.gloves
                ? {
                    id: this.gloves.id,
                    name: this.gloves.name,
                    cost: this.gloves.cost.cost,
                    weight: this.gloves.weight,
                    description: this.gloves.description,
                    quantity: 1,
                    itemType: this.gloves.itemType,
                    isCraftable: this.gloves.isCraftable,
                    resource: this.gloves.resource
                }
                : undefined,
            boots: this.boots
                ? {
                    id: this.boots.id,
                    name: this.boots.name,
                    cost: this.boots.cost.cost,
                    weight: this.boots.weight,
                    description: this.boots.description,
                    quantity: 1,
                    itemType: this.boots.itemType,
                    isCraftable: this.boots.isCraftable,
                    resource: this.boots.resource
                }
                : undefined,
            necklace: this.necklace
                ? {
                    id: this.necklace.id,
                    name: this.necklace.name,
                    cost: this.necklace.cost.cost,
                    weight: this.necklace.weight,
                    description: this.necklace.description,
                    quantity: 1,
                    itemType: this.necklace.itemType,
                    isCraftable: this.necklace.isCraftable,
                    resource: this.necklace.resource
                }
                : undefined,
            ring_R: this.ring_R
                ? {
                    id: this.ring_R.id,
                    name: this.ring_R.name,
                    cost: this.ring_R.cost.cost,
                    weight: this.ring_R.weight,
                    description: this.ring_R.description,
                    quantity: 1,
                    itemType: this.ring_R.itemType,
                    isCraftable: this.ring_R.isCraftable,
                    resource: this.ring_R.resource
                }
                : undefined,
            ring_L: this.ring_L
                ? {
                    id: this.ring_L.id,
                    name: this.ring_L.name,
                    cost: this.ring_L.cost.cost,
                    weight: this.ring_L.weight,
                    description: this.ring_L.description,
                    quantity: 1,
                    itemType: this.ring_L.itemType,
                    isCraftable: this.ring_L.isCraftable,
                    resource: this.ring_L.resource
                }
                : undefined,
        };
    }
    getArmorTier() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const tierOrder = { none: 0, light: 1, medium: 2, heavy: 3 };
        const types = [
            (_b = (_a = this.armor) === null || _a === void 0 ? void 0 : _a.armorType) !== null && _b !== void 0 ? _b : 'none',
            (_d = (_c = this.headwear) === null || _c === void 0 ? void 0 : _c.armorType) !== null && _d !== void 0 ? _d : 'none',
            (_f = (_e = this.gloves) === null || _e === void 0 ? void 0 : _e.armorType) !== null && _f !== void 0 ? _f : 'none',
            (_h = (_g = this.boots) === null || _g === void 0 ? void 0 : _g.armorType) !== null && _h !== void 0 ? _h : 'none',
        ];
        let maxTier = types.reduce((max, type) => tierOrder[type] > tierOrder[max] ? type : max, 'none');
        return maxTier;
    }
}
