import './assets/main.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons/faPersonWalking'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faPersonWalking, faMagnifyingGlass)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
