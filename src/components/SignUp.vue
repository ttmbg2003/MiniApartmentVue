<template>
  <div class="container">
    <div class="left-section">
      <!-- <img src="your-image-url.jpg" alt="Sign Up Image" class="background-image"> -->
    </div>
    <div class="right-section">
      <div class="main">
        <h1>Sign Up</h1>
        <form @submit.prevent="signUp">
          <input type="text" name="firstName" placeholder="First Name" v-model="firstName" />
          <input type="text" name="lastName" placeholder="Last Name" v-model="lastName" />
          <input type="email" name="email" placeholder="Email Address" v-model="email" />
          <input type="password" name="password" placeholder="Password" v-model="password" />
          <input type="password" name="rePassword" placeholder="Confirm Password" v-model="rePassword" />
          <input type="submit" value="Sign Up" class="button" />
        </form>

        <div v-if="error" class="error">{{ error }}</div>
        <p class="mt-4 text-sm text-center text-gray-600">
          Already have an account? <router-link to="/login" class="text-blue-500 hover:underline">Sign in here</router-link>
        </p>
      </div>
    </div>

    <!-- OTP Modal -->
    <div v-if="otpSent" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Verify OTP</h2>
        <form @submit.prevent="verifyOtp">
          <input type="text" name="otp" placeholder="OTP" v-model="otp" />
          <input type="submit" value="Verify OTP" class="button" />
          <div style="display: flex; align-items: center;">
            <p>Haven't got the OTP?</p>
            <button @click="resendOtp" class="button1">Click here to Resend OTP</button>
          </div>
          <div v-if="otpResent" class="info">{{ otpResentMessage }}</div>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/utils/apiClient';

export default {
  name: 'SignUp',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      otp: '',
      otpSent: false,
      error: null,
      otpResent: false,
      otpResentMessage: 'OTP sent to your email. Please verify to complete registration.',
    };
  },
  methods: {
    async signUp() {
      this.error = null;
      this.otpResent = false;

      if (!this.firstName || !this.lastName || !this.email || !this.password || !this.rePassword) {
        this.error = "Please fill in all fields.";
        return;
      }

      if (this.password !== this.rePassword) {
        this.error = "Passwords do not match!";
        return;
      }

      try {
        const response = await apiClient.post('/auth/signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          rePassword: this.rePassword
        });

        this.otpSent = true;
        this.error = null;
      } catch (error) {
        this.otpResent = false;
        if (error.response && error.response.status === 400) {
          this.error = error.response.data;
        } else {
          this.error = 'An error occurred during sign up. Please try again.';
        }
      }
    },
    async verifyOtp() {
      this.error = null;
      this.otpResent = false;

      try {
        const response = await apiClient.post('/auth/verifyOtp', {
          email: this.email,
          otp: this.otp,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password
        });

        alert('User sign up successfully');
        this.$router.push('/login');
      } catch (error) {
        this.otpResent = false;
        if (error.response && error.response.status === 400) {
          this.error = error.response.data;
        } else {
          this.error = 'An error occurred during OTP verification. Please try again.';
        }
      }
    },
    async resendOtp() {
      this.error = null;
      this.otpResent = false;

      try {
        const response = await apiClient.post('/auth/resendOtpRegister', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          rePassword: this.rePassword
        });

        this.error = null;
        this.otpResent = true;
      } catch (error) {
        this.otpResent = false;
        if (error.response && error.response.status === 400) {
          this.error = error.response.data;
        } else {
          this.error = 'An error occurred during OTP resend. Please try again.';
        }
      }
    },
    closeModal() {
      this.otpSent = false;
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
  margin-top: 0px;
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
  margin: 10px 20px;
}
.button1 {
  background: lightgreen;
  cursor: pointer;
  user-select: none;
  padding: 8px 16px;
  border-radius: 3rem;
  border: none;
  font-size: 1rem;
  width: 240px;
  margin: 10px 20px;
}
.error {
  color: red;
  margin-top: 10px;
}
.info {
  color: green;
  margin-top: 10px;
}

.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
