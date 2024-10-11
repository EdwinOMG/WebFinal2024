import './assets/main.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
