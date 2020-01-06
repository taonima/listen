<template>
  <div class="login">
    <div class="head">
      <Icon name="close" @click="handleClose"/>
    </div>
    <template v-if="!profile.nickname">
      <div class="box">
        <div class="input">
          <Input placeholder="请输入手机号" prefix="phone" v-model="phone"/>
          <Input placeholder="请输入密码" prefix="password" v-model="password"/>
        </div>
        <Button @onClick="handleLogin">登录</Button>
        <p class="error" v-if="error.code !== 200">{{error.message}}</p>
      </div>
    </template>
    <template v-else>
      <Button @onClick="handleLogout" class="logout">注销</Button>
    </template>
  </div>
</template>

<script>
  import { remote } from 'electron';
  import { login, logout } from '@/services';
  export default {
    name: 'login',
    data: function() {
      return {
        phone: '',
        password: '',
        error: {}
      };
    },
    methods: {
      handleClose: function () {
        remote.getCurrentWindow().hide();
      },
      handleLogin: function () {
        login({
          phone: this.phone,
          password: this.password
        }).then(res => {
          this.error = res;
          this.$store.dispatch('User/set_user', res);
          this.handleClose();
        }, res => {
          this.error = res;
        });
      },
      handleLogout: function () {
        logout().then(() => {
          this.$store.dispatch('User/clear_user');
        }, () => {});
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
      .listen_svg {
        position: absolute;
        right: 8px;
        top: 8px;
        color: #999999;
        cursor: pointer;
        -webkit-app-region: no-drag;
      }
    }
    .box {
      width: 65%;
      margin: 150px auto 0;
      text-align: center;
      .input {
        .listen_Input {
          margin-top: 20px;
          width: 100%;
          border-bottom: 1px solid #E5E5E5;
          input {
          }
        }
      }
      button {
        width: 100%;
        margin-top: 30px;
        border: none;
        background-color: #EA4848;
        color: white;
        letter-spacing: 2px;
        &:hover {
          background-color: #A82828;
        }
      }
      .error {
        color: red;
        text-align: left;
        padding-top: 5px;
      }
    }
    .logout {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #F5F5F7;
    }
  }

</style>
