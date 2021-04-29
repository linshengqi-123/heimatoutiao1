<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- 用户名   placeholder占位符-->
        <hminput
          v-model="user.username"
          placeholder="请输入用户名"
          :rules="/^1[035789]\d{9}$|^admin$/"
          msg="请输入手机号"
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
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- <div class="button">登录按钮</div> -->
      <buttons @clicks="logins" type="success"></buttons>
    </div>
  </div>
</template>

<script>
// 引入子组件
import buttons from "@/components/hm_button.vue";
import hminput from "@/components/hm_input.vue";
import { userlogin } from "@/apis/user.js";

export default {
  data() {
    return {
      user: {
        username: "17876381470",
        password: "1234",
      },
    };
  },
  //   注册
  components: {
    buttons,
    hminput,
  },
  //   不引入会报错
  methods: {
    logins(e) {
      if (
        /^1[035789]\d{9}$|^admin$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password)
      ) {
        userlogin(this.user)
          .then((res) => {
            // console.log(res);
            if ((res.data.data.message = "登录成功")) {
              this.$toast.success("登录成功");
              // 设置登录token
              localStorage.setItem("hmtoutiao_token", res.data.data.token);
              // 本地存储用户id
              localStorage.setItem("hmtoutiao_userid", res.data.data.user.id);

              // 添加id 路径
              // this.$router.push({ path: `/personal/${res.data.data.user.id}` });
              // 登录后回跳到之前浏览的页面
              let redirect = location.href.split("=")[1];

              if (redirect) {
                // decodeURIComponent 还原代码格式
                location.href = decodeURIComponent(redirect);
              } else {
                // 否则跳转到个人中心页// 跳转到个人中心页
                this.$router.push({
                  path: `/personal/${res.data.data.user.id}`,
                });
              }

              // 登录跳转
              // this.$router.push({ path: "/personal" });
            } else {
              this.$toast.fail("用户不存在");
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toast.fail("用户名密码错误");
          });
      } else {
        this.$toast.fail("输入错误");
      }
      //   console.log(e);
    },
  },
};

// 底部样式
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