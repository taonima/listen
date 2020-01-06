<template>
  <div v-if="!penetrate"  v-show="visible" class="mask">
    <div :class="`listen_modal ${modalClass}`">
      <span class="modal_content" v-if="slot.default">
        <slot/>
      </span>
    </div>
  </div>
  <div v-else v-show="visible" :class="`listen_modal ${modalClass}`">
    <div class="modal_content" v-if="slot.default">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    data: function() {
      return {
        visible: false
      };
    },
    props: {
      penetrate: { // 是否可以穿透
        type: Boolean,
        default: false
      },
      mask: {
        type: Boolean,
        default: false
      },
      modalClass: {
        type: String,
        default: ''
      }
    },
    computed: {
      slot: function () {
        return this.$slots;
      }
    },
    mounted() {
      this.$nextTick(() => {
        const body = document.querySelector(`body`);
        if (body.append) {
          body.append(this.$el);
        } else {
          body.appendChild(this.$el);
        }
      });
    },
    methods: {
      showHidden: function () {
        this.visible = !this.visible;
      },
      docClick: function (e) {
        console.log(e.path);
        let isPlay = e.path.includes(document.querySelector('#play'));
        console.log(isPlay);
        if (!document.querySelector('.listen_modal').contains(e.target) && !isPlay) {
          this.showHidden();
        }
      }
    },
    watch: {
      visible: function (v) {
        if (v) {
          if (this.penetrate) {
            document.addEventListener('click', this.docClick);
          }
        } else {
          document.removeEventListener('click', this.docClick);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
  }
  .listen_modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .modal_content {
      min-width: 400px;
      min-height: 300px;
    }
  }
</style>
