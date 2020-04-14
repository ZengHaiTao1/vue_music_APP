import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production';

import song from "@/store/model/song"
import songPlayer from "@/store/model/songPlayer"
import searchHistory from "@/store/model/searchHistory"
export default new Vuex.Store({
    modules: {
        song: Object.assign({}, {
            namespaced: true,
        }, song),
        songPlayer: Object.assign({}, {
            namespaced: true,
        }, songPlayer),
        searchHistory: Object.assign({}, {
            namespaced: true,
        }, searchHistory),
    },
    plugins: debug ? [createLogger()] : []
})

