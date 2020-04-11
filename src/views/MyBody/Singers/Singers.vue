<template>
    <div class="Singers">
        <scrollNav :title="catTitle" :catList="catList" :fn="catfn"></scrollNav>
        <scrollNav :title="IniTitle" :catList="IniList" :fn="Intfn"></scrollNav>
        <div class="scroll-wapper" v-if="SingerList.length">
            <scroll
                class="scroll"
                :data="SingerList"
                ref="scroll"
                :pullup="true"
                @scrollToEnd="scrollToEnd"
            >
                <div>
                    <div
                        class="img-wapper"
                        v-for="(item,index) in SingerList"
                        :key="index"
                        @click="gotoDetails(item.id)"
                    >
                        <img v-lazy="item.img1v1Url+'?param=200x200'" />
                        <span>
                            <span class="imgTitle">{{item.name}}</span>
                        </span>
                    </div>
                </div>
            </scroll>
        </div>
        <loading v-show="!SingerList.length"></loading>
        <transition name="slide">
            <keep-alive>
                <router-view :key="$route.path"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { getSingers } from "@/http/recommend-http.js";
import scrollNav from "@/components/scrollNav/scrollNav";
import scroll from "@/components/scroll/scroll";
import loading from "@/components/loading/loading";
export default {
    name: "",
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
            page: 1
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
            getSingers(this.nowcat, this.nowIni, offset).then(res => {
                if (res.status == "200") {
                    if (res.data.artists.length === 0) {
                        return;
                    }
                    if (offset) {
                        res.data.artists.forEach(cur => {
                            this.SingerList.push(cur);
                        });
                        // console.log(this.SingerList);
                        return;
                    }
                    this.SingerList = res.data.artists;
                }
            });
        },
        scrollToEnd() {
            this.getData(this.page * 10);
            this.page++;
        },
        gotoDetails(id) {
            //去歌手详情页面
            this.$router.push({ path: "/singers/" + id });
        }
    },
    mounted() {
        this.getData();
    },
    components: {
        scrollNav,
        scroll,
        loading
    },
    watch: {
        nowcat() {
            this.page = 1; //当条件改变时，重置page
            this.getData();
            this.$refs.scroll.scrollTo(0, 0, 200);
        },
        nowIni() {
            this.page = 1;
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
            .img-wapper {
                display: flex;
                border-bottom: 1px solid rgb(228, 228, 228);
                img {
                    flex: 1;
                    width: 60px;
                    height: 60px;
                    border-radius: 3px;
                }
                span {
                    flex: 4;
                    line-height: 60px;
                    .imgTitle {
                        margin-left: 20px;
                    }
                }
            }
        }
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
