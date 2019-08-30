<template>
  <span>
    <Input
      class="input_search"
      :placeholder="placeholder"
      @onChange="onChange"
    />
    <span @click="onclick">
      <Icon iconClass="magnifier"/>
    </span>
  </span>
</template>

<script>
  export default {
    name: 'Search',
    props: {
      placeholder: ''
    },
    data: () => {
      return {
        value: ''
      };
    },
    methods: {
      onChange: function (e) {
        this.value = e;
      },
      onclick: function () {
        this.$emit('onSearch', this.value || '');
      }
    }
  };
</script>

<style lang="scss" scoped>
  input {
    border-radius: 10px;
  }
  .svg-icon {
    position: relative;
    right: 30px;
    cursor: pointer;
  }
</style>
