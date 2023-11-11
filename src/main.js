import { createApp } from 'vue';
import router  from './router';
import './variables.scss'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner)

const app = createApp(App) 

app.use(router)
app.mount('#app')
app.component("font-awesome-icon", FontAwesomeIcon)
  