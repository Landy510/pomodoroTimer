import Vue from 'vue'
import VueRouter from 'vue-router'

import Clock from '../components/Clock.vue'
import Todo from '../components/Todo.vue'
import Analytics from '../components/Analytics.vue'
import Rings from '../components/Rings.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'Clock',
      path: '/',
      component: Clock
    },
    {
      name: 'Todo',
      path: '/Todo',
      component: Todo
    },
    {
      name: 'Analytics',
      path: '/Analytics',
      component: Analytics
    },
    {
      name: 'Rings',
      path: '/Rings',
      component: Rings
    }
  ]
})
