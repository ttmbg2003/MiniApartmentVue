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
import SignUpLayout from "@/components/SignUpLayout.vue";

const route = useRoute();

const layout = computed(() => {
  switch (route.meta.layout) {
    case 'LoginLayout':
      return LoginLayout;
    case 'SignUpLayout':
      return SignUpLayout;
    default:
      return DefaultLayout;
  }
});
</script>
