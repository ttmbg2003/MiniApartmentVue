<template>
  <div class="login-page">
    <div class="login-container">
      <div class="navbar">
        <img
          src="@/components/icons/TheNiceHouseLogo.png"
          alt="Logo"
          class="navbar-logo"
        />
      </div>
      <div class="illustration">
        <img
          src="@/components/icons/login-illustration.png"
          alt="Login Illustration"
        />
      </div>
      <div class="login-form">
        <p class="signup-link">
          Not a member?
          <router-link to="/signup" class="navbar-link"
            >Sign up now</router-link
          >
        </p>
        <h2>Log in</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email Address*</label>
            <input type="email" id="email" v-model="email" required />
            <span style="color: red" v-if="msg.email">{{ msg.email }}</span>
          </div>
          <div class="form-group">
            <label for="password">Password*</label>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
              />
              <span @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </span>
            </div>
          </div>
          <div class="form-group remember-me">
            <div>
              <input type="checkbox" id="rememberMe" v-model="rememberMe" />
              <label for="rememberMe">Remember me</label>
            </div>
            <router-link
              to="/forgetpassword"
              class="forgot-password"
              style="text-decoration: none"
              >Forgot Password?</router-link
            >
          </div>
          <button type="submit" class="login-button">Log in</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>

    <!-- OTP Modal -->
    <div v-if="otpSent" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>OTP Verification</h2>
        <p>
          Enter the verification code we just sent to your email {{ email }}.
        </p>
        <form @submit.prevent="verifyOtp" @keydown.enter="verifyOtp">
          <div class="otp-inputs">
            <input
              class="input"
              type="text"
              inputmode="numeric"
              maxlength="1"
              v-model="otp1"
              ref="otp1Input"
              @input="focusNext(otp1, 1)"
            />
            <input
              class="input"
              type="text"
              inputmode="numeric"
              maxlength="1"
              v-model="otp2"
              ref="otp2Input"
              @input="focusNext(otp2, 2)"
            />
            <input
              class="input"
              type="text"
              inputmode="numeric"
              maxlength="1"
              v-model="otp3"
              ref="otp3Input"
              @input="focusNext(otp3, 3)"
            />
            <input
              class="input"
              type="text"
              inputmode="numeric"
              maxlength="1"
              v-model="otp4"
              ref="otp4Input"
              @input="focusNext(otp4, 4)"
            />
            <input
              class="input"
              type="text"
              inputmode="numeric"
              maxlength="1"
              v-model="otp5"
              ref="otp5Input"
              @input="focusNext(otp5, 5)"
            />
            <input
              class="input"
              type="text"
              inputmode="numeric"
              maxlength="1"
              v-model="otp6"
              ref="otp6Input"
              @input="focusNext(otp6, 6)"
            />
          </div>
          <p>
            Didn't you receive the OTP?
            <a @click.prevent="resendOtp" class="resend-otp">Resend OTP</a>
          </p>
          <div class="modal-actions">
            <button @click.prevent="closeModal" class="cancel-button">
              Cancel
            </button>
            <button type="submit" class="verify-button">Verify</button>
          </div>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="otpResent" class="info">{{ otpResentMessage }}</div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <div
          class="icon-animated icon-animated-tick"
          tabindex="-1"
          aria-hidden="true"
        >
          <svg
            class="circle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <div class="tick">
            <svg
              class="tick-leg1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 52"
            >
              <polygon class="" points="1,41 0,48 25,52 25,45" />
            </svg>
            <svg
              class="tick-leg2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 52"
            >
              <polygon class="" points="18,45 25,47 25,0 18,0" />
            </svg>
          </div>
        </div>
        <h2>Congratulations!</h2>
        <p>Your account has been verified successfully. Welcome to Homepage.</p>
        <button @click="closeSuccessModal" class="verify-button">Done</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/utils/apiClient";
