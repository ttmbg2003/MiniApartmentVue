<template>
  <nav class="navbar">
    <router-link to="/home" class="navbar-left">
      <img src="@/components/icons/TheNiceHouseLogo.png" alt="Logo" class="navbar-logo" />
    </router-link>
    <div class="">
      <router-link to="/home" id="aboutLink" class="navbar-link">About us</router-link>
      <router-link to="/tenants" class="navbar-link" v-if="userRole == 'admin'">Management</router-link>
      <router-link to="/tenantscitizen" class="navbar-link" v-if="userRole == 'citizen' || userRole == ''">Management</router-link>
      <!-- <router-link to="/profile" class="navbar-link">Information</router-link> -->
      <router-link to="/home" id="contactLink" class="navbar-link">Contact us</router-link>
      <router-link to="/home" id="infoLink" class="navbar-link">Information</router-link>
    </div>
    <div>
      <div>
        <div class="loginBtn" @click="handleAuthAction" v-if="!authState.isAuthenticated">
          Log in
        </div>
        <div v-else>
          <div class="logoutBtn" @click="handleAuthAction">
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" style="margin: 0" />
            <p style="margin: 0; margin-left: 0.5rem">Log out</p>
          </div>
          <router-link to="/profile" class="avatar"><font-awesome-icon style="width: 1.8rem; height: 1.8rem"
              :icon="['fas', 'user']" /></router-link>
        </div>
        <!-- {{ authState.isAuthenticated ? "Logout" : "Login" }} -->
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { authState, logout } from "@/type/auth";
import { jwtDecode } from "jwt-decode";

const router = useRouter();
const handleAuthAction = () => {
  console.log(authState.isAuthenticated);
  
  if (authState.isAuthenticated) {
    logout();
    router.push("/home");
  } else {
    router.push("/login");
  }
};
const accessToken = localStorage.getItem("accessToken");
let userRole = ''
if (accessToken != null && accessToken != "undefined") {
  const decoded = jwtDecode<{ role: string }>(accessToken); // Custom payload type
  userRole = decoded.role;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

.navbar {
  opacity: 1;
  display: flex;
  align-items: center;
  padding: 0px 20px;
}

.navbar-logo {
  height: 54px;
}

.navbar-link {
  font-family: "Poppins", sans-serif;
  color: #000000;
  text-decoration: none;
  margin-left: 6rem;
  font-size: 20px;
  font-weight: 600;
}

.navbar-link:hover {
  text-decoration: underline;
  cursor: pointer;
}

.loginBtn {
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
  position: absolute;
  top: -15px;
  width: 56px;
  right: 10px;
}

.logoutBtn {
  position: absolute;
  display: flex;
  align-items: center;
  width: 7rem;
  right: -1rem;
  top: -0.7rem;
  cursor: pointer;
}

.avatar {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(224, 224, 224, 0.542);
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: gray;
}

.avatar:hover {
  background: rgba(177, 177, 177, 0.542);
}
</style>
