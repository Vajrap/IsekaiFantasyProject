import { LoginRequest, LoginResponse, LoginResponseStatus } from "../../../Common/RequestResponse/login";
import { env } from "../../env";
import { popup } from "../../classes/popup/popup";

class LoginModel {
  userField: HTMLInputElement;
  passwordField: HTMLInputElement;
  loginButton: HTMLButtonElement;
  constructor() {
    this.userField = document.getElementById("username") as HTMLInputElement; 
    this.passwordField = document.getElementById("password") as HTMLInputElement;
    this.loginButton = document.getElementById("loginButton") as HTMLButtonElement;

    // Check for auto login
    if (this.checkForAutoLogin()) {
      this.autoLogin();
    }

    // Adding event listener to the login button
    this.loginButton.addEventListener("click", this.submitLogin.bind(this));
  }

  getUsernameInput(): string {
    return this.userField.value;
  }

  getPasswordInput(): string {
    return this.passwordField.value;
  }

  redirectToAppropriatePage(statusType: LoginResponseStatus) {
    if (statusType === LoginResponseStatus.LoggedInWithCharacter) {
      window.location.href = '../HTMLs/game/game.html';
    } else {
      window.location.href = '../HTMLs/character_creation/character_creation.html';
    }
  }

  checkForAutoLogin(): boolean {
    const tokenExpiredAt = localStorage.getItem('isekaiFantasy_tokenExpiredAt');
    return tokenExpiredAt !== null && new Date(tokenExpiredAt) > new Date(); // Token is valid if it's not expired
  }

  async autoLogin() {
    try {
      const url = `${env.ip()}/auth/autoLogin`;
      const token = localStorage.getItem('isekaiFantasy_token') ?? '';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    const responseData: LoginResponse = await response.json();
      if (
        responseData.status === LoginResponseStatus.LoggedInWithCharacter || 
        responseData.status === LoginResponseStatus.LoggedInWithNoCharacter
      ) {
        this.redirectToAppropriatePage(responseData.status);
      }
    } catch (error) {
      //This is a silent error, no need to show popup
      console.error('Auto login error:', error);
      localStorage.removeItem('isekaiFantasy_token');
      localStorage.removeItem('isekaiFantasy_tokenExpiredAt');
    }
  }

  async submitLogin() {
    try {
      const url = `${env.ip()}/auth/login`;
      const jsonData: LoginRequest = {
        username: this.getUsernameInput(),
        password: this.getPasswordInput()
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
  
      const responseData: LoginResponse = await response.json();
      if (
        responseData.status === LoginResponseStatus.LoggedInWithCharacter || 
        responseData.status === LoginResponseStatus.LoggedInWithNoCharacter
      ) {
        if (responseData.token && responseData.tokenExpiredAt) {
          localStorage.setItem('isekaiFantasy_token', responseData.token);
          localStorage.setItem('isekaiFantasy_tokenExpiredAt', responseData.tokenExpiredAt);
        }
        this.redirectToAppropriatePage(responseData.status);
      } else {
        popup.show(
          responseData.status, 
          responseData.message,
          [{
            label: "ตกลง",
            action: popup.hide
          }]
        );
      }
    } catch (error) {
      if (error instanceof TypeError) {
        console.log('เกิดข้อผิดพลาดเกี่ยวกับเครือข่าย:', error);
        popup.show(
          'ข้อผิดพลาดทางเครือข่าย',
          'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณหรือทดลองใหม่อีกครั้ง',
          [{
            label: 'ตกลง',
            action: popup.hide
          }]
        );
      } else if (error instanceof Error && error.message.includes('HTTP error')) {
        const statusCode = error.message ? parseInt(error.message.split(':').pop()?.trim() ?? '0') : 0;
        console.log(`ข้อผิดพลาด HTTP: ${statusCode}`);
        popup.show(
          'ข้อผิดพลาดจากเซิร์ฟเวอร์',
          `เซิร์ฟเวอร์ส่งข้อผิดพลาดกลับมา (HTTP ${statusCode}) กรุณาลองใหม่อีกครั้ง`,
          [{
            label: 'ตกลง',
            action: popup.hide
          }]
        );
      } else {
        console.error('ข้อผิดพลาดที่ไม่คาดคิด:', error);
        popup.show(
          'ข้อผิดพลาดที่ไม่คาดคิด',
          'เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง',
          [{
            label: 'ตกลง',
            action: popup.hide
          }]
        );
      }
    }
  }
}

// Create an instance of LoginModel
export const loginModel = new LoginModel();
