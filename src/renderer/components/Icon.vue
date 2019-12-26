<template>
  <span :class="svgClass" @click="onClick">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconName"/>
    </svg>
    <span v-if="slot.default">
      <slot></slot>
    </span>
  </span>

</template>

<script>
  export default {
    name: 'Icon',
    props: {
      iconClass: {
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
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        return 'listen_svg ' + this.iconClass;
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
