<template>
  <div class="song">
    <img :src="`${song_sheet.coverImgUrl}?param=200y200`">
    <div class="introduce">
      <div class="one_line">
        <div class="tag">歌单</div>
        <div class="song_name">{{song_sheet.name}}</div>
        <div class="number">
          <div>
            <p>歌曲数</p>
            <p>{{song_sheet.trackCount}}</p>
          </div>
          <div class="vLine"/>
          <div>
            <p>播放数</p>
            <p>{{parseInt(song_sheet.playCount / 10000)}}万</p>
          </div>
        </div>
      </div>
      <div class="tow_line">
        <img :src="`${_get(song_sheet, ['creator', 'avatarUrl'])}?param=30y30`">
        <span>{{_get(song_sheet, ['creator', 'nickname'])}}</span>
        <span>{{$moment(_get(song_sheet, ['createTime'])).format('YYYY-MM-DD')}}创建</span>
      </div>
      <div class="three_line">
        <Button type="main">
          <span class="play"><Icon iconClass="play"/>播放全部</span>
          <template v-slot:after>
            <Icon iconClass="add"/>
          </template>
        </Button>
        <Button>
          <span><Icon iconClass="collect" />收藏</span>
        </Button>
        <Button><Icon iconClass="share" />分享</Button>
        <Button><Icon iconClass="download" />下载全部</Button>
      </div>
      <div class="four_line">
        <p>
          <span>标签:</span>
          <router-link v-for="tag in (_get(song_sheet, ['tags']) || [])" :to="`/discover/2`" :key="tag">{{tag}}</router-link>
        </p>
        <pre :class="pre_class">简介:{{song_sheet.description}}</pre>
        <Icon :iconClass="icon_name" @onClick="handleRetract"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { getPlaylistDetail } from '@/services/discover';
  import { empty, _get } from '@/utils';
  export default {
    name: 'songSheet',
    data: function() {
      return {
        playList: {},
        retract: true // 是否展开简介
      };
    },
    created() {
      this.getSongSheet(this.$route.params.id);
    },
    computed: {
      song_sheet: function () {
        if (empty(this.playList)) {
          return this.$store.state.SongSheet.content;
        }
        return this.playList;
      },
      pre_class: function () {
        if (this.retract) {
          return 'retract';
        }
        return 'open';
      },
      icon_name: function () {
        if (this.retract) {
          return 'down';
        }
        return 'up';
      }
    },
    methods: {
      _get,
      getSongSheet: function (id) {
        getPlaylistDetail({id}).then(res => {
          this.playList = res.playlist;
        });
      },
      handleRetract: function () {
        this.retract = !this.retract;
      }
    }
  };
</script>

<style lang="scss" scoped >
  .song {
    display: flex;
    margin-top: 30px;
    align-items: end;
    .introduce {
      margin-left: 30px;
      flex-grow: 1;
      position: relative;
      .one_line {
        >div {
          display: inline-block;
          vertical-align: middle;
        }
        .tag {
          width: 43px;
          color: #E03F40;
          border: 1px solid #E03F40;
          padding: 1px 6px;
          border-radius: 3px;
          margin-right: 5px;
          position: absolute;
          top: 5px;
        }
        .song_name {
          font-size: 24px;
          width: 370px;
          margin-left: 48px;
        }
        .number {
          text-align: right;
          color: #99A5B1;
          font-size: 12px;
          position: absolute;
          right: 0;
          >div {
            display: inline-block;
          }
          .vLine {
            border-left: solid 1px #E1E1E2;
            height: 25px;
            margin: 0 2px;
          }
        }
      }
      .tow_line {
        display: flex;
        align-items: center;
        margin-top: 15px;
        >img {
          border-radius: 50%;
        }
        >span {
          margin-left: 15px;
          font-size: 12px;
          &:last-child {
            color: #99A5B1;
          }
        }
      }
      .three_line {
        margin-top: 15px;
        >button {
          margin-right: 10px;
        }
        .add {
          font-size: 15px;
        }
        .play {
          .listen_svg {
            font-size: 15px;
          }
        }
      }
      .four_line {
        font-size: 12px;
        margin-top: 10px;
        line-height: 1.5;
        height: 80px;
        position: relative;
        a {
          color: #0C73C2;
          &::after {
            content: '/';
            color: #7D7D7D;
            margin: 0 3px;
          }
          &:last-child::after {
            content: '';
          }
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          line-height: 1.5;
          margin-top: 5px;
          width: calc(100% - 24px);
        }
        .retract {
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .listen_svg {
          position: absolute;
          right: 0;
          top: 20px;
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
  }
</style>
