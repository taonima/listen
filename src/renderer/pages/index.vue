<template>
  <div id="listen">
    <div class="layout_head">
      <Icon :name="logo" :width="30" :height="30"/>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/icon/logo.svg'
  export default {
    name: 'index',
    data: () => {
      return {
        logo
      }
    },
    created: () => {
    }
  }
</script>

<style lang="scss">
  #listen {
    .layout_head {
      height: 50px;
      background: #C62F2F;
      -webkit-app-region: drag;
    }
  }

</style>
