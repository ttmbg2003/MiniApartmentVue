<template>
  <div class="login-page">
    <div class="login-container">
      <div class="illustration">
        <img src="@/components/icons/loginman.png" alt="Login Illustration" />
      </div>
      <div class="login-form">
        <h2>Log in</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email Address*</label>
            <input type="email" id="email" v-model="email" required />
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
            <input type="checkbox" id="rememberMe" v-model="rememberMe" />
            <label for="rememberMe">Remember me</label>
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" class="login-button">Log in</button>
        </form>
        <!-- <div class="social-login">
            <p>Or log in with</p>
            <div class="social-icons">
              <a href="#"><img src="@/assets/google-icon.png" alt="Google" /></a>
              <a href="#"><img src="@/assets/facebook-icon.png" alt="Facebook" /></a>
              <a href="#"><img src="@/assets/apple-icon.png" alt="Apple" /></a>
              <a href="#"><img src="@/assets/linkedin-icon.png" alt="LinkedIn" /></a>
            </div>
          </div> -->
        <p class="signup-link">Not a member? <a href="#">Sign up now</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      showPassword: false,
    };
  },
  methods: {
    login() {
      // Handle login logic here
      console.log("Login:", {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.login-container {
  display: flex;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.illustration {
  margin-right: 20px;
}

.illustration img {
  max-width: 200px;
}

.login-form {
  max-width: 300px;
}

.login-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
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
  border-radius: 5px;
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
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
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
  margin-top: 10px;
}

.signup-link a {
  color: #007bff;
}
</style>
