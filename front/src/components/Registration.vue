<template>
  <div class="col-12">
    <div class="row">
      <h1>Registration</h1>
    </div>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-5">
          <div class="row">
            <h3>Username:</h3>
          </div>
          <div class="row">
            <b-input
              id="username"
              v-model="input.username"
              type="text"
              placeholder="username"
              class="col-5 bordered"
            />
          </div>
          <div class="row">
            <h3>Email:</h3>
          </div>
          <div class="row">
            <b-input
              id="email"
              v-model="input.email"
              type="email"
              placeholder="email"
              class="col-5 bordered"
            />
          </div>
          <div class="row">
            <h3>Password:</h3>
          </div>
          <div class="row">
            <b-input
              id="password"
              v-model="input.password"
              type="password"
              placeholder="password"
              class="col-5 bordered"
            />
          </div>
          <div class="row">
            <h3>Password Confirm:</h3>
          </div>
          <div class="row">
            <b-input
              id="password_confirm"
              v-model="input.password_confirm"
              type="password"
              placeholder="password_confirm"
              class="col-5 bordered"
            />
          </div>
          <div class="row pt-4">
            <b-button
              variant="outline-primary"
              @click="registration()"
            >
              Зарегестрироваться
            </b-button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data () {
    return {
      input: {
        'username': null,
        'password': null,
        'password_confirm': null,
        'email': null
      }
    }
  },
  methods: {
    registration () {
      return true
    }
  }
}
</script>

<style scoped>

</style>
