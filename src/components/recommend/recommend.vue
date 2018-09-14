<template>
  <div class="recommend">
    <div class="recommend-comtent">
      <div class="slider-wrapper">
        <div class="swiper-container" id="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,$index) in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
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
  import Swiper from 'swiper';

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
      },
      updated(){
          new Swiper('.swiper-container', {
            loop: true,
            autoplay: 2000
          })
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  @import 'swiper/dist/css/swiper.min.css';
  .recommend-list .list-title
    color $color-theme
    font-size $font-size-medium
  a
    width 100%
  img
    width 100%
</style>
