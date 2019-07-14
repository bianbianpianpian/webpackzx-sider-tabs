import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'v-active',
  routes: [
    {
      path: '/',
      components: {
        default: Demo,
        demo: Demo
      },
      children: [ // 为了其他地方使用iframe嵌套使用
        {
          path: '/demo',
          name: '1-1',
          component: Demo
        }
      ]
    }
  ]
})
