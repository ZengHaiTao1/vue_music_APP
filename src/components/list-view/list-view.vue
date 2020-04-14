<template>
    <div class="list-view">
        <ul>
            <template v-for="(item,index) in data">
                <li class="list-wapper" :key="index" @click="clickOne(item)">
                    <div class="index">
                        <span>{{index+1}}</span>
                    </div>
                    <div class="info">
                        <div>
                            {{item.title}}
                            <img
                                v-if="item.iconUrl"
                                class="imgicon"
                                :src="item.iconUrl"
                            />
                        </div>
                        <div class="name">{{item.describe}}</div>
                    </div>
                    <div class="right" v-if="item.score">
                        <span>{{item.score}}</span>
                    </div>
                </li>
            </template>
        </ul>
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
    props: {
        data: {
            type: Array,
            default() {
                return [
                    {
                        title: "",
                        iconUrl: "",
                        describe: "",
                        score: ""
                    }
                ];
            }
        }
    },
    mounted() {
        console.log(this.data);
    }
};
</script>

<style scoped lang="scss">
.list-view {
    .list-wapper {
        display: flex;
        border-bottom: 1px solid rgb(228, 228, 228);
        .info {
            padding: 10px 5px;
            flex: 7;
            div {
                // vertical-align: top;
                .imgicon {
                    width: auto;
                    height: 16px;
                }
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
        .right {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            color: rgba(143, 139, 139, 0.8);
            font-size: 14px;
            padding: 5px;
        }
    }
}
</style>
