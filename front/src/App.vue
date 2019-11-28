<template>
  <v-app id="app">
    <div
      id="app"
      class="container-fluid"
    >
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
export default {
  name: 'App',
}
</script>
<style lang="scss">
    @import '../node_modules/bootstrap/scss/bootstrap';
    @import '../node_modules/bootstrap-vue/src/index.scss';
</style>
