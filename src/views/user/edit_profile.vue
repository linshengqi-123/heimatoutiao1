<template>
  <div class="edit_profile">
    <headernev title="编辑个人信息">
      <!-- 回退按钮 -->
      <template v-slot:left
        ><van-icon name="arrow-left" @click="$router.go(-1)"
      /></template>

      <!-- 主页按钮 -->
      <template v-slot:right
        ><van-icon name="wap-home-o" @click="$router.push({ name: 'index' })"
      /></template>
    </headernev>
    <div class="imgarea">
      <img :src="userinfo.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 更改用户名 -->
    <hmcell title="昵称" :desc="userinfo.nickname" @click.native="popover">
    </hmcell>

    <!-- 弹出框 -->
    <!-- 文档有说明使用confirm可以控制确定按钮 -->
    <van-dialog
      v-model="nicknameshow"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" label="昵称" placeholder="请输入新昵称" />
    </van-dialog>

    <!-- 修改密码框 -->
    <hmcell title="密码" desc="*****" @click.native="popoverpwd"></hmcell>
    <van-dialog
      v-model="nickpwdshow"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickpassword"
      :beforeClose="beforeClose"
    >
      <van-field v-model="nickpwd" label="原密码" placeholder="请输入原密码" />
      <van-field
        v-model="newnickpwd"
        label="新密码"
        placeholder="请输入新密码"
      />
    </van-dialog>

    <hmcell
      title="性别"
      :desc="userinfo.gender == 1 ? '男' : '女'"
      @click.native="clickgender"
    ></hmcell>
    <!-- close-on-click-action 点击选项后关闭 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      close-on-click-action
    />

    <!-- <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '13%' }"
    >
      <van-button type="default" block @click="usergender(1)">男</van-button>
      <van-button type="default" block @click="usergender(2)">女</van-button>
    </van-popup> -->
  </div>
</template>

<script>
// 头部组件
import headernev from "@/components/hm_header.vue";
// 按钮组件
import hmcell from "@/components/hm_cell.vue";
// 获取用户 和用户信息更新接口
import { getUserDetail, updateUserInfo } from "@/apis/user.js";
// 文件上传接口
import { fileupload } from "@/apis/fileUpload.js";
// 封装的的接口地址
import axios from "../../utils/myaxios.js";
export default {
  components: {
    headernev,
    hmcell,
  },
  data() {
    return {
      // 用户数据
      userinfo: {},
      // 用户名
      nickname: "",
      // 修改名字显示隐藏
      nicknameshow: false,
      // 旧密码
      nickpwd: "",
      // 新密码
      newnickpwd: "",
      // 修改密码显示隐藏
      nickpwdshow: false,

      // 性别
      show: false,
      actions: [{ name: "男" }, { name: "女" }],
    };
  },

  // 获取用户信息
  mounted() {
    getUserDetail(this.$route.params.id)
      .then((res) => {
        console.log("获取用户信息", res);
        if (res.data.message == "获取成功") {
          // 动态渲染用户信息
          this.userinfo = res.data.data;
          this.userinfo.head_img =
            axios.defaults.baseURL + this.userinfo.head_img;
        } else {
          this.$toast("获取失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    // 文件上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      fileupload(formdata)
        .then((res) => {
          console.log(res);
          if (res.data.message == "文件上传成功") {
            // console.log(this.userinfo.head_img);
            // 拼接路径实现图片上传
            // console.log(axios.defaults.baseURL);
            // axios.defaults.baseURL 是  http://157.122.54.189:9083
            // res.data.data.url  是 url: "/uploads/image/IMG1619006079991.jpeg"
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                // console.log(res);

                this.$toast.success("上传头像成功");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("图片上传失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击修改昵称组件打开内容
    popover() {
      this.nicknameshow = !this.nicknameshow;
      this.nickname = this.userinfo.nickname;
    },

    // 点击修改密码组件
    popoverpwd() {
      this.nickpwdshow = !this.nickpwdshow;
    },

    // 点击确定是事件
    // 修改用户名
    editNickname() {
      updateUserInfo(this.$route.params.id, { nickname: this.nickname })
        .then((res) => {
          // console.log(res);
          if (res.data.message == "修改成功") {
            this.$toast.success("修改成功");
            this.userinfo.nickname = this.nickname;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 修改密码
    async editNickpassword() {
      // 旧密码输入错误

      if (this.nickpwd == this.userinfo.password) {
        // 新旧密码重复
        if (this.nickpwd !== this.newnickpwd) {
          if (/^.{3,16}$/.test(this.newnickpwd)) {
            // 异步编程
            let res = await updateUserInfo(this.$route.params.id, {
              password: this.newnickpwd,
            });
            console.log(res);
            if (res.data.message == "修改成功") {
              this.$toast.success("密码修改成功返回重新登录");
              // console.log(this.userinfo.password);
              // 刷新旧密码
              this.nickpwd = this.userinfo.password;
              this.$router.push({ path: "/login" });
            }
          } else {
            this.$toast.fail("新密码格式不对");
          }
        } else {
          this.$toast.fail("新旧密码重复");
        }
      } else {
        this.$toast.fail("旧密码输入错误");
      }
    },

    // 弹出框按钮修改错误不关闭
    beforeClose(action, done) {
      if (action == "confirm") {
        if (
          this.nickpwd !== this.userinfo.password ||
          this.nickpwd == this.newnickpwd ||
          !/^.{3,16}$/.test(this.newnickpwd)
        ) {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },

    // 修改性别
    clickgender() {
      this.show = !this.show;
    },
    
    async onSelect(item) {
      // // 默认情况下点击选项时不会自动收起
      // // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false;
      // this.$toast(item.name);
      let gender = item.name == "男" ? 1 : 0;
      let res = await updateUserInfo(this.$route.params.id, { gender });

      if (res.data.message == "修改成功") {
        this.$toast.success(res.data.message);
        // 刷新页面
        this.userinfo.gender = res.data.data.gender;
      }
    },
    // async usergender(ged) {
    //   this.show = false;
    //   let res = await updateUserInfo(this.$route.params.id, { gender: ged });

    //   if (res.data.message == "修改成功") {
    //     this.$toast.success("修改成功");
    //     // 刷新页面
    //     this.userinfo.gender = res.data.data.gender;
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.edit_profile {
  // vant使用样式前面必须带/deep/
  /deep/ .van-password-input {
    margin-top: 250px;
  }

  .imgarea {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    position: relative;
    > img {
      width: 120px;
      height: 120px;
      display: block;
    }

    /deep/ .van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    /deep/ .van-uploader__upload {
      width: 220px;
      height: 120px;
      opacity: 0;
    }
  }
}
</style>