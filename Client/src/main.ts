import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@oruga-ui/theme-oruga/dist/oruga.css'
import 'bulma/css/bulma.css'
import { Autocomplete } from '@oruga-ui/oruga-next'

const app = createApp(App)

app.use(router).use(Autocomplete)

app.mount('#app')
