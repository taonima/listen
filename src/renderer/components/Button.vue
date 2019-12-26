<template>
  <button :class="class_name" @click="onClick">
    <slot></slot>
    <span class="after" v-if="slot.after">
      <slot name="after"></slot>
    </span>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      type: String
    },
    methods: {
      onClick: function () {
        this.$emit('onClick');
      }
    },
    computed: {
      slot: function () {
        return this.$slots;
      },
      class_name: function () {
        switch (this.type) {
          case 'main':
            return 'listen_button listen_button_main';
          case 'main1':
            return 'listen_button listen_button_main1';
        }
        return 'listen_button';
      }
    }
  };
</script>

<style scoped lang="scss">
  .listen_button {
    height: 26px;
    line-height: 26px;
    border: 1px solid #E1E1E2;
    border-radius: 5px;
    padding: 0 10px;
    color: #666666;
    .after {
      color: #666666;
    }
  }
  .listen_button_main {
    border-color: #C62F2F;
    background-color: #C62F2F;
    color: white;
    .after {
      color: white;
    }
  }
  .after {
    height: 100%;
    display: inline-block;
    padding-left: 4px;
    border-left: 1px solid #CA4343;
  }
</style>
