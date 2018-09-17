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
  import {ERR_OK} from 'api/config'
  import Swiper from 'swiper';
  import axios from 'axios';

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
              axios.get('api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',{
                  params: {
                    platform: 'h5',
                    uin: 0,
                    needNewCode: 1
                  }
              })
              .then( (res) => {
                  if(res.data.code === ERR_OK){
                      this.recommends = res.data.data.slider
                  }
              })
              .catch( (error) => {
                  console.log(error);
              });
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
