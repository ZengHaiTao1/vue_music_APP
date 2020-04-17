<template>
    <transition name="fade">
        <div class="popup" @click="close">
            <div class="content">
                <div class="title">{{title}}</div>
                <div class="btn">
                    <span @click="btnCancelFn">取消</span>
                    <span @click="btnOkFn">确定</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            title: "" || "确认进行该操作？",
            btnCancelFn: () => {},
            btnOkFn: () => {}
        };
    },
    methods: {
        close() {
            this.$el.remove();
        }
    }
};
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    z-index: 20000;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        padding: 10px;
        box-sizing: border-box;
        width: 80%;
        height: 15%;
        border-radius: 8%;
        background: white;
        z-index: 21000;
        .title {
            height: 50%;
            color: rgba(0, 0, 0, 0.5);
        }
        .btn {
            text-align: right;
            height: 50%;

            box-sizing: border-box;
            span {
                padding: 0 10px;
                color: #d44439;
            }
        }
    }
}
</style>