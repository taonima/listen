<template>
  <span class="listen_search">
    <Input
      class="input_search"
      :placeholder="placeholder"
      @onChange="onChange"
    />
    <span @click="onclick" class="btn">
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
  .listen_search {
    display: inline-flex;
    align-items: center;
    input {
      border-radius: 10px;
    }
    .btn {
      position: relative;
      right: 30px;
      cursor: pointer;
    }
  }
</style>
