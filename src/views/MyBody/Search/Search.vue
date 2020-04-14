<template>
    <transition name="slide">
        <div class="search">
            <div class="top">
                <span data-v-1487e444 class="iconfont icon-fanhui back" @click="back"></span>
                <input v-model="searchText" type="text" placeholder="搜索歌曲，歌手，专辑" ref="inputs" />
                <span
                    @click="clearsearchText"
                    v-show="searchText"
                    data-v-1487e444
                    class="iconfont icon-shanchu delete"
                ></span>
            </div>
            <div class="content-wapper" v-show="searchText===''">
                <div class="History" v-show="searchHistory.length>0">
                    <div class="History-title">
                        <span class="left">历史记录</span>
                        <span class="right iconfont icon-shanchu1" @click="clear"></span>
                    </div>

                    <div class="History-list">
                        <scroll :data="searchHistory" :scrollX="true" :scrollY="false">
                            <ul class="list-wapper">
                                <li class="list" v-for="item in searchHistory" :key="item">{{item}}</li>
                            </ul>
                        </scroll>
                    </div>
                </div>
                <div class="searchHot">
                    <h1 class="title">热搜榜</h1>
                    <scroll class="scroll" ref="scroll">
                        <ListView @clickOne="clickOne" class="list" :data="searchHotList"></ListView>
                    </scroll>
                </div>
            </div>

            <scroll
                :data="dataChange"
                class="ResultScroll"
                v-show="searchText!==''&&!searching"
                ref="ResultScroll"
            >
                <div class="ResultWapper">
                    <div class="searchResult" v-show="singers.length>0">
                        <h1 class="title">相关歌手</h1>
                        <SingerList :data="singers"></SingerList>
                    </div>
                    <div class="searchResult" v-show="songSheet.length>0">
                        <h1 class="title">相关歌单</h1>
                        <SingerList :data="songSheet"></SingerList>
                    </div>
                    <div class="searchResult" v-show="songList.length >0">
                        <h1 class="title">相关歌曲</h1>
                        <ListView :data="songList"></ListView>
                    </div>
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script>
import ListView from "@/components/list-view/list-view";
import { getSearchHot, getSearchResult } from "@/http/recommend-http";
import scroll from "@/components/scroll/scroll";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import SingerList from "@/components/singer-list/singer-list";
export default {
    data() {
        return {
            searchText: "", //搜索框
            searchHotList: [], //热门搜索
            singers: [], //歌手列表
            songSheet: [], //歌单列表
            songList: [], //歌曲列表
            searching: false //是否正在搜索
        };
    },
    computed: {
        ...mapGetters("searchHistory", ["searchHistory"]),
        dataChange() {
            return [this.searchText];
        }
    },
    methods: {
        ...mapActions("searchHistory", ["addHistory", "clear"]),
        clearsearchText() {
            this.searchText = "";
            this.focus();
        },
        focus() {
            this.$refs.inputs.focus();
        },
        back() {
            this.$router.back();
        },
        clickOne(value) {
            console.log(value);
            this.addHistory(value.title);
            this.searchText = value.title;
        },
        changBottom() {
            if (this.searchHistory.length > 0) {
                this.$refs.scroll.$el.style.height = "80%";
                this.$refs.scroll.refresh();
            } else {
                this.$refs.scroll.$el.style.height = "93%";
                this.$refs.scroll.refresh();
            }
        },
        getSearchResult() {
            if (this.searchText === "") {
                return;
            }
            getSearchResult(this.searchText).then(res => {
                console.log(res);

                if (res.songSheet) {
                    res.songSheet.forEach(cur => {
                        let obj = {};
                        obj.id = cur.id;
                        obj.picUrl = cur.coverImgUrl;
                        obj.name = cur.name;
                        this.songSheet.push(obj);
                    });
                }
                if (res.songList) {
                    res.songList.forEach(cur => {
                        let obj = {};
                        obj.title = cur.name;
                        let describe = "";
                        cur.artists.forEach((cur, index, array) => {
                            describe += cur.name;
                            if (index < array.length - 1) {
                                describe += "/";
                            }
                        });
                        obj.describe = `${describe}-${cur.album.name}`;
                        this.songList.push(obj);
                    });
                }

                console.log(this.songList);
                console.log(this.songSheet);
                console.log(res);
                this.singers = this.singers || [];
                this.songList = this.songList || [];
                this.songSheet = this.songSheet || [];
            });
        }
    },
    mounted() {
        this.focus();
        getSearchHot().then(res => {
            console.log(res);
            res.data.data.forEach(cur => {
                let obj = {};
                obj.title = cur.searchWord;
                obj.describe = cur.content;
                obj.score = cur.score;
                obj.iconUrl = cur.iconUrl;
                this.searchHotList.push(obj);
            });
            console.log(this.searchHotList);
        });
        this.changBottom();
    },
    components: {
        ListView,
        scroll,
        SingerList
    },
    watch: {
        searchHistory() {
            this.changBottom();
        },
        searchText() {
            if (this.searchText === "") {
                this.singers = [];
                this.songList = [];
                this.songSheet = [];
            }
            this.getSearchResult();
            this.$refs.ResultScroll.scrollTo(0, 0, 0);
            this.$refs.scroll.scrollTo(0, 0, 0);
        }
    }
};
</script>

