<template>
  <div
    style="
      height: 100%;
      background-color: #fff;
      overflow-x: hidden;
      overflow-y: auto;
    "
  >
    <div class="navbar">
      <NavBar />
    </div>
    <div class="router">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>
<style scoped>
.navbar {
  width: 100%;
  z-index: 1;
}
.router {
  position: relative;
  top: -90px;
  z-index: 0;
}
</style>
