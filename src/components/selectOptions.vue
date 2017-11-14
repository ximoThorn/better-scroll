<template>
   <div class="wrap">
       <p class="select" @click="onePickerShow">
           {{SelectTxts[0]}}
       </p>
       <p class="select" @click="twoPickerShow">
           {{SelectTxts[1]}}
       </p>
       <p class="select" @click="threePickerShow">
           {{SelectTxts[2]}}
       </p>
        <picker v-if="datas.length && showOne" :wheelData="datas" :showState="showOne" @change="_wheelChange" 
        @hideWheel="_showHideWheel" @selectedData="_selectedData" :selectedIndex="oneSelectedIndex"></picker>

        <picker v-if="datas.length && showTwo" :wheelData="datas" :showState="showTwo" @change="_wheelChange" 
        @hideWheel="_showHideWheel" @selectedData="_selectedData" :selectedIndex="twoSelectedIndex"></picker>

        <picker v-if="datas.length && showThree" :wheelData="datas" :showState="showThree" @change="_wheelChange" 
        @hideWheel="_showHideWheel" @selectedData="_selectedData" :selectedIndex="threeSelectedIndex"></picker>
   </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import picker from "./../base/picker.vue"
    import pickerData from "./../common/json/pickerData.json"

    export default {
        data() {
            return {
                showOne: false,
                showTwo: false,
                showThree: false,
                datas: "",
                selectData: [[], [], []],
                oneSelectedIndex: [0],
                twoSelectedIndex: [0, 0],
                threeSelectedIndex: [0, 0, 0],//用来存储所选择的各个wheel的index值
                SelectTxts: ["one column picker", "two column picker", "three column picker"],
            }
        },
        components: {
            picker
        },
        created() {

        },
        methods: {
            onePickerShow() {
                this.showOne = true;//picker组件的显示与隐藏
                this.datas = pickerData.picker;
                this._initSelectData(this.datas);
            },
            twoPickerShow() {
                this.showTwo = true;//picker组件的显示与隐藏
                this.datas = pickerData.Twopicker;
                this._initSelectData(this.datas);
            },
            threePickerShow() {
                this.showThree = true;//picker组件的显示与隐藏
                this.datas = pickerData.Threepicker;

                this._initSelectData(this.datas);

            },
            _initSelectData(ds) {//selectData里面的数据初始化
                let initDataArr = ds;

                if (this.showOne) {

                    for (let i = 0; i < initDataArr.length; i++) {

                        this.selectData[0][i] = (initDataArr[i][this.oneSelectedIndex[i]].text);

                    };
                } else if (this.showTwo) {
                    for (let i = 0; i < initDataArr.length; i++) {

                        this.selectData[1][i] = (initDataArr[i][this.twoSelectedIndex[i]].text);

                    };
                } else if (this.showThree) {
                    for (let i = 0; i < initDataArr.length; i++) {
                        
                        this.selectData[2][i] = (initDataArr[i][this.threeSelectedIndex[i]].text);

                    };
                }
                   
                
            },
            _showHideWheel(_re) {//picker组件向其父组件传递数据以控制picker是否隐藏
                this.showOne = _re;
                this.showTwo = _re;
                this.showThree = _re;
            },
            _wheelChange(i, j) {//实时监听picker组件内部wheel选项数据是否有所改变

                if (this.showOne) {
                    this.selectData[0][i] = this.datas[i][j].text;
                    this.oneSelectedIndex[i] = j;
                } else if (this.showTwo) {
                    this.selectData[1][i] = this.datas[i][j].text;
                    this.twoSelectedIndex[i] = j;
                } else if (this.showThree) {
                    console.log(i);
                    this.selectData[2][i] = this.datas[i][j].text;
                    this.threeSelectedIndex[i] = j;
                };

            },
            _selectedData(le) {//当picker组件内部点击确定时，父组件相应显示所选数据
                let selectArr = this.selectData[le-1],
                    selectTxt = "",
                    length = le - 1;

                console.log(selectArr);   
                
                for (let i = 0; i < selectArr.length; i++) {
                    if (selectArr[i]) {
                        if (selectArr.length > 1) {
                            selectTxt += ("，"+selectArr[i]);
                        } else {
                            selectTxt += selectArr[i];
                        }; 
                    };
                };

                this.SelectTxts[length] = selectArr.length>1?selectTxt.substr(1):selectTxt;
            },

        }

    }
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";

    .wrap {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #efeff4;
        padding-top: 50px;
        .select {
            width: 70%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin: 20px auto 0;
            background-color: #fff;
            border: 1px solid $borderColor;
        }
    }
    

</style>
