<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="main" :style="mainStyle">
      <h1>Log in</h1>
      <form @submit.prevent="login">
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
      <a href=""><p style="text-align: right; color: grey;">Forgot Password?</p></a>
      <div v-if="error" class="error">{{ error }}</div>
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
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/auth/login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data;
        loginAuth(token);
        this.$router.push('/home');
      } catch (error) {
        this.error = 'Invalid email or password';
      }
    },
  },
};
</script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  a{
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
    width: 30%;
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
  </style>
  