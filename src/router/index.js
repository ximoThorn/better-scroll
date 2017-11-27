import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import scrolllist from '@/components/scroll_list'
import pullDownOrUp from '@/components/pullDownOrUp'
import swiper from '@/components/swiper'
import selectOptions from '@/components/selectOptions'
import indexList from "@/components/indexList"
import dataPolymerization from "@/components/dataPolymerization"
import polymerizationChild from "@/components/polymerizationChild"



//vue组件路由懒加载写法
// const index = () => import('@/components/index');
// const scrolllist = () => import('@/components/scroll_list');
// const pullDownOrUp = () => import('@/components/pullDownOrUp');
// const swiper = () => import('@/components/swiper');
// const selectOptions = () => import('@/components/selectOptions');
// const indexList = () => import('@/components/indexList');
// const dataPolymerization = () => import('@/components/dataPolymerization');
//const polymerizationChild = () => import('@/components/polymerizationChild');

Vue.use(Router)

export default new Router({
  // mode: 'history',//路由history模式
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
      component: dataPolymerization,
      children: [
        {
          path: "/dataPolymerization/polyChild/:id",
          name: "polyChild",
          component: polymerizationChild,
          beforeEnter: (to, from, next) => {//路由独享的守卫
            console.log(to);
            console.log(from);
            console.log(to.params)
            next();
          }
        }
      ]
    }
  ]
})
