<template>
  <div class="menu">
    <div class="title">{{title}}</div>
    <router-link v-for="item in menus" :to="item.path">
      <div :class="className(item.code)" v-on:click="menuClick(item.code)" >
        <Icon :iconClass="item.icon"><span>{{item.name}}</span></Icon>
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
    mounted() {
      console.log(this.menuCode);
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
  .menu {
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
      border-left: 3px solid white;
      svg {
        margin-right: 5px;
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
