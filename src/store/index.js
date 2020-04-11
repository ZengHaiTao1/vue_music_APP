import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import song from "@/store/model/song"
import songPlayer from "@/store/model/songPlayer"

export default new Vuex.Store({
    modules: {
        song: Object.assign({}, {
            namespaced: true,
        }, song),
        songPlayer: Object.assign({}, {
            namespaced: true,
        }, songPlayer),
    }
})
