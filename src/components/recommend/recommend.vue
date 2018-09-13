<template>
  <div class="recommend">
    <div class="recommend-comtent">
      <div class="slider-wrapper">

      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>

        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
      created(){
        this._getRecommend()
      },
      methods: {
          _getRecommend(){
              // 请求数据
              getRecommend().then((res)=>{
                  if(res.code === ERR_OK){
                    console.log(res.data)
                  }
              })
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .recommend-list .list-title
    color $color-theme
    font-size $font-size-medium
</style>
