

export const user = {
    namespaced: true,
    state: {
        user: {}
    },
    getters: {
        getUser(state){
            return state.user;
        }
    },
    actions: {
        getUser({commit}, payload){
            commit('getUser',payload)
        }
    },
    mutations: {
        getUser(state, payload){
            return state.user = payload;
        }
    }

}