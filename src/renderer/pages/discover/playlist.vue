<template>
  <span>
    <Bubble ref="bubble">
      <div class="playlist_type">
        <span>歌单类型</span>
        <Icon name="right"/>
        <span style="margin-left: 10px">{{cat.name}}</span>
      </div>
      <template v-slot:content>
        <div class="bubble_content">
          <div :class="single_item_class(catAll)" style="width: calc(100% - 5px);margin: 0 0 5px 0" @click="changeCat(catAll)">{{catAll.name}}</div>
          <div v-for="cat in catlist" class="filter_single">
            <div class="single_label"><Icon :name="cat.iconName"/><span class="name">{{cat.name}}</span></div>
            <div class="single_items">
            <div :class="single_item_class(item)" v-for="item in cat.sub" @click="changeCat(item)">{{item.name}}</div>
            </div>
          </div>
        </div>
      </template>
    </Bubble>
    <div>
      <span>热门标签：</span>
      <span v-for="tag in tags" class="hot_tag_name" @click="changeCat(tag)">{{tag.name}}</span>
    </div>
    <div class="playlists">
      <div v-for="item in playlists" class="playlist_item" @click="goToSongSheet(item)">
        <img :src="`${item.coverImgUrl}?param=175y175`" width="175" height="175">
        <p class="name">{{item.name}}</p>
      </div>
    </div>
    <Pagination :page="page" @pageChange="pageChange"/>
  </span>
</template>

<script>
  import { getPlaylist, getCatlist, getHotCatlist } from '@/services/discover';
  export default {
    name: 'playlist',
    data: function () {
      return {
        playlists: [],
        page: {},
        tags: [],
        catAll: {},
        catlist: [],
        cat: {}
      };
    },
    created() {
      this.cat = {
        name: this.$route.query.tag || ''
      };
      this.getPlaylist();
      this.getCatlist();
      this.getHotCatlist();
    },
    methods: {
      single_item_class: function(item) {
        if (item.name === this.cat.name) {
          return 'single_item single_item_active';
        }
        return 'single_item';
      },
      getPlaylist: function (para = {}) {
        para = {
          limit: 20,
          cat: this.cat.name,
          ...para
        };
        getPlaylist(para).then(res => {
          this.playlists = res.playlists;
          this.page = {
            total: res.total || 0,
            pageSize: para.limit,
            current: para.current || 1
          };
        });
      },
      getCatlist: function () {
        getCatlist().then(res => {
          this.catlist = Object.entries(res.categories).map(([k, v]) => {
            return {
              code: k,
              name: v,
              iconName: (function() {
                switch (k) {
                  case '0':
                    return 'earth';
                  case '1':
                    return 'style';
                  case '2':
                    return 'coffee';
                  case '3':
                    return 'smile';
                  case '4':
                    return 'theme';
                }
              })(),
              sub: res.sub.filter(i => i.category === parseInt(k))
            };
          });
          this.catAll = res.all;
        });
      },
      getHotCatlist: function () {
        getHotCatlist().then(res => {
          this.tags = res.tags;
        });
      },
      changeCat: function (e) {
        this.cat = e;
        this.getPlaylist({cat: e.name});
        this.$refs.bubble.hiddenBubble();
      },
      pageChange: function (current) {
        this.getPlaylist({current, before: this.playlists[this.playlists.length - 1]['updateTime']});
      },
      goToSongSheet: function (item) {
        this.$store.dispatch('SongSheet/set_content', item);
        this.$router.push({path: `/songSheet/${item.id}`});
      }
    }
  };
</script>

<style scoped lang="scss">
  .playlist_type {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .bubble_content {
    width: 600px;
    max-height: 400px;
    overflow: auto;
    .cat_all {
      width: 99%;
      padding: 5px 0;
      text-align: center;
      border: 1px solid #E1E1E2;
      border-radius: 5px;
      margin-bottom: 5px;
    }
    .filter_single {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      .single_label {
        display: flex;
        align-items: center;
        width: 85px;
        position: relative;
        top: 5px;
        .listen_svg {
          font-size: 16px;
          color: #E09494;
        }
        .name {
          color: #CE4E4E;
          margin-left: 5px;
        }
      }
      .single_items {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 85px);
      }
    }
  }
  .single_item {
    width: 20%;
    text-align: center;
    border: 1px solid #E1E1E2;
    padding: 5px 0;
    margin: 0 0 -1px -1px;
    cursor: pointer;
  }
  .single_item_active {
    border-color: #C62F2F;
    position: relative;
  }
  .hot_tag_name {
    display: inline-block;
    margin-right: 20px;
    font-size: 12px;
    cursor: pointer;
    color: #666666;
  }
  .playlists {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    .playlist_item {
      width: 175px;
      margin: 0 15px 25px 0;
      cursor: pointer;
      &:nth-child(4n) {
        margin-right: 0;
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
