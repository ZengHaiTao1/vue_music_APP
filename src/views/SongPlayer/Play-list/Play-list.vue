<template>
    <transition @enter="enter" @afterEnter="afterEnter" @leave="leave" @afterLeave="afterLeave">
        <div class="Play-list" v-show="show" @click.stop="closePlayList">
            <div class="list-wapper" ref="list-wapper" @click.stop>
                <div class="top">
                    <div class="top-left" @click="changeIcon">
                        <span class="iconfont" :class="iconClass"></span>
                        <span class="title">{{modeText}}({{listLength}})</span>
                    </div>
                    <div class="top-right">
                        <span class="iconfont icon-shanchu1" @click="clearAll"></span>
                    </div>
                </div>
                <scroll :data="playlist" class="content" ref="scroll">
                    <ul ref="list">
                        <template v-for="item in playlist">
                            <li class="list" :key="item.id" @click="changeSong(item)">
                                <div class="song" :class="item.id===currenSong.id?'active':''">
                                    <span
                                        class="iconfont icon-ziyuanldpi"
                                        v-show="item.id===currenSong.id"
                                    ></span>
                                    <span class="songName">{{item.songName}}</span>
                                    <span class="autor">&nbsp;-&nbsp;{{item.name}}</span>
                                </div>
                                <div class="delete">
                                    <span
                                        class="iconfont icon-shanchu"
                                        @click.stop="delet(item.id)"
                                    ></span>
                                </div>
                            </li>
                        </template>
                    </ul>
                </scroll>
            </div>
        </div>
    </transition>
</template>

<script>
import animations from "create-keyframe-animation";
import { prefixStyle } from "@/utils/dom.js";
const transform = prefixStyle("transform");
const animation = prefixStyle("animation");
const transition = prefixStyle("transition");
import scroll from "@/components/scroll/scroll";
import { mapGetters, mapActions } from "vuex";
import playMixin from "@/mixin/play";
export default {
    mixins: [playMixin],
    data() {
        return {
            listLength: 0,
            iconClass: "icon-sort"
        };
    },
    created() {},
    methods: {
        ...mapActions("songPlayer", ["deleteById", "addSong", "clearSongList"]),
        closePlayList() {
            this.$parent.setShow(false);
        },
        enter(el, done) {
            let animation = {
                0: {
                    transform: `translate3d(0px,100%,0)`
                },
                100: {
                    transform: `translate3d(0,0,0)`
                }
            };
            animations.registerAnimation({
                //注册动画
                name: "move",
                animation,
                presets: {
                    duration: 300,
                    easing: "ease"
                }
            });
            animations.runAnimation(this.$refs["list-wapper"], "move", done); //执行动画
        },
        afterEnter() {
            animations.unregisterAnimation("move");
            this.$refs["list-wapper"].style[animation] = "";
        },
        leave(el, done) {
            this.$refs["list-wapper"].style[transition] = "all 0.3s";
            this.$refs["list-wapper"].style[
                transform
            ] = `translate3d(0,100%,0)`;
            this.$refs["list-wapper"].addEventListener("transitionend", done);
        },
        afterLeave() {
            this.$refs["list-wapper"].style[transition] = "";
            this.$refs["list-wapper"].style[transform] = "";
        },
        delet(id) {
            // console.log(id);
            this.deleteById(id);
        },
        scrollToCurrent() {
            if (!this.show) {
                return;
            }
            const index = this.playlist.findIndex(song => {
                return this.currenSong.id === song.id;
            });
            // console.log(index);
            this.$refs.scroll.scrollToElement(
                this.$refs.list.children[index <= 3 ? index : index - 3],
                300
            );
        },
        changeSong(item) {
            this.addSong(item);
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
                this.scrollToCurrent();
            });
        },
        clearAll() {
            this.$popup({
                title: "确定要清空播放播放列表?",
                btnOkFn: () => {
                    console.log("确定");
                    this.clearSongList();
                }
            });
        }
    },
    props: ["show"],
    computed: {
        ...mapGetters("songPlayer", ["playlist", "currenSong"]),
        modeText() {
            let text = "";
            switch (this.iconClass) {
                case "icon-sort": {
                    text = "列表循环";
                    break;
                }
                case "icon-danquxunhuan": {
                    text = "单曲循环";
                    break;
                }
                case "icon-bofangye-caozuolan-suijibofang": {
                    text = "随机播放";
                    break;
                }
            }
            return text;
        }
    },
    watch: {
        show(newval) {
            if (newval) {
                this.$nextTick(() => {
                    this.$refs.scroll.refresh();
                    this.scrollToCurrent();
                });
            }
            this.listLength = this.playlist.length;
        }
    },
    components: {
        scroll
    }
};
</script>

<style scoped lang="scss">
.Play-list {
    position: fixed;
    z-index: 300;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    .list-wapper {
        position: absolute;
        bottom: 0;
        background: whitesmoke;
        opacity: 1;
        width: 100%;
        height: 65%;
        border-radius: 5% 5% 0px 0px;
        animation-fill-mode: forwards;
        box-sizing: border-box;
        .top {
            padding: 10px;
            display: flex;
            height: 10%;
            align-items: center;
            box-sizing: border-box;
            border-bottom: 1px solid rgb(228, 228, 228);
            .top-right {
                flex: 1;
                text-align: right;
                .iconfont {
                    font-size: 18px;
                }
            }
            .top-left {
                flex: 6;
                .title {
                    margin-left: 3px;
                }
                .iconfont {
                    font-size: 18px;
                }
            }
        }
        .content {
            height: 90%;
            overflow: hidden;
            box-sizing: border-box;
            ul {
                padding: 10px;
                .list {
                    display: flex;
                    padding: 10px 0;
                    .song {
                        flex: 5;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        &.active {
                            color: #d44439 !important;
                            .autor {
                                color: #d44439 !important;
                            }
                        }
                        .autor {
                            color: rgba(0, 0, 0, 0.5);
                            font-size: 12px;
                        }
                        .iconfont {
                            margin-right: 5px;
                        }
                    }
                    .delete {
                        flex: 2;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>
