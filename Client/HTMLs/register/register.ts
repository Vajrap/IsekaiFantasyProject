import { popup } from "../../classes/popup/popup.js";
import { env } from "../../env.js";
import { 
    RegisterRequest, 
    RegisterResponse, 
    RegisterReponseStatus 
} from "../../../Common/RequestResponse/register.js";

class RegisterModel {
    private usernameField: HTMLInputElement;
    private passwordField: HTMLInputElement;
    private confirmPasswordField: HTMLInputElement;
    private eulaCheckbox: HTMLInputElement;
    private registerButton: HTMLButtonElement;
    constructor() {
        this.usernameField = document.getElementById("reg-username") as HTMLInputElement;
        this.passwordField = document.getElementById("reg-password") as HTMLInputElement;
        this.confirmPasswordField = document.getElementById("reg-confirm-password") as HTMLInputElement;
        this.eulaCheckbox = document.getElementById("eula-checkbox") as HTMLInputElement;
        this.registerButton = document.querySelector(".registerButton") as HTMLButtonElement;

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

    async submitRegister(event: Event) {
        event.preventDefault();

        try {
            const url = `${env.ip()}/register`;
            const jsonData: RegisterRequest = {
                username: this.getUsernameInput(),
                password: this.getPasswordInput(),
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const raw = await response.json();
            const responseData: RegisterResponse  = raw.result;

            if (responseData.status === RegisterReponseStatus.Registered) {
                popup.show(
                    responseData.status,
                    responseData.message,
                    [{
                        label: "ตกลง",
                        action: popup.hide.bind(popup)
                    }]
                );
                return;
            } else {
                popup.show(
                    responseData.status,
                    responseData.message,
                    [{
                        label: "ตกลง",
                        action: popup.hide.bind(popup)
                    }]
                );
            }
        } catch (error) {
            console.error('Error:', error);
            popup.show(
                "ข้อผิดพลาด",
                "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง",
                [{
                    label: "ตกลง",
                    action: popup.hide.bind(popup)
                }]
            );        
        }
    }

}

export const registerModel = new RegisterModel();
