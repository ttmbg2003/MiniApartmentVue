import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
// import contract from "@/components/Contract.vue";
const app = createApp(App);

app.component("EasyDataTable", Vue3EasyDataTable);
app.use(router);
app.mount("#app");
