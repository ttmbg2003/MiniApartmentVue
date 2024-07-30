<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="navbar">
        <img
          src="@/components/icons/TheNiceHouseLogo.png"
          alt="Logo"
          class="navbar-logo"
          style="width: 10rem; margin-bottom: 6rem"
        />
      </div>
      <div class="illustration">
        <img
          src="@/components/icons/signupphoto.png"
          alt="Signup Illustration"
        />
      </div>
      <div class="signup-form">
        <p class="signin-link">
          Already a member?
          <router-link to="/login" class="navbar-link">Log in</router-link>
        </p>
        <h2>Sign Up</h2>
        <form @submit.prevent="signUp">
          <div class="form-row">
            <div class="form-group half-width">
              <div><img src="@/components/icons/fn.png" /></div>
              <input type="text" id="firstName" v-model="firstName" required />
            </div>
            <div class="form-group half-width">
              <div><img src="@/components/icons/ln.png" /></div>
              <input type="text" id="lastName" v-model="lastName" required />
            </div>
          </div>
          <div class="form-group">
            <div><img src="@/components/icons/EmailAddress.png" /></div>
            <input type="email" id="email" v-model="email" required />
            <span style="color: red" v-if="msg.email">{{ msg.email }}</span>
          </div>
          <div class="form-group">
            <div><img src="@/components/icons/Password.png" /></div>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
              />
              <span @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
              </span>
            </div>
            <span v-if="msg.password" style="color: red">{{
              msg.password
            }}</span>
          </div>
          <div class="form-group">
            <div><img src="@/components/icons/cf.png" /></div>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="rePassword"
                v-model="rePassword"
                required
              />
              <span @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
              </span>
            </div>
            <span v-if="msg.rePassword" style="color: red">{{
              msg.rePassword
            }}</span>
          </div>
          <button type="submit" class="signup-button">Sign Up</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>

    <!-- OTP Modal -->
    <div v-if="otpSent" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Verify OTP</h2>
        <p>
          Enter the verification code we just sent to your email {{ email }}.
        </p>
        <form @submit.prevent="verifyOtp">
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
            Didn't receive the OTP?
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
        <p>
          Your account has been verified successfully. Login to go to Homepage.
        </p>
        <button @click="closeSuccessModal" class="verify-button">
          Back to Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/utils/apiClient";

export default {
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      msg: [],
      password: "",
      rePassword: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
      otpSent: false,
      error: null,
      otpResent: false,
      otpResentMessage: "OTP resent. Please check your email.",
      showPassword: false,
      showSuccessModal: false,
    };
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
    rePassword(value) {
      this.rePassword = value;
      this.validaterePassword(value);
    },
  },
  methods: {
    validateEmail(value) {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "This Email Address is not valid";
      }
    },
    validatePassword(value) {
      let difference = 8 - value.length;
      let hasLowerCase = /[a-z]/.test(value);
      let hasUpperCase = /[A-Z]/.test(value);
      let hasNumber = /[0-9]/.test(value);
      let hasSpecialChar = /[!@#$%^&*]/.test(value);

      if (value.length < 8) {
        this.msg["password"] =
          "The Password must be at least 8 characters long, " +
          difference +
          " characters left";
      } else if (
        !hasLowerCase ||
        !hasUpperCase ||
        !hasNumber ||
        !hasSpecialChar
      ) {
        this.msg["password"] =
          "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)";
      } else {
        this.msg["password"] = "";
      }
    },
    validaterePassword(value) {
      if (value !== this.password) {
        this.msg["rePassword"] = "The password you entered does not match";
      } else {
        this.msg["rePassword"] = "";
      }
    },
    async signUp() {
      this.error = null;
      this.otpResent = false;

      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.password ||
        !this.rePassword
      ) {
        this.error = "Please fill in all fields.";
        return;
      }

      // Gọi các hàm validate để kiểm tra email, password, và rePassword
      this.validateEmail(this.email);
      this.validatePassword(this.password);
      this.validaterePassword(this.rePassword);
      if (this.msg.email || this.msg.password || this.msg.rePassword) {
        this.error = "Please fix the errors before proceeding.";
        return;
      }
      try {
        const response = await apiClient.post("/auth/signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          rePassword: this.rePassword,
        });
        if (response.data.status === 200) {
          this.otpSent = true;
          this.error = null;
        } else {
          this.error = response.data.result;
        }
      } catch (error) {
        this.error = "ERROR!!!";
      }
    },
    async verifyOtp() {
      this.error = null;
      this.otpResent = false;

      try {
        const otp =
          this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
        const response = await apiClient.post("/auth/verifyOtp", {
          email: this.email,
          otp: otp,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          rePassword: this.rePassword,
        });

        this.showSuccessModal = true;
        this.error = null; // Clear any previous errors
      } catch (error) {
        this.otpResent = false;
        if (error.response && error.response.status === 400) {
          this.error = error.response.data;
        } else {
          this.error =
            "An error occurred during OTP verification. Please try again.";
        }
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push("/login");
    },
    async resendOtp() {
      this.error = null;
      this.otpResent = false;

      try {
        await apiClient.post("/auth/resendOtpRegister", {
          email: this.email,
        });

        this.error = null;
        this.otpResent = true;
      } catch (error) {
        this.otpResent = false;
        if (error.response && error.response.status === 400) {
          this.error = error.response.data;
        } else {
          this.error = "An error occurred during OTP resend. Please try again.";
        }
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
.navbar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 25rem;
}
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
.password-input {
  display: flex;
  align-items: center;
  position: relative;
}
.password-input input {
  flex: 1;
  padding-right: 30px;
}
.password-input span {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40rem;
  background-color: #b7dae8;
}
.signup-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  background-image: url(@/components/icons/Signupbg.png);
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
.signup-form {
  flex: 1;
  max-width: 400px;
  margin-right: 10rem;
}
.signup-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}
.form-row {
  display: flex;
  justify-content: space-between;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 13px;
}
.half-width {
  flex: 0 0 48%;
}
.signup-button {
  width: 30%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  margin-left: 9.5rem;
}
.signin-link {
  text-align: center;
  margin-left: 12rem;
  position: absolute;
  bottom: 33rem;
  right: 6rem;
}
.signin-link a {
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
  font-size: 24px;
}
.input:focus {
  outline: none;
  border-bottom: 3px solid #007bff;
}
.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.cancel-button,
.verify-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
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
  cursor: pointer;
  color: #007bff;
}
.info {
  color: green;
  text-align: center;
  margin-top: 10px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  align-items: center;
}
</style>
