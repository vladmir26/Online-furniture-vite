import { createApp } from 'vue';
import router  from './router';
import './variables.scss'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner)

createApp(App).use(router)
createApp(App).mount('#app')
createApp(App).component("font-awesome-icon", FontAwesomeIcon)
  
