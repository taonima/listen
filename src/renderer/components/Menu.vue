<template>
  <div class="menu">
    <div class="title">{{title}}</div>
    <div v-for="item in menus" :class="className(item.code)" v-on:click="menuClick(item.code)">
      <!--<Icon :name="iconName(item.code, item.icon)" :width="20" :height="20"/><span>{{item.name}}</span>-->
      <IconSvg :iconClass="item.icon"/><span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    props: {
      title: {
        type: String,
        default: ''
      },
      menus: {
        type: Array,
        required: true
      }
    },
    computed: {
      menuCode: function () {
        return this.$store.state.Menu.code;
      }
    },
    created() {
    },
    mounted() {
      console.log(this.menuCode);
    },
    methods: {
      menuClick: function (code) {
        this.$store.dispatch('Menu/set_menu', code);
      },
      className: function (code) {
        if (code === this.menuCode) {
          return 'menu_item_active';
        }
        return 'menu_item';
      },
      iconName: function (code, name) {
        console.log(code, this.menuCode);
        if (code === this.menuCode) {
          return `${name}_active`;
        }
        return name;
      }
    }
  };
</script>

<style lang="scss">
  .menu {
    padding: 9px 0;
    font-size: 12px;
    .title {
      color: #7D7D7D;
      padding-left: 9px;
      padding-bottom: 9px;
    }
    .menu_item {
      cursor: pointer;
      color: #7D7D7D;
      .icon {
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    .menu_item_active {
      cursor: pointer;
      color: black;
      .icon {
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }
</style>
