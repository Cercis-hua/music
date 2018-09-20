// import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
import axios from 'axios'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}
function getMusicUrl(mid,cb) {
  let url = '99'
  axios.get('getSongUrl/base/fcgi-bin/fcg_music_express_mobile3.fcg',{
    params: {
      songmid: mid,
      filename: `C400${mid}.m4a`,
      guid: 1819638027,
      platform: 'yqq',
      loginUin: 0,
      hostUin: 0,
      cid: 205361747,
      g_tk: 5381,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp'
    }
  })
  .then( (res) => {
    if(res.data.code === ERR_OK){
      url = res.data.data.items[0].vkey
      typeof cb === 'function' && cb.call(this,url)
      return url
    }
  })
  .catch( (error) => {
    console.log(error)
  })
}
export function createSong(musicData) {
  getMusicUrl(musicData.songmid,data=>{
    musicData.url = data
  })
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=9809061264&vkey=${musicData.url}&uin=0&fromtag=46`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

