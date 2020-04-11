<template>
    <div id="app">
        <MyHeader></MyHeader>
        <MyNav></MyNav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <SongPlayer></SongPlayer>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {},
    components: {
        MyHeader: () => import("@/views/MyHeader/MyHeader.vue"),
        MyNav: () => import("@/views/MyNav/MyNav.vue"),
        SongPlayer: () => import("@/views/SongPlayer/SongPlayer")
    },
    mounted() {}
};
</script>

<style lang = "scss">
body {
    background: rgb(242, 243, 244);
}
</style>
