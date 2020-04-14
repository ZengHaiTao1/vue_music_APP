<template>
    <transition name="mini" mode="out-in">
        <div class="Mini" @click.prevent="openFullscreen" v-show="!fullScreen">
            <div class="imgWapper" v-if="currenSong">
                <img
                    class="play"
                    :src="currenSong.imgSrc+'?param=300x300'"
                    width="40"
                    height="40"
                    alt="img"
                />
            </div>
            <div class="text" v-if="currenSong">
                <div class="songNmae">{{currenSong.songName}}</div>
                <div class="autor">{{currenSong.name}}</div>
            </div>
            <div class="play">
                <span
                    class="iconfont"
                    @click.prevent.stop="toggerPlay"
                    :class="!playing?'icon-weibiaoti--2':'icon-zanting'"
                ></span>
            </div>
            <div class="openList">
                <span class="iconfont icon-A_-bofangliebiao"></span>
            </div>
        </div>
    </transition>
</template>

<script>
import playMixin from "@/mixin/play";
export default {
    mixins: [playMixin],
    data() {
        return {};
    },
    methods: {
        openFullscreen() {
            this.$parent.openFullscreen();
        },
        toggerPlay() {
            this.$parent.toggerPlay();
        }
    }
};
</script>

<style scoped lang="scss">
.Mini {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: rgb(228, 228, 228);
    z-index: 210;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    &.mini-enter-active,
    .fade-leave-active {
        transition: transform 0.5s;
    }
    &.mini-enter,
    .mini-leave-to {
        opacity: 0;
        transform: translate3d(0, 100px, 0);
    }
    .imgWapper {
        margin-left: 10px;
        flex: 1;
        img {
            border-radius: 50%;
        }
    }
    .text {
        flex: 4;
        .autor {
            margin-top: 3px;
            font-size: 14px;
        }
    }
    .play {
        flex: 1;
        span {
            font-size: 28px;
            padding: 5px;
        }
    }
    .openList {
        flex: 1;
        span {
            font-size: 24px;
            padding: 5px;
        }
    }
}
</style>
