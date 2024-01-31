import './assets/main.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { appFirebase, db } from './firebase.js';

const app = createApp(App)

app.use(router)

app.config.globalProperties.$firebase = appFirebase;
app.config.globalProperties.$db = db;

app.mount('#app')
