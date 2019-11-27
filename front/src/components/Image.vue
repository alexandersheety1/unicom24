<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <b-modal
          id="modal"
          title="Добавить комментарий"
          @show="resetModal"
          @hidden="resetModal"
          @ok="modalOk"
        >
          <b-form @submit.stop.prevent="onSubmit">
            <div class="col-12">
              <div :class="invalidate">Ошибка при входе, проверьте данные</div>
              <div class="row">
                Комментарий:
              </div>
              <div class="row">
                <b-input
                  id="comment"
                  v-model="comment"
                  type="text"
                  placeholder="Комментарий"
                  class="col-5 bordered"
                />
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
            <div class="row justify-content-end align-items-center">
              Пользователь: {{username}}
              <b-button
                class="ml-2"
                variant="outline-primary"
                @click="logout"
              >
                Выйти
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center pb-2">
      Фильтры:
    </div>
    <div class="row justify-content-center pb-4">
      <div class="col-12">
        <div class="row">
          <b-button
            class="mr-4"
            variant="outline-primary"
            @click="filter_list(1)"
            :disabled="filter_type==1"
          >
            Все комментарии
          </b-button>
          <b-button
            variant="outline-primary"
            @click="filter_list(2)"
            :disabled="filter_type==2"
          >
            Комментарии пользователя
          </b-button>
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
                comments: [],
                comment: null,
                image: null,
                invalidate: "invalid-feedback",
                filter_type: 1,

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
                let data = {};
                if (this.filter_type != 1) {
                    data["user"] = this.user_id;
                }
                this.$store.dispatch({
                    type: 'comments/list',
                    data: data,
                }).then(result => {
                    if (!result.error) {
                        this.images = result.results;
                        this.$store.dispatch({
                            type: 'auth/update_userdata',
                            data: {
                                'user_id': result.user_id,
                                'username': result.username,
                            },
                        });
                    }
                });
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
            filter_list(new_type) {
                this.filter_type = new_type;
                this.fetchData();
            },
            logout() {
                this.$router.push('/logout');
            }
        }

    }
</script>

<style scoped>

</style>
