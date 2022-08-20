import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import { user } from './module/user.js'
import { role } from './module/role.js'


export const store = new Vuex.Store({
    modules: {
      user: user,
      role: role

    }
})
