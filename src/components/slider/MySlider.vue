<template>
    <div class="slider" ref="slider">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        scrollY: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array
        }
    },
    data() {
        return {};
    },
    mounted() {
        this._initSlider();
    },
    created() {
        this.slider = "";
        this.pageIndex = "";
        this.move = false;
    },
    methods: {
        _initSlider() {
            let self = this;
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: self.scrollX,
                scrollY: self.scrollY,
                momentum: false,
                snap: {
                    loop: self.loop, // 循环
                    threshold: 0.3,
                    speed: 400 // 轮播间隔
                },
                click: true
            });
            this.slider.on("beforeScrollStart", () => {
                console.log("beforeScrollStart----------------");
                this.move = true;
                this.pageIndex = this.slider.getCurrentPage().pageX;
            });
            this.slider.on("scrollEnd", () => {
                console.log("scrollEnd----------------");
                if (!this.move) {
                    return;
                }
                let pageIndex = this.slider.getCurrentPage().pageX;
                console.log(pageIndex + "pageIndex-------------------");
                if (pageIndex > this.pageIndex) {
                    console.log(
                        this.pageIndex + "this.pageIndex-------------------"
                    );
                    this.$emit("next", pageIndex);
                } else if (pageIndex < this.pageIndex) {
                    this.$emit("prev", pageIndex);
                }
                this.move = false;
            });
        },
        disable() {
            this.slider && this.slider.disable();
        },
        enable() {
            this.slider && this.slider.enable();
        },
        refresh() {
            this.slider && this.slider.refresh();
        },
        goToPage(x, y, time) {
            this.slider && this.slider.goToPage(x, y, time);
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh();
            }, 20);
        }
    }
};
</script>

<style scoped>
</style>
