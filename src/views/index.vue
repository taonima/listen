<template>
  <div id="listen">
    <div class="layout_head">
      <div class="logo">
        <Icon name="logo"/>听
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
        <div class="app_operate">
          <Icon name="minimize" @click="handleMinimize"/>
          <Icon name="close" @click="handleHide"/>
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
      <PlayControl/>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
import { winURL } from '@/config'
const { BrowserWindow } = remote
let loginWin = null
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
]
export default {
  name: 'index',
  data: () => {
    return {
      menus
    }
  },
  methods: {
    handleSearch: function (v) {
      console.log(v)
    },
    handleMinimize: function () {
      remote.getCurrentWindow().minimize()
    },
    handleHide: function () {
      remote.getCurrentWindow().hide()
    },
    openLogin: function () {
      if (!loginWin) {
        loginWin = new BrowserWindow({
          width: 350,
          height: 530,
          resizable: false,
          parent: remote.getCurrentWindow(),
          frame: false,
          transparent: true,
          webPreferences: {
            nodeIntegration: true // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
          }
        })
        loginWin.loadURL(`${winURL}login`)
        loginWin.webContents.openDevTools()
        loginWin.on('ready-to-show', () => {
          loginWin.show()
        })
        loginWin.on('closed', () => {
          this.$forceUpdate()
          loginWin = null
        })
      } else {
        loginWin.show()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .divider {
    .svg-icon {
      color: #A82828 !important;
      font-size: 12px !important;
    }
  }
</style>
