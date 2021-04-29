<template>
  <div class="comment">
    <hm_header title="精彩评论页">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <div class="item" v-for="value in commentlist" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + value.user.head_img" alt />
        <div>
          <p>{{ value.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span @click="responsecomment(value)">回复</span>
      </div>
      <!-- 回复评论 -->
      <!-- @replay="responsecomment"  嵌套子组件发送数据接收 再调用之前的父传子函数复用完成功能 -->
      <hm_commentltem
        v-if="value.parent"
        :parent="value.parent"
        @replay="responsecomment"
      ></hm_commentltem>
      <div class="text">{{ value.content }}</div>
    </div>
    <!-- 底部评论块  底部评论块 底部评论块 底部评论块  底部评论块 -->
    <!-- :commetObj="temp"   通过for 获取到的数据通过函数传到data 里面的temp对象 再传给子组件 -->
    <!-- @cancel="temp = null"   -->
    <commentFooter
      :post="article"
      @refresh="refresh"
      :commetObj="temp"
      @cancel="temp = null"
    ></commentFooter>
    <!-- 底部评论块  底部评论块 底部评论块 底部评论块  底部评论块 -->
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import hm_commentltem from "@/components/hm_commentltem.vue";
import { getPostComment, gtePostDetail } from "@/apis/post.js";
import commentFooter from "../components/hm_commentFooter.vue";
import axios from "@/utils/myaxios.js";
export default {
  components: {
    hm_header,
    hm_commentltem,
    commentFooter,
  },
  data() {
    return {
      commentlist: [],
      axios,
      article: {},
      temp: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // 先获取到文章详情用于传递给底部评论
      let id = this.$route.params.id;
      this.article = (await gtePostDetail(id)).data.data;

      let res = await getPostComment(id);
      console.log("评论列表", res);
      this.commentlist = res.data.data;
    },
    refresh() {
      this.init();
      //   回跳到顶部
      window.scrollTo(0, 0);
    },
    responsecomment(v) {
      console.log("父组件", v);
      this.temp = v;
    },
  },
};
</script>
<style lang="less" scoped>
.item {
  padding: 10px;
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
</style>