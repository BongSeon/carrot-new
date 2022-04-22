import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// global styles
import './assets/normalize.css'
import './assets/main.css'
import './assets/spinner.css'
import SlotHeader from './components/global/SlotHeader.vue'
import Spinner from './components/global/Spinner.vue'

createApp(App)
  .use(store)
  .use(router)
  .component('slot-header', SlotHeader)
  .component('spinner', Spinner)
  .mount('#app')
