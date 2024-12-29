import { db } from "../../../Database";
import { CharacterEquipmentInterface } from "../../../../Common/RequestResponse/characterWS";
import { Weapon } from "../../Items/Equipments/Weapon/Weapon";
import { Armor } from "../../Items/Equipments/Armors/Armor";
import { Headwear } from "../../Items/Equipments/Headwear/Headwear";
import { Necklace } from "../../Items/Equipments/Accessories/Necklace";
import { Ring } from "../../Items/Equipments/Accessories/Ring";
import { Gloves } from "../../Items/Equipments/Gloves/Gloves";
import { Boots } from "../../Items/Equipments/Boots/Boots";
export class CharacterEquipments {
	mainHand: Weapon | null = null;
	offHand: Weapon |  null = null;
	armor: Armor | null = null;
	headwear: Headwear | null = null;
	gloves: Gloves | null = null;
	boots: Boots | null = null;
	necklace: Necklace | null = null;
	ring_R: Ring | null = null;
	ring_L: Ring | null = null;

	async constructFromDB(
		mainHand: string | null, 
		offHand: string | null, 
		armor: string | null, 
		Headwear: string | null,
		necklace: string | null,
		ring_R: string | null,
		ring_L: string | null
	) {
		this.mainHand = (mainHand != null)? await db.getWeapon(mainHand): null
		this.offHand = (offHand != null)? await db.getWeapon(offHand): null
		this.armor = (armor != null)? await db.getArmor(armor): null
		this.headwear = (Headwear != null)? await db.getArmor(Headwear): null
		this.necklace = (necklace != null)? await db.getArmor(necklace): null
		this.ring_R = (ring_R != null)? await db.getArmor(ring_R): null
		this.ring_L = (ring_L != null)? await db.getArmor(ring_L): null
	}

	intoInterface(): CharacterEquipmentInterface {
		return {
			mainHand: {
				id: this.mainHand?.id ?? "None",
				name: this.mainHand?.name ?? "None",
				cost: this.mainHand?.cost.cost ?? 0,
				weight: this.mainHand?.weight ?? 0,
				description: this.mainHand?.description ?? ""
			},
			offHand: {
				id: this.offHand?.id ?? "None",
				name: this.offHand?.name ?? "None",
				cost: this.offHand?.cost.cost ?? 0,
				weight: this.offHand?.weight ?? 0,
				description: this.offHand?.description ?? ""
			},
			armor: {
				id: this.armor?.id ?? "None",
				name: this.armor?.name ?? "None",
				cost: this.armor?.cost.cost ?? 0,
				weight: this.armor?.weight ?? 0,
				description: this.armor?.description ?? ""
			},
			headwear: {
				id: this.headwear?.id ?? "None",
				name: this.headwear?.name ?? "None",
				cost: this.headwear?.cost.cost ?? 0,
				weight: this.headwear?.weight ?? 0,
				description: this.headwear?.description ?? ""
			},
			gloves: {
				id: this.gloves?.id ?? "None",
				name: this.gloves?.name ?? "None",
				cost: this.gloves?.cost.cost ?? 0,
				weight: this.gloves?.weight ?? 0,
				description: this.gloves?.description ?? ""
			},
			boots: {
				id: this.boots?.id ?? "None",
				name: this.boots?.name ?? "None",
				cost: this.boots?.cost.cost ?? 0,
				weight: this.boots?.weight ?? 0,
				description: this.boots?.description ?? ""
			},
			necklace: {
				id: this.necklace?.id ?? "None",
				name: this.necklace?.name ?? "None",
				cost: this.necklace?.cost.cost ?? 0,
				weight: this.necklace?.weight ?? 0,
				description: this.necklace?.description ?? ""
			},
			ring_R: {
				id: this.ring_R?.id ?? "None",
				name: this.ring_R?.name ?? "None",
				cost: this.ring_R?.cost.cost ?? 0,
				weight: this.ring_R?.weight ?? 0,
				description: this.ring_R?.description ?? ""
			},
			ring_L: {
				id: this.ring_L?.id ?? "None",
				name: this.ring_L?.name ?? "None",
				cost: this.ring_L?.cost.cost ?? 0,
				weight: this.ring_L?.weight ?? 0,
				description: this.ring_L?.description ?? ""
			}
		};
	}

	
}
