<template>
  <div id="play">
    <div class="operate">
      <div class="pre"><Icon name="pre" @click="handlePre"/></div>
      <div class="play"><Icon name="play" @click="handlePlay"/></div>
      <div class="next"><Icon name="next" @click="handleNext"/></div>
    </div>
    <div class="progress">
      进度条
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
          <li v-for="(song, k) in songList" :key="k" @mouseenter="setAction(k)" @mouseleave="setAction()" @dblclick="play(song)">
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
  import { secondDeal } from '@/utils';
  export default {
    name: 'Play',
    data: function () {
      return {
        hoverId: ''
      };
    },
    computed: {
      songList: function () {
        return this.$store.state.SongSheet.songList;
      },
      playingSong: function () {
        return this.$store.state.SongSheet.playingSong;
      }
    },
    methods: {
      secondDeal,
      handlePre: function () {
        console.log('handlePre');
      },
      handlePlay: function () {
        console.log('handlePlay');
      },
      handleNext: function () {
        console.log(this.$refs);
      },
      showSongs: function () {
        this.hoverId = '';
        this.$refs.songs.showHidden();
      },
      clearSongs: function () {
        this.$store.dispatch('SongSheet/clear_songList');
      },
      delSong: function (id) {
        this.$store.dispatch('SongSheet/del_songList', id);
      },
      setAction: function (id = '') {
        this.hoverId = id;
      },
      play: function (song) {
        this.$store.dispatch('SongSheet/set_playingSong', song);
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
    .progress {
      width: 430px;
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
