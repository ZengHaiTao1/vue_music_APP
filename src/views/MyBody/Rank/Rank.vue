<template>
    <div>
        <scroll class="scroll" ref="scroll">
            <div class="Rank">
                <h1>排行榜</h1>
                <SongSheetList v-show="rankList.length>0" :data="rankList" @clickOne="clickOne"></SongSheetList>
                <div v-show="!rankList.length" class="load-wapper">
                    <loading></loading>
                </div>
            </div>
        </scroll>
        <transition name="slide">
            <keep-alive>
                <router-view :key="$route.path"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { getToplist } from "@/http/recommend-http.js";
import scroll from "@/components/scroll/scroll";
import bottomMixin from "@/mixin/bottomPlay";
import SongSheetList from "@/components/songSheet-list/songSheet-list";
import loading from "@/components/loading/MyLoading";
export default {
    mixins: [bottomMixin],
    data() {
        return {
            rankList: []
        };
    },
    methods: {
        clickOne(item) {
            this.$router.push({
                path: `/rank/${item.id}`
            });
        },
        changScroll() {
            console.log(1);
            if (this.fullScreen !== "" && this.currenSong) {
                console.log(2);
                console.log(this.currenSong);
                // console.log(this.$refs.scroll);
                this.$refs.scroll.$el.style.bottom = "70px";
                this.$refs.scroll.refresh();
            } else {
                console.log(3);
                this.$refs.scroll.$el.style.bottom = "";
                this.$refs.scroll.refresh();
            }
        }
    },
    mounted() {
        getToplist().then(res => {
            console.log(res.data.list);
            res.data.list.forEach(cur => {
                cur.bottomText = cur.name;
                cur.rightText = cur.updateFrequency;
            });
            this.rankList = res.data.list;
            console.log(this.rankList);
        });
        this.changScroll();
    },
    components: {
        scroll,
        SongSheetList,
        loading
    },
    activated() {
        this.changScroll();
        this.$refs.scroll.refresh();
    }
};
</script>

<style scoped lang="scss">
.scroll {
    position: fixed;
    width: 100%;
    top: 91px;
    bottom: 0;
    z-index: -1;
    overflow: hidden;
    .Rank {
        h1 {
            position: relative;
            padding: 20px 10px;
            font-size: 18px;
            &::after {
                content: " ";
                position: absolute;
                left: 0;
                top: 50%;
                margin-top: -9px;
                width: 2px;
                height: 16px;
                background-color: #d33a31;
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
