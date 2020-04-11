const state = {
    playing: false,   //播放中
    fullScreen: false,  //全屏
    playlist: [],   //播放列表
    currentIndex: -1,  //歌曲索引
}
const getters = {
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playlist: state => state.playlist,
    currentIndex: state => state.currentIndex,
    currenSong: state => {
        return state.playlist[state.currentIndex]
    }
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
}
const actions = {

}
const songPlayer = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
export default songPlayer