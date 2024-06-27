import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import Login from "@/components/LoginForm.vue";
import Signup from "@/components/SignUp.vue";
import ListTenant from "@/views/ListOfTenantView.vue"

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
    // meta: { layout: "DefaultLayout" },
  },
  {
    path: "/tenants",
    name: "ListTenant",
    component: ListTenant,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { layout: "LoginLayout" },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { layout: "SignUpLayout" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
