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

      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'Play',
    methods: {
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
        this.$refs.songs.showHidden();
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
