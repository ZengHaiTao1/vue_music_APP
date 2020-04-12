<template>
    <div class="singerDetails">
        <div class="top">
            <span class="iconfont icon-fanhui" @click="back"></span>
            <h1 class="name">{{name}}</h1>
        </div>
        <div class="singerImg" :style="bgStyle" ref="singerImg">
            <div class="fitter"></div>
        </div>
        <div class="scroll-wapper" ref="scrollWapper">
            <scroll
                ref="scroll"
                class="scroll"
                :listenScroll="true"
                @scroll="scroll"
                :probe-type="3"
            >
                <div>
                    <songlist :songList="songList"></songlist>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import { getsingerDetails, getSongDetails } from "@/http/recommend-http.js";
import songlist from "@/components/songList/songList";
// import { mapMutations } from "vuex";
import scroll from "@/components/scroll/scroll";
// import { Song } from "@/pojo/Song";
import { mapGetters } from "vuex";
import { prefixStyle } from "@/utils/dom.js";
const RESERVED_HEIGHT = 40; //定义顶部高度
const transform = prefixStyle("transform");
import bottomPlay from "@/mixin/bottomPlay";
export default {
    mixins: [bottomPlay],
    data() {
        return {
            songList: [],
            bgStyle: "",
            name: ""
        };
    },
    props: ["id"], //获取路由中的参数id
    methods: {
        // ...mapMutations("song", ["setSongList"]),
        scroll(pos) {
            let y = pos.y; //获取纵坐标
            let scale = 1; //图片放大
            if (y > 0) {
                scale = 1 + Math.abs(y) / this.imageHeight;
            }
            this.$refs.singerImg.style[transform] = `scale(${scale})`;
            if (y < this.minTransalteY) {
                this.$refs.singerImg.classList.add("imgtop");
            } else {
                this.$refs.singerImg.classList.remove("imgtop");
            }
        },
        back() {
            this.$router.back();
        },
        changScroll() {
            if (this.fullScreen !== "") {
                this.$refs.scrollWapper.style.bottom = "70px";
                this.$refs.scroll.refresh();
            }
        }
    },
    mounted() {
        // let id = this.$route.params.id;
        this.imageHeight = this.$refs.singerImg.clientHeight; //获取图片高度
        this.$refs.scrollWapper.style.top = `${this.imageHeight - 10}px`; //设置初始top值
        this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT; //获取滚到距离顶部40px的位置
        console.log(this.$route);
        if (this.$route.fullPath.indexOf("/singers") != -1) {
            getsingerDetails(this.id).then(res => {
                this.name = res.data.artist.name;
                this.bgStyle = `background-image:url(${res.data.artist.picUrl}?param=400x400)`;
                this.songList = res.data.hotSongs;
            });
        } else if (
            this.$route.fullPath.indexOf("/recommend") != -1 ||
            this.$route.fullPath.indexOf("/rank") != -1
        ) {
            getSongDetails(this.id).then(res => {
                console.log(res);
                this.name = res.data.playlist.name;
                this.bgStyle = `background-image:url(${res.data.playlist.coverImgUrl}?param=400x400)`;
                this.songList = res.data.playlist.tracks;
            });
        }
        this.changScroll();
    },
    components: {
        songlist,
        scroll
    },
    computed: {
        ...mapGetters("songPlayer", ["fullScreen"])
    },
    created() {
        console.log(123);
    }
};
</script>

<style scoped lang="scss">
.singerDetails {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    z-index: 100;
    transform-origin: top;
    overflow: hidden;
    background: rgb(242, 243, 244);
    .scroll-wapper {
        z-index: 50;
        position: absolute;
        // top: 277px;
        left: 0;
        right: 0;
        bottom: 0;
        .scroll {
            left: 0;
            overflow: visible;
            width: 100%;
            height: 100%;
            position: absolute;
        }
    }

    .top {
        top: 0;
        position: fixed;
        height: 40px;
        width: 100%;
        z-index: 100;
        display: flex;
        line-height: 40px;
        color: rgb(241, 241, 241);
        padding: 0px 10px 5px;
        .name {
            margin-left: 6px;
        }
    }
    .singerImg {
        position: relative;
        width: 100%;
        padding-top: 75%;
        transform-origin: top center;
        z-index: -1;
        background: 0% 0% / cover;
        .fitter {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, 0.3);
        }
        &.imgtop {
            height: 40px;
            padding-top: 0;
            z-index: 99;
        }
    }
}
</style>
