<template>
    <div class="wrap">
        <div class="theCity">所在城市: {{locaCity}}</div>
        <div class="list_wrap">
            <list ref="listView" v-if="cityDatas.length" :cityDatas="cityDatas" @selected="selectedCity">
            
            </list>
        </div>
    </div>
</template>

<script>
    import list from "./../base/list.vue"
    import cityData from "./../common/json/indexList.json"

export default {
    data() {
        return {
            locaCity:"上海市",
            cityDatas: [],

        };
    },  
    components: {
        list
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.cityDatas = cityData;
            
        },
        selectedCity(city) {
            this.locaCity = city;
            console.log(this.$refs.listView)
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: $percent;
        height: $percent;
        background-color: #efeff4;
        padding: 0 10px 0;
        .theCity {
            position: absolute;
            left: 0;
            // top: 10px;
            width: $percent;
            padding: 14px 16px;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            background-color: #fff;
            z-index: 50;
        }
        .list_wrap {
            width: $percent;
            padding-right: 20PX;
            position: absolute;
            top: 60px;
            bottom: 0;
        }
    }

</style>
