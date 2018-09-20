<template>
  <transition name="slide">
    <div class="singer-detail">
      ss
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions} from 'vuex'
  import {createSong} from 'common/js/song'
  import {ERR_OK} from 'api/config'
  export default {
    data(){
      return {
        songs: []
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
      ...mapActions([

      ]),
      _normalSongs(list){
        let ret = []
        console.log(list)
        list.forEach((item)=>{
          let musicData = item.musicData
          if(musicData.songid && musicData.albummid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      _getSingerDetail(singerId){
        if(!singerId){
          singerId = this.$route.params.id
//          http://isure.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?guid=9809061264&vkey=C30C99ABE482AAD5A786150B2644D3040D556C263B0633A5F7ED4D087D1D4895E55FDBAC9D7642ECB85DD9611C0887DE4A913677129DB206&uin=0&fromtag=38
//          http://isure.stream.qqmusic.qq.com/C400004EdNow2J7hJi.m4a?guid=9809061264&vkey=1D450CD8068EEE0E1144B89BE9F58C7F358155B50A978A4B95946A79A8DE41187CED0379B7093AE38AF96702F6A35241864005B0282E18DF&uin=0&fromtag=38
//          C30C99ABE482AAD5A786150B2644D3040D556C263B0633A5F7ED4D087D1D4895E55FDBAC9D7642ECB85DD9611C0887DE4A913677129DB206
//          https://u.y.qq.com/cgi-bin/musicu.fcg

        }
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
              console.log('898989')
            this.songs = this._normalSongs(res.data.data.list)
            console.log(this.songs)
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
