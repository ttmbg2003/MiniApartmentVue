<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img
        src="@/components/icons/TheNiceHouseLogo.png"
        alt="Logo"
        class="navbar-logo"
      />
    </div>
    <div class="">
      <router-link to="/home" class="navbar-link">About us</router-link>
      <router-link to="/tenants" class="navbar-link">Management</router-link>
      <!-- <router-link to="/profile" class="navbar-link">Information</router-link> -->
      <router-link to="/home" class="navbar-link">Contact us</router-link>
      <router-link to="/profile" class="navbar-link">Information</router-link>
    </div>
    <div class="navbar-right">
    <button @click="handleAuthAction" class="navbar-link">
      {{ authState.isAuthenticated ? 'Logout' : 'Login' }}
    </button>
  </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { authState, logout } from "@/type/auth";
export default defineComponent({
  name: "NavBar",
  setup() {
    const router = useRouter();

    const handleAuthAction = () => {
      if (authState.isAuthenticated) {
        logout();
        router.push("/home");
      } else {
        router.push("/login");
      }
    };

    return { authState, handleAuthAction };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

.navbar {
  background: white;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
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
}
</style>
