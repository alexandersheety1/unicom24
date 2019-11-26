import API from '../api/api';
import router from '../router';
import {get_item, set_item, del_item,} from './storage';
import {
    COMMENT_OK,
    COMMENT_ERROR,
    COMMENTS_SET,
    COMMENT_SET,
    COMMENT_ADD,
    COMMENT_DEL,
} from './types';

const COMMENT_STORAGE_KEY = 'COMMENT_STORAGE_KEY';
const COMMENTS_STORAGE_KEY = 'COMMENTS_STORAGE_KEY';

const initialState = {
    error: false,
    comment: null,
    comments: null,
};

const getters = {
    comments: function (state) {
        return state.comments;
    },
    comment: state => state.comment,
};

const mutations = {
    [COMMENT_OK](state) {
        state.error = false;
    },
    [COMMENT_ERROR](state, do_logout = false) {
        state.error = true;
        if (do_logout) {
            router.push('/logout');
        }
    },
    [COMMENTS_SET](state, qs) {
        state.error = false;
        set_item(COMMENTS_STORAGE_KEY, qs);
        state.comments = qs;
    },
    [COMMENT_SET](state, q) {
        state.error = false;
        set_item(COMMENT_STORAGE_KEY, q);
        state.comment = q;
    },
    [COMMENT_ADD](state, q) {
        state.error = false;
        state.comments = [q, ...state.comments]
    },
    [COMMENT_DEL](state, {id}) {
        state.error = false;
        del_item(COMMENT_STORAGE_KEY);
        state.comment = null;
        if (state.comments) {
            if (state.comments.filter) {
                state.comments = state.comments.filter(
                    comment => {
                        return comment.id !== id
                    });
            }
        }
    },
};


const actions = {
    list({commit}, {data}) {
        return API.comment.list(data)
            .then(function (data) {
                commit(COMMENTS_SET, data);
                return data
            })
            .catch(function () {
                commit(COMMENT_ERROR);
            });
    },
    get({commit}, {id}) {
        return API.comment.get(id)
            .then(function (data) {
                commit(COMMENT_SET, data);
                return data;
            })
            .catch(function () {
                commit(COMMENT_ERROR);
            });
    },
    update({commit}, {id, data}) {
        return API.comment.update(id, data)
            .then(function (data) {
                commit(COMMENT_SET, data);
                return data;
            })
            .catch(function () {
                commit(COMMENT_ERROR);
            });
    },
    upload({commit}, {id, data}) {
        return API.comment.upload(id, data)
            .then(function (data) {
                commit(COMMENT_SET, data);
                return data;
            })
            .catch(function () {
                commit(COMMENT_ERROR);
            });
    },
    create({commit}, {data}) {
        return API.comment.create(data)
            .then(function (data) {
                commit(COMMENT_SET, data);
                return data;
            })
            .catch(function () {
                commit(COMMENT_ERROR);
            });
    },
    delete({commit}, {data}) {
        return API.comment.delete(data)
            .then(function (data) {
                commit(COMMENT_DEL, data);
                return data;
            })
            .catch(function () {
                commit(COMMENT_ERROR);
            });
    },
    initialize({commit}) {
        const g = get_item(COMMENT_STORAGE_KEY);
        const gs = get_item(COMMENTS_STORAGE_KEY);

        if (g) {
            commit(COMMENT_SET, g);
        } else {
            commit(COMMENT_SET, null);
        }
        if (gs) {
            commit(COMMENTS_SET, gs);
        } else {
            commit(COMMENTS_SET, null);
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