<style scoped lang="scss">
.search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    background: rgb(242, 243, 244);
    .ResultScroll {
        position: fixed;
        top: 7%;
        width: 100%;
        height: 93%;
        overflow: hidden;
        left: 0;
        box-sizing: border-box;
        .ResultWapper {
            .searchResult {
                .title {
                    padding: 10px;
                    box-sizing: border-box;
                    text-align: left;
                    font-weight: 600;
                    height: 7%;
                    border-bottom: 1px solid rgb(228, 228, 228);
                }
            }
        }
    }
    .content-wapper {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 7%;
        left: 0;
        box-sizing: border-box;
        .searchHot {
            position: relative;
            height: 93%;
            overflow: hidden;
            // display: none;
            .title {
                padding: 10px;
                box-sizing: border-box;
                text-align: left;
                font-weight: 700;
                height: 7%;
                border-bottom: 1px solid rgb(228, 228, 228);
            }
            .scroll {
                position: absolute;
                left: 0;
                width: 100%;
                height: 93%;
                overflow: hidden;
                .list {
                    position: absolute;
                    top: 0;
                    width: 100%;
                }
            }
        }
        .History {
            padding: 10px;
            box-sizing: border-box;
            height: 13%;
            .History-title {
                .left {
                    text-align: left;
                    font-weight: 700;
                    height: 1%;
                }
                .right {
                    float: right;
                    font-size: 17px;
                }
            }
            .History-list {
                overflow: hidden;
                .list-wapper {
                    padding: 10px;
                    white-space: nowrap;
                    position: absolute;
                    .list {
                        background: rgba(228, 228, 228, 0.6);
                        display: inline-block;
                        margin-right: 35px;
                        padding: 3px;
                        height: 30px;
                        box-sizing: border-box;
                        position: relative;
                        font-size: 16px;
                        &::before {
                            content: "";
                            position: absolute;
                            width: 20px;
                            height: 30px;
                            top: 0;
                            z-index: -1;
                            border-radius: 50%;
                            background: rgba(228, 228, 228, 0.6);
                            left: -10px;
                        }
                        &::after {
                            content: "";
                            position: absolute;
                            width: 20px;
                            height: 30px;
                            top: 0;
                            z-index: -1;
                            border-radius: 50%;
                            background: rgba(228, 228, 228, 0.6);
                            right: -10px;
                        }
                    }
                }
            }
        }
    }

    .top {
        background: rgb(212, 68, 57);
        height: 7%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 8px;
        box-sizing: border-box;
        .back,
            // .delete {
                //     flex: 1;
                // }
                .back {
            text-align: center;
            color: whitesmoke;
            font-size: 24px;
        }
        .delete {
            color: whitesmoke;
            background: transparent;
            font-size: 20px;
            padding: 5px;
        }
        input {
            line-height: 18px;
            color: rgb(255, 255, 255);
            font-size: 16px;
            border-top-width: initial;
            border-right-width: initial;
            border-left-width: initial;
            border-top-color: initial;
            border-right-color: initial;
            border-left-color: initial;
            flex: 5;
            margin: 0px 5px;
            background: rgb(212, 68, 57);
            outline: none;
            border-style: none none solid;
            border-image: initial;
            border-bottom: 1px solid rgb(228, 228, 228);
        }
        input::-webkit-input-placeholder {
            color: rgb(255, 255, 255);
            font-size: 16px;
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
