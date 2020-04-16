<template>
    <div class="Progressbar">
        <span class="currentTime">{{format(currentTime)}}</span>
        <div class="center" @click.stop.prevent="progressClick">
            <div class="bar" ref="bar" @click="progressClick"></div>
            <div class="progress" ref="progress"></div>
            <div
                class="Pellet"
                ref="Pellet"
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend="progressTouchEnd"
            ></div>
        </div>
        <span class="Totalprogress">{{format(duration)}}</span>
    </div>
</template>

<script>
import { prefixStyle } from "@/utils/dom.js";
const transform = prefixStyle("transform");
const PelletWidth = 10;
export default {
    data() {
        return {};
    },
    created() {
        this.touch = {};
    },
    methods: {
        format(interval) {
            interval = interval | 0;
            const minute = (interval / 60) | 0;
            const second = this._pad(interval % 60);
            return `${minute}:${second}`;
        },
        _pad(num, n = 2) {
            //前面补零
            let len = num.toString().length;
            while (len < n) {
                num = "0" + num;
                len++;
            }
            return num;
        },
        _offset(offsetWidth) {
            this.$refs.progress.style.width = offsetWidth + "px";
            this.$refs.Pellet.style[
                transform
            ] = `translate3d(${offsetWidth}px,0,0)`;
        },
        progressTouchStart(e) {
            this.touch.initiated = true;
            this.touch.startX = e.touches[0].pageX;
            this.touch.left = this.$refs.progress.clientWidth;
        },
        progressTouchMove(e) {
            if (!this.touch.initiated) {
                return;
            }
            const deltaX = e.touches[0].pageX - this.touch.startX;
            const offsetWidth = Math.min(
                this.$refs.bar.clientWidth - PelletWidth,
                Math.max(0, this.touch.left + deltaX)
            );
            this._offset(offsetWidth);
        },
        progressTouchEnd() {
            this.touch.initiated = false;
            this._triggerPercent(); //将事件传递给父级，触发歌曲位置改变事件
        },
        _triggerPercent() {
            //获取当前位置比例
            let Barwidth = this.$refs.bar.clientWidth - PelletWidth; //总长度
            let progressWidth = this.$refs.progress.style.width; //当前进度
            let percent = parseInt(progressWidth) / Barwidth;
            this.$emit("percentChange", percent);
        },
        progressClick(e) {
            const rect = this.$refs.bar.getBoundingClientRect();
            // console.log(rect);
            const offsetWidth = e.pageX - rect.left;
            this._offset(offsetWidth);
            this._triggerPercent();
        }
    },
    mounted() {},
    watch: {
        currentTime() {
            if (this.currentTime >= 0 && !this.touch.initiated) {
                //如果在拖动则不进行位移
                let Barwidth = this.$refs.bar.clientWidth - PelletWidth;
                let percent = this.currentTime / this.duration;
                let offsetWidth = percent * Barwidth;
                this._offset(offsetWidth);
            }
        }
    },
    props: ["currentTime", "duration"]
};
</script>

<style scoped lang="scss">
.Progressbar {
    display: flex;
    flex: 1;
    .currentTime {
        flex: 1;
        text-align: right;
        color: rgba(0, 0, 0, 0.7);
    }
    .Totalprogress {
        flex: 1;
        text-align: left;
        color: rgba(0, 0, 0, 0.7);
    }
    .center {
        margin: 0 5px;
        flex: 4;
        display: flex;
        align-items: center;
        padding: 0 5px;
        box-sizing: border-box;
        position: relative;
        .bar {
            height: 5px;
            flex: 1;
            background: rgba(0, 0, 0, 0.3);
        }
        .Pellet {
            //小圆球
            width: 10px;
            height: 10px;
            background: rgb(212, 68, 57);
            border-width: 3px;
            border-style: solid;
            border-color: rgb(228, 228, 228);
            border-radius: 50%;
            position: absolute;
            left: 0;
        }
        .progress {
            position: absolute;
            left: 0;
            height: 5px;
            background: rgba(212, 68, 57);
        }
    }
}
</style>
