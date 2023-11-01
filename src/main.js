

import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faAngleLeft, faAngleRight, faXmark,  } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faAngleLeft,faAngleRight,faXmark)




createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
