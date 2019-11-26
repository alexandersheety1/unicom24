import Vue from 'vue'
import Router from 'vue-router'
import GalleryList from '../components/Gallery.vue'
import Image from '../components/Image.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'
import store from '../store';

const requireAuthenticated = (to, from, next) => {
    store.dispatch('auth/initialize')
        .then(() => {
            if (!store.getters['auth/isAuthenticated']) {
                next('/login');
            } else {
                next();
            }
        });
};

const requireUnauthenticated = (to, from, next) => {
    store.dispatch('auth/initialize')
        .then(() => {
            if (store.getters['auth/isAuthenticated']) {
                next('/');
            } else {
                next();
            }
        });
};

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout').then(() => {
    next('/login');
  });
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  saveScrollPosition: true,
  routes: [
    {
      path: '/login',
      component: Login,
      beforeEnter: requireUnauthenticated,
    },
    {
      path: '/registration',
      component: Registration,
      beforeEnter: requireUnauthenticated,
    },
    {
      path: '/logout',
      beforeEnter: redirectLogout,
    },
    {
      path: '/',
      component: GalleryList,
      beforeEnter: requireAuthenticated,
    },
    {
      path: '/:id?',
      component: Image,
      beforeEnter: requireAuthenticated,
    }
  ]
})
