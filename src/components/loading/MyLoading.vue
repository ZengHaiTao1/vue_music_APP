<template>
    <div class="loading">
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
        <span class="text">正在努力加载中...</span>
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

<style scoped lang="scss">
.loading {
    text-align: center;
    min-height: 45px;
    .text {
        min-height: 30px;
        margin-left: 4px;
        vertical-align: text-bottom;
    }
}
.loading .item {
    display: inline-block;
    width: 4px;
    /* height: 100%; */
    border-radius: 4px;
    margin-left: 2px;
    background: rgb(226, 78, 33);
    animation: load 1.2s ease-in-out infinite;
    vertical-align: text-bottom;
}
@keyframes load {
    0%,
    100% {
        height: 10px;
        background: rgba(202, 23, 16, 0.459);
    }
    50% {
        height: 20px;
        /* margin: -15px 0; */
        background: rgb(223, 23, 23);
    }
}
.loading .item:nth-child(2) {
    animation-delay: 0.2s;
}
.loading .item:nth-child(3) {
    animation-delay: 0.4s;
}
.loading .item:nth-child(4) {
    animation-delay: 0.6s;
}
.loading .item:nth-child(5) {
    animation-delay: 0.8s;
}
</style>
