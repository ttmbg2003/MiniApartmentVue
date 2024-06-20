<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import DefaultLayout from "@/components/DefaultLayout.vue";
import LoginLayout from "@/components/LoginLayout.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout === 'LoginLayout' ? LoginLayout : DefaultLayout;
});
</script>

<style scoped>
/* Thêm style nếu cần */
</style>
