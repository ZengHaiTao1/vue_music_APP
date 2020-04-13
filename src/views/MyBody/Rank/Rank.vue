<template>
    <div>
        <scroll class="scroll" ref="scroll">
            <div class="Rank">
                <h1>排行榜</h1>
                <div class="song-list clearfix">
                    <template v-for="(item,index) in rankList">
                        <a class="list-item" :key="index" @click="chang(item.id)">
                            <div class="img">
                                <img class="u-img" v-lazy="item.coverImgUrl" />
                                <span
                                    class="iconfont icon-erji"
                                >&nbsp;&nbsp;{{item.updateFrequency}}</span>
                            </div>
                            <div class="remd-text">{{item.name}}</div>
                        </a>
                    </template>
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
export default {
    mixins: [bottomMixin],
    data() {
        return {
            rankList: []
        };
    },
    methods: {
        chang(id) {
            this.$router.push({
                path: `/rank/${id}`
            });
        },
        changScroll() {
            if (this.fullScreen !== "") {
                console.log(this.$refs.scroll);
                this.$refs.scroll.$el.style.bottom = "70px";
                this.$refs.scroll.refresh();
            }
        }
    },
    mounted() {
        getToplist().then(res => {
            console.log(res.data.list);
            this.rankList = res.data.list;
        });
        this.changScroll();
    },
    components: {
        scroll
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
        .song-list {
            .list-item {
                display: block;
                margin-bottom: 16px;
                float: left;
                width: 33.3%;
                padding-left: 1px;
                padding-right: 1px;
                box-sizing: border-box;
                .remd-text {
                    padding: 6px 2px 0 6px;
                    min-height: 40px;
                    line-height: 1;
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                .img {
                    position: relative;
                    padding-bottom: 100%;
                    img {
                        position: absolute;
                        width: 100%;
                        left: 0;
                        top: 0;
                        z-index: 1;
                        vertical-align: middle;
                        border: 0;
                    }
                    .iconfont {
                        position: absolute;
                        right: 5px;
                        top: 2px;
                        z-index: 3;
                        padding-left: 13px;
                        color: #fff;
                        font-size: 12px;
                        background-position: 0;
                        background-repeat: no-repeat;
                        background-size: 11px 10px;
                        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
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
