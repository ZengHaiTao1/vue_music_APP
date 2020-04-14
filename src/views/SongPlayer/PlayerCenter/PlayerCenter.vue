<template>
    <div class="center" ref="cdWrapper">
        <transition name="slide-fade">
            <div
                class="needle"
                v-show="currentShow==='cd'"
                :class="!playing?'pause':''"
                ref="needle"
            ></div>
        </transition>
        <transition name="slide-fade">
            <div class="Record" v-show="currentShow==='cd'" key="cd">
                <div class="cd" v-if="currenSong" @click="chang">
                    <img
                        class="image animation"
                        :class="!playing?'pause':''"
                        ref="imgRot"
                        :src="currenSong.imgSrc+'?param=300x300'"
                        alt
                    />
                </div>
            </div>
        </transition>
        <transition name="slide-fade">
            <scroll
                v-show="currentShow==='Lyric'"
                class="lyric"
                ref="lyricList"
                :data="currentLyric && currentLyric.lines"
                key="Lyric"
            >
                <div class="lyric-wrapper" @click="chang">
                    <div v-if="currentLyric">
                        <p
                            :key="index"
                            ref="lyricLine"
                            class="text"
                            :class="{'current': currentLineNum ===index}"
                            v-for="(line,index) in currentLyric.lines"
                        >{{line.txt}}</p>
                    </div>
                </div>
            </scroll>
        </transition>
    </div>
</template>

<script>
import playMixin from "@/mixin/play";
import Lyric from "lyric-parser"; //歌词插件
import { getLyric } from "@/http/recommend-http";
import scroll from "@/components/scroll/scroll";
export default {
    mixins: [playMixin],
    data() {
        return {
            currentShow: "cd",
            currentLyric: null, //当前歌词
            currentLineNum: 0, //当前行数
            playingLyric: ""
        };
    },
    methods: {
        chang() {
            if (this.currentShow === "cd") {
                this.currentShow = "Lyric";
            } else {
                this.currentShow = "cd";
            }
        },
        getLyric() {
            getLyric(this.currenSong.id)
                .then(lyric => {
                    this.currentLyric = new Lyric(
                        lyric.data.lrc.lyric,
                        this.handleLyric
                    );
                    console.log(this.currentLyric);
                    if (this.playing) {
                        this.currentLyric.play();
                    }
                })
                .catch(() => {
                    this.currentLyric = null;
                    this.playingLyric = "";
                    this.currentLineNum = 0;
                });
        },
        handleLyric({ lineNum, txt }) {
            this.currentLineNum = lineNum;
            if (lineNum > 5) {
                let lineEl = this.$refs.lyricLine[lineNum - 5];
                this.$refs.lyricList.scrollToElement(lineEl, 1000);
            } else {
                this.$refs.lyricList.scrollTo(0, 0, 1000);
            }
            this.playingLyric = txt;
        },
        togglePlaying() {
            if (this.currentLyric) {
                this.currentLyric.togglePlay();
            }
        }
    },
    mounted() {},
    components: {
        scroll
    },
    watch: {
        currenSong(newSong, oldSong) {
            if (newSong == oldSong) {
                return;
            }
            if (this.currentLyric) {
                this.currentLyric.stop();
                this.currentTime = 0;
                this.playingLyric = "";
                this.currentLineNum = 0;
            }
            this.getLyric();
        }
    }
};
</script>

<style scoped lang="scss">
.center {
    height: 62%;
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    // overflow: hidden;
    .lyric {
        position: absolute;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        text-align: center;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text {
                line-height: 32px;
                color: rgba(255, 255, 255, 0.5);
                &.current {
                    color: rgb(255, 255, 255);
                }
            }
        }
    }
    .needle {
        position: absolute;
        top: -6.67vw;
        left: 48vw;
        width: 25vw;
        height: 40vw;
        z-index: 100;
        background-image: url($baseUrl+"img/needle.png");
        background-size: contain;
        transform-origin: 4.5vw 4.5vw 0px;
        transform: rotate(0deg);
        background-position: 50% center;
        background-repeat: no-repeat;
        transition: all 0.3s ease 0s;
        &.pause {
            transform: rotate(-30deg);
        }
    }
    .Record {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .cd {
            position: relative;
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
                &.pause {
                    animation-play-state: paused !important;
                }
                @keyframes rot {
                    100% {
                        transform: rotate(360deg);
                    }
                }
                &.animation {
                    animation: rot 20s linear 0s infinite normal none running;
                }
            }
        }
    }
}
.slide-fade-leave-active,
.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
}
</style>
