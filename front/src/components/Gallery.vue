<template>
  <div class="col-12">
    <navbar />
    <div class="row">
      <b-img
        v-for="i in images"
        :key="i"
        :src="i"
        fluid
        alt=""
        class="p-2"
      />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'Gallery',
  components: {
    'navbar': Navbar
  },
  data () {
    return {
      images: null
    }
  },
  created () {
    this.fetchData();
  },
  methods: {
    fetchData () {

    }
  }
}
</script>

<style scoped>

</style>
