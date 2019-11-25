import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../views/Home.vue';
// import Login from '../views/Login.vue';
// import Lost from '../views/Lost.vue';

import GalleryList from '../components/Gallery.vue'
import Image from '../components/Image.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'

// import store from '../store';

// требуется быть авторизованным
// вызываем ини модуля аутентификации, если тот находит токен - все ок
// если же нет, отправляет на страницу логина
// const requireAuthenticated = (to, from, next) => {
//     console.log('requireAuthenticated');
//     store.dispatch('auth/initialize')
//         .then(() => {
//             if (!store.getters['auth/isAuthenticated']) {
//                 // давай аусвайс, жЫвотное!
//                 next('/login');
//             } else {
//                 store.dispatch('experiment/initialize')
//                     .then(() => {
//                         next();
//                     });
//
//                 // инитим саммари
//                 store.dispatch('summary/initialize')
//                     .then(() => {
//                         if (!store.getters['summary/experiment_status_list']) {
//                             // если данных нет - запрашиваем их
//                             store.dispatch('summary/get')
//                                 .then(() => {
//                                     next();
//                                 });
//                         } else {
//                             next();
//                         }
//                     });
//
//                 next();
//             }
//         });
// };

// требуется быть не авторизованным
// если авторизован - выкидываем в /home
// const requireUnauthenticated = (to, from, next) => {
//     console.log('requireUnauthenticated');
//     store.dispatch('auth/initialize')
//         .then(() => {
//             if (store.getters['auth/isAuthenticated']) {
//                 next('/experiment');
//             } else {
//                 next();
//             }
//         });
// };

// при логауте редиректим на страницу логина
// const redirectLogout = (to, from, next) => {
//     console.log('redirectLogout');
//     store.dispatch('summary/shutdown_interval').then(() => {
//         store.dispatch('auth/logout').then(() => {
//             next('/login');
//         });
//     });
// };

Vue.use(Router)

export default new Router({
  mode: 'history',
  saveScrollPosition: true,
  routes: [
    {
      path: '/login',
      component: Login
      // beforeEnter: requireUnauthenticated,
    },
    {
      path: '/registration',
      component: Registration
      // beforeEnter: requireUnauthenticated,
    },

    // {
    //     path: '/logout',
    //     beforeEnter: redirectLogout,
    // },
    {
      path: '/',
      component: GalleryList
      // beforeEnter: requireAuthenticated,
    },
    {
      path: '/:id?',
      component: Image
      // beforeEnter: requireAuthenticated,
    }
  ]
})
