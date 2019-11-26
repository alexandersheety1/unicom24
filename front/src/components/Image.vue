<template>
  <div class="col-12">
    <div class="row">
      <b-modal
        id="modal"
        title="Добавить комментарий"
        @show="resetModal"
        @hidden="resetModal"
        @ok="modalOk"
      >
        <b-form @submit.stop.prevent="onSubmit">
          <div class="row">
            <div :class="invalidate">Ошибка при входе, проверьте данные</div>
            <div class="col-12">
              <div class="row">
                Комментарий:
                <b-input
                  id="username"
                  v-model="comment"
                  type="text"
                  placeholder="username"
                  class="col-5 bordered"
                />
              </div>
            </div>
          </div>
        </b-form>
      </b-modal>
      <div class="row justify-content-center py-4">
        Галлерея
      </div>
      <div class="row justify-content-center pb-4">
        <div class="col-6">
          <div class="row">
            <b-button
              v-b-modal.modal
              class="mr-4"
              variant="outline-primary"
            >
              Добавить Комментарий
            </b-button>
          </div>
        </div>
        <div class="col-6">
          <div class="row justify-content-end">
            Пользователь: {{username}}
          </div>
        </div>
      </div>
    </div>
    <div class="row"/>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'Image',
        data() {
            return {
                comments: null,
                comment: null,
                image: null,
                invalidate: "invalid-feedback",

            }
        },
        computed: mapGetters('auth', [
            'isAuthenticated',
            'username',
            'user_id',
        ]),
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {

            },
            resetModal() {
                this.comment = '';
            },
            modalOk() {
                this.$store.dispatch({
                    type: 'comments/create',
                    data: {
                        "image": this.image.id,
                        "user": this.user_id,
                        "text": this.comment,
                    },
                }).then(result => {
                    if (!result.error) {
                        // eslint-disable-next-line no-console
                        console.log("IMAGE DATA: ", result);
                        this.fetchData();
                    }
                });
            },
        }

    }
</script>

<style scoped>

</style>
