<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- tab标签页
    1.数量超过5个，标签项才能左右滚动--滑动
    2.sticky：实现吸顶效果
    3.swipeable：滑动内容，实现标签项的切换 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <hmpostblock
          v-for="itme in cate.postlist"
          :key="itme.id"
          :post="itme"
        ></hmpostblock>
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
    let res = await getcategory();
    console.log(res);
    // 获取数据添加到返回数组
    this.cateList = res.data.data;
    // 添加一个数组
    this.cateList = this.cateList.map((v) => {
      // console.log(this.cateList);
      // console.log(v);
      return {
        ...v, // 展开数据
        postlist: [], //添加存储栏目新闻数据的数组
        pageIndex: 1, //当前栏目的页码
        pageSize: 5, //当前栏目每页显示的数量
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
    async getpost() {
      console.log("点击索引", this.active);
      // 获取点击列表栏目的id
      // let id = this.cateList[this.active].id;
      // console.log("id", id);
      // 使用点击栏目的id获取对应的数据
      let res = await gtePostList({
        category: this.cateList[this.active].id, //当前栏目的id
        pageSize: this.cateList[this.active].pageSize, //当前栏目的显示pageSize
        pageIndex: this.cateList[this.active].pageIndex, //当前栏目的显示pageIndex
      });
      console.log("单列表内容", res.data.data);
      console.log(this.cateList[this.active]);
      // 把数据存到添加的数组里
      this.cateList[this.active].postlist = res.data.data;
    },
  },
};
</script>




<style lang="less" scoped>
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