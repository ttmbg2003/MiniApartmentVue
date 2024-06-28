import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import Login from "@/components/LoginForm.vue";
import Signup from "@/components/SignUp.vue";
import UploadFile from "@/components/UploadFileTest.vue"
import ForgetPassword from "@/components/ForgetPassword.vue"

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
    path: "/upload",
    name: "upload",
    component: UploadFile,
    // meta: { layout: "DefaultLayout" },
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
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: {layout: "SignUpLayout"}
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
