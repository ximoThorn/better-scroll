<template>
    <transition name="picker-fade">
        <div class="picker" @click="hide">
            <div @click.stop class="picker_panel">
                <div class="picker_choose">
                    <span class="cancel" @click="_cancel">{{cancelTxt}}</span>
                    <span class="title">{{titleTxt}}</span>
                    <span class="confirm" @click="_confirm">{{confirmTxt}}</span>
                </div>
                <div class="picker_content">
                    <div class="mask_top"></div>
                    <div class="mask_bottom"></div>
                    <div class="wheel_wrapper" ref="wheel_wrapper">
                        <div class="wheel"  v-for="items in wheelData">
                            <ul>
                                <li class="wheelTxt" v-for="item in items">{{item.text}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props: {
        // showState: {
        //     type: Boolean,
        //     default: false,
        // },
        wheelData: {
            type: Array,
            default: [],
        },
        selectedIndex: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            cancelTxt: "cancel",
            confirmTxt: "confirm",
            titleTxt: "This is picker",
        }
    },
    created() {
        
        this.$nextTick(() => {
            this.wheels = [];
            this._initWheel();
        });  
    },
    methods: {
        _cancel() {//点击取消
            this.hide();
        },
        _confirm() {//点击确认
            let length = this.$refs.wheel_wrapper.children.length;

            this.$emit("selectedData", length);

            this.hide();
        },
        hide() {//picker隐藏

            let childs = this.$refs.wheel_wrapper.children;

            for (let i = 0; i < childs.length; i++) {
                this.wheels[i].disable();//隐藏时禁用better-scroll
            };

            this.$emit("hideWheel", false); 
        },
        _initWheel() {//各个wheel BScroll初始化
            let childs = this.$refs.wheel_wrapper.children;

            for (let i = 0; i < childs.length; i++) {
                this.wheels[i] = this._createWheel(childs[i], i);

            };
        },
        _createWheel(el, i) {//BScroll初始化
            if (!this.wheels[i]) {

                this.wheels[i] = new BScroll(el, {
                    wheel: {
                          selectedIndex: this.selectedIndex[i],//默认selected第几个
                    },
                    probeType: 3
                });

                this.wheels[i].on('scrollEnd', () => {//实时监听滚动后所选的项，传给父组件
                    this.$emit("change", i, this.wheels[i].getSelectedIndex());
                });

            } else {

                this.wheels[i].refresh();
            };

            return this.wheels[i];
            
        },
    }
}
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";
    
    .picker-fade-enter, .picker-fade-leave-to {
        opacity: 0;
        .picker_panel {
            transform: translateY(273px);
        }
    }
    .picker-fade-enter-active, .picker-fade-leave-active {
        transition: all .3s ease-in-out;
        .picker_panel {
            transition: all .3s ease-in-out;
        }
    }  
    .picker {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        background-color: rgba(37, 38, 45, .4);
        .picker_panel {
            position: absolute;
            z-index: 600;
            bottom: 0;
            width: 100%;
            height: 273px;
            background: #fff;
            .picker_choose {
                display: flex;
                border-bottom: 1px solid $borderColor;
                span {
                    display: inline-block;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                }
                .cancel {
                    flex: 0 0 72px;
                    color: #999;
                }
                .title {
                    flex: 1;
                    color: #333;
                    font-weight: bolder;
                }
                .confirm {
                    flex: 0 0 72px;
                    color: #007bff;
                }
            }
            .picker_content {
                height: 173px;
                margin: 20px 0 0 0;
                // background-color: red;
                position: relative;
                .mask_top,.mask_bottom {
                    width: $percent;
                    height: 68px;
                    position: absolute;
                    z-index: 10;
                    pointer-events: none;
                }
                .mask_top {
                    top: 0;
                    background: linear-gradient(to top, hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));
                   
                }
                .mask_bottom {
                    bottom: 0;
                    background: linear-gradient(to bottom, hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));
                }
                .wheel_wrapper {
                    height: $percent;
                    color: #333;
                    padding: 0 16px;
                    overflow: hidden;
                    display: flex;
                    .wheel {
                        display: inline-block;
                        flex: 1;
                        height: $percent;
                        pointer-events: auto;
                        ul {
                            pointer-events: auto;
                            margin-top: 68px;
                            .wheelTxt {
                                font-size: 20px;
                                text-align: center;
                                height: 36px;
                                line-height: 36px;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }
                        
                    }
                }
            }
        }
    }
</style>
