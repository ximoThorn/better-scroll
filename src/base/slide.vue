<template>
    <div class="slide" ref="slide">
        <div class="slide_group" ref="slideGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{dotActive: currentPageIndex === index}" v-for="(item, index) in dots"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from "./../common/js/dom"

export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        showDots: {
            type: Boolean,
            default: true
        },
        swiperTime: {
            type: Number,
            default: 4000
        },
        autoPlay: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0,
        }
    },
    
    mounted() {
        this.init();
    },
    activated() {//for keep-alive 组件被激活后调用, 滚动重新启动
        // console.log(this.slide.getCurrentPage());
        if (!this.slide) {
            return;
        };
        
        this.slide.enable();//启用 better-scroll, 默认 开启。

        let pageIndex = this.slide.getCurrentPage().pageX;

        if (pageIndex > this.dots.length) {
            pageIndex = pageIndex % this.dots.length;
        };

        this.slide.goToPage(pageIndex, 0, 0);

        if (this.loop) {
            pageIndex -= 1;
        };

        this.currentPageIndex = pageIndex;
        this._play();

    },
    deactivated() {//for keep-alive 组件被移除后调用
      this.slide.disable();//禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
      clearTimeout(this.timer);
    },
    destroyed() {//组件销毁后调用
      this.slide.disable();//禁用 better-scroll
      clearTimeout(this.timer);
    },
    methods: {
        init() {
            this._initslide();
            setTimeout(() => {
                
                this._initBscroll();

                this._play();
            }, 100);
            
            if (this.showDots) {
                this.initdot();
            };

            window.addEventListener("resize", () => {//监听屏幕大小变化时，进行适应

                if (!this.slide || !this.slide.enabled) {
                    return
                };
                
                clearTimeout(this.resizeTimer);

                this.resizeTimer = setTimeout(() => {
                    if (this.slide.isInTransition) {
                        this.onScrollEnd();
                    } else {
                        this._play();
                    }

                    this.refresh();
                }, 60);

            })
 
        },
        refresh() {
            this._initslide(true);
            this.slide.refresh();//重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        },
        _initslide(isResize) {//初始化轮播dom
            this.child = this.$refs.slideGroup.children;

            let width = 0;
            let slideWidth = this.$refs.slide.clientWidth;
            for (let i = 0; i < this.child.length; i++) {
                let item = this.child[i];
                addClass(item, "slide_item");
                item.style.width = slideWidth + "px";
                width+=slideWidth;
                 
            };

            if (this.loop && !isResize) {
                width+=2*slideWidth;
            }
            this.$refs.slideGroup.style.width = width + "px";

        },
        _initBscroll() {//初始化better-scroll
            let _this = this;
            this.slide = new BScroll(this.$refs.slide, {
                scrollX: true,
                momentum: false,
                snap: {
                    loop: _this.loop,
                    threshold: 0.3,
                    speed: 400,
                },
                click: true
            });
            
            this.slide.on("scrollEnd",() => {//手动滚动触发
                this.onScrollEnd();
            });

            this.slide.on('beforeScrollStart', () => {//滚动开始之前
                if (this.autoPlay) {
                    clearTimeout(this.timer)
                }
            })
        },
        onScrollEnd() {//滚动后触发dot更新
            let pageIndex = this.slide.getCurrentPage().pageX;
            // this.slide.getCurrentPage().pageX 如果开启loop，则获取到的是首尾追加dom后的index值    

            if (this.loop) {
                pageIndex-=1;
            }

            this.currentPageIndex = pageIndex;

            this._play();
        },
        initdot() {//dot初始化
            this.dots = new Array(this.$refs.slideGroup.children.length);
        },
        _play() {//自动滚动
           if (this.autoPlay) {
                let pageIndex = this.slide.getCurrentPage().pageX+1;

                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.slide.goToPage(pageIndex, 0, 400);
                }, this.swiperTime);
           }
        }
    }
}
</script>

<style lang="scss">
    @import "./../common/sass/var.scss";

    .slide {
        position: relative;
        .slide_group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slide_item {
                display: block;
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                    img {
                        display: block;
                        width: 100%;
                    }
                }
                
                
            }
        }
        .dots {
            position: absolute;
            bottom: 5px;
            width: $percent;
            text-align: center;
            span {
                display: inline-block;
                width: 6px;
                height: 6px;
                margin: 0 2px;
                background-color: $dotColor;
                border-radius: $percent/2;
                -webkit-border-radius: $percent/2;
            }
            .dotActive {
                 background-color: $currentDot;
            }
        }
    }
    
</style>
