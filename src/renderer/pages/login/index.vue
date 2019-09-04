<template>
  <div @click="handleClose">
    登录
  </div>
</template>

<script>
  import { remote } from 'electron';
  export default {
    name: 'login',
    methods: {
      handleClose: function () {
        remote.getCurrentWindow().hide();
      }
    }
  };
</script>

<style scoped>

</style>
