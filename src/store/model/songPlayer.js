
const state = {
    playing: false,   //播放中
    fullScreen: "",  //全屏
    playlist: [],   //播放列表
    currentIndex: -1,  //歌曲索引,
    mode: "order"
}
const getters = {
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playlist: state => state.playlist,
    currentIndex: state => state.currentIndex,
    currenSong: state => {
        return state.playlist[state.currentIndex]
    },
    mode: state => state.mode,
    isEmpty: state => {
        return state.playlist.length === 0
    },
}
const mutations = {
    setPlaying(state, value) {
        state.playing = value
    },
    setFullScreen(state, value) {
        state.fullScreen = value
    },
    setPlaylist(state, value) {
        state.playlist = value
    },
    setCurrentIndex(state, value) {
        state.currentIndex = value
    },
    setMode(state, value) {
        state.mode = value
    },
    addSong(state, song) {
        if (state.playlist.length === 0) {
            state.playlist.push(song)
            state.currentIndex = 0
            state.fullScreen = true
            return
        }
        let index = state.playlist.findIndex((cur) => {
            return cur.id === song.id
        })
        if (index >= 0) {
            state.currentIndex = index
        } else {
            state.playlist.splice(state.currentIndex + 1, 0, song)
            state.currentIndex++;
        }
        state.fullScreen = true
        console.log(state.playlist)
    },
    deleteById(state, id) {
        let index = state.playlist.findIndex((cur) => {
            return cur.id === id
        })
        state.playlist.splice(index, 1)
    },
    clearSongList(state) {
        state.fullScreen = false
        state.mode = "order"
        state.playing = false
        state.playlist.length = 0
        state.currentIndex = -1
    }
}
const actions = {
    addSong({ commit }, data) {
        commit('addSong', data)
    },
    deleteById({ commit }, data) {
        commit('deleteById', data)
    },
    clearSongList({ commit }) {
        commit('clearSongList')
    },

}
const songPlayer = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
export default songPlayer