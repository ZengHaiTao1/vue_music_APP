<template>
    <div class="Songs">
        <h1>推荐歌单</h1>
        <SongSheetList v-show="songList.length>0" @clickOne="clickOne" :data="songList"></SongSheetList>
        <div v-show="!songList.length">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import { getSongs } from "@/http/recommend-http.js";
import SongSheetList from "@/components/songSheet-list/songSheet-list";
import loading from "@/components/loading/MyLoading";
export default {
    name: "",
    data() {
        return {
            songList: []
        };
    },
    methods: {
        clickOne(item) {
            this.$router.push({
                path: `/recommend/${item.id}`
            });
        }
    },
    mounted() {
        getSongs().then(res => {
            res.data.result.forEach(cur => {
                cur.bottomText = cur.name;
                cur.rightText = cur.updateFrequency;
                cur.coverImgUrl = cur.picUrl;
            });
            this.songList = res.data.result;
            console.log(this.songList);
        });
    },
    filters: {
        play(value) {
            return parseInt(value / 10000);
        }
    },
    watch: {
        songList() {
            this.$emit("loadData");
        }
    },
    components: {
        SongSheetList,
        loading
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
}
</style>
