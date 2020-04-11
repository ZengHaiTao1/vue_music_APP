<template>
    <scroll class="scroll" :scrollX="true">
        <div ref="cat-width">
            <div class="scroll-warper" ref="cat-warper">
                <span class="title">{{title}}&nbsp;</span>
                <span
                    class="cat-list"
                    v-for="(item,index) in catList"
                    :key="index"
                    @click="changeCatIndex(index)"
                    :class="{'selected':catIndex===index}"
                >{{item}}</span>
            </div>
        </div>
    </scroll>
</template>

<script>
import scroll from "@/components/scroll/scroll";
export default {
    name: "",
    data() {
        return {
            catIndex: -1
        };
    },
    props: {
        catList: {
            type: Array,
            default: new Array()
        },
        fn: {
            type: Function
        },
        title: {
            type: String,
            default: undefined
        }
    },
    methods: {
        _setCatWidth() {
            let children = this.$refs["cat-warper"].children;
            let width = 0;
            for (let i = 0; i < children.length; i++) {
                width += Math.ceil(children[i].offsetWidth);
            }
            this.$refs["cat-width"].style.width = width + 15 + "px"; //赋值宽度,加上15是因为offsetWidth取整导致偏差
        },
        changeCatIndex(index) {
            if (this.catIndex === index) {
                this.fn(undefined);
                this.catIndex = -1;
                return;
            }
            this.catIndex = index;
            this.fn(index);
        }
    },
    mounted() {
        this._setCatWidth();
    },
    components: {
        scroll
    }
};
</script>

<style scoped lang="scss">
.Singers {
    .scroll {
        width: 100%;
        height: 100%;
        overflow: hidden;
        div {
            width: 3500px;
        }
        .scroll-warper {
            padding: 4px 6px;
            margin-top: 4px;
            .title {
                color: grey;
                font-size: 14px;
                vertical-align: middle;
                flex: 0 0 auto;
                padding: 5px 0px;
            }
            .cat-list {
                font-size: 14px;
                padding: 5px;
                border-radius: 10px;
                font-weight: 500;
                &.selected {
                    color: rgb(212, 68, 57);
                    opacity: 0.8;
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(212, 68, 57);
                    border-image: initial;
                }
            }
        }
    }
}
</style>
