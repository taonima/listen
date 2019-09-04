<template>
  <div class="login">
    <div class="head">
      <Icon iconClass="x" @onClick="handleClose"/>
    </div>
    <div class="box">
      <div class="input">
        <Input placeholder="请输入手机号" prefix="phone" suffix="password"/>
        <Input placeholder="请输入密码" prefix="password"/>
      </div>
      <Button>登录</Button>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron';
  export default {
    name: 'login',
    methods: {
      handleClose: function () {
        remote.getCurrentWindow().hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;
    .head {
      font-size: 12px;
      min-height: 20px;
      .svg-icon {
        position: absolute;
        right: 8px;
        top: 8px;
        color: #999999;
        cursor: pointer;
      }
    }
    .box {
      width: 65%;
      margin: 150px auto 0;
      text-align: center;
      .input {
        input {
          border-bottom: 1px solid #E5E5E5;
          width: 100%;
          margin-top: 20px;
        }
      }
      button {
        width: 100%;
        margin-top: 30px;
      }
    }
  }

</style>
