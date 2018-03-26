//
// ─── IMPORT COMPONENTS ──────────────────────────────────────────────────────────
//

import Vue from 'vue'
import HelloComponent from './components/Hello.vue'
import HelloDecoratorComponent from './components/HelloDecorator.vue'
import Cool from './components/Cool'
import Rx from './components/Rx/Rx'
import App from './app.vue'

//
// ──────────────────────────────────────────────────── END IMPORT COMPONENTS ─────
//

import createStore from './store'
import createRouter from './router'
import { sync } from 'vuex-router-sync'

//
// ─── RX INSTALL ─────────────────────────────────────────────────────────────────
//

import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'

Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject
})

//
// ─────────────────────────────────────────────────────────── END RX INSTALL ─────
//

export default function createApp() {
  const store = createStore()
  const router = createRouter()

  sync(store, router)
  const app = new Vue({
    el: '#app',
    store,
    router,
    data: { name: 'World' },
    render: h => h(App)
  })

  return { store, router, app }
}
