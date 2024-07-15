import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);
app.component('EasyDataTable',Vue3EasyDataTable);
app.use(router)
app.mount('#app')
