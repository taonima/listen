<template>
  <div class="listen_Tabs">
    <div class="tab">
      <span v-for="tab in tabs" :key="tab.key" :class="label_class(tab.key)" @click="tabChange(tab.key)">
        {{tab.label}}
      </span>
    </div>
    <div class="tab_content">
      <slot :name="activeKey"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
    props: {
      tabs: {
        required: true,
        type: Array
      },
      activeKey: ''
    },
    model: {
      prop: 'activeKey',
      event: 'change'
    },
    data: function () {
      return {
        key: 1
      };
    },
    created() {
      this.key = this.activeKey;
    },
    methods: {
      tabChange: function (key) {
        this.key = key;
        this.$emit('change', key);
      },
      label_class: function (key) {
        if (key === this.key) {
          return 'label_active label';
        }
        return 'label';
      }
    }
  };
</script>

<style scoped lang="scss">
  .listen_Tabs {
    .tab {
      text-align: center;
      border-bottom: 1px solid #E1E1E2;
      .label {
        padding: 10px;
        display: inline-block;
        cursor: pointer;
        margin: 0 20px;
      }
      .label_active {
        border-bottom: 2px solid #C62F2F;
        color: #C62F2F;
      }
    }
    .tab_content {
      padding: 15px 0 0 0;
    }
  }
</style>
