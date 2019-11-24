// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//window.$ = window.jQuery = require('jquery');
//require('bootstrap');
import Vue from 'vue';
//import router from './router/index.js';
import App from './App.vue';
/* eslint-disable no-new */
//export default new Vue({
const app = new Vue({
    el: '#app',
    //router,
    components: {
        App,
    },
    template: '<App/>'
});

