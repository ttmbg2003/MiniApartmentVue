import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import Login from "@/components/LoginForm.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { layout: "LoginLayout" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
