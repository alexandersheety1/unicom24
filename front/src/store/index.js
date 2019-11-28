import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import gallery from "./gallery";
import comments from "./comments";
import job from "./job";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    gallery,
    comments,
    job
  }
})
