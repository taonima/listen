<template>
  <div class="listen_tabs">
    <div :class="tab_class">
      <span v-for="(tab, k) in tabs" :key="k" :class="label_class(tab.key)" @click="tabChange(tab.key)">
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
    tabPosition: {
      type: String,
      default: 'center'
    },
    activeKey: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'activeKey',
    event: 'change'
  },
  data: function () {
    return {
      key: '1'
    }
  },
  created () {
    console.log(this.activeKey)
    this.key = this.activeKey
  },
  computed: {
    tab_class: function () {
      return 'tab ' + `tab_${this.tabPosition}`
    }
  },
  methods: {
    tabChange: function (key) {
      this.key = key
      this.$emit('change', key)
    },
    label_class: function (key) {
      if (key === this.key) {
        return 'label_active label'
      }
      return 'label'
    }
  }
}
</script>

<style lang="scss">
  .listen_tabs {
    .tab_center {
      text-align: center;
    }
    .tab_left {
      text-align: left;
      padding-left: 50px;
    }
    .tab {
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
