import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: require('@/views/index').default,
      redirect: '/discover/1',
      children: [
        {
          path: 'discover/:id',
          name: 'discover',
          component: require('@/views/discover/index').default
        },
        {
          path: 'fm',
          name: 'fm',
          component: require('@/views/fm/index').default
        },
        {
          path: 'songSheet/:id',
          name: 'songSheet',
          component: require('@/views/songSheet/index').default
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/views/login/index').default
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   next();
// });

export default router
