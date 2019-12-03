<template>
  <div class="col-12" v-if="image">
    <div class="row">
      <div class="col-12">
        <b-modal
          id="modal_comment"
          title="Добавить комментарий"
          @show="resetModal"
          @hidden="resetModal"
          @ok="modalOk"
        >
          <b-form @submit.stop.prevent="onSubmit">
            <div class="col-12">
              <div :class="invalidate">Ошибка при отправке</div>
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
        <b-modal
          id="modal_image"
          title="Добавить изображение"
          @show="resetModal_image"
          @hidden="resetModal_image"
          @ok="edit_image"
        >
          <b-form @submit.stop.prevent="onSubmit">
            <div class="col-12">
              <div :class="invalidate">
                Ошибка при отправке
              </div>
              <div class="row">
                Изображение:
              </div>
              <div class="row">
                <b-form-file
                  id="image"
                  v-model="newimage"
                  :state="Boolean(newimage)"
                  placeholder="Выберите изображение"
                  drop-placeholder="Переместите сюда изображение"
                />
              </div>
            </div>
          </b-form>
        </b-modal>
        <div class="row justify-content-center py-4">
          <h1>Изображение и комментарии</h1>
        </div>
        <div class="row justify-content-center pb-4">
          <div class="col-9">
            <div class="row">
              <b-button
                class="mr-4"
                variant="outline-primary"
                @click="goto_gallery"
              >
                Перейти в галлерею
              </b-button>
              <b-button
                v-b-modal.modal_comment
                class="mr-4"
                variant="outline-primary"
              >
                Добавить Комментарий
              </b-button>
              <b-button
                v-b-modal.modal_image
                class="mr-4"
                variant="outline-primary"
                :disabled="image.user_id!=image.user"
              >
                Изменить изображение
              </b-button>
              <b-button
                v-b-modal.modal
                variant="outline-primary"
                :disabled="image.user_id!=image.user"
                @click="delete_image"
              >
                Удалить изображение
              </b-button>
            </div>
          </div>
          <div class="col-3">
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
    <div class="row">
      <div class="col-8">
        <div class="row justify-content-center">
          <h2>Изображение</h2>
        </div>
        <div class="row">
          <b-img
            :src="image.image"
            fluid
            alt=""
          />
        </div>
      </div>
      <div class="col-4">
        <div class="row justify-content-center">
          <h2>Комментарии</h2>
        </div>
        <div class="row px-4 py-2" v-for="i in comments" :key="i">
          {{i.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {create_formdata} from '../store/storage';

    export default {
        name: 'Image',
        data() {
            return {
                comments: [],
                comment: '',
                image: null,
                newimage: null,
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
                let id = this.$route.params.id;
                this.$store.dispatch({
                    type: 'gallery/get',
                    id: id,
                }).then(result => {
                    if (result && !result.error) {
                        this.image = result;
                        this.$store.dispatch({
                            type: 'auth/update_userdata',
                            data: {
                                'user_id': result.user_id,
                                'username': result.username,
                            },
                        }).then(() => {
                            this.fetchComments();
                        });
                    }
                });

            },
            fetchComments() {
                let data = {};
                if (this.filter_type != 1) {
                    data["user"] = this.user_id;
                }
                this.$store.dispatch({
                    type: 'comments/list',
                    data: data,
                }).then(results => {
                    if (results && !results.error) {
                        this.comments = results;
                    }
                });
            },
            resetModal() {
                this.comment = '';
                this.invalidate = "invalid-feedback";
            },
            resetModal_image() {
                this.newimage = null;
                this.invalidate = "invalid-feedback";
            },
            modalOk(currentModal) {
                currentModal.preventDefault();
                this.$store.dispatch({
                    type: 'comments/create',
                    data: {
                        "image": this.image.id,
                        "user": this.user_id,
                        "text": this.comment,
                    },
                }).then(result => {
                    if (result && !result.error) {
                        this.$bvModal.hide('modal_comment');
                        this.fetchComments();
                    } else {

                        this.invalidate = "invalid-feedback shows";
                    }
                });
            },
            filter_list(new_type) {
                this.filter_type = new_type;
                this.fetchData();
            },
            edit_image(currentModal) {
                currentModal.preventDefault();
                let data = create_formdata({
                    "image": this.newimage,
                    "user": this.user_id,
                });
                this.$store.dispatch({
                    type: 'gallery/update',
                    id: this.image.id,
                    data: data,
                }).then(result => {
                    if (result && !result.error) {
                        this.$bvModal.hide('modal_image');
                        this.fetchData();
                    } else {

                        this.invalidate = "invalid-feedback shows";
                    }
                });
            },
            delete_image() {
                this.$store.dispatch({
                    type: 'gallery/delete',
                    data: this.image,
                }).then(() => {
                    this.$router.push('/');
                });
            },
            goto_gallery() {
                this.$router.push('/');
            },
            logout() {
                this.$router.push('/logout/');
            }
        }

    }
</script>

<style scoped>

</style>
