import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters("songPlayer", [
            "fullScreen", "currenSong", "isEmpty"
        ])
    },
    watch: {
        fullScreen: {
            handler: 'changScroll',  //数据改变时对应的执行的方法名
            // immediate: true,  //是否先执行一次，
        },
        isEmpty: {
            handler: "changScroll"
        }
    },
    methods: {
        changScroll() {
            throw new Error("No defind changScroll Method !!!")
        }
    }

}