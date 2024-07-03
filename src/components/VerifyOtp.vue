<template>
    <div class="container">
      <div class="left-section">
      </div>
      <div class="right-section">
        <div class="main">
          <h1>Verify OTP</h1>
          <form @submit.prevent="verifyOtp">
            <input type="text" name="otp" placeholder="OTP" v-model="otp" />
            <input type="submit" value="Verify OTP" class="button" />
          </form>
          <div style="display: flex; align-items: center;">
            <p>Haven't got the OTP?</p>
            <button @click="resendOtp" class="button1">Click here to Resend OTP</button>
          </div>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="message" class="message">{{ message }}</div>
          <p class="mt-4 text-sm text-center text-gray-600">
            Remembered your password? <router-link to="/login" class="text-blue-500 hover:underline">Sign in here</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/utils/apiClient';
  
  export default {
    name: 'VerifyOtp',
    data() {
      return {
        otp: '',
        email: this.$route.query.email || '',
        error: null,
        message: null,
      };
    },
    methods: {
      async verifyOtp() {
        this.error = null;
        this.message = null;
        try {
          await apiClient.post('/auth/verifyOtpForgetPassword', {
            email: this.email,
            otp: this.otp,
          });
          this.$router.push({ name: 'ResetPassword', query: { email: this.email, otp: this.otp } });
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.error = error.response.data;
          } else {
            this.error = 'An error occurred during OTP verification. Please try again.';
          }
        }
      },
      async resendOtp() {
        this.error = null;
        this.message = null;
        try {
          const response = await apiClient.post('/auth/resendOtpForgetPassword', {
            email: this.email,
          });
          this.message = response.data;
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.error = error.response.data;
          } else {
            this.error = 'An error occurred while resending the OTP. Please try again.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
}

.container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-section, .right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main {
  background: rgba(255, 255, 255, 0.4);
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: "Poppins", sans-serif;
  width: 80%; /* Điều chỉnh kích thước của form nếu cần */
  max-height: 100%; /* Đảm bảo form không vượt quá chiều cao màn hình */
  margin-left: -550px;
  margin-top: 0px
}

h1 {
  cursor: default;
  user-select: none;
  font-size: 2.5rem; /* Giảm kích thước chữ của h1 */
}

input {
  border-radius: 3rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 50%; /* Điều chỉnh kích thước của input nếu cần */
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

input:hover {
  box-shadow: 0px 0px 8px -5px #000000;
}

input:active {
  box-shadow: 0px 0px 8px -5px #000000;
}

.button {
  background: lightgreen;
  cursor: pointer;
  user-select: none;
  padding: 8px 16px; /* Điều chỉnh kích thước của nút */
  border-radius: 3rem;
  border: none;
  font-size: 1rem; /* Giảm kích thước chữ của nút */
  width: 200px;
  margin: 10px 20px; /* Thêm khoảng cách giữa các nút */
}
.button1 {
  background: lightgreen;
  cursor: pointer;
  user-select: none;
  padding: 8px 16px; /* Điều chỉnh kích thước của nút */
  border-radius: 3rem;
  border: none;
  font-size: 1rem; /* Giảm kích thước chữ của nút */
  width: 240px;
  margin: 10px 20px; /* Thêm khoảng cách giữa các nút */
}
.error {
  color: red;
  margin-top: 10px;
}
.info {
  color: green;
  margin-top: 10px;
}
</style>
  