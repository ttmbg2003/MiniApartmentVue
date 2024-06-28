<template>
    <div class="container">
      <div class="left-section">
      </div>
      <div class="right-section">
        <div class="main">
          <h1>Forget Password</h1>
          <form v-if="!otpSent" @submit.prevent="forgetPassword">
            <input type="email" name="email" placeholder="Email Address" v-model="email" />
            <input type="submit" value="Send OTP" class="button" />
          </form>
  
          <form v-else @submit.prevent="verifyOtp">
            <input type="text" name="otp" placeholder="OTP" v-model="otp" />
            <input type="password" name="newPassword" placeholder="New Password" v-model="newPassword" />
            <input type="password" name="confirmPassword" placeholder="Confirm New Password" v-model="confirmPassword" />
            <input type="submit" value="Verify OTP" class="button" />
          </form>
  
          <div v-if="error" class="error">{{ error }}</div>
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
    name: 'ForgetPassword',
    data() {
      return {
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
        otpSent: false,
        error: null,
      };
    },
    methods: {
      async forgetPassword() {
        this.error = null; // Reset error message
        if (!this.email) {
          this.error = "Please fill in your email.";
          return;
        }
  
        try {
          const response = await apiClient.post('/auth/forgetPassword', {
            email: this.email
          });
  
          this.otpSent = true; // OTP sent, proceed to OTP verification step
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.error = error.response.data;
          } else {
            this.error = 'An error occurred during the password reset process. Please try again.';
          }
        }
      },
      async verifyOtp() {
        this.error = null; // Reset error message
        console.log('New Password:', this.newPassword);
        console.log('Confirm Password:', this.confirmPassword);
        if (this.newPassword !== this.confirmPassword) {
          this.error = "Passwords do not match!";
          return;
        }
  
        try {
          const response = await apiClient.post('/auth/verifyOtpForgetPassword', {
            email: this.email,
            otp: this.otp,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
          });
  
          alert('Password reset successfully');
          this.$router.push('/login');
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.error = error.response.data;
          } else {
            this.error = 'An error occurred during OTP verification. Please try again.';
          }
        }
      }
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
    width: 80%;
    max-height: 100%;
    margin-left: -550px;
    margin-top: -80px;
  }
  
  h1 {
    cursor: default;
    user-select: none;
    font-size: 2.5rem;
  }
  
  input {
    border-radius: 3rem;
    border: none;
    padding: 10px;
    text-align: center;
    outline: none;
    margin: 10px;
    width: 50%;
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
    padding: 8px 16px;
    border-radius: 3rem;
    border: none;
    font-size: 1rem;
    width: 200px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  