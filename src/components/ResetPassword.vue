<template>
    <div class="container">
      <div class="left-section">
      </div>
      <div class="right-section">
        <div class="main">
          <h1>Reset Password</h1>
          <form @submit.prevent="resetPassword">
            <input type="password" name="newPassword" placeholder="New Password" v-model="newPassword" />
            <input type="password" name="confirmPassword" placeholder="Confirm New Password" v-model="confirmPassword" />
            <input type="submit" value="Reset Password" class="button" />
          </form>
          <div v-if="error" class="error">{{ error }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/utils/apiClient';
  
  export default {
    name: 'ResetPassword',
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        email: this.$route.query.email || '',
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
          await apiClient.post('/auth/forgetPasswordChange', {
            email: this.email,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
          });
          alert('Password reset successfully');
          this.$router.push('/login');
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.error = error.response.data;
          } else {
            this.error = 'An error occurred during the password reset process. Please try again.';
          }
        }
      }
    }
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
  