<template>
    <transition name="fade">
        <div class="SongPlayer" v-show="playlist.length>0">
            <transition
                name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
            >
                <div class="Fullscreen" v-show="fullScreen">
                    <!--           背景部分      -->
                    <div class="background" v-if="currenSong">
                        <img
                            :src="currenSong.imgSrc+'?param=300x300'"
                            width="100%"
                            height="100%"
                            alt="歌曲图片"
                        />
                    </div>
                    <div class="background layer"></div>

                    <!--             顶部          -->
                    <PlayerTop ref="PlayerTop"></PlayerTop>

                    <!--              中部 -->
                    <PlayerCenter ref="PlayerCenter"></PlayerCenter>

                    <!--           底部           -->
                    <PlayBottom>
                        <Progressbar
                            @percentChange="percentChange"
                            :currentTime="currentTime"
                            :duration="duration"
                        ></Progressbar>
                    </PlayBottom>
                </div>
            </transition>

            <!-------    mini播放器部分   ------>
            <keep-alive>
                <PlayerMini :Handover="Handover" :playingLyric="playingLyric" @setShow="setShow"></PlayerMini>
            </keep-alive>

            <!--播放列表  -->
            <PlayList :show="showPlaylist" @setShow="setShow"></PlayList>

            <audio
                v-if="currenSong"
                @play="ready"
                @error="error"
                @timeupdate="updateTime"
                :src="currenSong.songUrl"
                autoplay
                ref="audio"
            ></audio>
        </div>
    </transition>
</template>

<script>
import playMixin from "@/mixin/play";
import animations from "create-keyframe-animation";
import { prefixStyle } from "@/utils/dom.js";
const transform = prefixStyle("transform");
//相关组件
import Progressbar from "@/components/Progressbar/Progressbar";
import PlayerTop from "@/views/SongPlayer/PlayerTop/PlayerTop";
import PlayerCenter from "@/views/SongPlayer/PlayerCenter/PlayerCenter";
import PlayerMini from "@/views/SongPlayer/PlayerMini/PlayerMini";
import PlayBottom from "@/views/SongPlayer/PlayBottom/PlayBottom";
import PlayList from "@/views/SongPlayer/Play-list/Play-list";

const interval = 500; //切换间隔
export default {
    mixins: [playMixin],
    data() {
        return {
            songReady: false,
            currentTime: "", //当前事件
            duration: "", //歌曲时长
            showPlaylist: false, //控制播放列表显示,
            playingLyric: "",
            Handover: false
        };
    },
    methods: {
        setShow(value) {
            this.showPlaylist = value;
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
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
            if (this.playlist.length === 0) {
                return;
            }
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
            animations.runAnimation(
                this.$refs.PlayerCenter.$refs.cdWrapper,
                "move",
                done
            ); //执行动画
        },
        afterEnter() {
            animations.unregisterAnimation("move");
            this.$refs.PlayerCenter.$refs.cdWrapper.style.animation = "";
        },
        leave(el, done) {
            this.$refs.PlayerCenter.$refs.cdWrapper.style.transition =
                "all 0.4s";
            const { x, y, scale } = this._getPosAndScale();
            this.$refs.PlayerCenter.$refs.cdWrapper.style[
                transform
            ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
            this.$refs.PlayerCenter.$refs.cdWrapper.addEventListener(
                "transitionend",
                done
            );
        },
        afterLeave() {
            this.$refs.PlayerCenter.$refs.cdWrapper.style.transition = "";
            this.$refs.PlayerCenter.$refs.cdWrapper.style[transform] = "";
        },
        toggerPlay() {
            if (this.$refs.audio.paused) {
                this.$refs.PlayerCenter.$refs.imgRot.classList.remove("pause");
                this.$refs.audio.play();
                this.setPlaying(true);
            } else {
                this.$refs.PlayerCenter.$refs.imgRot.classList.add("pause");
                this.$refs.audio.pause();
                this.setPlaying(false);
            }
            this.$refs.PlayerCenter.togglePlaying();
        },
        prev() {
            if (this.Handover) {
                return;
            }
            this.Handover = true;
            setTimeout(() => {
                this.Handover = false;
            }, interval);
            if (!this.songReady) {
                return;
            }
            this.$refs.PlayerCenter.$refs.needle.classList.add("pause");
            this.songReady = true;
            let index = this.currentIndex - 1;
            if (this.mode === "random") {
                index = this.getRandomInt(0, this.playlist.length);
            } else if (index === -1) {
                index = this.playlist.length - 1;
            }
            this.setCurrentIndex(index);
            this.$refs.PlayerCenter.$refs.imgRot.style[transform] =
                "rotate(0deg)";
        },
        next() {
            if (this.Handover) {
                return;
            }
            this.Handover = true;
            setTimeout(() => {
                this.Handover = false;
            }, interval);
            if (!this.songReady) {
                return;
            }
            this.$refs.PlayerCenter.$refs.needle.classList.add("pause");
            this.songReady = true;
            let index = this.currentIndex + 1;
            if (this.mode === "random") {
                index = this.getRandomInt(0, this.playlist.length);
            } else if (index === this.playlist.length) {
                index = 0;
            }
            this.setCurrentIndex(index);
            this.$refs.PlayerCenter.$refs.imgRot.style[transform] =
                "rotate(0deg)";
            if (!this.playing) {
                this.$refs.PlayerCenter.$refs.imgRot.classList.remove(
                    "animation"
                );
            }
            // this.$refs.PlayerCenter.lyricList.scrollTo(0, 0, 500);
        },
        ready() {
            this.duration = this.$refs.audio.duration;
            this.songReady = true;

            setTimeout(() => {
                this.$refs.PlayerCenter.$refs.imgRot.classList.add("animation");
                this.$refs.PlayerCenter.$refs.needle.classList.remove("pause");
            }, 500);
        },
        error() {
            this.songReady = true;
            alert("该歌曲没有版权或者是会员歌曲，请切换");
            this.next();
        },
        updateTime(e) {
            if (!this.currenSong) {
                return;
            }
            this.currentTime = e.target.currentTime;
            if (this.currentTime >= this.$refs.audio.duration) {
                if (this.mode === "loop") {
                    this.$refs.audio.currentTime = 0;
                    this.$refs.audio.play();
                    return;
                }
                this.next();
            }
        },
        percentChange(percent) {
            const currentTime = this.$refs.audio.duration * percent;
            this.$refs.audio.currentTime = currentTime;
            if (!this.playing) {
                this.toggerPlay();
            }
            if (this.$refs.PlayerCenter.currentLyric) {
                this.$refs.PlayerCenter.currentLyric.seek(currentTime * 1000);
            }
            if (percent >= 1) {
                if (this.mode === "loop") {
                    this.$refs.audio.currentTime = 0;
                    this.$refs.audio.play();
                    return;
                }
                this.next();
                return;
            }
        }
    },
    mounted() {},
    watch: {
        currenSong(newSong, oldSong) {
            if (!newSong) {
                this.setShow(false);
            }
            if (newSong == oldSong) {
                return;
            }
            this.setPlaying(true);
        }
    },
    components: {
        Progressbar,
        PlayerTop,
        PlayerCenter,
        PlayerMini,
        PlayBottom,
        PlayList
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
        z-index: 220;
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
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to {
    opacity: 1;
}
</style>
