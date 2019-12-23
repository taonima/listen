<template>
  <div>歌单页</div>
</template>

<script>
  export default {
    name: 'index',
    created() {
      console.log(this.song_sheet);
    },
    destroyed() {
      this.$store.dispatch('SongSheet/clear_content');
    }
  };
</script>

<style scoped>

</style>
