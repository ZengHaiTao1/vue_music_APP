<template>
    <div class="SongPlayer" v-show="playlist.length>0">
        <transition
            name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
        >
            <div class="Fullscreen" v-show="fullScreen">
                <div class="background" v-if="currenSong">
                    <img
                        :src="currenSong.imgSrc+'?param=300x300'"
                        width="100%"
                        height="100%"
                        alt="歌曲图片"
                    />
                </div>
                <div class="background layer"></div>
                <div class="top">
                    <div class="icon" @click="closeFullscreen">
                        <span class="iconfont icon-jiantou1"></span>
                    </div>
                    <div class="title" v-if="currenSong">
                        <div>{{currenSong.songName}}</div>
                        <div class="autor">{{currenSong.name}}</div>
                    </div>
                </div>
                <div class="center">
                    <div class="Record">
                        <div class="cd" v-if="currenSong" ref="cdWrapper">
                            <img
                                class="image"
                                :class="!playing?'pause':''"
                                ref="imgRot"
                                :src="currenSong.imgSrc+'?param=300x300'"
                                alt
                            />
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="btnList">
                        <span class="iconfont icon-sort"></span>
                        <span class="iconfont icon-houtui" @click="prev"></span>
                        <span
                            class="iconfont"
                            :class="!playing?'icon-weibiaoti--2':'icon-zanting'"
                            @click.prevent.stop="toggerPlay"
                        ></span>
                        <span class="iconfont icon-qianjin" @click="next"></span>
                        <span class="iconfont icon-A_-bofangliebiao"></span>
                    </div>
                </div>
            </div>
        </transition>

        <!-------    mini播放器部分   ------>
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

        <audio
            v-if="currenSong"
            @play="ready"
            @error="error"
            :src="currenSong.songUrl"
            autoplay
            ref="audio"
        ></audio>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import { prefixStyle } from "@/utils/dom.js";
const transform = prefixStyle("transform");
export default {
    data() {
        return {
            songReady: false
        };
    },
    methods: {
        ...mapMutations("songPlayer", [
            "setFullScreen",
            "setPlaying",
            "setCurrentIndex"
        ]),
        closeFullscreen() {
            this.setFullScreen(false);
        },
        openFullscreen() {
            this.setFullScreen(true);
        },
        _getPosAndScale() {
            const targetWidth = 40;
            const paddingLeft = 40;
            const paddingBottom = 35;
            const paddingTop = 80;
            const width = window.innerWidth * 0.8;
            const scale = targetWidth / width;
            const x = -(window.innerWidth / 2 - paddingLeft);
            const y =
                window.innerHeight - paddingTop - width / 2 - paddingBottom;
            return {
                x,
                y,
                scale
            };
        },
        enter(el, done) {
            const { x, y, scale } = this._getPosAndScale();
            let animation = {
                //定义transform
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)`
                }
            };
            animations.registerAnimation({
                //注册动画
                name: "move",
                animation,
                presets: {
                    duration: 400,
                    easing: "linear"
                }
            });
            animations.runAnimation(this.$refs.cdWrapper, "move", done); //执行动画
        },
        afterEnter() {
            animations.unregisterAnimation("move");
            this.$refs.cdWrapper.style.animation = "";
        },
        leave(el, done) {
            this.$refs.cdWrapper.style.transition = "all 0.4s";
            const { x, y, scale } = this._getPosAndScale();
            this.$refs.cdWrapper.style[
                transform
            ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
            this.$refs.cdWrapper.addEventListener("transitionend", done);
        },
        afterLeave() {
            this.$refs.cdWrapper.style.transition = "";
            this.$refs.cdWrapper.style[transform] = "";
        },
        toggerPlay() {
            this.setPlaying(!this.playing);
            if (this.$refs.audio.paused) {
                this.$refs.imgRot.classList.remove("pause");
                this.$refs.audio.play();
            } else {
                this.$refs.imgRot.classList.add("pause");
                this.$refs.audio.pause();
            }
        },
        next() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex + 1;
            if (index === this.playlist.length) {
                index = 0;
            }
            this.setCurrentIndex(index);
            this.$refs.imgRot.style[transform] = "rotate(0deg)";
        },
        ready() {
            this.songReady = true;
        },
        error() {
            this.songReady = true;
        },
        prev() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex - 1;
            if (index === -1) {
                index = this.playlist.length - 1;
            }
            this.setCurrentIndex(index);
            this.$refs.imgRot.style[transform] = "rotate(0deg)";
        }
    },
    mounted() {
        console.log(this._getPosAndScale());
    },
    computed: {
        ...mapGetters("songPlayer", [
            "fullScreen",
            "playing",
            "currenSong",
            "playlist",
            "currentIndex"
        ])
    },
    watch: {
        currenSong(newSong, oldSong) {
            if (newSong == oldSong) {
                return;
            }
            this.setPlaying(true);
        }
    }
};
</script>

<style scoped lang="scss">
.SongPlayer {
    .Fullscreen {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: whitesmoke;
        z-index: 150;
        &.normal-enter-active,
        &.normal-leave-active {
            transition: all 0.4s;
            .top,
            .bottom {
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
            }
        }
        &.normal-enter,
        &.normal-leave-to {
            opacity: 0;
            .top {
                transform: translate3d(0, -100px, 0);
            }
            .bottom {
                transform: translate3d(0, 100px, 0);
            }
        }

        .background {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px);
            &.layer {
                opacity: 0.3;
                filter: none;
                background: rgb(46, 48, 48);
            }
        }
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
            }
        }
        .center {
            height: 62%;
            position: relative;
            display: flex;
            justify-content: center;
            width: 100%;
            .Record {
                width: 100%;
                position: relative;
                display: flex;
                justify-content: center;
                .cd {
                    top: 16%;
                    position: absolute;
                    width: 70%;
                    height: 70vw;
                    background-size: contain;
                    border-width: 4px;
                    background-image: url($baseUrl+"img/cd.png");
                    border-style: solid;
                    border-color: rgba(228, 228, 228, 0.1);
                    border-image: initial;
                    border-radius: 50%;
                    background-position: 50% center;
                    background-repeat: no-repeat;
                    .image {
                        position: absolute;
                        left: 0px;
                        right: 0px;
                        top: 0px;
                        bottom: 0px;
                        width: 68%;
                        height: 68%;
                        margin: auto;
                        border-radius: 50%;
                        animation: rot 20s linear 0s infinite normal none
                            running;
                        &.pause {
                            animation-play-state: paused;
                        }
                        @keyframes rot {
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    }
                }
            }
        }
        .bottom {
            height: 30%;
            position: relative;
            .btnList {
                position: absolute;
                bottom: 5vh;
                width: 100vw;
                height: 10vh;
                display: flex;
                justify-content: center;
                span {
                    flex: 1;
                    text-align: center;
                    font-size: 30px;
                }
            }
        }
    }
    .Mini {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: rgb(228, 228, 228);
        z-index: 160;
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
}
</style>
