<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ path: '/search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" @click="jump" />
      </div>
    </div>
    <!-- tab标签页
    1.数量超过5个，标签项才能左右滚动--滑动
    2.sticky：实现吸顶效果
    3.swipeable：滑动内容，实现标签项的切换 -->
    <van-tabs v-model="active" sticky swipeable>
      <!-- 导航栏 -->
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="cate.isLoading"
          :offset="200"
          @refresh="onRefresh"
        >
          <!-- 滚动条与底部距离小于 offset 时触发load事件 默认300 -->
          <!-- :immediate-check="false" 阻止默认第一次刷新 -->
          <van-list
            v-model="cate.loading"
            :finished="cate.finished"
            finished-text="没有更多了"
            :offset="5"
            :immediate-check="false"
            @load="onLoad"
          >
            <hmpostblock
              v-for="itme in cate.postlist"
              :key="itme.id"
              :post="itme"
            ></hmpostblock>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getcategory } from "@/apis/category.js";
import { gtePostList } from "@/apis/post.js";
import hmpostblock from "@/components/hm_postBlock.vue";
export default {
  components: {
    hmpostblock,
  },
  data() {
    return {
      // active 索引值
      // 有token就显示关注 没有就显示头条
      active: localStorage.getItem("hmtoutiao_token") ? 1 : 0,
      //新闻列表
      cateList: [],
      //   组件使用的参数
      //   postlist: [],
    };
  },
  // 获取列表数据
  async mounted() {
    // 栏目入口的添加和跳转
    document.querySelector(".van-sticky").onclick = (e) => {
      // console.log(e.target.className);
      if (e.target.className.indexOf("van-sticky") !== -1) {
        // 说明点击的位置是入口位置
        this.$router.push({ name: "cateManager" });
      }
    };
    // 从本地存储拿到数据
    this.cateList = JSON.parse(localStorage.getItem("cateList") || "[]");
    if (this.cateList.length == 0) {
      // 页面一加载完毕：获取栏目数据
      let res = await getcategory();
      // console.log(res.data.data);
      // 这个数据现在只有 id  name  is_top，并没有存储新闻数据的数组
      this.cateList = res.data.data;
    } else {
      // 有本地存储数据，那么就需要手动的添加 “关注”和“头条”
      if (localStorage.getItem("hmtoutiao_token")) {
        this.cateList.unshift(
          { id: 0, name: "关注", is_top: 1 },
          { id: 999, name: "头条", is_top: 1 }
        );
      } else {
        this.cateList.unshift({ id: 999, name: "头条", is_top: 1 });
      }
    }
    // let res = await getcategory();
    // console.log(res);
    // // 获取数据添加到返回数组
    // this.cateList = res.data.data;
    // 添加一个数组
    this.cateList = this.cateList.map((v) => {
      // console.log(this.cateList);
      // console.log(v);
      return {
        ...v, // 展开数据
        postlist: [], //添加存储栏目新闻数据的数组
        pageIndex: 1, //当前栏目的页码
        pageSize: 6, //当前栏目每页显示的数量
        loading: false, //当前组件的上拉加载的状态
        finished: false, //当前组件的数据是否全部加载完毕的标记
        isLoading: false, //下拉刷新  当前组件的下拉刷新的状态，标记是否正在下拉刷新
      };
    });
    console.log(this.active);
    this.getpost();
  },

  // 监听列表点击事件
  watch: {
    async active() {
      // 判断点击对应栏目里面的postlist 是否有数据 没有数据就给它数据
      if (this.cateList[this.active].postlist.length == 0) {
        // 调用封装的获取数据函数
        this.getpost();
      }
    },
  },

  methods: {
    jump() {
      let id = localStorage.getItem("hmtoutiao_userid", id);
      console.log(id);
      if (id) {
        this.$router.push({ path: `/personal/${id}` });
      } else {
        this.$toast("未登录请登录");
        this.$router.push({ path: `/login` });
      }
    },
    // 异步下拉刷新
    async onRefresh() {
      console.log("刷新");
      // 1.页码重新设置为1
      this.cateList[this.active].pageIndex = 1;
      // 2.将数据清空
      this.cateList[this.active].postlist.length = 0;
      // 3.将之前可能重置为true的finished状态重置为false
      this.cateList[this.active].finished = false;
      // 异步调用获取到之后才显示 this.$toast("刷新成功");
      console.log("刷新2");
      // 上面代码执行完后再显示
      await this.getpost();
      console.log("刷新3");

      this.$toast("刷新成功");
    },
    // 上拉加载
    onLoad() {
      console.log("触发一次");
      this.cateList[this.active].pageIndex++;
      // 调用一次
      this.getpost();
    },
    // 函数方法封装
    async getpost() {
      // 把 (使用点击栏目的id获取对应的数据 ) 存到变量
      let current = (
        await gtePostList({
          category: this.cateList[this.active].id, //当前栏目的id
          pageSize: this.cateList[this.active].pageSize, //当前栏目的显示pageSize
          pageIndex: this.cateList[this.active].pageIndex, //当前栏目的显示pageIndex
        })
      ).data.data;
      // console.log("单列表内容", res.data.data);
      // 把数据存到添加的数组里
      // 把数据push到postlist数组里
      this.cateList[this.active].postlist.push(...current);
      // 数据调用一次后loading 为true  函数调用结束后改回来
      this.cateList[this.active].loading = false;
      // 本次请求完成之后，将下拉刷新折状态重置为false,以便下一次下拉刷新
      this.cateList[this.active].isLoading = false;
      // 判断当前所有数据小于 当前栏目每页显示的数量 就提示用户没有内容了
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
    },
  },
};
</script>




<style lang="less" scoped>
/deep/ .van-sticky {
  padding-right: 44px;
  &::before {
    content: "+";
    width: 44px;
    height: 44px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    line-height: 36px;
    text-align: center;
    font-size: 30px;
  }
}
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #f00;
  .logo {
    color: #fff;
    .iconnew {
      font-size: 50px;
    }
  }
  .search {
    flex: 1;
    height: 35px;
    margin-top: 5px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 0 10px;
  }
  .user {
    color: #fff;
    font-size: 20px;
  }
}
</style>