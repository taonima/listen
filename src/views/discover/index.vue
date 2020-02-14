<template>
  <div class="discover">
    <Tabs :tabs="tabs" v-model="tab_key">
      <template v-slot:1>
        <Recommend/>
      </template>
      <template v-slot:2>
        <Songs/>
      </template>
    </Tabs>
  </div>
</template>

<script>
import Recommend from './recommend'
import Songs from './songs'
const tabs = [
  {
    label: '个性推荐',
    key: '1'
  },
  {
    label: '歌单',
    key: '2'
  },
  {
    label: '排行榜',
    key: '3'
  },
  {
    label: '歌手',
    key: '4'
  },
  {
    label: '最新音乐',
    key: '5'
  }
]
export default {
  name: 'discover',
  components: {
    Recommend,
    Songs
  },
  data: function () {
    return {
      tabs,
      tab_key: 1
    }
  },
  created () {
    this.tab_key = this.$route.params.id
  },
  watch: {
    tab_key: function (v) {
      this.$router.push(`/discover/${v}`)
    }
  }
}
</script>

<style scoped lang="scss">
  .discover {

  }
</style>
