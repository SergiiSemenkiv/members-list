import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import MembersList from '@/views/MembersList.vue';
import authService from '@/auth/guard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: MembersList,
  },
  {
    path: '/view/:id',
    name: 'memberProfile',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "member" */ '@/views/MemberProfile.vue'),
  },
  {
    path: '/edit/:id',
    name: 'memberEdit',
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const { id } = to.params;
      // eslint-disable-next-line import/no-named-as-default-member
      if (authService.isGrantedForEditing(id)) {
        next();
      } else {
        next({ name: 'home' });
      }
    },
    component: () => import(/* webpackChunkName: "member" */ '@/views/MemberEdit.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line import/no-named-as-default-member
  if (to.name !== 'login' && !authService.isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
