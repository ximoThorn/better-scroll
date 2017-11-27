<template>
    <div>
        
        <router-link :to="{name: 'polyChild', params: {id: 1561}}">This is dataPolymerization</router-link>
        <img width="100%" src="../assets/images/index_banner1.png" alt="">
        <router-view>

        </router-view>
    </div>
</template>

<script>
    import testDatas from "./../common/json/datap.json"
    import Singer from "./../common/js/singer"

    const HOT_NAME = "热";
    const HOT_LENGTH = 10;

    export default {
        data() {
            return {
                pars: {test: "test"}
            }
        },
        mounted() {
            console.log(this._dataPolymerization(testDatas.data.list));
        },
        methods: {
            _dataPolymerization(list) {//数据的聚合
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };

                list.forEach((item, index) => {
                    if (index < HOT_LENGTH) {
                        map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
                    };
                    
                    let key = item.Findex;
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    };

                    map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name));

                });

                //把map对象转化成有序数组
                let hot = [], ret = [];

                for (let key in map) {
                    let val = map[key];

                    if (/[a-zA-Z]/.test(val.title)) {
                        ret.push(val);
                    } else if (val.title === HOT_NAME) {
                        hot.push(val);
                    };
                };
                
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });

                return hot.concat(ret);
            }
        },
    }
</script>

<style>

</style>
