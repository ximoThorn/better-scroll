import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import scrolllist from '@/components/scroll_list'
import pullDownOrUp from '@/components/pullDownOrUp'
import swiper from '@/components/swiper'
import selectOptions from '@/components/selectOptions'
import indexList from "@/components/indexList"
import dataPolymerization from "@/components/dataPolymerization"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/scrolllist',
      component: scrolllist,
    },
    {
      path: '/pullDownOrUp',
      component: pullDownOrUp,
    },
    {
      path: '/swiper',
      component: swiper,
      meta: {//组件缓存
        keepAlive: true
      }
    },
    {
      path: '/selectOptions',
      component: selectOptions,
    },
    {
      path: '/indexList',
      component: indexList,
    },
    {
      path: "/dataPolymerization",
      component: dataPolymerization
    }
  ]
})
