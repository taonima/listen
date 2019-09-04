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

</style>
