<template>
  <div class="icon" :style="`width: ${width}px;height: ${height}px`">
    <embed :src="icon" width="100%" height="100%"/>
  </div>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: {
        required: true
      },
      width: {
        required: true
      },
      height: {
        required: true
      }
    },
    computed: {
      icon: function () {
        return require(`@/assets/icon/${this.name}.svg`);
      }
    }
  };
</script>

<style scoped>
  .icon {
    display: inline-block;
  }
</style>
