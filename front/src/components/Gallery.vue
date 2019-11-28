<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <b-modal
          id="modal"
          title="Добавить изображение"
          @show="resetModal"
          @hidden="resetModal"
          @ok="modalOk"
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
                  v-model="image"
                  ref="image"
                  :state="Boolean(image)"
                  placeholder="Выберите изображение"
                  drop-placeholder="Переместите сюда изображение"
                />
              </div>
            </div>
          </b-form>
        </b-modal>
        <b-modal id="bv-modal-job" hide-footer>
          <template v-slot:modal-title>
            Запущена отправка на почту
          </template>
          <div class="d-block text-center">
            <h3>Запущена отправка на почту</h3>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-job')">Закрыть</b-button>
        </b-modal>
        <div class="row justify-content-center py-4">
          <h1>Галлерея</h1>
        </div>
        <div class="row justify-content-center pb-4">
          <div class="col-9">
            <div class="row">
              <b-button
                v-b-modal.modal
                class="mr-4"
                variant="outline-primary"
              >
                Добавить Изображение
              </b-button>
              <b-button
                variant="outline-primary"
                @click="job_start"
              >
                Загружить 1 файлом
              </b-button>
            </div>
          </div>
          <div class="col-3">
            <div class="row justify-content-end align-items-center">
              Пользователь: {{ username }}
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
                Все изображения
              </b-button>
              <b-button
                variant="outline-primary"
                @click="filter_list(2)"
                :disabled="filter_type==2"
              >
                Изображения Пользователя
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="images.length>0"
      class="row"
    >
      <div class="col-3"
           v-for="i in images" :key="i"
      >
        <div class="row p-2 justify-content-center align-items-center">
          <router-link :to="{ name:'comment',params:{'id':i.id} }">
            <b-img
              :src="i.image"
              fluid
              alt=""
            />
          </router-link>
        </div>
      </div>

    </div>
    <div
      v-else
      clas="row p-2"
    >
      Добавьте изображения
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {create_formdata} from '../store/storage';

    export default {
        name: 'Gallery',
        data() {
            return {
                images: [],
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
                    type: 'gallery/list',
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
                this.image = null;
            },
            modalOk: function () {
                let file = this.image;
                // eslint-disable-next-line no-console
                console.log("FILE: ", this.$refs.image, this.image);
                if (file) {
                    let data = create_formdata({
                        "image": this.image,
                        "user": this.user_id,
                    });
                    this.$store.dispatch({
                        type: 'gallery/create',
                        data: data,
                    }).then(result => {
                        if (result && !result.error) {
                            // eslint-disable-next-line no-console
                            console.log("IMAGE DATA: ", result);
                            this.fetchData();
                        }
                    });
                }
            },
            filter_list(new_type) {
                this.filter_type = new_type;
                this.fetchData();
            },
            job_start() {
                let data = {'type': this.filter_type};
                this.$store.dispatch({
                    type: 'job/create',
                    data: data,
                }).then(result => {
                    if (result && !result.error) {
                        this.$bvModal.show('bv-modal-job');
                    }
                });
            },
            logout() {
                this.$router.push('/logout/');
            }
        }
    }
</script>

<style scoped>

</style>
