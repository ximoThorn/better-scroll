<template>
    <div class="slide_wrap">
        <div class="slider_content" v-if="bannerList.length">
            <slide>
                <div class="img_wrap" v-for="item in bannerList">
                    <a :href="item.linkUrl">
                        <img :src="item.picUrl" alt="">
                    </a>
                </div>
            </slide>
        </div>
    </div>
</template>

<script>
import slide from "./../base/slide"
import {swiperAjax} from "./../api/ajax"
import {ERR_OK} from "./../common/js/config"

export default {
    data() {
        return {
            bannerList:[]
        }    
    },
    components: {
        slide
    },
    created() {
        this.initAjax();
    },
    methods: {
        initAjax() {
            var _this = this;
            swiperAjax().then(function(re){
                if (re.code == ERR_OK) {
                    
                    _this.bannerList = re.data.slider;
                }
            });
        }
    }
}
</script>

<style lang="scss" >
    @import "./../common/sass/var.scss";
    .slide_wrap {
        position: relative;
    }
    .img_wrap {
        float: left;
        display: none;
        img {
             display: block;
             width: $percent;
        }
    }

</style>
