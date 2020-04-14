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
    }
}