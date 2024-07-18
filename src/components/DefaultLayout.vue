<template>
    <div style="height: 100%;    background-color: #F5F6F8;">
      <NavBar />
      <router-view />
    </div>
  </template>
  
  <script setup lang="ts">
  import NavBar from "@/components/NavBar.vue";
  </script>
  