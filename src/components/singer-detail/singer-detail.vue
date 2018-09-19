<template>
  <transition name="slide">
    <div class="singer-detail">
      ss
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config'
  export default {
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      console.log(this.singer)
      console.log(JSON.stringify(this.singer))
      this._getSingerDetail(this.singer.id)
    },
    methods: {
      _getSingerDetail(singerId){
        this.$http.get('getSingerDetail/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',{
          params: {
            hostUin: 0,
            needNewCode: 0,
            platform: 'yqq',
            order: 'listen',
            begin: 0,
            num: 100,
            songstatus: 0,
            singermid: singerId,
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
            this.singerList = res.data.data.list
            console.log(this.singerList)
          }
        })
        .catch( (error) => {
          console.log(error)
        })
      }
    },
    components: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active,.slide-leave-active
    transition all .3s
  .slide-enter,slide-leave-to
    transform translateX(100%)
</style>
