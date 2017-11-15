<template>
    <div class="wrapper">
        <commonScroll v-if="listArr.length" :data="listArr">
            <ul class="content">
                <li v-for="item in listArr">{{item}}</li>
                
            </ul>
        </commonScroll>
    </div>
</template>

<script>
    // import BScroll from "better-scroll"
    import commonScroll from './../base/commonScroll.vue'

    export default {
        data() {
            return {
                listArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
            }
        },
        components: {
            commonScroll//组件的复用性
        },
        mounted() {
            // this.$nextTick(() => {
            //     this.scroll = new BScroll(this.$refs.wrapper, {
            //         click: true,
            //         momentum: true
            //     })
            // })
        }
    }
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";
    //better-scroll的目标容器wrapper必须是固定高度才能滚动,所以给.wrapper加了定位 
    .wrapper {
        position: absolute;
        width: $percent;
        height: $percent;
        div {
            width: $percent;
            height: $percent;
            .content {
                background-color: $conBgColor;
                li {
                    width: $percent;
                    height: 40px;
                    line-height: 40px;
                    // background-color: #ccc;
                    color: #fff;
                    padding: 0 0 0 10px;
                    border-bottom: 1px solid #000;
                    box-sizing: border-box;
                }
            }
        }

    }
</style>

