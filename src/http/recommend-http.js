export function getBanner() {
    return window.axiosInstance({
        method: 'get',
        url: '/banner',
        params: { type: 2 }
    })
}
export function getSongs() {
    return window.axiosInstance({
        method: 'get',
        url: '/personalized',
    })
}
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
export function getsingerDetails(id) {
    return window.axiosInstance({
        method: 'get',
        url: '/artists',
        params: {
            id
        }
    })
}