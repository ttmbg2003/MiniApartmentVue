<template>
  <div class="main" :style="mainStyle">
    <h1>Log in</h1>
    <form v-if="!otpSent" @submit.prevent="login">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Email Address"
        v-model="email"
        :style="input"
      />
      <br />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
        :style="input"
      />
      <br />
      <input
        type="submit"
        value="Log in"
        class="button"
        id="done"
        :style="inputStyle"
      />
      <br />
    </form>
    
    <p v-if="!otpSent" style="text-align: right; color: grey;">
      <router-link to="/forgetpassword">Forget Password?</router-link>
    </p>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- OTP Modal -->
    <div v-if="otpSent" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Verify OTP</h2>
        <form @submit.prevent="verifyOtp">
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter OTP"
            v-model="otp"
            :style="input"
          />
          <br />
          <input
            type="submit"
            value="Verify OTP"
            class="button"
            id="done"
            :style="inputStyle"
          />
          <br />
          <button @click.prevent="resendOtp" :style="input">Resend OTP</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="otpResent" class="info">{{ otpResentMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/utils/apiClient';
import { login as loginAuth } from '@/type/auth';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  props: {
    mainStyle: String,
    inputStyle: String,
  },
  data() {
    return {
      email: '',
      password: '',
      otp: '',
      error: null,
      otpSent: false,
      otpResent: false,
      otpResentMessage: 'OTP resent. Please check your email.',
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/auth/login', {
          email: this.email,
          password: this.password,
        });
        if (response.data === "Otp is sent successfully, please check the OTP to verify") {
          this.otpSent = true;
          this.error = null;
        } else {
          const token = response.data;
          loginAuth(token);
          this.$router.push('/home');
        }
      } catch (error) {
        this.error = 'Invalid email or password';
      }
    },
    async verifyOtp() {
      try {
        const response = await apiClient.post('/auth/verifyOtpLogin', {
          email: this.email,
          otp: this.otp,
        });
        const token = response.data;
        
        loginAuth(token);
        this.$router.push('/home');
      } catch (error) {
        this.error = 'Invalid OTP';
      }
    },
    async resendOtp() {
      try {
        await apiClient.post('/auth/resendOtpLogin', {
          email: this.email,
        });
        this.error = null;
        this.otpResent = true;
      } catch (error) {
        this.error = 'Error resending OTP';
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
a {
  text-decoration: none;
}
.main {
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: "Poppins", sans-serif;
}

h1 {
  cursor: default;
  user-select: none;
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

#done {
  background: lightgreen;
}

.button {
  cursor: pointer;
  user-select: none;
}

img {
  height: 2.2rem;
  margin: 10px;
  user-select: none;
}

img:hover {
  box-shadow: 0px 0px 8px -5px #000000;
  cursor: pointer;
  border-radius: 200rem;
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
