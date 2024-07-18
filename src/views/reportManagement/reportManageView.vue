<template>
  <div style="display: flex; height: 89%">
    <SideBar class="sidebar" />
    <div class="main-screen">
      <div style="font-weight: 600; font-size: 24px; margin-left: 36px">
        Report
      </div>
      <div class="top">
        <div class="top-elements">element</div>
        <div class="top-elements">element</div>
        <div class="top-elements">element</div>
      </div>
      <div class="middle"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
</script>

<style scoped>
.sidebar {
  width: 18%;
}
.main-screen {
  width: 85%;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0 0;
}
.top {
  display: flex;
  width: 100%;
  margin: 20px 0 20px 0;
}
.top-element {
  flex-grow: 1;
  width: 30%;
  height: 100px;
  background: white;
  border-radius: 10px;
}
</style>
