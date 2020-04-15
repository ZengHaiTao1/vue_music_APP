import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
    computed: {
        ...mapGetters("songPlayer", [
            "fullScreen",
            "playing",
            "currenSong",
            "playlist",
            "currentIndex",
            "mode"
        ])
    },
    methods: {
        ...mapMutations("songPlayer", [
            "setFullScreen",
            "setPlaying",
            "setCurrentIndex",
            "setMode"
        ]),
        changeIcon() {
            switch (this.mode) {
                case "order": {
                    this.setMode("loop");
                    break;
                }
                case "loop": {
                    this.setMode("random");
                    break;
                }
                case "random": {
                    this.setMode("order");
                    break;
                }
            }
            console.log(this.mode);
            console.log(this.iconClass);
        },
    },
    watch: {
        mode() {
            switch (this.mode) {
                case "order": {
                    this.iconClass = "icon-sort";
                    break;
                }
                case "loop": {
                    this.iconClass = "icon-danquxunhuan";
                    break;
                }
                case "random": {
                    this.iconClass = "icon-bofangye-caozuolan-suijibofang";
                    break;
                }
            }
        }
    }
}