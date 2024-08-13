import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import Login from "@/components/LoginForm.vue";
import Signup from "@/components/SignUp.vue";
import ListTenant from "@/views/ListOfTenantView.vue";
import ForgetPassword from "@/components/ForgetPassword.vue";
import ResetPassword from "@/components/ResetPassword.vue";
import ListOfPayment from "@/views/ListOfPayment.vue";
import ListOfContract from "@/views/ListOfContract.vue";
import ReporManageView from "@/views/reportManagement/reportManageView.vue";
import Contract from "@/components/Contract.vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import apiClient from "@/utils/apiClient";
import ListOfAsset from "@/views/ListOfAsset.vue";
const routes = [
  { path: "/contract", component: Contract },
  {
    path: "/",
    redirect: "/home",
    meta: { skipAuth: true },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { layout: "DefaultLayout", skipAuth: true },
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
    meta: { roles: ["admin"] },
  },
  {
    path: "/payment",
    name: "ListPayment",
    component: ListOfPayment,
    meta: { roles: ["admin"] },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { layout: "LoginLayout", skipAuth: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { layout: "SignUpLayout", skipAuth: true },
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { layout: "SignUpLayout", skipAuth: true },
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
    meta: { roles: ["admin"] },
  },
  { path: "/report", component: ReporManageView },
  { path: "/asset", component: ListOfAsset },
  {
    path: "/newContract",
    name: "Contract",
    component: Contract,
    meta: { roles: ["admin"] },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const roles = to.meta.roles;
  //Loại trừ trang Login là không cần check auth
  if (to.meta.skipAuth) {
    next();
    return;
  }

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  //check không có token, tức là đăng nhập chưa thành công
  if (!accessToken) {
    next("/login");
    return;
  }
  const check = await axios({
    method: "get",
    url: "http://localhost:8080/auth/checkToken",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  switch (check.data.result) {
    case "expired token":
      // refresh token
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/refreshToken",
          { token: refreshToken }
        );

        // If the request is successful, save the new access token to localStorage
        if (response.status === 200) {
          localStorage.setItem(
            "accessToken",
            response.data["result"]["accessToken"]
          );
          localStorage.setItem(
            "refreshToken",
            response.data["result"]["refreshToken"]
          );
          // check role
          const decoded = jwtDecode<{ role: string }>(
            response.data["result"]["accessToken"]
          ); // Custom payload type
          const userRole = decoded.role;
          if (roles == undefined) {
            return next();
          }
          if (roles == userRole) {
            return next();
          } else {
            return next("/login");
          }
          //quay lại trang đang ở
          // next(to);
        } else {
          return next("/login");
        }
      } catch (refreshError) {
        console.error(refreshError);
        router.push("/login");
        return;
        // Handle refresh token error
      }
    case "ok": {
      // check role
      const decoded = jwtDecode<{ role: string }>(accessToken); // Custom payload type
      const userRole = decoded.role;
      if (roles == undefined) {
        return next();
      }
      if (roles == userRole) {
        return next();
      } else {
        return next("/login");
      }
      //quay lại trang đang ở
      // next(to);
    }
    case "invalid token":
      next("/login");
      break;
    default:
      break;
  }
  return;
});
// let isRefreshing = false;
// let requestsQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

// // Hàm để làm mới token
// async function refreshToken() {
//   const refreshToken = localStorage.getItem("refreshToken");
//   const response = await axios.post("http://localhost:8080/auth/refreshToken", { token: refreshToken });
//   if (response.status === 200) {
//     localStorage.setItem("accessToken", response.data.result.accessToken);
//     localStorage.setItem("refreshToken", response.data.result.refreshToken);
//     return response.data.result.accessToken;
//   } else {
//     throw new Error("Failed to refresh token");
//   }
// }

// // Interceptor để thêm token vào header và xử lý token hết hạn
// axios.interceptors.request.use(
//   config => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           requestsQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers['Authorization'] = `Bearer ${token}`;
//           return axios(originalRequest);
//         }).catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       return new Promise((resolve, reject) => {
//         refreshToken()
//           .then(newToken => {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//             requestsQueue.forEach(request => request.resolve(newToken));
//             requestsQueue = [];
//             resolve(axios(originalRequest));
//           })
//           .catch(err => {
//             requestsQueue.forEach(request => request.reject(err));
//             requestsQueue = [];
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
export default router;
