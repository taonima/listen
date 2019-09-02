<template>
  <span :class="svgClass" @click="onClick">
    <svg class="icon_svg" aria-hidden="true">
      <use :xlink:href="iconName"/>
    </svg>
    <span>
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
      iconName() {
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        if (this.className) {
          return 'svg-icon ' + this.className;
        } else {
          return 'svg-icon';
        }
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
  .svg-icon {
    display: inline-flex;
    align-items: center;
    .icon_svg {
      width: 1.5em;
      height: 1.5em;
      fill: currentColor;
      overflow: hidden;
    }
  }
</style>
