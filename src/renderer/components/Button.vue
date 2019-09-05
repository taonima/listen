<template>
  <button @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    methods: {
      onClick: function () {
        this.$emit('onClick');
      }
    }
  };
</script>

<style scoped>
  button {
    height: 30px;
    border: 1px solid #999999;
    border-radius: 5px;
  }
</style>
