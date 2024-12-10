// register.js

class RegisterModel {
    constructor() {
        this.usernameField = document.getElementById("reg-username");
        this.passwordField = document.getElementById("reg-password");
        this.confirmPasswordField = document.getElementById("reg-confirm-password");
        this.eulaCheckbox = document.getElementById("eula-checkbox");
        this.registerForm = document.getElementById("registerForm");
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

    async submitRegister(event) {
        event.preventDefault();

        try {
            const url = `${server.ip()}/auth/register`;

            const jsonData = JSON.stringify({
                username: this.getUsernameInput(),
                password: this.getPasswordInput()
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.result.message);
            }

            if (responseData.result.status === 'success') {
                popup.show(
                    responseData.result.status,
                    responseData.result.message,
                    [{
                        label: "Ok",
                        action: Popup.hide
                        // () => { 
                            // window.location.href = '../../index.html' 
                            // console.log('Redirect to login page');
                        // }
                    }]
                );
                return;
            } else {
                popup.show(
                    responseData.result.status,
                    responseData.result.message,
                    [{
                        label: "Ok",
                        action: Popup.hide
                    }]
                );
            }
        } catch (error) {
            console.error('Error:', error);
            this.showPopup({ result: { status: 'error', message: 'An unexpected error occurred. Please try again later.' } });
        }
    }

}

const registerModel = new RegisterModel();
