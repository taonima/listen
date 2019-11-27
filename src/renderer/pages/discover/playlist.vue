<template>
  <span>
    <div class="playlist_type">
      <span>歌单类型</span>
      <Icon iconClass="more"/>
    </div>
    <div>
      <span>热门标签：</span>
      <span></span>
    </div>
    <div class="playlists">
      <div v-for="item in playlists" class="playlist_item">
        <img :src="`${item.coverImgUrl}?param=175y175`" width="175" height="175">
        <p class="name">{{item.name}}</p>
      </div>
    </div>
  </span>
</template>

<script>
  import { getPlaylist, getCatlist, getHotCatlist, getHighqualityPlaylist } from '@/services/discover';
  export default {
    name: 'playlist',
    data: function () {
      return {
        playlists: [],
        tags: []
      };
    },
    created() {
      this.getPlaylist();
      this.getCatlist();
      this.getHotCatlist();
      this.getHighqualityPlaylist();
    },
    methods: {
      getPlaylist: function () {
        getPlaylist({limit: 20}).then(res => {
          this.playlists = res.playlists;
        });
      },
      getCatlist: function () {
        getCatlist().then(res => {
          console.log(res);
        });
      },
      getHotCatlist: function () {
        getHotCatlist().then(res => {
          this.tags = res.tags;
        });
      },
      getHighqualityPlaylist: function () {
        getHighqualityPlaylist().then(res => {
          console.log(res);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .playlist_type {
    display: flex;
    align-items: center;
  }
  .playlists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0;
    .playlist_item {
      width: 175px;
      margin-bottom: 25px;
      .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
</style>
