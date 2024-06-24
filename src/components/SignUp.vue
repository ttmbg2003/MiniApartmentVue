<template>
  <div class="container">
    <div class="left-section">
      <!-- <img src="your-image-url.jpg" alt="Sign Up Image" class="background-image"> -->
    </div>
    <div class="right-section">
      <div class="main">
        <h1>Sign Up</h1>
        <form @submit.prevent="signUp">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            v-model="firstName"
          />
          <br />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            v-model="lastName"
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            v-model="email"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
          />
          <br />
          <input
            type="password"
            name="rePassword"
            placeholder="Confirm Password"
            v-model="rePassword"
          />
          <br />
          <input
            type="submit"
            value="Sign Up"
            class="button"
          />
          <br />
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <p class="mt-4 text-sm text-center text-gray-600">
          Already have an account? <router-link to="/login" class="text-blue-500 hover:underline">Sign in here</router-link>
        </p>
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
      error: null,
    };
  },
  methods: {
    async signUp() {
      this.error = null; // Reset error message
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
        const token = response.data.token;
        
        alert('User sign up successfully');
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.error = error.response.data;
        } else {
          this.error = 'An error occurred during sign up. Please try again.';
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
  margin-left: -260px;
  margin-top: -80px;
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
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
