<template>
    <div class="Singers">
        <scrollNav :title="catTitle" :catList="catList" :fn="catfn"></scrollNav>
        <scrollNav :title="IniTitle" :catList="IniList" :fn="Intfn"></scrollNav>
        <div class="scroll-wapper" ref="scrollWapper">
            <scroll
                class="scroll"
                :data="SingerList"
                ref="scroll"
                :pullup="true"
                @scrollToEnd="scrollToEnd"
            >
                <SingerList @clickOne="clickOne" :data="SingerList">
                    <div class="loadWapper" v-show="more&&SingerList.length>0">
                        <loading></loading>
                    </div>
                </SingerList>
            </scroll>
        </div>
        <div class="load-wapper" v-show="!SingerList.length">
            <loading></loading>
        </div>

        <keep-alive>
            <transition name="slide" mode="out-in">
                <router-view :key="$route.path"></router-view>
            </transition>
        </keep-alive>
    </div>
</template>

<script>
import { getSingers } from "@/http/recommend-http.js";
import scrollNav from "@/components/scrollNav/scrollNav";
import scroll from "@/components/scroll/scroll";
import loading from "@/components/loading/MyLoading";
import SingerList from "@/components/singer-list/singer-list";

import bottomMixin from "@/mixin/bottomPlay";
export default {
    mixins: [bottomMixin],
    data() {
        return {
            SingerList: [],
            nowcat: "",
            nowIni: "",
            catTitle: "分类(默认热门):",
            catList: [
                "华语男",
                "华语女",
                "华语组合",
                "欧美男",
                "欧美女",
                "欧美组合",
                "日本男",
                "日本女",
                "日本组合",
                "韩国男",
                "韩国女",
                "其他男",
                "其他女"
            ],
            catTupe: [
                //对应接口的I
                1001,
                1002,
                1003,
                2001,
                2002,
                2003,
                6001,
                6002,
                6003,
                7001,
                7002,
                4001,
                4002
            ],
            IniTitle: "首字母：",
            IniList: [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z"
            ],
            page: 1,
            more: true
        };
    },

    methods: {
        catfn(index) {
            if (index === undefined) {
                this.nowcat = "";
                return;
            }
            this.nowcat = this.catTupe[index];
        },
        Intfn(index) {
            if (index === undefined) {
                this.nowIni = "";
                return;
            }
            this.nowIni = this.IniList[index];
        },
        getData(offset) {
            if (!this.more) {
                return;
            }
            getSingers(this.nowcat, this.nowIni, offset).then(res => {
                console.log(res);
                if (res.data.more === false) {
                    this.more = false;
                }
                if (res.status == "200") {
                    if (res.data.artists.length === 0) {
                        return;
                    }
                    if (offset) {
                        res.data.artists.forEach(cur => {
                            cur.picUrl = cur.img1v1Url;
                            this.SingerList.push(cur);
                        });
                        this.$nextTick(() => {
                            this.$refs.scroll.refresh();
                        });
                        return;
                    }
                    this.SingerList = res.data.artists;
                    this.$nextTick(() => {
                        this.$refs.scroll.refresh();
                    });
                }
            });
        },
        scrollToEnd() {
            this.getData(this.page * 10);
            this.page++;
        },
        clickOne(item) {
            //去歌手详情页面
            this.$router.push({ path: "/singers/" + item.id });
        },
        changScroll() {
            if (this.fullScreen !== "" && this.currenSong) {
                this.$nextTick(() => {
                    this.$refs.scrollWapper.style.bottom = "70px";
                    this.$refs.scroll.refresh();
                });
            } else {
                this.$nextTick(() => {
                    this.$refs.scrollWapper.style.bottom = "";
                    this.$refs.scroll.refresh();
                });
            }
        },
        activated() {
            this.$refs.scroll.refresh();
        }
    },
    mounted() {
        this.getData();
        this.changScroll();
    },
    components: {
        scrollNav,
        scroll,
        loading,
        SingerList
    },
    watch: {
        nowcat() {
            this.SingerList = [];
            this.page = 1; //当条件改变时，重置page
            this.more = true;
            this.getData();
            this.$refs.scroll.scrollTo(0, 0, 200);
        },
        nowIni() {
            this.SingerList = [];
            this.page = 1;
            this.more = true;
            this.getData();
            this.$refs.scroll.scrollTo(0, 0, 200);
        }
    }
};
</script>

<style scoped lang="scss">
.Singers {
    .scroll-wapper {
        position: fixed;
        top: 165px;
        left: 0px;
        bottom: 0px;
        width: 100%;
        overflow: hidden;
        .scroll {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
        }
    }
    .load-wapper {
        position: fixed;
        top: 165px;
        left: 0px;
        bottom: 0px;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
