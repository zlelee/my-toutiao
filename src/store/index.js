import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN = 'token'
export default new Vuex.Store({
  state: {
    tokenObj: getItem(TOKEN)
  },
  mutations: {
    setTokenObj (state, data) {
      state.tokenObj = data
      setItem(TOKEN, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
