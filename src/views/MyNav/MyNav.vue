<template>
    <nav>
        <router-link tag="a" to="/recommend" class="active">推荐</router-link>
        <router-link tag="a" to="/singers">歌手</router-link>
        <router-link tag="a" to="/rank">排行榜</router-link>
    </nav>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {}
};
</script>

<style scoped lang="scss">
nav {
    background: white;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.5);
    a {
        flex: 1;
        text-align: center;
        padding: 10px 0;
        font-weight: 500;
        position: relative;
        color: #000;
        &.router-link-active {
            color: #dd001b;
            &::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -1px;
                z-index: 0;
                width: 100%;
                height: 4px;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                background: #dd001b;
            }
        }
    }
}
</style>
