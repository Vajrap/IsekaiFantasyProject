var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { popup } from "../../classes/popup/popup";
import { env } from "../../env";
import { RegisterReponseStatus } from "../../../Common/RequestResponse/register";
class RegisterModel {
    constructor() {
        this.usernameField = document.getElementById("reg-username");
        this.passwordField = document.getElementById("reg-password");
        this.confirmPasswordField = document.getElementById("reg-confirm-password");
        this.eulaCheckbox = document.getElementById("eula-checkbox");
        this.registerButton = document.querySelector(".registerButton");
        // Bind the submitRegister method to the current instance
        this.submitRegister = this.submitRegister.bind(this);
        this.checkPasswords = this.checkPasswords.bind(this);
        // Adding event listener to the register button
        this.passwordField.addEventListener("input", this.checkPasswords);
        this.confirmPasswordField.addEventListener("input", this.checkPasswords);
        this.usernameField.addEventListener("input", this.checkPasswords);
        this.eulaCheckbox.addEventListener("change", this.checkPasswords);
        this.registerButton.addEventListener("click", this.submitRegister);
    }
    getUsernameInput() {
        return this.usernameField.value;
    }
    getPasswordInput() {
        return this.passwordField.value;
    }
    getConfirmPasswordInput() {
        return this.confirmPasswordField.value;
    }
    isEulaAccepted() {
        return this.eulaCheckbox.checked;
    }
    checkPasswords() {
        const username = this.getUsernameInput();
        const password = this.getPasswordInput();
        const confirmPassword = this.getConfirmPasswordInput();
        const eulaAccepted = this.isEulaAccepted();
        if (username.length > 0 && password === confirmPassword && eulaAccepted) {
            this.registerButton.classList.remove("disabled");
        }
        else {
            this.registerButton.classList.add("disabled");
        }
    }
    submitRegister(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                const url = `${env.ip()}/register`;
                const jsonData = {
                    username: this.getUsernameInput(),
                    password: this.getPasswordInput(),
                };
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                const responseData = yield response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                if (responseData.status === RegisterReponseStatus.Registered) {
                    popup.show(responseData.status, responseData.message, [{
                            label: "ตกลง",
                            action: popup.hide
                        }]);
                    return;
                }
                else {
                    popup.show(responseData.status, responseData.message, [{
                            label: "ตกลง",
                            action: popup.hide
                        }]);
                }
            }
            catch (error) {
                console.error('Error:', error);
                popup.show("ข้อผิดพลาด", "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง", [{
                        label: "ตกลง",
                        action: popup.hide
                    }]);
            }
        });
    }
}
export const registerModel = new RegisterModel();
