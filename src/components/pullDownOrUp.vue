<template>
    <div class="scroll" ref="scroll">
        <scroll v-if="lists.length" :loadDatas="lists" :pullUpLoad="pullUpLoad" :pulldown="pulldown" @pullingDown="loadDownData" @pullingUp="loadUpData">
            <ul>
                <li v-for="item in lists">
                    I am the No.<span class="span">{{item}}</span> line
                </li>
                        
            </ul>
        </scroll>
    </div> 

</template>

<script>
    import scroll from "./../base/scroll.vue"
    import {mapArr, _mapArr, addClass, removeClass} from "./../common/js/dom"

    export default {
        data() {
            return {
                lists: [],
                resultLists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],//模拟数据
                pulldown: true,
                num: 0,
                num1: 0,
                pullUpLoad: true,
            }
        },
        components: {
            scroll
        },
        created() {
            this.initAjax();
        },
        methods: {
            initAjax() {
                var _this = this;

                setTimeout(() => {//模拟ajax
                    this.lists = this.resultLists;
                }, 1500);
            },
            loadDownData() {
                console.log("下拉刷新");
                setTimeout(() => {//模拟ajax
                    this.num1++;
                    
                    this.lists = [].concat(_mapArr(this.resultLists,this.num1)).concat(this.lists);
                }, 3000);
            },
            loadUpData() {
                console.log("上拉加载");
                setTimeout(() => { //模拟ajax
                    this.num++;
                    let newArr = mapArr(this.resultLists, this.num);
                    this.lists = this.lists.concat(newArr);
                    console.log(this.lists);

                }, 3000);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";

    .scroll {
        width: $percent;
        ul {
            width: $percent;
            li {
                height: 60px;
                line-height: 60px;
                font-size: 18px;
                padding-left: 20px;
                border-bottom: 1px solid #e5e5e5;
                .span {
                    color: #e74040;
                } 
            }
        }
        .top_wapper {
            width: $percent;
            height: 20px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            position: fixed;
            top: 0;
        }
    }

</style>

