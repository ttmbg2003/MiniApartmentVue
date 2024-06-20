<template>
      <!-- <NavBar></NavBar>
      <RouterLink to="/profile">Profile</RouterLink>
  <RouterView /> -->
  <NavBar></NavBar>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import { defineComponent } from "vue";

defineComponent({
  components: {
    NavBar,
  },
});
</script>