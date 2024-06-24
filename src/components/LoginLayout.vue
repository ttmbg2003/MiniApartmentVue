<template>
  <div class="login-layout">
    <p class="Sign_up">Not a member? <router-link to="/signup">Sign up now!</router-link></p>
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.login-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.login-layout .Sign_up {
  text-align: right;
  margin-bottom: 500px;
  margin-left: 1000px;
}
.login-layout .Sign_up a {
  color: blue;
}
</style>
