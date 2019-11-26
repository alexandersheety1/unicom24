import session from '../api/session';
import {get_item, set_item, del_item,} from './storage';
import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTRATION_BEGIN,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  LOGOUT,
  REMOVE_TOKEN,
  SET_TOKEN,
} from './types';

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';
const UID_STORAGE_KEY = 'UID_STORAGE_KEY';
const USERNAME_STORAGE_KEY = 'USERNAME_STORAGE_KEY';

const initialState = {
    error: false,
    token: null,
    user_id: null,
    username: null,
};

const getters = {
    isAuthenticated: state => !!state.token,
    user_id: state => state.user_id,
    username: state => state.username,
};

const actions = {
    login({commit}, {username, password}) {
        commit(LOGIN_BEGIN);
        return session.login(username, password)
            .then(({data}) => commit(SET_TOKEN, data))
            .then(() => commit(LOGIN_SUCCESS))
            .catch(() => commit(LOGIN_FAILURE));
    },

    logout({commit}) {
        return session.logout()
            .then(() => commit(LOGOUT))
            .catch(function () {
                //console.log('Logout exception: ', e);
                commit(LOGIN_FAILURE);
            })
            .finally(() => commit(REMOVE_TOKEN));
    },

    registration({commit}, {username,email, password,password_confirm}){
        return session.registration(username,email, password,password_confirm)
            .then(() => commit(REGISTRATION_SUCCESS))
            .catch(() => commit(REGISTRATION_FAILURE));
    },
    initialize({commit}) {
        const data = {
            token: get_item(TOKEN_STORAGE_KEY),
            user_id: get_item(UID_STORAGE_KEY),
            username: get_item(USERNAME_STORAGE_KEY),
        };
        if (data.token) {
            commit(SET_TOKEN, data);
        } else {
            commit(REMOVE_TOKEN);
        }
    },
};

const mutations = {
    [LOGIN_BEGIN](state) {
        state.error = false;
    },
    [LOGIN_FAILURE](state) {
        state.error = true;
    },
    [LOGIN_SUCCESS](state) {
        state.error = false;
    },
    [REGISTRATION_BEGIN](state) {
        state.error = false;
    },
    [REGISTRATION_FAILURE](state) {
        state.error = true;
    },
    [REGISTRATION_SUCCESS](state) {
        state.error = false;
    },
    [LOGOUT](state) {
        state.error = false;
    },
    [SET_TOKEN](state, data) {
        set_item(TOKEN_STORAGE_KEY, data.token);
        set_item(UID_STORAGE_KEY, data.user_id);
        set_item(USERNAME_STORAGE_KEY, data.username);
        state.token = data.token;
        state.user_id = data.user_id;
        state.username = data.username;
        session.defaults.headers.Authorization = `Token ${data.token}`;
    },
    [REMOVE_TOKEN](state) {
        del_item(TOKEN_STORAGE_KEY);
        del_item(UID_STORAGE_KEY);
        del_item(USERNAME_STORAGE_KEY);
        delete session.defaults.headers.Authorization;
        state.token = null;
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
