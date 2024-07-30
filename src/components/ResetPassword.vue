<template>
  <div class="login-page">
    <div class="login-container">
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
          alt="Forget Password Illustration"
        />
      </div>
      <div class="login-form">
        <p class="signup-link">
          Already a member?
          <router-link to="/login" class="navbar-link">Log in</router-link>
        </p>
        <h2>Reset Password</h2>
        <form @submit.prevent="resetPassword">
          <div class="form-group half-width">
            <div><img src="@/components/icons/newpassword.png" /></div>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="newPassword"
                required
              />
              <span @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
              </span>
              <span style="color: red" v-if="error">{{ error }}</span>
            </div>
          </div>
          <div class="form-group half-width">
            <div class="password-input">
              <div><img src="@/components/icons/cfnewpassword.png" /></div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="rePassword"
                v-model="rePassword"
                required
              />
              <span @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
              </span>
              <span style="color: red" v-if="error">{{ error }}</span>
            </div>
          </div>
          <button type="submit" class="login-button">Reset Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/utils/apiClient";

export default {
  name: "ResetPassword",
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      email: localStorage.getItem("email"),
      error: null,
    };
  },
  methods: {
    async resetPassword() {
      this.error = null;
      if (this.newPassword !== this.confirmPassword) {
        this.error = "Passwords do not match!";
        return;
      }

      try {
        await apiClient.post("/auth/forgetPasswordChange", {
          email: this.email,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });
        alert("Password reset successfully");
        this.$router.push("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.error = error.response.data;
        } else {
          this.error =
            "An error occurred during the password reset process. Please try again.";
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
  height: 40rem;
  background-color: #b7dae8;
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
  position: relative;
  flex-wrap: wrap;
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
  position: absolute;
  bottom: 33rem;
  right: 6rem;
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
