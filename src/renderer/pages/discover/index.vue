<template>
  <div class="discover">
    <Tabs :tabs="tabs" v-model="tab_key">
      <template v-slot:1>
        <div class="other_label">
          <span class="name">推荐歌单</span>
          <span class="action">
            <span>更多</span>
            <Icon iconClass="more"/>
          </span>
        </div>
        <div class="recommends">
          <div v-for="recommend in recommends" class="recommend_item">
            <p class="playCount">{{recommend.playCount}}万</p>
            <img :src="`${recommend.picUrl}?param=140y140`" width="140" height="140">
            <p class="name">{{recommend.name}}</p>
          </div>
        </div>
      </template>
      <template v-slot:2>2222</template>
    </Tabs>
  </div>
</template>

<script>
  import { getPersonalized } from '@/services/discover';
  const tabs = [
    {
      label: '个性推荐',
      key: 1
    },
    {
      label: '歌单',
      key: 2
    },
    {
      label: '排行榜',
      key: 3
    },
    {
      label: '歌手',
      key: 4
    },
    {
      label: '最新音乐',
      key: 5
    }
  ];
  export default {
    name: 'index',
    data: function () {
      return {
        tabs,
        tab_key: 1,
        recommends: []
      };
    },
    created: function () {
      this.getRecommendSongs();
    },
    methods: {
      getRecommendSongs: function () {
        // let api = getPersonalized;
        // if (this.user_status) {
        //   api = getRecommendResource;
        // }
        getPersonalized({limit: 10}).then(res => {
          if (res.code === 200) {
            this.recommends = res.result;
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .discover {
    .recommends {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 0;
      .recommend_item {
        width: 140px;
        margin-bottom: 25px;
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
  }
</style>
