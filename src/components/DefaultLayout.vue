<template>
  <div style="height: 100%; background-color: #fff; overflow-x: hidden">
    <div id="navbar" class="navbar">
      <NavBar />
    </div>
    <div class="router">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";

import { watch } from "vue";

import { useRoute } from "vue-router";
const route = useRoute();
watch(
  () => route.path,
  (newPath) => {
    const elements = document.getElementsByClassName("navbar");
    if (elements.length > 0) {
      const navbar = elements[0] as HTMLElement;
      // Kiểm tra xem có phần tử nào được tìm thấy không

      if (newPath === "/newContract") {
        navbar.style.display = "none"; // Ẩn navbar
      } else {
        navbar.style.display = ""; // Hiển thị navbar nếu đường dẫn không phải là "/contract"
      }
    }
  }
);
</script>
<style scoped>
.navbar {
  width: 100%;
  z-index: 1;
}
.router {
  min-height: 90%;
}
</style>
