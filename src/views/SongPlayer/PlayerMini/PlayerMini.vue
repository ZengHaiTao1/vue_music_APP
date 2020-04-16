<template>
    <transition name="mini" mode="out-in">
        <div class="Mini" @click.prevent="openFullscreen" v-show="!fullScreen">
            <MySlider
                @next="next"
                @prev="prev"
                :data="playlist"
                :scrollX="true"
                class="left-wapper"
                ref="slider"
                :loop="true"
            >
                <ul>
                    <li
                        class="list"
                        :style="{width:widthStyle}"
                        v-for="item in playlist"
                        :key="item.id"
                        ref="list"
                    >
                        <div class="imgWapper" v-if="currenSong">
                            <img
                                :class="playing&&item.id===currenSong.id?'running':'pause'"
                                class="play"
                                :src="item.imgSrc+'?param=300x300'"
                                width="40"
                                height="40"
                                alt="img"
                            />
                        </div>
                        <div class="text" v-if="item">
                            <div class="songNmae">{{item.songName}}</div>
                            <div class="autor">{{playingLyric}}</div>
                        </div>
                    </li>
                </ul>
                <!-- <div class="imgWapper" v-if="currenSong">
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
                </div>-->
            </MySlider>

            <div class="play">
                <span
                    class="iconfont"
                    @click.prevent.stop="toggerPlay"
                    :class="!playing?'icon-weibiaoti--2':'icon-zanting'"
                ></span>
            </div>
            <div class="openList" @click.stop.prevent="setShow">
                <span class="iconfont icon-A_-bofangliebiao"></span>
            </div>
        </div>
    </transition>
</template>

<script>
import playMixin from "@/mixin/play";
// import BScroll from "better-scroll";
import MySlider from "@/components/slider/MySlider";
export default {
    mixins: [playMixin],
    props: ["playingLyric", "Handover"],
    data() {
        return {
            text: "",
            widthStyle: ""
        };
    },
    methods: {
        openFullscreen() {
            this.$parent.openFullscreen();
        },
        toggerPlay() {
            this.$parent.toggerPlay();
        },
        setShow() {
            this.$parent.setShow(true);
        },
        next() {
            this.$parent.next();
        },
        prev() {
            this.$parent.prev();
        }
    },
    mounted() {},
    components: {
        MySlider
    },
    watch: {
        fullScreen() {
            if (this.widthStyle === "") {
                //解决offsetWidth偏差的问题
                this.$nextTick(() => {
                    if (this.widthStyle === "") {
                        //解决offsetWidth偏差的问题
                        this.widthStyle = this.$refs.list[0].offsetWidth + "px";
                    }
                });
            }
            if (!this.fullScreen) {
                //此判断不加会导致滚动，从而触发next事件
                this.$nextTick(() => {
                    this.$refs.slider.refresh();
                    this.$refs.slider.goToPage(this.currentIndex, 0, 100);
                });
            }
        },
        playing() {
            if (!this.playing) {
                this.$parent.playingLyric = this.currenSong.name;
            }
        },
        Handover() {
            if (this.Handover) {
                this.$refs.slider.disable();
            } else {
                this.$refs.slider.enable();
            }
        }
    }
};
</script>

<style scoped lang="scss">
.Mini {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10%;
    box-sizing: border-box;
    background: rgb(228, 228, 228);
    z-index: 210;
    display: flex;
    justify-content: center;
    align-items: center;
    &.mini-enter-active,
    .fade-leave-active {
        transition: transform 0.5s;
    }
    &.mini-enter,
    .mini-leave-to {
        opacity: 0;
        transform: translate3d(0, 100px, 0);
    }
    .left-wapper {
        box-sizing: border-box;
        // padding: 5px 0 0 10px;
        height: 100%;
        width: 100%;
        flex: 6;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        // height: 44px;
        ul {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            white-space: nowrap;
            .list {
                height: 100%;
                display: inline-block;
                width: 75vw;
                // height: 44px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                position: relative;
                .imgWapper {
                    margin-left: 15px;
                    flex: 1;
                    img {
                        border-radius: 50%;
                        animation: rot 20s linear 0s infinite normal none
                            running;
                        &.pause {
                            animation-play-state: paused !important;
                        }
                        &.running {
                            animation-play-state: running !important;
                        }
                        @keyframes rot {
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    }
                }
                .text {
                    flex: 4;
                    .autor {
                        color: #8f8b8b;
                        margin-top: 3px;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .play {
        // padding: 5px 0px;
        flex: 1;
        span {
            font-size: 28px;
            padding: 5px;
        }
    }
    .openList {
        // padding: 5px 10px 5px 0;
        flex: 1;
        span {
            font-size: 24px;
            padding: 5px;
        }
    }
}
</style>