import { login as loginAuth } from "@/type/auth";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
      msg: [],
      rememberMe: false,
      showPassword: false,
      otpSent: false,
      otpResent: false,
      otpResentMessage: "OTP resent. Please check your email.",
      error: null,
      showSuccessModal: false,
    };
  },
  methods: {
    watch: {
      email(value) {
        // binding this to the data value in the email input
        this.email = value;
        this.validateEmail(value);
      },
    },
    validateEmail(value) {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "This Email Address is not valid";
      }
    },
    async login() {
      try {
        const response = await apiClient.post("/auth/login", {
          email: this.email,
          password: this.password,
        });
        if (
          response.data ===
          "Otp is sent successfully, please check the OTP to verify"
        ) {
          this.otpSent = true;
          this.error = null;
        } else {
          const token = response.data;
          loginAuth(token);
          this.$router.push("/home");
        }
      } catch (error) {
        this.error = "This Email Address or Password is not incorrect. Retry!";
      }
    },
    async verifyOtp() {
      try {
        const otp =
          this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
        const response = await apiClient.post("/auth/verifyOtpLogin", {
          email: this.email,
          otp: otp,
        });
        const token = response.data;
        loginAuth(token);
        this.showSuccessModal = true;
        this.error = null; // Clear any previous errors
        console.log("OTP verified successfully. Token:", token);
      } catch (error) {
        this.error = "Incorrect OTP provided. Retry!";
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push("/home");
    },
    async resendOtp() {
      try {
        await apiClient.post("/auth/resendOtpLogin", {
          email: this.email,
        });
        this.error = null;
        this.otpResent = true;
      } catch (error) {
        this.error = "Error resending OTP";
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    closeModal() {
      this.otpSent = false;
    },
    focusNext(value, index) {
      const val = value.trim();
      if (val.length === 1) {
        const nextInput = this.$refs["otp" + (index + 1) + "Input"];
        if (nextInput) {
          nextInput.focus();
        }
      }
    },
  },
};
</script>

<style scoped>
.icon-animated {
  width: 80px;
  height: 80px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}

.icon-animated .tick svg {
  position: absolute;
  left: 22px;
  right: 0;
  top: 12px;
  bottom: 0;
  fill: #fff;
  width: 25px;
  height: 52px;
}

.icon-animated-tick .circle {
  fill: #60d154;
  animation-fill-mode: forwards;
  animation-name: circle-pulse;
  animation-duration: 4s;
  animation-iteration-count: 1;
}

.tick-leg1 {
  fill: #fff;
  animation-fill-mode: forwards;
  animation-name: tick-swipe1;
  animation-duration: 1s;
  animation-iteration-count: 1;
  transform: scaleX(0);
  transform-origin: left bottom;
  opacity: 0;
}

.tick-leg2 {
  fill: #fff;
  animation-fill-mode: forwards;
  animation-name: tick-swipe2;
  animation-duration: 2s;
  animation-iteration-count: 1;
  transform: scaleY(0);
  transform-origin: right bottom;
  opacity: 0;
}

@keyframes tick-swipe1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes tick-swipe2 {
  40% {
    opacity: 0;
  }
  47% {
    transform: scaleY(0.15);
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes circle-pulse {
  0%,
  25%,
  75%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.tick {
  width: 100%;
  height: 100%;
  transform: rotate(45deg) scale(0.8);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.tick-holder {
  transform: scale(0.6);
}
.navbar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 25rem;
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #b7dae8;
  padding: 20px;
}
.login-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
}
.illustration {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.illustration img {
  max-width: 100%;
  height: auto;
  margin-right: 20rem;
}
.login-form {
  flex: 1;
  max-width: 400px;
  margin-right: 10rem;
}
.login-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
  text-decoration: none;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  text-decoration: none;
}
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 13px;
  text-decoration: none;
}
.password-input {
  display: flex;
  align-items: center;
}
.password-input span {
  margin-left: -30px;
  cursor: pointer;
}
.remember-me {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-decoration: none;
}
.remember-me div {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.login-button {
  width: 40%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 8rem;
}
.social-login {
  text-align: center;
  margin: 20px 0;
}
.social-icons img {
  width: 30px;
  margin: 0 10px;
}
.signup-link {
  text-align: center;
  margin-left: 12rem;
  text-decoration: none;
}
.signup-link a {
  color: #007bff;
  text-decoration: none;
}
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}
.otp-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.input {
  width: 40px;
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.5);
  margin: 0 10px;
  text-align: center;
  font-size: 36px;
}
.input:focus {
  border-bottom: 3px solid orange;
  outline: none;
}
.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.verify-button {
  padding: 0px 20px 0px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
.cancel-button {
  padding: 0px 20px 0px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
.cancel-button {
  background-color: #ccc;
  color: black;
}
.verify-button {
  background-color: #007bff;
  color: white;
}
.resend-otp {
  color: #007bff;
  cursor: pointer;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  align-items: center;
}
</style>
