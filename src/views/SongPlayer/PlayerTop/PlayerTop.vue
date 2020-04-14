<template>
    <div class="top" ref="top">
        <div class="icon" @click="closeFullscreen">
            <span class="iconfont icon-jiantou1"></span>
        </div>
        <div class="title" v-if="currenSong">
            <div>{{currenSong.songName}}</div>
            <div class="autor">{{currenSong.name}}</div>
        </div>
    </div>
</template>

<script>
import playMixin from "@/mixin/play";
export default {
    mixins: [playMixin],
    data() {
        return {};
    },
    methods: {
        closeFullscreen() {
            this.$parent.closeFullscreen();
            // this.setFullScreen(false);
        }
    }
};
</script>

<style scoped lang="scss">
.top {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid rgba(228, 228, 228, 0.1);
    height: 8%;
    box-align: center;
    .icon {
        flex: 1;
        text-align: center;
        vertical-align: middle;
        // height: 8%;
        // line-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            font-size: 24px;
        }
    }
    .title {
        flex: 5;
        .autor {
            color: rgba(0, 0, 0, 0.8);
        }
    }
}
</style>
