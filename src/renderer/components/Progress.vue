<template>
  <div class="progress" @click="seeked">
    <div class="current_postion"/>
  </div>
</template>

<script>
  export default {
    name: 'Progress',
    props: {
      total: {
        type: Number,
        required: true
      },
      current: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        progress: {},
        current_postion: {}
      };
    },
    mounted: function () {
      this.current_postion = document.querySelector('.current_postion');
      this.progress = document.querySelector('.progress');
      this.current_postion.style.width = `${this.current / this.total * 100}%`;
    },
    methods: {
      seeked: function (e) {
        const percentage = e.offsetX / this.progress.clientWidth;
        this.$emit('seeked', parseInt(this.total * percentage));
      }
    },
    watch: {
      current: function (newV) {
        this.current_postion.style.width = `${newV / this.total * 100}%`;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .progress {
    width: 100%;
    background-color: #C2C2C4;
    height: 4px;
    border-radius: 2px;
    .current_postion {
      background-color: #E83C3C;
      height: 4px;
      border-radius: 2px;
      width: 0;
    }
  }
</style>
