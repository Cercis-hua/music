<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImg"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {createSong,getMusicUrl} from 'common/js/song'
  import {ERR_OK} from 'api/config'
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        songs: []
      }
    },
    computed: {
      title(){
        return this.singer.name
      },
      bgImg(){
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      console.log(this.singer)
      this._getSingerDetail(this.singer.id)
    },
    methods: {
      _getSingerDetail(singerId){
        if(!singerId){
          singerId = this.$route.params.id
//          http://isure.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?guid=9809061264&vkey=C30C99ABE482AAD5A786150B2644D3040D556C263B0633A5F7ED4D087D1D4895E55FDBAC9D7642ECB85DD9611C0887DE4A913677129DB206&uin=0&fromtag=38
//          http://isure.stream.qqmusic.qq.com/C400004EdNow2J7hJi.m4a?guid=9809061264&vkey=1D450CD8068EEE0E1144B89BE9F58C7F358155B50A978A4B95946A79A8DE41187CED0379B7093AE38AF96702F6A35241864005B0282E18DF&uin=0&fromtag=38
//          C30C99ABE482AAD5A786150B2644D3040D556C263B0633A5F7ED4D087D1D4895E55FDBAC9D7642ECB85DD9611C0887DE4A913677129DB206
//          https://u.y.qq.com/cgi-bin/musicu.fcg
//          this.$router.push('/singer')
//          return
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
            this.songs = this._normalSongs(res.data.data.list)
            console.log(this.songs)
          }
        })
        .catch( (error) => {
          console.log(error)
        })
      },
      _normalSongs(list){
        let ret = []
        // console.log(list)
        list.forEach((item)=>{
          let musicData = item.musicData
          if(musicData.songid && musicData.albummid){
              getMusicUrl(musicData.songmid).then((res)=>{
                if(res.code === ERR_OK){
                  let url = res.data.items[0].vkey
                  ret.push(createSong(musicData,url))
                }
              })
          }
        })
        return ret
      },
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .slide-enter-active,.slide-leave-active
    transition all .3s
  .slide-enter,slide-leave-to
    transform translateX(100%)
</style>
