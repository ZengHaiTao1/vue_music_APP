import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "*",
        redirect: "/recommend"
    },
    {
        path: "/recommend",
        component: () => import("@/views/MyBody/Recommend/Recommend.vue"),
        children: [
            {
                path: ":id",
                component: () => import("@/views/MyBody/Singers/singerDetails/singerDetails"),
                props: true
            },
        ]
    },
    {
        path: "/singers",
        component: () => import("@/views/MyBody/Singers/Singers.vue"),
        children: [
            {
                path: ":id",
                component: () => import("@/views/MyBody/Singers/singerDetails/singerDetails"),
                props: true
            },
        ]
    },
    {
        path: "/rank",
        component: () => import("@/views/MyBody/Rank/Rank.vue"),
        children: [
            {
                path: ":id",
                component: () => import("@/views/MyBody/Singers/singerDetails/singerDetails"),
                props: true
            },
        ]
    },
    {
        path: "/search",
        component: () => import("@/views/MyBody/Search/Search"),
    }

]

const router = new VueRouter({
    routes,
    mode: "history",
})

export default router
