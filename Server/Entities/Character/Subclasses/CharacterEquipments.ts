import { db } from "../../../Database";
import { GearInstance } from "../../Items/GearInstance/GearInstance";

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
}
