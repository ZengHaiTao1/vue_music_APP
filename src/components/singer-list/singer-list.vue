<template>
    <div class="singer-list">
        <ul>
            <template v-for="item in data">
                <li class="list-wapper" :key="item.id">
                    <div class="img">
                        <img :src="item.picUrl+'?param=200x200'" />
                    </div>
                    <div class="title">
                        <span class="singName">{{item.name}}</span>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {},
    props: ["data"]
};
</script>

<style scoped lang="scss">
.singer-list {
    padding: 10px;
    ul {
        .list-wapper {
            display: flex;
            min-height: 40px;
            border-bottom: 1px solid rgb(228, 228, 228);
            .img {
                flex: 1;
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
