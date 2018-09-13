<template>
  <div class="recommend">
    <div class="recommend-comtent">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
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
  import Slider from 'base/slider/slider'

  export default {
      data(){
        return {
          recommends: []
        }
      },
      created(){
        this._getRecommend()
      },
      methods: {
          _getRecommend(){
              // 请求数据
              getRecommend().then((res)=>{
                  if(res.code === ERR_OK){
                    // console.log(res.data.slider)
                    this.recommends = res.data.slider
                  }
              })
          }
      },
      components: {
          Slider
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
