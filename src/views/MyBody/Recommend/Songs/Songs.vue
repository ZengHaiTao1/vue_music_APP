<template>
    <div class="Songs">
        <h1>推荐歌单</h1>
        <div class="song-list clearfix">
            <!-- <a class="list-item">
                <div class="img">
                    <img
                        class="u-img"
                        src="http://p1.music.126.net/1E3TwxUDRuFE1VXAhMN2aA==/109951164814374270.jpg?imageView=1&amp;type=webp&amp;thumbnail=247x0"
                    />
                    <span class="iconfont icon-erji">&nbsp;&nbsp;4038.7万</span>
                </div>
                <p class="remd-text">空灵女声｜夜莺为谁而歌</p>
            </a>-->

            <template v-for="(item,index) in songList">
                <a class="list-item" :key="index">
                    <div class="img">
                        <img class="u-img" v-lazy="item.picUrl" />
                        <span class="iconfont icon-erji">&nbsp;&nbsp;{{item.playCount|play}}万</span>
                    </div>
                    <div class="remd-text">{{item.name}}</div>
                </a>
            </template>
        </div>
    </div>
</template>

<script>
import { getSongs } from "@/http/recommend-http.js";
export default {
    name: "",
    data() {
        return {
            songList: []
        };
    },
    methods: {},
    mounted() {
        getSongs().then(res => {
            this.songList = res.data.result;
        });
    },
    filters: {
        play(value) {
            return parseInt(value / 10000);
        }
    },
    watch: {
        songList() {
            this.$emit("loadData", "");
        }
    }
};
</script>

<style scoped lang="scss">
.Songs {
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
</style>
