import API from '../api/api';
import router from '../router';
import {get_item, set_item, del_item,} from './storage';
import {
    GALLERY_OK,
    GALLERY_ERROR,
    GALLERYS_SET,
    GALLERY_SET,
    GALLERY_ADD,
    GALLERY_DEL,
} from './types';

const GALLERY_STORAGE_KEY = 'GALLERY_STORAGE_KEY';
const GALLERYS_STORAGE_KEY = 'GALLERYS_STORAGE_KEY';

const initialState = {
    error: false,
    gallery: null,
    gallerys: null,
};

const getters = {
    gallerys: function (state) {
        return state.gallerys;
    },
    gallery: state => state.gallery,
};

const mutations = {
    [GALLERY_OK](state) {
        state.error = false;
    },
    [GALLERY_ERROR](state, do_logout = false) {
        state.error = true;
        if (do_logout) {
            router.push('/logout');
        }
    },
    [GALLERYS_SET](state, qs) {
        state.error = false;
        set_item(GALLERYS_STORAGE_KEY, qs);
        state.gallerys = qs;
    },
    [GALLERY_SET](state, q) {
        state.error = false;
        set_item(GALLERY_STORAGE_KEY, q);
        state.gallery = q;
    },
    [GALLERY_ADD](state, q) {
        state.error = false;
        state.gallerys = [q, ...state.gallerys]
    },
    [GALLERY_DEL](state, {id}) {
        state.error = false;
        del_item(GALLERY_STORAGE_KEY);
        state.gallery = null;
        if (state.gallerys) {
            if (state.gallerys.filter) {
                state.gallerys = state.gallerys.filter(
                    gallery => {
                        return gallery.id !== id
                    });
            }
        }
    },
};


const actions = {
    list({commit}, {data}) {
        return API.gallery.list(data)
            .then(function (data) {
                commit(GALLERYS_SET, data);
                return data
            })
            .catch(function () {
                commit(GALLERY_ERROR);
            });
    },
    get({commit}, {id}) {
        return API.gallery.get(id)
            .then(function (data) {
                commit(GALLERY_SET, data);
                return data;
            })
            .catch(function () {
                commit(GALLERY_ERROR);
            });
    },
    update({commit}, {id, data}) {
        return API.gallery.update(id, data)
            .then(function (data) {
                commit(GALLERY_SET, data);
                return data;
            })
            .catch(function () {
                commit(GALLERY_ERROR);
            });
    },
    upload({commit}, {id, data}) {
        return API.gallery.upload(id, data)
            .then(function (data) {
                commit(GALLERY_SET, data);
                return data;
            })
            .catch(function () {
                commit(GALLERY_ERROR);
            });
    },
    create({commit}, {data}) {
        return API.gallery.create(data)
            .then(function (data) {
                commit(GALLERY_SET, data);
                return data;
            })
            .catch(function () {
                commit(GALLERY_ERROR);
            });
    },
    delete({commit}, {data}) {
        return API.gallery.delete(data)
            .then(function (data) {
                commit(GALLERY_DEL, data);
                return data;
            })
            .catch(function () {
                commit(GALLERY_ERROR);
            });
    },
    initialize({commit}) {
        const g = get_item(GALLERY_STORAGE_KEY);
        const gs = get_item(GALLERYS_STORAGE_KEY);

        if (g) {
            commit(GALLERY_SET, g);
        } else {
            commit(GALLERY_SET, null);
        }
        if (gs) {
            commit(GALLERYS_SET, gs);
        } else {
            commit(GALLERYS_SET, null);
        }
    },
};


export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
