<template>
    <div class="Recommend">
        <scroll class="recommend-content" ref="scroll">
            <div>
                <div class="slider-wrapper" v-if="slider.length">
                    <slider :loop="true">
                        <div v-for="(item,index) in slider" :key="index">
                            <a>
                                <img :src="item.pic" @load="loadimg" />
                            </a>
                        </div>
                    </slider>
                </div>
                <Songs @loadData="getData"></Songs>
            </div>
        </scroll>
    </div>
</template>
<script>
import Slider from "@/components/slider/Slider";
import Scroll from "@/components/scroll/scroll";
import Songs from "@/views/MyBody/Recommend/Songs/Songs";
import { getBanner } from "@/http/recommend-http.js";
export default {
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
        height: 100%;
        overflow: hidden;
    }
}
.slider-wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>