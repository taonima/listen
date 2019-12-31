<template>
  <div id="listen">
    <div class="layout_head">
      <div class="logo">
        <Icon name="logo">
          <span>听</span>
        </Icon>
      </div>
      <div class="among">
        <Search placeholder="搜索音乐" @onSearch="handleSearch"/>
      </div>
      <div class="right">
        <div class="user">
          <span v-if="user_status" @click="openLogin">{{profile.nickname}}</span>
          <span v-else @click="openLogin">登录</span>
          <Icon name="set"/>
        </div>
        <Icon name="divider" className="divider"/>
        <div class="app_operate" @onClick="handleMinimize">
          <Icon name="minimize" @onClick="handleMinimize"/>
          <Icon name="close" @onClick="handleHide"/>
        </div>
      </div>
    </div>
    <div class="layout_body">
      <div class="left_body">
        <Menu title="推荐" :menus="menus"/>
      </div>
      <div class="right_body">
        <router-view/>
      </div>
    </div>
    <div class="layout_foot">

    </div>
  </div>
</template>

<script>
  import { remote } from 'electron';
  import { winURL } from '@/config';
  const { BrowserWindow } = remote;
  let loginWin = null;
  const menus = [
    {
      icon: 'music',
      name: '发现音乐',
      code: 1,
      path: '/discover'
    },
    {
      icon: 'fm',
      name: '私人FM',
      code: 2,
      path: '/fm'
    }
  ];
  export default {
    name: 'index',
    data: () => {
      return {
        menus
      };
    },
    methods: {
      handleSearch: function (v) {
        console.log(v);
      },
      handleMinimize: function () {
        remote.getCurrentWindow().minimize();
      },
      handleHide: function () {
        remote.getCurrentWindow().hide();
      },
      openLogin: function () {
        if (!loginWin) {
          loginWin = new BrowserWindow({
            width: 350,
            height: 530,
            resizable: false,
            frame: false,
            parent: remote.getCurrentWindow(),
            transparent: true
          });
        }
        loginWin.webContents.closeDevTools();
        loginWin.loadURL(`${winURL}/#/login`);
        loginWin.show();
        loginWin.on('closed', () => {
          this.$forceUpdate();
          loginWin = null;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .divider {
    .svg-icon {
      color: #A82828 !important;
      font-size: 12px !important;
    }
  }
</style>
