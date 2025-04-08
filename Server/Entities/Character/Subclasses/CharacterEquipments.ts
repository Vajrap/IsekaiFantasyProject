import { db } from "../../../Database";
import { CharacterEquipmentsInterface } from "../../../../Common/RequestResponse/characterWS";
import { Weapon } from "../../Items/Equipments/Weapon/Weapon";
import { Armor } from "../../Items/Equipments/Armors/Armor";
import { Headwear } from "../../Items/Equipments/Headwear/Headwear";
import { Necklace } from "../../Items/Equipments/Accessories/Necklace/Necklace";
import { Ring } from "../../Items/Equipments/Accessories/Ring/Ring";
import { Gloves } from "../../Items/Equipments/Gloves/Gloves";
import { Boots } from "../../Items/Equipments/Boots/Boots";
export class CharacterEquipments {
	mainHand: Weapon | undefined = undefined;
	offHand: Weapon |  undefined = undefined;
	armor: Armor | undefined = undefined;
	headwear: Headwear | undefined = undefined;
	gloves: Gloves | undefined = undefined;
	boots: Boots | undefined = undefined;
	necklace: Necklace | undefined = undefined;
	ring_R: Ring | undefined = undefined;
	ring_L: Ring | undefined = undefined;

	async constructFromDB(
		mainHand: string | undefined, 
		offHand: string | undefined, 
		armor: string | undefined, 
		Headwear: string | undefined,
		necklace: string | undefined,
		ring_R: string | undefined,
		ring_L: string | undefined
	) {
		this.mainHand = (mainHand != undefined)? await db.getWeapon(mainHand): undefined
		this.offHand = (offHand != undefined)? await db.getWeapon(offHand): undefined
		this.armor = (armor != undefined)? await db.getArmor(armor): undefined
		this.headwear = (Headwear != undefined)? await db.getArmor(Headwear): undefined
		this.necklace = (necklace != undefined)? await db.getArmor(necklace): undefined
		this.ring_R = (ring_R != undefined)? await db.getArmor(ring_R): undefined
		this.ring_L = (ring_L != undefined)? await db.getArmor(ring_L): undefined
	}

	intoInterface(): CharacterEquipmentsInterface {
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

	getArmorTier(): 'none' | 'light' | 'medium' | 'heavy' {
		const tierOrder = { none: 0, light: 1, medium: 2, heavy: 3 };
		const types = [
			this.armor?.armorType ?? 'none',
			this.headwear?.armorType ?? 'none',
			this.gloves?.armorType ?? 'none',
			this.boots?.armorType ?? 'none',
		];
		let maxTier = types.reduce((max, type) =>
			tierOrder[type as keyof typeof tierOrder] > tierOrder[max as keyof typeof tierOrder] ? type : max, 'none');
		return maxTier as 'none' | 'light' | 'medium' | 'heavy';
	}
	
	
}
