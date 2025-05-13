class IndexPage {
    constructor() {
        // Get panel references
        this.loginPanel = document.querySelector(".login-panel");
        this.registerPanel = document.querySelector(".register-panel");
        this.forgotPasswordPanel = document.querySelector(".forgot-password-panel");
        // Map buttons
        this.loginButton = document.getElementById("loginButton");
        this.registerButton = document.getElementById("registerButton");
        this.forgotPasswordLink = document.getElementById("forgotPasswordLink");
        this.backToLoginButton = document.getElementById("backToLogin");
        this.cancelResetButton = document.getElementById("cancelReset");
        // Initialize
        this.init();
    }
    init() {
        // Set up event listeners
        this.setupEvents();
    }
    setupEvents() {
        // Toggle to register panel
        if (this.registerButton) {
            this.registerButton.addEventListener("click", () => {
                this.toggleToRegisterPanel();
            });
        }
        // Toggle to forgot password panel
        if (this.forgotPasswordLink) {
            this.forgotPasswordLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.toggleToForgotPasswordPanel();
            });
        }
        // Back to login from register
        if (this.backToLoginButton) {
            this.backToLoginButton.addEventListener("click", () => {
                this.toggleToLoginPanel();
            });
        }
        // Back to login from forgot password
        if (this.cancelResetButton) {
            this.cancelResetButton.addEventListener("click", () => {
                this.toggleToLoginPanel();
            });
        }
    }
    // Toggle functions
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
// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new IndexPage();
});
export default IndexPage;
