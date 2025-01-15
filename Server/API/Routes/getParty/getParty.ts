import { game } from '../../../Game/Game';
import { failure, Result, success } from '../../../../Common/Lib/Result';
import { GetPartyResponse } from '../../../../Common/RequestResponse/characterWS';

export async function getPartyHandler(
    user_id: string
): Promise<Result<GetPartyResponse>> {
    console.log(`Get Party Handler called`)
    const existingParty = await game.partyManager.getPartyByID(user_id);
    if (!existingParty) {
        console.log('Party not found');
        return failure('PARTY_NOT_FOUND', 'Party not found');
    }
    let partyData = existingParty.intoInterface();

    return success({
        type: 'GET_PARTY',
        status: 'SUCCESS',
        message: "เข้าสู่ระบบสำเร็จ",
        party: partyData
    });
}

async function test() {
    // Result<GetPartyResponse>
    const result = await getPartyHandler('test');

    if (result.success) {
        const b = result.data;
    } else {
        const a = result.error;
    }

    
}