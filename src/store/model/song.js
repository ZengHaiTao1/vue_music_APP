const state = {
    songList: []
}
const getters = {
    getSongList: state => {
        return state.songList
    }
}
const mutations = {
    setSongList(state, data) {
        state.songList = data
    },
}
const actions = {
    
}
const song = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
export default song