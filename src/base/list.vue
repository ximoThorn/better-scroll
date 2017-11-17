<template>
    <div class="listCity" ref="listWrapper">
        <ul ref="cityContent">
            <li v-for="item in data">
                <h5 class="">{{item.name}}</h5>
                <ul>
                    <li ref="cityItem" @click="_selectCity(citys.name)" v-for="citys in item.cities">{{citys.name}}</li>
                </ul>
            </li>
        </ul>
        <div class="list_nav">
            <ul>
                <li :class="{item_active:currentNavIndex === index}" v-for="(item, index) in data"
                 @click="_navClick(index)">{{item.name.substr(0,1)}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
    props:{
        cityDatas: {
            type: Array,
            default: [],
            
        }
    },
    data() {
        return {
            data: "",
            currentNavIndex: 0,
        }
    },
    created() {
        this.data = this.cityDatas;
        this.cacluateHeight = [];

        this.$nextTick(() => {
            this.init();
            this._cacluateHeight();
        })
    },
    methods: {
        init() {
            let initDom = this.$refs.listWrapper; 
            this.list = new BScroll(initDom, {
                click: true,
                probeType : 3,
            });

            this.list.on("scroll", (po) => {
                this._navScroll(po.y);
               
            })
        },
        _cacluateHeight() {
            this.cacluateHeight = [];

            let cacluateChild = this.$refs.cityContent.children,
                height = 0;
            
            this.cacluateHeight.push(height);
            for (let i = 0; i < cacluateChild.length; i++) {
                height+=cacluateChild[i].clientHeight;
                this.cacluateHeight.push(height);
            };

            console.log(this.cacluateHeight);
        },
        _navScroll(y) {

            let heightArr = this.cacluateHeight,
                poy = Math.abs(y);

            if (y >= 0) {//当始终在顶部的时候
                this.currentNavIndex = 0;
            } else {
                
                for (let i = 0; i < heightArr.length; i++) {
                    if (!heightArr[i+1] || (heightArr[i] < poy && heightArr[i+1] >= poy)) {
                        this.currentNavIndex = i;
                        
                        return;
                    };
                };
            };
        },
        _navClick(index) {
            let cacluateChild = this.$refs.cityContent.children;

            this.list.scrollToElement(cacluateChild[index], 500);

            this.currentNavIndex = index;
        },
        _selectCity(c) {
            console.log(c);
            this.$emit("selected", c);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";
    
    .listCity {
        width: $percent;
        height: $percent;
        position: relative;
        > ul {
            background-color: #fff;
            overflow: hidden;
            li {
                h5 {
                    padding: 16px 16px 16px;
                    font-size: 14px;
                    color: #999;
                    background-color: #f7f7f7;
                    margin-bottom: 16px;
                    font-weight: normal;
                }
                ul {
                    li {
                        height: 50px;
                        line-height: 50px;
                        padding: 0 16px;
                        font-size: 14px;
                        color: #333;
                        border-bottom: 1px solid #cecece;
                        &:last-child {
                            border-bottom: none;
                        }
                    }
                    
                }
            }
        }
        .list_nav {
            width: 42px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            li {
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            .item_active {
                color: #3b99fc;
            }
        }
    }
</style>
