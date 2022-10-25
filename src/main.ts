import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./store"
import router from "./router/index"
import "./echarts/index"
import "@arco-design/web-vue/es/message/style/css.js"
import "@arco-design/web-vue/es/notification/style/css.js"

const app = createApp(App);
app.use(store).use(router).mount('#app');
