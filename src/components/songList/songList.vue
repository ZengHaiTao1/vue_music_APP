<template>
    <div class="songList">
        <div class="top" style="pointer-events: auto;">
            <div class="play_all">
                <span class="iconfont icon-bofang"></span>
                <span>
                    播放全部
                    <span class="sum">(共{{songList.length}}首)</span>
                </span>
            </div>
        </div>
        <ul>
            <!-- <li class="list-wapper">
                <div class="index">
                    <span>1</span>
                </div>
                <div class="info">
                    <div>多想在平庸的生活拥抱你</div>
                    <div class="name">隔壁老樊 - 我曾</div>
                </div>
            </li>-->
            <template v-for="(item,index) in List">
                <li class="list-wapper" :key="index" @click="play(index)">
                    <div class="index">
                        <span>{{index+1}}</span>
                    </div>
                    <div class="info">
                        <div>{{item.songName}}</div>
                        <div class="name">{{item["name"]}} - {{item.al}}</div>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    created() {
        this.List = [];
    },
    props: ["songList"],
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters("songPlayer", ["singer"])
    },
    watch: {
        songList() {
            console.log(this.songList);
            let arr = [];
            this.songList.forEach(cur => {
                let obj = {};
                obj.name = cur["ar"][0]["name"];
                obj.songName = cur["name"];
                obj.al = cur.al.name;
                obj.songUrl = `https://music.163.com/song/media/outer/url?id=${cur.id}.mp3 `;
                obj.imgSrc = cur.al.picUrl;
                arr.push(obj);
                this.List = arr;
            });
            console.log(arr);
        }
    },
    methods: {
        ...mapMutations("songPlayer", [
            "setPlaylist",
            "setFullScreen",
            "setCurrentIndex"
        ]),
        play(index) {
            this.setPlaylist(this.List); //添加播放列表
            this.setFullScreen(true); //全屏播放
            this.setCurrentIndex(index);
            this.$emit("play", this.List);
            // let singer = this.singer;
            // singer.songName =
        }
    },
    mounted() {}
};
</script>

<style scoped lang="scss">
.songList {
    background: white;
    height: auto;
    border-radius: 10px;
    box-sizing: border-box;
    .list-wapper {
        display: flex;
        .info {
            width: 70%;
            padding: 10px 5px;
            border-bottom: 1px solid rgb(228, 228, 228);
            flex: 5;
            div {
                margin-left: 10px;
            }
            .name {
                margin-top: 8px;
                font-size: 14px;
                color: rgb(143, 139, 139);
            }
        }
        .index {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
        }
    }
    .top {
        box-sizing: border-box;
        margin-left: 10px;
        position: relative;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 10px 0px;
        border-bottom: 1px solid rgb(228, 228, 228);
        .play_all {
            display: inline-block;
            line-height: 24px;
            color: rgb(46, 48, 48);
            .iconfont {
                font-size: 24px;
            }
            span {
                vertical-align: top;
                .sum {
                    font-size: 12px;
                    color: rgb(187, 168, 168);
                }
            }
        }
    }
}
</style>
