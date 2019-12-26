<template>
  <span>
    <div class="other_label">
      <span class="name">推荐歌单</span>
      <span class="action">
        <span>更多</span>
        <Icon iconClass="more"/>
      </span>
    </div>
    <div class="recommends">
      <div v-for="recommend in recommends" class="recommend_item" @click="goToSongSheet(recommend)">
        <p class="playCount">{{recommend.playCount}}万</p>
        <img :src="`${recommend.picUrl}?param=140y140`" width="140" height="140">
        <p class="name">{{recommend.name}}</p>
      </div>
    </div>
  </span>
</template>

<script>
  import { getPersonalized } from '@/services/discover';
  export default {
    name: 'recommend',
    data: function () {
      return {
        recommends: []
      };
    },
    created: function () {
      this.getRecommendSongs();
    },
    methods: {
      getRecommendSongs: function () {
        getPersonalized({limit: 10}).then(res => {
          if (res.code === 200) {
            this.recommends = res.result;
          }
        });
      },
      goToSongSheet: function (item) {
        this.$store.dispatch('SongSheet/set_content', item);
        this.$router.push({path: `/songSheet/${item.id}`});
      }
    }
  };
</script>

<style scoped lang="scss">
  .recommends {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0;
    .recommend_item {
      width: 140px;
      margin-bottom: 25px;
      cursor: pointer;
      .playCount {
        position: relative;
        height: 14px;
        font-size: 12px;
        top: 14px;
        text-align: right;
        color: white;
        background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #e1e1e2 100%);
      }
      .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
</style>
