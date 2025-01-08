import { game } from '../../../Game/Game';
import { GetPartyResponse } from '../../../../Common/RequestResponse/characterWS';

export async function getPartyHandler(
    user_id: string
): Promise<GetPartyResponse> {
    console.log(`Get Party Handler called`)
    const existingParty = await game.partyManager.getPartyByID(user_id);
    if (!existingParty) {
        console.log('Party not found');
        return { 
            type: 'GET_PARTY',
            status: 'FAILURE', 
            message: "ไม่พบ Party นี้ในระบบ" 
        }; 
    }
    let partyData = existingParty.intoInterface();

    return {
        type: 'GET_PARTY',
        status: 'SUCCESS',
        message: "เข้าสู่ระบบสำเร็จ",
        party: partyData
    };
}
