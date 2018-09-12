import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'


// 注册一下luyou
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Recommend
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },{
      path: '/singer',
      component: Singer
    },{
      path: '/search',
      component: Search
    }
  ]
})
