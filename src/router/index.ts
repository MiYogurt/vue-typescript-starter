import Vue, { AsyncComponent } from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import HelloDecorator from '../components/HelloDecorator.vue'
import Rx from '../components/Rx/Rx';
// import Cool from "../components/Cool.tsx";

Vue.use(Router)

const Cool = () => new Promise((resolve, reject) => {
  require.ensure(['../components/Cool.tsx'], (require) => {
    resolve(require('../components/Cool.tsx'))
  })
})

export default function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0, x: 0 }),
    routes: [
      { path: '/', component: Hello },
      { path: '/hello/:id?', component: HelloDecorator },
      { path: '/rx', component: Rx},
      { path: '/cool', component: Cool }
    ]
  })
}
