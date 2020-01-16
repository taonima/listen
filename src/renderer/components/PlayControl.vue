<template>
  <div id="play">
    <div class="operate">
      <div class="pre"><Icon name="pre" @click="handlePre"/></div>
      <div class="play"><Icon :name="playerOption.paused ? 'play' : 'suspend'" @click="playerOption.paused ? handlePlay() : handlePause()"/></div>
      <div class="next"><Icon name="next" @click="handleNext"/></div>
    </div>
    <div class="progress_control">
      <audio
        id="play_audio"
        ref="player"
        crossOrigin="anonymous"
        :src="playingSong.url"
        @canplay="handlePlay(init)"
        @timeupdate="timeUpdate()"
      />
      <span class="before">{{secondDeal(playerOption.currentTime)}}</span>
      <div style="width: calc(100% - 90px)">
        <Progress 
          ref="progress" 
          :total="parseInt(playingSong.dt / 1000)" 
          :current="parseInt(playerOption.currentTime / 1000)"
          @seeked="progressChange"
        />
      </div>
      <span class="after">{{secondDeal(playingSong.dt)}}</span>
    </div>
    <div class="volume">
      音量
    </div>
    <div class="play_set">
      <Icon name="songs" @click.native.stop="showSongs"/>
    </div>

    <Modal :penetrate="true" modalClass="songs_modal" ref="songs">
      <div class="songs_com">
        <div class="title"><span>播放列表</span><Icon name='close' @click="showSongs"/></div>
        <div class="briefly">
          <span>共{{songList.length}}首</span>
          <span>
            <span class="pointer"><Icon name='collect'/>收藏全部</span>
            <Icon name='divider'/>
            <span class="pointer" @click="clearSongs"><Icon name='clear'/>清空</span>
          </span>
        </div>
        <ul>
          <li v-for="(song, k) in songList" :key="k" @mouseenter="setAction(k)" @mouseleave="setAction()" @dblclick="getSongDetail(song)">
            <span class="name"><span>{{song.name}}<span>{{`${song.alia.length ? `(${song.alia})` : ''}`}}</span></span></span>
            <span class="singer_name"><span v-for="singer in song.ar" :key="singer.id">{{singer.name}}</span></span>
            <span class="time">
              <span v-if="hoverId !== k">{{secondDeal(song.dt)}}</span>
              <Icon v-else name='clear' @click="delSong(song.id)"/>
            </span>
          </li>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { secondDeal, empty } from '@/utils';
  import { play, pause, setAudioOption } from '@/utils/player';
  import { getSongUrl } from '@/services/discover';
  export default {
    name: 'PlayControl',
    data: function () {
      return {
        hoverId: '',
        player: {},
        init: false
      };
    },
    mounted: function () {
      this.player = this.$refs.player;
      this.$store.dispatch('PlayControl/set_playerOption', {
        paused: true
      });
      console.log('this.playerOption', this.playerOption);
      this.player.currentTime = this.playerOption.currentTime / 1000;
    },
    computed: {
      songList: function () {
        return this.$store.state.PlayControl.songList;
      },
      playingSong: function () {
        return this.$store.state.PlayControl.playingSong;
      },
      playerOption: function () {
        return this.$store.state.PlayControl.playerOption;
      }
    },
    methods: {
      secondDeal,
      timeUpdate: function (time = this.player.currentTime) {
        this.$store.dispatch('PlayControl/set_playerOption', {
          currentTime: parseInt(time) * 1000
        });
      },
      handlePre: function () {
        console.log('handlePre');
      },
      handlePlay: function (b = true) {
        if (b) {
          this.$store.dispatch('PlayControl/set_playerOption', {
            paused: false
          });
        } else {
          this.init = true;
        }
      },
      handlePause: function () {
        this.$store.dispatch('PlayControl/set_playerOption', {
          paused: true
        });
      },
      handleNext: function () {
        console.log(this.$refs);
      },
      progressChange: function (time) {
        console.log('time', time);
        setAudioOption(this.player, {
          currentTime: time
        });
      },
      showSongs: function () {
        this.hoverId = '';
        this.$refs.songs.showHidden();
      },
      clearSongs: function () {
        this.$store.dispatch('PlayControl/clear_songList');
      },
      delSong: function (id) {
        this.$store.dispatch('PlayControl/del_songList', id);
      },
      setAction: function (id = '') {
        this.hoverId = id;
      },
      getSongDetail: function (song) {
        getSongUrl({
          id: song.id
        }).then(res => {
          if (!empty(res.data[0])) {
            song = {
              ...song,
              ...res.data[0]
            };
          }
          this.$store.dispatch('PlayControl/set_playingSong', song);
        });
      }
    },
    watch: {
      'playerOption.paused': function (newV) {
        if (!newV) {
          play(this.player);
        } else {
          pause(this.player);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  #play {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    >div {
      display: inline-block;
    }
    .progress_control {
      width: 430px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .before, .after {
        width: 40px;
      }
    }
    .volume {
      width: 130px;
    }
    .operate {
      width: 200px;
      display: inline-flex;
      justify-content: space-evenly;
      >div {
        position: relative;
        width: 30px;
        height: 30px;
        color: white;
        background-color: #E83C3C;
        border-radius: 50%;
        cursor: pointer;
        .listen_svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .play_set {
      .listen_svg {
        font-size: 24px;
        cursor: pointer;
        color: #666666;
      }
    }
  }
</style>
