import storage from 'good-storage'
const state = {
    searchHistory: storage.get("_searchHistory_")||[]
}
const getters = {
    searchHistory: state => {
        return state.searchHistory
    }
}
const mutations = {
    setSearchHistory(state, data) {
        state.searchHistory = data
    },
    addHistory(state, data) {
       let index =  state.searchHistory.findIndex((cur)=>{
            return data===cur
        })
        if(index>-1){
            state.searchHistory.splice(index,1)
            state.searchHistory.unshift(data)
        }else{
            if(state.searchHistory.length>=15){
                state.searchHistory.pop()
            }
            state.searchHistory.unshift(data)
        }
        storage.set("_searchHistory_",state.searchHistory)
    },
    clear(state){
        state.searchHistory = [],
        storage.remove("_searchHistory_")
    }
}
const actions = {
    addHistory ({ commit },data) {
        commit('addHistory',data)
      },
      clear({ commit }){
        commit('clear')
      }
}
const searchHistory = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
export default searchHistory