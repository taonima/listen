<template>
  <i :class="svgClass" @click="onClick"/>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
        required: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    computed: {
      svgClass() {
        return 'listen_svg ' + `icon-${this.name}`;
      }
    },
    methods: {
      onClick: function () {
        this.$emit('click');
      }
    }
  };
</script>

<style scoped lang="scss">
  .listen_svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    vertical-align: -0.15em;
  }
</style>
