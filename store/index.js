import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goods from './modules/goods'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    goods,
  },
  getters
})

export default store