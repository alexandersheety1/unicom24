import API from '../api/api';
import router from '../router';
import {get_item, set_item} from './storage';
import {
    JOB_OK,
    JOB_ERROR,
    JOB_SET,
} from './types';

const JOB_STORAGE_KEY = 'JOB_STORAGE_KEY';

const initialState = {
    error: false,
    job: null,
};

const getters = {
    job: state => state.job,
};

const mutations = {
    [JOB_OK](state) {
        state.error = false;
    },
    [JOB_ERROR](state, do_logout = false) {
        state.error = true;
        if (do_logout) {
            router.push('/logout/');
        }
    },
    [JOB_SET](state, q) {
        state.error = false;
        set_item(JOB_STORAGE_KEY, q);
        state.job = q;
    },
};


const actions = {
    create({commit}, {data}) {
        return API.job.create(data)
            .then(function (data) {
                commit(JOB_SET, data);
                return data;
            })
            .catch(function () {
                commit(JOB_ERROR);
            });
    },
    initialize({commit}) {
        const g = get_item(JOB_STORAGE_KEY);

        if (g) {
            commit(JOB_SET, g);
        } else {
            commit(JOB_SET, null);
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
