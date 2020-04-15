<template>
    <div class="bottom">
        <div class="Progressbar-wapper">
            <slot></slot>
        </div>
        <div class="btnList">
            <span class="iconfont" @click="change" :class="iconClass"></span>
            <span class="iconfont icon-houtui" @click="prev"></span>
            <span
                class="iconfont"
                :class="!playing?'icon-weibiaoti--2':'icon-zanting'"
                @click.prevent.stop="toggerPlay"
            ></span>
            <span class="iconfont icon-qianjin" @click="next"></span>
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
        change() {
            switch (this.mode) {
                case "order": {
                    this.setMode("loop");
                    break;
                }
                case "loop": {
                    this.setMode("random");
                    break;
                }
                case "random": {
                    this.setMode("order");
                    break;
                }
            }
            console.log(this.mode);
            console.log(this.iconClass);
        },
        setShow() {
            this.$parent.setShow(true);
        }
    },
    watch: {
        mode() {
            switch (this.mode) {
                case "order": {
                    this.iconClass = "icon-sort";
                    break;
                }
                case "loop": {
                    this.iconClass = "icon-danquxunhuan";
                    break;
                }
                case "random": {
                    this.iconClass = "icon-bofangye-caozuolan-suijibofang";
                    break;
                }
            }
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
        span {
            flex: 1;
            text-align: center;
            font-size: 35px;
        }
    }
    .Progressbar-wapper {
        margin-top: 5vh;
        bottom: 5vh;
        height: 10vh;
    }
}
</style>
