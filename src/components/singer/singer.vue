<template>
  <div class="singer">
    <list-view :data=singerList @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 8

  export default {
      data(){
          return {
              singerList: []
          }
      },
      created(){
          this._getSingerList()
      },
      methods: {
          selectSinger(singer){
              this.$router.push({
                  path: `/singer/${singer.id}`
              })
          },
          _getSingerList(){
              axios.get('getSingerList/v8/fcg-bin/v8.fcg',{
                  params: {
                      channel: 'singer',
                      page: 'list',
                      key: 'all_all_all',
                      pagesize: 100,
                      pagenum: 1,
                      hostUin: 0,
                      needNewCode: 0,
                      platform: 'yqq',
                      g_tk: 5381,
                      inCharset: 'utf-8',
                      outCharset: 'utf-8',
                      notice: 0,
                      format: 'jsonp'
                  }
              })
              .then( (res) => {
                  console.log(res)
                  if(res.data.code === ERR_OK){
                    this.singerList = this._normalizeSinger(res.data.data.list)
                    console.log(this.singerList)
                  }
              })
              .catch( (error) => {
                  console.log(error)
              })
          },
          _normalizeSinger(list){
              //遍历list获取数据1、热门 2、Findex数据
              let map = {
                  hot: {
                      title: HOT_NAME,
                      items: []
                  }
              }
              list.forEach((item,index)=>{
                  if(index<HOT_SINGER_LENGTH){
                      map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                      }))
                  }
                  const key = item.Findex
                  if(!map[key]){
                      map[key] = {
                          title: key,
                          items: []
                      }
                  }
                  map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                  }))
              })
              console.log(map)
              // 为了得到有序列表 需要处理map
              let hot = []
              let ret = []
              for (let key in map){
                  let val = map[key]
                  if(val.title.match(/[a-zA-Z]/)){
                      ret.push(val)
                  }else if(val.title === HOT_NAME){
                      hot.push(val)
                  }
              }
              ret.sort((a,b)=>{
                  return a.title.charCodeAt(0)-b.title.charCodeAt(0)
              })
              return hot.concat(ret)
          }
      },
      components: {
        ListView
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
