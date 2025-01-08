import { env } from "../../../Client/env.js";
import { failure, Result, success } from "../../../Common/Lib/Result.js";

class RestAPI {
    async send({path, data}: {path: string; data: any}): Promise<Result<any>> {
        try {
            // show popup 'Loading'
            const url = `${env.ip()}/${path}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const raw = await response.json();
            // hide popup 'Loading'
            return success(raw);
        } catch(error) {
            console.error('Error sending request:', error);
            // hide popup 'Loading'
            return failure('REST_ERROR', 'Error sending request');
        }
    }
}

export const restAPI = new RestAPI();