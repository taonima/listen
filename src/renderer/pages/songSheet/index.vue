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
          <span class="play"><Icon name="play"/>播放全部</span>
          <template v-slot:after>
            <Icon name="add"/>
          </template>
        </Button>
        <Button>
          <span><Icon name="collect" />收藏</span>
        </Button>
        <Button><Icon name="share" />分享</Button>
        <Button><Icon name="download" />下载全部</Button>
      </div>
      <div class="four_line">
        <p>
          <span>标签:</span>
          <router-link v-for="tag in (_get(song_sheet, ['tags']) || [])" :to="`/discover/2?tag=${tag}`" :key="tag">{{tag}}</router-link>
        </p>
        <pre :class="pre_class">简介:{{song_sheet.description}}</pre>
        <Icon :name="icon_name" @onClick="handleRetract"/>
      </div>
    </div>
    <div class="song_list">
      <Tabs :tabs="tabs" v-model="tab_key" tabPosition="left">
        <template v-slot:1>
          <table>
            <thead>
            <tr>
            <th width="50"></th>
            <th width="60">操作</th>
            <th width="265">歌名</th>
            <th width="185">歌手</th>
            <th width="170">专辑</th>
            <th width="90">时长</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, k) in (playList.tracks || [])">
              <td>{{k + 1 < 10 ? `0${k + 1}` : k + 1}}</td>
              <td></td>
              <td class="name"><span><span>{{item.al.name}}</span><span>{{`${item.alia.length ? `(${item.alia})` : ''}`}}</span></span></td>
              <td><span><span class="singer_name" v-for="singer in item.ar">{{singer.name}}</span></span></td>
              <td><span>{{item.al.name}}</span></td>
              <td>{{secondDeal(item.dt)}}</td>
            </tr>
            </tbody>
          </table>
        </template>
      </Tabs>
    </div>
    <i class="iconfont icon-iconkafei"></i>
  </div>
</template>

<script>
  import { getPlaylistDetail } from '@/services/discover';
  import { empty, _get, secondDeal } from '@/utils';
  const tabs = [
    {
      label: '歌曲列表',
      key: 1
    },
    {
      label: '评论',
      key: 2
    },
    {
      label: '收藏者',
      key: 3
    }
  ];
  export default {
    name: 'songSheet',
    data: function() {
      return {
        tabs,
        playList: {},
        retract: true, // 是否展开简介
        tab_key: 1
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
        return 'top';
      }
    },
    methods: {
      _get,
      secondDeal,
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
  @import '@/assets/scss/mixin.scss';
  .song {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    >img {
      vertical-align: top;
    }
    .introduce {
      margin-left: 30px;
      flex-grow: 1;
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 230px);
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
          @include text-overflow($line: 3);
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
    .song_list {
      margin: 30px -30px;
      .singer_name {
        &::after {
          content: '/';
        }
        &:last-child::after  {
          content: '';
        }
      }
      table {
        width: 100%;
        th {
          border: 1px solid #E1E1E2;
          border-top: none;
          height: 26px;
          text-align: left;
          padding-left: 10px;
          &:first-child {
            border-left: none;
          }
          &:last-child {
            border-right: none;
          }
        }
        td {
          padding: 4px 10px;
          &:first-child {
            text-align: right;
          }
          >span {
            @include text-overflow($line: 1);
          }
        }
        tbody {
          color: #666666;
          .name {
            span span:first-child {
              color: black;
            }
          }
          tr:nth-child(2n) {
            background-color: #F5F5F7;
          }
          tr:hover {
            background-color: #EDEDED;
          }
        }
      }
      .listen_tabs {
        /deep/ .tab_content {
          padding-top: 0 !important;
        }
      }

    }
  }
</style>
