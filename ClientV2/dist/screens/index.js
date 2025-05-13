class IndexPage {
    constructor() {
        this.loginPanel = document.querySelector(".login-panel");
        this.registerPanel = document.querySelector(".register-panel");
        this.forgotPasswordPanel = document.querySelector(".forgot-password-panel");
        this.loginButton = document.getElementById("loginButton");
        this.registerButton = document.getElementById("registerButton");
        this.forgotPasswordLink = document.getElementById("forgotPasswordLink");
        this.backToLoginButton = document.getElementById("backToLogin");
        this.cancelResetButton = document.getElementById("cancelReset");
        this.init();
    }
    init() {
        this.setupEvents();
    }
    setupEvents() {
        if (this.registerButton) {
            this.registerButton.addEventListener("click", () => {
                this.toggleToRegisterPanel();
            });
        }
        if (this.forgotPasswordLink) {
            this.forgotPasswordLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.toggleToForgotPasswordPanel();
            });
        }
        if (this.backToLoginButton) {
            this.backToLoginButton.addEventListener("click", () => {
                this.toggleToLoginPanel();
            });
        }
        if (this.cancelResetButton) {
            this.cancelResetButton.addEventListener("click", () => {
                this.toggleToLoginPanel();
            });
        }
    }
    toggleToLoginPanel() {
        this.loginPanel.classList.remove("hidden");
        this.registerPanel.classList.add("hidden");
        this.forgotPasswordPanel.classList.add("hidden");
    }
    toggleToRegisterPanel() {
        this.loginPanel.classList.add("hidden");
        this.registerPanel.classList.remove("hidden");
        this.forgotPasswordPanel.classList.add("hidden");
    }
    toggleToForgotPasswordPanel() {
        this.loginPanel.classList.add("hidden");
        this.registerPanel.classList.add("hidden");
        this.forgotPasswordPanel.classList.remove("hidden");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new IndexPage();
});
export default IndexPage;
//# sourceMappingURL=index.js.map