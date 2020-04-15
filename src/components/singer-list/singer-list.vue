<template>
    <div class="singer-list">
        <ul>
            <template v-for="(item,index) in data">
                <li class="list-wapper" :key="index" @click="clickOne(item)">
                    <div class="img">
                        <img v-lazy="item.picUrl+'?param=200x200'" />
                    </div>
                    <div class="title">
                        <span class="singName">{{item.name}}</span>
                    </div>
                </li>
            </template>
            <slot></slot>
        </ul>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {
        clickOne(index) {
            this.$emit("clickOne", index);
        }
    },
    props: {
        data: {
            type: Array,
            default() {
                return { picUrl: "", name: "" };
            }
        }
    }
};
</script>

<style scoped lang="scss">
.singer-list {
    padding: 10px;
    box-sizing: border-box;
    ul {
        .list-wapper {
            display: flex;
            align-items: center;
            min-height: 60px;
            border-bottom: 1px solid rgb(228, 228, 228);
            .img {
                min-height: 60px;
                flex: 1;
                height: 60px;
                display: flex;
                align-items: center;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .title {
                flex: 5;
                display: flex;
                align-items: center;
                .singName {
                    margin-left: 20px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
