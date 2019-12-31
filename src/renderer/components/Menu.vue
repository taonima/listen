<template>
  <div class="listen_menu">
    <div class="title">{{title}}</div>
    <router-link v-for="(item, k) in menus" :to="item.path" :key="k">
      <div :class="className(item.code)" @click="menuClick(item.code)" >
        <Icon :name="item.icon">{{item.name}}</Icon>
      </div>
    </router-link>
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
    methods: {
      menuClick: function (code) {
        this.$store.dispatch('Menu/set_menu', code);
      },
      className: function (code) {
        if (code === this.menuCode) {
          return 'menu_item menu_item_active';
        }
        return 'menu_item';
      }
    }
  };
</script>

<style lang="scss">
  .listen_menu {
    padding: 9px 0;
    font-size: 12px;
    .title {
      color: #7D7D7D;
      padding-left: 9px;
      padding-bottom: 9px;
      font-size: 14px;
    }
    .menu_item {
      cursor: pointer;
      color: #7D7D7D;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      border-left: 3px solid #F5F5F7;
      .listen_svg {
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 10px;
          font-size: 18px;
        }
      }

    }
    .menu_item_active {
      cursor: pointer;
      color: black;
      background-color: #E6E7EA;
      border-left: 3px solid #C62F2F;
    }
  }
</style>
