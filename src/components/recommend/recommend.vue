<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
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
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.username"></h2>
                <p class="desc" v-html="item.title"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ERR_OK} from 'api/config'
  import Swiper from 'swiper'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {mapMutations} from 'vuex'

  export default {
      data(){
        return {
          recommends: [],
          discList: []
        }
      },
      created(){
        this._getRecommend()
        this._getDiscList()
        setTimeout(()=>{
          this._swiper()
        },1000)
      },
      methods: {
          _swiper(){
            new Swiper('.swiper-container', {
              loop: true,
              autoplay: 1500,
              effect: 'fade'
            })
          },
          _getRecommend(){
              // 请求数据
              this.$http.get('getRecommend/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',{
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
                  console.log(error)
              })
          },
          _getDiscList(){
              // 请求数据
              this.$http.get('getDiscList/cgi-bin/musicu.fcg',{
                  params: {
                      platform: 'yqq',
                      data: {"comm":{"ct":24},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"}}
                  }
              })
              .then( (res) => {
                  if(res.data.code === ERR_OK){
                      console.log(res.data.recomPlaylist.data.v_hot)
                      this.discList = res.data.recomPlaylist.data.v_hot
                  }
              })
              .catch( (error) => {
                  console.log(error)
              })
          },
          selectItem(item) {
              this.$router.push({
                  path: `/recommend/${item.id}`
              })
//              this.setDisc(item)
          },
//          ...mapMutations({
//              setDisc: 'SET_DISC'
//          })
      },
      components: {
        Loading,
        Scroll
      },
      mounted(){

      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  @import 'swiper/dist/css/swiper.min.css'
  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
        a
          width 100%
        img
          width 100%
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            width 60px
            padding-right 20px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            text-align left
            .name
              margin-bottom 6px
              color $color-text
            .desc
              color $color-text-d

      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>
