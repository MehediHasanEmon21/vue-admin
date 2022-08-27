

export const user = {
    namespaced: true,
    state: {
        user: {},
        users: []
    },
    getters: {
        getUser(state){
            return state.user;
        },
        getUsers(state){
            return state.users;
        }
    },
    actions: {
        getUser({commit}, payload){
            commit('getUser',payload)
        },
        userList({commit}, payload){
            commit('userList',payload);
        }
    },
    mutations: {
        getUser(state, payload){
            return state.user = payload;
        },
        userList(state, payload){
            return state.users = payload;
        }
    }

}