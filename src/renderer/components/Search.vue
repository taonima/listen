<template>
  <Input
    class="listen_search"
    :placeholder="placeholder"
    @onChange="onChange"
    suffix="magnifier"
    @suffixClick="onclick"
  />
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
    input {
      border-radius: 10px;
    }
  }
</style>
