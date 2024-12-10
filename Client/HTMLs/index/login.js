class LoginModel {
  constructor() {
    this.userField = document.getElementById("username");
    this.passwordField = document.getElementById("password");
    this.loginButton = document.getElementById("loginButton");

    // Adding event listener to the login button
    this.loginButton.addEventListener("click", this.submitLogin.bind(this));
  }

  getUsernameInput() {
    return this.userField.value;
  }

  getPasswordInput() {
    return this.passwordField.value;
  }

  async submitLogin() {
    try {
      const url = `${server.ip()}/auth/login`;
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
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData.result);
      if (responseData.result.status === 'success') {
        const userIDtoStore = responseData.result.userID;
        localStorage.setItem('isekaiFantasy_userID', userIDtoStore);
  
        if (responseData.result.characterID !== undefined) {
          localStorage.setItem('isekaiFantasy_characterID', responseData.result.characterID);
          // Go to main game loaded from the data
          window.location.href = '../HTMLs/game/game.html';
          console.log('เข้าสู่เกม');
        } else {
          window.location.href = '../HTMLs/character_creation/character_creation.html';
          console.log('เข้าสู่หน้าสร้างตัวละคร');
        }
      } else {
        popup.show(
          responseData.result.status, 
          responseData.result.message,
          [{
            label: "ตกลง",
            action: Popup.hide
          }]
        );
      }
    } catch (error) {
      if (error.name === 'TypeError') {
        console.log('เกิดข้อผิดพลาดเกี่ยวกับเครือข่าย:', error);
        popup.show(
          'ข้อผิดพลาดทางเครือข่าย',
          'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณหรือทดลองใหม่อีกครั้ง',
          [{
            label: 'ตกลง',
            action: Popup.hide
          }]
        );
      } else if (error.message.includes('HTTP error')) {
        const statusCode = parseInt(error.message.split(':').pop().trim());
        console.log(`ข้อผิดพลาด HTTP: ${statusCode}`);
        popup.show(
          'ข้อผิดพลาดจากเซิร์ฟเวอร์',
          `เซิร์ฟเวอร์ส่งข้อผิดพลาดกลับมา (HTTP ${statusCode}) กรุณาลองใหม่อีกครั้ง`,
          [{
            label: 'ตกลง',
            action: Popup.hide
          }]
        );
      } else {
        console.error('ข้อผิดพลาดที่ไม่คาดคิด:', error);
        popup.show(
          'ข้อผิดพลาดที่ไม่คาดคิด',
          'เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง',
          [{
            label: 'ตกลง',
            action: Popup.hide
          }]
        );
      }
    }
  }
}

// Create an instance of LoginModel
const loginModel = new LoginModel();
