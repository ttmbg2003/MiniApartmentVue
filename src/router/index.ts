import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import Login from "@/components/LoginForm.vue";
import Signup from "@/components/SignUp.vue";
import ListTenant from "@/views/ListOfTenantView.vue";
import ForgetPassword from "@/components/ForgetPassword.vue";
import ResetPassword from "@/components/ResetPassword.vue";
import VerifyOtp from "@/components/VerifyOtp.vue";
import ListOfPayment from "@/views/ListOfPayment.vue";
import ListOfContract from "@/views/ListOfContract.vue";
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
    path: "/payment",
    name: "ListPayment",
    component: ListOfPayment,
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
    meta: { layout: "SignUpLayout" },
  },
  {
    path: "/verify-otp",
    name: "VerifyOtp",
    component: VerifyOtp,
    meta: { layout: "SignUpLayout" },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { layout: "SignUpLayout" },
  },
  {
    path: "/ListOfContract",
    name: "ListOfContract",
    component: ListOfContract,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
