import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: require('@/pages/index').default,
      redirect: '/discover/1',
      children: [
        {
          path: 'discover/:id',
          name: 'discover',
          component: require('@/pages/discover/index').default
        },
        {
          path: 'fm',
          name: 'fm',
          component: require('@/pages/fm/index').default
        },
        {
          path: 'songSheet/:id',
          name: 'songSheet',
          component: require('@/pages/songSheet/index').default
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/login/index').default
    }
  ]
});
// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   next();
// });

export default router;
