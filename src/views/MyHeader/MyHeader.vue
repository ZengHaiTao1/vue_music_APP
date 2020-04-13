<template>
    <div class="MyHeader">
        <span class="iconfont icon-mulu"></span>
        <span class="title">Music</span>
        <router-link tag="span" to="/search" class="iconfont icon-sousuo"></router-link>
    </div>
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

<style scoped lang ="scss">
.MyHeader {
    z-index: 1000;
    background: rgb(212, 68, 57);
    height: 40px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    .iconfont {
        font-size: 25px;
        line-height: 40px;
        color: white;
    }
    .title {
        font-size: 20px;
        line-height: 40px;
        color: white;
    }
}
</style>
