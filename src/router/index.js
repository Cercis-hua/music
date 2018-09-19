import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'


// 注册一下路由
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
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
      component: Singer,
      // 子路由
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },{
      path: '/search',
      component: Search
    }
  ]
})
