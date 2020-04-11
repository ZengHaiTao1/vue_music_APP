import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/recommend",
        component: () => import("@/views/MyBody/Recommend/Recommend.vue")
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
        path: "/Rank",
        component: () => import("@/views/MyBody/Rank/Rank.vue")
    }

]

const router = new VueRouter({
    routes
})

export default router
