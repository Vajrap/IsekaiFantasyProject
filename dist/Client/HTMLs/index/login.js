var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LoginResponseStatus } from "../../../Common/RequestResponse/login.js";
import { env } from "../../env.js";
import { popup } from "../../classes/popup/popup.js";
class LoginModel {
    constructor() {
        this.userField = document.getElementById("username");
        this.passwordField = document.getElementById("password");
        this.loginButton = document.getElementById("loginButton");
        // Check for auto login
        if (this.checkForAutoLogin()) {
            this.autoLogin();
        }
        // Adding event listener to the login button
        this.loginButton.addEventListener("click", this.submitLogin.bind(this));
    }
    getUsernameInput() {
        return this.userField.value;
    }
    getPasswordInput() {
        return this.passwordField.value;
    }
    redirectToAppropriatePage(statusType) {
        if (statusType === LoginResponseStatus.LoggedInWithCharacter) {
            window.location.href = '../Client/HTMLs/game/game.html';
        }
        else {
            window.location.href = '../Client/HTMLs/character_creation/character_creation.html';
        }
    }
    checkForAutoLogin() {
        const tokenExpiredAt = localStorage.getItem('isekaiFantasy_tokenExpiredAt');
        return tokenExpiredAt !== null && new Date(tokenExpiredAt) > new Date(); // Token is valid if it's not expired
    }
    autoLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const url = `${env.ip()}/autoLogin`;
                const token = (_a = localStorage.getItem('isekaiFantasy_token')) !== null && _a !== void 0 ? _a : '';
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = yield response.json();
                if (responseData.status === LoginResponseStatus.LoggedInWithCharacter ||
                    responseData.status === LoginResponseStatus.LoggedInWithNoCharacter) {
                    this.redirectToAppropriatePage(responseData.status);
                }
            }
            catch (error) {
                //This is a silent error, no need to show popup
                console.error('Auto login error:', error);
                localStorage.removeItem('isekaiFantasy_token');
                localStorage.removeItem('isekaiFantasy_tokenExpiredAt');
            }
        });
    }
    submitLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const url = `${env.ip()}/login`;
                const jsonData = {
                    username: this.getUsernameInput(),
                    password: this.getPasswordInput()
                };
                const raw = yield this.fetchWithJson(url, jsonData);
                const responseData = raw.result;
                localStorage.setItem('isekaiFantasy_userID', (_a = responseData.userID) !== null && _a !== void 0 ? _a : '');
                if (responseData.status === LoginResponseStatus.LoggedInWithCharacter ||
                    responseData.status === LoginResponseStatus.LoggedInWithNoCharacter) {
                    this.saveToken(responseData);
                    this.redirectToAppropriatePage(responseData.status);
                }
                else {
                    // Case: Expected Login failed. (e.g. Wrong password, user not found)
                    popup.show(responseData.status, responseData.message, [{
                            label: "ตกลง",
                            action: popup.hide.bind(popup)
                        }]);
                }
            }
            catch (error) {
                // Case: Unexpected error
                this._loginErrorHandler(error);
            }
        });
    }
    _loginErrorHandler(error) {
        var _a, _b;
        if (error instanceof TypeError) {
            console.log('เกิดข้อผิดพลาดเกี่ยวกับเครือข่าย:', error);
            popup.show('ข้อผิดพลาดทางเครือข่าย', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณหรือทดลองใหม่อีกครั้ง', [{
                    label: 'ตกลง',
                    action: popup.hide.bind(popup)
                }]);
        }
        else if (error instanceof Error && error.message.includes('HTTP error')) {
            const statusCode = error.message ? parseInt((_b = (_a = error.message.split(':').pop()) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '0') : 0;
            console.log(`ข้อผิดพลาด HTTP: ${statusCode}`);
            popup.show('ข้อผิดพลาดจากเซิร์ฟเวอร์', `เซิร์ฟเวอร์ส่งข้อผิดพลาดกลับมา (HTTP ${statusCode}) กรุณาลองใหม่อีกครั้ง`, [{
                    label: 'ตกลง',
                    action: popup.hide.bind(popup)
                }]);
        }
        else {
            console.error('ข้อผิดพลาดที่ไม่คาดคิด:', error);
            popup.show('ข้อผิดพลาดที่ไม่คาดคิด', 'เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง', [{
                    label: 'ตกลง',
                    action: popup.hide.bind(popup)
                }]);
        }
    }
    saveToken(responseData) {
        if (responseData.token && responseData.tokenExpiredAt) {
            localStorage.setItem('isekaiFantasy_token', responseData.token);
            localStorage.setItem('isekaiFantasy_tokenExpiredAt', responseData.tokenExpiredAt);
        }
    }
    fetchWithJson(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            return yield response.json();
        });
    }
}
// Create an instance of LoginModel
export const loginModel = new LoginModel();
