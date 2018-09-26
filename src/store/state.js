import {playMode} from 'common/js/config'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [], // 顺序播放
  sequenceList: [], // 随机播放
  mode: playMode.sequence,
  curIndex: -1
}

export default state
