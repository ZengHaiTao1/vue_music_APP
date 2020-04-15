<template>
    <div class="bottom">
        <div class="Progressbar-wapper">
            <slot></slot>
        </div>
        <div class="btnList">
            <span class="iconfont" @click="changeIcon" :class="iconClass"></span>
            <span class="iconfont icon-shangyishou" @click="prev"></span>
            <span
                class="iconfont"
                :class="!playing?'icon-bofang1':'icon-zanting1'"
                @click.prevent.stop="toggerPlay"
            ></span>
            <span class="iconfont icon-xiayishou" @click="next"></span>
            <span class="iconfont icon-A_-bofangliebiao" @click="setShow"></span>
        </div>
    </div>
</template>

<script>
import playMixin from "@/mixin/play";
export default {
    mixins: [playMixin],
    data() {
        return {
            iconClass: "icon-sort"
        };
    },
    methods: {
        prev() {
            this.$parent.prev();
        },
        next() {
            this.$parent.next();
        },
        toggerPlay() {
            this.$parent.toggerPlay();
        },

        setShow() {
            this.$parent.setShow(true);
        }
    }
};
</script>

<style scoped lang="scss">
.bottom {
    height: 30%;
    position: relative;
    padding: 0px 20px;
    .btnList {
        bottom: 10vh;
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            flex: 1;
            text-align: center;
            font-size: 35px;
        }
    }
    .Progressbar-wapper {
        // margin-top: 5vh;
        bottom: 5vh;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
