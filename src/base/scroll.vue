<template>
    <div class="wrapper" ref="wrapper">
        <div class="scroll_content" ref="scrollContent">
            <slot :pulling="pulling" :beforePullDown="beforePullDown">
             
            </slot>
            <div class="pullup-wrapper" v-if="pullUpLoad" v-show="pullUpShow">
                <div class="before-trigger" v-if="!isPullUpLoad">
                    <span>pullUp-loadMore</span>
                </div>
                <div class="after-trigger" v-else>
                    <loading></loading>
                </div>
            </div>
            
        </div>
        <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle">
            <div class="before-trigger" v-if="beforePullDown">
                <bubble :y="bubbleY"></bubble>
            </div>
            <div class="after-trigger">
                <div v-show="pulling" class="loading" >
                    <loading></loading>
                </div>
                <div><span></span></div>
            </div>
        </div>    
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import bubble from "./../base/bubble.vue"
  import loading from "./../base/loading.vue"

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      loadDatas: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },
    },
    data() {
        return {
            bubbleY: 0,
            pulling: false,
            beforePullDown: true,
            pullDownStyle: "",
            isRebounding: false,
            isPullUpLoad: false,
            pullUpShow: true,
        }
    },
    components: {
        bubble,
        loading
    },
    created() {
        this.pullDownInitTop = -50;
        setTimeout(() => {
            this.initScroll();
            this.judgeHeight();
        }, 20);
    },
    methods: {
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        initScroll() {
            this.scroll = new BScroll(this.$refs.wrapper, {//better-scroll初始化
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX,
                pullDownRefresh: this.pulldown,//开启下拉刷新
                pullUpLoad: this.pullUpLoad,//开启上拉加载
            });

            if (this.pulldown) {
                this._pullDownRefresh();
            };

            if (this.pullUpLoad) {
                this._pullUpLoad();
            }
        },
        _pullDownRefresh() {//开启下拉刷新后监听下拉动作
            this.scroll.on("pullingDown", () => {
                
                this.beforePullDown = false;
                this.pulling = true;
                this.$emit("pullingDown");//下拉刷新后执行父组件的pullingDown方法
            });

            this.scroll.on('scroll', (pos) => {//下拉滚动时的样式变化
                if (this.beforePullDown) {
                    this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
                    this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
                } else {
                    this.bubbleY = 0
                }
                if (this.isRebounding) {
                    this.pullDownStyle = `top:${this.pullDownInitTop}px`
                }
            });
 
        },
        _pullUpLoad() {//开启上拉加载后监听上拉动作
            
            this.scroll.on("pullingUp", () => {
                this.isPullUpLoad = true;
                this.$emit("pullingUp");//上拉加载后执行父组件的pullingUp方法
            });
        },
        _afterPullDown() {//数据加载后重置样式
            setTimeout(() => {
                this.pullDownStyle = `top:${this.pullDownInitTop}px`;
                this.beforePullDown = true;
                this.pulling = false;
                this.isRebounding = false;
                this.refresh();//better-scroll刷新
            }, this.scroll.options.bounceTime)
        },
        forceUpdate() {//数据加载后
            this.isPullUpLoad = false;
            this.isRebounding = true;
            
            this.scroll.finishPullDown();//下拉刷新， 数据更新完毕，需要调用此方法告诉 better-scroll 数据已加载。
            this.scroll.finishPullUp();//上拉加载， 数据更新完毕， 需要调用此方法告诉 better-scroll 数据已加载。
            this._afterPullDown();

        },
        judgeHeight() {//计算高度，当数据不够撑高一屏时， 上拉加载隐藏
            let scrollChildrenHeight = this.$refs.scrollContent.clientHeight,
                wrapperHenght = this.$refs.wrapper.clientHeight;

            if (scrollChildrenHeight >= wrapperHenght) {
                this.pullUpShow = true;
            } else {
                this.pullUpShow = false;
            }
        },

    },
    watch: {
      loadDatas() {//监听数据的变化, 
        setTimeout(() => {
          this.forceUpdate();
        }, 20)
      }
    },
  }
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";

    .wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .pulldown-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        top: -50px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all;
        .after-trigger {
            //  margin-top: 10px;
        } 
    }
    .pullup-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px 0;
    }
    
</style>
