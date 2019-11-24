<template>
    <v-app id="app">
        <div id="app" class="container-fluid">
            <div class="col-12">
                <div class="row">
                    TEST
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
    //import store from './store';
    import {mapGetters} from 'vuex';
    //import Navbar from './components/Navbar.vue';
    //import Footer from './components/Footer.vue';
    //import Header from './components/Header.vue';

    import Vue from "vue";
    import BootstrapVue from "bootstrap-vue";
    Vue.use(BootstrapVue);
    export default {
        name: 'app',
        components: {
        },
        computed: mapGetters('auth', [
            'isAuthenticated',
        ]),
        data() {
            return {
                summary: null,
            }
        },
        methods: {
        },
    };
</script>
<style lang="scss">
    @import '../../node_modules/bootstrap/scss/bootstrap';
    @import '../../node_modules/bootstrap-vue/src/index.scss';
</style>


