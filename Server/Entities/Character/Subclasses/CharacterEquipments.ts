import { db } from "../../../Database";
import { GearInstance } from "../../Items/GearInstance/GearInstance";
import { CharacterEquipmentInterface } from "../../../../Common/RequestResponse/characterWS";
export class CharacterEquipments {
	mainHand: GearInstance | null = null;
	offHand: GearInstance |  null = null;
	armor: GearInstance | null = null;
	cloth: GearInstance | null = null;
	headWear: GearInstance | null = null;
	necklace: GearInstance | null = null;
	ring: GearInstance | null = null;

	async constructFromDB(
		mainHand: string | null, 
		offHand: string | null, 
		armor: string | null, 
		cloth: string | null,
		headWear: string | null,
		necklace: string | null,
		ring: string | null,
	) {
		this.mainHand = (mainHand != null)? await db.getWeapon(mainHand): null
		this.offHand = (offHand != null)? await db.getWeapon(offHand): null
		this.armor = (armor != null)? await db.getArmor(armor): null
		this.cloth = (cloth != null)? await db.getArmor(cloth): null
		this.headWear = (headWear != null)? await db.getArmor(headWear): null
		this.necklace = (necklace != null)? await db.getArmor(necklace): null
		this.ring = (ring != null)? await db.getArmor(ring): null
	}

	intoInterface(): CharacterEquipmentInterface {
		return {
			mainHand: {
				id: this.mainHand?.id ?? "None",
				name: this.mainHand?.name ?? "None",
				cost: this.mainHand?.cost ?? 0,
				weight: this.mainHand?.weight ?? 0,
				description: this.mainHand?.description ?? ""
			},
			offHand: {
				id: this.offHand?.id ?? "None",
				name: this.offHand?.name ?? "None",
				cost: this.offHand?.cost ?? 0,
				weight: this.offHand?.weight ?? 0,
				description: this.offHand?.description ?? ""
			},
			armor: {
				id: this.armor?.id ?? "None",
				name: this.armor?.name ?? "None",
				cost: this.armor?.cost ?? 0,
				weight: this.armor?.weight ?? 0,
				description: this.armor?.description ?? ""
			},
			cloth: {
				id: this.cloth?.id ?? "None",
				name: this.cloth?.name ?? "None",
				cost: this.cloth?.cost ?? 0,
				weight: this.cloth?.weight ?? 0,
				description: this.cloth?.description ?? ""
			},
			headWear: {
				id: this.headWear?.id ?? "None",
				name: this.headWear?.name ?? "None",
				cost: this.headWear?.cost ?? 0,
				weight: this.headWear?.weight ?? 0,
				description: this.headWear?.description ?? ""
			},
			necklace: {
				id: this.necklace?.id ?? "None",
				name: this.necklace?.name ?? "None",
				cost: this.necklace?.cost ?? 0,
				weight: this.necklace?.weight ?? 0,
				description: this.necklace?.description ?? ""
			},
			ring: {
				id: this.ring?.id ?? "None",
				name: this.ring?.name ?? "None",
				cost: this.ring?.cost ?? 0,
				weight: this.ring?.weight ?? 0,
				description: this.ring?.description ?? ""
			},
		};
	}

	
}
