import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from "@/assets/translations/i18n";
import {centralStore} from "@/stores/centralStore";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

const store = centralStore();

i18n.global.locale.value = store.locale;

app.mount('#app')
