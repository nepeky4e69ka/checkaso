import Vue      from 'vue'
import Router   from 'vue-router'
import Welcome  from '@/layouts/welcome.vue'
import Apps     from '@/layouts/apps.vue'

Vue.use( Router );

export default new Router({
  mode: 'history',
  routes: [
      {
          path: '/',
          name:'welcome',
          component: Welcome
      },
      {
          path: '/:app',
          name:'app',
          component: Apps
      }
  ]
})