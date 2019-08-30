<template>
  <input type="text" :placeholder="placeholder" v-model="value" @change="onChange">
</template>

<script>
  export default {
    name: 'Input',
    props: {
      placeholder: '',
      initValue: ''
    },
    data: () => {
      return {
        value: ''
      };
    },
    created() {
      this.value = this.initValue;
    },
    methods: {
      onChange: function (e) {
        this.$emit('onChange', e.target.value);
      }
    }
  };
</script>

<style scoped>
  input {
    height: 22px;
    width: 210px;
    text-indent: 10px;
  }
</style>
