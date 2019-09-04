<template>
  <div id="listen">
    <div class="layout_head">
      <div class="logo">
        <Icon iconClass="logo">
          <span>听</span>
        </Icon>
      </div>
      <div class="among">
        <Search placeholder="搜索音乐" @onSearch="handleSearch"/>
      </div>
      <div class="right">
        <div class="user">
          <span @click="openLogin">登录</span>
          <Icon iconClass="set"/>
        </div>
        <Icon iconClass="divider" className="divider"/>
        <div class="app_operate">
          <Icon iconClass="minimize" @onClick="handleMinimize"/>
          <Icon iconClass="x" @onClick="handleHide"/>
        </div>
      </div>
    </div>
    <div class="layout_body">
      <div class="left">
        <Menu title="推荐" :menus="menus"/>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
    <div class="layout_foot">

    </div>
  </div>
</template>

<script>
  import { remote } from 'electron';
  import Vue from 'vue';
  const { BrowserWindow } = remote;
  let loginWin;
  const menus = [
    {
      icon: 'note',
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
    created: function() {
      console.log(Vue.winURL);
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
            // backgroundColor: '#FAFAFA',
            transparent: true
          });
        }
        loginWin.webContents.closeDevTools();
        loginWin.loadURL(`${Vue.winURL}/#/login`);
        loginWin.show();
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
