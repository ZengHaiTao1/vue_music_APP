/**
 * 获取轮播图
 */
export function getBanner() {
    return window.axiosInstance({
        method: 'get',
        url: '/banner',
        params: { type: 2 }
    })
}
/**
 * 获取歌单列表
 */
export function getSongs() {
    return window.axiosInstance({
        method: 'get',
        url: '/personalized',
    })
}
/**
 * 获取歌手列表
 * @param  {} cat=""  类别
 * @param  {} initial="" 开头字母
 * @param  {} offset=0  偏移量
 * @param  {} limit=10  数据量
 */
export function getSingers(cat = "", initial = "", offset = 0, limit = 20) {
    return window.axiosInstance({
        method: 'get',
        url: '/artist/list',
        params: {
            initial,
            cat,
            limit,
            offset
        }
    })
}
/**
 * 获取歌手详情
 * @param  {} id  歌手id
 */
export function getsingerDetails(id) {
    return window.axiosInstance({
        method: 'get',
        url: '/artists',
        params: {
            id
        }
    })
}
/**
 * 获取歌词
 * @param  {} id 歌曲id
 */
export function getLyric(id) {
    return window.axiosInstance({
        method: 'get',
        url: '/lyric',
        params: {
            id
        }
    })
}
/**\
 * 获取歌单详情
 * @param  {} id   歌单id
 */
export function getSongDetails(id) {
    return window.axiosInstance({
        method: 'get',
        url: '/playlist/detail',
        params: {
            id
        }
    })
}
/**
 * 获取所有榜单
 */
export function getToplist() {
    return window.axiosInstance({
        method: 'get',
        url: '/toplist',
    })
}
/**
 * 获取热搜榜
 */
export function getSearchHot() {
    return window.axiosInstance({
        method: 'get',
        url: '/search/hot/detail',
    })
}

/**
 * 获取搜索建议
 * @param  {} keywords
 */
export function getSearcSuggest(keywords) {
    return window.axiosInstance({
        method: 'get',
        url: '/search/suggest',
        params: {
            keywords
        }
    })
}
export function getSearcBykeywords(keywords) {
    return window.axiosInstance({
        method: 'get',
        url: '/search',
        params: {
            keywords
        }
    })
}
export function getSearchResult(keywords) {
    return window.axios.all([getSearcSuggest(keywords), getSearcBykeywords(keywords)]).then(window.axios.spread((one, two) => {
        let obj = {}
        obj.singers = one.data.result.artists;
        obj.songSheet = one.data.result.playlists;
        obj.songList = two.data.result.songs
        return obj
    }))
}









