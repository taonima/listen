<template>
  <span :class="svgClass[0]" @click="onClick">
    <i :class="svgClass[1]"/>
    <span v-if="slot.default">
      <slot></slot>
    </span>
  </span>

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
      slot: function () {
        return this.$slots;
      },
      iconName() {
        return `#icon-${this.name}`;
      },
      svgClass() {
        return ['listen_svg ' + this.name, 'iconfont ' + `icon-${this.name}`];
      }
    },
    methods: {
      onClick: function () {
        this.$emit('onClick');
      }
    }
  };
</script>

<style scoped lang="scss">
  .listen_svg {
    .icon {
      width: 1em;
      height: 1em;
      fill: currentColor;
      overflow: hidden;
      vertical-align: -0.15em;
    }
  }
</style>
