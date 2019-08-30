<template>
  <div id="listen">
    <div class="layout_head">
      <div class="logo">
        <Icon iconClass="logo">
          <span>听</span>
        </Icon>
      </div>
    </div>
    <div class="layout_body">
      <div class="left">
        <Menu title="推荐" :menus="menus"/>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
    <div class="layout_foot">

    </div>
  </div>
</template>

<script>
  const menus = [
    {
      icon: 'note',
      name: '发现音乐',
      code: 1,
      path: '/discover'
    },
    {
      icon: 'fm',
      name: '私人FM',
      code: 2,
      path: '/fm'
    }
  ];
  export default {
    name: 'index',
    data: () => {
      return {
        menus
      };
    },
    created: () => {
    }
  };
</script>

<style lang="scss">

</style>
