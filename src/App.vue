<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'listen',
  created: function () {
    ipcRenderer.on('vuex-data', this.initVuex)
    ipcRenderer.on('sync_user', this.sync_user)
  },
  methods: {
    initVuex: function (e, { action, data }) {
      this.$store.dispatch(action, data)
    },
    sync_user: function (e, data) {
      this.$store.dispatch('User/set_user', data)
    }
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
</style>
