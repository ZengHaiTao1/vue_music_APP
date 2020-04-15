<template>
    <div class="Recommend" ref="Recommend">
        <scroll class="recommend-content" ref="scroll">
            <div>
                <div class="slider-wrapper" v-if="slider.length">
                    <slider :loop="true">
                        <div v-for="(item,index) in slider" :key="index">
                            <a>
                                <img :src="item.pic" @load="loadimg" width="100%" />
                            </a>
                        </div>
                    </slider>
                </div>
                <Songs @loadData="getData"></Songs>
            </div>
        </scroll>
        <transition name="slide">
            <keep-alive>
                <router-view :key="$route.path"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
import Slider from "@/components/slider/Slider";
import Scroll from "@/components/scroll/scroll";
import Songs from "@/views/MyBody/Recommend/Songs/Songs";
import { getBanner } from "@/http/recommend-http.js";
import bottomMixin from "@/mixin/bottomPlay";
export default {
    mixins: [bottomMixin],
    data() {
        return {
            slider: [],
            once: true
        };
    },
    methods: {
        loadimg() {
            if (this.once) {
                this.once = false;
                this.$refs.scroll.refresh();
            }
        },
        getData() {
            this.$refs.scroll.refresh();
        },
        changScroll() {
            if (this.fullScreen !== "" && this.currenSong) {
                this.$refs.Recommend.style.bottom = "70px";
                this.$refs.scroll.refresh();
            } else {
                this.$refs.Recommend.style.bottom = "";
                this.$refs.scroll.refresh();
            }
        },
        activated() {
            this.$refs.scroll.refresh();
        }
    },
    components: {
        Slider,
        Scroll,
        Songs
    },
    mounted() {
        getBanner().then(res => {
            this.slider = res.data.banners;
        });
        this.changScroll();
    }
};
</script>
<style lang = "scss" scoped>
.Recommend {
    position: fixed;
    width: 100%;
    top: 91px;
    bottom: 0;
    .recommend-content {
        position: relative;
        height: 100%;
        overflow: hidden;
    }
}
.slider-wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>