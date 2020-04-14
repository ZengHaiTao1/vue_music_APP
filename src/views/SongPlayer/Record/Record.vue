<template>
    <div class="Record">
        <div class="cd" v-if="currenSong" ref="cdWrapper">
            <img
                class="image animation"
                :class="!playing?'pause':''"
                ref="imgRot"
                :src="currenSong.imgSrc+'?param=300x300'"
                alt
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {}
};
</script>

<style scoped lang="scss">
.Record {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .cd {
        top: 16%;
        position: absolute;
        width: 70%;
        height: 70vw;
        background-size: contain;
        border-width: 4px;
        background-image: url($baseUrl+"img/cd.png");
        border-style: solid;
        border-color: rgba(228, 228, 228, 0.1);
        border-image: initial;
        border-radius: 50%;
        background-position: 50% center;
        background-repeat: no-repeat;
        .image {
            position: absolute;
            left: 0px;
            right: 0px;
            top: 0px;
            bottom: 0px;
            width: 68%;
            height: 68%;
            margin: auto;
            border-radius: 50%;
            &.pause {
                animation-play-state: paused !important;
            }
            @keyframes rot {
                100% {
                    transform: rotate(360deg);
                }
            }
            &.animation {
                animation: rot 20s linear 0s infinite normal none running;
            }
        }
    }
}
</style>
