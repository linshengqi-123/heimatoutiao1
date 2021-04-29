<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span
          class="iconfont iconnew new"
          @click="$router.push({ name: 'index' })"
        ></span>
      </div>
      <span @click="followUserById" :class="{ active: post.has_follow }">
        {{ post.has_follow ? "已关注" : "关注" }}</span
      >
    </div>
    <div class="detail">
      <div class="title">{{ post.title }}</div>
      <div class="desc">
        <!-- 逻辑运算符 -->
        <span>{{ post.user && post.user.nickname }}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <!-- 细节：内容是网页结构，所以需要进行解析，所以使用v-html -->
      <div class="content" v-html="post.content" v-if="post.type == 1"></div>
      <video :src="post.content" controls autoplay v-else></video>
      <div class="opt">
        <span class="like" :class="{ active: post.has_like }">
          <van-icon name="good-job-o" @click="likeThisPostById" />
          <!-- 显示有多少个人点赞 -->
          {{ post.like_length ? post.like_length : "点赞" }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="@/assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部评论块 -->
    <hmcomment :post="post"></hmcomment>
  </div>
</template>

<script>
import { gtePostDetail, likePost } from "@/apis/post.js";
import { userfollows, userunfollow } from "@/apis/user.js";

// 底部评论块
import hmcomment from "@/components/hm_commentFooter.vue";
export default {
  components: {
    hmcomment,
  },
  data() {
    return {
      post: {},
    };
  },
  async mounted() {
    let res = await gtePostDetail(this.$route.params.id);
    console.log(res.data.data);
    this.post = res.data.data;
  },
  // 关注用户和取消关注用户
  // 根据当前用户的关注状态，决定是关注用户还是取消关注用户
  // true:已关注了，这次单击就是取消关注
  methods: {
    async likeThisPostById() {
      let id = this.post.id;
      let res = await likePost(id);
      console.log(res);
      if (res.data.message == "点赞成功") {
        ++this.post.link_length;
      } else {
        --this.post.link_length;
      }
      this.post.has_like = !this.post.has_link;
      this.$toast.success(res.data.message);
    },
    async followUserById() {
      let id = this.post.user.id;
      console.log(id);

      let res;
      // 根据当前用户的关注状态，决定是关注用户还是取消关注用户
      if (this.post.has_follow) {
        res = await userunfollow(id);
      } else {
        res = await userfollows(id);
      }
      console.log(res);
      if (res.data.message == "关注成功") {
        this.post.has_follow = !this.post.has_follow;
        this.$toast.success(res.data.message);
      } else {
        this.$toast.success(res.data.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      background-color: transparent;
      border: 1px solid #aaa;
      color: #000;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/ img {
      width: 100%;
    }
    /deep/ p {
      text-indent: 2em;
    }
  }
  video {
    width: 100%;
    margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .active {
    color: red;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>