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
export function getSingers(cat = "", initial = "", offset = 0, limit = 10) {
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



