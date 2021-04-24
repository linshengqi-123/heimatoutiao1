<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <!-- 用户名   placeholder占位符-->
      <hminput
        v-model="user.username"
        placeholder="请输入手机号"
        :rules="/^1[35789]\d{9}$|^admin$/"
        msg="请输入手机号"
      ></hminput>
      <!-- 昵称 -->
      <hminput
        v-model="user.nickname"
        placeholder="请输入用户昵称"
        :rules="/^.{3,6}$/"
        msg="请输入用户名"
      ></hminput>
      <!-- 密码 -->
      <hminput
        v-model="user.password"
        placeholder="请输入密码"
        :rules="/^.{3,16}$/"
        msg="请输入3~16位的密码"
      ></hminput>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <!-- 注册按钮 -->
    <buttons @clicks="logins" type="success">注册</buttons>
  </div>
</template>

<script>
import buttons from "@/components/hm_button.vue";
import hminput from "@/components/hm_input.vue";
import { userRegistration } from "@/apis/user.js";

export default {
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        password: "",
      },
    };
  },
  components: {
    buttons,
    hminput,
  },
  methods: {
    logins(e) {
      // 判断输入的内容是否符合格式
      if (
        /^1[35789]\d{9}$/.test(this.user.username) &&
        /^.{3,6}$/.test(this.user.nickname) &&
        /^.{3,16}$/.test(this.user.nickname)
      ) {
        userRegistration(this.user)
          .then((res) => {
            // console.log(res);
            if (res.data.message == "注册成功") {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.fail(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toast.fail("输入错误");
          });
      } else {
        this.$toast.fail("注册用户名密码格式错误");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>