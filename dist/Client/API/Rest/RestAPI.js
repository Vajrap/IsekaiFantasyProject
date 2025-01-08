var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { env } from "../../../Client/env.js";
import { failure, success } from "../../../Common/Lib/Result.js";
class RestAPI {
    send(_a) {
        return __awaiter(this, arguments, void 0, function* ({ path, data }) {
            try {
                // show popup 'Loading'
                const url = `${env.ip()}/${path}`;
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const raw = yield response.json();
                // hide popup 'Loading'
                return success(raw);
            }
            catch (error) {
                console.error('Error sending request:', error);
                // hide popup 'Loading'
                return failure('REST_ERROR', 'Error sending request');
            }
        });
    }
}
export const restAPI = new RestAPI();
