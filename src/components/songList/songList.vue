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
        <Listview @clickOne="clickOne" :data="List"></Listview>
    </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Listview from "@/components/list-view/list-view";
export default {
    data() {
        return {};
    },
    created() {
        this.List = [];
    },
    props: ["songList"],
    components: {
        Listview
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters("songPlayer", ["singer", "playlist"])
    },
    watch: {
        songList() {
            // console.log(this.songList);
            let arr = [];
            this.songList.forEach(cur => {
                let obj = {};
                obj.name = cur["ar"][0]["name"];
                obj.songName = cur["name"];
                obj.al = cur.al.name;
                obj.songUrl = `https://music.163.com/song/media/outer/url?id=${cur.id}.mp3 `;
                obj.imgSrc = cur.al.picUrl;
                obj.id = cur.id;

                obj.title = obj.songName;
                obj.describe = `${obj.name} - ${obj.al}`;
                arr.push(obj);
                this.List = arr;
            });
            // console.log(arr);
        }
    },
    methods: {
        ...mapMutations("songPlayer", [
            "setPlaylist",
            "setFullScreen",
            "setCurrentIndex"
        ]),
        ...mapActions("songPlayer", ["addSong"]),
        clickOne(item) {
            if (this.playlist.length === 0) {
                this.setPlaylist(this.List.slice()); //添加播放列表
            }
            this.setFullScreen(true); //全屏播放
            this.addSong(item);
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
