<template>
  <div class="icon" :style="`width: ${width}px;height: ${height}px`">
    <embed :src="name" width="100%" height="100%"/>
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
    }
  }
</script>

<style scoped>
  .icon {
    background-color: white;
    display: inline-block;
  }
</style>
