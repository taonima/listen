<template>
  <span :class="svgClass">
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
    }
  };
</script>

<style scoped lang="scss">
  .svg-icon {
    .icon_svg {
      width: 1.5em;
      height: 1.5em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
</style>
