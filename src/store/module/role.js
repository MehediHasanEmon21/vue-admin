export const role = {

    namespaced: true,
    state: {
        roles: []
    },
    getters: {
        getRoles(state){
            return state.roles;
        }
    },
    actions: {
        roleList({commit}, payload){
            commit('roleList',payload);
        }
    },
    mutations: {
        roleList(state, payload){
            return state.roles = payload;
        }
    }

}