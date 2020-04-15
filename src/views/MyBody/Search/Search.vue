<template>
    <transition name="slide" mode="out-in">
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
                        <span class="right iconfont icon-shanchu1" @click="clearAllHistory"></span>
                    </div>

                    <div class="History-list">
                        <scroll
                            :data="searchHistory"
                            :scrollX="true"
                            :scrollY="false"
                            ref="History-scroll"
                        >
                            <ul class="list-wapper">
                                <li
                                    class="list"
                                    v-for="item in searchHistory"
                                    @click.stop.prevent="changeSearchText(item)"
                                    :key="item"
                                >{{item}}</li>
                            </ul>
                        </scroll>
                    </div>
                </div>
                <div class="searchHot">
                    <h1 class="title">热搜榜</h1>
                    <scroll class="scroll" ref="scroll">
                        <ListView
                            @clickOne="clickSearchHot"
                            class="list"
                            v-show="searchHotList.length>0"
                            :data="searchHotList"
                        ></ListView>
                    </scroll>
                    <div class="load-wapper" v-show="!searchHotList.length">
                        <loading></loading>
                    </div>
                </div>
            </div>

            <scroll
                :data="dataChange"
                class="ResultScroll"
                v-show="searchText!==''&&singers.length>0"
                ref="ResultScroll"
            >
                <div class="ResultWapper">
                    <div class="searchResult" v-show="singers.length>0">
                        <h1 class="title">相关歌手</h1>
                        <SingerList @clickOne="clickSinger" :data="singers"></SingerList>
                    </div>
                    <div class="searchResult" v-show="songSheet.length>0">
                        <h1 class="title">相关歌单</h1>
                        <SingerList @clickOne="clickSongSheet" :data="songSheet"></SingerList>
                    </div>
                    <div class="searchResult" v-show="songList.length >0">
                        <h1 class="title">相关歌曲</h1>
                        <ListView :data="songList" @clickOne="clickSong"></ListView>
                    </div>
                </div>
            </scroll>
            <div class="loadWapper" v-show="!singers.length&&searchText!==''">
                <loading></loading>
            </div>
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
import bottomMixins from "@/mixin/bottomPlay";
import loading from "@/components/loading/MyLoading";
export default {
    mixins: [bottomMixins],
    data() {
        return {
            searchText: "", //搜索框
            searchHotList: [], //热门搜索
            singers: [], //歌手列表
            songSheet: [], //歌单列表
            songList: [], //歌曲列表
            HistoryText: "" //对搜索进行缓存
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
        ...mapActions("songPlayer", ["addSong"]),
        clearsearchText() {
            this.searchText = "";
            this.focus();
        },
        clearAllHistory() {
            this.$popup({
                title: "确定要删除所有历史记录?",
                btnOkFn: () => {
                    console.log("确定");
                    this.clear();
                }
            });
        },
        focus() {
            this.$refs.inputs.focus();
        },
        back() {
            this.$router.back();
            if (this.searchText !== "") {
                this.addHistory(this.searchText);
                this.searchText = "";
            }
        },
        clickSearchHot(item) {
            let title = item.title;
            this.changeSearchText(title);
        },
        changeSearchText(value) {
            this.addHistory(value);
            this.searchText = value;
        },
        changBottom() {
            if (this.searchHistory.length > 0) {
                if (this.fullScreen !== "" && this.currenSong) {
                    this.$refs.scroll.$el.style.height = "calc(80% - 80px)";
                    this.$refs.scroll.refresh();
                    return;
                }
                this.$refs.scroll.$el.style.height = "80%";
                this.$refs.scroll.refresh();
            } else {
                if (this.fullScreen !== "" && this.currenSong) {
                    this.$refs.scroll.$el.style.height = "calc(93% - 60px)";
                    this.$refs.scroll.refresh();
                    return;
                }
                this.$refs.scroll.$el.style.height = "93%";
                this.$refs.scroll.refresh();
            }
        },
        clickSong(song) {
            let obj = {};
            obj.songUrl = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3 `;
            obj.name = song.describe.split("-")[0];
            obj.songName = song.title;
            obj.imgSrc = song.imgSrc;
            obj.id = song.id;
            this.addSong(obj);
        },
        clickSinger(singer) {
            this.$router.push({
                path: `/singers/${singer.id}`
            });
        },
        clickSongSheet(SongSheet) {
            this.$router.push({
                path: `/recommend/${SongSheet.id}`
            });
        },
        changScroll() {
            this.changBottom();
            if (this.fullScreen !== "" && this.currenSong) {
                this.$refs.ResultScroll.$el.style.height = "calc(93% - 70px)";
                this.$refs.ResultScroll.refresh();
            } else {
                this.$refs.ResultScroll.$el.style.height = "93%";
                this.$refs.ResultScroll.refresh();
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
                            obj.imgSrc = cur.img1v1Url;
                        });
                        obj.id = cur.id;
                        obj.describe = `${describe}-${cur.album.name}`;
                        this.songList.push(obj);
                    });
                }

                console.log(this.songList);
                console.log(this.songSheet);
                console.log(res);
                this.singers = res.singers || [];
                this.songList = this.songList || [];
                this.songSheet = this.songSheet || [];
            });
        }
    },
    mounted() {
        this.focus();
        getSearchHot().then(res => {
            // console.log(res);
            res.data.data.forEach(cur => {
                let obj = {};
                obj.title = cur.searchWord;
                obj.describe = cur.content;
                obj.score = cur.score;
                obj.iconUrl = cur.iconUrl;
                this.searchHotList.push(obj);
            });
            // console.log(this.searchHotList);
        });
        this.changScroll();
    },
    activated() {
        this.$refs.ResultScroll.refresh();
        this.$refs.scroll.refresh();
    },
    components: {
        ListView,
        scroll,
        SingerList,
        loading
    },
    watch: {
        searchHistory() {
            this.changBottom();
        },
        searchText(newText, oldText) {
            // console.log(this.$refs["History-scroll"].scroll);
            if (this.searchText === "") {
                this.singers = [];
                this.songList = [];
                this.songSheet = [];
                this.$nextTick(() => {
                    this.$refs["History-scroll"].refresh();
                    this.$refs["scroll"].refresh();
                });
                this.changBottom();
            }
            if (newText.indexOf(oldText) !== -1) {
                //输入增加时
                this.HistoryText = newText;
                console.log(this.HistoryText);
            } else if (oldText.indexOf(newText) === -1) {
                console.log(this.HistoryText);
                //输入删除时
                if (this.HistoryText !== "") {
                    this.addHistory(this.HistoryText);
                    this.HistoryText = "";
                }
            } else if (newText === "") {
                this.addHistory(this.HistoryText);
                this.HistoryText = "";
            }
            console.log({
                newText,
                oldText
            });
            console.log(oldText.indexOf(newText) === -1);
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
    .loadWapper {
        position: fixed;
        top: 7%;
        width: 100%;
        height: 93%;
        overflow: hidden;
        left: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ResultScroll {
        position: fixed;
        top: 7%;
        width: 100%;
        height: 93%;
        // height: calc(93% - 70px);
        overflow: hidden;
        left: 0;
        box-sizing: border-box;
        // bottom: 70px;
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
            .load-wapper {
                position: absolute;
                left: 0;
                width: 100%;
                height: 93%;
                top: 0;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
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
