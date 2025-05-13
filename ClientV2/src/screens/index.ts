class IndexPage {
  // Panel references
  loginPanel: HTMLElement;
  registerPanel: HTMLElement;
  forgotPasswordPanel: HTMLElement;

  // Button references
  loginButton: HTMLElement | null;
  registerButton: HTMLElement | null;
  forgotPasswordLink: HTMLElement | null;
  backToLoginButton: HTMLElement | null;
  cancelResetButton: HTMLElement | null;

  constructor() {
    // Get panel references
    this.loginPanel = document.querySelector(".login-panel") as HTMLElement;
    this.registerPanel = document.querySelector(
      ".register-panel",
    ) as HTMLElement;
    this.forgotPasswordPanel = document.querySelector(
      ".forgot-password-panel",
    ) as HTMLElement;

    // Map buttons
    this.loginButton = document.getElementById("loginButton");
    this.registerButton = document.getElementById("registerButton");
    this.forgotPasswordLink = document.getElementById("forgotPasswordLink");
    this.backToLoginButton = document.getElementById("backToLogin");
    this.cancelResetButton = document.getElementById("cancelReset");

    // Initialize
    this.init();
  }

  init(): void {
    // Set up event listeners
    this.setupEvents();
  }

  setupEvents(): void {
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
  toggleToLoginPanel(): void {
    this.loginPanel.classList.remove("hidden");
    this.registerPanel.classList.add("hidden");
    this.forgotPasswordPanel.classList.add("hidden");
  }

  toggleToRegisterPanel(): void {
    this.loginPanel.classList.add("hidden");
    this.registerPanel.classList.remove("hidden");
    this.forgotPasswordPanel.classList.add("hidden");
  }

  toggleToForgotPasswordPanel(): void {
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
