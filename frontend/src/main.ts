import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import BaseAlert from '@/components/atoms/BaseAlert.vue'
import BaseContainer from '@/components/atoms/BaseContainer.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseSelect from '@/components/atoms/BaseSelect.vue'
import BaseSpinner from '@/components/atoms/BaseSpinner.vue'
import BigButton from '@/components/atoms/BigButton.vue'

import BaseModal from '@/components/molecules/BaseModal.vue'
import BaseToastie from '@/components/molecules/BaseToastie.vue'

import '../src/assets/index.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app
  .use(router)
  .component('BaseSpinner', BaseSpinner)
  .component('BaseToastie', BaseToastie)
  .component('BaseModal', BaseModal)
  .component('BaseAlert', BaseAlert)
  .component('BaseSelect', BaseSelect)
  .component('BigButton', BigButton)
  .component('BaseInput', BaseInput)
  .component('BaseContainer', BaseContainer)
  .component('BaseIcon', BaseIcon)
app.use(PrimeVue)

app.mount('#app')
