<template>
  <div class="col-12">
    <div class="row">
      <h1>Login</h1>
    </div>
    <b-form @submit.stop.prevent="onSubmit">
      <div class="row">
        <div :class="invalidate">Ошибка при входе, проверьте данные</div>
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
          <div class="row pt-4">
            <b-button
              class="mr-4"
              variant="outline-primary"
              @click="login()"
            >
              Войти
            </b-button>
            <b-button
              variant="outline-primary"
              @click="registration()"
            >
              Зарегистрироваться
            </b-button>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    'username': null,
                    'password': null
                },
                invalidate: "invalid-feedback",
            }
        },
        methods: {
            login() {
                this.$store.dispatch({
                    type: 'auth/login',
                    data: this.input,
                }).then(result => {
                    if (result && !result.error) {
                        this.$router.push('/');
                    } else {
                        this.invalidate = "invalid-feedback shows";
                    }
                })
            },
            registration() {
                this.$router.push('/registration/');
            }
        }
    }
</script>

