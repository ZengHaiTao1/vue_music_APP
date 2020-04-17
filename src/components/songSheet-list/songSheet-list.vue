<template>
    <div class="songSheet-list clearfix">
        <template v-for="(item,index) in data">
            <a class="list-item" :key="index" @click="clickOne(item)">
                <div class="img">
                    <img class="u-img" v-lazy="item.coverImgUrl" />
                    <span class="iconfont icon-erji">&nbsp;&nbsp;{{item.rightText}}</span>
                </div>
                <span class="remd-text">{{item.bottomText}}</span>
            </a>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        clickOne(item) {
            this.$emit("clickOne", item);
        }
    },
    props: ["data"]
};
</script>

<style scoped lang="scss">
.songSheet-list {
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
</style>
