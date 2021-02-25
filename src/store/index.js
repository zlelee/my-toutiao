import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: JSON.parse(localStorage.getItem('TOKEN'))
  },
  mutations: {
    setTokenObj (state, data) {
      state.tokenObj = JSON.stringify(data)
      window.localStorage.setItem('TOKEN', state.tokenObj)
    }
  },
  actions: {
  },
  modules: {
  }
})
