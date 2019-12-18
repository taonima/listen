<template>
  <span class="listen_Bubble">
    <div @click.stop="showBubble" class="bubble_rel"><slot></slot></div>
    <div v-show="visible" class="bubble_inner">
      <span class="point"/>
      <slot name="content"></slot>
    </div>
  </span>
</template>

<script>
  export default {
    name: 'Bubble',
    data: function () {
      return {
        visible: false
      };
    },
    methods: {
      showBubble: function (event) {
        this.visible = true;
        document.addEventListener('click', this.docClick);
      },
      hiddenBubble: function () {
        this.visible = false;
        document.removeEventListener('click', this.docClick);
      },
      docClick: function (e) {
        console.log(e);
        if (e.path.length < 14) {
          this.hiddenBubble();
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .listen_Bubble {
    .bubble_rel {
      display: inline-block;
    }
    .bubble_inner {
      min-width: 200px;
      box-shadow: 0 0 14px rgba(136, 136, 136, 0.45);
      padding: 20px;
      border: 1px solid rgba(136, 136, 136, 0.45);
      border-radius: 5px;
      margin-top: 5px;
      position: absolute;
      background-color: white;
      .point{
        content: '';
        width: 0;
        height: 0;
        border: 12px solid;
        position: absolute;
        top: -24px;
        border-color: transparent transparent rgba(136, 136, 136, 0.45);
        &::after{
          content: '';
          width: 0;
          height: 0;
          border: 12px solid;
          position: absolute;
          top: -11px;
          left: -12px;
          border-color:  transparent transparent white ;
        }
      }

    }
  }
</style>
